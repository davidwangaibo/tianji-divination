import React, { useState } from 'react';
import { TarotCard } from '../types';
import { TAROT_DECK_DATA } from '../utils/tarot';
import { Sparkles, Eye, Repeat } from 'lucide-react';

interface TarotDeckProps {
  onComplete: (cards: TarotCard[]) => void;
}

export const TarotDeck: React.FC<TarotDeckProps> = ({ onComplete }) => {
  const [drawnCards, setDrawnCards] = useState<TarotCard[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [deckState, setDeckState] = useState<'initial' | 'spread'>('initial');

  const shuffleAndSpread = () => {
    setIsShuffling(true);
    setTimeout(() => {
      setIsShuffling(false);
      setDeckState('spread');
    }, 1500);
  };

  const drawCard = () => {
    if (drawnCards.length >= 3) return;

    // Random card logic
    let randomIndex;
    let cardData;
    let isReversed;
    
    // Ensure uniqueness
    do {
      randomIndex = Math.floor(Math.random() * TAROT_DECK_DATA.length);
      cardData = TAROT_DECK_DATA[randomIndex];
    } while (drawnCards.some(c => c.id === cardData.id));

    isReversed = Math.random() > 0.5; // 50% chance reverse

    const positions: Array<'past' | 'present' | 'future'> = ['past', 'present', 'future'];
    const currentPosition = positions[drawnCards.length];

    const newCard: TarotCard = {
      ...cardData,
      isReversed,
      position: currentPosition
    };

    const newDrawn = [...drawnCards, newCard];
    setDrawnCards(newDrawn);

    if (newDrawn.length === 3) {
      setTimeout(() => onComplete(newDrawn), 1000);
    }
  };

  const getPositionLabel = (pos: string) => {
    switch (pos) {
      case 'past': return '过去 (The Past)';
      case 'present': return '现在 (The Present)';
      case 'future': return '未来 (The Future)';
      default: return '';
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      
      {/* Interaction Area */}
      <div className="relative w-full h-[400px] bg-slate-900/40 rounded-xl border border-indigo-500/30 backdrop-blur-md flex flex-col items-center justify-center overflow-hidden mb-6 shadow-2xl">
        
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-900/0 to-slate-900/0"></div>
        
        {deckState === 'initial' ? (
          <div className="flex flex-col items-center animate-fade-in">
            <div 
              className={`relative w-32 h-52 bg-gradient-to-br from-indigo-600 to-purple-800 rounded-lg border-2 border-indigo-300 shadow-[0_0_30px_rgba(99,102,241,0.4)] cursor-pointer hover:scale-105 transition-transform flex items-center justify-center group ${isShuffling ? 'animate-shuffle' : ''}`}
              onClick={shuffleAndSpread}
            >
              <div className="absolute inset-2 border border-indigo-400/30 rounded flex items-center justify-center">
                 <Sparkles className="text-indigo-200/50" size={32} />
              </div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-30"></div>
            </div>
            <p className="mt-6 text-indigo-300 font-cinzel text-lg tracking-wider">
              {isShuffling ? '洗牌中...' : '点击牌堆开始洗牌'}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full h-full justify-center">
            {/* The Deck to Draw From */}
            {drawnCards.length < 3 && (
               <div className="absolute bottom-8 right-8 animate-fade-in-up z-10">
                 <button 
                   onClick={drawCard}
                   className="group relative w-24 h-40 bg-gradient-to-br from-indigo-700 to-purple-900 rounded-lg border border-indigo-400 shadow-xl hover:-translate-y-2 transition-transform cursor-pointer"
                 >
                   <div className="absolute inset-1 border border-indigo-300/20 rounded"></div>
                   <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-xs text-indigo-200 w-full text-center opacity-0 group-hover:opacity-100 transition-opacity">
                     点击抽牌
                   </span>
                 </button>
               </div>
            )}

            {/* The Spread Slots */}
            <div className="grid grid-cols-3 gap-4 md:gap-12 z-0 px-4">
              {['past', 'present', 'future'].map((pos, idx) => {
                const card = drawnCards.find(c => c.position === pos);
                return (
                  <div key={pos} className="flex flex-col items-center gap-3">
                    <div className={`relative w-24 h-40 md:w-32 md:h-52 rounded-lg border-2 flex items-center justify-center transition-all duration-700 ${card ? 'border-amber-400/50 bg-slate-800' : 'border-slate-700/50 bg-slate-800/20 border-dashed'}`}>
                      
                      {!card && (
                        <span className="text-slate-600 text-xs font-bold uppercase tracking-widest opacity-50">{idx + 1}</span>
                      )}

                      {card && (
                        <div className="relative w-full h-full rounded-lg overflow-hidden animate-flip-in">
                          {/* Card Content Representation */}
                          <div className={`w-full h-full bg-gradient-to-b from-slate-200 to-slate-300 text-slate-900 p-2 flex flex-col items-center justify-between ${card.isReversed ? 'rotate-180' : ''}`}>
                             <div className="text-[10px] font-bold uppercase tracking-tighter w-full text-center border-b border-slate-400 pb-1">
                               {card.id < 22 ? 'Major' : 'Minor'}
                             </div>
                             
                             <div className="flex-grow flex items-center justify-center text-center px-1">
                               <div>
                                 <h4 className="font-cinzel font-bold text-sm md:text-base leading-tight">{card.nameEn}</h4>
                                 <p className="text-xs text-slate-600 font-serif mt-1">{card.name}</p>
                               </div>
                             </div>

                             <div className="text-[10px] w-full text-center border-t border-slate-400 pt-1">
                               {card.id}
                             </div>
                          </div>
                          
                          {/* Overlay for Reversed Label (so it's readable) */}
                          {card.isReversed && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                               <span className="bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm transform rotate-180">
                                 逆位 (Reversed)
                               </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <span className={`text-xs uppercase tracking-widest font-bold ${card ? 'text-amber-400' : 'text-slate-600'}`}>
                      {getPositionLabel(pos)}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <p className="absolute bottom-4 text-indigo-300/50 text-xs font-mono">
               {drawnCards.length === 0 ? '请抽取第一张牌：过去' : 
                drawnCards.length === 1 ? '请抽取第二张牌：现在' : 
                drawnCards.length === 2 ? '请抽取第三张牌：未来' : '牌阵已成，正在解析...'}
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes shuffle {
          0%, 100% { transform: translateX(0) rotate(0); }
          25% { transform: translateX(-10px) rotate(-5deg); }
          50% { transform: translateX(10px) rotate(5deg); }
          75% { transform: translateX(-5px) rotate(-2deg); }
        }
        .animate-shuffle {
          animation: shuffle 0.2s linear infinite;
        }
        @keyframes flip-in {
          0% { transform: rotateY(90deg); opacity: 0; }
          100% { transform: rotateY(0deg); opacity: 1; }
        }
        .animate-flip-in {
          animation: flip-in 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
};