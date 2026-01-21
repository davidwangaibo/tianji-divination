import { useState } from 'react';
import { Link } from 'react-router-dom';

const QIAN_DATA = [
    {
        number: 1, title: '上上签', poem: '开天辟地作良缘，吉日良时万物全。若得此签非小可，人行忠正帝王宣。',
        interpretation: '此签大吉，如日出东方，万象更新。所求之事必能如愿以偿。',
        career: '事业蒸蒸日上，贵人相助，升职加薪指日可待。',
        love: '感情美满，单身者即将遇到真命天子/天女。',
        advice: '把握良机，积极进取，诸事可成。'
    },
    {
        number: 7, title: '上签', poem: '莺初出谷始迎春，柳絮纷纷飞到东。人语喧哗皆得禄，凤鸾相对入深宫。',
        interpretation: '如黄莺出谷，春暖花开，时来运转之象。',
        career: '事业有新的发展机遇，宜把握时机。',
        love: '桃花运旺，有喜事将近。',
        advice: '顺势而为，把握春天般的好时机。'
    },
    {
        number: 15, title: '上签', poem: '行舟已遇便风来，正好扬帆东又西。随遇而安心自若，逢山开道有何疑。',
        interpretation: '顺风顺水，一帆风顺之象。所求之事顺利可成。',
        career: '工作顺利，有贵人暗中相助。',
        love: '感情稳定，水到渠成。',
        advice: '顺其自然，无需强求，自有好结果。'
    },
    {
        number: 23, title: '中签', poem: '忽然一日风云起，恰似春雷动地来。等待贵人相助后，飞腾变化出尘埃。',
        interpretation: '虽有波折，但有贵人相助，终有转机。',
        career: '事业有变动，需耐心等待机会。',
        love: '感情经历考验后会更加稳固。',
        advice: '韬光养晦，等待时机，贵人将至。'
    },
    {
        number: 28, title: '中签', poem: '东边月上正婵娟，忽被云遮月半边。虽有清光难见面，瑶台须得待来年。',
        interpretation: '事有阻碍，如月被云遮，需耐心等待。',
        career: '暂时不宜大动，宜守成积累。',
        love: '感情有小波折，需要时间化解。',
        advice: '耐心等待，云开月明终有时。'
    },
    {
        number: 35, title: '中签', poem: '衣冠重整旧威仪，朝阙深来恩眷肥。俸禄重新增百倍，皇恩特赐凤凰衣。',
        interpretation: '经过整顿后，运势好转，有回升之象。',
        career: '曾经失去的机会或职位有望重新获得。',
        love: '旧情复燃或感情升温。',
        advice: '整装待发，重整旗鼓，好运将来。'
    },
    {
        number: 42, title: '中平签', poem: '君出行时必有惊，如临恶水怕舟倾。若能持定心机稳，自有西方度道人。',
        interpretation: '行事需谨慎，虽有惊险但能化险为夷。',
        career: '工作中需小心应对挑战。',
        love: '感情需要用心维护，避免误会。',
        advice: '遇事冷静，心态稳定，自有贵人相助。'
    },
    {
        number: 55, title: '下签', poem: '世间何事不频繁，恐怕虚名误尽欢。雪里梅花开尚早，待至春来始可看。',
        interpretation: '时机未到，需耐心等待，不可急躁。',
        career: '目前不宜冒进，宜积累实力。',
        love: '感情需要时间培养，不可急于求成。',
        advice: '静待花开，时机成熟自然成功。'
    },
    {
        number: 66, title: '中签', poem: '石藏无价玉和珍，只有荆玖外貌贫。若得碧瑶琢磨后，好将善价选良辰。',
        interpretation: '璞玉未琢，需经磨砺方能成器。',
        career: '宜提升自我能力，积累后厚积薄发。',
        love: '真情如玉，需时间证明。',
        advice: '沉淀自我，磨练本领，终有出头之日。'
    },
    {
        number: 77, title: '中签', poem: '月印长江意自深，何须更问事间音。云开月出终相遇，万水千山阻不侵。',
        interpretation: '虽有阻隔，但有缘终会相遇，不必过于忧虑。',
        career: '障碍只是暂时的，坚持必有回报。',
        love: '有情人终成眷属，异地恋可成。',
        advice: '保持信心，坚定不移，终会成功。'
    },
    {
        number: 88, title: '上签', poem: '龙虎相交在门前，此是其间好因缘。青云得意生富贵，时来运转福自天。',
        interpretation: '龙虎呈祥，大吉大利，好运当头。',
        career: '事业腾飞，名利双收。',
        love: '良缘天定，佳偶天成。',
        advice: '运势极佳，宜乘胜追击。'
    },
    {
        number: 100, title: '上上签', poem: '千山万水尽皆通，一帆风顺达天庭。功名富贵皆可得，此签最是显威灵。',
        interpretation: '功成名就，万事如意，鸿运当头。',
        career: '事业达到巅峰，名利双收。',
        love: '感情圆满，婚姻美满。',
        advice: '天赐良机，尽情发挥。'
    },
];

const Guanyin = () => {
    const [isShaking, setIsShaking] = useState(false);
    const [result, setResult] = useState<typeof QIAN_DATA[0] | null>(null);

    const drawQian = () => {
        setIsShaking(true);
        setResult(null);
        setTimeout(() => {
            const randomQian = QIAN_DATA[Math.floor(Math.random() * QIAN_DATA.length)];
            setResult(randomQian);
            setIsShaking(false);
        }, 2500);
    };

    const getFortuneColor = (title: string) => {
        if (title.includes('上上')) return { bg: 'rgba(34, 197, 94, 0.3)', text: '#22c55e' };
        if (title.includes('上')) return { bg: 'rgba(212, 168, 83, 0.3)', text: 'var(--color-primary)' };
        if (title.includes('下')) return { bg: 'rgba(239, 68, 68, 0.3)', text: '#ef4444' };
        return { bg: 'rgba(100, 130, 180, 0.3)', text: 'var(--color-text-light)' };
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
                        {isShaking ? '摇签中...' : '摇签'}
                    </button>
                </div>

                {result && (
                    <div className="mt-8 space-y-6">
                        <div className="p-6 rounded-lg text-center" style={{ background: 'rgba(212, 168, 83, 0.1)', border: '1px solid var(--color-primary)' }}>
                            <span className="text-5xl text-[var(--color-primary)]">第 {result.number} 签</span>
                            <span className="ml-4 px-4 py-2 rounded-full text-lg inline-block mt-2"
                                style={{ background: getFortuneColor(result.title).bg, color: getFortuneColor(result.title).text }}>
                                {result.title}
                            </span>
                        </div>

                        <div className="p-6 rounded-lg" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                            <h4 className="text-[var(--color-primary)] font-semibold mb-4 text-center">📜 签诗</h4>
                            <div className="text-center text-[var(--color-text-light)] text-lg leading-loose">
                                {result.poem.split('。').filter(Boolean).map((line, i) => (
                                    <p key={i} className="my-1">{line}。</p>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 rounded-lg" style={{ background: 'rgba(212, 168, 83, 0.15)' }}>
                            <h4 className="text-[var(--color-primary)] font-semibold mb-2">🔮 签解</h4>
                            <p className="text-[var(--color-text-light)]">{result.interpretation}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                                <h4 className="text-[var(--color-primary)] font-semibold mb-2">💼 事业</h4>
                                <p className="text-[var(--color-text-light)] text-sm">{result.career}</p>
                            </div>
                            <div className="p-4 rounded-lg" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                                <h4 className="text-[var(--color-primary)] font-semibold mb-2">❤️ 感情</h4>
                                <p className="text-[var(--color-text-light)] text-sm">{result.love}</p>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg" style={{ background: 'rgba(212, 168, 83, 0.2)' }}>
                            <h4 className="text-[var(--color-primary)] font-semibold mb-2">💡 菩萨指引</h4>
                            <p className="text-[var(--color-text-light)]">{result.advice}</p>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Guanyin;
