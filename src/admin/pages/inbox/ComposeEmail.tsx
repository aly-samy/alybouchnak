import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { Send, Paperclip, X, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { useAdminAuth } from '../../lib/adminAuth';

interface ComposeEmailProps {
    mode: 'compose' | 'reply';
    threadId?: number;
    defaultTo?: string;
    defaultSubject?: string;
    inReplyTo?: string;
    onSent: () => void;
    onCancel: () => void;
}

interface AttachmentFile {
    filename: string;
    contentType: string;
    size: number;
    data: string; // base64
}

export default function ComposeEmail({
    mode,
    threadId,
    defaultTo = '',
    defaultSubject = '',
    inReplyTo,
    onSent,
    onCancel,
}: ComposeEmailProps) {
    const { token } = useAdminAuth();
    const [to, setTo] = useState(defaultTo);
    const [cc, setCc] = useState('');
    const [bcc, setBcc] = useState('');
    const [subject, setSubject] = useState(defaultSubject);
    const [bodyHtml, setBodyHtml] = useState('');
    const [attachments, setAttachments] = useState<AttachmentFile[]>([]);
    const [showCcBcc, setShowCcBcc] = useState(false);
    const [sending, setSending] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.size > 5 * 1024 * 1024) {
                toast.error(`${file.name} is too large (max 5MB)`);
                continue;
            }

            const reader = new FileReader();
            reader.onload = () => {
                const base64 = (reader.result as string).split(',')[1];
                setAttachments(prev => [...prev, {
                    filename: file.name,
                    contentType: file.type || 'application/octet-stream',
                    size: file.size,
                    data: base64,
                }]);
            };
            reader.readAsDataURL(file);
        }

        // Reset input
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const removeAttachment = (index: number) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    };

    const handleSend = async () => {
        if (!to.trim()) {
            toast.error('Please enter a recipient');
            return;
        }
        if (!subject.trim()) {
            toast.error('Please enter a subject');
            return;
        }
        if (!bodyHtml.trim()) {
            toast.error('Please enter a message');
            return;
        }

        setSending(true);

        try {
            const res = await fetch('/.netlify/functions/mailgun-send', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: to.trim(),
                    cc: cc.trim() || undefined,
                    bcc: bcc.trim() || undefined,
                    subject: subject.trim(),
                    bodyHtml: `<div style="font-family: 'Nunito', Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #1a1a1a;">${bodyHtml}</div>`,
                    threadId: threadId || undefined,
                    inReplyTo: inReplyTo || undefined,
                    attachments: attachments.length > 0 ? attachments : undefined,
                }),
            });

            if (res.ok) {
                toast.success('Email sent successfully!');
                onSent();
            } else {
                const err = await res.json();
                toast.error(`Failed to send: ${err.error || 'Unknown error'}`);
            }
        } catch (err) {
            toast.error('Failed to send email');
            console.error(err);
        } finally {
            setSending(false);
        }
    };

    const inputClass = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-all';

    return (
        <div className="p-4 space-y-3">
            {/* To Field */}
            <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-slate-400 w-10 flex-shrink-0">To</label>
                <input
                    type="text"
                    value={to}
                    onChange={e => setTo(e.target.value)}
                    placeholder="recipient@example.com"
                    className={inputClass}
                    disabled={mode === 'reply'}
                />
                <button
                    onClick={() => setShowCcBcc(!showCcBcc)}
                    className="text-xs text-slate-500 hover:text-orange-400 flex items-center gap-1 whitespace-nowrap transition-all"
                >
                    CC/BCC {showCcBcc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
            </div>

            {/* CC / BCC */}
            {showCcBcc && (
                <>
                    <div className="flex items-center gap-2">
                        <label className="text-xs font-bold text-slate-400 w-10 flex-shrink-0">CC</label>
                        <input
                            type="text"
                            value={cc}
                            onChange={e => setCc(e.target.value)}
                            placeholder="cc@example.com"
                            className={inputClass}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-xs font-bold text-slate-400 w-10 flex-shrink-0">BCC</label>
                        <input
                            type="text"
                            value={bcc}
                            onChange={e => setBcc(e.target.value)}
                            placeholder="bcc@example.com"
                            className={inputClass}
                        />
                    </div>
                </>
            )}

            {/* Subject */}
            {mode === 'compose' && (
                <div className="flex items-center gap-2">
                    <label className="text-xs font-bold text-slate-400 w-10 flex-shrink-0">Subj</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        placeholder="Email subject..."
                        className={inputClass}
                    />
                </div>
            )}

            {/* Body */}
            <textarea
                value={bodyHtml}
                onChange={e => setBodyHtml(e.target.value)}
                placeholder="Write your message..."
                rows={mode === 'reply' ? 4 : 8}
                className={`${inputClass} resize-y min-h-[100px]`}
            />

            {/* Attachments Preview */}
            {attachments.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {attachments.map((att, i) => (
                        <div key={i} className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-300">
                            <Paperclip className="w-3 h-3 text-slate-500" />
                            <span className="truncate max-w-[150px]">{att.filename}</span>
                            <span className="text-slate-500">({(att.size / 1024).toFixed(0)} KB)</span>
                            <button onClick={() => removeAttachment(i)} className="text-slate-500 hover:text-red-400">
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        multiple
                        className="hidden"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-all"
                    >
                        <Paperclip className="w-3.5 h-3.5" />
                        Attach
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onCancel}
                        className="px-3 py-1.5 text-xs text-slate-400 hover:text-white rounded-lg transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSend}
                        disabled={sending}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white font-bold text-sm rounded-xl transition-all disabled:cursor-not-allowed"
                    >
                        {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        {sending ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </div>
        </div>
    );
}
