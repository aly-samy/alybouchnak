import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAdminAuth } from './lib/adminAuth';
import { useState, useEffect, useCallback } from 'react';
import {
    Music,
    Disc3,
    LayoutDashboard,
    LogOut,
    ExternalLink,
    Library,
    Sparkles,
    FileText,
    HelpCircle,
    Users,
    Mail
} from 'lucide-react';

const navItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/inbox', label: 'Inbox', icon: Mail, end: false, badge: true },
    { to: '/admin/tracks', label: 'Tracks', icon: Music, end: false },
    { to: '/admin/albums', label: 'Albums', icon: Disc3, end: false },
    { to: '/admin/playlists', label: 'Playlists', icon: Library, end: false },
    { to: '/admin/themes', label: 'Themes', icon: Sparkles, end: false },
    { to: '/admin/articles', label: 'Articles & News', icon: FileText, end: false },
    { to: '/admin/faqs', label: 'FAQs', icon: HelpCircle, end: false },
    { to: '/admin/subscribers', label: 'Subscribers', icon: Users, end: false },
];

export default function AdminLayout() {
    const { logout, token } = useAdminAuth();
    const navigate = useNavigate();
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchUnreadCount = useCallback(async () => {
        try {
            const res = await fetch('/.netlify/functions/mailgun-threads/unread-count', {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setUnreadCount(data.unreadCount || 0);
            }
        } catch {
            // silently fail
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            fetchUnreadCount();
            const interval = setInterval(fetchUnreadCount, 30000);
            return () => clearInterval(interval);
        }
    }, [token, fetchUnreadCount]);

    const handleLogout = () => {
        logout();
        navigate('/admin');
    };

    return (
        <div className="min-h-screen bg-slate-950 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col fixed h-full z-10">
                {/* Brand */}
                <div className="p-6 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/25">
                            <Music className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-white font-bold text-sm leading-tight">Aly Bouchnak</p>
                            <p className="text-slate-500 text-xs">Admin Panel</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map(({ to, label, icon: Icon, end, badge }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={end}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${isActive
                                    ? 'bg-orange-500/15 text-orange-400 border border-orange-500/20'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                                }`
                            }
                        >
                            <Icon className="w-4 h-4" />
                            {label}
                            {badge && unreadCount > 0 && (
                                <span className="ml-auto px-1.5 py-0.5 text-[10px] font-bold bg-orange-500 text-white rounded-full min-w-[18px] text-center leading-tight animate-pulse">
                                    {unreadCount}
                                </span>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Footer actions */}
                <div className="p-4 border-t border-slate-800 space-y-1">
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all"
                    >
                        <ExternalLink className="w-4 h-4" />
                        View Website
                    </a>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main content area */}
            <main className="flex-1 ml-64 min-h-screen">
                <Outlet />
            </main>
        </div>
    );
}
