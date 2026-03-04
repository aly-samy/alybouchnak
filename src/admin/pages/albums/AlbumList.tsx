import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { albums as initialAlbums } from '../../../data/albums';
import type { Album } from '../../../data/albums';
import { generateAlbumsFile } from '../../lib/generateAlbums';
import { saveAlbumsToGitHub } from '../../lib/githubSave';
import { Plus, Search, Pencil, Trash2, Github, Loader2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export default function AlbumList() {
    const [albums, setAlbums] = useState<Album[]>(initialAlbums);
    const [query, setQuery] = useState('');
    const [saving, setSaving] = useState(false);
    const [deleteSlug, setDeleteSlug] = useState<string | null>(null);
    const navigate = useNavigate();

    const filtered = albums.filter(a =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.slug.includes(query.toLowerCase())
    );

    const handleDelete = () => {
        if (!deleteSlug) return;
        setAlbums(prev => prev.filter(a => a.slug !== deleteSlug));
        setDeleteSlug(null);
        toast.success('Album removed — click "Save to GitHub" to publish');
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const content = generateAlbumsFile(albums);
            await saveAlbumsToGitHub(content);
            toast.success('✅ Albums saved to GitHub! Redeploy triggered.', { duration: 5000 });
        } catch (err) {
            console.error(err);
            toast.error('❌ GitHub save failed. Check your token/repo settings.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Albums</h1>
                    <p className="text-slate-400 text-sm mt-1">{albums.length} albums total</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Github className="w-4 h-4" />}
                        Save to GitHub
                    </button>
                    <button
                        onClick={() => navigate('/admin/albums/new')}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-orange-500/25"
                    >
                        <Plus className="w-4 h-4" />
                        Add Album
                    </button>
                </div>
            </div>

            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search by title or slug…"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500"
                />
            </div>

            <div className="grid gap-4">
                {filtered.map(album => (
                    <div
                        key={album.slug}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-5 group hover:border-slate-700 transition-all"
                    >
                        <div className="w-16 h-16 rounded-xl bg-slate-800 overflow-hidden shrink-0">
                            <img
                                src={album.coverImage}
                                alt={album.title}
                                className="w-full h-full object-cover"
                                onError={e => { (e.currentTarget as HTMLImageElement).src = '/images/placeholder.webp'; }}
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-white font-semibold truncate">{album.title}</div>
                            <div className="text-slate-400 text-sm">{album.slug}</div>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-lg">{album.trackCount} tracks</span>
                                <span className="text-xs text-slate-500">{album.releaseDate}</span>
                                <span className="text-xs text-slate-500">{album.duration}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <a
                                href={`/album/${album.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-slate-400 hover:text-slate-200 rounded-xl hover:bg-slate-800 transition-all"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                            <button
                                onClick={() => navigate(`/admin/albums/${album.slug}/edit`)}
                                className="p-2 text-slate-400 hover:text-orange-400 rounded-xl hover:bg-orange-500/10 transition-all"
                            >
                                <Pencil className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setDeleteSlug(album.slug)}
                                className="p-2 text-slate-400 hover:text-red-400 rounded-xl hover:bg-red-500/10 transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && (
                    <div className="text-center py-12 text-slate-500">No albums found</div>
                )}
            </div>

            {deleteSlug !== null && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                        <h3 className="text-white font-semibold text-lg mb-2">Delete Album?</h3>
                        <p className="text-slate-400 text-sm mb-6">
                            Delete <span className="text-white font-medium">"{albums.find(a => a.slug === deleteSlug)?.title}"</span>? This will be committed to GitHub.
                        </p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteSlug(null)} className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium transition-all">Cancel</button>
                            <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-xl text-sm font-medium transition-all">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
