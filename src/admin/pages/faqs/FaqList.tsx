import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faqs, type FAQ } from '../../../data/faqs';
import { generateFaqsFile } from '../../lib/generateFaqs';
import { saveFaqsToGitHub } from '../../lib/githubSave';
import { toast } from 'sonner';
import { Search, Plus, Trash2, Edit2, HelpCircle } from 'lucide-react';

export default function FaqList() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [isDeleting, setIsDeleting] = useState<number | null>(null);

    const filtered = faqs.filter(f =>
        f.question.toLowerCase().includes(search.toLowerCase()) ||
        f.category.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = async (faqToDelete: FAQ) => {
        if (!confirm(`Are you sure you want to delete "${faqToDelete.question}"?`)) return;

        setIsDeleting(faqToDelete.id);
        try {
            const updated = faqs.filter(f => f.id !== faqToDelete.id);
            const content = generateFaqsFile(updated);
            await saveFaqsToGitHub(content);
            toast.success('FAQ deleted successfully!');
            setTimeout(() => window.location.reload(), 1000);
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete FAQ');
        } finally {
            setIsDeleting(null);
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <HelpCircle className="w-6 h-6 text-orange-500" /> FAQs
                    </h1>
                    <p className="text-slate-400 mt-1">Manage Frequently Asked Questions</p>
                </div>
                <button
                    onClick={() => navigate('/admin/faqs/new')}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl font-bold hover:scale-105 transition-all shadow-lg"
                >
                    <Plus className="w-4 h-4" /> Add FAQ
                </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-4 border-b border-slate-800 bg-slate-900/50">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search questions or categories..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-950/50 text-slate-400 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold">Category</th>
                                <th className="px-6 py-4 font-bold">Question / Answer Snippet</th>
                                <th className="px-6 py-4 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-12 text-center text-slate-500 font-medium">
                                        No FAQs found
                                    </td>
                                </tr>
                            ) : (
                                filtered.map(f => (
                                    <tr key={f.id} className="hover:bg-slate-800/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 whitespace-nowrap">
                                                {f.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 w-full">
                                            <p className="text-white font-medium mb-1">{f.question}</p>
                                            <p className="text-slate-400 text-sm line-clamp-1">{f.answer}</p>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => navigate(`/admin/faqs/${f.id}/edit`)}
                                                    className="p-2 text-slate-400 border border-slate-700 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(f)}
                                                    disabled={isDeleting === f.id}
                                                    className="p-2 text-red-500/70 border border-slate-700 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors disabled:opacity-50"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
