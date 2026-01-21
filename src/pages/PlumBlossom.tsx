import { useState } from 'react';
import { Link } from 'react-router-dom';

const PlumBlossom = () => {
    const [upperNumber, setUpperNumber] = useState('');
    const [lowerNumber, setLowerNumber] = useState('');
    const [movingLine, setMovingLine] = useState('');
    const [result, setResult] = useState<any>(null);

    const TRIGRAMS = ['乾', '兑', '离', '震', '巽', '坎', '艮', '坤'];

    const calculate = () => {
        const upper = parseInt(upperNumber) || Math.floor(Math.random() * 8) + 1;
        const lower = parseInt(lowerNumber) || Math.floor(Math.random() * 8) + 1;
        const moving = parseInt(movingLine) || Math.floor(Math.random() * 6) + 1;

        const upperTrigram = TRIGRAMS[(upper - 1) % 8];
        const lowerTrigram = TRIGRAMS[(lower - 1) % 8];

        setResult({
            upper: upperTrigram,
            lower: lowerTrigram,
            movingLine: moving,
            interpretation: `上卦${upperTrigram}，下卦${lowerTrigram}，动爻第${moving}爻。此卦主${['进取', '守成', '变化', '静待'][Math.floor(Math.random() * 4)]}之象。`,
        });
    };

    const useCurrentTime = () => {
        const now = new Date();
        setUpperNumber(String(now.getHours() % 8 || 8));
        setLowerNumber(String(now.getMinutes() % 8 || 8));
        setMovingLine(String((now.getHours() + now.getMinutes()) % 6 || 6));
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
                <h2 className="golden-title text-4xl text-center mb-6">梅花易数</h2>
                <p className="text-center text-[var(--color-text-muted)] mb-8">
                    取天地之数起卦，可自行输入数字，或以当前时间起卦。
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div>
                        <label className="block text-[var(--color-text-muted)] text-sm mb-2">上卦数 (1-8)</label>
                        <input
                            type="number"
                            min="1"
                            max="8"
                            value={upperNumber}
                            onChange={(e) => setUpperNumber(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-dark)] border border-[var(--color-card-border)] text-[var(--color-text-light)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                            placeholder="输入数字"
                        />
                    </div>
                    <div>
                        <label className="block text-[var(--color-text-muted)] text-sm mb-2">下卦数 (1-8)</label>
                        <input
                            type="number"
                            min="1"
                            max="8"
                            value={lowerNumber}
                            onChange={(e) => setLowerNumber(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-dark)] border border-[var(--color-card-border)] text-[var(--color-text-light)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                            placeholder="输入数字"
                        />
                    </div>
                    <div>
                        <label className="block text-[var(--color-text-muted)] text-sm mb-2">动爻数 (1-6)</label>
                        <input
                            type="number"
                            min="1"
                            max="6"
                            value={movingLine}
                            onChange={(e) => setMovingLine(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-dark)] border border-[var(--color-card-border)] text-[var(--color-text-light)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                            placeholder="输入数字"
                        />
                    </div>
                </div>

                <div className="flex justify-center gap-4 flex-wrap">
                    <button
                        onClick={useCurrentTime}
                        className="px-6 py-3 rounded-lg font-semibold transition-all border border-[var(--color-card-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                    >
                        以当前时间起卦
                    </button>
                    <button
                        onClick={calculate}
                        className="px-8 py-3 rounded-lg font-semibold transition-all"
                        style={{
                            background: 'linear-gradient(135deg, #d4a853, #c49843)',
                            color: '#0a1628',
                        }}
                    >
                        起卦
                    </button>
                </div>

                {result && (
                    <div className="mt-8 p-6 rounded-lg" style={{ background: 'rgba(212, 168, 83, 0.1)', border: '1px solid var(--color-primary)' }}>
                        <h3 className="text-[var(--color-primary)] text-xl mb-4 text-center">卦象</h3>
                        <div className="flex justify-center gap-8 mb-4">
                            <div className="text-center">
                                <p className="text-[var(--color-text-muted)] text-sm">上卦</p>
                                <p className="text-3xl text-[var(--color-text-light)]">{result.upper}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[var(--color-text-muted)] text-sm">下卦</p>
                                <p className="text-3xl text-[var(--color-text-light)]">{result.lower}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[var(--color-text-muted)] text-sm">动爻</p>
                                <p className="text-3xl text-[var(--color-text-light)]">第{result.movingLine}爻</p>
                            </div>
                        </div>
                        <p className="text-[var(--color-text-light)] text-center">{result.interpretation}</p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default PlumBlossom;
