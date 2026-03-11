import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Playlist } from '../../../data/playlists';
import { useNeonData } from '../../lib/useNeonData';
import { Plus, Search, Pencil, Trash2, Loader2, ExternalLink, Library, Disc } from 'lucide-react';

export default function PlaylistList() {
    const { data: playlists, loading, deleteItem } = useNeonData<Playlist>('playlists');
    const [query, setQuery] = useState('');
    const [deleteSlug, setDeleteSlug] = useState<string | null>(null);
    const navigate = useNavigate();

    const filtered = playlists.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.slug.toLowerCase().includes(query.toLowerCase())
    );

    const handleDelete = async () => {
        if (!deleteSlug) return;
        const target = playlists.find(p => p.slug === deleteSlug);
        if (target?.id) {
            await deleteItem(target.id);
        }
        setDeleteSlug(null);
    };

    if (loading) {
        return <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-orange-500" /></div>;
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                        <Library className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Playlists</h1>
                        <p className="text-slate-400 text-sm mt-1">{playlists.length} playlists curated</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/admin/playlists/new')}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-orange-500/25"
                    >
                        <Plus className="w-4 h-4" />
                        New Playlist
                    </button>
                </div>
            </div>

            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search playlists…"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                />
            </div>

            <div className="grid gap-4">
                {filtered.map(playlist => (
                    <div
                        key={playlist.slug}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-5 group hover:border-slate-700 transition-all"
                    >
                        <div className="w-16 h-16 rounded-xl bg-slate-800 overflow-hidden shrink-0 border border-slate-800">
                            <img
                                src={playlist.coverImage}
                                alt={playlist.title}
                                className="w-full h-full object-cover"
                                onError={e => { (e.currentTarget as HTMLImageElement).src = '/images/placeholder.webp'; }}
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-white font-semibold flex items-center gap-2">
                                {playlist.title}
                                <span className="text-[10px] uppercase tracking-wider bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">Playlist</span>
                            </div>
                            <div className="text-slate-500 text-xs mt-0.5">{playlist.slug}</div>
                            <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                                <span className="flex items-center gap-1"><Disc className="w-3 h-3" /> {playlist.trackCount} tracks</span>
                                <span className="bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded">{playlist.mood}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <a
                                href={`/playlist/${playlist.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-slate-400 hover:text-slate-200 rounded-xl hover:bg-slate-800 transition-all"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                            <button
                                onClick={() => navigate(`/admin/playlists/${playlist.slug}/edit`)}
                                className="p-2 text-slate-400 hover:text-orange-400 rounded-xl hover:bg-orange-500/10 transition-all"
                            >
                                <Pencil className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setDeleteSlug(playlist.slug)}
                                className="p-2 text-slate-400 hover:text-red-400 rounded-xl hover:bg-red-500/10 transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {deleteSlug && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                        <h3 className="text-white font-semibold text-lg mb-2">Delete Playlist?</h3>
                        <p className="text-slate-400 text-sm mb-6">Are you sure you want to remove this playlist? This will be removed from the database permanently.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteSlug(null)} className="flex-1 px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-sm font-medium">Cancel</button>
                            <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl text-sm font-medium">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
