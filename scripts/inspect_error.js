
const https = require('https');

const API_KEY = 'AIzaSyC9ZUZhe_U6z5fKqplhYW7upzc_0oFapJY';
const model = 'gemini-2.0-flash-exp';

console.log(`Inspecting 429 error for ${model}...`);

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
        console.log(`Status: ${res.statusCode}`);
        console.log(`Body: ${body}`);
    });
});

req.on('error', (e) => {
    console.log(`Error: ${e.message}`);
});

req.write(data);
req.end();
