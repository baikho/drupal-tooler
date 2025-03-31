export function addReplyButtonsToComments() {
    const comments = document.querySelectorAll('.comment');

    if (!comments.length) return;

    comments.forEach(comment => {
        if (comment.querySelector('.drupal-tooler-reply-btn')) return;

        const bodyEl = comment.querySelector('.field-name-comment-body');
        const permalinkEl = comment.querySelector('.permalink-wrapper a');

        if (!bodyEl || !permalinkEl) return;

        const replyBtn = document.createElement('button');
        replyBtn.className = 'drupal-tooler-reply-btn';
        replyBtn.innerHTML = '💬';
        replyBtn.title = 'Reply to this comment';
        replyBtn.style.marginTop = '0px';
        replyBtn.style.padding = '0px';
        replyBtn.style.backgroundColor = 'transparent';
        replyBtn.style.color = '#0074bd';
        replyBtn.style.border = 'none';
        replyBtn.style.cursor = 'pointer';
        replyBtn.style.float = 'left';
        replyBtn.style.fontSize = '16px';

        replyBtn.addEventListener('click', () => {
            const textarea = document.querySelector('#edit-nodechanges-comment-comment-body-und-0-value');
            if (!textarea) return;

            const linkHref = permalinkEl.getAttribute('href');
            const anchor = linkHref.split('#')[1];
            const linkText = permalinkEl.childNodes[1]?.textContent.trim() || '#?';
            const linkHtml = `<a href="#${anchor}">${linkText}</a>`;

            const currentValue = textarea.value.trim();

            textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
            textarea.focus();
            textarea.value = `${currentValue}\n\n${linkHtml}\n\n`.trim();
        });

        bodyEl.appendChild(replyBtn);
    });
}