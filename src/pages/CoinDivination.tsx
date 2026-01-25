import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { HEXAGRAMS } from '../data/hexagrams';

const CoinDivination = () => {
    const [coins, setCoins] = useState<string[]>([]);
    const [lines, setLines] = useState<string[]>([]);
    const [isShaking, setIsShaking] = useState(false);

    // σ░åσà¡τê╗Φ╜¼µìóΣ╕║σìªΦ▒íτ╝ûτáü
    const hexagramCode = useMemo(() => {
        if (lines.length !== 6) return null;
        return lines.map(line => {
            if (line === 'Θÿ│' || line === 'ΦÇüΘÿ│') return '1';
            return '0';
        }).join('');
    }, [lines]);

    // ΦÄ╖σÅûσìªΦ▒íΦºúΦ»╗
    const interpretation = useMemo(() => {
        if (!hexagramCode) return null;
        // µƒÑµë╛σî╣ΘàìτÜäσìªΦ▒í∩╝îσªéµ₧£µ▓íµ£ëτ▓╛τí«σî╣ΘàìσêÖτöƒµêÉΣ╕ÇΣ╕¬ΘÜÅµ£║ΦºúΦ»╗
        if (HEXAGRAMS[hexagramCode]) {
            return HEXAGRAMS[hexagramCode];
        }
        // τöƒµêÉσƒ║Σ║Äσà¡τê╗τÜäΦºúΦ»╗
        const yangCount = lines.filter(l => l.includes('Θÿ│')).length;
        const isPositive = yangCount >= 3;
        return {
            name: 'σÅÿσìª',
            nature: isPositive ? 'σÉë' : 'Σ╕¡',
            meaning: isPositive
                ? 'Θÿ│µ░öΣ╕èσìç∩╝îΦ»╕Σ║ïΘí║Θüé∩╝îσëìΘÇöσàëµÿÄπÇé'
                : 'Θÿ┤Θÿ│σ╣│Φíí∩╝îΘ£Çσ«íµù╢σ║ªσè┐∩╝îτ¿│Σ╕¡µ▒éΦ┐¢πÇé',
            career: isPositive
                ? 'Σ║ïΣ╕ÜΦ┐Éσè┐Φë»σÑ╜∩╝îσÅ»τº»µ₧üµèèµÅíµ£║Σ╝Ü∩╝îΦ┤╡Σ║║Φ┐Éµù║πÇé'
                : 'Σ║ïΣ╕ÜΘ£Çτ¿│µëÄτ¿│µëô∩╝îΣ╕ìσ«£σåÆΦ┐¢∩╝îσ«£σ«êµêÉπÇé',
            love: isPositive
                ? 'µäƒµâàΦ┐Éσè┐Σ╕èσìç∩╝îσìòΦ║½ΦÇàµ£ëµ£¢Θüçσê░Φë»τ╝ÿ∩╝îµ£ëΣ╝┤ΦÇàµäƒµâàσìçµ╕⌐πÇé'
                : 'µäƒµâàΘ£ÇΦªüτö¿σ┐âτ╗ÅΦÉÑ∩╝îσñÜµ▓ƒΘÇÜτÉåΦºú∩╝îσï┐µÇÑΦ║üπÇé',
            wealth: isPositive
                ? 'Φ┤óΦ┐ÉΣ║¿ΘÇÜ∩╝îµ¡úΦ┤óσüÅΦ┤óΣ┐▒Σ╜│∩╝îµèòΦ╡äτÉåΦ┤óσÅ»ΘÇéσ╜ôσ░¥Φ»òπÇé'
                : 'Φ┤óΦ┐Éσ╣│τ¿│∩╝îσ«£τ¿│σüÑτÉåΦ┤ó∩╝îΣ╕ìσ«£Θ½ÿΘúÄΘÖ⌐µèòΦ╡äπÇé',
            health: isPositive
                ? 'τ▓╛τÑ₧ΘÑ▒µ╗í∩╝îΦ║½Σ╜ôσüÑσ║╖∩╝îΘÇéσ╜ôΘö╗τé╝µ¢┤τ¢èΦ║½σ┐âπÇé'
                : 'µ│¿µäÅσè│ΘÇ╕τ╗ôσÉê∩╝îΣ┐¥µîüΦë»σÑ╜Σ╜£µü»∩╝îΘóäΘÿ▓τû╛τùàπÇé',
            advice: isPositive
                ? 'µèèµÅíµ£║Θüç∩╝îτº»µ₧üΦ┐¢σÅû∩╝îΣ╜åΘ£ÇΦ░ªΦÖÜΦ░¿µàÄ∩╝îµû╣Φâ╜µîüΣ╣àπÇé'
                : 'Θƒ¼σàëσà╗µÖª∩╝îσÄÜτº»ΦûäσÅæ∩╝îΘ¥Öσ╛àµù╢µ£║∩╝îτ╗êµ£ëΦ╜¼µ£║πÇé'
        };
    }, [hexagramCode, lines]);

    const throwCoins = () => {
        setIsShaking(true);
        setTimeout(() => {
            const newCoins = [
                ['µ¡ú', 'σÅì'][Math.floor(Math.random() * 2)],
                ['µ¡ú', 'σÅì'][Math.floor(Math.random() * 2)],
                ['µ¡ú', 'σÅì'][Math.floor(Math.random() * 2)],
            ];
            setCoins(newCoins);
            const positiveCount = newCoins.filter(c => c === 'µ¡ú').length;
            let lineType = '';
            if (positiveCount === 0) lineType = 'ΦÇüΘÿ┤';
            else if (positiveCount === 1) lineType = 'Θÿ┤';
            else if (positiveCount === 2) lineType = 'Θÿ│';
            else lineType = 'ΦÇüΘÿ│';
            setLines([...lines, lineType].slice(-6));
            setIsShaking(false);
        }, 1500);
    };

    const reset = () => {
        setCoins([]);
        setLines([]);
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
                <h2 className="golden-title text-4xl text-center mb-6">Θô£ΘÆ▒Φ╡╖σìª</h2>
                <p className="text-center text-[var(--color-text-muted)] mb-8">
                    Φ»Üσ┐âΘ╗ÿσ┐╡Θù«Θóÿ∩╝îτä╢σÉÄτé╣σç╗µîëΘÆ«µæçσìªπÇéΘ£Çµæçσà¡µ¼íσ╜óµêÉσ«îµò┤σìªΦ▒íπÇé
                </p>

                <div className="flex justify-center gap-4 mb-8">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-300 ${isShaking ? 'animate-bounce' : ''}`}
                            style={{
                                background: coins[i] ? 'linear-gradient(135deg, #d4a853, #f5d78e)' : 'var(--color-bg-card)',
                                border: '2px solid var(--color-card-border)',
                                color: coins[i] ? '#0a1628' : 'var(--color-text-muted)',
                            }}
                        >
                            {coins[i] || '?'}
                        </div>
                    ))}
                </div>

                {lines.length > 0 && (
                    <div className="flex justify-center gap-2 mb-8 flex-wrap">
                        {lines.map((line, i) => (
                            <div
                                key={i}
                                className="px-4 py-2 rounded text-sm"
                                style={{
                                    background: line.includes('Θÿ│') ? 'rgba(212, 168, 83, 0.3)' : 'rgba(100, 130, 180, 0.3)',
                                    border: '1px solid var(--color-card-border)',
                                }}
                            >
                                τ¼¼{i + 1}τê╗: {line}
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex justify-center gap-4">
                    <button
                        onClick={throwCoins}
                        disabled={isShaking || lines.length >= 6}
                        className="px-8 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ background: 'linear-gradient(135deg, #d4a853, #c49843)', color: '#0a1628' }}
                    >
                        {isShaking ? 'µæçσìªΣ╕¡...' : lines.length >= 6 ? 'σìªΦ▒íσ╖▓µêÉ' : `µæçσìª (${lines.length}/6)`}
                    </button>
                    {lines.length > 0 && (
                        <button onClick={reset} className="px-8 py-3 rounded-lg font-semibold transition-all border border-[var(--color-card-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]">
                            Θçìµû░σ╝Çσºï
                        </button>
                    )}
                </div>

                {lines.length === 6 && interpretation && (
                    <div className="mt-8 p-6 rounded-lg" style={{ background: 'rgba(212, 168, 83, 0.1)', border: '1px solid var(--color-primary)' }}>
                        <div className="text-center mb-6">
                            <h3 className="text-3xl text-[var(--color-primary)] mb-2">{interpretation.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm ${interpretation.nature === 'σñºσÉë' ? 'bg-green-500/30 text-green-300' : interpretation.nature === 'σÉë' ? 'bg-yellow-500/30 text-yellow-300' : interpretation.nature === 'σç╢' ? 'bg-red-500/30 text-red-300' : 'bg-blue-500/30 text-blue-300'}`}>
                                {interpretation.nature}
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 rounded-lg" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                                <h4 className="text-[var(--color-primary)] font-semibold mb-2">≡ƒô£ σìªΦ▒íµÇ╗Φ«║</h4>
                                <p className="text-[var(--color-text-light)]">{interpretation.meaning}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 rounded-lg" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                                    <h4 className="text-[var(--color-primary)] font-semibold mb-2">≡ƒÆ╝ Σ║ïΣ╕ÜΦ┐Éσè┐</h4>
                                    <p className="text-[var(--color-text-light)] text-sm">{interpretation.career}</p>
                                </div>
                                <div className="p-4 rounded-lg" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                                    <h4 className="text-[var(--color-primary)] font-semibold mb-2">Γ¥ñ∩╕Å µäƒµâàΦ┐Éσè┐</h4>
                                    <p className="text-[var(--color-text-light)] text-sm">{interpretation.love}</p>
                                </div>
                                <div className="p-4 rounded-lg" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                                    <h4 className="text-[var(--color-primary)] font-semibold mb-2">≡ƒÆ░ Φ┤óΦ┐Éσêåµ₧É</h4>
                                    <p className="text-[var(--color-text-light)] text-sm">{interpretation.wealth}</p>
                                </div>
                                <div className="p-4 rounded-lg" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                                    <h4 className="text-[var(--color-primary)] font-semibold mb-2">≡ƒÅÑ σüÑσ║╖µÅÉτñ║</h4>
                                    <p className="text-[var(--color-text-light)] text-sm">{interpretation.health}</p>
                                </div>
                            </div>

                            <div className="p-4 rounded-lg" style={{ background: 'rgba(212, 168, 83, 0.2)' }}>
                                <h4 className="text-[var(--color-primary)] font-semibold mb-2">≡ƒÆí σñ⌐µ£║µîçσ╝ò</h4>
                                <p className="text-[var(--color-text-light)]">{interpretation.advice}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default CoinDivination;
