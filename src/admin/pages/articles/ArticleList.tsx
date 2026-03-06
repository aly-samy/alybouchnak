import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { articles as initialArticles } from '../../../data/articles';
import type { Article } from '../../../data/articles';
import { generateArticlesFile } from '../../lib/generateArticles';
import { saveArticlesToGitHub } from '../../lib/githubSave';
import { Plus, Search, Pencil, Trash2, Github, Loader2, ExternalLink, FileText, Newspaper, BookCopy } from 'lucide-react';
import { toast } from 'sonner';

export default function ArticleList() {
    const [articles, setArticles] = useState<Article[]>(initialArticles);
    const [query, setQuery] = useState('');
    const [saving, setSaving] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const navigate = useNavigate();

    const filtered = articles.filter(a =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.slug.includes(query.toLowerCase())
    );

    const handleDelete = () => {
        if (deleteId === null) return;
        setArticles(prev => prev.filter(a => a.id !== deleteId));
        setDeleteId(null);
        toast.success('Article removed locally — remember to sync');
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const content = generateArticlesFile(articles);
            await saveArticlesToGitHub(content);
            toast.success('✅ Articles synced with GitHub!');
        } catch (err) {
            console.error(err);
            toast.error('❌ Sync failed.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Articles & News</h1>
                        <p className="text-slate-400 text-sm mt-1">{articles.length} publications</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-sm font-medium transition-all">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Github className="w-4 h-4" />}
                        Sync GitHub
                    </button>
                    <button onClick={() => navigate('/admin/articles/new')} className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white rounded-xl text-sm font-medium shadow-lg shadow-orange-500/25">
                        <Plus className="w-4 h-4" />
                        New Article
                    </button>
                </div>
            </div>

            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search by title, category or slug..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500/50"
                />
            </div>

            <div className="grid gap-4">
                {filtered.map(article => (
                    <div key={article.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-5 group hover:border-slate-700 transition-all">
                        <div className="w-20 h-16 rounded-xl bg-slate-800 overflow-hidden shrink-0 border border-slate-800">
                            <img src={article.coverImage.url} className="w-full h-full object-cover" onError={e => e.currentTarget.src = '/images/placeholder.webp'} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${article.type === 'NewsArticle' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'
                                    }`}>
                                    {article.type === 'NewsArticle' ? <Newspaper className="inline w-3 h-3 mr-1" /> : <BookCopy className="inline w-3 h-3 mr-1" />}
                                    {article.type}
                                </span>
                                <span className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-400 rounded-full font-bold uppercase">{article.category}</span>
                            </div>
                            <h3 className="text-white font-bold truncate">{article.title}</h3>
                            <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                                <span>Published: {new Date(article.datePublished).toLocaleDateString()}</span>
                                <span className="text-slate-700">•</span>
                                <span>{article.seo.readingTime} read</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <a href={`/article/${article.slug}`} target="_blank" className="p-2 text-slate-400 hover:text-slate-200 rounded-xl hover:bg-slate-800"><ExternalLink className="w-4 h-4" /></a>
                            <button onClick={() => navigate(`/admin/articles/${article.slug}/edit`)} className="p-2 text-slate-400 hover:text-orange-400 rounded-xl hover:bg-orange-500/10"><Pencil className="w-4 h-4" /></button>
                            <button onClick={() => setDeleteId(article.id)} className="p-2 text-slate-400 hover:text-red-400 rounded-xl hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    </div>
                ))}
            </div>

            {deleteId !== null && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                        <h3 className="text-white font-bold text-lg mb-4">Delete Article?</h3>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold">Cancel</button>
                            <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl font-bold">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
