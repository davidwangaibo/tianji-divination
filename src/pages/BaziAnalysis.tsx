import { useState } from 'react';
import { Link } from 'react-router-dom';

const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const ZODIAC_ANIMALS = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];

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

        // Simplified Bazi calculation (for demo purposes)
        const yearStem = HEAVENLY_STEMS[(year - 4) % 10];
        const yearBranch = EARTHLY_BRANCHES[(year - 4) % 12];
        const zodiac = ZODIAC_ANIMALS[(year - 4) % 12];

        const monthStem = HEAVENLY_STEMS[(month + (year % 5) * 2 + 1) % 10];
        const monthBranch = EARTHLY_BRANCHES[(month + 1) % 12];

        const dayStem = HEAVENLY_STEMS[(day + month * 2 + year) % 10];
        const dayBranch = EARTHLY_BRANCHES[(day + year) % 12];

        const hourBranch = EARTHLY_BRANCHES[Math.floor((hour + 1) / 2) % 12];
        const hourStem = HEAVENLY_STEMS[(day % 5 * 2 + Math.floor((hour + 1) / 2)) % 10];

        setResult({
            year: `${yearStem}${yearBranch}`,
            month: `${monthStem}${monthBranch}`,
            day: `${dayStem}${dayBranch}`,
            hour: `${hourStem}${hourBranch}`,
            zodiac,
            dayMaster: dayStem,
            analysis: {
                personality: `日主${dayStem}，为人${['刚正', '柔和', '热情', '稳重', '聪慧'][day % 5]}。`,
                career: `事业方面宜${['创业', '从政', '经商', '文艺', '技术'][month % 5]}。`,
                wealth: `财运${['旺盛', '平稳', '起伏', '渐进', '有贵人相助'][year % 5]}。`,
                love: `感情${['专一', '浪漫', '务实', '热烈', '平淡'][hour % 5]}。`,
            }
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
                <h2 className="golden-title text-4xl text-center mb-6">八字详批</h2>
                <p className="text-center text-[var(--color-text-muted)] mb-8">
                    输入您的出生信息，解析您的四柱八字命理。
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                        <label className="block text-[var(--color-text-muted)] text-sm mb-2">出生时辰 (可选)</label>
                        <input
                            type="time"
                            value={birthTime}
                            onChange={(e) => setBirthTime(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-dark)] border border-[var(--color-card-border)] text-[var(--color-text-light)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-[var(--color-text-muted)] text-sm mb-2">性别</label>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-dark)] border border-[var(--color-card-border)] text-[var(--color-text-light)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                        >
                            <option value="male">男</option>
                            <option value="female">女</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={calculateBazi}
                        disabled={!birthDate}
                        className="px-8 py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
                        style={{
                            background: 'linear-gradient(135deg, #d4a853, #c49843)',
                            color: '#0a1628',
                        }}
                    >
                        排盘分析
                    </button>
                </div>

                {result && (
                    <div className="mt-8">
                        {/* Four Pillars Display */}
                        <div className="grid grid-cols-4 gap-4 mb-8">
                            {[
                                { label: '年柱', value: result.year },
                                { label: '月柱', value: result.month },
                                { label: '日柱', value: result.day },
                                { label: '时柱', value: result.hour },
                            ].map((pillar) => (
                                <div key={pillar.label} className="text-center p-4 rounded-lg" style={{ background: 'rgba(212, 168, 83, 0.1)', border: '1px solid var(--color-card-border)' }}>
                                    <p className="text-[var(--color-text-muted)] text-sm mb-2">{pillar.label}</p>
                                    <p className="text-2xl text-[var(--color-primary)]">{pillar.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mb-6">
                            <span className="px-4 py-2 rounded-full text-sm" style={{ background: 'rgba(212, 168, 83, 0.2)', color: 'var(--color-primary)' }}>
                                生肖: {result.zodiac} | 日主: {result.dayMaster}
                            </span>
                        </div>

                        {/* Analysis */}
                        <div className="p-6 rounded-lg" style={{ background: 'rgba(212, 168, 83, 0.1)', border: '1px solid var(--color-primary)' }}>
                            <h3 className="text-[var(--color-primary)] text-xl mb-4 text-center">命理分析</h3>
                            <div className="space-y-3">
                                {Object.entries(result.analysis).map(([key, value]) => (
                                    <p key={key} className="text-[var(--color-text-light)]">
                                        <span className="text-[var(--color-primary)]">
                                            {key === 'personality' ? '💫 性格' : key === 'career' ? '💼 事业' : key === 'wealth' ? '💰 财运' : '❤️ 感情'}：
                                        </span>
                                        {value as string}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default BaziAnalysis;
