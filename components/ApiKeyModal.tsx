import React, { useState, useEffect } from 'react';
import { X, Key, Save, AlertCircle } from 'lucide-react';

interface ApiKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
    lang: 'zh' | 'en';
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, lang }) => {
    const [apiKey, setApiKey] = useState('');

    useEffect(() => {
        const storedKey = localStorage.getItem('user_api_key');
        if (storedKey) setApiKey(storedKey);
    }, [isOpen]);

    const handleSave = () => {
        if (apiKey.trim()) {
            localStorage.setItem('user_api_key', apiKey.trim());
            onClose();
        } else {
            localStorage.removeItem('user_api_key');
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-md shadow-2xl relative mx-4">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-slate-500 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-full bg-amber-500/10 text-amber-500">
                        <Key size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-100">
                        {lang === 'zh' ? '配置 API Key' : 'Configure API Key'}
                    </h3>
                </div>

                <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-4 mb-6 flex items-start gap-3">
                    <AlertCircle className="text-blue-400 shrink-0 mt-0.5" size={18} />
                    <p className="text-sm text-blue-200/80 leading-relaxed">
                        {lang === 'zh'
                            ? '为了正常使用 AI 解卦功能，请在此输入您的 Google Gemini API Key。您的 Key 仅保存在本地浏览器中，不会上传到任何服务器。'
                            : 'To use AI interpretation features, please enter your Google Gemini API Key. Your key is stored locally in your browser and is never uploaded to any server.'}
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                            Gemini API Key
                        </label>
                        <input
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="AIzaSy..."
                            className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-mono text-sm"
                        />
                    </div>

                    <button
                        onClick={handleSave}
                        className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-bold py-3 rounded-lg shadow-lg shadow-amber-900/30 transition-all flex items-center justify-center gap-2"
                    >
                        <Save size={18} />
                        {lang === 'zh' ? '保存配置' : 'Save Configuration'}
                    </button>

                    <div className="text-center">
                        <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-500 hover:text-amber-400 underline decoration-slate-700 hover:decoration-amber-400 transition-all">
                            {lang === 'zh' ? '没有 Key? 点击此处获取' : 'No Key? Get one here'}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
