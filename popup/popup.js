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
            let text = '';
            if (file.type.startsWith('image/')) {
                status.textContent = 'Extracting text from image...';
                text = await extractTextFromImage(file);
            } else if (file.type === 'application/pdf') {
                status.textContent = 'Extracting text from PDF...';
                text = await extractTextFromPDF(file);
            } else {
                throw new Error('Unsupported file type. Please upload an image or PDF.');
            }
            outputText.value = text.trim();
            if (text.trim()) {
                translateBtn.disabled = false;
                simplifyBtn.disabled = false;
                status.textContent = 'Text extracted successfully!';
            } else {
                status.textContent = 'No text found in the file.';
            }
        } catch (error) {
            status.textContent = 'Error: ' + error.message;
            console.error(error);
        }
    }

    async function extractTextFromImage(file) {
        const { data: { text } } = await worker.recognize(file);
        return text;
    }

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
        const text = outputText.value.trim();
        if (!text) return;

        status.textContent = 'Processing...';
        translateBtn.disabled = true;
        simplifyBtn.disabled = true;

        try {
            const result = await chrome.runtime.sendMessage({
                action,
                text,
                language: action === 'translate' ? language.value : null
            });
            outputText.value = result;
            status.textContent = 'Done!';
        } catch (error) {
            status.textContent = 'Error: ' + error.message;
        } finally {
            translateBtn.disabled = false;
            simplifyBtn.disabled = false;
        }
    }
});
