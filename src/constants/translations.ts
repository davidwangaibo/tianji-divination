
export const TRANSLATIONS = {
    zh: {
        title: '天机占卜',
        subtitle: '易经 • 八字 • 塔罗 • 灵签 • 印度占星',
        nav: {
            coin: '易经',
            time: '梅花',
            bazi: '八字',
            tarot: '塔罗',
            guanyin: '灵签',
            vedic: '印度占星'
        },
        methods: {
            coin: {
                title: '铜钱起卦',
                desc: '手掷三枚铜钱，捕捉细微灵机。适合具体运势判断。'
            },
            time: {
                title: '梅花易数',
                desc: '取此刻天地之数，洞察先机。适合突发事件决策。'
            },
            bazi: {
                title: '八字详批',
                desc: '输入生辰八字，推演一生命运、事业财运与流年。'
            },
            guanyin: {
                title: '观音灵签',
                desc: '诚心摇动签筒，求得菩萨指引，指点迷津。'
            },
            tarot: {
                title: '塔罗占卜',
                desc: '西方神秘学智慧，通过牌阵解析潜意识与未来趋势。'
            },
            vedic: {
                title: '印度占星',
                desc: 'Vedic Astrology (Jyotish)，基于恒星黄道排盘，精准预测大运与宿命。'
            }
        },
        actions: {
            back: '返回选择',
            currentMode: '当前模式',
            home: '返回主页',
            reset: '重新占卜',
            reinput: '重新输入',
            submit: '开始占卜',
            analyzing: '正在沟通天机...',
            analyzingTarot: '正在沟通潜意识...',
        },
        input: {
            questionLabel: '您想问什么？',
            questionLabelSpecific: '您最想了解哪方面？(可选)',
            questionPlaceholder: '请具体描述您的困惑...',
            questionPlaceholderTarot: '请集中精神，描述您想询问的关于感情、事业或生活的具体困惑...',
            questionPlaceholderBazi: '如需了解特定年份或事件（如：2026年运势、婚姻、转行），请在此备注...',
        },
        results: {
            guaTitle: '卦象全貌',
            lotTitle: '灵签已出',
            tarotTitle: '圣三角牌阵',
            baziTitle: '命主信息',
            vedicTitle: '星盘信息',
            aiTitle: '大师批语',
            open: '查看详解',
            aiGenerated: 'AI 生成'
        },
        birthInput: {
            titleBazi: '输入生辰八字',
            titleVedic: '输入吠陀星盘信息',
            descBazi: '请输入您的公历（阳历）出生信息，AI将为您排盘推演。',
            descVedic: '请输入出生信息，AI将根据恒星黄道（Sidereal Zodiac）为您排盘。',
            date: '出生日期 (公历)',
            time: '出生时间',
            location: '出生城市',
            locationPlaceholder: '例如：中国北京市、上海市、London UK',
            gender: '性别',
            male: '男',
            female: '女',
            startBazi: '开始批命',
            startVedic: '开启星盘 (Jyotish)',
            timeHint: '准确的时间对于确定时柱/上升星座至关重要。',
            locationHint: '* 印度占星必须提供地点以计算星盘。'
        }
    },
    en: {
        title: 'Celestial Divination',
        subtitle: 'I Ching • Bazi • Tarot • Oracle • Vedic Astrology',
        nav: {
            coin: 'I Ching',
            time: 'Plum Blossom',
            bazi: 'Bazi',
            tarot: 'Tarot',
            guanyin: 'Oracle',
            vedic: 'Vedic'
        },
        methods: {
            coin: {
                title: 'Coin Divination',
                desc: 'Toss three coins to capture the subtle changes of the universe. Best for specific questions.'
            },
            time: {
                title: 'Plum Blossom',
                desc: 'Derive hexagrams from the current space-time numerology. Best for sudden events.'
            },
            bazi: {
                title: 'Bazi Destiny',
                desc: 'Analyze your Four Pillars of Destiny for life path, career, wealth, and yearly fortunes.'
            },
            guanyin: {
                title: 'Guan Yin Oracle',
                desc: 'Shake the spiritual cylinder to seek guidance and wisdom from the Bodhisattva.'
            },
            tarot: {
                title: 'Tarot Reading',
                desc: 'Western mysticism wisdom to reveal subconscious thoughts and future trends.'
            },
            vedic: {
                title: 'Vedic Astrology',
                desc: 'Jyotish based on Sidereal Zodiac for precise prediction of major life cycles and karma.'
            }
        },
        actions: {
            back: 'Back',
            currentMode: 'Current Mode',
            home: 'Home',
            reset: 'Restart',
            reinput: 'Re-enter',
            submit: 'Consult',
            analyzing: 'Consulting the Oracle...',
            analyzingTarot: 'Connecting to Subconscious...',
        },
        input: {
            questionLabel: 'What is your question?',
            questionLabelSpecific: 'Specific focus? (Optional)',
            questionPlaceholder: 'Describe your confusion in detail...',
            questionPlaceholderTarot: 'Focus your mind and describe your question about love, career, or life...',
            questionPlaceholderBazi: 'E.g., Fortune for 2026, Marriage, Career Change...',
        },
        results: {
            guaTitle: 'Hexagram',
            lotTitle: 'Lot Drawn',
            tarotTitle: 'Card Spread',
            baziTitle: 'Birth Details',
            vedicTitle: 'Chart Details',
            aiTitle: 'Interpretation',
            open: 'Read Interpretation',
            aiGenerated: 'AI Generated'
        },
        birthInput: {
            titleBazi: 'Enter Birth Details',
            titleVedic: 'Enter Vedic Details',
            descBazi: 'Enter your Gregorian birth date for Bazi analysis.',
            descVedic: 'Enter details for Sidereal Zodiac (Nirayana) calculation.',
            date: 'Date of Birth',
            time: 'Time of Birth',
            location: 'City of Birth',
            locationPlaceholder: 'e.g., Beijing, New York, London',
            gender: 'Gender',
            male: 'Male',
            female: 'Female',
            startBazi: 'Analyze Destiny',
            startVedic: 'Generate Chart',
            timeHint: 'Accurate time is crucial for Ascendant calculation.',
            locationHint: '* Location is required for Vedic Astrology chart calculation.'
        }
    }
};

export type Language = 'zh' | 'en';
