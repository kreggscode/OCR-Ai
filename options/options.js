document.addEventListener('DOMContentLoaded', () => {
    const defaultLanguage = document.getElementById('defaultLanguage');
    const saveBtn = document.getElementById('save');
    const status = document.getElementById('status');

    // Load saved setting
    chrome.storage.sync.get(['defaultLanguage'], (result) => {
        if (result.defaultLanguage) {
            defaultLanguage.value = result.defaultLanguage;
        }
    });

    saveBtn.addEventListener('click', () => {
        chrome.storage.sync.set({ defaultLanguage: defaultLanguage.value }, () => {
            status.textContent = 'Saved!';
            setTimeout(() => status.textContent = '', 2000);
        });
    });
});
