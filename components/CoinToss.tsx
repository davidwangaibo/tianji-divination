import React, { useState, useEffect } from 'react';
import { YaoValue } from '../types';
import { Disc, RotateCcw, ScrollText } from 'lucide-react';

interface CoinTossProps {
  onComplete: (lines: YaoValue[]) => void;
  onReset: () => void;
}

interface TossRecord {
  step: number;
  result: string; // e.g. "两背一字"
  yao: string;    // e.g. "少阳"
  value: YaoValue;
}

export const CoinToss: React.FC<CoinTossProps> = ({ onComplete, onReset }) => {
  const [lines, setLines] = useState<YaoValue[]>([]);
  const [records, setRecords] = useState<TossRecord[]>([]);
  const [isTossing, setIsTossing] = useState(false);
  const [coins, setCoins] = useState<number[]>([0, 0, 0]); // 2 = Tail (Back), 3 = Head (Face)

  const tossCoins = () => {
    if (lines.length >= 6) return;
    setIsTossing(true);

    let intervalCount = 0;
    const interval = setInterval(() => {
      setCoins([
        Math.random() > 0.5 ? 3 : 2,
        Math.random() > 0.5 ? 3 : 2,
        Math.random() > 0.5 ? 3 : 2,
      ]);
      intervalCount++;
      if (intervalCount > 8) {
        clearInterval(interval);
        finalizeToss();
      }
    }, 80);
  };

  const finalizeToss = () => {
    // 3 = Head (Face/字), 2 = Tail (Back/花/背)
    // Standard Method:
    // 1 Back + 2 Face (1 Tail + 2 Head) -> 2+3+3=8 (Young Yin --) "二字一背" - Shao Yin
    // 2 Back + 1 Face (2 Tail + 1 Head) -> 2+2+3=7 (Young Yang —) "一字两背" - Shao Yang
    // 3 Back (3 Tail) -> 2+2+2=6 (Old Yin X) "三背" - Lao Yin (Moving)
    // 3 Face (3 Head) -> 3+3+3=9 (Old Yang O) "三字" - Lao Yang (Moving)
    
    // Simulating:
    const c1 = Math.random() > 0.5 ? 3 : 2;
    const c2 = Math.random() > 0.5 ? 3 : 2;
    const c3 = Math.random() > 0.5 ? 3 : 2;
    
    setCoins([c1, c2, c3]);
    
    const sum = c1 + c2 + c3;
    const tails = [c1, c2, c3].filter(c => c === 2).length;
    const heads = 3 - tails;

    let resultStr = "";
    let yaoStr = "";
    
    if (tails === 1 && heads === 2) { resultStr = "一背二字"; yaoStr = "少阴 (8)"; } // 8
    else if (tails === 2 && heads === 1) { resultStr = "二背一字"; yaoStr = "少阳 (7)"; } // 7
    else if (tails === 3) { resultStr = "三背 (重)"; yaoStr = "老阴 (6) 动"; } // 6
    else { resultStr = "三字 (交)"; yaoStr = "老阳 (9) 动"; } // 9

    const newLine = sum as YaoValue;

    const newRecord: TossRecord = {
      step: lines.length + 1,
      result: resultStr,
      yao: yaoStr,
      value: newLine
    };

    setRecords(prev => [newRecord, ...prev]);

    setLines(prev => {
      const newLines = [...prev, newLine];
      if (newLines.length === 6) {
        setTimeout(() => onComplete(newLines), 800);
      }
      return newLines;
    });
    setIsTossing(false);
  };

  const reset = () => {
    setLines([]);
    setRecords([]);
    setCoins([0, 0, 0]);
    onReset();
  };

  const currentStep = lines.length + 1;

  return (
    <div className="grid md:grid-cols-2 gap-6 w-full max-w-2xl mx-auto">
      {/* Visual Area */}
      <div className="flex flex-col items-center justify-center p-6 bg-slate-800/50 rounded-xl border border-slate-700 shadow-xl backdrop-blur-sm">
        <h3 className="text-xl font-cinzel text-amber-400 mb-6 font-bold">
          {lines.length < 6 ? `掷第 ${currentStep} 爻` : '起卦完成'}
        </h3>

        <div className="flex gap-4 mb-8 h-24 items-center">
          {coins.map((val, idx) => (
            <div 
              key={idx}
              className={`w-16 h-16 rounded-full border-4 flex items-center justify-center text-xl font-bold shadow-lg transition-all duration-300 ${
                isTossing ? 'animate-spin scale-110' : 'scale-100'
              } ${val === 0 ? 'border-slate-600 opacity-30' : 'border-amber-500 bg-amber-500 text-amber-900'}`}
            >
              {val === 0 ? '?' : val === 3 ? '字' : '背'}
            </div>
          ))}
        </div>

        <div className="flex gap-4 w-full">
          <button
            onClick={tossCoins}
            disabled={isTossing || lines.length >= 6}
            className="flex-1 py-3 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold rounded-lg shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <Disc size={20} />
            {lines.length >= 6 ? '完成' : '掷铜钱'}
          </button>

          <button
            onClick={reset}
            className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors"
            title="重置"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>

      {/* History Log */}
      <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4 h-[300px] overflow-y-auto custom-scrollbar">
        <div className="flex items-center gap-2 text-slate-400 mb-4 pb-2 border-b border-slate-800">
          <ScrollText size={16} />
          <span className="text-sm font-bold uppercase">起卦记录</span>
        </div>
        {records.length === 0 ? (
          <p className="text-slate-600 text-center text-sm mt-10">暂无记录，请开始掷币。</p>
        ) : (
          <div className="space-y-3">
            {records.map((r, i) => (
              <div key={i} className="flex items-center justify-between text-sm bg-slate-800/40 p-2 rounded animate-fade-in-right">
                <span className="text-slate-500">第 {r.step} 爻</span>
                <span className="text-amber-200 font-mono">{r.result}</span>
                <span className={`font-bold ${r.value === 6 || r.value === 9 ? 'text-red-400' : 'text-slate-300'}`}>
                  {r.yao}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};