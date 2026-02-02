const https = require('https');

const data = JSON.stringify({
    prompt: "你好",
    model: "gemini-1.5-flash"
});

const options = {
    hostname: 'tianji-gemini-proxy.tianji-gemini-proxy.workers.dev',
    port: 443,
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = https.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);

    let responseData = '';
    res.on('data', (chunk) => {
        responseData += chunk;
    });

    res.on('end', () => {
        console.log('Response:', responseData.substring(0, 500));
    });
});

req.on('error', (error) => {
    console.error('Error:', error.message);
});

req.write(data);
req.end();
