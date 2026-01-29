import React, { useState, useEffect } from 'react';
import { HexagramData, YaoValue, Language } from '../types';
import { getTrigramFromLines, getGanZhiYear, getEarthlyBranchName, getHexagramInfo } from '../utils/iching';
import { Clock, Calculator, ArrowDown } from 'lucide-react';

interface TimeGuaProps {
  onComplete: (data: HexagramData) => void;
  lang: Language;
}

export const TimeGua: React.FC<TimeGuaProps> = ({ onComplete, lang }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [calculationLog, setCalculationLog] = useState<string[]>([]);
  const [showLog, setShowLog] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const calculateGua = () => {
    setShowLog(true);
    setCalculationLog([]);

    const year = currentTime.getFullYear();
    const month = currentTime.getMonth() + 1;
    const day = currentTime.getDate();
    const hour = currentTime.getHours();

    // Earthly Branch for Hour
    let earthlyBranchHourIdx = Math.floor((hour + 1) / 2) + 1;
    if (hour === 23) earthlyBranchHourIdx = 1;
    const hourBranchName = getEarthlyBranchName(earthlyBranchHourIdx);

    // Year Logic (Simulated for Demo)
    // In real Mei Hua, we use the Year's Earthly Branch Number (Zi=1, Chou=2...).
    // 2024 is Dragon (Chen 辰), index 5.
    // 2025 is Snake (Si 巳), index 6.
    // Simple offset formula for Gregorian to Branch Index (1-12):
    // (Year - 3) % 12. If 0 result is 12.
    // 2024 - 3 = 2021. 2021 % 12 = 5 (Dragon). Correct.
    let yearBranchNum = (year - 3) % 12;
    if (yearBranchNum === 0) yearBranchNum = 12;

    const yearGanZhi = getGanZhiYear(year);

    // Upper: Year + Month + Day
    const upperSum = yearBranchNum + month + day;
    let upperNum = upperSum % 8;
    if (upperNum === 0) upperNum = 8;

    // Lower: UpperSum + Hour
    const lowerSum = upperSum + earthlyBranchHourIdx;
    let lowerNum = lowerSum % 8;
    if (lowerNum === 0) lowerNum = 8;

    // Moving Line
    let movingLineIdx = lowerSum % 6;
    if (movingLineIdx === 0) movingLineIdx = 6;
    const movingLineIndexZeroBased = movingLineIdx - 1;

    // Map to Trigrams
    const MAP: Record<number, number[]> = {
      1: [1, 1, 1], 2: [1, 1, 0], 3: [1, 0, 1], 4: [1, 0, 0],
      5: [0, 1, 1], 6: [0, 1, 0], 7: [0, 0, 1], 8: [0, 0, 0]
    };

    const lowerLinesRaw = MAP[lowerNum];
    const upperLinesRaw = MAP[upperNum];
    const allLinesBinary = [...lowerLinesRaw, ...upperLinesRaw];

    const finalLines: YaoValue[] = allLinesBinary.map((bit, idx) => {
      if (idx === movingLineIndexZeroBased) {
        return bit === 1 ? 9 : 6;
      }
      return bit === 1 ? 7 : 8;
    });

    // Peek at result for logs
    const hexInfo = getHexagramInfo(finalLines);

    // Detailed logs
    // Detailed logs
    let logs: string[] = [];

    if (lang === 'zh') {
      logs = [
        `天时: ${yearGanZhi}年 ${month}月${day}日 ${hourBranchName}时`,
        `取数: 年支(${yearBranchNum}) + 月(${month}) + 日(${day}) = ${upperSum}`,
        `上卦: ${upperSum} ÷ 8 余 ${upperNum} -> 【${hexInfo.upper.name}】为${hexInfo.upper.nature}`,
        `取数: 上卦数(${upperSum}) + 时支(${earthlyBranchHourIdx}) = ${lowerSum}`,
        `下卦: ${lowerSum} ÷ 8 余 ${lowerNum} -> 【${hexInfo.lower.name}】为${hexInfo.lower.nature}`,
        `动爻: 总数(${lowerSum}) ÷ 6 余 ${movingLineIdx} -> 第 ${movingLineIdx} 爻动`,
        `成卦: ${hexInfo.fullName}`
      ];
    } else {
      logs = [
        `Time: Year ${yearGanZhi} Month ${month} Day ${day} Hour ${hourBranchName}`,
        `Nums: Year(${yearBranchNum}) + Month(${month}) + Day(${day}) = ${upperSum}`,
        `Upper: ${upperSum} % 8 = ${upperNum} -> [${hexInfo.upper.name}] ${hexInfo.upper.nature}`,
        `Nums: Upper(${upperSum}) + Hour(${earthlyBranchHourIdx}) = ${lowerSum}`,
        `Lower: ${lowerSum} % 8 = ${lowerNum} -> [${hexInfo.lower.name}] ${hexInfo.lower.nature}`,
        `Move: Sum(${lowerSum}) % 6 = ${movingLineIdx} -> Line ${movingLineIdx} Moving`,
        `Hexagram: ${hexInfo.fullName}`
      ];
    }

    setCalculationLog(logs);

    setTimeout(() => {
      onComplete({
        lines: finalLines,
        method: 'time',
        timestamp: Date.now()
      });
    }, 2500);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-8 bg-slate-800/50 rounded-xl border border-slate-700 shadow-xl backdrop-blur-sm transition-all duration-500">
      <Clock size={48} className="text-indigo-500 mb-6" />
      <h3 className="text-xl font-cinzel text-slate-200 mb-2 font-bold">{lang === 'zh' ? '梅花易数' : 'Plum Blossom Numerology'}</h3>
      <p className="text-slate-400 text-center mb-6 text-sm font-mono opacity-80">
        {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
      </p>

      {!showLog ? (
        <button
          onClick={calculateGua}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg shadow-lg transition-all transform hover:scale-105 active:scale-95 w-full flex items-center justify-center gap-2"
        >
          <Calculator size={18} />
          {lang === 'zh' ? '推衍天机' : 'Calculate'}
        </button>
      ) : (
        <div className="w-full bg-slate-900/90 p-5 rounded-lg border border-indigo-500/30 text-left space-y-3 animate-fade-in text-sm font-mono text-indigo-100 shadow-inner">
          {calculationLog.map((log, i) => (
            <div key={i} className="flex gap-3 animate-fade-in-up items-start" style={{ animationDelay: `${i * 300}ms` }}>
              <ArrowDown size={14} className="mt-1 text-slate-500 shrink-0" />
              <span className={i === calculationLog.length - 1 ? "text-amber-300 font-bold text-base" : ""}>{log}</span>
            </div>
          ))}
          <div className="text-center pt-3 text-white/50 text-xs animate-pulse">
            {lang === 'zh' ? '正在生成卦象...' : 'Generating Hexagram...'}
          </div>
        </div>
      )}
    </div>
  );
};