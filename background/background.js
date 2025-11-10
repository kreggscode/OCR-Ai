let lastCallTime = 0;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'translate') {
        translateText(request.text, request.language).then(sendResponse).catch((error) => sendResponse({ error: error.message }));
        return true;
    } else if (request.action === 'simplify') {
        simplifyText(request.text).then(sendResponse).catch((error) => sendResponse({ error: error.message }));
        return true;
    }
});

async function translateText(text, language) {
    const prompt = `Translate this text to ${language}: ${text}`;
    return await callAI(prompt);
}

async function simplifyText(text) {
    const prompt = `Simplify this text: ${text}`;
    return await callAI(prompt);
}

async function callAI(prompt) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime;
    if (timeSinceLastCall < 15000) {
        const delay = 15000 - timeSinceLastCall;
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    lastCallTime = Date.now();

    const response = await fetch('https://text.pollinations.ai/openai', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'openai',
            messages: [{ role: 'user', content: prompt }],
            temperature: 1,
            max_tokens: 1000
        })
    });

    if (!response.ok) {
        throw new Error('API request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content;
}
