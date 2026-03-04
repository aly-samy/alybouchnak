import { tracks } from '../../data/tracks';
import { albums } from '../../data/albums';
import { Music, Disc3, TrendingUp, Clock } from 'lucide-react';

function StatCard({ icon: Icon, label, value, sub }: {
    icon: React.ElementType; label: string; value: string | number; sub?: string;
}) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-slate-400 text-sm font-medium">{label}</p>
                    <p className="text-3xl font-bold text-white mt-1">{value}</p>
                    {sub && <p className="text-slate-500 text-xs mt-1">{sub}</p>}
                </div>
                <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-orange-400" />
                </div>
            </div>
        </div>
    );
}

export default function Dashboard() {
    const albumGroups = albums.map(album => ({
        name: album.title,
        count: tracks.filter(t => t.album === album.title).length,
        slug: album.slug,
    }));

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-slate-400 mt-1">Overview of your content library</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard icon={Music} label="Total Tracks" value={tracks.length} sub="across all albums" />
                <StatCard icon={Disc3} label="Total Albums" value={albums.length} sub="published" />
                <StatCard icon={TrendingUp} label="Avg BPM" value={Math.round(tracks.reduce((s, t) => s + t.bpm, 0) / tracks.length)} sub="across all tracks" />
                <StatCard icon={Clock} label="Newest Track" value={tracks.sort((a, b) => b.id - a.id)[0].title.split('|')[0].trim()} sub={`ID #${tracks.sort((a, b) => b.id - a.id)[0].id}`} />
            </div>

            {/* Albums breakdown */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Tracks by Album</h2>
                <div className="space-y-3">
                    {albumGroups.map(({ name, count, slug }) => {
                        const pct = Math.round((count / tracks.length) * 100);
                        return (
                            <div key={slug}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-slate-300 text-sm font-medium truncate mr-4">{name}</span>
                                    <span className="text-slate-400 text-sm shrink-0">{count} tracks · {pct}%</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all"
                                        style={{ width: `${pct}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
