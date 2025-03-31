(async () => {
    const patchUrl = chrome.runtime.getURL('modules/composerPatchButton.js');
    const replyUrl = chrome.runtime.getURL('modules/commentReplyButton.js');

    const patchModule = await import(patchUrl);
    const replyModule = await import(replyUrl);

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        patchModule.addComposerPatchColumn();
        replyModule.addReplyButtonsToComments();
    } else {
        window.addEventListener('DOMContentLoaded', () => {
            patchModule.addComposerPatchColumn();
            replyModule.addReplyButtonsToComments();
        });
    }
})();