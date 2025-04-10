(async () => {
    const patchUrl = browser.runtime.getURL('modules/composerPatchButton.js');
    const replyUrl = browser.runtime.getURL('modules/commentReplyButton.js');
    const gitlabPatchUrl = browser.runtime.getURL('modules/gitlabPatchFetcher.js');
    const highlightOPCommentsPath = browser.runtime.getURL('modules/highlightOPComments.js');
    const previewPath = browser.runtime.getURL('modules/patchPreview.js');

    const patchModule = await import(patchUrl);
    const replyModule = await import(replyUrl);
    const gitlabModule = await import(gitlabPatchUrl);
    import(highlightOPCommentsPath).then(mod => mod.highlightOPComments());
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
