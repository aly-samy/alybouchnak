import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import type { Article } from '../../../data/articles';
import { useNeonData } from '../../lib/useNeonData';
import { toast } from 'sonner';
import {
    Plus,
    ArrowLeft,
    Github,
    Loader2,
    Info,
    PenTool,
    Share2,
    Link2,
    Globe,
    Youtube,
    Music,
    Disc,
    CheckCircle2
} from 'lucide-react';

type FormData = Article;

const TABS = [
    { id: 'Basic', icon: Info },
    { id: 'Content', icon: PenTool },
    { id: 'Visuals', icon: Share2 },
    { id: 'Connections', icon: Link2 },
    { id: 'SEO/Schema', icon: Globe }
] as const;

const inputCls = "w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all";
const textareaCls = `${inputCls} resize-y min-h-[120px]`;

const quillModules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image', 'video', 'clean']
    ],
};

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
    return (
        <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-400">{label}</label>
            {children}
            {hint && <p className="text-[10px] text-slate-500 italic">{hint}</p>}
        </div>
    );
}

export default function ArticleForm() {
    const { slug } = useParams<{ slug?: string }>();
    const navigate = useNavigate();
    const isNew = !slug;

    // Fetch data dynamically
    const { data: allArticlesData, loading: articlesLoading, saveItem } = useNeonData<Article>('articles');
    const { data: tracks } = useNeonData<any>('tracks');
    const { data: albums } = useNeonData<any>('albums');

    const [activeTab, setActiveTab] = useState<typeof TABS[number]['id']>('Basic');
    const [saving, setSaving] = useState(false);

    const existing = isNew ? null : allArticlesData?.find(a => a.slug === slug);
    const formKey = isNew ? 'new-form' : `edit-form-${existing?.id}`;

    // Loader moved below hooks to obey React's Rules of Hooks

    const defaultValues: Partial<FormData> = existing || {
        id: allArticlesData.length ? Math.max(...allArticlesData.map(a => a.id || 0)) + 1 : 1,
        type: 'NewsArticle',
        category: 'News',
        author: {
            name: 'Aly Bouchnak',
            url: 'https://alybouchnak.com/about',
            role: 'Composer & Educator'
        },
        coverImage: { url: '', width: 1200, height: 675, caption: '' },
        connections: { relatedTracks: [], relatedAlbums: [] },
        seo: { title: '', description: '', keywords: [], ogType: 'article', readingTime: '5 min' },
        datePublished: new Date().toISOString(),
        dateModified: new Date().toISOString(),
        articleSchema: {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": "",
            "image": [],
            "datePublished": "",
            "dateModified": "",
            "author": [{ "@type": "Person", "name": "Aly Bouchnak", "url": "https://alybouchnak.com/about" }]
        }
    };

    const { register, control, handleSubmit, watch, setValue, reset } = useForm<FormData>({ defaultValues: defaultValues as FormData });
    const { fields: keywordFields, append: appendKeyword, remove: removeKeyword } = useFieldArray({ control, name: 'seo.keywords' as any });

    // Populate form once existing data loads
    useEffect(() => {
        if (existing) reset(existing);
    }, [existing, reset]);

    if (!isNew && (articlesLoading || !existing)) {
        return <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-orange-500" /></div>;
    }

    // Watch values for auto-schema generation
    const watchedTitle = watch('title');
    const watchedDesc = watch('description');
    const watchedCover = watch('coverImage.url');
    const watchedDate = watch('datePublished');
    const watchedType = watch('type');

    // Auto-update schema and dates
    const handleSyncSchema = () => {
        setValue('articleSchema.headline', watchedTitle);
        setValue('articleSchema.image', [watchedCover]);
        setValue('articleSchema.datePublished', watchedDate);
        setValue('articleSchema.dateModified', new Date().toISOString());
        setValue('dateModified', new Date().toISOString());
        setValue('articleSchema.@type', watchedType);

        // Auto-generate SEO
        if (!watch('seo.title')) setValue('seo.title', `${watchedTitle} | Aly Bouchnak`);
        if (!watch('seo.description')) setValue('seo.description', watchedDesc);

        toast.success('Schema and SEO pre-filled from basic info!');
    };

    const onSubmit = async (data: FormData) => {
        setSaving(true);
        try {
            data.dateModified = new Date().toISOString();
            data.articleSchema = data.articleSchema || {};
            data.articleSchema.dateModified = data.dateModified;
            data.articleSchema.headline = data.title;
            data.articleSchema.image = [data.coverImage?.url || ''];
            data.articleSchema.datePublished = data.datePublished;

            await saveItem(data, isNew);
            toast.success('✅ Article Published to Neon!');
            navigate('/admin/articles');
        } catch (err) {
            console.error(err);
            toast.error('❌ Failed to publish.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div key={formKey} className="p-8 max-w-5xl">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/admin/articles')} className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl"><ArrowLeft /></button>
                    <h1 className="text-2xl font-black text-white">{isNew ? 'Draft New Article' : `Editing: ${existing?.title.substring(0, 30)}...`}</h1>
                </div>
                <button type="button" onClick={handleSyncSchema} className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 text-blue-400 border border-blue-600/20 rounded-xl text-xs font-bold hover:bg-blue-600/20 transition-all">
                    <CheckCircle2 className="w-3 h-3" /> Auto-Sync SEO/Schema
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-1 bg-slate-950/50 p-1 rounded-2xl border border-slate-800 mb-8 overflow-x-auto">
                    {TABS.map(({ id, icon: Icon }) => (
                        <button
                            key={id}
                            type="button"
                            onClick={() => setActiveTab(id)}
                            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold min-w-[120px] transition-all ${activeTab === id
                                ? 'bg-orange-500 text-white shadow-lg'
                                : 'text-slate-500 hover:text-slate-200'}`}
                        >
                            <Icon className="w-4 h-4" />
                            {id}
                        </button>
                    ))}
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5"><Plus className="w-32 h-32" /></div>

                    {activeTab === 'Basic' && (
                        <>
                            <div className="grid grid-cols-2 gap-6 relative z-10">
                                <Field label="Article Type">
                                    <select {...register('type')} className={inputCls}>
                                        <option value="NewsArticle">News Article (Aggregators Love This)</option>
                                        <option value="BlogPosting">Blog Posting (Evergreen Content)</option>
                                    </select>
                                </Field>
                                <Field label="Category">
                                    <select {...register('category')} className={inputCls}>
                                        <option value="News">News</option>
                                        <option value="Press">Press Release</option>
                                        <option value="Resources">Parental Resources</option>
                                        <option value="Educational">Educational Science</option>
                                        <option value="Music News">Music Updates</option>
                                    </select>
                                </Field>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <Field label="Headline"><input {...register('title', { required: true })} className={inputCls} /></Field>
                                <Field label="Slug"><input {...register('slug', { required: true })} className={inputCls} /></Field>
                            </div>
                            <Field label="Short Snippet (Snippet for Google)"><textarea {...register('description')} className={textareaCls} rows={2} /></Field>
                            <div className="grid grid-cols-3 gap-6">
                                <Field label="Publish Date"><input {...register('datePublished')} type="datetime-local" className={inputCls} /></Field>
                                <Field label="Reading Time"><input {...register('seo.readingTime')} placeholder="5 min" className={inputCls} /></Field>
                                <Field label="Author Name"><input {...register('author.name')} className={inputCls} /></Field>
                            </div>
                        </>
                    )}

                    {activeTab === 'Content' && (
                        <Field label="Main Article Body (Rich Text)">
                            <Controller
                                name="content"
                                control={control}
                                render={({ field }) => (
                                    <div className="bg-white rounded-xl text-black overflow-hidden h-[450px]">
                                        <ReactQuill theme="snow" modules={quillModules} {...field} className="h-[408px]" />
                                    </div>
                                )}
                            />
                        </Field>
                    )}

                    {activeTab === 'Visuals' && (
                        <div className="space-y-6">
                            <Field label="Featured Image URL" hint="Minimum 1200px wide for Google News Hubs">
                                <input {...register('coverImage.url')} className={inputCls} />
                            </Field>
                            <div className="grid grid-cols-2 gap-6">
                                <Field label="Width (px)"><input {...register('coverImage.width', { valueAsNumber: true })} type="number" className={inputCls} /></Field>
                                <Field label="Height (px)"><input {...register('coverImage.height', { valueAsNumber: true })} type="number" className={inputCls} /></Field>
                            </div>
                            <Field label="Image Caption"><input {...register('coverImage.caption')} className={inputCls} /></Field>
                            {watchedCover && (
                                <div className="mt-4 rounded-2xl overflow-hidden border border-slate-700 bg-black aspect-video flex items-center justify-center">
                                    <img src={watchedCover} alt="Preview" className="max-h-full" />
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'Connections' && (
                        <div className="space-y-8">
                            <Field label="Featured YouTube Video ID" hint="Only the ID from the URL (e.g. dQw4w9WgXcQ)">
                                <div className="relative">
                                    <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
                                    <input
                                        {...register('connections.youtubeVideoId')}
                                        className={`${inputCls} pl-10`}
                                        placeholder="e.g. dQw4w9WgXcQ or https://youtube.com/watch?v=..."
                                        onBlur={(e) => {
                                            const val = e.target.value;
                                            if (val.includes('youtube.com') || val.includes('youtu.be')) {
                                                // Extract ID
                                                const match = val.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
                                                if (match && match[1]) {
                                                    setValue('connections.youtubeVideoId', match[1]);
                                                    toast.success('Extracted YouTube Video ID!');
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </Field>

                            <div className="grid grid-cols-2 gap-8">
                                <Field label="Internal Linked Tracks">
                                    <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-800 space-y-2 max-h-[300px] overflow-y-auto">
                                        {tracks.map(track => {
                                            const current = watch('connections.relatedTracks') || [];
                                            const isChecked = current.includes(track.id);
                                            return (
                                                <label key={track.id} className="flex items-center gap-3 p-2 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors group">
                                                    <input
                                                        type="checkbox"
                                                        checked={isChecked}
                                                        onChange={(e) => {
                                                            const val = e.target.checked
                                                                ? [...current, track.id]
                                                                : current.filter(id => id !== track.id);
                                                            setValue('connections.relatedTracks', val);
                                                        }}
                                                        className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-orange-500 focus:ring-orange-500/20"
                                                    />
                                                    <Music className="w-3 h-3 text-slate-500 group-hover:text-orange-400" />
                                                    <span className="text-xs text-slate-300 font-medium">{track.title}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </Field>

                                <Field label="Internal Linked Albums">
                                    <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-800 space-y-2 max-h-[300px] overflow-y-auto">
                                        {albums.map(album => {
                                            const current = watch('connections.relatedAlbums') || [];
                                            const isChecked = current.includes(album.slug);
                                            return (
                                                <label key={album.slug} className="flex items-center gap-3 p-2 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors group">
                                                    <input
                                                        type="checkbox"
                                                        checked={isChecked}
                                                        onChange={(e) => {
                                                            const val = e.target.checked
                                                                ? [...current, album.slug]
                                                                : current.filter(s => s !== album.slug);
                                                            setValue('connections.relatedAlbums', val);
                                                        }}
                                                        className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-orange-500 focus:ring-orange-500/20"
                                                    />
                                                    <Disc className="w-3 h-3 text-slate-500 group-hover:text-orange-400" />
                                                    <span className="text-xs text-slate-300 font-medium">{album.title}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </Field>
                            </div>
                        </div>
                    )}

                    {activeTab === 'SEO/Schema' && (
                        <div className="space-y-6">
                            <h3 className="text-sm font-black text-orange-500 uppercase tracking-widest border-b border-orange-500/20 pb-2">Technical SEO</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <Field label="Focus Keyword Container">
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {keywordFields.map((f, i) => (
                                            <span key={f.id} className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-full flex items-center gap-2">
                                                {watch(`seo.keywords.${i}` as any)}
                                                <button type="button" onClick={() => removeKeyword(i)} className="text-slate-500 hover:text-red-400">×</button>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <input id="new-tag" className={`${inputCls} h-9`} placeholder="Add tag..." onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                const val = (e.currentTarget as HTMLInputElement).value;
                                                if (val) {
                                                    appendKeyword(val);
                                                    (e.currentTarget as HTMLInputElement).value = '';
                                                }
                                            }
                                        }} />
                                    </div>
                                </Field>
                                <Field label="JSON-LD Type">
                                    <input {...register('articleSchema.@type')} className={inputCls} readOnly />
                                </Field>
                            </div>

                            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800">
                                <p className="text-[10px] text-slate-500 font-mono mb-4 uppercase">JSON-LD Schema Preview (Generated on Submit)</p>
                                <pre className="text-xs text-blue-400 font-mono overflow-x-auto">
                                    {JSON.stringify(watch('articleSchema'), null, 2)}
                                </pre>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-8 flex justify-end gap-4 p-6 bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-xl">
                    <button type="button" onClick={() => navigate('/admin/articles')} className="px-6 py-2.5 text-slate-500 font-bold hover:text-white transition-all">Discard</button>
                    <button type="submit" disabled={saving} className="flex items-center gap-3 px-12 py-3.5 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-black rounded-2xl shadow-xl shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50">
                        {saving ? <Loader2 className="animate-spin" /> : <Github />}
                        {saving ? 'PUBLISHING...' : 'PUBLISH TO WEBSITE'}
                    </button>
                </div>
            </form>
        </div>
    );
}
