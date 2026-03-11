import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { FAQ } from '../../../data/faqs';
import { useNeonData } from '../../lib/useNeonData';
import { toast } from 'sonner';
import { ArrowLeft, Loader2, Save } from 'lucide-react';

export default function FaqForm() {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const isNew = !id;
    const existingId = id ? parseInt(id, 10) : null;

    const { data: allFaqsData, loading: faqsLoading, saveItem } = useNeonData<FAQ>('faqs');

    const [saving, setSaving] = useState(false);

    const existing = isNew ? null : allFaqsData?.find(f => f.id === existingId);
    const formKey = isNew ? 'new-faq' : `edit-faq-${existing?.id}`;

    if (!isNew && (faqsLoading || !existing)) {
        return <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-orange-500" /></div>;
    }

    const defaultValues: Partial<FAQ> = existing || {
        id: allFaqsData.length > 0 ? Math.max(...allFaqsData.map(f => f.id!)) + 1 : 1,
        category: 'General',
        question: '',
        answer: ''
    };

    const { register, handleSubmit } = useForm<FAQ>({ defaultValues: defaultValues as FAQ });

    const onSubmit = async (data: FAQ) => {
        setSaving(true);
        try {
            await saveItem(data, isNew);
            toast.success('✅ FAQ Saved to Neon!');
            navigate('/admin/faqs');
        } catch (err) {
            console.error(err);
            toast.error('❌ Failed to save FAQ.');
        } finally {
            setSaving(false);
        }
    };

    const inputCls = "w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all";

    return (
        <div key={formKey} className="p-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate('/admin/faqs')} className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-2xl font-black text-white">{isNew ? 'Create New FAQ' : 'Edit FAQ'}</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">

                <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-400">Category</label>
                    <select {...register('category', { required: true })} className={inputCls}>
                        <option value="About Aly Bouchnak">About Aly Bouchnak</option>
                        <option value="Music & Parenting">Music & Parenting</option>
                        <option value="The Bloom's House">The Bloom's House</option>
                        <option value="General">General</option>
                    </select>
                </div>

                <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-400">Question</label>
                    <input {...register('question', { required: true })} className={inputCls} placeholder="e.g. Is this music safe for toddlers?" />
                </div>

                <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-400">Answer</label>
                    <textarea
                        {...register('answer', { required: true })}
                        className={`${inputCls} min-h-[200px] resize-y`}
                        placeholder="Yes, the music is calibrated specifically..."
                    />
                    <p className="text-[10px] text-slate-500 italic mt-1">This text is used directly in the frontend and the JSON-LD FAQ Schema.</p>
                </div>

                <div className="pt-6 flex justify-end gap-4 border-t border-slate-800">
                    <button type="button" onClick={() => navigate('/admin/faqs')} className="px-6 text-slate-400 font-bold hover:text-white">Cancel</button>
                    <button type="submit" disabled={saving} className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-black rounded-xl shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50">
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {saving ? 'SAVING...' : 'SAVE FAQ'}
                    </button>
                </div>

            </form>
        </div>
    );
}
