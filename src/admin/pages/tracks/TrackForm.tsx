import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import type { Track } from '../../../data/tracks';
import { useNeonData } from '../../lib/useNeonData';
import { albums as staticAlbums } from '../../../data/albums';
import { saveImageToGitHub } from '../../lib/githubSave';

import { genres as initialGenres } from '../../../data/genres';
import { moods as initialMoods } from '../../../data/moods';
import { routines as initialRoutines } from '../../../data/routines';
import { toast } from 'sonner';
import {
    Plus, Trash2, ArrowLeft, Loader2, Save,
    Music, Link2, FileText, Search, Upload
} from 'lucide-react';

type FormData = Omit<Track, 'id'> & { id: number, ageFrom?: string, ageTo?: string };

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

    const { data: allTracksData, loading: tracksLoading, saveItem } = useNeonData<Track>('tracks');
    const { data: albumsData } = useNeonData<any>('albums');

    const albums = albumsData?.length > 0 ? albumsData : staticAlbums;
    const existing = isNew ? null : allTracksData?.find(t => t.id === Number(id));
    const formKey = isNew ? 'new-trk' : `edit-trk-${existing?.id}`;

    const [activeTab, setActiveTab] = useState<typeof TABS[number]['id']>('basic');
    const [saving, setSaving] = useState(false);

    const [localGenres, setLocalGenres] = useState<string[]>([...initialGenres]);
    const [localMoods, setLocalMoods] = useState<string[]>([...initialMoods]);
    const [localRoutines, setLocalRoutines] = useState<string[]>([...initialRoutines]);
    const [imageFile, setImageFile] = useState<{ name: string, base64: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    let defaultAgeFrom = '0';
    let defaultAgeTo = '16';
    if (existing?.ageRange) {
        const match = existing.ageRange.match(/(\d+)\s*-\s*(\d+)/);
        if (match) {
            defaultAgeFrom = match[1];
            defaultAgeTo = match[2];
        }
    }

    if (!isNew && (tracksLoading || !existing)) {
        return <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-orange-500" /></div>;
    }

    const defaultValues: Partial<FormData> = existing ? {
        ...existing,
        ageFrom: defaultAgeFrom,
        ageTo: defaultAgeTo
    } : {
        id: allTracksData.length > 0 ? Math.max(...allTracksData.map(t => t.id)) + 1 : 1,
        artist: 'Aly Bouchnak',
        routine: 'Playtime',
        ageFrom: defaultAgeFrom,
        ageTo: defaultAgeTo,
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

    const handleAddOption = (
        value: string,
        list: string[],
        setList: React.Dispatch<React.SetStateAction<string[]>>,
        fieldName: keyof FormData
    ) => {
        if (value === '__ADD_NEW__') {
            const newValue = window.prompt(`Enter new ${fieldName}:`);
            if (newValue && newValue.trim() !== '') {
                const trimmed = newValue.trim();
                // Add if not exists
                if (!list.includes(trimmed)) {
                    setList([...list, trimmed]);
                }
                setValue(fieldName, trimmed as any, { shouldDirty: true });
            } else {
                setValue(fieldName, '' as any);
            }
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            // Get base64 content only
            const base64Content = base64String.split(',')[1];

            setImageFile({
                name: file.name,
                base64: base64Content
            });

            setValue('coverImage', `/images/${file.name}`, { shouldValidate: true, shouldDirty: true });
        };
        reader.readAsDataURL(file);
    };

    // Auto-fill SEO and Schema from basic fields
    const watchTitle = watch('title');
    const watchSlug = watch('slug');
    const watchAlbum = watch('album');
    const watchGenre = watch('genre');
    const watchDuration = watch('duration');
    const watchReleaseDate = watch('releaseDate');
    const watchCoverImage = watch('coverImage');
    const watchIsrc = watch('isrc');

    useEffect(() => {
        const baseUrl = 'https://alybouchnak.com';

        // Find album URL
        let albumUrlStr = '';
        if (watchAlbum) {
            const matchedAlbum = albums.find(a => a.title === watchAlbum);
            if (matchedAlbum) {
                albumUrlStr = `/album/${matchedAlbum.slug}`;
            }
        }

        // Always sync genre, isrc, schema.inAlbum
        setValue('trackSchema.genre', watchGenre || '');
        setValue('trackSchema.isrcCode', watchIsrc || '');
        setValue('trackSchema.inAlbum.name', watchAlbum || '');
        if (albumUrlStr) {
            setValue('albumUrl', albumUrlStr);
            setValue('trackSchema.inAlbum.@id', `${baseUrl}${albumUrlStr}`);
        }

        // Auto generation for NEW tracks, but also sync the schema IDs if title/slug change
        if (watchTitle && watchSlug) {
            const trackUrl = `${baseUrl}/track/${watchSlug}`;

            // Only auto-fill SEO title and canonical if new
            if (isNew) {
                setValue('seo.title', `${watchTitle} | Kids Song | Aly Bouchnak`);
                setValue('seo.canonical', trackUrl);
                setValue('seo.ogImage', watchCoverImage ? `${baseUrl}${watchCoverImage}` : '');

                setValue('trackSchema.name', watchTitle);
                setValue('trackSchema.url', trackUrl);
                setValue('trackSchema.image', watchCoverImage ? `${baseUrl}${watchCoverImage}` : '');
                setValue('trackSchema.datePublished', watchReleaseDate || '');
            }

            setValue('trackSchema.@id', `${trackUrl}#recording`);
        }

        // Convert duration M:SS → PTxMxS
        if (watchDuration && /^\d+:\d+$/.test(watchDuration)) {
            const [m, s] = watchDuration.split(':').map(Number);
            setValue('trackSchema.duration', `PT${m}M${s}S`);
        }
    }, [watchTitle, watchSlug, watchAlbum, watchGenre, watchDuration, watchReleaseDate, watchCoverImage, watchIsrc, isNew, setValue]);

    const onSubmit = async (data: FormData) => {
        setSaving(true);
        try {


            // Save Image if uploaded
            if (imageFile) {
                await saveImageToGitHub(`public/images/${imageFile.name}`, imageFile.base64);
            }

            data.ageRange = `${data.ageFrom}-${data.ageTo} years`;
            const payload = { ...data };
            delete payload.ageFrom;
            delete payload.ageTo;

            await saveItem(payload as any, isNew);

            toast.success('✅ Track saved to Neon DB!');
            navigate('/admin/tracks');
        } catch (err) {
            console.error(err);
            toast.error('❌ DB Save failed. Check console for details.');
        } finally {
            setSaving(false);
        }
    };

    const albumOptions = albums.map(a => a.title);

    return (
        <div key={formKey} className="p-8 max-w-4xl">
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
                                    <div className="flex gap-2">
                                        <input {...register('coverImage')} placeholder="/images/my-track.webp" className={inputCls} />
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700 transition flex items-center shrink-0"
                                            title="Upload Image"
                                        >
                                            <Upload className="w-4 h-4" />
                                        </button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            accept="image/webp, image/jpeg, image/png"
                                            className="hidden"
                                        />
                                    </div>
                                    {imageFile && <p className="text-xs text-green-400 mt-1">Ready to upload: {imageFile.name}</p>}
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
                                    <select
                                        {...register('genre')}
                                        className={inputCls}
                                        onChange={(e) => {
                                            handleAddOption(e.target.value, localGenres, setLocalGenres, 'genre');
                                            register('genre').onChange(e);
                                        }}
                                    >
                                        <option value="">Select Genre...</option>
                                        {localGenres.map(g => <option key={g} value={g}>{g}</option>)}
                                        <option value="__ADD_NEW__">+ Add New Genre...</option>
                                    </select>
                                </Field>
                                <Field label="Age Range">
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

                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Mood">
                                    <select
                                        {...register('mood')}
                                        className={inputCls}
                                        onChange={(e) => {
                                            handleAddOption(e.target.value, localMoods, setLocalMoods, 'mood');
                                            register('mood').onChange(e);
                                        }}
                                    >
                                        <option value="">Select Mood...</option>
                                        {localMoods.map(m => <option key={m} value={m}>{m}</option>)}
                                        <option value="__ADD_NEW__">+ Add New Mood...</option>
                                    </select>
                                </Field>
                                <Field label="Routine">
                                    <select
                                        {...register('routine')}
                                        className={inputCls}
                                        onChange={(e) => {
                                            handleAddOption(e.target.value, localRoutines, setLocalRoutines, 'routine');
                                            register('routine').onChange(e);
                                        }}
                                    >
                                        <option value="">Select Routine...</option>
                                        {localRoutines.map(r => <option key={r} value={r}>{r}</option>)}
                                        <option value="__ADD_NEW__">+ Add New Routine...</option>
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
                                        <option value="">Select Album...</option>
                                        {albumOptions.map(a => <option key={a} value={a}>{a}</option>)}
                                    </select>
                                </Field>
                                <Field label="Album URL (Auto-generated)">
                                    <input {...register('albumUrl')} readOnly className={`${inputCls} opacity-60`} />
                                </Field>
                            </div>

                            <Field label="Artist Note">
                                <textarea {...register('artistNote')} placeholder="Artist's personal note about this track…" className={textareaCls} rows={4} />
                            </Field>

                            <Field label="Related Tracks (Hold Ctrl/Cmd to select multiple)" hint="Select from existing tracks">
                                <Controller
                                    control={control}
                                    name="relatedTracks"
                                    render={({ field }) => (
                                        <select
                                            multiple
                                            className={`${inputCls} min-h-[120px]`}
                                            value={field.value?.map(String) || []}
                                            onChange={(e) => {
                                                const selected = Array.from(e.target.selectedOptions, option => Number(option.value));
                                                field.onChange(selected);
                                            }}
                                            size={6}
                                        >
                                            {allTracksData?.filter(t => t.id !== Number(id)).map(t => (
                                                <option key={t.id} value={t.id.toString()}>
                                                    {t.id}: {t.title}
                                                </option>
                                            ))}
                                        </select>
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
                                💡 Schema generated automatically from your basic info. Edit SEO fields below to customize.
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
                                toast.info('Changes discarded.');
                                navigate('/admin/tracks');
                            })}
                            className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl text-sm font-medium transition-all"
                        >
                            Discard Changes
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-orange-500/25"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            {saving ? 'Saving…' : 'Save Track'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
