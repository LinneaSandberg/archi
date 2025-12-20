import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, LogIn, ShieldCheck } from 'lucide-react';

const LoginPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [field]: e.target.value }));
        setError('');
        setSuccess('');
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const username = form.username.trim();
        if (!username) {
            setError('Ange ditt användarnamn.');
            return;
        }

        if (!form.password) {
            setError('Ange ditt lösenord.');
            return;
        }

        // Demo-only: replace with real auth integration
        setSuccess('Inloggad! Du skickas vidare till assistenten.');
        setTimeout(() => navigate('/assistent'), 600);
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 font-sans">
            <div className="absolute top-6 left-6">
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Tillbaka
                </button>
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-600/40 mb-4">
                        <ShieldCheck className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Logga in</h1>
                    <p className="text-sm text-slate-400 mt-2">Återkommande användare loggar in med sitt konto.</p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 backdrop-blur shadow-2xl shadow-purple-900/20"
                >
                    <div className="space-y-4">
                        <label className="block">
                            <span className="text-sm font-medium text-slate-200">Användarnamn</span>
                            <input
                                type="text"
                                value={form.username}
                                onChange={handleChange('username')}
                                placeholder="jane.doe"
                                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 outline-none transition"
                                autoComplete="username"
                                required
                            />
                        </label>

                        <label className="block">
                            <span className="text-sm font-medium text-slate-200">Lösenord</span>
                            <input
                                type="password"
                                value={form.password}
                                onChange={handleChange('password')}
                                placeholder="••••••"
                                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 outline-none transition"
                                autoComplete="current-password"
                                required
                            />
                        </label>

                        {error && (
                            <div className="rounded-lg border border-red-900/60 bg-red-900/20 text-red-200 px-4 py-3 text-sm">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="flex items-start gap-3 rounded-lg border border-emerald-900/60 bg-emerald-900/20 text-emerald-100 px-4 py-3 text-sm">
                                <LogIn className="w-4 h-4 mt-0.5" />
                                <div>
                                    <p className="font-semibold">{success}</p>
                                    <p className="text-xs text-emerald-50/80">Du omdirigeras automatiskt.</p>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full mt-2 inline-flex justify-center items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 shadow-lg shadow-purple-600/40 hover:from-purple-500 hover:to-pink-500 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-purple-500"
                        >
                            Logga in
                        </button>
                    </div>

                    <p className="mt-6 text-center text-sm text-slate-400">
                        Har du inget konto?{' '}
                        <button
                            type="button"
                            onClick={() => navigate('/register')}
                            className="text-purple-300 hover:text-purple-200 font-semibold"
                        >
                            Skapa ett konto
                        </button>
                    </p>
                </form>
            </div>

            <div className="absolute -z-10 inset-0 overflow-hidden">
                <div className="absolute top-24 -left-10 w-72 h-72 bg-purple-700/20 blur-3xl rounded-full" />
                <div className="absolute bottom-16 right-0 w-80 h-80 bg-pink-600/20 blur-3xl rounded-full" />
            </div>
        </div>
    );
};

export default LoginPage;
