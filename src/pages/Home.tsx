import FeatureCard from '../components/FeatureCard';

// Icons as SVG components
const SunIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
);

const MoonIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
);

const CalendarIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

const ScrollIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="16" y2="17" />
    </svg>
);

const StarIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

const SparkleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3v18M3 12h18M5.64 5.64l12.72 12.72M18.36 5.64L5.64 18.36" />
    </svg>
);

const features = [
    {
        title: '铜钱起卦',
        description: '手摇三枚铜钱，捕捉细微灵机，适合具体运势判断。',
        icon: <SunIcon />,
        path: '/coin',
    },
    {
        title: '梅花易数',
        description: '取此刻天地之数，洞察先机，适合突发事件决策。',
        icon: <MoonIcon />,
        path: '/plum',
    },
    {
        title: '八字详批',
        description: '输入生辰八字，推演一生命运，事业财运与婚缘。',
        icon: <CalendarIcon />,
        path: '/bazi',
    },
    {
        title: '观音灵签',
        description: '诚心摇动签筒，寻得菩萨指引，指点迷津。',
        icon: <ScrollIcon />,
        path: '/guanyin',
    },
    {
        title: '塔罗占卜',
        description: '西方神秘学智慧，面对抉择解析潜意识与未来趋势。',
        icon: <StarIcon />,
        path: '/tarot',
    },
    {
        title: '印度占星',
        description: 'Vedic Astrology (Jyotish)，基于印度宫殿盘体系，精准预测大运与佛劫。',
        icon: <SparkleIcon />,
        path: '/vedic',
    },
];

const Home = () => {
    return (
        <main className="relative z-10 px-4 py-8 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature) => (
                    <FeatureCard
                        key={feature.title}
                        title={feature.title}
                        description={feature.description}
                        icon={feature.icon}
                        path={feature.path}
                    />
                ))}
            </div>
        </main>
    );
};

export default Home;
