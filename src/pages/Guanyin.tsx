import { useState } from 'react';
import { Link } from 'react-router-dom';

const QIAN_POEMS = [
    { number: 1, title: '上上签', poem: '开天辟地作良缘，吉日良时万物全。若得此签非小可，人行忠正帝王宣。' },
    { number: 7, title: '上签', poem: '莺初出谷始迎春，柳絮纷纷飞到东。人语喧哗皆得禄，凤鸾相对入深宫。' },
    { number: 15, title: '上签', poem: '行舟已遇便风来，正好扬帆东又西。随遇而安心自若，逢山开道有何疑。' },
    { number: 23, title: '中签', poem: '忽然一日风云起，恰似春雷动地来。等待贵人相助后，飞腾变化出尘埃。' },
    { number: 28, title: '中签', poem: '东边月上正婵娟，忽被云遮月半边。虽有清光难见面，瑶台须得待来年。' },
    { number: 35, title: '中签', poem: '衣冠重整旧威仪，朝阙深来恩眷肥。俸禄重新增百倍，皇恩特赐凤凰衣。' },
    { number: 42, title: '中平签', poem: '君出行时必有惊，如临恶水怕舟倾。若能持定心机稳，自有西方度道人。' },
    { number: 55, title: '下签', poem: '世间何事不频繁，恐怕虚名误尽欢。雪里梅花开尚早，待至春来始可看。' },
    { number: 66, title: '中签', poem: '石藏无价玉和珍，只有荆玖外貌贫。若得碧瑶琢磨后，好将善价选良辰。' },
    { number: 88, title: '上签', poem: '龙虎相交在门前，此是其间好因缘。青云得意生富贵，时来运转福自天。' },
];

const Guanyin = () => {
    const [isShaking, setIsShaking] = useState(false);
    const [result, setResult] = useState<typeof QIAN_POEMS[0] | null>(null);

    const drawQian = () => {
        setIsShaking(true);
        setResult(null);

        setTimeout(() => {
            const randomQian = QIAN_POEMS[Math.floor(Math.random() * QIAN_POEMS.length)];
            setResult(randomQian);
            setIsShaking(false);
        }, 2000);
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
                <h2 className="golden-title text-4xl text-center mb-6">观音灵签</h2>
                <p className="text-center text-[var(--color-text-muted)] mb-8">
                    诚心默念您的问题，心诚则灵，摇签求得菩萨指引。
                </p>

                {/* Qian Tube Animation */}
                <div className="flex justify-center mb-8">
                    <div
                        className={`relative w-32 h-48 rounded-lg flex items-end justify-center overflow-hidden transition-transform ${isShaking ? 'animate-shake' : ''}`}
                        style={{
                            background: 'linear-gradient(135deg, #8B4513, #654321)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                        }}
                    >
                        {/* Qian sticks inside */}
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-2 rounded-full"
                                style={{
                                    height: '70%',
                                    background: 'linear-gradient(to top, #d4a853, #f5d78e)',
                                    left: `${20 + i * 10}%`,
                                    bottom: '20%',
                                    transform: isShaking ? `rotate(${Math.random() * 20 - 10}deg)` : 'none',
                                    transition: 'transform 0.1s',
                                }}
                            />
                        ))}
                    </div>
                </div>

                <style>{`
          @keyframes shake {
            0%, 100% { transform: rotate(0deg) translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: rotate(-5deg) translateX(-5px); }
            20%, 40%, 60%, 80% { transform: rotate(5deg) translateX(5px); }
          }
          .animate-shake {
            animation: shake 0.5s ease-in-out infinite;
          }
        `}</style>

                <div className="flex justify-center">
                    <button
                        onClick={drawQian}
                        disabled={isShaking}
                        className="px-8 py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
                        style={{
                            background: 'linear-gradient(135deg, #d4a853, #c49843)',
                            color: '#0a1628',
                        }}
                    >
                        {isShaking ? '摇签中...' : '摇签'}
                    </button>
                </div>

                {result && (
                    <div className="mt-8 p-6 rounded-lg" style={{ background: 'rgba(212, 168, 83, 0.1)', border: '1px solid var(--color-primary)' }}>
                        <div className="text-center mb-4">
                            <span className="text-4xl text-[var(--color-primary)]">第 {result.number} 签</span>
                            <span className="ml-4 px-3 py-1 rounded-full text-sm" style={{
                                background: result.title.includes('上上') ? 'rgba(34, 197, 94, 0.3)' :
                                    result.title.includes('上') ? 'rgba(212, 168, 83, 0.3)' :
                                        result.title.includes('下') ? 'rgba(239, 68, 68, 0.3)' : 'rgba(100, 130, 180, 0.3)',
                                color: result.title.includes('上上') ? '#22c55e' :
                                    result.title.includes('上') ? 'var(--color-primary)' :
                                        result.title.includes('下') ? '#ef4444' : 'var(--color-text-light)'
                            }}>
                                {result.title}
                            </span>
                        </div>
                        <div className="text-center">
                            <p className="text-[var(--color-text-light)] text-lg leading-relaxed whitespace-pre-line">
                                {result.poem.split('。').filter(Boolean).map((line, i) => (
                                    <span key={i} className="block my-2">{line}。</span>
                                ))}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Guanyin;
