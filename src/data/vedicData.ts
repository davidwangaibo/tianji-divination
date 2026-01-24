// 完整的27颗月亮星宿 (Nakshatras)
export const NAKSHATRAS = [
    { name: '阿须毗尼 (Ashwini)', deity: '双马神', nature: '快速行动', symbol: '马头', power: '快速治愈', traits: '活力充沛，行动迅速，喜欢冒险，具有开创精神', career: '适合医疗、急救、交通运输、赛马、创业等需要速度和决断力的职业，在危机处理方面表现出色', health: '需注意头部、神经系统，保持充足休息，避免过度劳累', compatibility: '与Bharani、Pushya、Hasta相配，能量互补' },
    { name: '婆罗尼 (Bharani)', deity: '阎摩', nature: '承载转化', symbol: '子宫', power: '移除清理', traits: '坚韧不拔，善于承担责任，有强大的内在力量和转化能力', career: '适合法律、殡葬、医疗、产科、心理咨询等涉及生死转化的职业，擅长处理困难局面', health: '注意生殖系统、肝脏健康，需要情绪释放渠道', compatibility: '与Rohini、Uttara Phalguni、Anuradha和谐共处' },
    { name: '羯利帝迦 (Krittika)', deity: '火神阿耆尼', nature: '切割净化', symbol: '剃刀', power: '燃烧净化', traits: '目标明确，有批判精神，追求真理，不畏权威', career: '适合教育、批评、编辑、烹饪、金属加工、军事等需要精准判断的职业', health: '需注意消化系统、眼睛，控制愤怒情绪', compatibility: '与Rohini、Uttara Phalguni、Uttara Ashadha相配' },
    { name: '卢希尼 (Rohini)', deity: '造物主', nature: '成长繁荣', symbol: '牛车', power: '生长繁殖', traits: '感性浪漫，追求美好事物，具有强大的创造力和艺术天赋', career: '适合艺术、设计、农业、园艺、时尚、美容等美学相关职业，商业头脑佳，擅长积累财富', health: '注意喉咙、颈部、糖尿病风险', compatibility: '与Mrigashira、Chitra、Shravana情投意合' },
    { name: '摩利伽尸罗 (Mrigashira)', deity: '月神', nature: '探索寻找', symbol: '鹿头', power: '给予满足', traits: '好奇心强，善于研究，追求知识，温和敏感', career: '适合研究、旅游、写作、香水、纺织、宝石等需要细腻感知的职业', health: '注意呼吸系统、过敏体质', compatibility: '与Ardra、Hasta、Abhijit相处融洽' },
    { name: '阿陀罗 (Ardra)', deity: '风暴神', nature: '暴风转变', symbol: '泪滴', power: '获得收益', traits: '情感强烈，经历起伏，具有破旧立新的能力', career: '适合科技、电子、研究、制药、气象等创新领域，危机管理能力强', health: '注意心脏、神经系统、情绪波动', compatibility: '与Punarvasu、Vishakha、Purva Bhadrapada相配' },
    { name: '补纳婆苏 (Punarvasu)', deity: '因陀罗母', nature: '回归更新', symbol: '箭筒', power: '恢复财富', traits: '乐观向上，能够复原，善良慷慨，具有哲学思维', career: '适合教育、写作、出版、咨询、建筑等需要创意和沟通的职业', health: '注意肺部、呼吸道，保持乐观心态有助健康', compatibility: '与Pushya、Anuradha、Revati形成良好关系' },
    { name: '补史耶 (Pushya)', deity: '祭主', nature: '滋养供养', symbol: '花朵', power: '创造精神能量', traits: '慷慨大方，善于照顾他人，责任感强，传统价值观', career: '适合护理、教育、慈善、宗教、农业等服务型职业，政治和管理方面也有天赋', health: '注意胃部、营养吸收，避免过度付出导致疲惫', compatibility: '与Ashlesha、Hasta、Shravana相互滋养' },
    { name: '阿舍利沙 (Ashlesha)', deity: '蛇神', nature: '缠绕深入', symbol: '盘蛇', power: '毒与医药', traits: '直觉敏锐，有神秘感，洞察力强，善于保守秘密', career: '适合心理学、侦探、医药、神秘学、策略规划等需要深度洞察的职业', health: '注意神经系统、消化问题、避免过度焦虑', compatibility: '与Jyeshtha、Revati、Bharani理解深刻' },
    { name: '摩伽 (Magha)', deity: '祖先神', nature: '王权尊贵', symbol: '王座', power: '离开身体', traits: '领导才能，重视传统，高贵气质，家族荣誉感强', career: '适合管理、政治、历史、考古、家族企业等需要权威和传承的职业', health: '注意心脏、背部、保持谦逊避免骄傲', compatibility: '与Purva Phalguni、Mula、Purva Ashadha共鸣' },
    { name: '补婆发古尼 (Purva Phalguni)', deity: '婚姻神', nature: '享乐放松', symbol: '床榻', power: '创造后代', traits: '热爱生活，享受愉悦，艺术天赋，社交能力强', career: '适合娱乐、酒店、婚庆、艺术、音乐、表演等享乐和创意相关的职业', health: '注意生殖系统、肾脏、避免过度放纵', compatibility: '与Uttara Phalguni、Swati、Uttara Bhadrapada和谐' },
    { name: '乌陀罗发古尼 (Uttara Phalguni)', deity: '太阳神', nature: '后续发展', symbol: '床脚', power: '通过契约给予繁荣', traits: '友善可靠，善于合作，正直诚实，重视承诺', career: '适合行政、法律、银行、合同管理、外交等需要信誉和责任的职业', health: '注意脊椎、消化系统、保持规律作息', compatibility: '与Hasta、Chitra、Revati建立稳固关系' },
    { name: '诃思多 (Hasta)', deity: '太阳神', nature: '手工灵巧', symbol: '手掌', power: '获得目标', traits: '心灵手巧，务实聪明，善于交易，细节完美主义', career: '适合手工艺、艺术、占星、治疗、商业、技术等需要技巧和精准的职业', health: '注意手部、肠道健康、避免过度焦虑', compatibility: '与Chitra、Swati、Shravana相互欣赏' },
    { name: '质多罗 (Chitra)', deity: '建筑神', nature: '创作建造', symbol: '珍珠', power: '积累功德', traits: '创造力强，追求完美，魅力四射，艺术品味高', career: '适合建筑、设计、时尚、摄影、珠宝、广告等美学和创意职业', health: '注意肾脏、皮肤、保持内外平衡', compatibility: '与Vishakha、Dhanishta、Purva Bhadrapada互补' },
    { name: '娑缚底 (Swati)', deity: '风神', nature: '独立自由', symbol: '嫩芽', power: '分散变化', traits: '独立自主，灵活变通，善于适应，追求自由', career: '适合贸易、外交、旅游、航空、通信等需要灵活性和独立性的职业', health: '注意呼吸系统、关节，保持适度运动', compatibility: '与Rohini、Hasta、Shatabhisha自由共处' },
    { name: '毗舍佉 (Vishakha)', deity: '因陀罗与火神', nature: '分叉目标', symbol: '拱门', power: '达成目标', traits: '雄心勃勃，意志坚定，追求成就，富有竞争力', career: '适合政治、法律、商业、销售、体育等需要竞争和目标导向的职业', health: '注意肝脏、生殖系统、控制竞争压力', compatibility: '与Anuradha、Jyeshtha、Purva Ashadha志同道合' },
    { name: '阿奴罗陀 (Anuradha)', deity: '友谊神', nature: '忠诚奉献', symbol: '莲花', power: '崇拜', traits: '忠诚可靠，深度情感，擅长组织，神秘魅力', career: '适合管理、组织、心理咨询、研究、神秘学等需要深度和忠诚的职业', health: '注意心脏、胸部、避免情绪压抑', compatibility: '与Rohini、Uttara Phalguni、Revati深度连接' },
    { name: '耆沙 (Jyeshtha)', deity: '因陀罗', nature: '最年长', symbol: '耳环', power: '崛起', traits: '权威强大，保护欲强，责任感重，有时孤独', career: '适合管理、军警、保安、行政、政府等需要权威和保护的职业', health: '注意颈部、耳朵、避免骄傲导致的孤立', compatibility: '与Ashlesha、Mula、Purva Bhadrapada理解彼此' },
    { name: '木腊 (Mula)', deity: '破坏神', nature: '根部挖掘', symbol: '树根', power: '破坏', traits: '追求真理，深入本质，破旧立新，哲学思维', career: '适合哲学、研究、医药、侦探、考古等探索本质和根源的职业', health: '注意臀部、坐骨神经、避免过度激进', compatibility: '与Ardra、Ashlesha、Purva Bhadrapada共鸣' },
    { name: '前阿沙荼 (Purva Ashadha)', deity: '水神', nature: '不可征服', symbol: '象牙', power: '激励', traits: '乐观自信，富有说服力，追求胜利，社交广泛', career: '适合演讲、销售、咨询、旅游、写作等需要影响力和乐观精神的职业', health: '注意髋部、大腿、避免过度自信', compatibility: '与Pushya、Uttara Ashadha、Purva Bhadrapada相处融洽' },
    { name: '后阿沙荼 (Uttara Ashadha)', deity: '众神', nature: '最终胜利', symbol: '象鼻', power: '永久胜利', traits: '坚定不移，正直诚实，追求卓越，责任感强', career: '适合法律、政治、管理、建筑、教育等需要持久努力和正直品格的职业', health: '注意大腿、皮肤、保持耐心避免过劳', compatibility: '与Krittika、Uttara Phalguni、Uttara Bhadrapada形成三角' },
    { name: '舍罗婆那 (Shravana)', deity: '毗湿奴', nature: '倾听学习', symbol: '耳朵', power: '连接', traits: '善于倾听，智慧博学，追求知识，沟通能力强', career: '适合教育、媒体、通信、音乐、咨询等需要倾听和传播的职业', health: '注意耳朵、淋巴系统、保持信息平衡', compatibility: '与Rohini、Hasta、Revati信息共享' },
    { name: '陀尼沙 (Dhanishta)', deity: '八位神', nature: '富裕繁荣', symbol: '鼓', power: '给予财富', traits: '富有才华，音乐天赋，慷慨大方，社交活跃', career: '适合音乐、房产、工程、管理、金融等需要节奏感和协调能力的职业', health: '注意心脏、血液循环、避免过度社交', compatibility: '与Chitra、Purva Bhadrapada、Abhijit和谐共振' },
    { name: '百善 (Shatabhisha)', deity: '伐楼那', nature: '百位医师', symbol: '空圆', power: '治愈', traits: '独立神秘，治愈能力，科学思维，追求真理', career: '适合医学、研究、科技、占星、另类治疗等需要独立思考和治愈能力的职业', health: '注意膝盖、循环系统、避免孤立', compatibility: '与Ardra、Swati、Purva Bhadrapada相互理解' },
    { name: '前婆陀罗 (Purva Bhadrapada)', deity: '火神', nature: '燃烧转化', symbol: '剑', power: '提升', traits: '激情强烈，理想主义，双重性格，灵性追求', career: '适合哲学、神秘学、慈善、殡葬、能源等涉及转化和提升的职业', health: '注意大腿、肝脏、平衡物质与精神', compatibility: '与Ardra、Mula、Uttara Bhadrapada精神共鸣' },
    { name: '后婆陀罗 (Uttara Bhadrapada)', deity: '深海之龙', nature: '深度智慧', symbol: '双面人', power: '带来雨水', traits: '深度智慧，耐心沉稳，灵性成熟，慈悲为怀', career: '适合灵性导师、冥想、写作、慈善、环保等需要深度智慧和慈悲的职业', health: '注意脚部、淋巴、保持精神与身体平衡', compatibility: '与Punarvasu、Anuradha、Revati深度理解' },
    { name: '颇湿婆底 (Revati)', deity: '财富神', nature: '富足完成', symbol: '鱼', power: '滋养', traits: '温柔仁慈，富有同情心，创造力强，旅行运佳', career: '适合艺术、旅游、慈善、航海、出版等需要想象力和慈悲心的职业', health: '注意脚踝、淋巴系统、避免过度梦幻', compatibility: '与Ashwini、Punarvasu、Uttara Bhadrapada圆满组合' },
];

// 增强的12星座 (Rashis)
export const RASHIS = [
    { 
        name: '白羊座 (Mesha)', ruler: '火星', element: '火', modality: '开创型',
        traits: '勇敢果决，充满活力，天生领袖，积极进取，独立自主',
        strengths: '开拓精神强，行动力迅速，不畏挑战，创新思维，正直坦率，充满热情和干劲',
        weaknesses: '容易冲动，缺乏耐心，有时过于自我，不够细心，难以坚持长期目标',
        career: '适合创业、军警、运动员、外科医生、消防员、竞技类职业等需要勇气和开拓精神的领域，在危机管理和快速决策方面表现卓越',
        love: '热情直接，勇于追求，喜欢主导关系，需要伴侣给予足够空间和欣赏，忠诚但需要保持新鲜感',
        wealth: '偏财运强，敢于冒险投资，但需控制冲动消费，适合短期投资和创业项目',
        health: '需注意头部、眼睛、血压问题，避免意外受伤，保持适度运动释放能量'
    },
    { 
        name: '金牛座 (Vrishabha)', ruler: '金星', element: '土', modality: '固定型',
        traits: '稳重务实，追求安全，脚踏实地，坚持不懈，享受美好',
        strengths: '耐心持久，财务头脑佳，艺术品味高，可靠值得信赖，善于积累和保护资源',
        weaknesses: '固执己见，抗拒变化，物质主义，有时懒惰，占有欲强',
        career: '适合金融、银行、艺术、音乐、美食、农业、建筑、房地产等稳定且与美学或物质相关的职业，擅长财富管理',
        love: '忠诚专一，重视稳定关系，浪漫且感官，需要安全感和物质保障，对伴侣慷慨',
        wealth: '理财能力强，善于积累财富，正财运佳，适合长期稳健投资，不动产投资有利',
        health: '注意喉咙、颈部、甲状腺问题，控制饮食避免过度享乐导致肥胖'
    },
    { 
        name: '双子座 (Mithuna)', ruler: '水星', element: '风', modality: '变动型',
        traits: '聪明灵活，善于沟通，好奇心强，多才多艺，适应力强',
        strengths: '思维敏捷，学习能力强，社交能力佳，表达清晰，信息处理快速，多元化思维',
        weaknesses: '注意力分散，缺乏专注，情绪多变，有时肤浅，难以深入',
        career: '适合媒体、新闻、教育、销售、写作、翻译、市场营销、通信技术等需要沟通和信息处理的职业',
        love: '需要精神交流，重视沟通，喜欢变化和新鲜感，害怕束缚，需要智慧型伴侣',
        wealth: '财运起伏，多元化收入来源，适合灵活投资，避免分散资源，信息型投资有优势',
        health: '注意呼吸系统、神经系统、手部，保持专注避免过度焦虑'
    },
    { 
        name: '巨蟹座 (Karka)', ruler: '月亮', element: '水', modality: '开创型',
        traits: '感性细腻，重视家庭，直觉敏锐，情感丰富，保护欲强',
        strengths: '同理心强，照顾能力佳，记忆力好，艺术感性，忠诚可靠，创造温馨环境',
        weaknesses: '情绪化，过于敏感，容易受伤，怀旧依赖，有时过度保护',
        career: '适合护理、教育、餐饮、酒店、房地产、家居设计、心理咨询等服务型和家庭相关职业',
        love: '深情专一，渴望家庭温暖，需要情感安全感，善于照顾伴侣，但需控制情绪波动',
        wealth: '理财保守，重视储蓄，房产投资运佳，家族财富增长，避免情绪化消费',
        health: '注意胃部、胸部、消化系统，情绪影响健康，需要情感支持'
    },
    { 
        name: '狮子座 (Simha)', ruler: '太阳', element: '火', modality: '固定型',
        traits: '自信慷慨，充满魅力，天生领袖，热情洋溢，追求卓越',
        strengths: '领导能力强，创造力丰富，慷慨大方，忠诚可靠，自尊心强，激励他人',
        weaknesses: '骄傲自负，需要赞美，固执己见，有时过于戏剧化，难以接受批评',
        career: '适合管理、娱乐、表演、政治、高端品牌、教育、创意总监等需要领导力和魅力的职业',
        love: '浪漫热情，喜欢被崇拜，慷慨对待伴侣，需要忠诚和欣赏，追求高品质关系',
        wealth: '财运旺盛，敢于投资，喜欢高端消费，适合娱乐业和创意产业投资',
        health: '注意心脏、背部、血液循环，保持谦逊避免压力过大'
    },
    { 
        name: '处女座 (Kanya)', ruler: '水星', element: '土', modality: '变动型',
        traits: '细心严谨，追求完美，善于分析，实用主义，服务精神',
        strengths: '分析能力强，注重细节，高效有序，健康意识强，善于改进和优化',
        weaknesses: '过度批判，完美主义，焦虑多疑，有时吝啬，难以满足',
        career: '适合医疗、分析、会计、编辑、工程、研究、质量控制、健康产业等需要精准和分析的职业',
        love: '务实理性，重视稳定，表达含蓄，通过行动表达爱，需要欣赏其付出',
        wealth: '理财谨慎，善于预算，正财运佳，适合稳健投资，避免过度节省',
        health: '注意消化系统、肠道、神经紧张，保持规律生活和放松'
    },
    { 
        name: '天秤座 (Tula)', ruler: '金星', element: '风', modality: '开创型',
        traits: '优雅和谐，善于平衡，社交能力强，追求公正，审美品味高',
        strengths: '外交手腕佳，公正客观，艺术鉴赏力强，人际关系和谐，善于协调和妥协',
        weaknesses: '犹豫不决，避免冲突，依赖他人，有时肤浅，难以做决定',
        career: '适合法律、外交、设计、公关、艺术、咨询、调解、时尚等需要平衡和美感的职业',
        love: '浪漫优雅，重视伴侣关系，需要平等和谐，追求完美爱情，但需避免过度依赖',
        wealth: '财运平稳，消费品味高，适合艺术品和奢侈品投资，合伙投资运佳',
        health: '注意肾脏、腰部、皮肤，保持内外平衡和适度运动'
    },
    { 
        name: '天蝎座 (Vrishchika)', ruler: '火星', element: '水', modality: '固定型',
        traits: '深邃神秘，意志坚强，洞察力强，情感深刻，转化能力强',
        strengths: '直觉敏锐，意志坚定，忠诚专注，研究能力强，善于发现真相和本质',
        weaknesses: '占有欲强，报复心重，嫉妒多疑，控制欲强，难以原谅',
        career: '适合侦探、心理学、研究、金融、外科、神秘学、危机管理等需要深度洞察的职业',
        love: '热情深沉，占有欲强，要求忠诚，情感强烈，需要深度连接和信任',
        wealth: '偏财运强，投资眼光独到，适合股票、基金等高风险投资，遗产运佳',
        health: '注意生殖系统、泌尿系统、情绪健康，需要释放压力'
    },
    { 
        name: '射手座 (Dhanu)', ruler: '木星', element: '火', modality: '变动型',
        traits: '乐观开朗，追求自由，哲学思维，冒险精神，追求真理',
        strengths: '视野开阔，乐观积极，诚实直率，学习能力强，富有智慧和幽默感',
        weaknesses: '过于理想化，缺乏耐心，不够细心，有时鲁莽，难以承诺',
        career: '适合教育、旅游、法律、出版、哲学、国际贸易、宗教等拓展视野的职业',
        love: '自由开放，需要空间，重视精神交流，诚实直接，追求有趣的关系',
        wealth: '财运起伏，适合国际投资和教育产业，贵人运强，避免过度乐观',
        health: '注意肝脏、大腿、坐骨神经，保持适度运动避免意外'
    },
    { 
        name: '摩羯座 (Makara)', ruler: '土星', element: '土', modality: '开创型',
        traits: '严肃务实，有责任感，有野心，自律勤奋，追求成就',
        strengths: '耐心毅力强，组织能力佳，可靠负责，长远规划能力强，越老越成功',
        weaknesses: '过于严肃，悲观保守，工作狂，情感压抑，难以放松',
        career: '适合管理、政府、建筑、科学、金融、企业高管等需要耐心和责任的职业',
        love: '务实稳重，慢热传统，重视承诺，通过实际行动表达爱，需要时间建立信任',
        wealth: '理财保守，长期积累，正财运佳，适合房地产和长期投资，晚年财富丰厚',
        health: '注意骨骼、关节、牙齿、皮肤，避免过度劳累，需要放松'
    },
    { 
        name: '水瓶座 (Kumbha)', ruler: '土星', element: '风', modality: '固定型',
        traits: '独立创新，人道精神，思维前卫，追求自由，理性客观',
        strengths: '创新能力强，思想独特，人道主义，友善平等，科技天赋，未来导向',
        weaknesses: '情感疏离，固执己见，过于理性，难以妥协，有时冷漠',
        career: '适合科技、发明、慈善、社群、航空、人工智能、改革等前瞻性和人道主义职业',
        love: '友情为先，需要自由，重视精神独立，不喜束缚，追求平等开放的关系',
        wealth: '财运独特，适合科技和创新投资，团体投资运佳，收入不规律',
        health: '注意循环系统、小腿、脚踝，保持社交平衡避免孤立'
    },
    { 
        name: '双鱼座 (Meena)', ruler: '木星', element: '水', modality: '变动型',
        traits: '敏感直觉，富有同情心，想象力丰富，灵性追求，无私奉献',
        strengths: '艺术天赋强，直觉敏锐，慈悲为怀，适应能力强，灵性智慧高',
        weaknesses: '过于理想化，容易逃避，界限模糊，优柔寡断，容易受骗',
        career: '适合艺术、音乐、电影、医疗、慈善、灵性导师、创意写作等需要想象力和慈悲的职业',
        love: '浪漫梦幻，无私付出，情感深刻，需要精神连接，但需避免过度牺牲',
        wealth: '财运神秘，偏财运有，艺术投资佳，需要专业理财建议，避免被骗',
        health: '注意足部、淋巴系统、免疫力，避免成瘾，保持精神与现实平衡'
    },
];

// 增强的9大运 (Dashas)
export const DASHAS = [
    { 
        planet: '太阳', duration: 6, symbol: '☉',
        traits: '领导力增强，自我意识觉醒，事业成就期，权威地位提升，个人意志力强化，公众形象改善，父亲相关事务凸显',
        advice: '此期间适合追求领导地位和个人成就，勇于表现自我，但需注意避免过于自我中心和骄傲自满，保持谦逊与他人合作',
        challenges: '可能面临自负、与权威冲突、孤立感，需要平衡个人野心与团队合作',
        opportunities: '获得晋升、领导机会、公众认可，事业突破，建立权威形象',
        relationships: '与父亲关系重要，可能疏远伴侣，需要平衡事业与家庭',
        spiritual: '发展自我认知，建立内在权威，学习真正的领导力'
    },
    { 
        planet: '月亮', duration: 10, symbol: '☽',
        traits: '情感丰富，家庭运势变化，直觉增强期，母亲相关事务，心灵敏感度提高，情绪波动明显，关注内心世界和家庭生活',
        advice: '关注内心世界和家庭关系，适合发展创意和滋养型事业，倾听直觉，照顾好情感需求，与母亲和女性长辈的关系重要',
        challenges: '情绪不稳定，过度敏感，依赖性增强，需要情感安全感',
        opportunities: '家庭幸福，房产收益，创意项目成功，直觉指引正确方向',
        relationships: '家庭和母亲关系核心，情感关系深化，可能结婚或生育',
        spiritual: '发展同理心，连接潜意识，学习情感智慧和滋养他人'
    },
    { 
        planet: '火星', duration: 7, symbol: '♂',
        traits: '行动力增强，竞争意识强，开拓进取期，勇气倍增，冲突增多，身体能量旺盛，适合开创新事业和面对挑战',
        advice: '适合开创新事业和迎接挑战，勇于行动，但需控制冲动和愤怒，避免争斗和意外受伤，锻炼身体释放能量',
        challenges: '冲动易怒，意外伤害，法律纠纷，与兄弟姐妹冲突',
        opportunities: '创业成功，竞技获胜，克服障碍，勇气带来突破',
        relationships: '兄弟姐妹关系活跃，可能出现竞争或冲突，需要控制脾气',
        spiritual: '学习控制欲望，转化愤怒为勇气，发展意志力'
    },
    { 
        planet: '罗睺', duration: 18, symbol: '☊',
        traits: '人生转折，物质欲望增强，外在机遇期，非传统经历，突然变化，异国缘分，技术和创新领域发展，可能有意外之财',
        advice: '会有意想不到的机遇和变化，保持开放心态，但需谨防欺骗和诱惑，保持清醒头脑，避免沉迷物质追求',
        challenges: '迷惑困扰，上瘾倾向，非法诱惑，社会规则冲突',
        opportunities: '外国机遇，技术突破，非传统成功，物质财富增长',
        relationships: '非传统关系，异国恋情，需要警惕欺骗和幻觉',
        spiritual: '面对幻象，学习辨别真假，超越物质欲望，发现更高真理'
    },
    { 
        planet: '木星', duration: 16, symbol: '♃',
        traits: '智慧增长，贵人相助，精神成长期，学习运旺，道德提升，财富增长，子女运佳，宗教哲学兴趣增强，最吉祥的大运之一',
        advice: '最有利于学习、教育和精神成长，贵人运旺盛，适合深造、传道授业，慷慨助人会带来更多福报，子女教育重要',
        challenges: '过度乐观，铺张浪费，理想主义，需要务实平衡',
        opportunities: '高等教育，精神导师出现，财富增长，子女带来喜悦',
        relationships: '与导师、长辈关系和谐，子女运佳，婚姻美满',
        spiritual: '最佳灵性成长期，学习智慧，发展慈悲心，传播知识'
    },
    { 
        planet: '土星', duration: 19, symbol: '♄',
        traits: '责任加重，磨炼成长，业力清算期，延迟和限制，耐心考验，长期规划，脚踏实地，虽艰辛但有长远回报的时期',
        advice: '需要脚踏实地付出努力，承担责任，虽然辛苦但会有长远回报，耐心坚持，学习自律，避免走捷径，此期积累的基础最为牢固',
        challenges: '延迟挫折，孤独感，健康问题，责任压力，可能经历失去',
        opportunities: '建立稳固基础，长期成就，获得智慧，业力清理',
        relationships: '可能面临分离，与长辈和下属关系重要，需要承担家庭责任',
        spiritual: '学习耐心，接受业力，发展自律，理解生命的深度意义'
    },
    { 
        planet: '水星', duration: 17, symbol: '☿',
        traits: '沟通能力强，学习运旺，商业机遇期，智力活跃，信息处理快速，写作表达能力提升，适合商业贸易和教育发展',
        advice: '适合学习新技能、发展商业，沟通表达能力增强，网络和信息技术发展良机，多元化发展，但避免分散精力',
        challenges: '分散注意力，神经紧张，信息过载，肤浅倾向',
        opportunities: '商业成功，学习新技能，写作出版，网络机遇',
        relationships: '兄弟姐妹关系活跃，朋友圈扩大，沟通改善关系',
        spiritual: '发展智慧，学习辨别，提升沟通技巧，连接知识与灵性'
    },
    { 
        planet: '计都', duration: 7, symbol: '☋',
        traits: '灵性觉醒，内省反思，放下执念期，过去业力清理，神秘体验，精神追求增强，物质欲望减少，适合修行和内在成长',
        advice: '适合灵修和内在成长，放下物质执念，关注精神层面，可能经历失去以获得更高领悟，冥想和瑜伽练习有益',
        challenges: '困惑迷茫，逃避现实，孤立感，可能经历损失',
        opportunities: '灵性开悟，神秘知识，解脱束缚，内在平和',
        relationships: '可能疏远物质关系，精神导师出现，需要独处时间',
        spiritual: '最佳解脱期，超越物质，觉醒真我，发展超然智慧'
    },
    { 
        planet: '金星', duration: 20, symbol: '♀',
        traits: '爱情美满，艺术才能开花，享乐舒适期，财富增长，美学品味提升，社交活跃，婚姻幸福，创意项目成功，最长也是最愉悦的大运',
        advice: '感情运势好转，适合发展艺术才能，享受生活美好，生活品质提升，投资艺术和美容产业，但避免过度放纵',
        challenges: '过度享乐，奢侈浪费，情感纠葛，物质主义',
        opportunities: '婚姻幸福，艺术成功，财富增长，美好享受',
        relationships: '婚姻和爱情最佳期，配偶运佳，女性贵人相助',
        spiritual: '学习欣赏美，发展爱的能力，平衡享受与节制，奉献之爱'
    },
];
