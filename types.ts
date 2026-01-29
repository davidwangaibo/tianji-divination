// 6 = Old Yin (Changing to Yang) -- X
// 7 = Young Yang (Solid) --------
// 8 = Young Yin (Broken)   --   --
// 9 = Old Yang (Changing to Yin) -- O
export type YaoValue = 6 | 7 | 8 | 9;

export interface HexagramData {
  lines: YaoValue[]; // Index 0 is bottom line, Index 5 is top line
  method: 'coin' | 'time';
  timestamp: number;
}

export enum DivinationMethod {
  COIN = 'COIN',
  TIME = 'TIME',
  GUAN_YIN = 'GUAN_YIN',
  TAROT = 'TAROT',
  BAZI = 'BAZI',
  VEDIC = 'VEDIC'
}

export interface TarotCard {
  id: number;
  name: string;
  nameEn: string;
  isReversed: boolean; // 正位 or 逆位
  position: 'past' | 'present' | 'future';
}

export interface BirthData {
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  gender: 'male' | 'female';
  location?: string; // City, Country (Crucial for Vedic)
}

export interface TrigramInfo {
  id: number;
  name: string;      // e.g., 乾
  nature: string;    // e.g., 天
  element: string;   // e.g., 金
  character: string; // e.g., 健
}

export interface DivinationResult {
  hexagram?: HexagramData;
  lotNumber?: number; // 1-100 for Guan Yin
  tarotResult?: TarotCard[];
  birthData?: BirthData;
  method: DivinationMethod;
  question: string;
  interpretation?: string;
}

// Maps 3-bit integer to basic info. 
// Bits: [Bottom, Middle, Top] where 1=Yang, 0=Yin.
// Note: In arrays usually index 0 is bottom.
export const BAGUA_DATA: Record<number, TrigramInfo> = {
  1: { id: 1, name: '乾', nature: '天', element: '金', character: '健' }, // [1,1,1] -> 7
  2: { id: 2, name: '兑', nature: '泽', element: '金', character: '说' }, // [0,1,1] -> 3 (Note: binary conversion depends on bit order)
  3: { id: 3, name: '离', nature: '火', element: '火', character: '丽' },
  4: { id: 4, name: '震', nature: '雷', element: '木', character: '动' },
  5: { id: 5, name: '巽', nature: '风', element: '木', character: '入' },
  6: { id: 6, name: '坎', nature: '水', element: '水', character: '陷' },
  7: { id: 7, name: '艮', nature: '山', element: '土', character: '止' },
  8: { id: 8, name: '坤', nature: '地', element: '土', character: '顺' },
};

export const BAGUA_MAP_ARR: Record<number, number[]> = {
  1: [1, 1, 1],
  2: [0, 1, 1],
  // ... (Mapping used in utils logic mostly)
};

export type Language = 'zh' | 'en';