import { useState } from 'react';
import { Link } from 'react-router-dom';

const NAKSHATRAS = [
    { name: '阿须毗尼 (Ashwini)', deity: '双马神', nature: '快速行动', traits: '活力充沛，行动迅速，喜欢冒险' },
    { name: '婆罗尼 (Bharani)', deity: '阎摩', nature: '承载转化', traits: '坚韧不拔，善于承担责任' },
    { name: '羯利帝迦 (Krittika)', deity: '火神阿耆尼', nature: '切割净化', traits: '目标明确，有批判精神' },
    { name: '卢希尼 (Rohini)', deity: '造物主', nature: '成长繁荣', traits: '感性浪漫，追求美好事物' },
    { name: '摩利伽尸罗 (Mrigashira)', deity: '月神', nature: '探索寻找', traits: '好奇心强，善于研究' },
    { name: '阿陀罗 (Ardra)', deity: '风暴神', nature: '暴风转变', traits: '情感强烈，经历起伏' },
    { name: '补纳婆苏 (Punarvasu)', deity: '因陀罗母', nature: '回归更新', traits: '乐观向上，能够复原' },
    { name: '补史耶 (Pushya)', deity: '祭主', nature: '滋养供养', traits: '慷慨大方，善于照顾他人' },
    { name: '阿舍利沙 (Ashlesha)', deity: '蛇神', nature: '缠绕深入', traits: '直觉敏锐，有神秘感' },
    { name: '摩伽 (Magha)', deity: '祖先神', nature: '王权尊贵', traits: '领导才能，重视传统' },
    { name: '补婆发古尼 (P.Phalguni)', deity: '婚姻神', nature: '享乐放松', traits: '热爱生活，享受愉悦' },
    { name: '乌陀罗发古尼 (U.Phalguni)', deity: '太阳神', nature: '后续发展', traits: '友善可靠，善于合作' },
];

const RASHIS = [
    { name: '白羊座 (Mesha)', ruler: '火星', element: '火', traits: '勇敢果决，领导力强', career: '适合创业、军警、运动员等需要开拓精神的职业' },
    { name: '金牛座 (Vrishabha)', ruler: '金星', element: '土', traits: '稳重务实，追求安全', career: '适合金融、艺术、农业、建筑等稳定职业' },
    { name: '双子座 (Mithuna)', ruler: '水星', element: '风', traits: '聪明灵活，善于沟通', career: '适合媒体、教育、销售、写作等需要沟通的职业' },
    { name: '巨蟹座 (Karka)', ruler: '月亮', element: '水', traits: '感性细腻，重视家庭', career: '适合护理、餐饮、房产、教育等服务型职业' },
    { name: '狮子座 (Simha)', ruler: '太阳', element: '火', traits: '自信慷慨，有魅力', career: '适合管理、表演、政治、奢侈品等领导型职业' },
    { name: '处女座 (Kanya)', ruler: '水星', element: '土', traits: '细心严谨，追求完美', career: '适合医疗、分析、工程、研究等精细工作' },
    { name: '天秤座 (Tula)', ruler: '金星', element: '风', traits: '优雅和谐，善于平衡', career: '适合法律、外交、设计、公关等需要协调的职业' },
    { name: '天蝎座 (Vrishchika)', ruler: '火星', element: '水', traits: '深邃神秘，意志坚强', career: '适合侦查、心理、研究、金融等需要洞察力的职业' },
    { name: '射手座 (Dhanu)', ruler: '木星', element: '火', traits: '乐观开朗，追求自由', career: '适合教育、旅游、法律、出版等拓展视野的职业' },
    { name: '摩羯座 (Makara)', ruler: '土星', element: '土', traits: '严肃务实，有责任感', career: '适合管理、政府、建筑、科学等需要耐心的职业' },
    { name: '水瓶座 (Kumbha)', ruler: '土星', element: '风', traits: '独立创新，有人道精神', career: '适合科技、慈善、社群、发明等前瞻性职业' },
    { name: '双鱼座 (Meena)', ruler: '木星', element: '水', traits: '敏感直觉，富有同情心', career: '适合艺术、灵性、医疗、创意等需要想象力的职业' },
];

const DASHAS = [
    { planet: '太阳', duration: 6, traits: '领导力增强，自我意识觉醒，事业成就期', advice: '此期间适合追求领导地位和个人成就，但需注意避免过于自我中心。' },
    { planet: '月亮', duration: 10, traits: '情感丰富，家庭运势变化，直觉增强期', advice: '关注内心世界和家庭关系，适合发展创意和滋养型事业。' },
    { planet: '火星', duration: 7, traits: '行动力增强，竞争意识强，开拓进取期', advice: '适合开创新事业，但需控制冲动，避免争斗和意外。' },
    { planet: '罗睺', duration: 18, traits: '人生转折，物质欲望，外在机遇期', advice: '会有意想不到的机遇，但需谨防欺骗和诱惑，保持清醒头脑。' },
    { planet: '木星', duration: 16, traits: '智慧增长，贵人相助，精神成长期', advice: '最有利于学习、教育和精神成长，贵人运旺盛。' },
    { planet: '土星', duration: 19, traits: '责任加重，磨炼成长，业力清算期', advice: '需要脚踏实地付出努力，虽然辛苦但会有长远回报。' },
    { planet: '水星', duration: 17, traits: '沟通能力强，学习运旺，商业机遇期', advice: '适合学习新技能、发展商业，沟通表达能力增强。' },
    { planet: '计都', duration: 7, traits: '灵性觉醒，内省反思，放下执念期', advice: '适合灵修和内在成长，需要放下物质执念。' },
    { planet: '金星', duration: 20, traits: '爱情美满，艺术才能，享乐舒适期', advice: '感情运势好转，适合发展艺术才能，生活品质提升。' },
];

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

        const nakshatraIndex = (day + month * 2 + hour) % 27;
        const rashiIndex = month % 12;
        const dashaIndex = (year + month) % 9;
        const nakshatra = NAKSHATRAS[nakshatraIndex % 12];
        const rashi = RASHIS[rashiIndex];
        const currentDasha = DASHAS[dashaIndex];

        // 计算当前大运年份范围
        const dashaStartYear = year + (2026 - year) % currentDasha.duration;
        const dashaEndYear = dashaStartYear + currentDasha.duration;

        setResult({
            nakshatra,
            rashi,
            currentDasha,
            dashaStartYear,
            dashaEndYear,
            luckyGem: ['红宝石', '珍珠', '红珊瑚', '金琥珀', '黄宝石', '蓝宝石', '祖母绿', '猫眼石', '钻石'][dashaIndex],
            luckyColor: ['红色', '白色/银色', '红色/橙色', '烟灰色', '黄色', '深蓝/黑', '绿色', '灰褐色', '粉色/白色'][dashaIndex],
            luckyDay: ['周日', '周一', '周二', '周六', '周四', '周六', '周三', '周二', '周五'][dashaIndex],
            mantra: [
                'Om Suryaya Namaha (敬礼太阳神)',
                'Om Chandraya Namaha (敬礼月亮神)',
                'Om Mangalaya Namaha (敬礼火星神)',
                'Om Rahave Namaha (敬礼罗睺神)',
                'Om Gurave Namaha (敬礼木星神)',
                'Om Shanaye Namaha (敬礼土星神)',
                'Om Budhaya Namaha (敬礼水星神)',
                'Om Ketave Namaha (敬礼计都神)',
                'Om Shukraya Namaha (敬礼金星神)',
            ][dashaIndex],
            yearForecast: generateYearForecast(rashiIndex, dashaIndex),
        });
    };

    const generateYearForecast = (rashiIdx: number, dashaIdx: number) => {
        const forecasts = {
            career: [
                '2026年事业运势上升，有升职加薪的机会。下半年尤其顺利，可能有海外发展机会。',
                '2026年事业稳定发展，宜巩固现有成果。第二季度有贵人相助，可获得重要项目。',
                '2026年事业有变动的可能，但变中有机。保持灵活，适应新环境将带来好运。',
            ],
            wealth: [
                '2026年财运亨通，正财偏财俱佳。适合稳健投资，房产相关投资有利可图。',
                '2026年财运平稳，收入增长稳定。下半年有意外之财，但需控制冲动消费。',
                '2026年财运起伏，需谨慎理财。避免高风险投资，积累第一优先。',
            ],
            love: [
                '2026年感情运势佳，单身者有望邂逅真爱。有伴者感情升温，可考虑进入新阶段。',
                '2026年感情稳定，需要用心经营。多创造浪漫时刻，感情会更加甜蜜。',
                '2026年感情有考验，但也是成长的机会。坦诚沟通，共同面对挑战。',
            ],
        };
        return {
            career: forecasts.career[(rashiIdx + dashaIdx) % 3],
            wealth: forecasts.wealth[(rashiIdx + dashaIdx + 1) % 3],
            love: forecasts.love[(rashiIdx + dashaIdx + 2) % 3],
        };
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
                <p className="text-center text-[var(--color-text-muted)] mb-8">基于吠陀占星体系，探索您的月亮星宿与行星大运。</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-[var(--color-text-muted)] text-sm mb-2">出生日期</label>
                        <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-dark)] border border-[var(--color-card-border)] text-[var(--color-text-light)] focus:border-[var(--color-primary)] focus:outline-none transition-colors" />
                    </div>
                    <div>
                        <label className="block text-[var(--color-text-muted)] text-sm mb-2">出生时间 (可选)</label>
                        <input type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-dark)] border border-[var(--color-card-border)] text-[var(--color-text-light)] focus:border-[var(--color-primary)] focus:outline-none transition-colors" />
                    </div>
                </div>

                <div className="flex justify-center">
                    <button onClick={calculate} disabled={!birthDate}
                        className="px-8 py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
                        style={{ background: 'linear-gradient(135deg, #d4a853, #c49843)', color: '#0a1628' }}>
                        计算命盘
                    </button>
                </div>

                {result && (
                    <div className="mt-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg" style={{ background: 'rgba(212, 168, 83, 0.1)', border: '1px solid var(--color-card-border)' }}>
                                <h4 className="text-[var(--color-primary)] font-semibold mb-2">🌙 月亮星宿 (Nakshatra)</h4>
                                <p className="text-[var(--color-text-light)] text-lg">{result.nakshatra.name}</p>
                                <p className="text-[var(--color-text-muted)] text-sm mt-1">守护神: {result.nakshatra.deity}</p>
                                <p className="text-[var(--color-text-muted)] text-sm">特质: {result.nakshatra.traits}</p>
                            </div>
                            <div className="p-4 rounded-lg" style={{ background: 'rgba(212, 168, 83, 0.1)', border: '1px solid var(--color-card-border)' }}>
                                <h4 className="text-[var(--color-primary)] font-semibold mb-2">♈ 月亮星座 (Rashi)</h4>
                                <p className="text-[var(--color-text-light)] text-lg">{result.rashi.name}</p>
                                <p className="text-[var(--color-text-muted)] text-sm mt-1">守护星: {result.rashi.ruler} | 元素: {result.rashi.element}</p>
                                <p className="text-[var(--color-text-muted)] text-sm">特质: {result.rashi.traits}</p>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg" style={{ background: 'rgba(150, 100, 180, 0.15)', border: '1px solid rgba(150, 100, 180, 0.4)' }}>
                            <h4 className="text-purple-300 font-semibold mb-2">⏰ 当前大运 (Mahadasha): {result.currentDasha.planet}大运</h4>
                            <p className="text-[var(--color-text-muted)] text-sm">运行周期: {result.dashaStartYear} - {result.dashaEndYear} ({result.currentDasha.duration}年)</p>
                            <p className="text-[var(--color-text-light)] mt-2">{result.currentDasha.traits}</p>
                            <p className="text-[var(--color-text-light)] text-sm mt-2 italic">"{result.currentDasha.advice}"</p>
                        </div>

                        <div className="p-4 rounded-lg" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                            <h4 className="text-[var(--color-primary)] font-semibold mb-3">📅 2026年运势预测</h4>
                            <div className="space-y-3">
                                <p className="text-[var(--color-text-light)] text-sm"><span className="text-[var(--color-primary)]">💼 事业:</span> {result.yearForecast.career}</p>
                                <p className="text-[var(--color-text-light)] text-sm"><span className="text-[var(--color-primary)]">💰 财运:</span> {result.yearForecast.wealth}</p>
                                <p className="text-[var(--color-text-light)] text-sm"><span className="text-[var(--color-primary)]">❤️ 感情:</span> {result.yearForecast.love}</p>
                            </div>
                        </div>

                        <div className="p-6 rounded-lg" style={{ background: 'rgba(212, 168, 83, 0.1)', border: '1px solid var(--color-primary)' }}>
                            <h4 className="text-[var(--color-primary)] font-semibold mb-4 text-center">✨ 开运建议</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                <div><p className="text-[var(--color-text-muted)] text-xs mb-1">幸运宝石</p><p className="text-[var(--color-text-light)]">💎 {result.luckyGem}</p></div>
                                <div><p className="text-[var(--color-text-muted)] text-xs mb-1">幸运颜色</p><p className="text-[var(--color-text-light)]">🎨 {result.luckyColor}</p></div>
                                <div><p className="text-[var(--color-text-muted)] text-xs mb-1">幸运日</p><p className="text-[var(--color-text-light)]">📆 {result.luckyDay}</p></div>
                                <div><p className="text-[var(--color-text-muted)] text-xs mb-1">吉祥咒语</p><p className="text-[var(--color-text-light)] text-xs">🙏 {result.mantra}</p></div>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                            <h4 className="text-[var(--color-primary)] font-semibold mb-2">💼 适合职业</h4>
                            <p className="text-[var(--color-text-light)] text-sm">{result.rashi.career}</p>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default VedicAstrology;
