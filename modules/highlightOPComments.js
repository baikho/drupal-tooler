export function highlightOPComments() {
    const commentBlocks = document.querySelectorAll('.comment, .indented, .comment-wrapper');

    // Get the OP username from the first comment header
    const opHeader = document.querySelector('.comment .username, .indented .username, .comment-wrapper .username');
    const opUsername = opHeader ? opHeader.textContent.trim().toLowerCase() : null;

    if (!opUsername) return;

    commentBlocks.forEach(comment => {
        const usernameEl = comment.querySelector('.username');
        if (!usernameEl) return;

        const username = usernameEl.textContent.trim().toLowerCase();

        // Avoid double-badging
        if (usernameEl.parentElement.querySelector('.drupal-tooler-badge')) return;

        if (username === opUsername) {
            const badge = document.createElement('span');
            badge.textContent = 'OP';
            badge.className = 'drupal-tooler-badge op';
            usernameEl.insertAdjacentElement('afterend', badge);
        }
    });

    // Inject badge styles
    const style = document.createElement('style');
    style.textContent = `
.drupal-tooler-badge {
  background: #0678be;
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  margin-left: 6px;
  border-radius: 4px;
  font-weight: bold;
}
  `;
    document.head.appendChild(style);
}
