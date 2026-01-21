import { useState } from 'react';
import { Link } from 'react-router-dom';

const NAKSHATRAS = [
    '阿须毗尼 (Ashwini)', '婆罗尼 (Bharani)', '羯利帝迦 (Krittika)', '卢希尼 (Rohini)',
    '摩利伽尸罗 (Mrigashira)', '阿陀罗 (Ardra)', '补纳婆苏 (Punarvasu)', '补史耶 (Pushya)',
    '阿舍利沙 (Ashlesha)', '摩伽 (Magha)', '补婆发古尼 (Purva Phalguni)', '乌陀罗发古尼 (Uttara Phalguni)',
    '诃斯多 (Hasta)', '质多罗 (Chitra)', '娑婆帝 (Swati)', '毗舍佉 (Vishakha)',
    '阿奴罗陀 (Anuradha)', '勿里室遮 (Jyeshtha)', '摩罗 (Mula)', '补婆阿沙荼 (Purva Ashadha)',
    '乌陀罗阿沙荼 (Uttara Ashadha)', '室罗婆那 (Shravana)', '陀尼瑟陀 (Dhanishta)', '舍陀毗沙 (Shatabhisha)',
    '补婆跋陀罗钵陀 (Purva Bhadrapada)', '乌陀罗跋陀罗钵陀 (Uttara Bhadrapada)', '利婆帝 (Revati)'
];

const RASHIS = [
    { name: '白羊座 (Mesha)', ruler: '火星', element: '火' },
    { name: '金牛座 (Vrishabha)', ruler: '金星', element: '土' },
    { name: '双子座 (Mithuna)', ruler: '水星', element: '风' },
    { name: '巨蟹座 (Karka)', ruler: '月亮', element: '水' },
    { name: '狮子座 (Simha)', ruler: '太阳', element: '火' },
    { name: '处女座 (Kanya)', ruler: '水星', element: '土' },
    { name: '天秤座 (Tula)', ruler: '金星', element: '风' },
    { name: '天蝎座 (Vrishchika)', ruler: '火星', element: '水' },
    { name: '射手座 (Dhanu)', ruler: '木星', element: '火' },
    { name: '摩羯座 (Makara)', ruler: '土星', element: '土' },
    { name: '水瓶座 (Kumbha)', ruler: '土星', element: '风' },
    { name: '双鱼座 (Meena)', ruler: '木星', element: '水' },
];

const DASHAS = ['太阳大运', '月亮大运', '火星大运', '罗睺大运', '木星大运', '土星大运', '水星大运', '计都大运', '金星大运'];

const VedicAstrology = () => {
    const [birthDate, setBirthDate] = useState('');
    const [birthTime, setBirthTime] = useState('');
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        if (!birthDate) return;

        const date = new Date(birthDate);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const hour = birthTime ? parseInt(birthTime.split(':')[0]) : 12;

        // Simplified calculations for demo
        const nakshatraIndex = (day + month * 2 + hour) % 27;
        const rashiIndex = month % 12;
        const dashaIndex = (year + month) % 9;

        setResult({
            nakshatra: NAKSHATRAS[nakshatraIndex],
            rashi: RASHIS[rashiIndex],
            currentDasha: DASHAS[dashaIndex],
            luckyGem: ['红宝石', '珍珠', '珊瑚', '祖母绿', '黄玉', '钻石', '蓝宝石', '猫眼石', '紫水晶'][dashaIndex],
            luckyColor: ['红色', '白色', '橙色', '绿色', '黄色', '蓝色', '靛蓝', '灰色', '紫色'][dashaIndex],
            mantra: ['Om Suryaya Namaha', 'Om Chandraya Namaha', 'Om Mangalaya Namaha', 'Om Rahave Namaha', 'Om Gurave Namaha', 'Om Shanaye Namaha', 'Om Budhaya Namaha', 'Om Ketave Namaha', 'Om Shukraya Namaha'][dashaIndex],
        });
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
                <h2 className="golden-title text-4xl text-center mb-2">印度占星</h2>
                <p className="text-center text-[var(--color-primary-light)] text-sm mb-6">Vedic Astrology (Jyotish)</p>
                <p className="text-center text-[var(--color-text-muted)] mb-8">
                    基于吠陀占星体系，探索您的月亮星宿(Nakshatra)与行星大运(Mahadasha)。
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-[var(--color-text-muted)] text-sm mb-2">出生日期</label>
                        <input
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-dark)] border border-[var(--color-card-border)] text-[var(--color-text-light)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-[var(--color-text-muted)] text-sm mb-2">出生时间 (可选)</label>
                        <input
                            type="time"
                            value={birthTime}
                            onChange={(e) => setBirthTime(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-dark)] border border-[var(--color-card-border)] text-[var(--color-text-light)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                        />
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={calculate}
                        disabled={!birthDate}
                        className="px-8 py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
                        style={{
                            background: 'linear-gradient(135deg, #d4a853, #c49843)',
                            color: '#0a1628',
                        }}
                    >
                        计算命盘
                    </button>
                </div>

                {result && (
                    <div className="mt-8 space-y-6">
                        {/* Main Results */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg" style={{ background: 'rgba(212, 168, 83, 0.1)', border: '1px solid var(--color-card-border)' }}>
                                <h4 className="text-[var(--color-primary)] font-semibold mb-2">🌙 月亮星宿 (Nakshatra)</h4>
                                <p className="text-[var(--color-text-light)]">{result.nakshatra}</p>
                            </div>
                            <div className="p-4 rounded-lg" style={{ background: 'rgba(212, 168, 83, 0.1)', border: '1px solid var(--color-card-border)' }}>
                                <h4 className="text-[var(--color-primary)] font-semibold mb-2">♈ 月亮星座 (Rashi)</h4>
                                <p className="text-[var(--color-text-light)]">{result.rashi.name}</p>
                                <p className="text-[var(--color-text-muted)] text-sm">守护星: {result.rashi.ruler} | 元素: {result.rashi.element}</p>
                            </div>
                        </div>

                        {/* Current Dasha */}
                        <div className="p-4 rounded-lg" style={{ background: 'rgba(150, 100, 180, 0.1)', border: '1px solid rgba(150, 100, 180, 0.3)' }}>
                            <h4 className="text-purple-300 font-semibold mb-2">⏰ 当前大运 (Mahadasha)</h4>
                            <p className="text-[var(--color-text-light)] text-lg">{result.currentDasha}</p>
                        </div>

                        {/* Recommendations */}
                        <div className="p-6 rounded-lg" style={{ background: 'rgba(212, 168, 83, 0.1)', border: '1px solid var(--color-primary)' }}>
                            <h4 className="text-[var(--color-primary)] font-semibold mb-4 text-center">✨ 开运建议</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                <div>
                                    <p className="text-[var(--color-text-muted)] text-sm mb-1">幸运宝石</p>
                                    <p className="text-[var(--color-text-light)]">💎 {result.luckyGem}</p>
                                </div>
                                <div>
                                    <p className="text-[var(--color-text-muted)] text-sm mb-1">幸运颜色</p>
                                    <p className="text-[var(--color-text-light)]">🎨 {result.luckyColor}</p>
                                </div>
                                <div>
                                    <p className="text-[var(--color-text-muted)] text-sm mb-1">吉祥咒语</p>
                                    <p className="text-[var(--color-text-light)] text-sm">🙏 {result.mantra}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default VedicAstrology;
