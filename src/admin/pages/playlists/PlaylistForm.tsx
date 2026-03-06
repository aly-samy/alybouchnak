import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { playlists as allPlaylistsData } from '../../../data/playlists';
import type { Playlist } from '../../../data/playlists';
import { generatePlaylistsFile } from '../../lib/generatePlaylists';
import { savePlaylistsToGitHub } from '../../lib/githubSave';
import { toast } from 'sonner';
import { Trash2, ArrowLeft, Github, Loader2, Info, Link2, Music, BookOpen } from 'lucide-react';

type FormData = Playlist;

const TABS = [
    { id: 'Basic Info', icon: Info },
    { id: 'Streaming', icon: Link2 },
    { id: 'Tracks', icon: Music },
    { id: 'Content', icon: BookOpen }
] as const;

const inputCls = "w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all";
const textareaCls = `${inputCls} resize-y min-h-[100px]`;

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

    const defaultValues: Partial<FormData> = existing || {
        artist: 'Aly Bouchnak',
        id: (allPlaylistsData.length + 1),
        status: 'available' as const,
        genre: "Children's Music",
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
            let updated: Playlist[];
            if (isNew) {
                updated = [...allPlaylistsData, data];
            } else {
                updated = allPlaylistsData.map(p => (p.slug === slug ? data : p));
            }
            const content = generatePlaylistsFile(updated);
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
                                <Field label="Cover Image Path"><input {...register('coverImage')} className={inputCls} /></Field>
                                <Field label="Age Range"><input {...register('ageRange')} className={inputCls} /></Field>
                            </div>
                            <div className="grid grid-cols-3 gap-6">
                                <Field label="Mood"><input {...register('mood')} className={inputCls} /></Field>
                                <Field label="Genre"><input {...register('genre')} className={inputCls} /></Field>
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
                            <Field label="Spotify URL"><input {...register('spotifyUrl')} className={inputCls} /></Field>
                            <Field label="Apple Music URL"><input {...register('appleMusicUrl')} className={inputCls} /></Field>
                            <Field label="YouTube URL"><input {...register('youtubeUrl')} className={inputCls} /></Field>
                            <Field label="Amazon URL"><input {...register('amazonUrl')} className={inputCls} /></Field>
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
                                    <div key={f.id} className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 space-y-3">
                                        <div className="flex gap-3">
                                            <div className="w-12"><Field label="#"><input {...register(`tracks.${i}.number`, { valueAsNumber: true })} type="number" className={inputCls} /></Field></div>
                                            <div className="flex-1"><Field label="Song Title"><input {...register(`tracks.${i}.title`)} className={inputCls} /></Field></div>
                                            <div className="w-24"><Field label="Time"><input {...register(`tracks.${i}.duration`)} placeholder="2:30" className={inputCls} /></Field></div>
                                            <button type="button" onClick={() => removeTrack(i)} className="mt-7 text-slate-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                        <Field label="Description"><input {...register(`tracks.${i}.description`)} className={inputCls} /></Field>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'Content' && (
                        <>
                            <Field label="Curator's Note"><textarea {...register('artistNote')} className={textareaCls} rows={6} /></Field>
                            <Field label="Scientific Value"><textarea {...register('scienceFramework')} className={textareaCls} rows={6} /></Field>
                        </>
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
