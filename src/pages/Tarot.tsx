import { useState } from 'react';
import { Link } from 'react-router-dom';

const TAROT_CARDS = [
    { name: '愚者', meaning: '新的开始、纯真、冒险精神', reversed: '鲁莽、愚蠢、风险' },
    { name: '魔术师', meaning: '创造力、技能、意志力', reversed: '操控、欺骗、潜能浪费' },
    { name: '女祭司', meaning: '直觉、神秘、内在智慧', reversed: '秘密、压抑、表面肤浅' },
    { name: '女皇', meaning: '丰收、养育、感性', reversed: '依赖、过度保护、创造力阻塞' },
    { name: '皇帝', meaning: '权威、结构、领导力', reversed: '专制、固执、缺乏纪律' },
    { name: '教皇', meaning: '传统、精神指引、顺从', reversed: '叛逆、非传统、自由思想' },
    { name: '恋人', meaning: '爱情、和谐、选择', reversed: '不和谐、失衡、错误选择' },
    { name: '战车', meaning: '胜利、意志力、决心', reversed: '失控、缺乏方向、攻击性' },
    { name: '力量', meaning: '勇气、耐心、内在力量', reversed: '软弱、自我怀疑、缺乏勇气' },
    { name: '隐士', meaning: '内省、寻求真理、独处', reversed: '孤独、逃避、退缩' },
    { name: '命运之轮', meaning: '变化、循环、命运', reversed: '厄运、阻碍、失控' },
    { name: '正义', meaning: '公平、真理、因果', reversed: '不公、偏见、逃避责任' },
    { name: '倒吊人', meaning: '牺牲、放下、新视角', reversed: '拖延、抵抗、自我牺牲' },
    { name: '死神', meaning: '结束、转变、蜕变', reversed: '抗拒改变、停滞、恐惧' },
    { name: '节制', meaning: '平衡、耐心、适度', reversed: '过度、失衡、缺乏远见' },
    { name: '恶魔', meaning: '束缚、执着、物质', reversed: '解脱、自由、重获力量' },
    { name: '高塔', meaning: '突变、启示、觉醒', reversed: '避免灾难、恐惧改变' },
    { name: '星星', meaning: '希望、灵感、平静', reversed: '失望、悲观、缺乏信仰' },
    { name: '月亮', meaning: '幻觉、恐惧、潜意识', reversed: '释放恐惧、内心平静' },
    { name: '太阳', meaning: '成功、快乐、活力', reversed: '暂时消沉、缺乏热情' },
    { name: '审判', meaning: '重生、觉醒、赎罪', reversed: '自我怀疑、逃避审视' },
    { name: '世界', meaning: '完成、整合、成就', reversed: '未完成、缺乏闭合' },
];

const Tarot = () => {
    const [cards, setCards] = useState<Array<{ card: typeof TAROT_CARDS[0]; reversed: boolean; position: string }>>([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [spread, setSpread] = useState<'single' | 'three'>('single');

    const drawCards = () => {
        setIsDrawing(true);
        setCards([]);

        setTimeout(() => {
            const positions = spread === 'single' ? ['现状'] : ['过去', '现在', '未来'];
            const shuffled = [...TAROT_CARDS].sort(() => Math.random() - 0.5);
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
                返回首页
            </Link>

            <div className="glass-card p-8">
                <h2 className="golden-title text-4xl text-center mb-6">塔罗占卜</h2>
                <p className="text-center text-[var(--color-text-muted)] mb-8">
                    静心冥想您的问题，选择牌阵后抽取塔罗牌。
                </p>

                {/* Spread Selection */}
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => setSpread('single')}
                        className={`px-6 py-2 rounded-lg transition-all ${spread === 'single' ? 'bg-[var(--color-primary)] text-[#0a1628]' : 'border border-[var(--color-card-border)] text-[var(--color-text-muted)]'}`}
                    >
                        单牌占卜
                    </button>
                    <button
                        onClick={() => setSpread('three')}
                        className={`px-6 py-2 rounded-lg transition-all ${spread === 'three' ? 'bg-[var(--color-primary)] text-[#0a1628]' : 'border border-[var(--color-card-border)] text-[var(--color-text-muted)]'}`}
                    >
                        三牌阵
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
                                    <p className="text-2xl mb-2">✨</p>
                                    <p className="text-[var(--color-primary)] font-semibold text-sm">{item.card.name}</p>
                                    <p className="text-[var(--color-text-muted)] text-xs mt-1">{item.position}</p>
                                    {item.reversed && (
                                        <p className="text-red-400 text-xs mt-1">（逆位）</p>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center">
                                    <p className="text-4xl mb-2">🌙</p>
                                    <p className="text-[var(--color-text-muted)] text-xs">{spread === 'single' ? '点击抽牌' : ['过去', '现在', '未来'][i]}</p>
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
                        {isDrawing ? '洗牌中...' : cards.length > 0 ? '重新抽牌' : '抽牌'}
                    </button>
                </div>

                {/* Interpretation */}
                {cards.length > 0 && (
                    <div className="mt-8 space-y-4">
                        {cards.map((item, i) => (
                            <div key={i} className="p-4 rounded-lg" style={{ background: 'rgba(212, 168, 83, 0.1)', border: '1px solid var(--color-card-border)' }}>
                                <h4 className="text-[var(--color-primary)] font-semibold mb-2">
                                    {item.position}：{item.card.name} {item.reversed && '（逆位）'}
                                </h4>
                                <p className="text-[var(--color-text-light)] text-sm">
                                    {item.reversed ? item.card.reversed : item.card.meaning}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default Tarot;
