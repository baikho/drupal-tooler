(async () => {
    const url = chrome.runtime.getURL('modules/composerPatchButton.js');
    const { addComposerPatchColumn } = await import(url);

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        addComposerPatchColumn();
    } else {
        window.addEventListener('DOMContentLoaded', addComposerPatchColumn);
    }
})();