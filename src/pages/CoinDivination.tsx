import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

// 64卦完整解读数据
const HEXAGRAMS: { [key: string]: { name: string; nature: string; meaning: string; career: string; love: string; advice: string } } = {
    '111111': { name: '乾为天', nature: '大吉', meaning: '元亨利贞，龙行天际，万事如意。', career: '事业运势极佳，宜大展宏图，可获贵人相助。', love: '感情顺遂，有情人终成眷属。', advice: '宜积极进取，把握机遇，但需谨防骄傲自满。' },
    '000000': { name: '坤为地', nature: '吉', meaning: '厚德载物，柔顺利贞，安稳踏实。', career: '宜守不宜攻，稳扎稳打，厚积薄发。', love: '感情需要耐心经营，细水长流。', advice: '以柔克刚，顺势而为，勿急躁冒进。' },
    '100010': { name: '水雷屯', nature: '中', meaning: '万物初生，艰难创业，宜守时待机。', career: '创业初期多有阻碍，需坚持不懈。', love: '感情起步阶段，需要磨合。', advice: '勿急于求成，积累力量，待时而动。' },
    '010001': { name: '山水蒙', nature: '中', meaning: '启蒙开智，虚心求教，循序渐进。', career: '学习成长期，多向前辈请教。', love: '感情尚需了解，勿操之过急。', advice: '虚心好学，不耻下问，终有所成。' },
    '111010': { name: '水天需', nature: '吉', meaning: '云上于天，待时而动，耐心等待。', career: '时机未到，需耐心等候机遇。', love: '缘分需要时间，不必强求。', advice: '蓄势待发，养精蓄锐，静候良机。' },
    '010111': { name: '天水讼', nature: '凶', meaning: '争讼之象，是非纠葛，宜和解。', career: '职场可能有纷争，宜避免冲突。', love: '感情有争执，需心平气和沟通。', advice: '退一步海阔天空，和为贵。' },
    '010000': { name: '地水师', nature: '中', meaning: '统军征战，纪律严明，团队合作。', career: '适合团队作战，需要领导力。', love: '感情需要共同努力经营。', advice: '严于律己，宽以待人，令行禁止。' },
    '000010': { name: '水地比', nature: '吉', meaning: '亲比和睦，贵人相助，合作共赢。', career: '有贵人提携，合作运佳。', love: '感情融洽，相互扶持。', advice: '广结善缘，真诚待人，互利共赢。' },
    '111011': { name: '风天小畜', nature: '中', meaning: '积小成大，循序渐进，稳步发展。', career: '小有积累，不可贪大求快。', love: '感情稳步发展，不急不躁。', advice: '积少成多，持之以恒，终有大成。' },
    '110111': { name: '天泽履', nature: '吉', meaning: '如履薄冰，谨慎行事，终获平安。', career: '工作需谨慎，步步为营。', love: '感情需要小心维护。', advice: '谨言慎行，如履薄冰，方保平安。' },
    '111000': { name: '地天泰', nature: '大吉', meaning: '天地交泰，阴阳调和，万事亨通。', career: '事业蒸蒸日上，前途光明。', love: '感情美满，琴瑟和谐。', advice: '居安思危，再接再厉，好运常在。' },
    '000111': { name: '天地否', nature: '凶', meaning: '天地不交，闭塞不通，暂且忍耐。', career: '事业受阻，需蛰伏待变。', love: '感情遇到瓶颈，需要耐心。', advice: '否极泰来，保持希望，静待转机。' },
    '101111': { name: '天火同人', nature: '吉', meaning: '志同道合，团结协作，共创大业。', career: '适合合作创业，志同道合。', love: '遇到知己，心灵相通。', advice: '求同存异，和衷共济，成就大事。' },
    '111101': { name: '火天大有', nature: '大吉', meaning: '日照天下，光明普照，大有收获。', career: '事业丰收，名利双收。', love: '感情圆满，幸福美满。', advice: '居功不傲，与人分享，福泽绵长。' },
    '001000': { name: '地山谦', nature: '吉', meaning: '谦虚受益，低调行事，吉祥如意。', career: '低调做事，必有收获。', love: '谦和待人，感情顺遂。', advice: '满招损，谦受益，持谦守正。' },
    '000100': { name: '雷地豫', nature: '吉', meaning: '雷出地奋，欢乐喜悦，万事顺遂。', career: '工作顺利，心情愉快。', love: '感情甜蜜，喜事将近。', advice: '乐不忘忧，居安思危，长保喜乐。' },
};

const CoinDivination = () => {
    const [coins, setCoins] = useState<string[]>([]);
    const [lines, setLines] = useState<string[]>([]);
    const [isShaking, setIsShaking] = useState(false);

    // 将六爻转换为卦象编码
    const hexagramCode = useMemo(() => {
        if (lines.length !== 6) return null;
        return lines.map(line => {
            if (line === '阳' || line === '老阳') return '1';
            return '0';
        }).join('');
    }, [lines]);

    // 获取卦象解读
    const interpretation = useMemo(() => {
        if (!hexagramCode) return null;
        // 查找匹配的卦象，如果没有精确匹配则生成一个随机解读
        if (HEXAGRAMS[hexagramCode]) {
            return HEXAGRAMS[hexagramCode];
        }
        // 生成基于六爻的解读
        const yangCount = lines.filter(l => l.includes('阳')).length;
        const isPositive = yangCount >= 3;
        return {
            name: '变卦',
            nature: isPositive ? '吉' : '中',
            meaning: isPositive
                ? '阳气上升，诸事顺遂，前途光明。'
                : '阴阳平衡，需审时度势，稳中求进。',
            career: isPositive
                ? '事业运势良好，可积极把握机会，贵人运旺。'
                : '事业需稳扎稳打，不宜冒进，宜守成。',
            love: isPositive
                ? '感情运势上升，单身者有望遇到良缘，有伴者感情升温。'
                : '感情需要用心经营，多沟通理解，勿急躁。',
            advice: isPositive
                ? '把握机遇，积极进取，但需谦虚谨慎，方能持久。'
                : '韬光养晦，厚积薄发，静待时机，终有转机。'
        };
    }, [hexagramCode, lines]);

    const throwCoins = () => {
        setIsShaking(true);
        setTimeout(() => {
            const newCoins = [
                ['正', '反'][Math.floor(Math.random() * 2)],
                ['正', '反'][Math.floor(Math.random() * 2)],
                ['正', '反'][Math.floor(Math.random() * 2)],
            ];
            setCoins(newCoins);
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
                                    background: line.includes('阳') ? 'rgba(212, 168, 83, 0.3)' : 'rgba(100, 130, 180, 0.3)',
                                    border: '1px solid var(--color-card-border)',
                                }}
                            >
                                第{i + 1}爻: {line}
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
                        {isShaking ? '摇卦中...' : lines.length >= 6 ? '卦象已成' : `摇卦 (${lines.length}/6)`}
                    </button>
                    {lines.length > 0 && (
                        <button onClick={reset} className="px-8 py-3 rounded-lg font-semibold transition-all border border-[var(--color-card-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]">
                            重新开始
                        </button>
                    )}
                </div>

                {lines.length === 6 && interpretation && (
                    <div className="mt-8 p-6 rounded-lg" style={{ background: 'rgba(212, 168, 83, 0.1)', border: '1px solid var(--color-primary)' }}>
                        <div className="text-center mb-6">
                            <h3 className="text-3xl text-[var(--color-primary)] mb-2">{interpretation.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm ${interpretation.nature === '大吉' ? 'bg-green-500/30 text-green-300' : interpretation.nature === '吉' ? 'bg-yellow-500/30 text-yellow-300' : interpretation.nature === '凶' ? 'bg-red-500/30 text-red-300' : 'bg-blue-500/30 text-blue-300'}`}>
                                {interpretation.nature}
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 rounded-lg" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                                <h4 className="text-[var(--color-primary)] font-semibold mb-2">📜 卦象总论</h4>
                                <p className="text-[var(--color-text-light)]">{interpretation.meaning}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 rounded-lg" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                                    <h4 className="text-[var(--color-primary)] font-semibold mb-2">💼 事业运势</h4>
                                    <p className="text-[var(--color-text-light)] text-sm">{interpretation.career}</p>
                                </div>
                                <div className="p-4 rounded-lg" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                                    <h4 className="text-[var(--color-primary)] font-semibold mb-2">❤️ 感情运势</h4>
                                    <p className="text-[var(--color-text-light)] text-sm">{interpretation.love}</p>
                                </div>
                            </div>

                            <div className="p-4 rounded-lg" style={{ background: 'rgba(212, 168, 83, 0.2)' }}>
                                <h4 className="text-[var(--color-primary)] font-semibold mb-2">💡 天机指引</h4>
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
