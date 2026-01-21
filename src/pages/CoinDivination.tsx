import { useState } from 'react';
import { Link } from 'react-router-dom';

const COIN_RESULTS = ['正', '反'];

const CoinDivination = () => {
    const [coins, setCoins] = useState<string[]>([]);
    const [lines, setLines] = useState<string[]>([]);
    const [isShaking, setIsShaking] = useState(false);

    const throwCoins = () => {
        setIsShaking(true);

        // Simulate coin throw animation
        setTimeout(() => {
            const newCoins = [
                COIN_RESULTS[Math.floor(Math.random() * 2)],
                COIN_RESULTS[Math.floor(Math.random() * 2)],
                COIN_RESULTS[Math.floor(Math.random() * 2)],
            ];
            setCoins(newCoins);

            // Calculate line type based on coins
            const positiveCount = newCoins.filter(c => c === '正').length;
            let lineType = '';
            if (positiveCount === 0) lineType = '老阴';
            else if (positiveCount === 1) lineType = '阴';
            else if (positiveCount === 2) lineType = '阳';
            else lineType = '老阳';

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
                返回首页
            </Link>

            <div className="glass-card p-8">
                <h2 className="golden-title text-4xl text-center mb-6">铜钱起卦</h2>
                <p className="text-center text-[var(--color-text-muted)] mb-8">
                    诚心默念问题，然后点击按钮摇卦。需摇六次形成完整卦象。
                </p>

                {/* Coin display area */}
                <div className="flex justify-center gap-4 mb-8">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-300 ${isShaking ? 'animate-bounce' : ''
                                }`}
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

                {/* Lines display */}
                {lines.length > 0 && (
                    <div className="flex justify-center gap-2 mb-8 flex-wrap">
                        {lines.map((line, i) => (
                            <div
                                key={i}
                                className="px-4 py-2 rounded text-sm"
                                style={{
                                    background: line.includes('阳') ? 'rgba(212, 168, 83, 0.3)' : 'rgba(100, 130, 180, 0.3)',
                                    border: '1px solid var(--color-card-border)',
                                }}
                            >
                                第{i + 1}爻: {line}
                            </div>
                        ))}
                    </div>
                )}

                {/* Action buttons */}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={throwCoins}
                        disabled={isShaking || lines.length >= 6}
                        className="px-8 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                            background: 'linear-gradient(135deg, #d4a853, #c49843)',
                            color: '#0a1628',
                        }}
                    >
                        {isShaking ? '摇卦中...' : lines.length >= 6 ? '卦象已成' : `摇卦 (${lines.length}/6)`}
                    </button>
                    {lines.length > 0 && (
                        <button
                            onClick={reset}
                            className="px-8 py-3 rounded-lg font-semibold transition-all border border-[var(--color-card-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                        >
                            重新开始
                        </button>
                    )}
                </div>

                {/* Result interpretation placeholder */}
                {lines.length === 6 && (
                    <div className="mt-8 p-6 rounded-lg" style={{ background: 'rgba(212, 168, 83, 0.1)', border: '1px solid var(--color-primary)' }}>
                        <h3 className="text-[var(--color-primary)] text-xl mb-4 text-center">卦象解读</h3>
                        <p className="text-[var(--color-text-light)] text-center">
                            您的卦象已成，六爻分别为：{lines.join(' → ')}
                        </p>
                        <p className="text-[var(--color-text-muted)] text-sm text-center mt-4">
                            详细解读功能开发中...
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default CoinDivination;
