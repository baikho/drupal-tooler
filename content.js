function addComposerPatchColumn() {
  const table = document.querySelector('.nodechanges-file-changes');
  if (!table) return;

  const projectMatch = location.pathname.match(/\/project\/([^/]+)\/issues\/(\d+)/);
  if (!projectMatch) return;

  const project = projectMatch[1];
  const issueId = projectMatch[2];

  const issueTitleEl = document.querySelector('.node__title, h1#page-title');
  const issueTitle = issueTitleEl ? issueTitleEl.textContent.trim().replace(/["]/g, '\"') : 'Issue title here';

  const headerRow = table.querySelector('thead tr');
  const bodyRows = table.querySelectorAll('tbody tr');

  if (!headerRow || bodyRows.length === 0) return;

  const composerHeader = document.createElement('th');
  composerHeader.textContent = 'Composer';
  headerRow.appendChild(composerHeader);

  bodyRows.forEach(row => {
    const patchLinkEl = row.querySelector('td.nodechanges-file-link a');
    if (!patchLinkEl) return;

    const patchUrl = patchLinkEl.href;

    const composerButton = document.createElement('button');
    composerButton.innerHTML = 'Copy';
    composerButton.title = 'Copy Composer patch entry';
    composerButton.style.padding = '4px 8px';
    composerButton.style.fontSize = '14px';
    composerButton.style.cursor = 'pointer';
    composerButton.style.backgroundColor = '#7cbc48';
    composerButton.style.color = '#fff';
    composerButton.style.border = 'none';
    // composerButton.style.borderRadius = '4px';

    composerButton.addEventListener('click', () => {
      const safeTitle = JSON.stringify(`#${issueId}: ${issueTitle}`).slice(1, -1);
      const composerJson = `"drupal/${project}": {
        "${safeTitle}": "${patchUrl}"
      }`;
      navigator.clipboard.writeText(composerJson).then(() => {
        composerButton.textContent = '✔ Copied';
        setTimeout(() => {
          composerButton.innerHTML = 'Copy';
        }, 1500);
      });
    });

    const td = document.createElement('td');
    td.appendChild(composerButton);
    row.appendChild(td);
  });
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  addComposerPatchColumn();
} else {
  window.addEventListener('DOMContentLoaded', addComposerPatchColumn);
}
