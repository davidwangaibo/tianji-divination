// Cloudflare Worker - Gemini API Proxy
// 这个脚本运行在 Cloudflare 边缘服务器，API Keys 完全隐藏

export default {
    async fetch(request, env) {
        // 只允许 POST 请求
        if (request.method !== 'POST') {
            return new Response('Method Not Allowed', { status: 405 });
        }

        // CORS 头 - 允许你的网站访问
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*', // 生产环境建议改为你的域名
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        // 处理 OPTIONS 预检请求
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        try {
            // 解析请求
            const body = await request.json();
            const { prompt, model = 'gemini-1.5-flash' } = body;

            if (!prompt) {
                return new Response(JSON.stringify({ error: 'Prompt is required' }), {
                    status: 400,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                });
            }

            // API Key 池 - 存储在环境变量中（完全隐藏）
            const API_KEYS = [
                env.GEMINI_KEY_1,
                env.GEMINI_KEY_2,
                env.GEMINI_KEY_3,
                env.GEMINI_KEY_4,
                env.GEMINI_KEY_5,
                env.GEMINI_KEY_6,
            ].filter(Boolean); // 移除未定义的 keys

            if (API_KEYS.length === 0) {
                return new Response(JSON.stringify({ error: 'No API keys configured' }), {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                });
            }

            // 智能选择 API Key（负载均衡）
            const keyIndex = Math.floor(Date.now() / 60000 + Math.random() * API_KEYS.length) % API_KEYS.length;
            const selectedKey = API_KEYS[keyIndex];

            // 调用 Gemini API
            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${selectedKey}`;

            const geminiResponse = await fetch(geminiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }]
                }),
            });

            if (!geminiResponse.ok) {
                const error = await geminiResponse.text();
                console.error('Gemini API Error:', error);
                return new Response(JSON.stringify({
                    error: 'Gemini API request failed',
                    details: error
                }), {
                    status: geminiResponse.status,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                });
            }

            // 返回结果
            const result = await geminiResponse.json();
            return new Response(JSON.stringify(result), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });

        } catch (error) {
            console.error('Worker Error:', error);
            return new Response(JSON.stringify({
                error: 'Internal server error',
                message: error.message
            }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }
    },
};
