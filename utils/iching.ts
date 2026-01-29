import { YaoValue, BAGUA_DATA, TrigramInfo } from "../types";

// Standard Bagua Order: Qian, Dui, Li, Zhen, Xun, Kan, Gen, Kun
const TRIGRAM_LOOKUP: Record<string, number> = {
  "1,1,1": 1, // Qian
  "1,1,0": 2, // Dui
  "1,0,1": 3, // Li
  "1,0,0": 4, // Zhen
  "0,1,1": 5, // Xun
  "0,1,0": 6, // Kan
  "0,0,1": 7, // Gen
  "0,0,0": 8, // Kun
};

// Map: "UpperID,LowerID" -> Hexagram Name
// 1=Qian, 2=Dui, 3=Li, 4=Zhen, 5=Xun, 6=Kan, 7=Gen, 8=Kun
const HEXAGRAM_NAMES: Record<string, string> = {
  "1,1": "乾为天", "1,2": "天泽履", "1,3": "天火同人", "1,4": "天雷无妄", 
  "1,5": "天风姤", "1,6": "天水讼", "1,7": "天山遁", "1,8": "天地否",
  
  "2,1": "泽天夬", "2,2": "兑为泽", "2,3": "泽火革", "2,4": "泽雷随", 
  "2,5": "泽风大过", "2,6": "泽水困", "2,7": "泽山咸", "2,8": "泽地萃",
  
  "3,1": "火天大有", "3,2": "火泽睽", "3,3": "离为火", "3,4": "火雷噬嗑", 
  "3,5": "火风鼎", "3,6": "火水未济", "3,7": "火山旅", "3,8": "火地晋",
  
  "4,1": "雷天大壮", "4,2": "雷泽归妹", "4,3": "雷火丰", "4,4": "震为雷", 
  "4,5": "雷风恒", "4,6": "雷水解", "4,7": "雷山小过", "4,8": "雷地豫",
  
  "5,1": "风天小畜", "5,2": "风泽中孚", "5,3": "风火家人", "5,4": "风雷益", 
  "5,5": "巽为风", "5,6": "风水涣", "5,7": "风山渐", "5,8": "风地观",
  
  "6,1": "水天需", "6,2": "水泽节", "6,3": "水火既济", "6,4": "水雷屯", 
  "6,5": "水风井", "6,6": "坎为水", "6,7": "水山蹇", "6,8": "水地比",
  
  "7,1": "山天大畜", "7,2": "山泽损", "7,3": "山火贲", "7,4": "山雷颐", 
  "7,5": "山风蛊", "7,6": "山水蒙", "7,7": "艮为山", "7,8": "山地剥",
  
  "8,1": "地天泰", "8,2": "地泽临", "8,3": "地火明夷", "8,4": "地雷复", 
  "8,5": "地风升", "8,6": "地水师", "8,7": "地山谦", "8,8": "坤为地"
};

export const getTrigramFromLines = (lines: YaoValue[]): TrigramInfo => {
  const binary = lines.map(l => (l === 7 || l === 9) ? 1 : 0);
  const key = binary.join(",");
  const id = TRIGRAM_LOOKUP[key] || 8;
  return BAGUA_DATA[id];
};

export const getTransformedHexagram = (lines: YaoValue[]): YaoValue[] => {
  return lines.map(yao => {
    if (yao === 6) return 7; // Old Yin -> Young Yang
    if (yao === 9) return 8; // Old Yang -> Young Yin
    return yao; 
  });
};

export const hasMovingLines = (lines: YaoValue[]): boolean => {
  return lines.some(l => l === 6 || l === 9);
};

export const getHexagramInfo = (lines: YaoValue[]) => {
  const lowerLines = lines.slice(0, 3);
  const upperLines = lines.slice(3, 6);
  
  const lowerTrigram = getTrigramFromLines(lowerLines);
  const upperTrigram = getTrigramFromLines(upperLines);

  const lookupKey = `${upperTrigram.id},${lowerTrigram.id}`;
  const fullName = HEXAGRAM_NAMES[lookupKey] || `${upperTrigram.nature}${lowerTrigram.nature}`;

  return {
    lower: lowerTrigram,
    upper: upperTrigram,
    fullName: fullName,
    natureName: `${upperTrigram.nature}${lowerTrigram.nature}`
  };
};

// GanZhi (Stems and Branches) Utils
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

export const getGanZhiYear = (year: number): string => {
  // 1984 was Jia Zi (0,0)
  // (Year - 1984) % 60 ? 
  // Easier: (Year - 4) % 10 -> Stem. (Year - 4) % 12 -> Branch.
  // 2024: Stem (4-4)%10=0(Jia). Branch (4-4)%12=0(Zi)? No, 2024 is Jia Chen (Dragon).
  // 2024 is Dragon(5). So (2024 - 4) % 12 = 8? 
  // Let's rely on standard offset.
  // 4 AD was Jia Zi.
  const offsetYear = year - 4;
  const stemIndex = offsetYear % 10;
  const branchIndex = offsetYear % 12;
  return `${HEAVENLY_STEMS[stemIndex]}${EARTHLY_BRANCHES[branchIndex]}`;
};

export const getEarthlyBranchName = (index1To12: number): string => {
  // input 1=Zi, 2=Chou...
  return EARTHLY_BRANCHES[index1To12 - 1] || '';
};

// Helper to convert number 1-100 to Chinese numerals
export const toChineseNum = (num: number): string => {
  const chars = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  if (num === 100) return '一百';
  
  const unit = num % 10;
  const ten = Math.floor(num / 10);
  
  if (num < 10) return chars[num];
  
  let result = '';
  
  if (ten === 1) {
    result += '十';
  } else {
    result += chars[ten] + '十';
  }
  
  if (unit !== 0) {
    result += chars[unit];
  }
  
  return result;
};