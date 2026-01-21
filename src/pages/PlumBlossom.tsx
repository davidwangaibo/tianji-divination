import { useState } from 'react';
import { Link } from 'react-router-dom';

const TRIGRAMS = ['乾', '兑', '离', '震', '巽', '坎', '艮', '坤'];
const TRIGRAM_NATURE = {
    '乾': { element: '天', nature: '刚健', fortune: '大吉' },
    '兑': { element: '泽', nature: '喜悦', fortune: '吉' },
    '离': { element: '火', nature: '光明', fortune: '吉' },
    '震': { element: '雷', nature: '震动', fortune: '中' },
    '巽': { element: '风', nature: '顺入', fortune: '吉' },
    '坎': { element: '水', nature: '险陷', fortune: '凶' },
    '艮': { element: '山', nature: '止静', fortune: '中' },
    '坤': { element: '地', nature: '柔顺', fortune: '吉' },
};

const INTERPRETATIONS = {
    career: [
        '事业运势极佳，贵人相助，宜积极把握机会，可获升迁或加薪。',
        '事业稳中有进，需保持耐心，脚踏实地方能有所突破。',
        '事业面临挑战，但危机中蕴含转机，需审时度势，灵活应变。',
        '事业有新的发展机遇，可尝试新方向，但需谨慎决策。',
        '事业需守成为主，不宜冒进，积累实力待时而动为佳。',
    ],
    wealth: [
        '财运亨通，正财偏财俱佳，可适当投资理财。',
        '财运平稳，收入稳定，但需控制开支，避免不必要的花销。',
        '财运起伏，需谨慎理财，避免高风险投资。',
        '有意外之财的可能，但也需防破财，宜量入为出。',
        '财运渐升，后半年尤佳，可制定长期理财计划。',
    ],
    love: [
        '感情运势大好，单身者有望邂逅良缘，有伴者感情升温。',
        '感情需要用心经营，多沟通理解，小矛盾及时化解。',
        '感情平淡如水，需主动制造浪漫，重燃激情。',
        '桃花运旺，但需分辨真心，勿被表象迷惑。',
        '感情稳定发展，可考虑进一步承诺或共同规划未来。',
    ],
    health: [
        '身体健康，精力充沛，但仍需保持良好作息习惯。',
        '需多注意休息，避免过度劳累，适当运动增强体质。',
        '肠胃方面需多加注意，饮食宜清淡规律。',
        '注意调节情绪，压力大时可尝试冥想或瑜伽放松。',
        '整体健康状况良好，定期体检有助于及早发现问题。',
    ],
};

const PlumBlossom = () => {
    const [upperNumber, setUpperNumber] = useState('');
    const [lowerNumber, setLowerNumber] = useState('');
    const [movingLine, setMovingLine] = useState('');
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        const upper = parseInt(upperNumber) || Math.floor(Math.random() * 8) + 1;
        const lower = parseInt(lowerNumber) || Math.floor(Math.random() * 8) + 1;
        const moving = parseInt(movingLine) || Math.floor(Math.random() * 6) + 1;

        const upperTrigram = TRIGRAMS[(upper - 1) % 8];
        const lowerTrigram = TRIGRAMS[(lower - 1) % 8];
        const upperInfo = TRIGRAM_NATURE[upperTrigram as keyof typeof TRIGRAM_NATURE];
        const lowerInfo = TRIGRAM_NATURE[lowerTrigram as keyof typeof TRIGRAM_NATURE];

        // 生成综合运势
        const fortuneScore = (upper + lower + moving) % 5;
        const overallFortune = fortuneScore >= 3 ? '吉' : fortuneScore >= 1 ? '中' : '需谨慎';

        setResult({
            upper: upperTrigram,
            lower: lowerTrigram,
            movingLine: moving,
            upperInfo,
            lowerInfo,
            overallFortune,
            interpretation: {
                summary: `上卦${upperTrigram}属${upperInfo.element}，主${upperInfo.nature}；下卦${lowerTrigram}属${lowerInfo.element}，主${lowerInfo.nature}。动爻在第${moving}爻，${moving <= 3 ? '下卦变动，内因为主' : '上卦变动，外因为主'}。`,
                career: INTERPRETATIONS.career[(upper + moving) % 5],
                wealth: INTERPRETATIONS.wealth[(lower + moving) % 5],
                love: INTERPRETATIONS.love[(upper + lower) % 5],
                health: INTERPRETATIONS.health[(upper + lower + moving) % 5],
                advice: moving <= 3
                    ? '当前变化源于内在因素，宜反躬自省，调整心态和行为方式。静以修身，俭以养德。'
                    : '当前变化受外部环境影响，宜审时度势，顺势而为。外圆内方，灵活应变。',
            }
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
                        <input type="number" min="1" max="8" value={upperNumber} onChange={(e) => setUpperNumber(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-dark)] border border-[var(--color-card-border)] text-[var(--color-text-light)] focus:border-[var(--color-primary)] focus:outline-none transition-colors" placeholder="输入数字" />
                    </div>
                    <div>
                        <label className="block text-[var(--color-text-muted)] text-sm mb-2">下卦数 (1-8)</label>
                        <input type="number" min="1" max="8" value={lowerNumber} onChange={(e) => setLowerNumber(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-dark)] border border-[var(--color-card-border)] text-[var(--color-text-light)] focus:border-[var(--color-primary)] focus:outline-none transition-colors" placeholder="输入数字" />
                    </div>
                    <div>
                        <label className="block text-[var(--color-text-muted)] text-sm mb-2">动爻数 (1-6)</label>
                        <input type="number" min="1" max="6" value={movingLine} onChange={(e) => setMovingLine(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-dark)] border border-[var(--color-card-border)] text-[var(--color-text-light)] focus:border-[var(--color-primary)] focus:outline-none transition-colors" placeholder="输入数字" />
                    </div>
                </div>

                <div className="flex justify-center gap-4 flex-wrap">
                    <button onClick={useCurrentTime} className="px-6 py-3 rounded-lg font-semibold transition-all border border-[var(--color-card-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]">
                        以当前时间起卦
                    </button>
                    <button onClick={calculate} className="px-8 py-3 rounded-lg font-semibold transition-all" style={{ background: 'linear-gradient(135deg, #d4a853, #c49843)', color: '#0a1628' }}>
                        起卦
                    </button>
                </div>

                {result && (
                    <div className="mt-8 space-y-6">
                        {/* 卦象显示 */}
                        <div className="p-6 rounded-lg" style={{ background: 'rgba(212, 168, 83, 0.1)', border: '1px solid var(--color-primary)' }}>
                            <div className="flex justify-center gap-8 mb-4">
                                <div className="text-center">
                                    <p className="text-[var(--color-text-muted)] text-sm">上卦</p>
                                    <p className="text-4xl text-[var(--color-primary)]">{result.upper}</p>
                                    <p className="text-xs text-[var(--color-text-muted)]">{result.upperInfo.element} · {result.upperInfo.nature}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[var(--color-text-muted)] text-sm">下卦</p>
                                    <p className="text-4xl text-[var(--color-text-light)]">{result.lower}</p>
                                    <p className="text-xs text-[var(--color-text-muted)]">{result.lowerInfo.element} · {result.lowerInfo.nature}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[var(--color-text-muted)] text-sm">动爻</p>
                                    <p className="text-4xl text-blue-300">第{result.movingLine}爻</p>
                                    <p className="text-xs text-[var(--color-text-muted)]">{result.movingLine <= 3 ? '内因变动' : '外因变动'}</p>
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <span className={`px-4 py-1 rounded-full text-sm ${result.overallFortune === '吉' ? 'bg-green-500/30 text-green-300' : result.overallFortune === '中' ? 'bg-yellow-500/30 text-yellow-300' : 'bg-red-500/30 text-red-300'}`}>
                                    综合运势：{result.overallFortune}
                                </span>
                            </div>
                        </div>

                        {/* 详细解读 */}
                        <div className="p-4 rounded-lg" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                            <h4 className="text-[var(--color-primary)] font-semibold mb-2">📜 卦象分析</h4>
                            <p className="text-[var(--color-text-light)]">{result.interpretation.summary}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                                <h4 className="text-[var(--color-primary)] font-semibold mb-2">💼 事业运势</h4>
                                <p className="text-[var(--color-text-light)] text-sm">{result.interpretation.career}</p>
                            </div>
                            <div className="p-4 rounded-lg" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                                <h4 className="text-[var(--color-primary)] font-semibold mb-2">💰 财运预测</h4>
                                <p className="text-[var(--color-text-light)] text-sm">{result.interpretation.wealth}</p>
                            </div>
                            <div className="p-4 rounded-lg" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                                <h4 className="text-[var(--color-primary)] font-semibold mb-2">❤️ 感情运势</h4>
                                <p className="text-[var(--color-text-light)] text-sm">{result.interpretation.love}</p>
                            </div>
                            <div className="p-4 rounded-lg" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                                <h4 className="text-[var(--color-primary)] font-semibold mb-2">🏥 健康提示</h4>
                                <p className="text-[var(--color-text-light)] text-sm">{result.interpretation.health}</p>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg" style={{ background: 'rgba(212, 168, 83, 0.2)' }}>
                            <h4 className="text-[var(--color-primary)] font-semibold mb-2">💡 天机指引</h4>
                            <p className="text-[var(--color-text-light)]">{result.interpretation.advice}</p>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default PlumBlossom;
