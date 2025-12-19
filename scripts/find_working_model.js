
const https = require('https');

const API_KEY = 'AIzaSyC9ZUZhe_U6z5fKqplhYW7upzc_0oFapJY'; // User's current key

const CANDIDATES = [
    // Stable Flash
    'gemini-1.5-flash',
    'gemini-1.5-flash-latest',
    'gemini-1.5-flash-001',
    'gemini-1.5-flash-002',
    'gemini-1.5-flash-8b',

    // Stable Pro
    'gemini-1.5-pro',
    'gemini-1.5-pro-latest',
    'gemini-1.5-pro-001',
    'gemini-1.5-pro-002',

    // Legacy / Standard
    'gemini-pro',
    'gemini-1.0-pro',

    // Experimental / New
    'gemini-2.0-flash-exp',
    'gemini-exp-1114',
    'gemini-exp-1121'
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
                    console.log(`[SUCCESS] ${model} worked! (200 OK)`);
                    resolve(model);
                } else {
                    console.log(`[FAILED] ${model} -> ${res.statusCode}`);
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
    console.log("Searching for a working model...");
    for (const m of CANDIDATES) {
        const result = await testModel(m);
        if (result) {
            console.log(`\n>>> WINNER: ${result} <<<`);
            return;
        }
    }
    console.log("\nNo working models found. All returned errors.");
}

run();
