function addComposerPatchColumn() {
  const tables = document.querySelectorAll('.nodechanges-file-changes');
  if (!tables.length) return;

  const projectMatch = location.pathname.match(/\/project\/([^/]+)\/issues\/(\d+)/);
  if (!projectMatch) return;

  const project = projectMatch[1];
  const issueId = projectMatch[2];

  const issueTitleEl = document.querySelector('.node__title, h1#page-title');
  const issueTitle = issueTitleEl ? issueTitleEl.textContent.trim() : 'Patch';
  const safeTitle = JSON.stringify(`#${issueId}: ${issueTitle}`).slice(1, -1);

  tables.forEach(table => {
    const headerRow = table.querySelector('thead tr');
    const bodyRows = table.querySelectorAll('tbody tr');

    if (!headerRow || bodyRows.length === 0) return;

    if (!headerRow.querySelector('th:last-child')?.textContent.includes('Composer')) {
      const composerHeader = document.createElement('th');
      composerHeader.textContent = 'Composer';
      headerRow.appendChild(composerHeader);
    }

    bodyRows.forEach(row => {
      // Skip if already has button
      if (row.querySelector('td:last-child button')) return;

      const patchLinkEl = row.querySelector('td.nodechanges-file-link a');
      if (!patchLinkEl) return;

      const patchUrl = patchLinkEl.href;

      // Only continue if it ends with .patch
      if (!patchUrl.endsWith('.patch')) return;

      const composerButton = document.createElement('button');
      composerButton.textContent = 'Copy';
      composerButton.title = 'Copy Composer patch entry';
      composerButton.style.padding = '4px 8px';
      composerButton.style.fontSize = '14px';
      composerButton.style.cursor = 'pointer';
      composerButton.style.backgroundColor = '#7cbc48';
      composerButton.style.color = '#fff';
      composerButton.style.border = 'none';

      composerButton.addEventListener('click', () => {
        const composerJson = `"drupal/${project}": {
  "${safeTitle}": "${patchUrl}"
}`;
        navigator.clipboard.writeText(composerJson).then(() => {
          composerButton.textContent = '✔ Copied';
          setTimeout(() => {
            composerButton.textContent = 'Copy';
          }, 1500);
        });
      });

      const td = document.createElement('td');
      td.appendChild(composerButton);
      row.appendChild(td);
    });
  });
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  addComposerPatchColumn();
} else {
  window.addEventListener('DOMContentLoaded', addComposerPatchColumn);
}