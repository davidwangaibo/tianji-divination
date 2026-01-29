import React, { useState, useRef, useEffect } from 'react';
import { CoinToss } from './components/CoinToss';
import { TimeGua } from './components/TimeGua';
import { GuanYinCian } from './components/GuanYinCian';
import { HexagramVisual } from './components/HexagramVisual';
import { TarotDeck } from './components/TarotDeck';
import { BirthChartInput } from './components/BirthChartInput';
import { ApiKeyModal } from './components/ApiKeyModal';
import { interpretHexagram, interpretGuanYin, interpretTarot, interpretBazi, interpretVedic } from './services/geminiService';
import { DivinationMethod, HexagramData, YaoValue, TarotCard, BirthData, Language } from './types';
import { getTransformedHexagram, hasMovingLines, toChineseNum } from './utils/iching';
import { Sparkles, Moon, Sun, ArrowRight, BookOpen, RotateCcw, Archive, Star, Home, Calendar, Flower, Languages, Settings } from 'lucide-react';
import { TRANSLATIONS } from './src/constants/translations';

export default function App() {
  const [lang, setLang] = useState<Language>('zh');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [method, setMethod] = useState<DivinationMethod | null>(null);
  const [hexagram, setHexagram] = useState<HexagramData | null>(null);
  const [lotNumber, setLotNumber] = useState<number | null>(null); // For Guan Yin
  const [tarotCards, setTarotCards] = useState<TarotCard[] | null>(null);
  const [birthData, setBirthData] = useState<BirthData | null>(null);

  const [question, setQuestion] = useState('');
  const [interpretation, setInterpretation] = useState('');
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  const handleCoinComplete = (lines: YaoValue[]) => {
    setHexagram({
      lines,
      method: 'coin',
      timestamp: Date.now()
    });
  };

  const handleTimeComplete = (data: HexagramData) => {
    setHexagram(data);
  };

  const handleGuanYinComplete = (num: number) => {
    setLotNumber(num);
  };

  const handleTarotComplete = (cards: TarotCard[]) => {
    setTarotCards(cards);
  }

  const handleBirthDataComplete = (data: BirthData) => {
    setBirthData(data);
  }

  const handleConsultOracle = async () => {
    // For Bazi/Vedic, question is optional, but we check if birthData exists
    if ((method === DivinationMethod.BAZI || method === DivinationMethod.VEDIC) && !birthData) return;
    if (method !== DivinationMethod.BAZI && method !== DivinationMethod.VEDIC && !question.trim()) return;

    setLoading(true);
    let result = '';

    if (method === DivinationMethod.GUAN_YIN && lotNumber) {
      result = await interpretGuanYin(lotNumber, question);
    } else if (method === DivinationMethod.TAROT && tarotCards) {
      result = await interpretTarot(tarotCards, question);
    } else if (method === DivinationMethod.BAZI && birthData) {
      result = await interpretBazi(birthData, question, lang);
    } else if (method === DivinationMethod.VEDIC && birthData) {
      result = await interpretVedic(birthData, question, lang);
    } else if (hexagram) {
      result = await interpretHexagram(hexagram, question, lang);
    }

    setInterpretation(result);
    setLoading(false);
  };

  useEffect(() => {
    if (interpretation && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [interpretation]);

  const resetAll = () => {
    setMethod(null);
    setHexagram(null);
    setLotNumber(null);
    setTarotCards(null);
    setBirthData(null);
    setQuestion('');
    setInterpretation('');
    setLoading(false);
  };

  const resetDivination = () => {
    setHexagram(null);
    setLotNumber(null);
    setTarotCards(null);
    setBirthData(null);
    setQuestion('');
    setInterpretation('');
    setLoading(false);
  };

  // Derive transformed lines for display (Hexagram only)
  const transformedLines = hexagram ? getTransformedHexagram(hexagram.lines) : null;
  const isMoving = hexagram ? hasMovingLines(hexagram.lines) : false;

  // Render Logic helpers
  const isHexagramMethod = method === DivinationMethod.COIN || method === DivinationMethod.TIME;
  const isGuanYin = method === DivinationMethod.GUAN_YIN;
  const isTarot = method === DivinationMethod.TAROT;
  const isBazi = method === DivinationMethod.BAZI;
  const isVedic = method === DivinationMethod.VEDIC;

  const hasResult = hexagram || lotNumber || tarotCards || birthData;

  const getMethodName = () => {
    const t = TRANSLATIONS[lang];
    if (method === DivinationMethod.COIN) return t.methods.coin.title;
    if (method === DivinationMethod.TIME) return t.methods.time.title;
    if (method === DivinationMethod.GUAN_YIN) return t.methods.guanyin.title;
    if (method === DivinationMethod.TAROT) return t.methods.tarot.title;
    if (method === DivinationMethod.BAZI) return t.methods.bazi.title;
    if (method === DivinationMethod.VEDIC) return t.methods.vedic.title;
    return '';
  };

  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen bg-[#0f172a] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] text-slate-200 flex flex-col font-sans selection:bg-amber-500/30">

      {/* Header */}
      <header className="p-6 text-center border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 shadow-lg relative">
        <div className="absolute right-4 top-4 flex items-center gap-3 z-50">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 text-slate-400 hover:text-amber-400 transition-colors bg-slate-800/80 rounded-full border border-slate-700/50 backdrop-blur-md shadow-lg hover:border-amber-500/50"
            title={lang === 'zh' ? "设置 API Key" : "Configure API Key"}
          >
            <Settings size={18} />
          </button>

          <div className="flex items-center bg-slate-800/80 rounded-full p-1 border border-slate-700/50 backdrop-blur-md shadow-lg">
            <button
              onClick={() => setLang('zh')}
              className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all duration-300 ${lang === 'zh' ? 'bg-amber-600 text-white shadow-[0_0_10px_rgba(217,119,6,0.5)]' : 'text-slate-400 hover:text-amber-200'}`}
            >
              中文
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all duration-300 ${lang === 'en' ? 'bg-indigo-600 text-white shadow-[0_0_10px_rgba(79,70,229,0.5)]' : 'text-slate-400 hover:text-indigo-200'}`}
            >
              English
            </button>
          </div>
        </div>

        <ApiKeyModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} lang={lang} />

        <h1 className="text-3xl md:text-4xl font-cinzel font-bold bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200 bg-clip-text text-transparent drop-shadow-sm tracking-wider">
          {t.title}
        </h1>
        <nav className="flex justify-center flex-wrap gap-x-3 gap-y-2 mt-3 text-slate-400 text-xs md:text-sm tracking-widest uppercase opacity-90">
          {[
            { name: t.nav.coin, method: DivinationMethod.COIN },
            { name: t.nav.time, method: DivinationMethod.TIME },
            { name: t.nav.bazi, method: DivinationMethod.BAZI },
            { name: t.nav.tarot, method: DivinationMethod.TAROT },
            { name: t.nav.guanyin, method: DivinationMethod.GUAN_YIN },
            { name: t.nav.vedic, method: DivinationMethod.VEDIC },
          ].map((item, index) => (
            <React.Fragment key={item.name}>
              {index > 0 && <span className="opacity-30 select-none">•</span>}
              <button
                onClick={() => setMethod(item.method)}
                className={`hover:text-amber-400 transition-all duration-300 relative group ${method === item.method ? 'text-amber-500 font-bold' : ''}`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-500 transition-all duration-300 group-hover:w-full ${method === item.method ? 'w-full' : ''}`}></span>
              </button>
            </React.Fragment>
          ))}
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">

        {/* Method Selection */}
        {!method && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-12 animate-fade-in-up">
            <button
              onClick={() => setMethod(DivinationMethod.COIN)}
              className="group relative p-6 bg-slate-800/80 rounded-2xl border border-slate-700 hover:border-amber-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] text-left backdrop-blur-sm"
            >
              <div className="absolute top-4 right-4 text-slate-600 group-hover:text-amber-500 transition-colors">
                <Sun size={24} />
              </div>
              <h2 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-amber-400 font-cinzel">{t.methods.coin.title}</h2>
              <p className="text-slate-400 leading-relaxed text-xs">
                {t.methods.coin.desc}
              </p>
            </button>

            <button
              onClick={() => setMethod(DivinationMethod.TIME)}
              className="group relative p-6 bg-slate-800/80 rounded-2xl border border-slate-700 hover:border-indigo-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] text-left backdrop-blur-sm"
            >
              <div className="absolute top-4 right-4 text-slate-600 group-hover:text-indigo-500 transition-colors">
                <Moon size={24} />
              </div>
              <h2 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-indigo-400 font-cinzel">{t.methods.time.title}</h2>
              <p className="text-slate-400 leading-relaxed text-xs">
                {t.methods.time.desc}
              </p>
            </button>

            <button
              onClick={() => setMethod(DivinationMethod.BAZI)}
              className="group relative p-6 bg-slate-800/80 rounded-2xl border border-slate-700 hover:border-amber-700 transition-all duration-300 hover:shadow-[0_0_30px_rgba(180,83,9,0.2)] text-left backdrop-blur-sm"
            >
              <div className="absolute top-4 right-4 text-slate-600 group-hover:text-amber-600 transition-colors">
                <Calendar size={24} />
              </div>
              <h2 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-amber-500 font-cinzel">{t.methods.bazi.title}</h2>
              <p className="text-slate-400 leading-relaxed text-xs">
                {t.methods.bazi.desc}
              </p>
            </button>

            <button
              onClick={() => setMethod(DivinationMethod.GUAN_YIN)}
              className="group relative p-6 bg-slate-800/80 rounded-2xl border border-slate-700 hover:border-red-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] text-left backdrop-blur-sm"
            >
              <div className="absolute top-4 right-4 text-slate-600 group-hover:text-red-500 transition-colors">
                <Archive size={24} />
              </div>
              <h2 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-red-400 font-cinzel">{t.methods.guanyin.title}</h2>
              <p className="text-slate-400 leading-relaxed text-xs">
                {t.methods.guanyin.desc}
              </p>
            </button>

            <button
              onClick={() => setMethod(DivinationMethod.TAROT)}
              className="group relative p-6 bg-slate-800/80 rounded-2xl border border-slate-700 hover:border-purple-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] text-left backdrop-blur-sm"
            >
              <div className="absolute top-4 right-4 text-slate-600 group-hover:text-purple-500 transition-colors">
                <Star size={24} />
              </div>
              <h2 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-purple-400 font-cinzel">{t.methods.tarot.title}</h2>
              <p className="text-slate-400 leading-relaxed text-xs">
                {t.methods.tarot.desc}
              </p>
            </button>

            <button
              onClick={() => setMethod(DivinationMethod.VEDIC)}
              className="group relative p-6 bg-slate-800/80 rounded-2xl border border-slate-700 hover:border-indigo-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(129,140,248,0.2)] text-left backdrop-blur-sm"
            >
              <div className="absolute top-4 right-4 text-slate-600 group-hover:text-indigo-400 transition-colors">
                <Flower size={24} />
              </div>
              <h2 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-indigo-300 font-cinzel">{t.methods.vedic.title}</h2>
              <p className="text-slate-400 leading-relaxed text-xs">
                {t.methods.vedic.desc}
              </p>
            </button>
          </div>
        )}

        {/* Active Divination Area */}
        {method && !hasResult && (
          <div className="mt-8 animate-fade-in">
            <div className="mb-6 flex items-center justify-between">
              <button onClick={() => setMethod(null)} className="text-slate-400 hover:text-white flex items-center gap-2 text-sm transition-colors">
                &larr; {t.actions.back}
              </button>
              <span className={`font-bold uppercase tracking-wider text-xs border px-3 py-1 rounded-full ${isTarot ? 'text-purple-400 border-purple-500/30' : isVedic ? 'text-indigo-400 border-indigo-500/30' : 'text-amber-500/80 border-amber-500/30'}`}>
                当前模式: {getMethodName()}
              </span>
            </div>

            {method === DivinationMethod.COIN ? (
              <CoinToss onComplete={handleCoinComplete} onReset={() => { }} lang={lang} />
            ) : method === DivinationMethod.TIME ? (
              <TimeGua onComplete={handleTimeComplete} lang={lang} />
            ) : method === DivinationMethod.GUAN_YIN ? (
              <GuanYinCian onComplete={handleGuanYinComplete} lang={lang} />
            ) : method === DivinationMethod.BAZI || method === DivinationMethod.VEDIC ? (
              <BirthChartInput onComplete={handleBirthDataComplete} method={method} lang={lang} />
            ) : (
              <TarotDeck onComplete={handleTarotComplete} lang={lang} />
            )}
          </div>
        )}

        {/* Result Display */}
        {hasResult && (
          <div className="mt-8 grid lg:grid-cols-2 gap-8 animate-fade-in pb-12">

            {/* Left Column: Visuals */}
            <div className="flex flex-col gap-6">
              <div className={`bg-slate-800/50 p-6 rounded-xl border flex flex-col items-center shadow-lg backdrop-blur-md ${isTarot ? 'border-purple-500/30' : isVedic ? 'border-indigo-500/30' : 'border-slate-700'}`}>
                <div className="flex items-center justify-between w-full mb-6 border-b border-slate-700 pb-4">
                  <h3 className={`text-xl font-cinzel font-bold ${isTarot ? 'text-purple-400' : isVedic ? 'text-indigo-400' : 'text-amber-400'}`}>
                    {isGuanYin ? t.results.lotTitle : isTarot ? t.results.tarotTitle : isBazi ? t.results.baziTitle : isVedic ? t.results.vedicTitle : t.results.guaTitle}
                  </h3>
                  <div className="flex gap-2">
                    <button onClick={resetAll} className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors bg-slate-700/50 px-2 py-1.5 rounded hover:bg-slate-600" title={t.actions.home}>
                      <Home size={12} />
                    </button>
                    <button onClick={resetDivination} className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors bg-slate-700/50 px-3 py-1.5 rounded hover:bg-slate-600">
                      <RotateCcw size={12} /> {isBazi || isVedic ? t.actions.reinput : t.actions.reset}
                    </button>
                  </div>
                </div>

                {isHexagramMethod && hexagram && (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full">
                    <div className="flex flex-col items-center w-full">
                      <HexagramVisual lines={hexagram.lines} title={lang === 'zh' ? "本卦 (当前)" : "Current Hexagram"} highlightMoving lang={lang} />
                    </div>
                    {isMoving && (
                      <div className="hidden sm:flex text-slate-500">
                        <ArrowRight size={24} />
                      </div>
                    )}
                    {isMoving && transformedLines && (
                      <div className="flex flex-col items-center w-full animate-fade-in-right">
                        <HexagramVisual lines={transformedLines} title={lang === 'zh' ? "之卦 (结果)" : "Result Hexagram"} lang={lang} />
                      </div>
                    )}
                  </div>
                )}

                {isGuanYin && lotNumber && (
                  <div className="flex flex-col items-center animate-fade-in-up">
                    <div className="w-24 h-64 bg-amber-100 border-2 border-red-800 rounded shadow-2xl flex flex-col items-center py-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')] opacity-50"></div>
                      <div className="text-red-800 font-bold text-sm mb-2 border-b border-red-800/50 pb-1">观音灵签</div>
                      <div className="flex-grow flex items-center justify-center">
                        <span className="text-3xl font-bold text-black writing-vertical font-serif tracking-widest">
                          第{toChineseNum(lotNumber)}签
                        </span>
                      </div>
                      <div className="text-red-800 font-bold text-xl mt-2">{lotNumber}</div>
                    </div>
                    <p className="mt-6 text-amber-200 text-lg font-bold">第 {toChineseNum(lotNumber)} 签</p>
                    <p className="text-slate-400 text-sm mt-1">请诚心在右侧输入所求之事，解签大师将为您详批。</p>
                  </div>
                )}

                {isTarot && tarotCards && (
                  <div className="w-full grid grid-cols-1 gap-4">
                    {tarotCards.map((card) => (
                      <div key={card.id} className="flex items-center gap-4 bg-slate-900/40 p-3 rounded-lg border border-purple-500/20">
                        <div className={`w-12 h-20 bg-gradient-to-b from-slate-300 to-slate-400 rounded flex items-center justify-center text-[8px] text-slate-900 font-bold shrink-0 ${card.isReversed ? 'rotate-180' : ''}`}>
                          {card.name}
                        </div>
                        <div>
                          <div className="text-xs text-purple-400 uppercase tracking-widest font-bold">
                            {t.nav.tarot} - {card.position === 'past' ? (lang === 'zh' ? '过去' : 'Past') : card.position === 'present' ? (lang === 'zh' ? '现在' : 'Present') : (lang === 'zh' ? '未来' : 'Future')}
                          </div>
                          <div className="text-slate-200 font-bold flex items-center gap-2">
                            {card.name}
                            {card.isReversed && <span className="text-[10px] bg-red-900/50 text-red-200 px-1 rounded">{lang === 'zh' ? '逆' : 'Rev'}</span>}
                          </div>
                          <div className="text-xs text-slate-500 font-serif italic">{card.nameEn}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {(isBazi || isVedic) && birthData && (
                  <div className="w-full flex flex-col items-center space-y-4 animate-fade-in-up">
                    <div className={`p-4 border rounded-lg w-full ${isVedic ? 'bg-indigo-900/20 border-indigo-600/30' : 'bg-amber-900/20 border-amber-600/30'}`}>
                      <h4 className={`text-sm font-bold uppercase mb-2 text-center ${isVedic ? 'text-indigo-400' : 'text-amber-400'}`}>
                        {isVedic ? t.results.vedicTitle : t.results.baziTitle}
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm text-slate-300">
                        <div className="flex flex-col items-center">
                          <span className="text-slate-500 text-xs">{t.birthInput.date}</span>
                          <span className="font-mono">{birthData.date}</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-slate-500 text-xs">{t.birthInput.time}</span>
                          <span className="font-mono">{birthData.time}</span>
                        </div>
                        <div className="flex flex-col items-center col-span-2">
                          <span className="text-slate-500 text-xs">{t.birthInput.gender}</span>
                          <span>{birthData.gender === 'male' ? t.birthInput.male : t.birthInput.female}</span>
                        </div>
                        {birthData.location && (
                          <div className="flex flex-col items-center col-span-2">
                            <span className="text-slate-500 text-xs">{t.birthInput.location}</span>
                            <span>{birthData.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 text-center">
                      {isVedic ? (lang === 'zh' ? 'AI 将采用恒星黄道 (Sidereal/Nirayana) 进行排盘。' : 'AI uses Sidereal Zodiac (Nirayana) for charting.') : (lang === 'zh' ? 'AI 将自动为您排盘（年、月、日、时四柱）并推演大运。' : 'AI calculates 4 Pillars of Destiny automatically.')}
                    </p>
                  </div>
                )}

                {isHexagramMethod && !isMoving && (
                  <p className="mt-4 text-sm text-slate-500 italic">此卦为静卦，无动爻，事态稳定。</p>
                )}
              </div>

              {/* Instructions if not yet interpreted */}
              {!interpretation && isHexagramMethod && (
                <div className="bg-amber-900/10 border border-amber-900/30 p-4 rounded-lg text-sm text-amber-200/70">
                  <p>{lang === 'zh' ? '提示：本卦代表事物开始或当前的状态，之卦（变卦）代表事物发展的结果或趋势。解卦时需结合两者综判。' : 'Tip: The Hexagram represents the current state. The Transformed Hexagram represents the trend. Interpret both for insight.'}</p>
                </div>
              )}
            </div>

            {/* Right Column: Interpretation Form */}
            <div className="flex flex-col h-full">
              {!interpretation ? (
                <div className={`bg-slate-800 p-6 rounded-xl border shadow-xl h-full flex flex-col ${isTarot ? 'border-purple-500/30' : isVedic ? 'border-indigo-500/30' : 'border-slate-700'}`}>
                  <h3 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">
                    <Sparkles className={isTarot ? "text-purple-500" : isVedic ? 'text-indigo-400' : "text-amber-500"} size={20} />
                    {isGuanYin ? t.methods.guanyin.title : isTarot ? t.methods.tarot.title : (isBazi || isVedic) ? t.input.questionLabelSpecific : t.actions.submit}
                  </h3>

                  <div className="flex-grow flex flex-col gap-4">
                    <div>
                      <label className="block text-slate-400 text-xs uppercase tracking-wider mb-2 font-bold">
                        {isGuanYin ? (lang === 'zh' ? '弟子所求何事？' : 'What is your prayer?') : (isBazi || isVedic) ? t.input.questionLabelSpecific : t.input.questionLabel}
                      </label>
                      <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder={
                          isTarot ? "请集中精神，描述您想询问的关于感情、事业或生活的具体困惑..." :
                            (isBazi || isVedic) ? t.input.questionPlaceholderBazi :
                              t.input.questionPlaceholder
                        }
                        className={`w-full h-40 bg-slate-900/80 border rounded-lg p-4 text-slate-200 focus:ring-2 focus:border-transparent focus:outline-none resize-none leading-relaxed placeholder:text-slate-600 ${isTarot ? 'border-purple-500/30 focus:ring-purple-500' : isVedic ? 'border-indigo-500/30 focus:ring-indigo-500' : 'border-slate-600 focus:ring-amber-500'}`}
                      />
                    </div>

                    <button
                      onClick={handleConsultOracle}
                      // For Bazi/Vedic, question can be empty
                      disabled={(!(isBazi || isVedic) && !question.trim()) || loading}
                      className={`mt-auto w-full py-4 text-white font-bold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 transform active:scale-[0.98] ${isTarot ? 'bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500' : isVedic ? 'bg-gradient-to-r from-indigo-700 to-purple-600 hover:from-indigo-600 hover:to-purple-500' : 'bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500'}`}
                    >
                      {loading ? (
                        <>
                          <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                          <span className="animate-pulse">{isTarot ? t.actions.analyzingTarot : t.actions.analyzing}</span>
                        </>
                      ) : (
                        <>
                          <BookOpen size={20} />
                          {isGuanYin ? '查看签文详解' : isTarot ? '解读牌阵' : isBazi ? '开始批命' : isVedic ? '解读星盘' : '解读天机'}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className={`bg-slate-800/90 p-6 sm:p-8 rounded-xl border h-full overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)] relative ${isTarot ? 'border-purple-500/30' : isVedic ? 'border-indigo-500/30' : 'border-amber-500/30'}`}>
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-transparent to-transparent ${isTarot ? 'via-purple-500' : isVedic ? 'via-indigo-500' : 'via-amber-500'}`}></div>

                  <h3 className={`text-xl font-bold mb-4 border-b border-slate-700/50 pb-4 flex justify-between items-center shrink-0 ${isTarot ? 'text-purple-400' : isVedic ? 'text-indigo-400' : 'text-amber-400'}`}>
                    <span>{isGuanYin ? '灵签详解' : isTarot ? '塔罗指引' : isVedic ? '星盘解读' : '大师批语'}</span>
                    <span className="text-xs font-normal text-slate-500 bg-slate-900 px-2 py-1 rounded">AI 生成</span>
                  </h3>

                  <div className="overflow-y-auto custom-scrollbar pr-2 flex-grow">
                    <div className={`text-slate-300 prose prose-invert max-w-none prose-headings:text-opacity-90 prose-strong:text-opacity-90 ${isTarot ? 'prose-headings:text-purple-200 prose-strong:text-purple-200 prose-li:marker:text-purple-500' : isVedic ? 'prose-headings:text-indigo-200 prose-strong:text-indigo-200 prose-li:marker:text-indigo-500' : 'prose-headings:text-amber-200 prose-strong:text-amber-100 prose-li:marker:text-amber-600'}`}>
                      {interpretation.split('\n').map((line, i) => (
                        <p key={i} className="mb-2 leading-relaxed text-sm md:text-base">
                          {line.replace(/\*\*(.*?)\*\*/g, (match, p1) => `<strong>${p1}</strong>`)
                            .split('<strong>').reduce((acc: any[], part, idx) => {
                              if (idx === 0) return [part];
                              const [bold, rest] = part.split('</strong>');
                              return [...acc, <strong key={idx} className={`px-1 rounded ${isTarot ? 'text-purple-200/90 bg-purple-900/20' : isVedic ? 'text-indigo-200/90 bg-indigo-900/20' : 'text-amber-200/90 bg-amber-900/20'}`}>{bold}</strong>, rest];
                            }, [])
                          }
                        </p>
                      ))}
                    </div>
                    <div ref={bottomRef} />
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-center shrink-0">
                    <button onClick={resetDivination} className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm rounded-full transition-colors flex items-center gap-2">
                      <RotateCcw size={14} /> 再次问卜
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="p-6 text-center text-slate-600 text-xs border-t border-slate-800 bg-slate-900/50">
        <p>&copy; {new Date().getFullYear()} 天机占卜 (Celestial Divination). </p>
        <p className="mt-1 opacity-50">命由己造，相由心生。结果仅供娱乐与参考。</p>
      </footer>
      <style>{`
        .writing-vertical {
          writing-mode: vertical-rl;
          text-orientation: upright;
        }
      `}</style>
    </div>
  );
}
