import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { themeCollections as initialCollections } from '../../../data/themeCollections';
import type { ThemeCollection } from '../../../data/themeCollections';
import { generateThemeCollectionsFile } from '../../lib/generateThemeCollections';
import { saveThemeCollectionsToGitHub } from '../../lib/githubSave';
import { Plus, Search, Pencil, Trash2, Github, Loader2, ExternalLink, Sparkles, Activity } from 'lucide-react';
import { toast } from 'sonner';

export default function ThemeCollectionList() {
    const [collections, setCollections] = useState<ThemeCollection[]>(initialCollections);
    const [query, setQuery] = useState('');
    const [saving, setSaving] = useState(false);
    const [deleteSlug, setDeleteSlug] = useState<string | null>(null);
    const navigate = useNavigate();

    const filtered = collections.filter(c =>
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.slug.includes(query.toLowerCase())
    );

    const handleDelete = () => {
        if (!deleteSlug) return;
        setCollections(prev => prev.filter(c => c.slug !== deleteSlug));
        setDeleteSlug(null);
        toast.success('Collection removed locally');
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const content = generateThemeCollectionsFile(collections);
            await saveThemeCollectionsToGitHub(content);
            toast.success('✅ Theme Collections synced with GitHub!');
        } catch (err) {
            console.error(err);
            toast.error('❌ GitHub sync failed.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Theme Collections</h1>
                        <p className="text-slate-400 text-sm mt-1">{collections.length} collections managed</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-sm font-medium transition-all"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Github className="w-4 h-4" />}
                        Sync GitHub
                    </button>
                    <button
                        onClick={() => navigate('/admin/themes/new')}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-orange-500/25"
                    >
                        <Plus className="w-4 h-4" />
                        New Theme
                    </button>
                </div>
            </div>

            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search themes…"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500/50"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(collection => (
                    <div
                        key={collection.slug}
                        className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden group hover:border-[#F26B3A]/30 transition-all shadow-xl"
                    >
                        <div className="aspect-square bg-slate-800 relative">
                            <img
                                src={collection.coverImage}
                                alt={collection.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                onError={e => { (e.currentTarget as HTMLImageElement).src = '/images/placeholder.webp'; }}
                            />
                            <div className="absolute top-4 right-4 flex gap-2">
                                <button onClick={() => navigate(`/admin/themes/${collection.slug}/edit`)} className="p-2 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-orange-500 transition-colors">
                                    <Pencil className="w-4 h-4" />
                                </button>
                                <button onClick={() => setDeleteSlug(collection.slug)} className="p-2 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-red-500 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-white font-bold text-lg mb-1 truncate">{collection.title}</h3>
                            <p className="text-slate-500 text-xs mb-4 line-clamp-1">{collection.subtitle}</p>
                            <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-4">
                                <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> {collection.mood}</span>
                                <span className="font-bold text-orange-400 capitalize">{collection.status}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {deleteSlug && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-sm w-full shadow-2xl">
                        <h3 className="text-white font-bold text-xl mb-4 text-center">Delete collection?</h3>
                        <div className="flex gap-4">
                            <button onClick={() => setDeleteSlug(null)} className="flex-1 px-4 py-3 bg-slate-800 text-slate-300 rounded-2xl font-bold">Cancel</button>
                            <button onClick={handleDelete} className="flex-1 px-4 py-3 bg-red-500 text-white rounded-2xl font-bold">Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
