
export function addGitLabMRPatchComposer() {
  const forkContainer = document.querySelector('#drupalorg-issue-forks');
  if (!forkContainer) return;

  const projectMatch = location.pathname.match(/\/project\/([^/]+)\/issues\//);
  if (!projectMatch) return;

  const project = projectMatch[1];
  const issueIdMatch = location.pathname.match(/\/issues\/(\d+)/);
  const issueId = issueIdMatch ? issueIdMatch[1] : 'Patch';

  const issueTitleEl = document.querySelector('.node__title, h1#page-title');
  const issueTitle = issueTitleEl ? issueTitleEl.textContent.trim() : 'Patch';
  const safeTitle = JSON.stringify(`#${issueId}: ${issueTitle}`).slice(1, -1);

  const mrLinks = forkContainer.querySelectorAll('a.merge-request');
  if (!mrLinks.length) return;

  const table = document.createElement('table');
  table.className = 'gitlab-mr-patches';
  table.style.marginTop = '1em';
  table.style.width = '100%';
  table.style.borderCollapse = 'collapse';

  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th style="text-align: left; border: 1px solid #ccc; border-right: 0; padding: 4px;">Merge Request</th>
      <th style="text-align: left; border: 1px solid #ccc; border-left: 0; border-right: 0; padding: 4px;">Patch URL</th>
      <th style="text-align: left; border: 1px solid #ccc; border-left: 0; padding: 4px;">Composer</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement('tbody');

  mrLinks.forEach(link => {
    const mrIdMatch = link.href.match(/\/merge_requests\/(\d+)/);
    if (!mrIdMatch) return;

    const mrId = mrIdMatch[1];
    const patchUrl = `https://git.drupalcode.org/project/${project}/-/merge_requests/${mrId}.patch`;

    const row = document.createElement('tr');

    const mrCell = document.createElement('td');
    mrCell.textContent = `!${mrId}`;
    mrCell.style.padding = '4px';
    mrCell.style.borderRight = '0';

    const urlCell = document.createElement('td');
    const urlLink = document.createElement('a');
    urlLink.href = patchUrl;
    urlLink.textContent = `${mrId}.patch`;
    urlCell.appendChild(urlLink);
    urlCell.style.padding = '4px';
    urlCell.style.borderLeft = '0';
    urlCell.style.borderRight = '0';

    const composerCell = document.createElement('td');
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy';
    copyButton.style.padding = '4px 8px';
    copyButton.style.backgroundColor = '#7cbc48';
    copyButton.style.color = '#fff';
    copyButton.style.border = 'none';
    copyButton.style.cursor = 'pointer';

    copyButton.addEventListener('click', () => {
      const composerJson = `"drupal/${project}": {
  "${safeTitle}": "${patchUrl}"
}`;
      navigator.clipboard.writeText(composerJson).then(() => {
        copyButton.textContent = '✔ Copied';
        setTimeout(() => {
          copyButton.textContent = 'Copy';
        }, 1500);
      });
    });

    composerCell.appendChild(copyButton);
    composerCell.style.padding = '4px';
    composerCell.style.borderLeft = '0';

    row.appendChild(mrCell);
    row.appendChild(urlCell);
    row.appendChild(composerCell);
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  forkContainer.appendChild(table);

  const warning = document.createElement('div');
  warning.style.marginTop = '0.5em';
  warning.style.padding = '0.5em';
  warning.style.backgroundColor = '#fff8e1';
  warning.style.border = '1px solid #ffcc80';
  warning.style.color = '#8a6d3b';
  warning.style.fontSize = '14px';
  warning.style.lineHeight = '1.4';
  warning.innerHTML = '⚠️ GitLab MR patch URLs may change when the branch is updated. For stability, download the patch and store it locally.';

  forkContainer.appendChild(warning);
}
