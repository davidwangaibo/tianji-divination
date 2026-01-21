import { useState } from 'react';
import { Link } from 'react-router-dom';

const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const ZODIAC_ANIMALS = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
const FIVE_ELEMENTS = ['木', '火', '土', '金', '水'];

const STEM_ELEMENTS: { [key: string]: { element: string; yin: boolean } } = {
    '甲': { element: '木', yin: false }, '乙': { element: '木', yin: true },
    '丙': { element: '火', yin: false }, '丁': { element: '火', yin: true },
    '戊': { element: '土', yin: false }, '己': { element: '土', yin: true },
    '庚': { element: '金', yin: false }, '辛': { element: '金', yin: true },
    '壬': { element: '水', yin: false }, '癸': { element: '水', yin: true },
};

const PERSONALITY_TRAITS: { [key: string]: string } = {
    '甲': '如参天大树，正直刚毅，领导力强，但有时过于固执。宜培养柔和，刚柔并济。',
    '乙': '如花草藤蔓，柔韧灵活，适应力强，善于交际。宜增强主见，不随波逐流。',
    '丙': '如烈日当空，热情开朗，光明磊落，有号召力。宜收敛锋芒，避免过于张扬。',
    '丁': '如烛火星光，细腻温和，思维敏捷，有洞察力。宜增强信心，勇于展现自我。',
    '戊': '如高山厚土，稳重可靠，包容大度，有担当。宜增加灵活，避免过于保守。',
    '己': '如田园沃土，勤劳踏实，心思细腻，善于滋养。宜拓宽视野，不拘泥于小节。',
    '庚': '如刀剑金石，刚毅果决，重情重义，有魄力。宜修身养性，避免过于刚烈。',
    '辛': '如珠宝美玉，追求完美，品味高雅，有艺术天赋。宜务实进取，不陷于空想。',
    '壬': '如大江大海，胸怀宽广，智慧深邃，适应力强。宜专注目标，避免随波逐流。',
    '癸': '如雨露清泉，温润细腻，直觉敏锐，善于洞察。宜增强行动力，不耽于空想。',
};

const CAREER_ADVICE: { [key: string]: string } = {
    '木': '适合教育、文化、医疗、出版、设计等行业。创业有成，宜从事需要创意和成长性的工作。2026年事业有上升趋势，贵人运佳。',
    '火': '适合娱乐、传媒、科技、餐饮、能源等行业。有领导才能，宜从事需要热情和表现力的工作。2026年宜积极进取，有升职机会。',
    '土': '适合房地产、建筑、农业、矿业、金融等行业。稳健务实，宜从事需要耐心和稳定的工作。2026年宜守成积累，厚积薄发。',
    '金': '适合金融、法律、军警、机械、科技等行业。有魄力决断，宜从事需要精准和专业的工作。2026年有突破机会，需把握时机。',
    '水': '适合物流、贸易、旅游、咨询、IT等行业。善于变通，宜从事需要沟通和流动性的工作。2026年贵人相助，宜拓展人脉。',
};

const WEALTH_ADVICE: { [key: string]: string } = {
    '木': '财运稳步上升，正财为主，偏财运一般。宜长期投资，不宜投机。今年适合学习理财知识，为财富增长打基础。',
    '火': '财运有起伏，来财快去财也快。宜控制冲动消费，做好理财规划。今年下半年财运好于上半年。',
    '土': '财运稳健，积少成多。宜投资不动产或稳健型理财。今年财务压力减轻，有望实现积蓄目标。',
    '金': '财运较好，有意外收入可能。宜把握投资机会，但需控制风险。今年适合开源节流，财富有增长。',
    '水': '财运流动性强，收入渠道多元。宜灵活理财，分散投资。今年人脉带财，社交带来商机。',
};

const LOVE_ADVICE: { [key: string]: string } = {
    '木': '感情真挚专一，重视精神交流。单身者今年有望遇到志同道合的对象。有伴者感情稳定深化，可考虑进一步承诺。',
    '火': '感情热烈奔放，容易一见钟情。单身者桃花运旺，需慎选对象。有伴者需保持新鲜感，避免过于强势。',
    '土': '感情踏实稳定，注重家庭责任。单身者宜通过长辈介绍认识对象。有伴者今年适合考虑婚嫁或生育。',
    '金': '感情理性克制，标准较高。单身者需放下成见，给他人机会。有伴者宜多表达情感，避免过于冷淡。',
    '水': '感情细腻浪漫，善于体贴对方。单身者异性缘佳，需辨别真心。有伴者感情细水长流，默契加深。',
};

const HEALTH_ADVICE: { [key: string]: string } = {
    '木': '肝胆系统需注意保养，避免熬夜和过度饮酒。宜多做户外运动，如登山、慢跑。春季注意预防过敏。',
    '火': '心血管和眼睛需要关注，控制情绪起伏。宜做舒缓运动，如瑜伽、太极。夏季注意防暑降温。',
    '土': '脾胃消化系统需注意，饮食宜清淡规律。宜适度运动，避免久坐。换季时节注意调理肠胃。',
    '金': '呼吸系统和皮肤需注意保养，远离烟尘污染。宜做有氧运动，如游泳、骑行。秋季注意润肺。',
    '水': '肾脏和泌尿系统需关注，注意补水和休息。宜做水上运动或冥想调息。冬季注意保暖防寒。',
};

const BaziAnalysis = () => {
    const [birthDate, setBirthDate] = useState('');
    const [birthTime, setBirthTime] = useState('');
    const [gender, setGender] = useState('male');
    const [result, setResult] = useState<any>(null);

    const calculateBazi = () => {
        if (!birthDate) return;
        const date = new Date(birthDate);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = birthTime ? parseInt(birthTime.split(':')[0]) : 12;

        const yearStem = HEAVENLY_STEMS[(year - 4) % 10];
        const yearBranch = EARTHLY_BRANCHES[(year - 4) % 12];
        const zodiac = ZODIAC_ANIMALS[(year - 4) % 12];
        const monthStem = HEAVENLY_STEMS[(month + (year % 5) * 2 + 1) % 10];
        const monthBranch = EARTHLY_BRANCHES[(month + 1) % 12];
        const dayStem = HEAVENLY_STEMS[(day + month * 2 + year) % 10];
        const dayBranch = EARTHLY_BRANCHES[(day + year) % 12];
        const hourBranch = EARTHLY_BRANCHES[Math.floor((hour + 1) / 2) % 12];
        const hourStem = HEAVENLY_STEMS[(day % 5 * 2 + Math.floor((hour + 1) / 2)) % 10];


        const dayMasterInfo = STEM_ELEMENTS[dayStem];
        const dayMasterElement = dayMasterInfo.element;


        // 计算五行强弱
        const allStems = [yearStem, monthStem, dayStem, hourStem];
        const elementCounts: { [key: string]: number } = { '木': 0, '火': 0, '土': 0, '金': 0, '水': 0 };
        allStems.forEach(stem => {
            const el = STEM_ELEMENTS[stem].element;
            elementCounts[el]++;
        });
        const strongElement = Object.entries(elementCounts).sort((a, b) => b[1] - a[1])[0][0];
        const weakElement = Object.entries(elementCounts).sort((a, b) => a[1] - b[1])[0][0];


        setResult({
            year: `${yearStem}${yearBranch}`,
            month: `${monthStem}${monthBranch}`,
            day: `${dayStem}${dayBranch}`,
            hour: `${hourStem}${hourBranch}`,
            zodiac,
            dayMaster: dayStem,
            dayMasterElement,
            isYin: dayMasterInfo.yin,
            elementCounts,
            strongElement,
            weakElement,
            analysis: {
                personality: PERSONALITY_TRAITS[dayStem],
                career: CAREER_ADVICE[dayMasterElement],
                wealth: WEALTH_ADVICE[dayMasterElement],
                love: LOVE_ADVICE[dayMasterElement],
                health: HEALTH_ADVICE[dayMasterElement],
            },
            luckyElements: getLuckyElements(dayMasterElement, elementCounts),
        });
    };


    const getLuckyElements = (dayElement: string => {
        const elements = ['木', '火', '土', '金', '水'];
        const dayIndex = elements.indexOf(dayElement);
        // 喜用神简化计算
        const producingElement = elements[(dayIndex + 4) % 5]; // 生我者
        const producedElement = elements[(dayIndex + 1) % 5]; // 我生者
        return { lucky: producingElement, helpful: producedElement };
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
                <h2 className="golden-title text-4xl text-center mb-6">八字详批</h2>
                <p className="text-center text-[var(--color-text-muted)] mb-8">输入您的出生信息，解析您的四柱八字命理。</p>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className="block text-[var(--color-text-muted)] text-sm mb-2">出生日期</label>
                        <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-dark)] border border-[var(--color-card-border)] text-[var(--color-text-light)] focus:border-[var(--color-primary)] focus:outline-none transition-colors" />
                    </div>
                    <div>
                        <label className="block text-[var(--color-text-muted)] text-sm mb-2">出生时辰 (可选)</label>
                        <input type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-dark)] border border-[var(--color-card-border)] text-[var(--color-text-light)] focus:border-[var(--color-primary)] focus:outline-none transition-colors" />
                    </div>
                    <div>
                        <label className="block text-[var(--color-text-muted)] text-sm mb-2">性别</label>
                        <select value={gender} onChange={(e) => setGender(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-dark)] border border-[var(--color-card-border)] text-[var(--color-text-light)] focus:border-[var(--color-primary)] focus:outline-none transition-colors">
                            <option value="male">男</option>
                            <option value="female">女</option>
                        </select>
                    </div>
