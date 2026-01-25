import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GUANYIN_SIGNS } from '../data/guanyinSigns';

const Guanyin = () => {
    const [isShaking, setIsShaking] = useState(false);
    const [result, setResult] = useState<typeof GUANYIN_SIGNS[0] | null>(null);

    const drawQian = () => {
        setIsShaking(true);
        setResult(null);
        setTimeout(() => {
            const randomQian = GUANYIN_SIGNS[Math.floor(Math.random() * GUANYIN_SIGNS.length)];
            setResult(randomQian);
            setIsShaking(false);
        }, 2500);
    };

    const getFortuneColor = (title: string) => {
        if (title.includes('Σ╕èΣ╕è')) return { bg: 'rgba(34, 197, 94, 0.3)', text: '#22c55e' };
        if (title.includes('Σ╕è')) return { bg: 'rgba(212, 168, 83, 0.3)', text: 'var(--color-primary)' };
        if (title.includes('Σ╕ï')) return { bg: 'rgba(239, 68, 68, 0.3)', text: '#ef4444' };
        return { bg: 'rgba(100, 130, 180, 0.3)', text: 'var(--color-text-light)' };
    };

    return (
        <main className="relative z-10 px-4 py-8 max-w-4xl mx-auto">
            <Link to="/" className="inline-flex items-center text-[var(--color-text-muted)] hover:text-[var(--color-primary)] mb-8 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Φ┐öσ¢₧ΘªûΘí╡
            </Link>

            <div className="glass-card p-8">
                <h2 className="golden-title text-4xl text-center mb-6">ΦºéΘƒ│τü╡τ¡╛</h2>
                <p className="text-center text-[var(--color-text-muted)] mb-8">
                    Φ»Üσ┐âΘ╗ÿσ┐╡µé¿τÜäΘù«Θóÿ∩╝îσ┐âΦ»ÜσêÖτü╡∩╝îµæçτ¡╛µ▒éσ╛ùΦÅ⌐ΦÉ¿µîçσ╝òπÇé
                </p>

                <div className="flex justify-center mb-8">
                    <div className={`relative w-32 h-48 rounded-lg flex items-end justify-center overflow-hidden transition-transform ${isShaking ? 'animate-shake' : ''}`}
                        style={{ background: 'linear-gradient(135deg, #8B4513, #654321)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="absolute w-2 rounded-full"
                                style={{
                                    height: '70%', background: 'linear-gradient(to top, #d4a853, #f5d78e)',
                                    left: `${20 + i * 10}%`, bottom: '20%',
                                    transform: isShaking ? `rotate(${Math.random() * 20 - 10}deg)` : 'none', transition: 'transform 0.1s',
                                }} />
                        ))}
                    </div>
                </div>

                <style>{`
                    @keyframes shake { 0%, 100% { transform: rotate(0deg) translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: rotate(-5deg) translateX(-5px); } 20%, 40%, 60%, 80% { transform: rotate(5deg) translateX(5px); } }
                    .animate-shake { animation: shake 0.5s ease-in-out infinite; }
                `}</style>

                <div className="flex justify-center">
                    <button onClick={drawQian} disabled={isShaking}
                        className="px-8 py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
                        style={{ background: 'linear-gradient(135deg, #d4a853, #c49843)', color: '#0a1628' }}>
                        {isShaking ? 'µæçτ¡╛Σ╕¡...' : 'µæçτ¡╛'}
                    </button>
                </div>

                {result && (
                    <div className="mt-8 space-y-6">
                        <div className="p-6 rounded-lg text-center" style={{ background: 'rgba(212, 168, 83, 0.1)', border: '1px solid var(--color-primary)' }}>
                            <span className="text-5xl text-[var(--color-primary)]">τ¼¼ {result.number} τ¡╛</span>
                            <span className="ml-4 px-4 py-2 rounded-full text-lg inline-block mt-2"
                                style={{ background: getFortuneColor(result.title).bg, color: getFortuneColor(result.title).text }}>
                                {result.title}
                            </span>
                        </div>

                        <div className="p-6 rounded-lg" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                            <h4 className="text-[var(--color-primary)] font-semibold mb-4 text-center">≡ƒô£ τ¡╛Φ»ù</h4>
                            <div className="text-center text-[var(--color-text-light)] text-lg leading-loose">
                                {result.poem.split('πÇé').filter(Boolean).map((line, i) => (
                                    <p key={i} className="my-1">{line}πÇé</p>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 rounded-lg" style={{ background: 'rgba(212, 168, 83, 0.15)' }}>
                            <h4 className="text-[var(--color-primary)] font-semibold mb-2">≡ƒö« τ¡╛Φºú</h4>
                            <p className="text-[var(--color-text-light)]">{result.interpretation}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                                <h4 className="text-[var(--color-primary)] font-semibold mb-2">≡ƒÆ╝ Σ║ïΣ╕Ü</h4>
                                <p className="text-[var(--color-text-light)] text-sm">{result.career}</p>
                            </div>
                            <div className="p-4 rounded-lg" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                                <h4 className="text-[var(--color-primary)] font-semibold mb-2">Γ¥ñ∩╕Å µäƒµâà</h4>
                                <p className="text-[var(--color-text-light)] text-sm">{result.love}</p>
                            </div>
                            <div className="p-4 rounded-lg" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                                <h4 className="text-[var(--color-primary)] font-semibold mb-2">≡ƒÆ░ Φ┤óΦ┐É</h4>
                                <p className="text-[var(--color-text-light)] text-sm">{result.wealth}</p>
                            </div>
                            <div className="p-4 rounded-lg" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                                <h4 className="text-[var(--color-primary)] font-semibold mb-2">≡ƒÅÑ σüÑσ║╖</h4>
                                <p className="text-[var(--color-text-light)] text-sm">{result.health}</p>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg" style={{ background: 'rgba(212, 168, 83, 0.2)' }}>
                            <h4 className="text-[var(--color-primary)] font-semibold mb-2">≡ƒÆí ΦÅ⌐ΦÉ¿µîçσ╝ò</h4>
                            <p className="text-[var(--color-text-light)]">{result.advice}</p>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Guanyin;
