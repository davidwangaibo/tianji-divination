// Node.js Runtime (Standard Vercel Serverless Function)
export default async function handler(req, res) {
    // 1. CORS Setup - Set headers for ALL responses
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 2. Handle OPTIONS preflight immediately
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 3. Method Check
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        // 4. Body Parsing (Vercel automatic for Node.js)
        const { prompt, model = 'gemini-2.5-flash' } = req.body || {};

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        // 5. Get Keys
        const API_KEYS = [
            process.env.GEMINI_KEY_1,
            process.env.GEMINI_KEY_2,
            process.env.GEMINI_KEY_3,
            process.env.GEMINI_KEY_4,
            process.env.GEMINI_KEY_5,
            process.env.GEMINI_KEY_6,
            process.env.GEMINI_KEY_7,
        ].filter(Boolean);

        if (API_KEYS.length === 0) {
            return res.status(500).json({ error: 'No API keys configured' });
        }

        // 6. Load Balancing & Retry Logic
        const baseIndex = Math.floor(Date.now() / 60000 + Math.random() * API_KEYS.length) % API_KEYS.length;
        let lastError = null;

        for (let i = 0; i < API_KEYS.length; i++) {
            const keyIndex = (baseIndex + i) % API_KEYS.length;
            const selectedKey = API_KEYS[keyIndex];
            const MAX_RETRIES_PER_KEY = 3;

            for (let retry = 0; retry < MAX_RETRIES_PER_KEY; retry++) {
                const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${selectedKey}`;

                try {
                    const geminiResponse = await fetch(geminiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
                    });

                    if (geminiResponse.ok) {
                        const result = await geminiResponse.json();
                        return res.status(200).json(result);
                    }

                    if (geminiResponse.status === 429) {
                        const waitTime = Math.pow(2, retry + 1) * 1000;
                        await new Promise(r => setTimeout(r, waitTime));
                        continue;
                    }

                    lastError = { status: geminiResponse.status, message: await geminiResponse.text() };
                    break;

                } catch (err) {
                    lastError = { message: err.message };
                    await new Promise(r => setTimeout(r, 1000));
                }
            }
        }

        // All failed
        return res.status(503).json({
            error: 'All API keys exhausted',
            lastError: lastError
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
