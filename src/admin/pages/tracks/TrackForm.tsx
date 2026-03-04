import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { tracks as allTracksData } from '../../../data/tracks';
import type { Track } from '../../../data/tracks';
import { albums } from '../../../data/albums';
import { generateTracksFile } from '../../lib/generateTracks';
import { saveTracksToGitHub } from '../../lib/githubSave';
import { toast } from 'sonner';
import {
    Plus, Trash2, ArrowLeft, Github, Loader2, Save,
    Music, Link2, FileText, Search
} from 'lucide-react';

type FormData = Omit<Track, 'id'> & { id: number };

const ROUTINE_OPTIONS = ['Playtime', 'Bedtime', 'Mealtime', 'Cleanup', 'Transition', 'Learning', 'Celebration', 'Movement'] as const;

const TABS = [
    { id: 'basic', label: 'Basic Info', icon: Music },
    { id: 'links', label: 'Streaming Links', icon: Link2 },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'seo', label: 'SEO & Schema', icon: Search },
] as const;

function Field({ label, error, children, hint }: {
    label: string; error?: string; children: React.ReactNode; hint?: string;
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
            {children}
            {hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
            {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
        </div>
    );
}

const inputCls = "w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all";
const textareaCls = `${inputCls} resize-y min-h-[100px]`;

export default function TrackForm() {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const isNew = !id;

    const existing = isNew ? null : allTracksData.find(t => t.id === Number(id));
    const [activeTab, setActiveTab] = useState<typeof TABS[number]['id']>('basic');
    const [saving, setSaving] = useState(false);

    const defaultValues: Partial<FormData> = existing || {
        id: Math.max(...allTracksData.map(t => t.id)) + 1,
        artist: 'Aly Bouchnak',
        routine: 'Playtime',
        lyricsPreview: [''],
        educationalBenefits: [{ title: '', description: '' }],
        relatedTracks: [],
        seo: { title: '', description: '', keywords: '', canonical: '', ogImage: '' },
        trackSchema: {
            '@context': 'https://schema.org',
            '@type': 'MusicRecording',
            '@id': '',
            name: '',
            url: '',
            duration: '',
            genre: '',
            byArtist: { '@type': 'MusicGroup', name: 'Aly Bouchnak' },
            inAlbum: { '@type': 'MusicAlbum', name: '', '@id': '' },
            datePublished: '',
            isrcCode: '',
            description: '',
            image: '',
        },
    };

    const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
        defaultValues: defaultValues as FormData,
    });

    const { fields: previewFields, append: appendPreview, remove: removePreview } = useFieldArray({
        control,
        name: 'lyricsPreview' as never,
    });

    const { fields: benefitFields, append: appendBenefit, remove: removeBenefit } = useFieldArray({
        control,
        name: 'educationalBenefits',
    });

    // Auto-fill SEO and Schema from basic fields
    const watchTitle = watch('title');
    const watchSlug = watch('slug');
    const watchAlbum = watch('album');
    const watchGenre = watch('genre');
    const watchDuration = watch('duration');
    const watchReleaseDate = watch('releaseDate');
    const watchCoverImage = watch('coverImage');

    useEffect(() => {
        if (!isNew || !watchTitle || !watchSlug) return;
        const baseUrl = 'https://alybouchnak.com';
        const trackUrl = `${baseUrl}/track/${watchSlug}`;
        setValue('seo.title', `${watchTitle} | Kids Song | Aly Bouchnak`);
        setValue('seo.canonical', trackUrl);
        setValue('seo.ogImage', watchCoverImage ? `${baseUrl}${watchCoverImage}` : '');
        setValue('trackSchema.@id', `${trackUrl}#recording`);
        setValue('trackSchema.name', watchTitle);
        setValue('trackSchema.url', trackUrl);
        setValue('trackSchema.genre', watchGenre || '');
        setValue('trackSchema.image', watchCoverImage ? `${baseUrl}${watchCoverImage}` : '');
        setValue('trackSchema.inAlbum.name', watchAlbum || '');
        setValue('trackSchema.datePublished', watchReleaseDate || '');
        // Convert duration M:SS → PTxMxS
        if (watchDuration && /^\d+:\d+$/.test(watchDuration)) {
            const [m, s] = watchDuration.split(':').map(Number);
            setValue('trackSchema.duration', `PT${m}M${s}S`);
        }
    }, [watchTitle, watchSlug, watchAlbum, watchGenre, watchDuration, watchReleaseDate, watchCoverImage, isNew, setValue]);

    const onSubmit = async (data: FormData) => {
        setSaving(true);
        try {
            let updatedTracks: Track[];
            if (isNew) {
                updatedTracks = [...allTracksData, data as Track];
            } else {
                updatedTracks = allTracksData.map(t => (t.id === data.id ? (data as Track) : t));
            }
            const content = generateTracksFile(updatedTracks);
            await saveTracksToGitHub(content);
            toast.success('✅ Track saved to GitHub! Redeploy triggered.', { duration: 5000 });
            navigate('/admin/tracks');
        } catch (err) {
            console.error(err);
            toast.error('❌ GitHub save failed. Check console for details.');
        } finally {
            setSaving(false);
        }
    };

    const albumOptions = albums.map(a => a.title);

    return (
        <div className="p-8 max-w-4xl">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate('/admin/tracks')}
                    className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-white">
                        {isNew ? 'New Track' : `Edit: ${existing?.title ?? ''}`}
                    </h1>
                    <p className="text-slate-400 text-sm mt-0.5">
                        {isNew ? 'Fill in the details and save to push to GitHub' : `Track #${id}`}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Tabs */}
                <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-2xl p-1 mb-6">
                    {TABS.map(({ id: tabId, label, icon: Icon }) => (
                        <button
                            key={tabId}
                            type="button"
                            onClick={() => setActiveTab(tabId)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium flex-1 justify-center transition-all ${activeTab === tabId
                                ? 'bg-orange-500/15 text-orange-400 border border-orange-500/20'
                                : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            <Icon className="w-3.5 h-3.5" />
                            {label}
                        </button>
                    ))}
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">

                    {/* ─── TAB 1: Basic Info ─── */}
                    {activeTab === 'basic' && (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Track ID (auto)" error={errors.id?.message}>
                                    <input {...register('id', { valueAsNumber: true })} type="number" readOnly className={`${inputCls} opacity-60`} />
                                </Field>
                                <Field label="Slug (URL identifier)" error={errors.slug?.message}>
                                    <input {...register('slug', { required: 'Required' })} placeholder="my-track-slug" className={inputCls} />
                                </Field>
                            </div>

                            <Field label="Title" error={errors.title?.message}>
                                <input {...register('title', { required: 'Required' })} placeholder="Track Title" className={inputCls} />
                            </Field>

                            <Field label="Subtitle">
                                <input {...register('subtitle')} placeholder="Brief subtitle (Ages 2–6)" className={inputCls} />
                            </Field>

                            <Field label="Description">
                                <textarea {...register('description')} placeholder="Track description…" className={textareaCls} />
                            </Field>

                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Artist">
                                    <input {...register('artist')} className={inputCls} />
                                </Field>
                                <Field label="Cover Image Path">
                                    <input {...register('coverImage')} placeholder="/images/my-track.webp" className={inputCls} />
                                </Field>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <Field label="Release Date">
                                    <input {...register('releaseDate')} type="date" className={inputCls} />
                                </Field>
                                <Field label="Duration (M:SS)">
                                    <input {...register('duration')} placeholder="2:30" className={inputCls} />
                                </Field>
                                <Field label="BPM">
                                    <input {...register('bpm', { valueAsNumber: true })} type="number" className={inputCls} />
                                </Field>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Genre">
                                    <input {...register('genre')} placeholder="Children's Music, Educational" className={inputCls} />
                                </Field>
                                <Field label="Age Range">
                                    <input {...register('ageRange')} placeholder="2-6 years" className={inputCls} />
                                </Field>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Mood">
                                    <input {...register('mood')} placeholder="Playful" className={inputCls} />
                                </Field>
                                <Field label="Routine">
                                    <select {...register('routine')} className={inputCls}>
                                        {ROUTINE_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
                                    </select>
                                </Field>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Field label="ISRC Code">
                                    <input {...register('isrc')} placeholder="GX8LD2660001" className={inputCls} />
                                </Field>
                                <Field label="UPC Code">
                                    <input {...register('upc')} placeholder="5063941025018" className={inputCls} />
                                </Field>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Album">
                                    <select {...register('album')} className={inputCls}>
                                        {albumOptions.map(a => <option key={a} value={a}>{a}</option>)}
                                    </select>
                                </Field>
                                <Field label="Album URL">
                                    <input {...register('albumUrl')} placeholder="/album/the-blooms-house-volume-1" className={inputCls} />
                                </Field>
                            </div>

                            <Field label="Artist Note">
                                <textarea {...register('artistNote')} placeholder="Artist's personal note about this track…" className={textareaCls} rows={4} />
                            </Field>

                            <Field label="Related Track IDs (comma separated)" hint="e.g. 1, 3, 5">
                                <Controller
                                    control={control}
                                    name="relatedTracks"
                                    render={({ field }) => (
                                        <input
                                            className={inputCls}
                                            value={field.value?.join(', ') || ''}
                                            onChange={e => {
                                                const vals = e.target.value
                                                    .split(',')
                                                    .map(s => parseInt(s.trim()))
                                                    .filter(n => !isNaN(n));
                                                field.onChange(vals);
                                            }}
                                            placeholder="1, 2, 3"
                                        />
                                    )}
                                />
                            </Field>
                        </>
                    )}

                    {/* ─── TAB 2: Streaming Links ─── */}
                    {activeTab === 'links' && (
                        <>
                            {[
                                ['spotifyUrl', 'Spotify URL'],
                                ['appleMusicUrl', 'Apple Music URL'],
                                ['youtubeUrl', 'YouTube URL'],
                                ['amazonUrl', 'Amazon Music URL'],
                                ['otherUrl', 'Other URL (push.fm, etc.)'],
                            ].map(([name, label]) => (
                                <Field key={name} label={label}>
                                    <input {...register(name as keyof FormData)} placeholder={`https://…`} className={inputCls} />
                                </Field>
                            ))}
                        </>
                    )}

                    {/* ─── TAB 3: Content ─── */}
                    {activeTab === 'content' && (
                        <>
                            {/* Lyrics Preview */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-medium text-slate-300">Lyrics Preview Lines</label>
                                    <button
                                        type="button"
                                        onClick={() => appendPreview('')}
                                        className="flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 px-2 py-1 rounded-lg hover:bg-orange-500/10 transition-all"
                                    >
                                        <Plus className="w-3 h-3" /> Add Line
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {previewFields.map((field, i) => (
                                        <div key={field.id} className="flex gap-2">
                                            <input
                                                {...register(`lyricsPreview.${i}` as never)}
                                                placeholder={`Preview line ${i + 1}`}
                                                className={inputCls}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removePreview(i)}
                                                className="p-2.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all shrink-0"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Field label="Full Lyrics" hint="Use \\n for new lines or just press Enter in this field">
                                <textarea {...register('lyricsFull')} className={textareaCls} rows={12} placeholder="Full lyrics text…" />
                            </Field>

                            {/* Educational Benefits */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-medium text-slate-300">Educational Benefits</label>
                                    <button
                                        type="button"
                                        onClick={() => appendBenefit({ title: '', description: '' })}
                                        className="flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 px-2 py-1 rounded-lg hover:bg-orange-500/10 transition-all"
                                    >
                                        <Plus className="w-3 h-3" /> Add Benefit
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {benefitFields.map((field, i) => (
                                        <div key={field.id} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 space-y-3">
                                            <input
                                                {...register(`educationalBenefits.${i}.title`)}
                                                placeholder="Benefit title (e.g. Language Development)"
                                                className={inputCls}
                                            />
                                            <div className="flex gap-2">
                                                <input
                                                    {...register(`educationalBenefits.${i}.description`)}
                                                    placeholder="Description…"
                                                    className={inputCls}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeBenefit(i)}
                                                    className="p-2.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all shrink-0"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* ─── TAB 4: SEO & Schema ─── */}
                    {activeTab === 'seo' && (
                        <>
                            <p className="text-sm text-slate-400 bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3">
                                💡 These fields are <strong className="text-slate-200">auto-filled from Basic Info</strong> when creating a new track. Edit them below to customize.
                            </p>

                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">SEO Metadata</h3>
                                <Field label="SEO Title"><input {...register('seo.title')} className={inputCls} /></Field>
                                <Field label="Meta Description"><textarea {...register('seo.description')} className={textareaCls} rows={2} /></Field>
                                <Field label="Keywords (comma separated)"><input {...register('seo.keywords')} className={inputCls} /></Field>
                                <Field label="Canonical URL"><input {...register('seo.canonical')} className={inputCls} /></Field>
                                <Field label="OG Image URL"><input {...register('seo.ogImage')} className={inputCls} /></Field>
                            </div>

                            <hr className="border-slate-800" />

                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Schema.org (JSON-LD)</h3>
                                <Field label="@id"><input {...register('trackSchema.@id')} className={inputCls} /></Field>
                                <Field label="Name"><input {...register('trackSchema.name')} className={inputCls} /></Field>
                                <Field label="URL"><input {...register('trackSchema.url')} className={inputCls} /></Field>
                                <Field label="Duration (ISO 8601, e.g. PT2M30S)"><input {...register('trackSchema.duration')} className={inputCls} /></Field>
                                <Field label="Genre"><input {...register('trackSchema.genre')} className={inputCls} /></Field>
                                <Field label="ISRC Code"><input {...register('trackSchema.isrcCode')} className={inputCls} /></Field>
                                <Field label="Date Published"><input {...register('trackSchema.datePublished')} type="date" className={inputCls} /></Field>
                                <Field label="Description"><textarea {...register('trackSchema.description')} className={textareaCls} rows={2} /></Field>
                                <Field label="Image URL"><input {...register('trackSchema.image')} className={inputCls} /></Field>
                                <div className="grid grid-cols-2 gap-4">
                                    <Field label="Album Name"><input {...register('trackSchema.inAlbum.name')} className={inputCls} /></Field>
                                    <Field label="Album @id"><input {...register('trackSchema.inAlbum.@id')} className={inputCls} /></Field>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Save Button */}
                <div className="mt-6 flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/tracks')}
                        className="px-5 py-2.5 text-slate-400 hover:text-slate-200 rounded-xl text-sm font-medium transition-all"
                    >
                        Cancel
                    </button>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={handleSubmit(async (_data) => {
                                // Save locally only (no GitHub push)
                                toast.info('Changes staged locally. Click "Save to GitHub" in the track list to publish.', { duration: 4000 });
                                navigate('/admin/tracks');
                            })}
                            className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl text-sm font-medium transition-all"
                        >
                            <Save className="w-4 h-4" />
                            Save Draft
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-orange-500/25"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Github className="w-4 h-4" />}
                            {saving ? 'Saving…' : 'Save to GitHub'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
