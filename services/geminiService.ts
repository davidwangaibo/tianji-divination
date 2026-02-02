import { HexagramData, TarotCard, BirthData, Language } from "../types";
import { getHexagramInfo, getTransformedHexagram, hasMovingLines, toChineseNum } from "../utils/iching";

// ========================================
// Cloudflare Worker 代理配置
// API Keys 现在完全隐藏在后端!
// ========================================
// Vercel Proxy URL (Fallback if no key)
const PROXY_URL = "https://tianji-divination-ektf.vercel.app/api/proxy";
const HARDCODED_MODEL = "gemini-2.5-flash";

// Helper: Call Gemini Directly
const callGeminiDirect = async (prompt: string, model: string, apiKey: string): Promise<string> => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API Error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
    return data.candidates[0].content.parts[0].text;
  }
  throw new Error('Invalid response format from Gemini API');
};

// Main Call Function
const callGeminiViaProxy = async (prompt: string, model: string = HARDCODED_MODEL): Promise<string> => {
  // 1. Try Direct Call if API Key is available (Preferred for GitHub Pages demo)
  const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY;

  console.log("Tianji Debug: Checking API Key availability...", apiKey ? "Key Found" : "Key Missing");

  if (apiKey) {
    try {
      console.log("Tianji Debug: Attempting Direct API Call...");
      return await callGeminiDirect(prompt, model, apiKey);
    } catch (error: any) {
      console.warn("Direct API call failed, trying proxy...", error);
      // Fallthrough to proxy
    }
  } else {
    console.warn("Tianji Debug: No API Key found in environment variables.");
  }

  // 2. Fallback to Proxy
  try {
    const response = await fetch(PROXY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        model,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      // Check if it's the HTML 404/405 error from Vercel platform
      if (errorText.trim().startsWith('<')) {
        throw new Error(`Proxy unreachable (Status ${response.status}) at ${PROXY_URL}. The backend may be down or misconfigured (returning HTML instead of JSON).`);
      }
      console.error('Proxy error:', errorText);
      throw new Error(`Proxy returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }

    throw new Error('Invalid response format from Gemini API');
  } catch (error: any) {
    console.error('Failed to call Gemini via proxy:', error);
    throw error;
  }
};

export const interpretHexagram = async (
  hexagram: HexagramData,
  question: string,
  lang: Language = 'zh'
): Promise<string> => {
  try {
    // Basic Info
    const originalInfo = getHexagramInfo(hexagram.lines);
    const transformedLines = getTransformedHexagram(hexagram.lines);
    const transformedInfo = getHexagramInfo(transformedLines);
    const isMoving = hasMovingLines(hexagram.lines);

    // Identify moving lines indices (1-based)
    const movingLinesIndices = hexagram.lines
      .map((val, idx) => (val === 6 || val === 9 ? idx + 1 : null))
      .filter(val => val !== null);

    const methodText = hexagram.method === 'coin' ?
      (lang === 'zh' ? '铜钱起卦 (六爻)' : 'Coin Toss (Six Lines)') :
      (lang === 'zh' ? '梅花易数 (时间起卦)' : 'Plum Blossom (Time Based)');

    let prompt = '';

    if (lang === 'zh') {
      prompt = `
      你是一位精通《易经》、《梅花易数》及古法命理的国学大师。请针对用户的问题进行深度、详尽的推演。
      
      【求测背景】
      起卦方式: ${methodText}
      求测事项: "${question}"
      
      【卦象结构】
      1. **本卦 (当前)**: ${originalInfo.fullName} (上${originalInfo.upper.nature}下${originalInfo.lower.nature})
         - 构成: 上卦【${originalInfo.upper.name}】(${originalInfo.upper.nature}/${originalInfo.upper.element})，下卦【${originalInfo.lower.name}】(${originalInfo.lower.nature}/${originalInfo.lower.element})
      
      2. **动爻**: ${movingLinesIndices.length > 0 ? movingLinesIndices.join('、') + ' 爻动' : '无动爻 (静卦)'}
      
      3. **之卦 (结果)**: ${isMoving ? `${transformedInfo.fullName} (上${transformedInfo.upper.nature}下${transformedInfo.lower.nature})` : '同本卦'}

      【解卦要求】
      请以 Markdown 格式输出，语气需庄重、典雅且充满智慧（字数要求 600 字以上）。请严格包含以下章节：

      ### 1. 卦象宏观阐述 (The Big Picture)
      *   **卦名深度解析**: 解释“${originalInfo.fullName}”的字源含义。为什么古人将上${originalInfo.upper.nature}下${originalInfo.lower.nature}结合称为“${originalInfo.fullName}”？
      *   **大象传解析**: 引用《象传》原文（如：天行健...），并翻译为现代哲理，说明此卦所蕴含的人生智慧和修身之道。
      *   **卦气与时机**: 结合五行生克，简述当前卦象的能量是旺盛还是衰弱。

      ### 2. 梅花易数体用分析 (Technical Analysis)
      *   **体用判定**: 明确指出哪个是体卦（代表自己），哪个是用卦（代表事情/环境）。
      *   **五行生克**: 详细分析体用之间的五行生克关系（例如：金克木、火生土等）。
      *   **吉凶定性**: 根据生克关系，直接断定事情的基础吉凶（如：用生体为大吉，体克用为小吉，用克体为凶等）。

      ### 3. 爻辞与变卦详解 (The Details)
      *   **核心爻辞**: ${isMoving ? `重点引用并解析 **动爻** 的爻辞。动爻是事情变化的枢纽，请详细说明其代表的具体变动方向。` : `此为静卦，请重点解析 **卦辞** 及整体卦义，说明在不变中如何求变。`}
      *   **之卦启示**: 如果有变卦，请解释变卦代表的最终结局或趋势。从本卦到之卦，展示了事物怎样的演变过程？

      ### 4. 天机详批 (Specific Answers)
      针对弟子所求 "${question}"，进行全方位剖析：
      *   **现状困境**: 像讲故事一样描述用户目前可能遇到的具体阻碍或环境。
      *   **未来推演**: 预测事情在短期（一周/一月）和长期（半年/一年）的发展曲线。
      *   **成败关键**: 决定这件事情成败的唯一核心因素是什么？

      ### 5. 大师锦囊 (Actionable Advice)
      *   **决策建议**: 给出 3 条极其具体的行动指南（例如：宜静不宜动、寻找属木的贵人、往南方发展等）。
      *   **开运指引**: 建议的有利时间、方位、颜色或心态调整方向。

      语气要求：引经据典，字字珠玑，既有古大师的风骨，又有对求测者的关怀。
    `;
    } else {
      prompt = `
      You are a wise Master of I Ching (Book of Changes) and Plum Blossom Numerology. Please provide a deep and detailed interpretation for the user's question in English.

      [Context]
      Method: ${methodText}
      Question: "${question}"
      
      [Hexagram Structure]
      1. **Present Hexagram**: ${originalInfo.fullName} (Upper: ${originalInfo.upper.nature}, Lower: ${originalInfo.lower.nature})
         - Composition: Upper Trigram [${originalInfo.upper.name}] (${originalInfo.upper.nature}/${originalInfo.upper.element}), Lower Trigram [${originalInfo.lower.name}] (${originalInfo.lower.nature}/${originalInfo.lower.element})
      
      2. **Moving Lines**: ${movingLinesIndices.length > 0 ? 'Line(s) ' + movingLinesIndices.join(', ') + ' moving' : 'No moving lines (Static)'}
      
      3. **Future Hexagram**: ${isMoving ? `${transformedInfo.fullName} (Upper: ${transformedInfo.upper.nature}, Lower: ${transformedInfo.lower.nature})` : 'Same as Present'}

      [Requirements]
      Output in Markdown format. Tone should be wise, elegant, and ancient yet accessible. Please strictly follow these sections:

      ### 1. The Big Picture (Macro Analysis)
      *   **Name Analysis**: Explain the deep meaning of "${originalInfo.fullName}". Why did the ancients call the combination of Upper ${originalInfo.upper.nature} and Lower ${originalInfo.lower.nature} this name?
      *   **The Image (Xiang Zhuan)**: Quote the philosophy behind this hexagram (e.g., "The movement of heaven is full of power..."), explaining the life wisdom it holds.
      *   **Timing & Energy**: Briefly describe if the current energy is rising or declining based on the interaction of the elements.

      ### 2. Technical Analysis (Plum Blossom)
      *   **Subject & Object (Ti/Yong)**: Identify which trigram represents the Self (Ti) and which represents the Environment/Matter (Yong).
      *   **Elemental Interaction**: Analyze the relationship between the Subject and Object elements (e.g., Fire generates Earth, Metal clashes with Wood).
      *   **Auspicousness**: Based on the interaction, is this fundamentally Lucky (Object generates Self) or Unlucky (Object controls Self)?

      ### 3. detailed Interpretation
      *   **Key Line Text**: ${isMoving ? `Analyze the **Moving Line(s)** specifically. The moving line is the pivot of change.` : `This is a Static Hexagram. Analyze the main **Hexagram Judgement** and how to find change within stability.`}
      *   **Trend**: Explain the evolution from the Present Hexagram to the Future Hexagram. What story does this transformation tell?

      ### 4. Direct Answer to "${question}"
      *   **Current Situation**: Describe the user's current predicament or environment like a storyteller.
      *   **Prediction**: Forecast the development curve for the short term and long term.
      *   **Key Factor**: What is the single most critical factor determining success or failure here?

      ### 5. Master's Advice
      *   **Actionable Steps**: Give 3 very specific actionable recommendations (e.g., "Wait and do not move", "Seek help from a person associated with Water", "Go South").
      *   **Luck Enhancement**: Suggest favorable timing, direction, colors, or mindset adjustments.

      Tone: Mystical, profound, empathetic, and wise.
    `;
    }

    return await callGeminiViaProxy(prompt);
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return lang === 'zh' ? `连接错误: ${error.message}` : `Connection Error: ${error.message}`;
  }
};

export const interpretGuanYin = async (
  lotNumber: number,
  question: string,
  lang: Language = 'zh'
): Promise<string> => {
  const lotStr = toChineseNum(lotNumber);
  let prompt = '';

  if (lang === 'zh') {
    prompt = `
      你是一位慈悲为怀、通晓佛法与历史典故的观音灵签解签大师。用户求得了观音灵签 **第 ${lotStr} 签**。
      
      用户祈求的事项是: "${question}"

      请你检索第 ${lotNumber} 签的完整内容（包括签诗、典故、宫位、吉凶），并进行深度、详细的解签。

      请严格按照以下 Markdown 格式输出，内容需详尽、典雅、充满智慧（字数要求 500 字以上）：

      ### 1. 灵签总纲
      *   **签号**: 第 ${lotStr} 签
      *   **吉凶等级**: （例如：上上大吉、中平、下下等）
      *   **所属宫位**: （例如：子宫、丑宫等）
      *   **典故名称**: **（必须准确，例如：姜太公钓鱼、桃园结义）**

      ### 2. 典故深度还原 (The Story)
      > 请像一位说书人一样，生动地讲述此签对应的历史典故。
      *   **历史故事**: 详细描述典故中的人物背景、发生的冲突、采取的行动以及最终的结局。
      *   **寓意投射**: 这个历史故事隐喻了什么道理？故事中的主角对应现实中的用户，说明用户目前处于故事中的哪个阶段（是落难期、等待期还是收获期）？

      ### 3. 签诗字句精解 (Poetry Analysis)
      *   **诗曰**: (此处请默写该签的四句七言诗)
      *   **逐句白话解**: 请对每一句诗进行详细的现代白话翻译。
      *   **关键意象**: 挑选诗中 1-2 个核心意象（如“月”、“松”、“舟”、“镜”）进行深度符号学解读，说明其象征意义。

      ### 4. 仙机全方位预示 (Predictions)
      请列出此签在各方面的传统预示，并附带简要说明：
      *   **家宅/自身**: 
      *   **求财/交易**: 
      *   **婚姻/六甲**: 
      *   **疾病/寻人**: 
      *   **诉讼/移徙**: 

      ### 5. 菩萨指点迷津 (Direct Guidance)
      针对弟子所求之事 "${question}"，结合典故与签诗：
      *   **直指人心**: 一针见血地指出用户当前的困惑根源或执念所在。
      *   **局势断语**: 明确告知事情的走向（吉/凶/平），是应该积极进取还是韬光养晦？
      *   **修行建议**: 给用户一条充满智慧的建议（如行善、布施、改过、忍耐），帮助其化解烦恼，增进福报。

      语气要求：慈悲、温和、解释要详尽，不要敷衍。如菩萨低语，抚慰人心。
    `;
  } else {
    prompt = `
      You are a compassionate Master of the Guan Yin Oracle, well-versed in Buddhism and Chinese historical legends.
      The user has drawn Guan Yin Lot **#${lotNumber}**.
      
      User's Prayer/Question: "${question}"

      Please retrieve the full content of Lot #${lotNumber} (including the poem, the historical legend, and the auspice level) and provide a deep, detailed interpretation in English.

      Please strictly follow this Markdown format (500+ words):

      ### 1. Oracle Overview
      *   **Lot Number**: #${lotNumber}
      *   **Fortune Level**: (e.g., Upper-Upper (Best), Middle-Level, Lower-Lower (Worst))
      *   **Palace**: (e.g., Zi Palace, Chou Palace)
      *   **Historical Legend**: **(Must be accurate, e.g., Jiang Ziya Fishing, Oath of the Peach Garden)**

      ### 2. The Legend (Storytelling)
      > Tell the story of the legend associated with this lot like a storyteller.
      *   **The Story**: Detail the characters, conflict, action, and outcome of the historical event.
      *   **Metaphor**: What is the moral? If the user is the protagonist, what stage are they in (Suffering, Waiting, or Harvesting)?

      ### 3. Poem Analysis
      *   **The Poem**: (Quote the 4-line Chinese poem if possible, or its English translation)
      *   **Meaning**: Explain the meaning of the poem line by line in plain English.
      *   **Key Symbols**: Analyze 1-2 key symbols (e.g., "Moon", "Boat", "Mirror") and their spiritual meaning.

      ### 4. Predictions
      List traditional predictions for these categories:
      *   **Home/Self**: 
      *   **Wealth/Trading**: 
      *   **Marriage/Pregnancy**: 
      *   **Health/Missing Persons**: 
      *   **Lawsuits/Moving**: 

      ### 5. Bodhisattva's Guidance
      For the user's question "${question}":
      *   **The Core Issue**: Pinpoint the root cause of the user's confusion or attachment.
      *   **The Verdict**: Clearly state the direction (Good/Bad/Neutral). Should they advance or retreat?
      *   **Wisdom**: Offer specific advice (e.g., perform charity, be patient, change attitude) to resolve the karma.

      Tone: Compassionate, gentle, soothing, and detailed. Like a Bodhisattva whispering wisdom.
    `;
  }

  try {
    return await callGeminiViaProxy(prompt);
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return lang === 'zh' ? `连接错误: ${error.message}` : `Connection Error: ${error.message}`;
  }
};

export const interpretTarot = async (
  cards: TarotCard[],
  question: string,
  lang: Language = 'zh'
): Promise<string> => {
  const cardDescriptions = cards.map(c =>
    `${c.position === 'past' ? (lang === 'zh' ? '过去' : 'Past') : c.position === 'present' ? (lang === 'zh' ? '现在' : 'Present') : (lang === 'zh' ? '未来' : 'Future')}: 【${c.name} (${c.nameEn})】 - ${c.isReversed ? (lang === 'zh' ? '逆位' : 'Reversed') : (lang === 'zh' ? '正位' : 'Upright')}`
  ).join('\n');

  let prompt = '';

  if (lang === 'zh') {
    prompt = `
      你是一位拥有神秘力量、精通西方神秘学、卡巴拉生命之树以及心理学的资深塔罗占卜师。
      
      【求测者问题】: "${question}"
      
      【牌阵信息 - 圣三角牌阵 (Time Spread)】:
      ${cardDescriptions}

      请基于韦特塔罗体系（Rider-Waite Tarot），为求测者提供一份极度详细、富有洞察力的解读报告。请使用 Markdown 格式，语气神秘、优雅且具有疗愈感（字数要求 800 字以上）。

      ### 1. 牌阵能量总览 (Energy Overview)
      *   **核心元素**: 分析这三张牌中元素的分布（火/水/风/土）。是缺乏行动力（火）？还是情感泛滥（水）？
      *   **整体基调**: 从宏观角度看，这组牌是积极的、充满挑战的还是停滞的？

      ### 2. 单牌深度解码 (Deep Dive)
      请对每一张牌进行极度详细的剖析：
      
      #### ✦ 过去：${cards[0].name} (${cards[0].isReversed ? '逆位' : '正位'})
      *   **画面隐喻**: 描述牌面上的关键图案、颜色或人物动作，并解释其在神秘学上的象征意义。
      *   **逆位含义**: (如果是逆位) 解释能量是如何被阻滞、内化或过度表达的。
      *   **对当下的影响**: 过去的这个因素是如何导致了现在的局面？

      #### ✦ 现在：${cards[1].name} (${cards[1].isReversed ? '逆位' : '正位'})
      *   **画面隐喻**: 深度解析牌面意象。
      *   **心理状态**: 这张牌揭示了求测者内心深处怎样的恐惧、欲望或态度？
      *   **环境因素**: 外部环境正在发生什么？

      #### ✦ 未来：${cards[2].name} (${cards[2].isReversed ? '逆位' : '正位'})
      *   **画面隐喻**: 深度解析牌面意象。
      *   **趋势预测**: 如果保持现在的状态，事情自然会发展成什么样？
      *   **变数**: 这张牌是否暗示了某种不可控的外力？

      ### 3. 时空流变分析 (Synthesis)
      *   **因果链条**: 把三张牌连成一个完整的故事。从过去的起因，到现在的发酵，再到未来的结果，逻辑链条是如何闭环的？
      *   **矛盾与冲突**: 牌与牌之间是否存在冲突？（例如：过去的热情 vs 未来的死寂），这说明了什么？

      ### 4. 命运的神谕 (The Oracle)
      *   **直觉答案**: 针对 "${question}"，给出一个明确的倾向性回答（Yes/No/Maybe）。
      *   **行动指引**: 给出 2-3 条切实可行的建议。不只是心理鸡汤，而是具体的行动方案（例如：如果你抽到了宝剑牌，建议多沟通或理智分析）。
      *   **灵性彩蛋**: 送给求测者一句充满力量的短句或箴言。

      语气要求：神秘、深邃、像一位老朋友在烛光下低语。
    `;
  } else {
    prompt = `
      You are a Mystical Tarot Reader, expert in Western Occultism, Qabalah, and Jungian Psychology.
      
      [Querent's Question]: "${question}"
      
      [Spread - Time Spread]:
      ${cardDescriptions}

      Based on the Rider-Waite Tarot system, provide a highly detailed and insightful reading in English. Use Markdown. Tone: Mystical, elegant, healing (800+ words).

      ### 1. Energy Overview
      *   **Elemental Balance**: Analyze the distribution of elements (Fire/Water/Air/Earth). Is there a lack of action (Fire) or overwhelming emotion (Water)?
      *   **Overall Tone**: Is this spread positive, challenging, or stagnant?

      ### 2. Deep Dive (Card by Card)
      Analyze each card in depth:
      
      #### ✦ Past: ${cards[0].nameEn} (${cards[0].isReversed ? 'Reversed' : 'Upright'})
      *   **Imagery**: Describe key symbols, colors, or actions on the card and their occult meaning.
      *   **Meaning**: How has this past influence shaped the current situation?
      *   **Reversal**: (If reversed) How was this energy blocked or internalized?

      #### ✦ Present: ${cards[1].nameEn} (${cards[1].isReversed ? 'Reversed' : 'Upright'})
      *   **Imagery**: Decode the symbolism.
      *   **Psychology**: What fears, desires, or attitudes does this reveal?
      *   **Environment**: What is happening in the external world?

      #### ✦ Future: ${cards[2].nameEn} (${cards[2].isReversed ? 'Reversed' : 'Upright'})
      *   **Imagery**: Decode the symbolism.
      *   **Trend**: If things continue as they are, where is this leading?
      *   **Variables**: Does this card suggest uncontrollable external forces?

      ### 3. Synthesis
      *   **The Story**: Connect the three cards into a cohesive narrative. From Root cause -> Current ferment -> Future outcome.
      *   **Contradictions**: Are there conflicts (e.g., Passionate Past vs. Dead Future)? What does it mean?

      ### 4. The Oracle's Verdict
      *   **Direct Answer**: Yes/No/Maybe regarding "${question}".
      *   **Actionable Advice**: 2-3 concrete steps. Not just "be happy", but specific advice based on the suit (e.g., Swords = communicates/analyze).
      *   **Spiritual Message**: A powerful quote or affirmation for the user.

      Tone: Mystical, deep, like an old friend whispering by candlelight.
    `;
  }

  try {
    return await callGeminiViaProxy(prompt);
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return lang === 'zh' ? `连接错误: ${error.message}` : `Connection Error: ${error.message}`;
  }
};

export const interpretBazi = async (
  birthData: BirthData,
  question: string,
  lang: Language = 'zh'
): Promise<string> => {
  const genderStr = birthData.gender === 'male' ? (lang === 'zh' ? '男 (乾造)' : 'Male') : (lang === 'zh' ? '女 (坤造)' : 'Female');
  const locationStr = birthData.location ? (lang === 'zh' ? `出生地点: ${birthData.location}` : `Birth Location: ${birthData.location}`) : '';

  let prompt = '';

  if (lang === 'zh') {
    prompt = `
      你是一位殿堂级的八字命理宗师，精通子平八字、三命通会、滴天髓及盲派命理。
      
      【命主信息】
      *   **出生公历**: ${birthData.date} ${birthData.time}
      *   **性别**: ${genderStr}
      *   ${locationStr}
      *   **推演起点**: 2026年 (丙午年)
      *   **用户核心诉求**: "请详批从 2026 年开始的未来 20 年 (2026-2045) 运程，越详细越好。"
      *   **具体关注**: "${question || '事业、财运、健康、家庭综合运势'}"

      【重要指令】:
      1.  请务必根据公历出生日期，准确反推**真太阳时**下的农历日期及二十四节气，以确定精准的月柱。
      2.  分析必须具有极强的时间跨度感，涵盖 **2026-2045** 这二十年。

      请以 Markdown 格式输出一份**两万字级别深度**的批命报告（实际输出字数 1500 字以上），拒绝泛泛而谈，必须有具体的断语：

      ### 1. 乾坤造化 (Precise Charting)
      *   **八字排盘**: 列出四柱干支及纳音。
      *   **格局与用神**: 明确指出格局成败、身强身弱、最喜用的五行及最忌讳的五行。

      ### 2. 性情与天赋 (Character & Potential)
      *   简述命主的核心性格优势与劣势，以及最适合发展的行业赛道。

      ### 3. 未来二十年大运总纲 (2026-2045 Overview)
      *   这20年跨越了哪几步大运？（例如：202x年换运）。
      *   总体定调：这是命主人生中“积蓄力量”的阶段，还是“大展宏图”的黄金期？

      ### 4. 第一个十年详批 (2026-2035)
      *   **大运分析**: 这十年行什么运？（如：甲寅大运，枭神夺食还是伤官生财？）
      *   **重点流年断语**:
          *   **2026 (丙午年)**: 【开局之年】本命年/冲太岁/合太岁？吉凶如何？事业财运有何变动？
          *   **2027 (丁未年)**: 具体的运势起伏。
          *   **2028-2030 (猴/鸡/狗年)**: 金水/火土流年对命局的影响。
          *   **2031-2035**: 这几年的整体趋势及需要抓住的一个关键机会。

      ### 5. 第二个十年详批 (2036-2045)
      *   **大运更替**: 是否换运？新大运带来的环境变化（如：从拼搏转向守成，或从动荡转向安稳）。
      *   **关键节点**:
          *   指出这十年中运势最旺的 2 年。
          *   指出这十年中必须防守、避免投资的 1 年。
      *   **六亲与健康**: 这十年需注意父母健康或自身哪些隐疾爆发？

      ### 6. 帝师改运锦囊 (Ultimate Advice)
      *   **终极建议**: 针对未来 20 年的规划，给出 3 条战略性的人生建议。
      *   **风水补救**: 适合发展的方位、佩戴饰品、吉祥数字。

      语气要求：字字珠玑，推演严密，既有宏观的大运视野，又有微观的流年断语。
    `;
  } else {
    prompt = `
      You are a Grandmaster of Bazi (Four Pillars of Destiny) and Traditional Chinese Astrology.
      
      [Subject Info]
      *   **Gregorian Birth**: ${birthData.date} ${birthData.time}
      *   **Gender**: ${genderStr}
      *   ${locationStr}
      *   **Forecast Start**: 2026 (Bing Wu Year)
      *   **Scope**: 20 Years (2026-2045)
      *   **Focus**: "${question || 'General Career, Wealth, Health, and Family'}"

      [Instructions]
      1.  Accurately calculate the Lunar Date and Solar Terms based on the Gregorian timestamp to determine the correct Monthly Pillar.
      2.  Analyze the 20-year span from 2026 to 2045.

      Output a Deep Detailed Report in English (1500+ words). Avoid vague statements.

      ### 1. Chart Analysis
      *   **The Four Pillars**: List the Year, Month, Day, and Hour Pillars (Gan-Zhi).
      *   **Structure & Flow**: Identify the Chart Structure (e.g., Weak Water, Dominant Fire). What are the Useful Gods (favorable elements) and Annoying Gods (unfavorable elements)?

      ### 2. Character & Talent
      *   Core strengths and weaknesses. Best suitable industries/careers.

      ### 3. 20-Year Grand Luck Overview (2026-2045)
      *   Which Grand Luck Pillars (Da Yun) does the subject pass through?
      *   The Tone: Is this a period of accumulation or aggressive expansion?

      ### 4. First Decade Detailed (2026-2035)
      *   **Grand Luck Analysis**: Interaction of this decade's pillar with the natal chart.
      *   **Yearly Forecasts**:
          *   **2026 (Fire Horse)**: A critical starting year. Clash or Harmony?
          *   **2027 (Fire Sheep)**: Ups and downs.
          *   **2028-2030**: Influence of Metal/Water/Earth years.
          *   **2031-2035**: Trends and opportunities.

      ### 5. Second Decade Detailed (2036-2045)
      *   **Change of Luck**: Transition to new Grand Luck?
      *   **Key Moments**: The 2 luckiest years and the 1 year to avoid risk.
      *   **Health & Family**: Warnings for health or elder family members.

      ### 6. Master's Strategy
      *   **Strategic Advice**: 3 Long-term life strategies for this period.
      *   **Feng Shui**: Lucky directions, colors, numbers, and items.

      Tone: Precise, authoritative, and insightful.
    `;
  }

  try {
    return await callGeminiViaProxy(prompt);
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return lang === 'zh' ? `连接错误: ${error.message}` : `Connection Error: ${error.message}`;
  }
};

export const interpretVedic = async (
  birthData: BirthData,
  question: string,
  lang: Language = 'zh'
): Promise<string> => {
  const genderStr = birthData.gender === 'male' ? (lang === 'zh' ? '男' : 'Male') : (lang === 'zh' ? '女' : 'Female');
  const locationStr = birthData.location || (lang === 'zh' ? "未提供" : "Not Provided");

  let prompt = '';

  if (lang === 'zh') {
    prompt = `
      你是一位精通**吠陀占星 (Vedic Astrology / Jyotish)** 的大师，深谙《帕拉夏拉在此刻》(Parashara Hora Sastra) 的精髓。
      
      【命主信息】
      *   **公历日期**: ${birthData.date}
      *   **出生时间**: ${birthData.time}
      *   **性别**: ${genderStr}
      *   **出生地点**: ${locationStr} (**关键**: 请务必根据此地点精确计算上升星座/Lagna)
      *   **用户诉求**: "${question || '请综合分析我的命运蓝图、事业与情感。'}"

      【推演要求】
      请采用 **恒星黄道 (Sidereal Zodiac)** 及 **Lahiri Ayanamsa (拉希里分点)** 排盘。
      请以 **Markdown** 格式输出一份**全中文**的深度占星报告（字数 1200 字以上），专业术语（如 Dharma, Artha 等）请用中文解释其含义。

      ### 1. 星盘核心架构 (The Kundali)
      *   **上升星座 (Lagna)**: 它是灵魂进入今生的面具。描述命主的外貌气质、身体素质及整体命格层级。
      *   **月亮星座 (Rashi) & 二十七宿 (Nakshatra)**: 分析月亮落入的星座及星宿（包括所在的 Pada）。这揭示了命主内心深处的情感模式、潜意识反应及精神需求。
      *   **行星落位**: 简述关键行星（日、月、火、水、木、金、土、罗睺、计都）的落宫与强弱。

      ### 2. 特殊行星组合 (Yogas)
      *   识别盘中显著的 **瑜伽 (Yogas)**（例如：Gajakesari Yoga 象头神瑜伽、Raja Yoga 王者瑜伽、Dhan Yoga 财富瑜伽，或困难的 Kemadruma Yoga 孤月瑜伽等）。
      *   解释这些组合对命主现实生活的具体影响（是大富大贵，还是大器晚成？）。

      ### 3. 人生四义详解 (Purusharthas)
      结合十二宫位 (Bhavas) 进行深度分析：
      *   **法 (Dharma - 1/5/9宫)**: 命主的天赋使命、道德观及前世福报。
      *   **财 (Artha - 2/6/10宫)**: 职业发展、财富积累能力及工作环境。
      *   **欲 (Kama - 3/7/11宫)**: 欲望、婚姻伴侣、人际关系及愿望的达成。
      *   **解脱 (Moksha - 4/8/12宫)**: 内心安宁、灵性成长及隐秘的挑战。

      ### 4. 大运与流年 (Vimshottari Dasha & Transits)
      *   **当前大运 (Mahadasha)**: 命主目前处于哪颗行星的主运？这颗行星在盘中是吉是凶？
      *   **当前副运 (Antardasha)**: 具体的流年运势如何？
      *   **未来 3 年预测**: 结合大运与流年星体（特别是木星和土星的过宫），预测接下来的运势走向。

      ### 5. 土星萨德萨蒂 (Sade Sati) 检测
      *   检测命主是否正处于 **土星七年半 (Sade Sati)** 或 **土星小限 (Dhaiya)** 时期？如果是，应如何度过这段考验期？

      ### 6. 吠陀星光疗愈 (Upayas)
      请给出切实可行的补救措施来平衡能量：
      *   **真言 (Mantra)**: 适合命主持诵的特定梵文真言（如：Om Namah Shivaya 等）。
      *   **宝石 (Gemstone)**: 严格基于**上升星座的吉星**推荐宝石（避免误推忌星宝石）。
      *   **生活修行**: 具体的布施建议（如喂养乌鸦、捐助教育等）或生活习惯调整。

      语气要求：神秘、深邃、充满古老的智慧，同时对命主充满慈悲与关怀。
    `;
  } else {
    prompt = `
      You are a Master of **Vedic Astrology (Jyotish)**, identifying as a wise sage following the Parashara Hora Sastra.
      
      [Subject Details]
      *   **Date**: ${birthData.date}
      *   **Time**: ${birthData.time}
      *   **Gender**: ${genderStr}
      *   **Location**: ${locationStr} (Critical for Ascendant calculation)
      *   **Question**: "${question || 'Analyze my Life Blueprint, Career, and Love.'}"

      [Requirements]
      Use **Sidereal Zodiac** and **Lahiri Ayanamsa**.
      Output a **Deep Report in English** (1200+ words).

      ### 1. The Kundali (Chart Structure)
      *   **Lagna (Ascendant)**: The mask of the soul. Personality, appearance, and status.
      *   **Moon Rashi & Nakshatra**: The emotional core. Analyze the Moon's sign and Nakshatra (Constellation).
      *   **Planetary Positions**: Key placements of Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu.

      ### 2. Yogas (Planetary Combinations)
      *   Identify major Yogas (e.g., Gajakesari, Raja Yoga, Dhan Yoga, or difficult ones like Kemadruma).
      *   Determine their real-world impact (Wealth, Fame, or Struggles?).

      ### 3. Purusharthas (Four Aims of Life)
      Analyze based on Houses (Bhavas):
      *   **Dharma (Rights/Duty - 1/5/9)**: Purpose, ethics, past karma.
      *   **Artha (Wealth - 2/6/10)**: Career, finance, work.
      *   **Kama (Desire - 3/7/11)**: Relationships, wishes, marriage.
      *   **Moksha (Liberation - 4/8/12)**: Spirituality, hidden things.

      ### 4. Dasha & Transits (Timing)
      *   **Current Mahadasha**: Which planet rules the current major period? Is it auspicious?
      *   **Antardasha**: The sub-period trend.
      *   **Next 3 Years**: Predictions based on Jupiter/Saturn transits.

      ### 5. Sade Sati Check
      *   Is the subject in Saturn's Sade Sati (7.5 years) or Dhaiya? How to navigate it?

      ### 6. Upayas (Remedies)
      *   **Mantra**: Specific Sanskrit mantras.
      *   **Gemstones**: Prescribe ONLY based on beneficial planets for the Ascendant.
      *   **Karma/Lifestyle**: Practical acts of charity or habits.

      Tone: Mystical, Deep, Wise, and Compassionate.
    `;
  }

  try {
    return await callGeminiViaProxy(prompt);
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return lang === 'zh' ? `连接错误: ${error.message}` : `Connection Error: ${error.message}`;
  }
};