import React from 'react';
import { YaoValue } from '../types';
import { YaoLine } from './YaoLine';
import { getHexagramInfo } from '../utils/iching';

interface HexagramVisualProps {
  lines: YaoValue[];
  title: string;
  highlightMoving?: boolean;
}

export const HexagramVisual: React.FC<HexagramVisualProps> = ({ lines, title, highlightMoving = false }) => {
  const { lower, upper, fullName } = getHexagramInfo(lines);

  // We need to render from Top to Bottom visually
  const upperSection = [...lines.slice(3, 6)].reverse();
  const lowerSection = [...lines.slice(0, 3)].reverse();

  return (
    <div className="flex flex-col items-center bg-slate-900/60 p-5 rounded-xl border border-slate-700 w-full max-w-[280px] shadow-xl backdrop-blur-sm transition-transform hover:scale-[1.02]">
      <div className="w-full text-center border-b border-amber-500/20 pb-2 mb-4">
        <h4 className="text-slate-400 text-xs uppercase tracking-widest mb-1">{title}</h4>
        <h3 className="text-2xl font-cinzel font-bold text-amber-400">{fullName}</h3>
      </div>
      
      {/* Upper Trigram */}
      <div className="w-full mb-1 relative pl-6 pr-6">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 text-xs text-slate-400 text-right w-5">
          <div className="font-bold text-slate-200">{upper.nature}</div>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-slate-500 w-5 text-left pl-1">
          <div>{upper.name}</div>
        </div>
        {upperSection.map((val, idx) => (
          // idx 0 here is actually line 6 (top) of hexagram
          <YaoLine key={`upper-${idx}`} value={val} />
        ))}
      </div>

      <div className="w-full h-px bg-slate-700/50 my-3" />

      {/* Lower Trigram */}
      <div className="w-full relative pl-6 pr-6">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 text-xs text-slate-400 text-right w-5">
          <div className="font-bold text-slate-200">{lower.nature}</div>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-slate-500 w-5 text-left pl-1">
          <div>{lower.name}</div>
        </div>
        {lowerSection.map((val, idx) => (
          <YaoLine key={`lower-${idx}`} value={val} />
        ))}
      </div>
    </div>
  );
};