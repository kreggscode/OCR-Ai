document.addEventListener('DOMContentLoaded', () => {
    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('fileInput');
    const outputText = document.getElementById('outputText');
    const translateBtn = document.getElementById('translateBtn');
    const simplifyBtn = document.getElementById('simplifyBtn');
    const status = document.getElementById('status');
    const loading = document.getElementById('loading');
    const language = document.getElementById('language');

    // No need for Tesseract worker

    // Load default language
    chrome.storage.sync.get(['defaultLanguage'], (result) => {
        if (result.defaultLanguage) {
            language.value = result.defaultLanguage;
        }
    });

    // Drag and drop
    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.classList.add('border-indigo-500', 'bg-indigo-100');
    });
    dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('border-indigo-500', 'bg-indigo-100');
    });
    dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dropArea.classList.remove('border-indigo-500', 'bg-indigo-100');
        const files = e.dataTransfer.files;
        if (files.length) handleFile(files[0]);
    });

    // Click to browse
    dropArea.addEventListener('click', () => {
        fileInput.click();
    });

    // File input
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) handleFile(e.target.files[0]);
    });

    // Copy button
    document.getElementById('copyBtn').addEventListener('click', () => {
        navigator.clipboard.writeText(outputText.value).then(() => {
            status.textContent = 'Text copied to clipboard!';
            setTimeout(() => status.textContent = '', 2000);
        }).catch(() => {
            status.textContent = 'Failed to copy.';
        });
    });

    // Buttons
    translateBtn.addEventListener('click', () => processText('translate'));
    simplifyBtn.addEventListener('click', () => processText('simplify'));

    async function handleFile(file) {
        status.textContent = 'Processing file...';
        loading.classList.remove('hidden');
        outputText.value = '';
        translateBtn.disabled = true;
        simplifyBtn.disabled = true;

        try {
            let extractedText = '';

            if (file.type.startsWith('image/')) {
                // OCR image using Pollinations AI vision
                document.getElementById('loadingText').textContent = 'Analyzing image...';
                const reader = new FileReader();
                const base64 = await new Promise((resolve) => {
                    reader.onload = () => resolve(reader.result);
                    reader.readAsDataURL(file);
                });
                const response = await fetch('https://text.pollinations.ai/openai', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        model: 'openai',
                        messages: [
                            {
                                role: 'user',
                                content: [
                                    { type: 'text', text: 'Extract all visible text from this image. Return only the text, no explanations.' },
                                    { type: 'image_url', image_url: { url: base64 } }
                                ]
                            }
                        ],
                        max_tokens: 1000,
                        temperature: 1
                    })
                });
                if (!response.ok) throw new Error('Vision API failed');
                const result = await response.json();
                extractedText = result.choices[0].message.content;
            } else {
                // Only images supported
                extractedText = 'Only image files are supported for OCR.';
            }

            outputText.value = extractedText || 'No text found in the file.';
            status.textContent = 'Text extracted successfully!';
            loading.classList.add('hidden');
            translateBtn.disabled = false;
            simplifyBtn.disabled = false;
        } catch (error) {
            console.error('Error processing file:', error);
            outputText.value = 'Error processing file. Please try again.';
            status.textContent = 'Error occurred.';
            loading.classList.add('hidden');
        }
    }

    // async function extractTextFromImage(file) {
    //     const { data: { text } } = await worker.recognize(file);
    //     return text;
    // }

    // async function extractTextFromPDF(file) {
    //     const arrayBuffer = await file.arrayBuffer();
    //     const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    //     let text = '';
    //     for (let i = 1; i <= Math.min(pdf.numPages, 10); i++) { // Limit to first 10 pages
    //         const page = await pdf.getPage(i);
    //         const content = await page.getTextContent();
    //         text += content.items.map(item => item.str).join(' ') + '\n';
    //     }
    //     return text;
    // }
    async function extractTextFromPDF(file) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let text = '';
        for (let i = 1; i <= Math.min(pdf.numPages, 10); i++) { // Limit to first 10 pages
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map(item => item.str).join(' ') + '\n';
        }
        return text;
    }

    async function processText(action) {
        const text = outputText.value;
        if (!text.trim()) {
            status.textContent = 'No text to process.';
            return;
        }

        status.textContent = `${action === 'translate' ? 'Translating' : 'Simplifying'}...`;

        try {
            const response = await fetch('https://text.pollinations.ai/openai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'openai',
                    messages: [
                        { role: 'system', content: action === 'translate' ? 'You are a translator.' : 'You simplify text.' },
                        { role: 'user', content: action === 'translate' ? `Translate this text to ${language.value}: ${text}` : `Simplify this text: ${text}` }
                    ],
                    temperature: 1
                })
            });

            if (!response.ok) throw new Error('API request failed');

            const result = await response.json();
            outputText.value = result.choices[0].message.content;
            status.textContent = `${action === 'translate' ? 'Translated' : 'Simplified'} successfully!`;
        } catch (error) {
            console.error('Error processing text:', error);
            status.textContent = 'Error processing text.';
        }
    }
});
