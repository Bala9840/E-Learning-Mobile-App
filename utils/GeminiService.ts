export const GEMINI_API_KEY = 'AIzaSyDsnrfc_88vHJOEBVrF9sLfWXbZgAn0O78';

export async function sendMessageToGemini(message: string, apiKey: string) {
    if (!apiKey) apiKey = GEMINI_API_KEY; // Fallback to hardcoded if not provided
    if (!apiKey) throw new Error('API Key is missing');

    // Use gemini-flash-latest for stable production access (avoids 429 on experimental models)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: message
                    }]
                }]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Gemini API Error:', errorText);
            try {
                const errorJson = JSON.parse(errorText);
                throw new Error(errorJson.error?.message || 'Gemini API Error');
            } catch (e) {
                throw new Error(`Gemini Error: ${response.status} ${response.statusText}`);
            }
        }

        const data = await response.json();

        if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        } else {
            console.warn('Gemini empty response:', data);
            throw new Error('No response content from Gemini');
        }
    } catch (error: any) {
        console.error('Gemini Service Error:', error);
        throw error;
    }
}
