import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Track } from '../../../data/tracks';
import { useNeonData } from '../../lib/useNeonData';
import { Plus, Search, Pencil, Trash2, Loader2, ExternalLink } from 'lucide-react';

export default function TrackList() {
    const { data: tracks, loading, deleteItem } = useNeonData<Track>('tracks');
    const [query, setQuery] = useState('');
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const navigate = useNavigate();

    const filtered = tracks.filter(
        t =>
            t.title.toLowerCase().includes(query.toLowerCase()) ||
            t.slug.toLowerCase().includes(query.toLowerCase()) ||
            t.album.toLowerCase().includes(query.toLowerCase())
    );

    const confirmDelete = (id: number) => setDeleteId(id);

    const handleDelete = async () => {
        if (deleteId === null) return;
        await deleteItem(deleteId);
        setDeleteId(null);
    };

    if (loading) {
        return <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-orange-500" /></div>;
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Tracks</h1>
                    <p className="text-slate-400 text-sm mt-1">{tracks.length} tracks total</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/admin/tracks/new')}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-orange-500/25"
                    >
                        <Plus className="w-4 h-4" />
                        Add Track
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search by title, slug or album…"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500"
                />
            </div>

            {/* Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-800">
                            <th className="text-left px-4 py-3 text-slate-400 font-medium w-12">#</th>
                            <th className="text-left px-4 py-3 text-slate-400 font-medium">Title</th>
                            <th className="text-left px-4 py-3 text-slate-400 font-medium hidden md:table-cell">Album</th>
                            <th className="text-left px-4 py-3 text-slate-400 font-medium hidden lg:table-cell">BPM</th>
                            <th className="text-left px-4 py-3 text-slate-400 font-medium hidden lg:table-cell">Released</th>
                            <th className="text-right px-4 py-3 text-slate-400 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(track => (
                            <tr key={track.id} className="border-b border-slate-800/60 hover:bg-slate-800/30 transition-colors group">
                                <td className="px-4 py-3 text-slate-500 font-mono text-xs">{track.id}</td>
                                <td className="px-4 py-3">
                                    <div className="text-white font-medium truncate max-w-[220px]">{track.title}</div>
                                    <div className="text-slate-500 text-xs">{track.slug}</div>
                                </td>
                                <td className="px-4 py-3 hidden md:table-cell text-slate-400 truncate max-w-[160px]">{track.album}</td>
                                <td className="px-4 py-3 hidden lg:table-cell text-slate-400">{track.bpm}</td>
                                <td className="px-4 py-3 hidden lg:table-cell text-slate-400">{track.releaseDate}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <a
                                            href={`/track/${track.slug}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-700 transition-all"
                                            title="View on site"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                        <button
                                            onClick={() => navigate(`/admin/tracks/${track.id}/edit`)}
                                            className="p-1.5 text-slate-400 hover:text-orange-400 rounded-lg hover:bg-orange-500/10 transition-all"
                                            title="Edit"
                                        >
                                            <Pencil className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={() => confirmDelete(track.id)}
                                            className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-4 py-12 text-center text-slate-500">
                                    No tracks found for "{query}"
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Delete confirmation modal */}
            {deleteId !== null && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                        <h3 className="text-white font-semibold text-lg mb-2">Delete Track?</h3>
                        <p className="text-slate-400 text-sm mb-6">
                            Are you sure you want to delete{' '}
                            <span className="text-white font-medium">
                                "{tracks.find(t => t.id === deleteId)?.title}"
                            </span>
                            ? This will be removed from the database permanently.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-xl text-sm font-medium transition-all"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
