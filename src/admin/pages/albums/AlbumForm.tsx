import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { albums as allAlbumsData } from '../../../data/albums';
import type { Album } from '../../../data/albums';
import { generateAlbumsFile } from '../../lib/generateAlbums';
import { saveAlbumsToGitHub } from '../../lib/githubSave';
import { toast } from 'sonner';
import { Plus, Trash2, ArrowLeft, Github, Loader2 } from 'lucide-react';

type FormData = Album;

const TABS = ['Basic Info', 'Streaming Links', 'Track Listing', 'Content'] as const;

const inputCls = "w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all";
const textareaCls = `${inputCls} resize-y min-h-[100px]`;

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
            {children}
            {hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
        </div>
    );
}

export default function AlbumForm() {
    const { slug } = useParams<{ slug?: string }>();
    const navigate = useNavigate();
    const isNew = !slug;
    const existing = isNew ? null : allAlbumsData.find(a => a.slug === slug);
    const [activeTab, setActiveTab] = useState<typeof TABS[number]>('Basic Info');
    const [saving, setSaving] = useState(false);

    const defaultValues: Partial<FormData> = existing || {
        artist: 'Aly Bouchnak',
        id: (allAlbumsData.length + 1),
        status: 'available' as const,
        educationalBenefits: [{ title: '', description: '' }],
        tracks: [{ title: '', duration: '' }],
    };

    const { register, control, handleSubmit } = useForm<FormData>({
        defaultValues: defaultValues as FormData,
    });

    const { fields: benefitFields, append: appendBenefit, remove: removeBenefit } = useFieldArray({ control, name: 'educationalBenefits' });
    const { fields: trackFields, append: appendTrack, remove: removeTrack } = useFieldArray({ control, name: 'tracks' });

    const onSubmit = async (data: FormData) => {
        setSaving(true);
        try {
            let updatedAlbums: Album[];
            if (isNew) {
                updatedAlbums = [...allAlbumsData, data];
            } else {
                updatedAlbums = allAlbumsData.map(a => (a.slug === data.slug ? data : a));
            }
            const content = generateAlbumsFile(updatedAlbums);
            await saveAlbumsToGitHub(content);
            toast.success('✅ Album saved to GitHub! Redeploy triggered.', { duration: 5000 });
            navigate('/admin/albums');
        } catch (err) {
            console.error(err);
            toast.error('❌ GitHub save failed.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate('/admin/albums')}
                    className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-white">
                        {isNew ? 'New Album' : `Edit: ${existing?.title ?? ''}`}
                    </h1>
                    <p className="text-slate-400 text-sm mt-0.5">{isNew ? 'Fill in the details and save to GitHub' : `Slug: ${slug}`}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Tabs */}
                <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-2xl p-1 mb-6">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === tab
                                    ? 'bg-orange-500/15 text-orange-400 border border-orange-500/20'
                                    : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">

                    {activeTab === 'Basic Info' && (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Slug (URL)">
                                    <input {...register('slug', { required: true })} placeholder="my-album-slug" className={inputCls} />
                                </Field>
                                <Field label="ID">
                                    <input {...register('id', { valueAsNumber: true })} type="number" className={`${inputCls} opacity-60`} readOnly={!isNew} />
                                </Field>
                            </div>
                            <Field label="Title"><input {...register('title', { required: true })} placeholder="Album Title" className={inputCls} /></Field>
                            <Field label="Subtitle"><input {...register('subtitle')} className={inputCls} /></Field>
                            <Field label="Description"><textarea {...register('description')} className={textareaCls} /></Field>
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Artist"><input {...register('artist')} className={inputCls} /></Field>
                                <Field label="Cover Image Path"><input {...register('coverImage')} placeholder="/images/my-album.webp" className={inputCls} /></Field>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <Field label="Release Date"><input {...register('releaseDate')} type="date" className={inputCls} /></Field>
                                <Field label="Track Count"><input {...register('trackCount', { valueAsNumber: true })} type="number" className={inputCls} /></Field>
                                <Field label="Duration"><input {...register('duration')} placeholder="25:00" className={inputCls} /></Field>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Genre"><input {...register('genre')} className={inputCls} /></Field>
                                <Field label="Age Range"><input {...register('ageRange')} placeholder="0-3 years" className={inputCls} /></Field>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Mood"><input {...register('mood')} className={inputCls} /></Field>
                                <Field label="UPC"><input {...register('upc')} className={inputCls} /></Field>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Status">
                                    <select {...register('status')} className={inputCls}>
                                        <option value="available">Available</option>
                                        <option value="coming-soon">Coming Soon</option>
                                    </select>
                                </Field>
                                <Field label="Other URL (push.fm etc.)"><input {...register('otherUrl')} className={inputCls} /></Field>
                            </div>

                            {/* Educational Benefits */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-medium text-slate-300">Educational Benefits</label>
                                    <button type="button" onClick={() => appendBenefit({ title: '', description: '' })}
                                        className="flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 px-2 py-1 rounded-lg hover:bg-orange-500/10 transition-all">
                                        <Plus className="w-3 h-3" /> Add
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {benefitFields.map((f, i) => (
                                        <div key={f.id} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 space-y-2">
                                            <input {...register(`educationalBenefits.${i}.title`)} placeholder="Benefit title" className={inputCls} />
                                            <div className="flex gap-2">
                                                <input {...register(`educationalBenefits.${i}.description`)} placeholder="Description" className={inputCls} />
                                                <button type="button" onClick={() => removeBenefit(i)}
                                                    className="p-2.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all shrink-0">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'Streaming Links' && (
                        <>
                            {[
                                ['spotifyUrl', 'Spotify URL'],
                                ['appleMusicUrl', 'Apple Music URL'],
                                ['youtubeUrl', 'YouTube URL'],
                                ['amazonUrl', 'Amazon Music URL'],
                            ].map(([name, label]) => (
                                <Field key={name} label={label}>
                                    <input {...register(name as keyof FormData)} placeholder="https://…" className={inputCls} />
                                </Field>
                            ))}
                        </>
                    )}

                    {activeTab === 'Track Listing' && (
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-sm font-medium text-slate-300">Tracks in this Album</label>
                                <button type="button" onClick={() => appendTrack({ title: '', duration: '' })}
                                    className="flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 px-2 py-1 rounded-lg hover:bg-orange-500/10 transition-all">
                                    <Plus className="w-3 h-3" /> Add Track
                                </button>
                            </div>
                            <div className="space-y-3">
                                {trackFields?.map((f, i) => (
                                    <div key={f.id} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 space-y-3">
                                        <div className="grid grid-cols-3 gap-3">
                                            <Field label="#"><input {...register(`tracks.${i}.number`, { valueAsNumber: true })} type="number" className={inputCls} defaultValue={i + 1} /></Field>
                                            <div className="col-span-2"><Field label="Title"><input {...register(`tracks.${i}.title`)} className={inputCls} /></Field></div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-3">
                                            <Field label="Duration"><input {...register(`tracks.${i}.duration`)} placeholder="2:30" className={inputCls} /></Field>
                                            <Field label="Mood"><input {...register(`tracks.${i}.mood`)} className={inputCls} /></Field>
                                            <Field label="Slug"><input {...register(`tracks.${i}.slug`)} className={inputCls} /></Field>
                                        </div>
                                        <div className="flex gap-2 items-end">
                                            <div className="flex-1"><Field label="Description"><input {...register(`tracks.${i}.description`)} className={inputCls} /></Field></div>
                                            <button type="button" onClick={() => removeTrack(i)}
                                                className="p-2.5 mb-0.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all shrink-0">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'Content' && (
                        <>
                            <Field label="Artist Note">
                                <textarea {...register('artistNote')} className={textareaCls} rows={8} placeholder="Personal note about this album…" />
                            </Field>
                            <Field label="Science Framework">
                                <textarea {...register('scienceFramework')} className={textareaCls} rows={8} placeholder="The science behind the album…" />
                            </Field>
                        </>
                    )}
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <button type="button" onClick={() => navigate('/admin/albums')}
                        className="px-5 py-2.5 text-slate-400 hover:text-slate-200 rounded-xl text-sm font-medium transition-all">
                        Cancel
                    </button>
                    <button type="submit" disabled={saving}
                        className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-orange-500/25">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Github className="w-4 h-4" />}
                        {saving ? 'Saving…' : 'Save to GitHub'}
                    </button>
                </div>
            </form>
        </div>
    );
}
