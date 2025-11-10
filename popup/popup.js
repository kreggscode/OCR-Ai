document.addEventListener('DOMContentLoaded', () => {
    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('fileInput');
    const outputText = document.getElementById('outputText');
    const translateBtn = document.getElementById('translateBtn');
    const simplifyBtn = document.getElementById('simplifyBtn');
    const status = document.getElementById('status');
    const language = document.getElementById('language');

    let worker = null;

    // Initialize Tesseract worker
    async function initWorker() {
        if (!worker) {
            worker = await Tesseract.createWorker('eng');
        }
    }

    initWorker();

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

    // File input
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) handleFile(e.target.files[0]);
    });

    // Browse button
    document.getElementById('browseBtn').addEventListener('click', () => {
        fileInput.click();
    });

    // Buttons
    translateBtn.addEventListener('click', () => processText('translate'));
    simplifyBtn.addEventListener('click', () => processText('simplify'));

    async function handleFile(file) {
        status.textContent = 'Initializing OCR...';
        outputText.value = '';
        translateBtn.disabled = true;
        simplifyBtn.disabled = true;

        try {
            await initWorker();

            let extractedText = '';

            if (file.type.startsWith('image/')) {
                // OCR image
                const { data: { text } } = await worker.recognize(file);
                extractedText = text;
            } else if (file.type === 'application/pdf') {
                // Extract text from PDF
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                for (let i = 1; i <= Math.min(pdf.numPages, 10); i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    extractedText += textContent.items.map(item => item.str).join(' ') + '\n';
                }
            }

            outputText.value = extractedText || 'No text found in the file.';
            status.textContent = 'Text extracted successfully!';
            translateBtn.disabled = false;
            simplifyBtn.disabled = false;
        } catch (error) {
            console.error('Error processing file:', error);
            outputText.value = 'Error processing file. Please try again.';
            status.textContent = 'Error occurred.';
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
            const response = await fetch(`https://text.pollinations.ai/?prompt=${encodeURIComponent(
                action === 'translate' 
                    ? `Translate this text to ${language.value}: ${text}` 
                    : `Simplify this text for easier understanding: ${text}`
            )}&model=openai&temperature=1`);

            if (!response.ok) throw new Error('API request failed');

            const result = await response.text();
            outputText.value = result;
            status.textContent = `${action === 'translate' ? 'Translated' : 'Simplified'} successfully!`;
        } catch (error) {
            console.error('Error processing text:', error);
            status.textContent = 'Error processing text.';
        }
    }
});
