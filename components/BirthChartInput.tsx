import React, { useState } from 'react';
import { BirthData, DivinationMethod, Language } from '../types';
import { Calendar, Clock, User, MapPin } from 'lucide-react';

interface BirthChartInputProps {
  onComplete: (data: BirthData) => void;
  method?: DivinationMethod; // To differentiate between Bazi and Vedic
  lang: Language;
}

export const BirthChartInput: React.FC<BirthChartInputProps> = ({ onComplete, method = DivinationMethod.BAZI, lang }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');

  const isVedic = method === DivinationMethod.VEDIC;

  const handleSubmit = () => {
    if (date && time) {
      // For Vedic, location is strictly required for accuracy. For Bazi, it's good to have.
      if (isVedic && !location.trim()) {
        alert(lang === 'zh' ? "印度占星需要精确的出生地点来计算上升星座，请输入城市名称。" : "Vedic Astrology requires precise location for Ascendant calculation. Please enter city.");
        return;
      }
      onComplete({ date, time, gender, location });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-8 bg-slate-800/50 rounded-xl border border-slate-700 shadow-xl backdrop-blur-sm animate-fade-in">

      <div className="mb-8 text-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border ${isVedic ? 'bg-indigo-900/30 border-indigo-500/30' : 'bg-amber-900/30 border-amber-500/30'}`}>
          <Calendar className={isVedic ? "text-indigo-400" : "text-amber-500"} size={32} />
        </div>
        <h3 className={`text-xl font-cinzel font-bold mb-2 ${isVedic ? 'text-indigo-300' : 'text-amber-400'}`}>
          {isVedic ? (lang === 'zh' ? '输入吠陀星盘信息' : 'Enter Vedic Details') : (lang === 'zh' ? '输入生辰八字' : 'Enter Birth Details')}
        </h3>
        <p className="text-slate-400 text-sm">
          {isVedic
            ? (lang === 'zh' ? '请输入出生信息，AI将根据恒星黄道（Sidereal Zodiac）为您排盘。' : 'Enter birth details. AI will chart using Sidereal Zodiac.')
            : (lang === 'zh' ? '请输入您的公历（阳历）出生信息，AI将为您排盘推演。' : 'Enter your Gregorian birth details for analysis.')}
        </p>
      </div>

      <div className="w-full space-y-5">

        {/* Date Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-slate-300 text-sm font-bold uppercase tracking-wider">
            <Calendar size={14} className={isVedic ? "text-indigo-400" : "text-amber-500"} /> {lang === 'zh' ? '出生日期 (公历)' : 'Date of Birth (Gregorian)'}
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`w-full bg-slate-900/80 border rounded-lg p-3 text-slate-200 outline-none transition-all ${isVedic ? 'border-slate-600 focus:ring-2 focus:ring-indigo-500' : 'border-slate-600 focus:ring-2 focus:ring-amber-500'}`}
          />
        </div>

        {/* Time Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-slate-300 text-sm font-bold uppercase tracking-wider">
            <Clock size={14} className={isVedic ? "text-indigo-400" : "text-amber-500"} /> {lang === 'zh' ? '出生时间' : 'Birth Time'}
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={`w-full bg-slate-900/80 border rounded-lg p-3 text-slate-200 outline-none transition-all ${isVedic ? 'border-slate-600 focus:ring-2 focus:ring-indigo-500' : 'border-slate-600 focus:ring-2 focus:ring-amber-500'}`}
          />
          <p className="text-xs text-slate-500 italic px-1">{lang === 'zh' ? `准确的时间对于${isVedic ? '确定上升星座（Lagna）' : '确定时柱'}至关重要。` : `Accurate time is critical for ${isVedic ? 'Ascendant (Lagna)' : 'Hour Pillar'}.`}</p>
        </div>

        {/* Location Input (New) */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-slate-300 text-sm font-bold uppercase tracking-wider">
            <MapPin size={14} className={isVedic ? "text-indigo-400" : "text-amber-500"} /> {lang === 'zh' ? '出生城市' : 'City of Birth'}
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={lang === 'zh' ? "例如：中国北京市、上海市、London UK" : "e.g. Beijing China, London UK"}
            className={`w-full bg-slate-900/80 border rounded-lg p-3 text-slate-200 outline-none transition-all ${isVedic ? 'border-slate-600 focus:ring-2 focus:ring-indigo-500' : 'border-slate-600 focus:ring-2 focus:ring-amber-500'}`}
          />
          {isVedic && <p className="text-xs text-indigo-400/70 italic px-1">{lang === 'zh' ? '* 印度占星必须提供地点以计算星盘。' : '* Location is required for Vedic chart.'}</p>}
        </div>

        {/* Gender Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-slate-300 text-sm font-bold uppercase tracking-wider">
            <User size={14} className={isVedic ? "text-indigo-400" : "text-amber-500"} /> {lang === 'zh' ? '性别' : 'Gender'}
          </label>
          <div className="flex gap-4">
            <label className={`flex-1 p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-center gap-2 ${gender === 'male' ? (isVedic ? 'bg-indigo-900/40 border-indigo-500 text-indigo-100' : 'bg-amber-900/40 border-amber-500 text-amber-100') : 'bg-slate-900/40 border-slate-700 text-slate-500 hover:border-slate-500'}`}>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={() => setGender('male')}
                className="hidden"
              />
              <span>{lang === 'zh' ? '男' : 'Male'}</span>
            </label>
            <label className={`flex-1 p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-center gap-2 ${gender === 'female' ? (isVedic ? 'bg-indigo-900/40 border-indigo-500 text-indigo-100' : 'bg-amber-900/40 border-amber-500 text-amber-100') : 'bg-slate-900/40 border-slate-700 text-slate-500 hover:border-slate-500'}`}>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={() => setGender('female')}
                className="hidden"
              />
              <span>{lang === 'zh' ? '女' : 'Female'}</span>
            </label>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!date || !time || (isVedic && !location)}
          className={`w-full mt-4 py-4 font-bold rounded-lg shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 text-white disabled:opacity-50 disabled:cursor-not-allowed ${isVedic ? 'bg-gradient-to-r from-indigo-700 to-purple-600 hover:from-indigo-600 hover:to-purple-500' : 'bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500'}`}
        >
          {isVedic ? (lang === 'zh' ? '开启星盘 (Jyotish)' : 'Generate Vedic Chart') : (lang === 'zh' ? '开始批命' : 'Analyze Bazi')}
        </button>

      </div>
    </div>
  );
};