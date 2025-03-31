(async () => {
    const patchUrl = chrome.runtime.getURL('modules/composerPatchButton.js');
    const replyUrl = chrome.runtime.getURL('modules/commentReplyButton.js');
    const gitlabPatchUrl = chrome.runtime.getURL('modules/gitlabPatchFetcher.js');
    const previewPath = chrome.runtime.getURL('modules/patchPreview.js');

    const patchModule = await import(patchUrl);
    const replyModule = await import(replyUrl);
    const gitlabModule = await import(gitlabPatchUrl);
    import(previewPath).then(mod => mod.addInlinePatchPreviews());

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        patchModule.addComposerPatchColumn();
        replyModule.addReplyButtonsToComments();
        gitlabModule.addGitLabMRPatchComposer();
    } else {
        window.addEventListener('DOMContentLoaded', () => {
            patchModule.addComposerPatchColumn();
            replyModule.addReplyButtonsToComments();
            gitlabModule.addGitLabMRPatchComposer();
        });
    }
})();