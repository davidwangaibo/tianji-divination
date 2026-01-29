import React, { useState } from 'react';
import { Archive } from 'lucide-react';
import { toChineseNum } from '../utils/iching';
import { Language } from '../types';

interface GuanYinCianProps {
  onComplete: (lotNumber: number) => void;
  lang: Language;
}

export const GuanYinCian: React.FC<GuanYinCianProps> = ({ onComplete, lang }) => {
  const [isShaking, setIsShaking] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const startShaking = () => {
    if (isShaking || result) return;

    setIsShaking(true);

    // Simulate shaking time
    setTimeout(() => {
      const lot = Math.floor(Math.random() * 100) + 1; // 1 to 100
      setResult(lot);
      setIsShaking(false);

      // Allow user to see the stick for a moment before moving to interpretation phase
      setTimeout(() => {
        onComplete(lot);
      }, 2000);
    }, 2500);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-8 bg-slate-800/50 rounded-xl border border-slate-700 shadow-xl backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:bg-slate-800/60">
      <div className="relative mb-8 h-72 w-full flex items-center justify-center">
        {/* Cylinder Visual */}
        <div className={`relative w-32 h-48 bg-gradient-to-b from-amber-800 via-amber-900 to-amber-950 rounded-b-2xl border-x-4 border-b-4 border-amber-950 flex justify-center overflow-visible shadow-2xl ${isShaking ? 'animate-shake' : ''}`}>
          {/* Cylinder Texture details */}
          <div className="absolute top-6 w-full h-1 bg-black/20"></div>
          <div className="absolute bottom-6 w-full h-1 bg-black/20"></div>

          {/* Wooden Texture Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] rounded-b-lg pointer-events-none"></div>

          {/* Label */}
          <div className="absolute top-1/2 -translate-y-1/2 w-14 h-24 bg-red-900 flex items-center justify-center border-2 border-amber-600 shadow-[0_2px_10px_rgba(0,0,0,0.5)] z-20">
            <span className="font-cinzel text-amber-100 writing-vertical text-lg font-bold tracking-widest drop-shadow-md">
              {lang === 'zh' ? '观音灵签' : 'Oracle'}
            </span>
          </div>

          {/* Sticks inside (Top view illusion) */}
          <div className="absolute -top-6 w-32 h-12 bg-amber-900 rounded-[100%] border-4 border-amber-950 flex items-center justify-center overflow-hidden z-10 shadow-inner bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-800 to-amber-950">
            <div className="w-28 h-8 bg-amber-950/40 rounded-full blur-[2px]"></div>
            {/* Fake stick ends */}
            <div className="absolute w-full h-full flex flex-wrap justify-center items-center gap-1 opacity-50">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="w-1 h-1 bg-amber-200 rounded-full"></div>
              ))}
            </div>

            {isShaking && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <span className="text-xs text-amber-100/80 animate-ping font-bold">诚心...</span>
              </div>
            )}
          </div>

          {/* Dropping Stick Animation */}
          {result !== null && !isShaking && (
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 animate-drop-stick z-0 origin-bottom">
              <div className="w-6 h-64 bg-gradient-to-r from-amber-100 to-amber-200 rounded-sm border border-amber-300 flex items-end justify-center pb-4 shadow-xl relative transform rotate-1">
                {/* Stick Red Top */}
                <div className="absolute top-0 w-full h-4 bg-red-600/80"></div>
                {/* Stick Text */}
                <span className="text-slate-900 font-bold writing-vertical text-lg font-serif tracking-[0.2em] opacity-90">
                  {toChineseNum(result)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="text-center mb-6 h-16">
        <h3 className="text-2xl font-cinzel text-amber-400 font-bold mb-2 transition-all duration-500 drop-shadow-sm">
          {result ? (lang === 'zh' ? `得第${toChineseNum(result)}签` : `Lot #${result} Drawn`) : (lang === 'zh' ? '诚心求签' : 'Pray for Guidance')}
        </h3>
        <p className="text-slate-400 text-sm transition-opacity duration-300">
          {isShaking ? (lang === 'zh' ? '哗啦哗啦... 凝神祈祷...' : 'Shaking... Focus your mind...') : result ? (lang === 'zh' ? '灵签已落，静待解读' : 'Lot is drawn. Interpreting...') : (lang === 'zh' ? '默念心中所求，点击摇签' : 'Focus on your question and shake.')}
        </p>
      </div>

      <button
        onClick={startShaking}
        disabled={isShaking || result !== null}
        className="px-12 py-4 bg-gradient-to-r from-red-800 to-red-700 hover:from-red-700 hover:to-red-600 disabled:from-slate-700 disabled:to-slate-800 text-white font-bold rounded-lg shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 border border-red-500/30 group"
      >
        <Archive size={22} className="group-hover:rotate-12 transition-transform" />
        {result ? (lang === 'zh' ? '求签完成' : 'Done') : (lang === 'zh' ? '摇动签筒' : 'Shake Cylinder')}
      </button>

      <style>{`
        .writing-vertical {
          writing-mode: vertical-rl;
          text-orientation: upright;
        }
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both infinite;
        }
        @keyframes drop-stick {
          0% { transform: translate(-50%, 0) rotate(-5deg); opacity: 0; }
          10% { opacity: 1; }
          60% { transform: translate(-50%, 150px) rotate(5deg); }
          80% { transform: translate(-50%, 140px) rotate(8deg); }
          100% { transform: translate(-50%, 160px) rotate(10deg); }
        }
        .animate-drop-stick {
          animation: drop-stick 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};