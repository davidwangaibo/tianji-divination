import React from 'react';
import { YaoValue } from '../types';

interface YaoLineProps {
  value: YaoValue;
  animate?: boolean;
}

export const YaoLine: React.FC<YaoLineProps> = ({ value, animate = false }) => {
  const isYang = value === 7 || value === 9;
  const isMoving = value === 6 || value === 9;

  const baseClasses = `w-full h-4 sm:h-6 rounded mb-2 sm:mb-3 transition-all duration-700 ${animate ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`;
  
  // Yang: Solid line
  // Yin: Broken line
  
  return (
    <div className={`relative flex items-center justify-center w-full max-w-[200px] sm:max-w-[240px] mx-auto group`}>
      {/* Moving Line Indicator */}
      {isMoving && (
        <div className="absolute -left-8 text-amber-500 text-xs sm:text-sm font-bold animate-pulse">
          {value === 9 ? 'O' : 'X'}
        </div>
      )}

      {isYang ? (
        // Solid Yang Line
        <div className={`${baseClasses} bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]`}></div>
      ) : (
        // Broken Yin Line
        <div className={`flex w-full gap-4 sm:gap-6 justify-between`}>
          <div className={`${baseClasses} flex-1 bg-amber-400/80`}></div>
          <div className={`${baseClasses} flex-1 bg-amber-400/80`}></div>
        </div>
      )}
      
      {/* Hover tooltip for debugging/learning */}
      <div className="absolute right-[-40px] opacity-0 group-hover:opacity-50 text-xs text-slate-500">
        {value}
      </div>
    </div>
  );
};