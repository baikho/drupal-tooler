
export function addInlinePatchPreviews() {
  const patchLinks = document.querySelectorAll('td.nodechanges-file-link a[href$=".patch"]');

  patchLinks.forEach(link => {
    if (link.closest('td').querySelector('.drupal-tooler-preview-btn')) return;

    const previewBtn = document.createElement('button');
    previewBtn.textContent = 'Preview';
    previewBtn.className = 'drupal-tooler-preview-btn';
    previewBtn.style.marginLeft = '8px';
    previewBtn.style.padding = '2px 6px';
    previewBtn.style.fontSize = '12px';
    previewBtn.style.cursor = 'pointer';
    previewBtn.style.backgroundColor = '#0074bd';
    previewBtn.style.color = '#fff';
    previewBtn.style.border = 'none';

    let previewRow = null;

    previewBtn.addEventListener('click', () => {
      if (previewRow) {
        previewRow.style.display = previewRow.style.display === 'none' ? 'table-row' : 'none';
        return;
      }

      const patchRow = link.closest('tr');
      previewRow = document.createElement('tr');

      const previewCell = document.createElement('td');
      previewCell.colSpan = patchRow.children.length;
      previewCell.style.padding = '8px';
      previewCell.style.backgroundColor = '#f9f9f9';
      previewCell.style.borderTop = '1px solid #ccc';

      const previewContainer = document.createElement('div');
      previewContainer.style.fontFamily = 'monospace';
      previewContainer.style.fontSize = '12px';
      previewContainer.style.whiteSpace = 'pre-wrap';
      previewContainer.style.wordBreak = 'break-word';
      previewContainer.style.overflowX = 'auto';
      previewContainer.style.width = '100%';
      previewContainer.style.maxWidth = '100vw';
      previewContainer.style.lineHeight = '1.4';

      previewContainer.textContent = 'Loading patch...';

      fetch(link.href)
        .then(res => res.text())
        .then(text => {
          previewContainer.textContent = '';
          const lines = text.split('\n');
          lines.forEach(line => {
            const span = document.createElement('span');
            span.textContent = line;
            span.style.display = 'block';
            span.style.width = '100%';
            span.style.boxSizing = 'border-box';
            if (line.startsWith('+') && !line.startsWith('+++')) {
              span.style.backgroundColor = '#e6ffed';
              span.style.color = '#22863a';
            } else if (line.startsWith('-') && !line.startsWith('---')) {
              span.style.backgroundColor = '#ffeef0';
              span.style.color = '#cb2431';
            } else {
              span.style.color = '#333';
            }
            previewContainer.appendChild(span);
          });
        })
        .catch(() => {
          previewContainer.textContent = 'Failed to load patch.';
        });

      previewCell.appendChild(previewContainer);
      previewRow.appendChild(previewCell);
      patchRow.parentNode.insertBefore(previewRow, patchRow.nextSibling);
    });

    link.parentElement.appendChild(previewBtn);
  });
}
