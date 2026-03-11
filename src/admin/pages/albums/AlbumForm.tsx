import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import type { Album } from '../../../data/albums';
import { useNeonData } from '../../lib/useNeonData';
import { saveImageToGitHub, saveGenresToGitHub, saveMoodsToGitHub } from '../../lib/githubSave';
import { generateGenresFile, generateMoodsFile } from '../../lib/generateLists';
import { genres as initialGenres } from '../../../data/genres';
import { moods as initialMoods } from '../../../data/moods';
import { toast } from 'sonner';
import { Plus, Trash2, ArrowLeft, Loader2, Upload, ChevronUp, ChevronDown, Save } from 'lucide-react';

type FormData = Omit<Album, 'id'> & { id: number, ageFrom?: string, ageTo?: string };

const TABS = ['Basic Info', 'Streaming Links', 'Track Listing', 'Content'] as const;

const inputCls = "w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all";
const textareaCls = `${inputCls} resize-y min-h-[100px]`;

const quillModules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['clean']
    ],
};

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

    const { data: allAlbumsData, loading: albumsLoading, saveItem } = useNeonData<Album>('albums');
    const { data: allTracksData } = useNeonData<any>('tracks');

    const existing = isNew ? null : allAlbumsData?.find(a => a.slug === slug);
    const formKey = isNew ? 'new-album' : `edit-album-${existing?.id}`;

    const [activeTab, setActiveTab] = useState<typeof TABS[number]>('Basic Info');
    const [saving, setSaving] = useState(false);

    const [localGenres, setLocalGenres] = useState<string[]>([...initialGenres]);
    const [localMoods, setLocalMoods] = useState<string[]>([...initialMoods]);
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

    if (!isNew && (albumsLoading || !existing)) {
        return <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-orange-500" /></div>;
    }

    const defaultValues: Partial<FormData> = existing ? {
        ...existing,
        ageFrom: defaultAgeFrom,
        ageTo: defaultAgeTo
    } : {
        artist: 'Aly Bouchnak',
        id: (allAlbumsData.length + 1),
        status: 'available' as const,
        ageFrom: defaultAgeFrom,
        ageTo: defaultAgeTo,
        educationalBenefits: [{ title: '', description: '' }],
        trackIds: [],
    };

    const { register, control, handleSubmit, setValue, watch } = useForm<FormData>({
        defaultValues: defaultValues as FormData,
    });

    const { fields: benefitFields, append: appendBenefit, remove: removeBenefit } = useFieldArray({ control, name: 'educationalBenefits' });
    const trackIds = watch('trackIds') || [];

    const handleAddOption = (value: string, list: string[], setList: any, fieldName: keyof FormData) => {
        if (value === '__ADD_NEW__') {
            const newValue = window.prompt(`Enter new ${fieldName}:`);
            if (newValue && newValue.trim() !== '') {
                const trimmed = newValue.trim();
                if (!list.includes(trimmed)) setList([...list, trimmed]);
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
            const base64Content = base64String.split(',')[1];
            setImageFile({ name: file.name, base64: base64Content });
            setValue('coverImage', `/images/${file.name}`, { shouldValidate: true, shouldDirty: true });
        };
        reader.readAsDataURL(file);
    };

    const onSubmit = async (data: FormData) => {
        setSaving(true);
        try {
            data.ageRange = `${data.ageFrom}-${data.ageTo} years`;
            const payload = { ...data };
            delete payload.ageFrom;
            delete payload.ageTo;

            if (localGenres.length > initialGenres.length) await saveGenresToGitHub(generateGenresFile(localGenres));
            if (localMoods.length > initialMoods.length) await saveMoodsToGitHub(generateMoodsFile(localMoods));
            if (imageFile) await saveImageToGitHub(`public/images/${imageFile.name}`, imageFile.base64);

            await saveItem(payload as any, isNew);
            toast.success('✅ Album saved to Neon DB automatically!', { duration: 5000 });
            navigate('/admin/albums');
        } catch (err) {
            console.error(err);
            toast.error('❌ DB save failed.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div key={formKey} className="p-8 max-w-4xl">
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
                                <Field label="Cover Image Path">
                                    <div className="flex gap-2">
                                        <input {...register('coverImage')} placeholder="/images/my-album.webp" className={inputCls} />
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700 transition flex items-center shrink-0"
                                            title="Upload Image"
                                        >
                                            <Upload className="w-4 h-4" />
                                        </button>
                                        <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/webp, image/jpeg, image/png" className="hidden" />
                                    </div>
                                    {imageFile && <p className="text-xs text-green-400 mt-1">Ready: {imageFile.name}</p>}
                                </Field>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <Field label="Release Date"><input {...register('releaseDate')} type="date" className={inputCls} /></Field>
                                <Field label="Track Count"><input {...register('trackCount', { valueAsNumber: true })} type="number" className={inputCls} /></Field>
                                <Field label="Duration"><input {...register('duration')} placeholder="25:00" className={inputCls} /></Field>
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
                                ['otherUrl', 'Other URL (push.fm etc.)'],
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
                                <button type="button" onClick={() => {
                                    const newArr = [...trackIds, allTracksData[0]?.id || 0];
                                    setValue('trackIds', newArr, { shouldDirty: true });
                                    setValue('trackCount', newArr.length);
                                }}
                                    className="flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 px-2 py-1 rounded-lg hover:bg-orange-500/10 transition-all">
                                    <Plus className="w-3 h-3" /> Add Track
                                </button>
                            </div>
                            <div className="space-y-3">
                                {trackIds.map((tid, i) => (
                                    <div key={i} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 flex gap-3 items-center">
                                        <span className="text-slate-500 font-bold w-6">{i + 1}.</span>
                                        <div className="flex-1">
                                            <select
                                                value={tid}
                                                onChange={(e) => {
                                                    const newArr = [...trackIds];
                                                    newArr[i] = Number(e.target.value);
                                                    setValue('trackIds', newArr, { shouldDirty: true });
                                                }}
                                                className={inputCls}
                                            >
                                                <option value={0}>Select a track...</option>
                                                {allTracksData.map(t => (
                                                    <option key={t.id} value={t.id}>{t.title} ({t.duration})</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <button type="button" onClick={() => {
                                                if (i > 0) {
                                                    const newArr = [...trackIds];
                                                    [newArr[i - 1], newArr[i]] = [newArr[i], newArr[i - 1]];
                                                    setValue('trackIds', newArr, { shouldDirty: true });
                                                }
                                            }} className="text-slate-500 hover:text-white disabled:opacity-30" disabled={i === 0}>
                                                <ChevronUp className="w-4 h-4" />
                                            </button>
                                            <button type="button" onClick={() => {
                                                if (i < trackIds.length - 1) {
                                                    const newArr = [...trackIds];
                                                    [newArr[i + 1], newArr[i]] = [newArr[i], newArr[i + 1]];
                                                    setValue('trackIds', newArr, { shouldDirty: true });
                                                }
                                            }} className="text-slate-500 hover:text-white disabled:opacity-30" disabled={i === trackIds.length - 1}>
                                                <ChevronDown className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <button type="button" onClick={() => {
                                            const newArr = [...trackIds];
                                            newArr.splice(i, 1);
                                            setValue('trackIds', newArr, { shouldDirty: true });
                                            setValue('trackCount', newArr.length);
                                        }} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all shrink-0">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'Content' && (
                        <div className="space-y-6">
                            <Field label="Artist Note">
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
                            <Field label="Science Framework">
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
                        </div>
                    )}
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <button type="button" onClick={() => navigate('/admin/albums')}
                        className="px-5 py-2.5 text-slate-400 hover:text-slate-200 rounded-xl text-sm font-medium transition-all">
                        Cancel
                    </button>
                    <button type="submit" disabled={saving}
                        className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-orange-500/25">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {saving ? 'Saving…' : 'Save to Neon'}
                    </button>
                </div>
            </form>
        </div>
    );
}
