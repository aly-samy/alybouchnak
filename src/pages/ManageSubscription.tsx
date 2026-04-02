import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Inbox, CheckCircle, AlertCircle } from 'lucide-react';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';

export default function ManageSubscription() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleUnsubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        setStatus('idle');
        setMessage('');

        try {
            // Using HTTP DELETE with email payload 
            // Our subscribe.ts handler handles DELETE for unsubscribing by email
            const res = await fetch('/.netlify/functions/subscribe', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (res.ok) {
                setStatus('success');
                setMessage('You have been successfully unsubscribed. We\'re sad to see you go!');
                setEmail('');
            } else {
                throw new Error('Unsubscribe failed');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
            setMessage('Oops! There was a problem unsubscribing. Please try again or contact us directly.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-slate-50 flex flex-col">
            <SEO
                title="Manage Subscription | The Bloom's House"
                description="Manage your newsletter subscription preferences."
                canonical="https://alybouchnak.com/manage-subscription"
            />

            <Navigation />

            <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
                <div className="mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#F26B3A] transition-colors font-medium">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>

                <div className="bg-white rounded-[2rem] p-8 sm:p-12 shadow-xl border border-slate-100 text-center">
                    <div className="w-16 h-16 bg-[#F7E859] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <Inbox className="w-8 h-8 text-[#F26B3A]" />
                    </div>

                    <h1 className="font-['Fredoka_One'] text-3xl sm:text-4xl text-slate-900 mb-4">
                        Manage Subscription
                    </h1>
                    <p className="text-slate-600 mb-8 max-w-lg mx-auto">
                        We respect your inbox! If you'd like to unsubscribe from The Bloom's House updates, enter your email below.
                    </p>

                    <form onSubmit={handleUnsubscribe} className="max-w-md mx-auto space-y-4">
                        <div className="text-left">
                            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                autoComplete="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="hello@example.com"
                                required
                                disabled={isLoading || status === 'success'}
                                className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-[#F26B3A] focus:bg-white transition-all"
                            />
                        </div>

                        {status === 'success' && (
                            <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 text-green-800 rounded-2xl text-left">
                                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <p className="text-sm font-medium">{message}</p>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 text-red-800 rounded-2xl text-left">
                                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <p className="text-sm font-medium">{message}</p>
                            </div>
                        )}

                        {status !== 'success' && (
                            <button
                                type="submit"
                                disabled={isLoading || !email}
                                className="w-full py-4 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-colors flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-2 border-slate-400 border-t-slate-700 rounded-full animate-spin"></div>
                                ) : (
                                    'Unsubscribe Me'
                                )}
                            </button>
                        )}
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}
