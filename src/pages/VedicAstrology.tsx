import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NAKSHATRAS, RASHIS, DASHAS } from '../data/vedicData';

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

        // 修正：使用全部27颗星宿
        const nakshatraIndex = (day * 3 + month * 2 + hour) % 27;
        const rashiIndex = month % 12;
        const dashaIndex = (year + month + day) % 9;
        const nakshatra = NAKSHATRAS[nakshatraIndex];
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
            yearForecast: generateYearForecast(rashiIndex, dashaIndex, nakshatraIndex),
            // 组合分析
            combinedAnalysis: `您的${nakshatra.name}月亮星宿结合${rashi.name}，展现出${nakshatra.nature}与${rashi.traits}的特质。当前${currentDasha.planet}大运期间，${currentDasha.traits}建议您${nakshatra.career}同时${rashi.career}`,
        });
    };

    const generateYearForecast = (rashiIdx: number, dashaIdx: number, nakshatraIdx: number) => {
        const careerForecasts = [
            '2026年事业运势上升，有升职加薪的机会。上半年需要努力耕耘，下半年收获颇丰，可能有海外发展机会或重要项目负责权。',
            '2026年事业稳定发展，宜巩固现有成果。第二季度有贵人相助，可获得重要项目。建议提升专业技能，为下一步突破做准备。',
            '2026年事业有变动的可能，但变中有机。春季是关键转折点，保持灵活，适应新环境将带来意想不到的好运。',
            '2026年适合创业或开展新项目，创新思维带来机遇。但需注意团队建设，单打独斗容易遇阻，合作共赢是关键。',
            '2026年事业进入稳定增长期，付出会得到回报。下半年有晋升或转换行业的机会，慎重评估后勇敢尝试。',
            '2026年工作压力较大但成就感强，适合承担重要责任。第三季度是关键期，坚持原则会赢得尊重和信任。',
        ];

        const wealthForecasts = [
            '2026年财运亨通，正财偏财俱佳。适合稳健投资，房产相关投资有利可图。3-6月是最佳投资时机，把握机会。',
            '2026年财运平稳上升，收入增长稳定。下半年有意外之财，但需控制冲动消费。建议建立储蓄计划，为长远打算。',
            '2026年财运起伏，需谨慎理财。避免高风险投资，积累优先。上半年开源，下半年节流，财务状况趋于稳定。',
            '2026年偏财运佳，投资眼光独到。股票基金类投资可适度尝试，但切忌贪心。9-12月财运最旺，把握时机。',
            '2026年正财稳定，工资性收入有保障。适合长期理财规划，教育投资和技能提升会带来长远回报。',
            '2026年财富积累缓慢但扎实，避免被快速致富诱惑。房产和养老储蓄是重点，下半年财运逐渐改善。',
        ];

        const loveForecasts = [
            '2026年感情运势佳，单身者有望在春夏之交邂逅真爱，可能通过朋友介绍或社交活动。有伴者感情升温，可考虑进入婚姻殿堂。',
            '2026年感情稳定，需要用心经营。多创造浪漫时刻和共同回忆，感情会更加甜蜜。已婚者可能迎来新生命，家庭幸福美满。',
            '2026年感情有考验，但也是成长的机会。坦诚沟通，共同面对挑战，感情会更加深厚。单身者不急于求成，缘分在秋季。',
            '2026年桃花运旺盛，单身者选择众多，但需看清真心。有伴者需防第三者干扰，忠诚和信任最重要。',
            '2026年感情以和为贵，避免争执。多关注伴侣感受，理解和包容是关键。单身者可能在工作场合遇到心仪对象。',
            '2026年感情需要更多时间陪伴，工作繁忙不应成为冷落伴侣的借口。夏季适合求婚或度蜜月，增进感情。',
        ];

        // 基于三者组合生成个性化预测
        const seed = (rashiIdx * 3 + dashaIdx * 7 + nakshatraIdx * 2) % 6;

        return {
            career: careerForecasts[seed],
            wealth: wealthForecasts[(seed + 2) % 6],
            love: loveForecasts[(seed + 4) % 6],
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
                                <p className="text-[var(--color-text-muted)] text-sm mt-1">守护神: {result.nakshatra.deity} | 象征: {result.nakshatra.symbol}</p>
                                <p className="text-[var(--color-text-muted)] text-sm">特质: {result.nakshatra.traits}</p>
                                <p className="text-[var(--color-text-muted)] text-sm mt-2">特殊能力: {result.nakshatra.power}</p>
                            </div>
                            <div className="p-4 rounded-lg" style={{ background: 'rgba(212, 168, 83, 0.1)', border: '1px solid var(--color-card-border)' }}>
                                <h4 className="text-[var(--color-primary)] font-semibold mb-2">♈ 月亮星座 (Rashi)</h4>
                                <p className="text-[var(--color-text-light)] text-lg">{result.rashi.name}</p>
                                <p className="text-[var(--color-text-muted)] text-sm mt-1">守护星: {result.rashi.ruler} | 元素: {result.rashi.element} | 类型: {result.rashi.modality}</p>
                                <p className="text-[var(--color-text-muted)] text-sm">特质: {result.rashi.traits}</p>
                            </div>
                        </div>

                        {/* 组合分析部分 */}
                        <div className="p-4 rounded-lg" style={{ background: 'rgba(100, 180, 150, 0.1)', border: '1px solid rgba(100, 180, 150, 0.4)' }}>
                            <h4 className="text-green-300 font-semibold mb-2">🔮 综合分析 (Combined Analysis)</h4>
                            <p className="text-[var(--color-text-light)] text-sm leading-relaxed">{result.combinedAnalysis}</p>
                        </div>

                        {/* 详细特征展开部分 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                                <h4 className="text-[var(--color-primary)] font-semibold mb-2">💪 星座优势</h4>
                                <p className="text-[var(--color-text-light)] text-sm">{result.rashi.strengths}</p>
                                <h4 className="text-[var(--color-primary)] font-semibold mb-2 mt-3">⚠️ 需要注意</h4>
                                <p className="text-[var(--color-text-light)] text-sm">{result.rashi.weaknesses}</p>
                            </div>
                            <div className="p-4 rounded-lg" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                                <h4 className="text-[var(--color-primary)] font-semibold mb-2">💼 星宿职业指引</h4>
                                <p className="text-[var(--color-text-light)] text-sm">{result.nakshatra.career}</p>
                                <h4 className="text-[var(--color-primary)] font-semibold mb-2 mt-3">🏥 健康提示</h4>
                                <p className="text-[var(--color-text-light)] text-sm">{result.nakshatra.health}</p>
                            </div>
                        </div>

                        <div className="p-5 rounded-lg" style={{ background: 'rgba(150, 100, 180, 0.15)', border: '1px solid rgba(150, 100, 180, 0.4)' }}>
                            <h4 className="text-purple-300 font-semibold mb-2">⏰ 当前大运 (Mahadasha): {result.currentDasha.symbol} {result.currentDasha.planet}大运</h4>
                            <p className="text-[var(--color-text-muted)] text-sm">运行周期: {result.dashaStartYear} - {result.dashaEndYear} ({result.currentDasha.duration}年)</p>
                            <p className="text-[var(--color-text-light)] mt-2 text-sm"><strong>特质：</strong>{result.currentDasha.traits}</p>
                            <p className="text-[var(--color-text-light)] text-sm mt-2 italic">💡 <strong>建议：</strong>"{result.currentDasha.advice}"</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                                <div>
                                    <p className="text-yellow-300 text-xs font-semibold mb-1">⚡ 机遇</p>
                                    <p className="text-[var(--color-text-light)] text-xs">{result.currentDasha.opportunities}</p>
                                </div>
                                <div>
                                    <p className="text-orange-300 text-xs font-semibold mb-1">⚠️ 挑战</p>
                                    <p className="text-[var(--color-text-light)] text-xs">{result.currentDasha.challenges}</p>
                                </div>
                            </div>
                            <p className="text-[var(--color-text-muted)] text-xs mt-3"><strong>关系影响：</strong>{result.currentDasha.relationships}</p>
                            <p className="text-purple-200 text-xs mt-2"><strong>🕉️ 灵性指引：</strong>{result.currentDasha.spiritual}</p>
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                                <h4 className="text-[var(--color-primary)] font-semibold mb-2">💼 职业指引综合</h4>
                                <p className="text-[var(--color-text-muted)] text-xs mb-2">根据星宿：</p>
                                <p className="text-[var(--color-text-light)] text-sm">{result.nakshatra.career}</p>
                                <p className="text-[var(--color-text-muted)] text-xs mb-2 mt-3">根据星座：</p>
                                <p className="text-[var(--color-text-light)] text-sm">{result.rashi.career}</p>
                            </div>
                            <div className="p-4 rounded-lg" style={{ background: 'rgba(100, 130, 180, 0.1)' }}>
                                <h4 className="text-[var(--color-primary)] font-semibold mb-2">💑 感情与财运</h4>
                                <p className="text-[var(--color-text-muted)] text-xs mb-1">感情模式：</p>
                                <p className="text-[var(--color-text-light)] text-sm mb-3">{result.rashi.love}</p>
                                <p className="text-[var(--color-text-muted)] text-xs mb-1">财运倾向：</p>
                                <p className="text-[var(--color-text-light)] text-sm">{result.rashi.wealth}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default VedicAstrology;
