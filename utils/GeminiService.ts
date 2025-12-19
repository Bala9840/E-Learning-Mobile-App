export const GEMINI_API_KEY = 'AIzaSyC9ZUZhe_U6z5fKqplhYW7upzc_0oFapJY';

export async function sendMessageToGemini(message: string, apiKey: string) {
    if (!apiKey) apiKey = GEMINI_API_KEY;
    if (!apiKey) throw new Error('API Key is missing');

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const MAX_RETRIES = 3;
    let attempt = 0;

    while (attempt < MAX_RETRIES) {
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

            if (response.ok) {
                const data = await response.json();
                if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
                    return data.candidates[0].content.parts[0].text;
                } else {
                    console.warn('Gemini empty response:', data);
                    throw new Error('No response content from Gemini');
                }
            } else {
                // Handle Errors
                if (response.status === 429) {
                    attempt++;
                    console.log(`Gemini 429 Hit. Retrying attempt ${attempt}...`);
                    if (attempt >= MAX_RETRIES) {
                        return "I'm receiving too many messages right now. Please wait 30 seconds and try again! (Free Tier Limit)";
                    }
                    // Exponential backoff: 2s, 4s, 8s...
                    await new Promise(resolve => setTimeout(resolve, 2000 * attempt));
                    continue;
                }

                const errorText = await response.text();
                // For other errors (404, 403, 500), throw immediately
                throw new Error(`Gemini Error: ${response.status} - ${errorText}`);
            }

        } catch (error: any) {
            // If it's the retry loop continuing, don't throw yet
            if (attempt < MAX_RETRIES && error.message.includes('429')) {
                // network error handling could go here
                continue;
            }
            console.error('Gemini Service Error:', error);
            throw error;
        }
    }
}
