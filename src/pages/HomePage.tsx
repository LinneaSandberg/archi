import { useNavigate } from 'react-router';
import { ArrowRight, ShieldCheck } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/assistent');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 overflow-hidden relative font-sans">
            {/* Navigation */}
            <nav className="absolute top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg shadow-lg shadow-purple-600/50">
                        <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white">PBL Expert</span>
                </div>
                <div className="hidden md:flex items-center gap-8">
                    <a href="#" className="text-slate-300 hover:text-white transition">Product</a>
                    <a href="#" className="text-slate-300 hover:text-white transition">Features</a>
                    <a href="#" className="text-slate-300 hover:text-white transition">Marketplace</a>
                    <a href="#" className="text-slate-300 hover:text-white transition">Company</a>
                    <button
                        onClick={handleLogin}
                        className="text-slate-300 hover:text-white transition"
                    >
                        Log in
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 md:px-12 relative">
                {/* Background gradient orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl opacity-30"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl opacity-30"></div>
                    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-3xl text-center">
                    {/* Announcement badge */}
                    <div className="mb-8 inline-block">
                        <div className="px-4 py-2 rounded-full border border-slate-700 bg-slate-900/50 backdrop-blur text-sm text-slate-300">
                            <span className="text-slate-400">🚀 </span>
                            Announcing our next round of funding.{' '}
                            <a href="#" className="text-purple-400 hover:text-purple-300 transition">Read more</a>
                        </div>
                    </div>

                    {/* Main heading */}
                    <h1 className="mb-6 text-5xl md:text-7xl font-bold leading-tight">
                        <span className="block text-white mb-3">AI-stöd för</span>
                        <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                            Arkitekter & Ingenjörer
                        </span>
                    </h1>

                    {/* Subheading */}
                    <p className="mb-12 text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
                        Få instant juridisk vägledning för dina byggprojekt. Gransking mot PBL, BBR och gällande normer direkt i din 3D-modell.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={handleGetStarted}
                            className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg shadow-purple-600/50 hover:from-purple-500 hover:to-pink-500 hover:shadow-purple-600/75 transition-all active:scale-95 flex items-center gap-2"
                        >
                            Get started
                            <ArrowRight className="w-4 h-4" />
                        </button>
                        <a
                            href="#"
                            className="px-8 py-3.5 rounded-lg border border-slate-700 text-slate-300 font-semibold hover:border-slate-600 hover:text-white transition-all flex items-center gap-2"
                        >
                            Learn more
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Feature highlight */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-xl border border-slate-700 bg-slate-900/30 backdrop-blur hover:border-purple-600/50 transition">
                            <div className="text-2xl mb-2">📋</div>
                            <h3 className="font-semibold text-white mb-2">PBL Gransking</h3>
                            <p className="text-sm text-slate-400">Automatisk kontroll mot Plan- och Bygglagen</p>
                        </div>
                        <div className="p-6 rounded-xl border border-slate-700 bg-slate-900/30 backdrop-blur hover:border-purple-600/50 transition">
                            <div className="text-2xl mb-2">⚙️</div>
                            <h3 className="font-semibold text-white mb-2">BBR Regler</h3>
                            <p className="text-sm text-slate-400">Boverkets Byggnadstekniska regler på tips</p>
                        </div>
                        <div className="p-6 rounded-xl border border-slate-700 bg-slate-900/30 backdrop-blur hover:border-purple-600/50 transition">
                            <div className="text-2xl mb-2">🎯</div>
                            <h3 className="font-semibold text-white mb-2">Real-time AI</h3>
                            <p className="text-sm text-slate-400">Få svar direkt från AI-modellen</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="relative z-10 border-t border-slate-800 bg-slate-950/50 backdrop-blur py-8 px-6 md:px-12">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
                    <p className="text-slate-400 text-sm">© 2025 PBL Expert. All rights reserved.</p>
                    <div className="flex gap-8 mt-4 md:mt-0 text-sm text-slate-400">
                        <a href="#" className="hover:text-white transition">Privacy</a>
                        <a href="#" className="hover:text-white transition">Terms</a>
                        <a href="#" className="hover:text-white transition">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;