import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { themeCollections as allCollectionsData } from '../../../data/themeCollections';
import type { ThemeCollection } from '../../../data/themeCollections';
import { tracks as allTracks } from '../../../data/tracks';
import { generateThemeCollectionsFile } from '../../lib/generateThemeCollections';
import { saveThemeCollectionsToGitHub } from '../../lib/githubSave';
import { toast } from 'sonner';
import { Trash2, ArrowLeft, Github, Loader2, Sparkles, BookOpen, Brain, ListMusic, Globe } from 'lucide-react';

type FormData = Omit<ThemeCollection, 'id'> & { id?: number, ageFrom?: string, ageTo?: string };

const TABS = [
    { id: 'Discovery', icon: Sparkles },
    { id: 'Narrative', icon: BookOpen },
    { id: 'Science', icon: Brain },
    { id: 'Tracks', icon: ListMusic },
    { id: 'SEO', icon: Globe }
] as const;

const inputCls = "w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all";
const textareaCls = `${inputCls} resize-y min-h-[120px]`;

const quillModules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'clean']
    ],
};

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-400 tracking-wide uppercase px-1">{label}</label>
            {children}
            {hint && <p className="text-xs text-slate-500">{hint}</p>}
        </div>
    );
}

export default function ThemeCollectionForm() {
    const { slug } = useParams<{ slug?: string }>();
    const navigate = useNavigate();
    const isNew = !slug;
    const existing = isNew ? null : allCollectionsData.find(c => c.slug === slug);
    const [activeTab, setActiveTab] = useState<typeof TABS[number]['id']>('Discovery');
    const [saving, setSaving] = useState(false);

    let defaultAgeFrom = '0';
    let defaultAgeTo = '16';
    if (existing?.ageRange) {
        const match = existing.ageRange.match(/(\d+)\s*-\s*(\d+)/);
        if (match) {
            defaultAgeFrom = match[1];
            defaultAgeTo = match[2];
        }
    }

    const defaultValues: Partial<FormData> = existing ? {
        ...existing,
        ageFrom: defaultAgeFrom,
        ageTo: defaultAgeTo
    } : {
        artist: 'Aly Bouchnak',
        id: (allCollectionsData.length + 1),
        status: 'available',
        category: 'Routine & Utility',
        ageFrom: defaultAgeFrom,
        ageTo: defaultAgeTo,
        educationalBenefits: [{ title: '', description: '' }],
        trackIds: [],
    };

    const { register, control, handleSubmit, watch, setValue } = useForm<FormData>({ defaultValues: defaultValues as FormData });
    const { fields: benefitFields, append: appendBenefit, remove: removeBenefit } = useFieldArray({ control, name: 'educationalBenefits' });

    const onSubmit = async (data: FormData) => {
        setSaving(true);
        try {
            data.ageRange = `${data.ageFrom}-${data.ageTo} years`;
            const payload = { ...data };
            delete payload.ageFrom;
            delete payload.ageTo;

            let updated: ThemeCollection[];
            if (isNew) updated = [...allCollectionsData, payload as ThemeCollection];
            else updated = allCollectionsData.map(c => (c.slug === slug ? (payload as ThemeCollection) : c));

            const content = generateThemeCollectionsFile(updated);
            await saveThemeCollectionsToGitHub(content);
            toast.success('✅ Updated Theme Collections on GitHub!');
            navigate('/admin/themes');
        } catch (err) {
            console.error(err);
            toast.error('❌ Failed to save collection.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-8 max-w-5xl">
            <div className="flex items-center gap-6 mb-10">
                <button onClick={() => navigate('/admin/themes')} className="p-3 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-2xl transition-all"><ArrowLeft /></button>
                <div>
                    <h1 className="text-3xl font-black text-white">{isNew ? 'New Musical Theme' : `Editing Theme: ${existing?.title}`}</h1>
                    <p className="text-slate-500 mt-1">A themed journey across various tracks and albums.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-2 bg-slate-900/50 backdrop-blur-md p-2 rounded-[2.5rem] border border-slate-800 mb-10">
                    {TABS.map(({ id, icon: Icon }) => (
                        <button
                            key={id}
                            type="button"
                            onClick={() => setActiveTab(id)}
                            className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-[2rem] text-sm font-black transition-all ${activeTab === id
                                ? 'bg-orange-500 text-white shadow-2xl shadow-orange-500/40'
                                : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800'}`}
                        >
                            <Icon className="w-5 h-5" />
                            {id}
                        </button>
                    ))}
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 space-y-8 shadow-2xl">
                    {activeTab === 'Discovery' && (
                        <>
                            <div className="grid grid-cols-2 gap-8">
                                <Field label="Full Title"><input {...register('title', { required: true })} className={inputCls} /></Field>
                                <Field label="URL Slug"><input {...register('slug', { required: true })} className={inputCls} /></Field>
                            </div>
                            <Field label="Short Subtitle"><input {...register('subtitle')} className={inputCls} /></Field>
                            <div className="grid grid-cols-2 gap-8">
                                <Field label="Category">
                                    <select {...register('category', { required: true })} className={inputCls}>
                                        <option value="Routine & Utility">Routine & Utility</option>
                                        <option value="Mood & Energy">Mood & Energy</option>
                                        <option value="Adventure & Event">Adventure & Event</option>
                                        <option value="Signature Collections">Signature Collections</option>
                                    </select>
                                </Field>
                                <Field label="Target Age Range">
                                    <div className="flex items-center gap-2">
                                        <select {...register('ageFrom')} className={inputCls}>
                                            {Array.from({ length: 17 }).map((_, i) => <option key={`from-${i}`} value={i}>{i}</option>)}
                                        </select>
                                        <span className="text-slate-400">to</span>
                                        <select {...register('ageTo')} className={inputCls}>
                                            {Array.from({ length: 17 }).map((_, i) => <option key={`to-${i}`} value={i}>{i}</option>)}
                                        </select>
                                        <span className="text-slate-400">years</span>
                                    </div>
                                </Field>
                            </div>
                            <div className="grid grid-cols-2 gap-8 mt-8">
                                <Field label="Primary Mood"><input {...register('mood')} className={inputCls} /></Field>
                                <Field label="Cover Image"><input {...register('coverImage')} className={inputCls} /></Field>
                            </div>
                            <div className="grid grid-cols-2 gap-8 mt-8">
                                <Field label="Total Items"><input {...register('trackCount', { valueAsNumber: true })} type="number" className={inputCls} /></Field>
                                <Field label="Release Season"><input {...register('releaseDate')} placeholder="Spring 2026" className={inputCls} /></Field>
                            </div>
                        </>
                    )}

                    {activeTab === 'Narrative' && (
                        <div className="space-y-6">
                            <Field label="Musical Narrative (Main Description)">
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="bg-white rounded-xl text-black overflow-hidden">
                                            <ReactQuill theme="snow" modules={quillModules} {...field} />
                                        </div>
                                    )}
                                />
                            </Field>
                            <Field label="Artist Perspective">
                                <Controller
                                    name="artistNote"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="bg-white rounded-xl text-black overflow-hidden">
                                            <ReactQuill theme="snow" modules={quillModules} {...field} />
                                        </div>
                                    )}
                                />
                            </Field>
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Key Core Principles</label>
                                    <button type="button" onClick={() => appendBenefit({ title: '', description: '' })} className="px-4 py-1.5 bg-orange-500/10 text-orange-500 rounded-full text-xs font-black">+ ADD PRINCIPLE</button>
                                </div>
                                <div className="space-y-4">
                                    {benefitFields.map((f, i) => (
                                        <div key={f.id} className="flex gap-4 items-start bg-slate-800/30 p-4 rounded-2xl border border-slate-800">
                                            <div className="flex-1 space-y-3">
                                                <input {...register(`educationalBenefits.${i}.title`)} placeholder="Principle Title" className={inputCls} />
                                                <textarea {...register(`educationalBenefits.${i}.description`)} placeholder="Impact/Details" className={textareaCls} rows={2} />
                                            </div>
                                            <button type="button" onClick={() => removeBenefit(i)} className="p-3 text-slate-600 hover:text-red-400"><Trash2 /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Science' && (
                        <Field label="Developmental & Scientific Framework">
                            <Controller
                                name="scienceFramework"
                                control={control}
                                render={({ field }) => (
                                    <div className="bg-white rounded-xl text-black overflow-hidden">
                                        <ReactQuill theme="snow" modules={quillModules} {...field} />
                                    </div>
                                )}
                            />
                        </Field>
                    )}

                    {activeTab === 'Tracks' && (
                        <div className="space-y-6">
                            <Field label="Included Tracks (Multi-Select)" hint="Select from your master track library">
                                <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-800 space-y-2 max-h-[500px] overflow-y-auto">
                                    {allTracks.map(track => {
                                        const current = watch('trackIds') || [];
                                        const isChecked = current.includes(track.id);
                                        return (
                                            <label key={track.id} className="flex items-center gap-3 p-3 hover:bg-slate-800/80 rounded-xl cursor-pointer transition-colors group">
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={(e) => {
                                                        const val = e.target.checked
                                                            ? [...current, track.id]
                                                            : current.filter(id => id !== track.id);
                                                        setValue('trackIds', val);
                                                        setValue('trackCount', val.length); // Auto-update total items count
                                                    }}
                                                    className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-orange-500 focus:ring-orange-500/20"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-slate-200 font-bold group-hover:text-orange-400 transition-colors">{track.title}</span>
                                                    <span className="text-xs text-slate-500">{track.duration} • {track.genre}</span>
                                                </div>
                                            </label>
                                        );
                                    })}
                                </div>
                            </Field>
                        </div>
                    )}

                    {activeTab === 'SEO' && (
                        <div className="space-y-8">
                            <Field label="Primary Explore Link (Ex: Spotify)"><input {...register('spotifyUrl')} className={inputCls} /></Field>
                            <div className="grid grid-cols-2 gap-8">
                                <Field label="Internal Link Mapping"><input {...register('otherUrl')} placeholder="/explore/themed" className={inputCls} /></Field>
                                <Field label="Status Flag">
                                    <select {...register('status')} className={inputCls}>
                                        <option value="available">Live Available</option>
                                        <option value="coming-soon">Teaser Mode</option>
                                    </select>
                                </Field>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-12 flex justify-between items-center bg-slate-900 border border-slate-800 p-8 rounded-[3rem] shadow-2xl">
                    <button type="button" onClick={() => navigate('/admin/themes')} className="text-slate-500 font-bold hover:text-white transition-all">Discard Changes</button>
                    <button type="submit" disabled={saving} className="flex items-center gap-4 px-12 py-5 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-black rounded-3xl shadow-2xl shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50">
                        {saving ? <Loader2 className="animate-spin" /> : <Github />}
                        {saving ? 'UPDATING...' : 'PUBLISH COLLECTIONS'}
                    </button>
                </div>
            </form>
        </div>
    );
}
