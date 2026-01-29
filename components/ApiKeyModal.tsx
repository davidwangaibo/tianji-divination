import React, { useState, useEffect } from 'react';
import { X, Key, Save, AlertCircle, QrCode } from 'lucide-react';

interface ApiKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
    lang: 'zh' | 'en';
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, lang }) => {
    const [apiKey, setApiKey] = useState('');
    const [baseUrl, setBaseUrl] = useState('');
    const [model, setModel] = useState('gemini-pro');
    const [showQr, setShowQr] = useState(false);

    useEffect(() => {
        const storedKey = localStorage.getItem('user_api_key');
        if (storedKey) setApiKey(storedKey);
        const storedBaseUrl = localStorage.getItem('user_base_url');
        if (storedBaseUrl) setBaseUrl(storedBaseUrl);
        const storedModel = localStorage.getItem('user_model');
        if (storedModel) setModel(storedModel);
    }, [isOpen]);

    const handleSave = () => {
        if (apiKey.trim()) {
            localStorage.setItem('user_api_key', apiKey.trim());
        } else {
            localStorage.removeItem('user_api_key');
        }

        if (baseUrl.trim()) {
            localStorage.setItem('user_base_url', baseUrl.trim());
        } else {
            localStorage.removeItem('user_base_url');
        }

        if (model) {
            localStorage.setItem('user_model', model);
        }

        onClose();
    };

    const getShareUrl = () => {
        const params = new URLSearchParams();
        if (apiKey) params.append('settings_key', apiKey);
        if (baseUrl) params.append('settings_url', baseUrl);
        if (model) params.append('settings_model', model);
        // Use current origin
        return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-md shadow-2xl relative mx-4 max-h-[90vh] overflow-y-auto">
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
                        {lang === 'zh' ? '配置 API 服务' : 'Configure API Service'}
                    </h3>
                </div>

                {showQr ? (
                    <div className="flex flex-col items-center justify-center space-y-4 py-4">
                        <div className="bg-white p-4 rounded-lg">
                            {/* Uses a public QR code API - simple and effective */}
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(getShareUrl())}`}
                                alt="Configuration QR Code"
                                className="w-48 h-48"
                            />
                        </div>
                        <p className="text-sm text-center text-slate-400 max-w-xs">
                            {lang === 'zh'
                                ? '请使用手机浏览器或相机扫描此码，即可自动同步 API Key 和配置到手机。请勿在公共场合展示此码。'
                                : 'Scan with mobile camera to sync settings. Warning: Contains your API Key.'}
                        </p>
                        <button
                            onClick={() => setShowQr(false)}
                            className="text-amber-500 hover:text-amber-400 text-sm underline"
                        >
                            {lang === 'zh' ? '返回配置' : 'Back to Settings'}
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-4 mb-6 flex items-start gap-3">
                            <AlertCircle className="text-blue-400 shrink-0 mt-0.5" size={18} />
                            <p className="text-sm text-blue-200/80 leading-relaxed">
                                {lang === 'zh'
                                    ? '请输入 Gemini API Key。如果不确定模型兼容性，请选择 "gemini-1.5-flash"。'
                                    : 'Enter your Gemini API Key. Use "gemini-1.5-flash" for best compatibility.'}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                    Gemini API Key <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="password"
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    placeholder="AIzaSy..."
                                    className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-mono text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                    AI Model
                                </label>
                                <select
                                    value={model}
                                    onChange={(e) => setModel(e.target.value)}
                                    className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-mono text-sm"
                                >
                                    <option value="gemini-pro">gemini-pro (推荐/Stable)</option>
                                    <option value="gemini-1.5-flash">gemini-1.5-flash (快速/Fast)</option>
                                    <option value="gemini-1.5-pro">gemini-1.5-pro (专业/Pro)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                    Base URL (Optional Proxy)
                                </label>
                                <input
                                    type="text"
                                    value={baseUrl}
                                    onChange={(e) => setBaseUrl(e.target.value)}
                                    placeholder="https://generativelanguage.googleapis.com"
                                    className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-mono text-sm"
                                />
                                <p className="text-[10px] text-slate-500 mt-1">
                                    {lang === 'zh' ? '默认: https://generativelanguage.googleapis.com' : 'Default: https://generativelanguage.googleapis.com'}
                                </p>
                            </div>

                            <div className="grid grid-cols-5 gap-3">
                                <button
                                    onClick={handleSave}
                                    className="col-span-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-bold py-3 rounded-lg shadow-lg shadow-amber-900/30 transition-all flex items-center justify-center gap-2"
                                >
                                    <Save size={18} />
                                    {lang === 'zh' ? '保存配置' : 'Save Configuration'}
                                </button>
                                <button
                                    onClick={() => setShowQr(true)}
                                    className="col-span-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg flex items-center justify-center border border-slate-700 transition-all"
                                    title={lang === 'zh' ? "扫码同步到手机" : "Sync to Mobile"}
                                >
                                    <QrCode size={20} />
                                </button>
                            </div>

                            <div className="text-center">
                                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-500 hover:text-amber-400 underline decoration-slate-700 hover:decoration-amber-400 transition-all">
                                    {lang === 'zh' ? '没有 Key? 点击此处获取' : 'No Key? Get one here'}
                                </a>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
