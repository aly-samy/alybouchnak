import { useNeonData } from '../../lib/useNeonData';
import { Mail, Search, Trash2, Loader2, Users } from 'lucide-react';
import { useState } from 'react';

export interface Subscriber {
    id: number;
    email: string;
    firstName?: string;
    parentType?: string;
    childName?: string;
    childBirthMonth?: string;
    status: 'active' | 'unsubscribed';
    createdAt: string;
    updatedAt: string;
}

export default function SubscriberList() {
    const { data: subscribers, loading, deleteItem } = useNeonData<Subscriber>('subscribers');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSubscribers = subscribers?.filter(sub =>
        sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.firstName?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    if (loading) {
        return (
            <div className="flex h-[ca(100vh-4rem)] items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
                        <Users className="w-8 h-8 text-orange-500" />
                        Subscribers
                    </h1>
                    <p className="text-slate-400">Manage your Kit Newsletter subscribers</p>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="p-4 border-b border-slate-800 lg:flex items-center justify-between gap-4">
                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search by email or name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-orange-500 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-colors"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left bg-slate-900 text-sm">
                        <thead>
                            <tr className="border-b border-slate-800 bg-slate-950/50">
                                <th className="p-4 text-slate-400 font-medium">Email</th>
                                <th className="p-4 text-slate-400 font-medium">Name</th>
                                <th className="p-4 text-slate-400 font-medium">Parent Type</th>
                                <th className="p-4 text-slate-400 font-medium">Child Data</th>
                                <th className="p-4 text-slate-400 font-medium">Status</th>
                                <th className="p-4 text-slate-400 font-medium w-24">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {filteredSubscribers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-500">
                                        No subscribers found
                                    </td>
                                </tr>
                            ) : (
                                filteredSubscribers.map((sub) => (
                                    <tr key={sub.id} className="hover:bg-slate-800/50 transition-colors group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                                                    <Mail className="w-4 h-4 text-orange-500" />
                                                </div>
                                                <span className="font-medium text-slate-200">{sub.email}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-slate-300">{sub.firstName || '-'}</td>
                                        <td className="p-4 text-slate-300">
                                            {sub.parentType ? (
                                                <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded-md text-xs border border-slate-700">
                                                    {sub.parentType}
                                                </span>
                                            ) : '-'}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-slate-300">{sub.childName || '-'}</span>
                                                <span className="text-slate-500 text-xs">{sub.childBirthMonth || '-'}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-md text-xs font-medium border ${sub.status === 'active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                                                {sub.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => {
                                                        if (confirm('Delete subscriber? This only deletes from DB, not Kit.')) {
                                                            deleteItem(sub.id);
                                                        }
                                                    }}
                                                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                                                    title="Delete Subscriber"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
