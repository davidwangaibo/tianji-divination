import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ALL_TAROT_CARDS } from '../data/tarotCards';

const Tarot = () => {
    const [cards, setCards] = useState<Array<{ card: typeof ALL_TAROT_CARDS[0]; reversed: boolean; position: string }>>([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [spread, setSpread] = useState<'single' | 'three'>('single');

    const drawCards = () => {
        setIsDrawing(true);
        setCards([]);

        setTimeout(() => {
            const positions = spread === 'single' ? ['τÄ░τè╢'] : ['Φ┐çσÄ╗', 'τÄ░σ£¿', 'µ£¬µ¥Ñ'];
            const shuffled = [...ALL_TAROT_CARDS].sort(() => Math.random() - 0.5);
            const drawnCards = positions.map((position, i) => ({
                card: shuffled[i],
                reversed: Math.random() > 0.7,
                position,
            }));
            setCards(drawnCards);
            setIsDrawing(false);
        }, 1500);
    };

    return (
        <main className="relative z-10 px-4 py-8 max-w-5xl mx-auto">
            <Link to="/" className="inline-flex items-center text-[var(--color-text-muted)] hover:text-[var(--color-primary)] mb-8 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Φ┐öσ¢₧ΘªûΘí╡
            </Link>

            <div className="glass-card p-8">
                <h2 className="golden-title text-4xl text-center mb-6">σíöτ╜ùσìáσì£</h2>
                <p className="text-center text-[var(--color-text-muted)] mb-8">
                    Θ¥Öσ┐âσåÑµâ│µé¿τÜäΘù«Θóÿ∩╝îΘÇëµï⌐τëîΘÿ╡σÉÄµè╜σÅûσíöτ╜ùτëîπÇé
                </p>

                {/* Spread Selection */}
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => setSpread('single')}
                        className={`px-6 py-2 rounded-lg transition-all ${spread === 'single' ? 'bg-[var(--color-primary)] text-[#0a1628]' : 'border border-[var(--color-card-border)] text-[var(--color-text-muted)]'}`}
                    >
                        σìòτëîσìáσì£
                    </button>
                    <button
                        onClick={() => setSpread('three')}
                        className={`px-6 py-2 rounded-lg transition-all ${spread === 'three' ? 'bg-[var(--color-primary)] text-[#0a1628]' : 'border border-[var(--color-card-border)] text-[var(--color-text-muted)]'}`}
                    >
                        Σ╕ëτëîΘÿ╡
                    </button>
                </div>

                {/* Cards Display */}
                <div className={`flex justify-center gap-6 mb-8 flex-wrap`}>
                    {(cards.length > 0 ? cards : Array(spread === 'single' ? 1 : 3).fill(null)).map((item, i) => (
                        <div
                            key={i}
                            className={`relative w-36 h-56 rounded-xl flex items-center justify-center transition-all duration-500 ${isDrawing ? 'animate-pulse' : ''}`}
                            style={{
                                background: item ? 'linear-gradient(135deg, #1a1a2e, #16213e)' : 'linear-gradient(135deg, #4a0080, #1a0033)',
                                border: item ? '2px solid var(--color-primary)' : '2px solid rgba(150, 100, 180, 0.5)',
                                transform: item?.reversed ? 'rotate(180deg)' : 'none',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                            }}
                        >
                            {item ? (
                                <div className="text-center p-3" style={{ transform: item.reversed ? 'rotate(180deg)' : 'none' }}>
                                    <p className="text-2xl mb-2">Γ£¿</p>
                                    <p className="text-[var(--color-primary)] font-semibold text-sm">{item.card.name}</p>
                                    <p className="text-[var(--color-text-muted)] text-xs mt-1">{item.position}</p>
                                    {item.reversed && (
                                        <p className="text-red-400 text-xs mt-1">∩╝êΘÇåΣ╜ì∩╝ë</p>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center">
                                    <p className="text-4xl mb-2">≡ƒîÖ</p>
                                    <p className="text-[var(--color-text-muted)] text-xs">{spread === 'single' ? 'τé╣σç╗µè╜τëî' : ['Φ┐çσÄ╗', 'τÄ░σ£¿', 'µ£¬µ¥Ñ'][i]}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={drawCards}
                        disabled={isDrawing}
                        className="px-8 py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
                        style={{
                            background: 'linear-gradient(135deg, #d4a853, #c49843)',
                            color: '#0a1628',
                        }}
                    >
                        {isDrawing ? 'µ┤ùτëîΣ╕¡...' : cards.length > 0 ? 'Θçìµû░µè╜τëî' : 'µè╜τëî'}
                    </button>
                </div>

                {/* Interpretation */}
                {cards.length > 0 && (
                    <div className="mt-8 space-y-4">
                        {cards.map((item, i) => (
                            <div key={i} className="p-6 rounded-lg space-y-4" style={{ background: 'rgba(212, 168, 83, 0.1)', border: '1px solid var(--color-card-border)' }}>
                                <h4 className="text-[var(--color-primary)] font-semibold text-lg mb-4">
                                    {item.position}∩╝Ü{item.card.name} {item.reversed && '∩╝êΘÇåΣ╜ì∩╝ë'}
                                </h4>

                                <div className="p-3 rounded" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                                    <p className="text-[var(--color-text-light)] text-sm">
                                        <strong className="text-[var(--color-primary)]">≡ƒö« τëîΣ╣ë∩╝Ü</strong>
                                        {item.reversed ? item.card.reversed : item.card.meaning}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="p-3 rounded" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                                        <p className="text-[var(--color-text-light)] text-sm">
                                            <strong className="text-[var(--color-primary)]">≡ƒÆ╝ Σ║ïΣ╕Ü∩╝Ü</strong>
                                            {item.reversed ? item.card.careerReversed : item.card.career}
                                        </p>
                                    </div>
                                    <div className="p-3 rounded" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                                        <p className="text-[var(--color-text-light)] text-sm">
                                            <strong className="text-[var(--color-primary)]">Γ¥ñ∩╕Å µäƒµâà∩╝Ü</strong>
                                            {item.reversed ? item.card.loveReversed : item.card.love}
                                        </p>
                                    </div>
                                    <div className="p-3 rounded" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                                        <p className="text-[var(--color-text-light)] text-sm">
                                            <strong className="text-[var(--color-primary)]">≡ƒÆ░ Φ┤óΦ┐É∩╝Ü</strong>
                                            {item.reversed ? item.card.wealthReversed : item.card.wealth}
                                        </p>
                                    </div>
                                    <div className="p-3 rounded" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                                        <p className="text-[var(--color-text-light)] text-sm">
                                            <strong className="text-[var(--color-primary)]">≡ƒÆí σ╗║Φ««∩╝Ü</strong>
                                            {item.reversed ? item.card.adviceReversed : item.card.advice}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default Tarot;
