import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { playlists as allPlaylistsData } from '../../../data/playlists';
import { tracks as allTracksData } from '../../../data/tracks';
import type { Playlist } from '../../../data/playlists';
import { generatePlaylistsFile } from '../../lib/generatePlaylists';
import { savePlaylistsToGitHub, saveImageToGitHub, saveGenresToGitHub, saveMoodsToGitHub } from '../../lib/githubSave';
import { generateGenresFile, generateMoodsFile } from '../../lib/generateLists';
import { genres as initialGenres } from '../../../data/genres';
import { moods as initialMoods } from '../../../data/moods';
import { toast } from 'sonner';
import { Trash2, ArrowLeft, Github, Loader2, Music, Link2, ListMusic, FileText, Upload, ChevronUp, ChevronDown } from 'lucide-react';

type FormData = Omit<Playlist, 'id'> & { id: number, ageFrom?: string, ageTo?: string };

const TABS = [
    { id: 'Basic Info', icon: FileText },
    { id: 'Streaming', icon: Link2 },
    { id: 'Tracks', icon: ListMusic },
    { id: 'Content', icon: Music }
] as const;

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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
            {children}
        </div>
    );
}

export default function PlaylistForm() {
    const { slug } = useParams<{ slug?: string }>();
    const navigate = useNavigate();
    const isNew = !slug;
    const existing = isNew ? null : allPlaylistsData.find(p => p.slug === slug);
    const [activeTab, setActiveTab] = useState<typeof TABS[number]['id']>('Basic Info');
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

    const defaultValues: Partial<FormData> = existing ? {
        ...existing,
        ageFrom: defaultAgeFrom,
        ageTo: defaultAgeTo
    } : {
        artist: 'Aly Bouchnak',
        id: (allPlaylistsData.length + 1),
        status: 'available' as const,
        genre: "Children's Music",
        ageFrom: defaultAgeFrom,
        ageTo: defaultAgeTo,
        educationalBenefits: [{ title: '', description: '' }],
        tracks: [{ trackId: 0, title: '', duration: '', description: '', link: '' }],
    };

    const { register, control, handleSubmit, setValue, watch } = useForm<FormData>({
        defaultValues: defaultValues as FormData,
    });

    const { fields: benefitFields, append: appendBenefit, remove: removeBenefit } = useFieldArray({ control, name: 'educationalBenefits' });
    const { fields: trackFields, append: appendTrack, remove: removeTrack, swap: swapTrack } = useFieldArray({ control, name: 'tracks' });

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

            if (payload.tracks) {
                payload.tracks = payload.tracks.map(t => {
                    if (t.trackId) return { trackId: t.trackId };
                    return { title: t.title, duration: t.duration, description: t.description, link: t.link };
                });
            }

            if (localGenres.length > initialGenres.length) await saveGenresToGitHub(generateGenresFile(localGenres));
            if (localMoods.length > initialMoods.length) await saveMoodsToGitHub(generateMoodsFile(localMoods));
            if (imageFile) await saveImageToGitHub(`public/images/${imageFile.name}`, imageFile.base64);

            let updatedPlaylists: Playlist[];
            if (isNew) {
                updatedPlaylists = [...allPlaylistsData, payload as Playlist];
            } else {
                updatedPlaylists = allPlaylistsData.map(p => (p.slug === payload.slug ? (payload as Playlist) : p));
            }
            const content = generatePlaylistsFile(updatedPlaylists);
            await savePlaylistsToGitHub(content);
            toast.success('✅ Playlist synced with GitHub!');
            navigate('/admin/playlists');
        } catch (err) {
            console.error(err);
            toast.error('❌ GitHub sync failed.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate('/admin/playlists')}
                    className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-white">
                        {isNew ? 'New Playlist' : `Edit: ${existing?.title}`}
                    </h1>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Tab Navigation */}
                <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-2xl p-1.5 mb-6">
                    {TABS.map(({ id, icon: Icon }) => (
                        <button
                            key={id}
                            type="button"
                            onClick={() => setActiveTab(id)}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === id
                                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {id}
                        </button>
                    ))}
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
                    {activeTab === 'Basic Info' && (
                        <>
                            <div className="grid grid-cols-2 gap-6">
                                <Field label="Title"><input {...register('title', { required: true })} className={inputCls} /></Field>
                                <Field label="Slug (URL)"><input {...register('slug', { required: true })} className={inputCls} /></Field>
                            </div>
                            <Field label="Subtitle"><input {...register('subtitle')} className={inputCls} /></Field>
                            <Field label="Description"><textarea {...register('description')} className={textareaCls} /></Field>
                            <div className="grid grid-cols-2 gap-6">
                                <Field label="Cover Image Path">
                                    <div className="flex gap-2">
                                        <input {...register('coverImage')} placeholder="/images/my-playlist.webp" className={inputCls} />
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
                            <div className="grid grid-cols-3 gap-6">
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
                                <Field label="Release Date"><input {...register('releaseDate')} type="date" className={inputCls} /></Field>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-medium text-slate-300">Educational Benefits</label>
                                    <button type="button" onClick={() => appendBenefit({ title: '', description: '' })}
                                        className="text-xs text-orange-400 hover:underline">Add Benefit</button>
                                </div>
                                <div className="space-y-3">
                                    {benefitFields.map((f, i) => (
                                        <div key={f.id} className="flex gap-3">
                                            <input {...register(`educationalBenefits.${i}.title`)} placeholder="Title" className={inputCls} />
                                            <input {...register(`educationalBenefits.${i}.description`)} placeholder="Desc" className={inputCls} />
                                            <button type="button" onClick={() => removeBenefit(i)} className="p-2.5 text-slate-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'Streaming' && (
                        <div className="space-y-6">
                            <Field label="Spotify Playlist URL"><input {...register('spotifyUrl')} className={inputCls} /></Field>
                            <Field label="YouTube Playlist URL"><input {...register('youtubeUrl')} className={inputCls} /></Field>
                            <Field label="Meta Link (Push.fm)"><input {...register('otherUrl')} className={inputCls} /></Field>
                        </div>
                    )}

                    {activeTab === 'Tracks' && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-slate-300">Playlist Tracklist</label>
                                <button type="button" onClick={() => appendTrack({ title: '', duration: '' })}
                                    className="text-xs text-orange-400 hover:underline font-bold">+ Add Song</button>
                            </div>
                            <div className="space-y-4">
                                {trackFields.map((f, i) => (
                                    <div key={f.id} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 flex gap-4 items-center">
                                        <div className="flex flex-col gap-1 shrink-0">
                                            <button type="button" onClick={() => swapTrack(i, i - 1)} className="text-slate-500 hover:text-white disabled:opacity-30" disabled={i === 0}>
                                                <ChevronUp className="w-4 h-4" />
                                            </button>
                                            <button type="button" onClick={() => swapTrack(i, i + 1)} className="text-slate-500 hover:text-white disabled:opacity-30" disabled={i === trackFields.length - 1}>
                                                <ChevronDown className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <span className="text-slate-500 font-bold w-4 text-center">{i + 1}</span>
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1">
                                                    <select
                                                        {...register(`tracks.${i}.trackId`, { valueAsNumber: true })}
                                                        className={inputCls}
                                                    >
                                                        <option value={0}>-- Custom External Track --</option>
                                                        {allTracksData.map(t => (
                                                            <option key={t.id} value={t.id}>{t.title} ({t.duration})</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <button type="button" onClick={() => removeTrack(i)} className="text-slate-500 hover:text-red-400 p-2"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                            {!watch(`tracks.${i}.trackId`) && (
                                                <>
                                                    <div className="grid grid-cols-4 gap-3">
                                                        <div className="col-span-3"><Field label="Song Title"><input {...register(`tracks.${i}.title`)} className={inputCls} /></Field></div>
                                                        <div><Field label="Time"><input {...register(`tracks.${i}.duration`)} placeholder="2:30" className={inputCls} /></Field></div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <Field label="Description"><input {...register(`tracks.${i}.description`)} className={inputCls} /></Field>
                                                        <Field label="Stream URL / Link"><input {...register(`tracks.${i}.link`)} className={inputCls} /></Field>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'Content' && (
                        <div className="space-y-6">
                            <Field label="Curator's Note">
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
                            <Field label="Scientific Value">
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

                <div className="mt-8 flex justify-end gap-4">
                    <button type="button" onClick={() => navigate('/admin/playlists')} className="px-6 py-2.5 text-slate-400 hover:text-slate-200 font-medium">Cancel</button>
                    <button type="submit" disabled={saving} className="flex items-center gap-2 px-8 py-2.5 bg-orange-500 hover:bg-orange-400 text-white rounded-xl font-bold shadow-xl shadow-orange-500/20 disabled:opacity-50">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Github className="w-4 h-4" />}
                        {saving ? 'Syncing...' : 'Sync to GitHub'}
                    </button>
                </div>
            </form>
        </div>
    );
}
