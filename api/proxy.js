export const config = {
    runtime: 'edge', // Use Edge Runtime for better performance similar to Cloudflare Workers
};

export default async function handler(request) {
    // CORS Headers
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle OPTIONS preflight
    if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    // Only allow POST requests
    if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
    }

    try {
        const body = await request.json();
        const { prompt, model = 'gemini-2.5-flash' } = body;

        if (!prompt) {
            return new Response(JSON.stringify({ error: 'Prompt is required' }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }

        // Get API keys from environment variables
        // Vercel exposes these via process.env in Node, but in Edge Runtime we access them differently
        // Actually in Vercel Edge Runtime, process.env IS supported for standard env vars
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
            return new Response(JSON.stringify({ error: 'No API keys configured' }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }

        // Load balancing index
        const baseIndex = Math.floor(Date.now() / 60000 + Math.random() * API_KEYS.length) % API_KEYS.length;
        let lastError = null;

        // Iterate through keys
        for (let i = 0; i < API_KEYS.length; i++) {
            const keyIndex = (baseIndex + i) % API_KEYS.length;
            const selectedKey = API_KEYS[keyIndex];

            // Inner retry loop for each key
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
                        return new Response(JSON.stringify(result), {
                            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                        });
                    }

                    if (geminiResponse.status === 429) {
                        // Rate limit - wait and retry same key
                        const waitTime = Math.pow(2, retry + 1) * 1000;
                        await new Promise(r => setTimeout(r, waitTime));
                        continue;
                    }

                    // Other errors - break inner loop to try next key
                    lastError = { status: geminiResponse.status, message: await geminiResponse.text() };
                    break;
                } catch (err) {
                    lastError = { message: err.message };
                    await new Promise(r => setTimeout(r, 1000));
                }
            }
        }

        return new Response(JSON.stringify({
            error: 'All API keys exhausted',
            lastError: lastError
        }), {
            status: 503,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
}
