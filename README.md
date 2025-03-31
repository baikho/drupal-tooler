# Drupal Tooler

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-brightgreen?logo=googlechrome&logoColor=white)](https://chrome.google.com/webstore)
[![Drupal.org](https://img.shields.io/badge/Drupal.org-Enhanced-blue?logo=drupal)](https://www.drupal.org)
[![License: MIT](https://img.shields.io/github/license/baikho/drupal-tooler)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/baikho/drupal-tooler)](https://github.com/baikho/drupal-tooler/commits/1.x)
[![Stars](https://img.shields.io/github/stars/baikho/drupal-tooler?style=social)](https://github.com/baikho/drupal-tooler/stargazers)

| ![Drupal Tooler Icon](https://github.com/user-attachments/assets/009154fc-8551-4a1b-b918-0b46b363930c) | A lightweight Chrome Extension that enhances Drupal.org issue pages with useful tools for developers. |
|------------------------------------|------------------------------------------------------------------------|

---

## ✅ Features

### 📦 Composer Patch Button

- Adds a **"Composer"** column to patch file tables on issue pages
- Generates a valid Composer patch entry like:

  ```json
  "drupal/[project_name]": {
    "#123456: Issue title": "https://www.drupal.org/files/issues/..."
  }
  ```

---

### 💬 Reply Button

- Adds a 💬 "Reply" icon button to each comment on issue pages. When clicked:
- Appends a permalink to the comment (e.g. `<a href="#comment-14937840">#13</a>`)

---

### 🛠 GitLab MR Patch Composer

- Detects GitLab merge requests in the issue fork block
- Creates a table showing:
  - MR number (e.g. `!8`)
  - Patch download link (`.patch`)
  - "Copy" button with Composer patch JSON

---

### 👀 Inline Patch Previews

Adds a "Preview" button next to each patch file on issue pages.

- Expands a full-width row below the patch row
- Fetches and displays patch contents inline
- Adds syntax highlighting:
  - ✅ Light green for added lines
  - ❌ Light red for removed lines
- Great for reviewing diffs without leaving the page

---

## 🛠 Installation

1. Clone or download the repository
2. Visit `chrome://extensions` in your browser
3. Enable **Developer Mode**
4. Click **Load unpacked**
5. Select the project folder

---

## 📦 License

MIT — go wild and contribute back!
