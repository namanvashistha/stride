// Default links and categories are loaded from defaults.js

let currentCategory = null;
let linksData = {};
let categoriesData = {};

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  await loadLinks();
  renderTabs();
  setupEventListeners();
  renderLinks();
});

// Load links and categories from chrome.storage
async function loadLinks() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['stride_links', 'stride_categories'], (result) => {
      if (result.stride_links) {
        linksData = result.stride_links;
      } else {
        linksData = JSON.parse(JSON.stringify(DEFAULT_LINKS));
      }
      
      if (result.stride_categories) {
        categoriesData = result.stride_categories;
      } else {
        categoriesData = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
      }
      
      // Set first category as current
      const sortedCategories = getSortedCategories();
      if (sortedCategories.length > 0 && !currentCategory) {
        currentCategory = sortedCategories[0].id;
      }
      
      resolve();
    });
  });
}

// Save links and categories to chrome.storage
async function saveLinks() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({ 
      stride_links: linksData,
      stride_categories: categoriesData 
    }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
}

// Get sorted categories by order
function getSortedCategories() {
  return Object.keys(categoriesData)
    .map(id => ({ id, ...categoriesData[id] }))
    .sort((a, b) => a.order - b.order);
}

// Setup event listeners
function setupEventListeners() {
  // Back button
  document.getElementById('backBtn').addEventListener('click', () => {
    chrome.tabs.create({ url: 'chrome://newtab/' }, () => {
      window.close();
    });
  });
  
  // Tab switching - will be setup in renderTabs()
  
  // Category management
  document.getElementById('addCategoryBtn').addEventListener('click', () => {
    const categoryId = prompt('Category ID (lowercase, no spaces):');
    if (!categoryId) return;
    
    // Validate ID
    if (!/^[a-z0-9_]+$/.test(categoryId)) {
      alert('Category ID must be lowercase letters, numbers, or underscores only');
      return;
    }
    
    if (categoriesData[categoryId]) {
      alert('Category already exists!');
      return;
    }
    
    const categoryName = prompt('Category display name:');
    if (!categoryName) return;
    
    const maxOrder = Math.max(...Object.values(categoriesData).map(c => c.order), -1);
    categoriesData[categoryId] = { name: categoryName, order: maxOrder + 1 };
    linksData[categoryId] = [];
    
    renderTabs();
    currentCategory = categoryId;
    renderLinks();
    showStatus('Category added (remember to save!)', 'success');
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
    if (confirm('Are you sure you want to reset all links and categories to defaults? This cannot be undone.')) {
      linksData = JSON.parse(JSON.stringify(DEFAULT_LINKS));
      categoriesData = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
      const sortedCategories = getSortedCategories();
      if (sortedCategories.length > 0) {
        currentCategory = sortedCategories[0].id;
      }
      renderTabs();
      renderLinks();
      showStatus('Reset to defaults (remember to save!)', 'success');
    }
  });

  // Export button
  document.getElementById('exportBtn').addEventListener('click', () => {
    const exportData = {
      links: linksData,
      categories: categoriesData
    };
    const dataStr = JSON.stringify(exportData, null, 2);
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
          
          // Support both old format (just links) and new format (links + categories)
          if (imported.links && imported.categories) {
            linksData = imported.links;
            categoriesData = imported.categories;
          } else {
            // Old format - just links
            linksData = imported;
          }
          
          const sortedCategories = getSortedCategories();
          if (sortedCategories.length > 0) {
            currentCategory = sortedCategories[0].id;
          }
          
          renderTabs();
          renderLinks();
          showStatus('Data imported successfully (remember to save!)', 'success');
        } catch (error) {
          showStatus('Error importing file: Invalid JSON', 'error');
        }
      };
      reader.readAsText(file);
    }
  });

  // Add link button
  document.getElementById('addLinkBtn').addEventListener('click', () => {
    if (!currentCategory) {
      alert('Please create a category first!');
      return;
    }
    const newLink = {
      url: ''
    };
    if (!linksData[currentCategory]) {
      linksData[currentCategory] = [];
    }
    linksData[currentCategory].push(newLink);
    renderLinks();
  });
}

// Render category tabs
function renderTabs() {
  const tabsContainer = document.querySelector('.tabs');
  const sortedCategories = getSortedCategories();
  
  tabsContainer.innerHTML = sortedCategories.map(cat => `
    <button class="tab-btn ${cat.id === currentCategory ? 'active' : ''}" data-category="${cat.id}">
      ${escapeHtml(cat.name)}
    </button>
  `).join('') + `
    <button class="tab-btn tab-btn-add" id="addCategoryBtn" title="Add category">+</button>
  `;
  
  // Setup tab switching
  tabsContainer.querySelectorAll('.tab-btn:not(.tab-btn-add)').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.dataset.category;
      renderTabs();
      renderLinks();
    });
    
    // Right-click to rename/delete
    btn.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      const categoryId = btn.dataset.category;
      
      const action = confirm(`Rename or Delete "${categoriesData[categoryId].name}"?\n\nOK = Rename\nCancel = Delete`);
      
      if (action) {
        // Rename
        const newName = prompt('New display name:', categoriesData[categoryId].name);
        if (newName) {
          categoriesData[categoryId].name = newName;
          renderTabs();
          showStatus('Category renamed (remember to save!)', 'success');
        }
      } else {
        // Delete
        if (confirm(`Delete "${categoriesData[categoryId].name}" and all its links?`)) {
          delete categoriesData[categoryId];
          delete linksData[categoryId];
          
          const remaining = getSortedCategories();
          if (remaining.length > 0) {
            currentCategory = remaining[0].id;
          } else {
            currentCategory = null;
          }
          
          renderTabs();
          renderLinks();
          showStatus('Category deleted (remember to save!)', 'success');
        }
      }
    });
  });
  
  // Re-attach add category button listener
  const addBtn = document.getElementById('addCategoryBtn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const categoryId = prompt('Category ID (lowercase, no spaces):');
      if (!categoryId) return;
      
      if (!/^[a-z0-9_]+$/.test(categoryId)) {
        alert('Category ID must be lowercase letters, numbers, or underscores only');
        return;
      }
      
      if (categoriesData[categoryId]) {
        alert('Category already exists!');
        return;
      }
      
      const categoryName = prompt('Category display name:');
      if (!categoryName) return;
      
      const maxOrder = Math.max(...Object.values(categoriesData).map(c => c.order), -1);
      categoriesData[categoryId] = { name: categoryName, order: maxOrder + 1 };
      linksData[categoryId] = [];
      
      currentCategory = categoryId;
      renderTabs();
      renderLinks();
      showStatus('Category added (remember to save!)', 'success');
    });
  }
}

// Render links for current category
function renderLinks() {
  const linksList = document.getElementById('linksList');
  
  if (!currentCategory) {
    linksList.innerHTML = `
      <div class="empty-state">
        <p>No categories yet</p>
        <p>Click the "+" button above to create a category</p>
      </div>
    `;
    return;
  }
  
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
          <label>URL</label>
          <input type="url" class="link-url" data-index="${index}" value="${escapeHtml(link.url)}" placeholder="https://..." required>
        </div>
      </div>
    </div>
  `).join('');

  // Add event listeners for form inputs
  linksList.querySelectorAll('.link-url').forEach(input => {
    input.addEventListener('input', (e) => {
      const index = parseInt(e.target.dataset.index);
      linksData[currentCategory][index].url = e.target.value;
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
