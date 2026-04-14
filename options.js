// Default links are loaded from defaults.js (2-level nested structure)

let currentCategory = null;
let currentSubcategory = null;
let linksData = {};

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  await loadLinks();
  renderTabs();
  setupEventListeners();
  renderSubcategories();
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
      
      // Set first category and subcategory as current
      const categoryIds = Object.keys(linksData).sort();
      if (categoryIds.length > 0 && !currentCategory) {
        currentCategory = categoryIds[0];
        const subcategoryIds = Object.keys(linksData[currentCategory] || {}).sort();
        if (subcategoryIds.length > 0) {
          currentSubcategory = subcategoryIds[0];
        }
      }
      
      resolve();
    });
  });
}

// Save links to chrome.storage
async function saveLinks() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({ 
      stride_links: linksData
    }, () => {
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
  // Back button
  document.getElementById('backBtn').addEventListener('click', () => {
    chrome.tabs.create({ url: 'chrome://newtab/' }, () => {
      window.close();
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
      const categoryIds = Object.keys(linksData).sort();
      if (categoryIds.length > 0) {
        currentCategory = categoryIds[0];
        const subcategoryIds = Object.keys(linksData[currentCategory] || {}).sort();
        currentSubcategory = subcategoryIds.length > 0 ? subcategoryIds[0] : null;
      }
      renderTabs();
      renderSubcategories();
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
          linksData = JSON.parse(event.target.result);
          
          const categoryIds = Object.keys(linksData).sort();
          if (categoryIds.length > 0) {
            currentCategory = categoryIds[0];
            const subcategoryIds = Object.keys(linksData[currentCategory] || {}).sort();
            currentSubcategory = subcategoryIds.length > 0 ? subcategoryIds[0] : null;
          }
          
          renderTabs();
          renderSubcategories();
          showStatus('Data imported successfully (remember to save!)', 'success');
        } catch (error) {
          showStatus('Error importing file: Invalid JSON', 'error');
        }
      };
      reader.readAsText(file);
    }
  });
}

// Render category tabs
function renderTabs() {
  const tabsContainer = document.querySelector('.tabs');
  const categoryIds = Object.keys(linksData).sort();
  
  tabsContainer.innerHTML = categoryIds.map(categoryId => `
    <button class="tab-btn ${categoryId === currentCategory ? 'active' : ''}" data-category="${categoryId}">
      ${escapeHtml(keyToDisplayName(categoryId))}
    </button>
  `).join('') + `
    <button class="tab-btn tab-btn-add" id="addCategoryBtn" title="Add category">+</button>
  `;
  
  // Setup tab switching
  tabsContainer.querySelectorAll('.tab-btn:not(.tab-btn-add)').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.dataset.category;
      const subcategoryIds = Object.keys(linksData[currentCategory] || {}).sort();
      currentSubcategory = subcategoryIds.length > 0 ? subcategoryIds[0] : null;
      renderTabs();
      renderSubcategories();
    });
    
    // Right-click to rename/delete
    btn.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      const categoryId = btn.dataset.category;
      
      const action = confirm(`Delete "${keyToDisplayName(categoryId)}" and all its content?\n\nOK = Delete\nCancel = Keep`);
      
      if (action) {
        // Delete
        delete linksData[categoryId];
        
        const remaining = Object.keys(linksData).sort();
        if (remaining.length > 0) {
          currentCategory = remaining[0];
          const subcategoryIds = Object.keys(linksData[currentCategory] || {}).sort();
          currentSubcategory = subcategoryIds.length > 0 ? subcategoryIds[0] : null;
        } else {
          currentCategory = null;
          currentSubcategory = null;
        }
        
        renderTabs();
        renderSubcategories();
        showStatus('Category deleted (remember to save!)', 'success');
      }
    });
  });
  
  // Add category button listener
  const addBtn = document.getElementById('addCategoryBtn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const categoryId = prompt('Category ID (lowercase, underscores allowed):');
      if (!categoryId) return;
      
      if (!/^[a-z0-9_]+$/.test(categoryId)) {
        alert('Category ID must be lowercase letters, numbers, or underscores only');
        return;
      }
      
      if (linksData[categoryId]) {
        alert('Category already exists!');
        return;
      }
      
      linksData[categoryId] = {};
      currentCategory = categoryId;
      currentSubcategory = null;
      renderTabs();
      renderSubcategories();
      showStatus('Category added (remember to save!)', 'success');
    });
  }
}

// Render subcategories and links for current category
function renderSubcategories() {
  const linksList = document.getElementById('linksList');
  
  if (!currentCategory) {
    linksList.innerHTML = `
      <div class="empty-state">
        <p>No categories yet</p>
        <p>Click the "+" button above to create a category</p>
      </div>
    `;
    document.getElementById('addLinkBtn').style.display = 'none';
    return;
  }
  
  document.getElementById('addLinkBtn').style.display = 'block';
  
  const subcategories = linksData[currentCategory] || {};
  const subcategoryIds = Object.keys(subcategories).sort();
  
  if (subcategoryIds.length === 0) {
    linksList.innerHTML = `
      <div class="empty-state">
        <p>No subcategories in ${keyToDisplayName(currentCategory)}</p>
        <p>Add a subcategory below</p>
        <button class="btn btn-primary" id="addSubcategoryBtn">+ Add Subcategory</button>
      </div>
    `;
    document.getElementById('addSubcategoryBtn').addEventListener('click', addSubcategory);
    return;
  }
  
  linksList.innerHTML = `
    <div class="subcategories-header">
      <h3>Subcategories in ${keyToDisplayName(currentCategory)}</h3>
      <button class="btn btn-secondary" id="addSubcategoryBtn">+ Add Subcategory</button>
    </div>
  ` + subcategoryIds.map(subcategoryId => {
    const links = subcategories[subcategoryId] || [];
    return `
      <div class="subcategory-section">
        <div class="subcategory-header">
          <h4>${escapeHtml(keyToDisplayName(subcategoryId))}</h4>
          <div class="subcategory-actions">
            <button class="btn-icon" onclick="addLinkToSubcategory('${subcategoryId}')" title="Add link">+</button>
            <button class="btn-icon danger" onclick="deleteSubcategory('${subcategoryId}')" title="Delete subcategory">🗑</button>
          </div>
        </div>
        <div class="subcategory-links">
          ${links.length === 0 ? '<p class="empty-notice">No links yet</p>' : ''}
          ${links.map((link, index) => `
            <div class="link-item">
              <input type="url" class="link-input" value="${escapeHtml(link.url)}" 
                     placeholder="https://..." 
                     onchange="updateLink('${subcategoryId}', ${index}, this.value)">
              <div class="link-actions">
                <button class="btn-icon" onclick="moveLinkUp('${subcategoryId}', ${index})" title="Move up">↑</button>
                <button class="btn-icon" onclick="moveLinkDown('${subcategoryId}', ${index})" title="Move down">↓</button>
                <button class="btn-icon danger" onclick="deleteLink('${subcategoryId}', ${index})" title="Delete">✕</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
  
  document.getElementById('addSubcategoryBtn').addEventListener('click', addSubcategory);
}

// Helper functions for link management
function addSubcategory() {
  const subcategoryId = prompt('Subcategory ID (lowercase, underscores allowed):');
  if (!subcategoryId) return;
  
  if (!/^[a-z0-9_]+$/.test(subcategoryId)) {
    alert('Subcategory ID must be lowercase letters, numbers, or underscores only');
    return;
  }
  
  if (linksData[currentCategory][subcategoryId]) {
    alert('Subcategory already exists!');
    return;
  }
  
  linksData[currentCategory][subcategoryId] = [];
  currentSubcategory = subcategoryId;
  renderSubcategories();
  showStatus('Subcategory added (remember to save!)', 'success');
}

function deleteSubcategory(subcategoryId) {
  if (confirm(`Delete subcategory "${keyToDisplayName(subcategoryId)}" and all its links?`)) {
    delete linksData[currentCategory][subcategoryId];
    renderSubcategories();
    showStatus('Subcategory deleted (remember to save!)', 'success');
  }
}

function addLinkToSubcategory(subcategoryId) {
  if (!linksData[currentCategory][subcategoryId]) {
    linksData[currentCategory][subcategoryId] = [];
  }
  linksData[currentCategory][subcategoryId].push({ url: '' });
  renderSubcategories();
}

function updateLink(subcategoryId, index, value) {
  linksData[currentCategory][subcategoryId][index].url = value;
}

function deleteLink(subcategoryId, index) {
  if (confirm('Delete this link?')) {
    linksData[currentCategory][subcategoryId].splice(index, 1);
    renderSubcategories();
    showStatus('Link deleted (remember to save!)', 'success');
  }
}

function moveLinkUp(subcategoryId, index) {
  if (index > 0) {
    const links = linksData[currentCategory][subcategoryId];
    [links[index], links[index - 1]] = [links[index - 1], links[index]];
    renderSubcategories();
  }
}

function moveLinkDown(subcategoryId, index) {
  const links = linksData[currentCategory][subcategoryId];
  if (index < links.length - 1) {
    [links[index], links[index + 1]] = [links[index + 1], links[index]];
    renderSubcategories();
  }
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
