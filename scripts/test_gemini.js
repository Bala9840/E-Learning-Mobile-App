
const https = require('https');

const API_KEY = 'AIzaSyC9ZUZhe_U6z5fKqplhYW7upzc_0oFapJY'; // New User Key
const CANDIDATES = [
    'gemini-1.5-flash',
    'gemini-1.5-pro',
    'gemini-pro',
    'gemini-2.0-flash-exp',
    'gemini-2.0-flash'
];

function testModel(model) {
    return new Promise((resolve) => {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
        const data = JSON.stringify({
            contents: [{ parts: [{ text: "Hello" }] }]
        });

        const req = https.request(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        }, (res) => {
            let body = '';
            res.on('data', c => body += c);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    console.log(`[SUCCESS] ${model} worked!`);
                    resolve(model);
                } else {
                    console.log(`[FAILED] ${model} returned ${res.statusCode}`);
                    resolve(null);
                }
            });
        });

        req.on('error', (e) => {
            console.log(`[ERROR] ${model}: ${e.message}`);
            resolve(null);
        });

        req.write(data);
        req.end();
    });
}

async function run() {
    console.log("Testing generation with NEW KEY...");
    for (const m of CANDIDATES) {
        const result = await testModel(m);
        if (result) return;
    }
    console.log("All attempts failed.");
}

run();
