import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
    Mail, Inbox, Send, Archive, Trash2, RefreshCw, Search,
    Paperclip, Clock, Circle,
    ArrowLeft, Reply, X
} from 'lucide-react';
import ComposeEmail from './ComposeEmail';
import { useAdminAuth } from '../../lib/adminAuth';
import DOMPurify from 'dompurify';

interface Thread {
    id: number;
    subject: string;
    participantEmail: string;
    participantName: string | null;
    status: string;
    isRead: boolean;
    lastMessageAt: string;
    createdAt: string;
    messageCount: number;
    preview: string;
    lastDirection: string;
}

interface EmailMessage {
    id: number;
    threadId: number;
    mailgunId: string | null;
    direction: string;
    fromEmail: string;
    fromName: string | null;
    toEmail: string;
    cc: string | null;
    bcc: string | null;
    subject: string | null;
    bodyHtml: string | null;
    bodyText: string | null;
    hasAttachments: boolean;
    createdAt: string;
    attachments: { id: number; filename: string; contentType: string; size: number }[];
}

interface ThreadDetail extends Thread {
    messages: EmailMessage[];
}

const API_BASE = '/.netlify/functions/mailgun-threads';

export default function InboxPage() {
    const { token } = useAdminAuth();
    const { threadId: paramThreadId } = useParams();
    const navigate = useNavigate();

    const [threads, setThreads] = useState<Thread[]>([]);
    const [selectedThread, setSelectedThread] = useState<ThreadDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'unread' | 'replied' | 'closed'>('all');
    const [search, setSearch] = useState('');
    const [showCompose, setShowCompose] = useState(false);
    const [replyMode, setReplyMode] = useState(false);
    const [mobileShowThread, setMobileShowThread] = useState(false);

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const fetchThreads = useCallback(async () => {
        try {
            const res = await fetch(API_BASE, { headers });
            if (res.ok) {
                const data = await res.json();
                setThreads(data);
            }
        } catch (err) {
            console.error('Failed to fetch threads', err);
        } finally {
            setLoading(false);
        }
    }, [token]);

    const fetchThread = useCallback(async (id: number) => {
        try {
            const res = await fetch(`${API_BASE}/${id}`, { headers });
            if (res.ok) {
                const data = await res.json();
                setSelectedThread(data);
                // Update the thread in the list to mark as read
                setThreads(prev => prev.map(t => t.id === id ? { ...t, isRead: true } : t));
            }
        } catch (err) {
            console.error('Failed to fetch thread', err);
        }
    }, [token]);

    useEffect(() => {
        fetchThreads();
        // Poll for new emails every 30 seconds
        const interval = setInterval(fetchThreads, 30000);
        return () => clearInterval(interval);
    }, [fetchThreads]);

    useEffect(() => {
        if (paramThreadId) {
            const id = parseInt(paramThreadId, 10);
            if (!isNaN(id)) {
                fetchThread(id);
                setMobileShowThread(true);
            }
        }
    }, [paramThreadId, fetchThread]);

    const handleSelectThread = (thread: Thread) => {
        fetchThread(thread.id);
        setMobileShowThread(true);
        setReplyMode(false);
        navigate(`/admin/inbox/${thread.id}`, { replace: true });
    };

    const handleDeleteThread = async (threadId: number) => {
        if (!confirm('Delete this entire conversation?')) return;
        const res = await fetch(`${API_BASE}/${threadId}`, { method: 'DELETE', headers });
        if (res.ok) {
            toast.success('Thread deleted');
            setThreads(prev => prev.filter(t => t.id !== threadId));
            if (selectedThread?.id === threadId) {
                setSelectedThread(null);
                setMobileShowThread(false);
            }
        }
    };

    const handleUpdateStatus = async (threadId: number, status: string) => {
        await fetch(`${API_BASE}/${threadId}/status`, {
            method: 'PUT',
            headers,
            body: JSON.stringify({ status }),
        });
        setThreads(prev => prev.map(t => t.id === threadId ? { ...t, status } : t));
        if (selectedThread?.id === threadId) {
            setSelectedThread(prev => prev ? { ...prev, status } : null);
        }
        toast.success(`Thread marked as ${status}`);
    };

    const handleEmailSent = () => {
        setShowCompose(false);
        setReplyMode(false);
        fetchThreads();
        if (selectedThread) fetchThread(selectedThread.id);
    };

    // Filtering
    const filteredThreads = threads.filter(t => {
        if (filter === 'unread' && t.isRead) return false;
        if (filter === 'replied' && t.status !== 'replied') return false;
        if (filter === 'closed' && t.status !== 'closed') return false;
        if (search) {
            const q = search.toLowerCase();
            return (
                t.subject.toLowerCase().includes(q) ||
                t.participantEmail.toLowerCase().includes(q) ||
                (t.participantName || '').toLowerCase().includes(q)
            );
        }
        return true;
    });

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        const now = new Date();
        const diff = now.getTime() - d.getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 60) return `${mins}m ago`;
        const hours = Math.floor(mins / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        if (days < 7) return `${days}d ago`;
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const formatFullDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'long', day: 'numeric', year: 'numeric',
            hour: '2-digit', minute: '2-digit',
        });
    };

    const unreadCount = threads.filter(t => !t.isRead).length;

    return (
        <div className="h-screen flex flex-col bg-slate-950">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900">
                <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-orange-400" />
                    <h1 className="text-lg font-bold text-white">Inbox</h1>
                    {unreadCount > 0 && (
                        <span className="px-2 py-0.5 text-xs font-bold bg-orange-500 text-white rounded-full">
                            {unreadCount}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => fetchThreads()}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
                        title="Refresh"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => { setShowCompose(true); setReplyMode(false); }}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition-all"
                    >
                        <Send className="w-4 h-4" />
                        Compose
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Thread List (Left Panel) */}
                <div className={`w-full md:w-[380px] lg:w-[420px] border-r border-slate-800 flex flex-col bg-slate-900 ${mobileShowThread ? 'hidden md:flex' : 'flex'}`}>
                    {/* Search + Filters */}
                    <div className="p-3 border-b border-slate-800 space-y-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search emails..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-all"
                            />
                        </div>
                        <div className="flex gap-1">
                            {(['all', 'unread', 'replied', 'closed'] as const).map(f => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-3 py-1.5 text-xs font-bold rounded-lg capitalize transition-all ${filter === f ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Thread Items */}
                    <div className="flex-1 overflow-y-auto">
                        {loading ? (
                            <div className="flex items-center justify-center h-40 text-slate-500">
                                <RefreshCw className="w-5 h-5 animate-spin" />
                            </div>
                        ) : filteredThreads.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-40 text-slate-500 text-sm">
                                <Inbox className="w-8 h-8 mb-2 opacity-50" />
                                No emails found
                            </div>
                        ) : (
                            filteredThreads.map(thread => (
                                <button
                                    key={thread.id}
                                    onClick={() => handleSelectThread(thread)}
                                    className={`w-full text-left p-4 border-b border-slate-800 transition-all hover:bg-slate-800/50 ${selectedThread?.id === thread.id ? 'bg-slate-800 border-l-2 border-l-orange-500' : ''
                                        } ${!thread.isRead ? 'bg-slate-800/30' : ''}`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 mt-1">
                                            {!thread.isRead ? (
                                                <Circle className="w-2.5 h-2.5 fill-orange-500 text-orange-500" />
                                            ) : (
                                                <Circle className="w-2.5 h-2.5 text-slate-700" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className={`text-sm truncate ${!thread.isRead ? 'font-bold text-white' : 'font-medium text-slate-300'}`}>
                                                    {thread.participantName || thread.participantEmail}
                                                </span>
                                                <span className="text-xs text-slate-500 flex-shrink-0 ml-2">
                                                    {formatDate(thread.lastMessageAt)}
                                                </span>
                                            </div>
                                            <p className={`text-sm truncate mb-1 ${!thread.isRead ? 'text-slate-200 font-semibold' : 'text-slate-400'}`}>
                                                {thread.subject}
                                            </p>
                                            <p className="text-xs text-slate-500 truncate">{thread.preview}</p>
                                            <div className="flex items-center gap-2 mt-1.5">
                                                <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${thread.status === 'open' ? 'bg-emerald-500/15 text-emerald-400' :
                                                    thread.status === 'replied' ? 'bg-blue-500/15 text-blue-400' :
                                                        'bg-slate-700 text-slate-400'
                                                    }`}>
                                                    {thread.status}
                                                </span>
                                                {thread.messageCount > 1 && (
                                                    <span className="text-[10px] text-slate-500">{thread.messageCount} messages</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* Thread Detail (Right Panel) */}
                <div className={`flex-1 flex flex-col bg-slate-950 ${!mobileShowThread ? 'hidden md:flex' : 'flex'}`}>
                    {selectedThread ? (
                        <>
                            {/* Thread Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900">
                                <div className="flex items-center gap-3 min-w-0">
                                    <button
                                        onClick={() => { setMobileShowThread(false); setSelectedThread(null); }}
                                        className="md:hidden p-1 text-slate-400 hover:text-white"
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                    </button>
                                    <div className="min-w-0">
                                        <h2 className="text-white font-bold text-sm truncate">{selectedThread.subject}</h2>
                                        <p className="text-xs text-slate-400">
                                            {selectedThread.participantName || selectedThread.participantEmail}
                                            <span className="text-slate-600 ml-2">&lt;{selectedThread.participantEmail}&gt;</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 flex-shrink-0">
                                    <button
                                        onClick={() => handleUpdateStatus(selectedThread.id, selectedThread.status === 'closed' ? 'open' : 'closed')}
                                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
                                        title={selectedThread.status === 'closed' ? 'Reopen' : 'Close'}
                                    >
                                        {selectedThread.status === 'closed' ? <Inbox className="w-4 h-4" /> : <Archive className="w-4 h-4" />}
                                    </button>
                                    <button
                                        onClick={() => handleDeleteThread(selectedThread.id)}
                                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {selectedThread.messages.map(msg => (
                                    <div
                                        key={msg.id}
                                        className={`rounded-2xl p-5 max-w-[85%] ${msg.direction === 'outbound'
                                            ? 'ml-auto bg-orange-500/10 border border-orange-500/20'
                                            : 'bg-slate-900 border border-slate-800'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <span className={`text-xs font-bold ${msg.direction === 'outbound' ? 'text-orange-400' : 'text-slate-300'}`}>
                                                    {msg.direction === 'outbound' ? 'You' : (msg.fromName || msg.fromEmail)}
                                                </span>
                                                {msg.cc && (
                                                    <span className="text-[10px] text-slate-500">CC: {msg.cc}</span>
                                                )}
                                            </div>
                                            <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {formatFullDate(msg.createdAt)}
                                            </span>
                                        </div>
                                        <div
                                            className="text-sm text-slate-300 leading-relaxed prose prose-sm prose-invert max-w-none [&_a]:text-orange-400 [&_img]:rounded-lg [&_img]:max-w-full"
                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(msg.bodyHtml || msg.bodyText || '') }}
                                        />
                                        {msg.attachments && msg.attachments.length > 0 && (
                                            <div className="mt-3 pt-3 border-t border-slate-700 space-y-1">
                                                {msg.attachments.map(att => (
                                                    <div key={att.id} className="flex items-center gap-2 text-xs text-slate-400">
                                                        <Paperclip className="w-3 h-3" />
                                                        <span>{att.filename}</span>
                                                        <span className="text-slate-600">({(att.size / 1024).toFixed(1)} KB)</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Reply Bar */}
                            {!replyMode ? (
                                <div className="border-t border-slate-800 p-4 bg-slate-900">
                                    <button
                                        onClick={() => setReplyMode(true)}
                                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all"
                                    >
                                        <Reply className="w-4 h-4" />
                                        Reply to {selectedThread.participantName || selectedThread.participantEmail}
                                    </button>
                                </div>
                            ) : (
                                <div className="border-t border-slate-800 bg-slate-900">
                                    <ComposeEmail
                                        mode="reply"
                                        threadId={selectedThread.id}
                                        defaultTo={selectedThread.participantEmail}
                                        defaultSubject={`Re: ${selectedThread.subject}`}
                                        inReplyTo={selectedThread.messages[selectedThread.messages.length - 1]?.mailgunId || undefined}
                                        onSent={handleEmailSent}
                                        onCancel={() => setReplyMode(false)}
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-600">
                            <Mail className="w-16 h-16 mb-4 opacity-30" />
                            <p className="text-lg font-medium">Select a conversation</p>
                            <p className="text-sm mt-1">Choose a thread from the left to read messages</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Compose Modal */}
            {showCompose && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="flex items-center justify-between p-4 border-b border-slate-800">
                            <h3 className="text-white font-bold">New Email</h3>
                            <button onClick={() => setShowCompose(false)} className="p-1 text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <ComposeEmail
                            mode="compose"
                            onSent={handleEmailSent}
                            onCancel={() => setShowCompose(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
