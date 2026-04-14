// Default links data
const DEFAULT_LINKS = {
  dsa: [
    { url: 'https://leetcode.com/problemset/', title: 'LeetCode Problems', weight: 2 },
    { url: 'https://neetcode.io/', title: 'NeetCode Roadmap', weight: 2 },
    { url: 'https://www.algoexpert.io/', title: 'AlgoExpert', weight: 1 },
    { url: 'https://codeforces.com/', title: 'Codeforces', weight: 1 },
    { url: 'https://www.hackerrank.com/domains/algorithms', title: 'HackerRank Algorithms', weight: 1 },
    { url: 'https://www.geeksforgeeks.org/data-structures/', title: 'GeeksforGeeks DS', weight: 1 },
    { url: 'https://visualgo.net/', title: 'VisuAlgo', weight: 1 },
    { url: 'https://www.bigocheatsheet.com/', title: 'Big-O Cheat Sheet', weight: 1 }
  ],
  system_design: [
    { url: 'https://github.com/donnemartin/system-design-primer', title: 'System Design Primer', weight: 3, pinned: true },
    { url: 'https://www.designgurus.io/', title: 'Design Gurus', weight: 2 },
    { url: 'https://bytebytego.com/', title: 'ByteByteGo', weight: 2 },
    { url: 'https://systemdesignprimer.com/', title: 'System Design Primer Site', weight: 1 },
    { url: 'https://www.youtube.com/@ByteByteGo', title: 'ByteByteGo YouTube', weight: 1 },
    { url: 'https://www.interviewbit.com/system-design-interview-questions/', title: 'InterviewBit Questions', weight: 1 }
  ],
  backend: [
    { url: 'https://roadmap.sh/backend', title: 'Backend Roadmap', weight: 2, pinned: true },
    { url: 'https://12factor.net/', title: 'The Twelve-Factor App', weight: 1 },
    { url: 'https://martinfowler.com/', title: 'Martin Fowler\'s Blog', weight: 1 },
    { url: 'https://github.com/kamranahmedse/developer-roadmap', title: 'Developer Roadmap', weight: 1 },
    { url: 'https://www.postgresql.org/docs/', title: 'PostgreSQL Docs', weight: 1 },
    { url: 'https://redis.io/docs/', title: 'Redis Documentation', weight: 1 },
    { url: 'https://docs.docker.com/', title: 'Docker Docs', weight: 1 }
  ],
  behavioral: [
    { url: 'https://www.techinterviewhandbook.org/behavioral-interview/', title: 'Tech Interview Handbook', weight: 3 },
    { url: 'https://www.levels.fyi/', title: 'Levels.fyi', weight: 1 },
    { url: 'https://www.amazon.jobs/content/en/our-workplace/leadership-principles', title: 'Amazon Leadership Principles', weight: 1 },
    { url: 'https://www.themuse.com/advice/star-interview-method', title: 'STAR Method Guide', weight: 2 },
    { url: 'https://yangshun.github.io/tech-interview-handbook/behavioral-questions/', title: 'Behavioral Questions Bank', weight: 2 },
    { url: 'https://www.indeed.com/career-advice/interviewing/how-to-prepare-for-a-behavioral-interview', title: 'Behavioral Prep Guide', weight: 1 }
  ]
};

let currentCategory = 'dsa';
let linksData = {};

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  await loadLinks();
  setupEventListeners();
  renderLinks();
});

// Load links from chrome.storage
async function loadLinks() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['stride_links'], (result) => {
      if (result.stride_links) {
        linksData = result.stride_links;
      } else {
        linksData = JSON.parse(JSON.stringify(DEFAULT_LINKS));
      }
      resolve();
    });
  });
}

// Save links to chrome.storage
async function saveLinks() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({ stride_links: linksData }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
}

// Setup event listeners
function setupEventListeners() {
  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      renderLinks();
    });
  });

  // Save button
  document.getElementById('saveBtn').addEventListener('click', async () => {
    try {
      await saveLinks();
      showStatus('Changes saved successfully!', 'success');
    } catch (error) {
      showStatus('Error saving changes: ' + error.message, 'error');
    }
  });

  // Reset button
  document.getElementById('resetBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all links to defaults? This cannot be undone.')) {
      linksData = JSON.parse(JSON.stringify(DEFAULT_LINKS));
      renderLinks();
      showStatus('Reset to defaults (remember to save!)', 'success');
    }
  });

  // Export button
  document.getElementById('exportBtn').addEventListener('click', () => {
    const dataStr = JSON.stringify(linksData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stride-links-export.json';
    a.click();
    URL.revokeObjectURL(url);
    showStatus('Links exported!', 'success');
  });

  // Import button
  document.getElementById('importBtn').addEventListener('click', () => {
    document.getElementById('importFile').click();
  });

  document.getElementById('importFile').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          linksData = imported;
          renderLinks();
          showStatus('Links imported successfully (remember to save!)', 'success');
        } catch (error) {
          showStatus('Error importing file: Invalid JSON', 'error');
        }
      };
      reader.readAsText(file);
    }
  });

  // Add link button
  document.getElementById('addLinkBtn').addEventListener('click', () => {
    const newLink = {
      url: '',
      title: '',
      weight: 1,
      pinned: false
    };
    linksData[currentCategory].push(newLink);
    renderLinks();
  });
}

// Render links for current category
function renderLinks() {
  const linksList = document.getElementById('linksList');
  const links = linksData[currentCategory] || [];

  if (links.length === 0) {
    linksList.innerHTML = `
      <div class="empty-state">
        <p>No links yet in this category</p>
        <p>Click "Add Link" below to get started</p>
      </div>
    `;
    return;
  }

  linksList.innerHTML = links.map((link, index) => `
    <div class="link-item" data-index="${index}">
      <div class="link-item-header">
        <span style="color: var(--text-secondary);">Link #${index + 1}</span>
        <div class="link-item-actions">
          <button class="btn-icon move-up" data-index="${index}" title="Move up">↑</button>
          <button class="btn-icon move-down" data-index="${index}" title="Move down">↓</button>
          <button class="btn-icon danger delete-link" data-index="${index}" title="Delete">🗑</button>
        </div>
      </div>
      <div class="link-form">
        <div class="form-group">
          <label>Title</label>
          <input type="text" class="link-title" data-index="${index}" value="${escapeHtml(link.title)}" placeholder="e.g., LeetCode Problems">
        </div>
        <div class="form-group">
          <label>URL</label>
          <input type="url" class="link-url" data-index="${index}" value="${escapeHtml(link.url)}" placeholder="https://...">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Weight (probability multiplier)</label>
            <input type="number" class="link-weight" data-index="${index}" value="${link.weight || 1}" min="1" max="10">
            <span class="help-text">Higher = more likely to appear (1-10)</span>
          </div>
          <div class="form-group">
            <label>Pin to top</label>
            <div class="checkbox-group">
              <input type="checkbox" class="link-pinned" data-index="${index}" ${link.pinned ? 'checked' : ''}>
              <span class="help-text">Always show (max 2 total)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Add event listeners for form inputs
  linksList.querySelectorAll('.link-title').forEach(input => {
    input.addEventListener('input', (e) => {
      const index = parseInt(e.target.dataset.index);
      linksData[currentCategory][index].title = e.target.value;
    });
  });

  linksList.querySelectorAll('.link-url').forEach(input => {
    input.addEventListener('input', (e) => {
      const index = parseInt(e.target.dataset.index);
      linksData[currentCategory][index].url = e.target.value;
    });
  });

  linksList.querySelectorAll('.link-weight').forEach(input => {
    input.addEventListener('input', (e) => {
      const index = parseInt(e.target.dataset.index);
      linksData[currentCategory][index].weight = parseInt(e.target.value) || 1;
    });
  });

  linksList.querySelectorAll('.link-pinned').forEach(input => {
    input.addEventListener('change', (e) => {
      const index = parseInt(e.target.dataset.index);
      linksData[currentCategory][index].pinned = e.target.checked;
    });
  });

  linksList.querySelectorAll('.delete-link').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      if (confirm('Delete this link?')) {
        linksData[currentCategory].splice(index, 1);
        renderLinks();
      }
    });
  });

  linksList.querySelectorAll('.move-up').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      if (index > 0) {
        const temp = linksData[currentCategory][index];
        linksData[currentCategory][index] = linksData[currentCategory][index - 1];
        linksData[currentCategory][index - 1] = temp;
        renderLinks();
      }
    });
  });

  linksList.querySelectorAll('.move-down').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      if (index < linksData[currentCategory].length - 1) {
        const temp = linksData[currentCategory][index];
        linksData[currentCategory][index] = linksData[currentCategory][index + 1];
        linksData[currentCategory][index + 1] = temp;
        renderLinks();
      }
    });
  });
}

// Show status message
function showStatus(message, type) {
  const statusEl = document.getElementById('statusMessage');
  statusEl.textContent = message;
  statusEl.className = `status-message ${type}`;
  
  setTimeout(() => {
    statusEl.className = 'status-message';
  }, 3000);
}

// Escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
