document.addEventListener('DOMContentLoaded', () => {
    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('fileInput');
    const outputText = document.getElementById('outputText');
    const translateBtn = document.getElementById('translateBtn');
    const simplifyBtn = document.getElementById('simplifyBtn');
    const status = document.getElementById('status');
    const language = document.getElementById('language');

    // Load default language
    chrome.storage.sync.get(['defaultLanguage'], (result) => {
        if (result.defaultLanguage) {
            language.value = result.defaultLanguage;
        }
    });

    // Drag and drop
    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.classList.add('border-blue-500');
    });
    dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('border-blue-500');
    });
    dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dropArea.classList.remove('border-blue-500');
        const files = e.dataTransfer.files;
        if (files.length) handleFile(files[0]);
    });

    // File input
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) handleFile(e.target.files[0]);
    });

    // Buttons
    translateBtn.addEventListener('click', () => processText('translate'));
    simplifyBtn.addEventListener('click', () => processText('simplify'));

    async function handleFile(file) {
        status.textContent = 'Processing...';
        outputText.value = '';
        translateBtn.disabled = true;
        simplifyBtn.disabled = true;

        try {
            let text = '';
            if (file.type.startsWith('image/')) {
                text = await extractTextFromImage(file);
            } else if (file.type === 'application/pdf') {
                text = await extractTextFromPDF(file);
            } else {
                throw new Error('Unsupported file type');
            }
            outputText.value = text;
            if (text.trim()) {
                translateBtn.disabled = false;
                simplifyBtn.disabled = false;
            }
            status.textContent = 'Text extracted successfully.';
        } catch (error) {
            status.textContent = 'Error: ' + error.message;
        }
    }

    async function extractTextFromImage(file) {
        const { data: { text } } = await Tesseract.recognize(file, 'eng');
        return text;
    }

    async function extractTextFromPDF(file) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let text = '';
        for (let i = 1; i <= pdf.numPages; i++) {
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
            status.textContent = 'Done.';
        } catch (error) {
            status.textContent = 'Error: ' + error.message;
        } finally {
            translateBtn.disabled = false;
            simplifyBtn.disabled = false;
        }
    }
});
