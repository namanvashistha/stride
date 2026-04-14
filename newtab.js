// ============================================
// DATA MODEL
// ============================================
// Default links are loaded from defaults.js (2-level nested structure)
// Edit links via the Settings page (right-click extension icon > Options)
// ============================================

// These will be loaded from chrome.storage (defaults from defaults.js)
let LINKS_DATA = DEFAULT_LINKS;

// ============================================
// CORE LOGIC
// ============================================

/**
 * Get today's date as YYYY-MM-DD
 */
function getTodayDateString() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

/**
 * Generate a deterministic seed from a date string
 */
function generateSeed(dateString) {
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Seeded pseudo-random number generator (mulberry32)
 * Returns a function that generates numbers between 0 and 1
 */
function createSeededRandom(seed) {
  return function() {
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Shuffle array with seeded random
 */
function shuffleArray(array, random) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Select subcategory for each category based on the day
 */
function selectSubcategoriesForDay(seed) {
  const categories = Object.keys(LINKS_DATA).sort(); // Sort for consistency
  const random = createSeededRandom(seed);
  const selections = [];
  
  categories.forEach((categoryId) => {
    const subcategoryIds = Object.keys(LINKS_DATA[categoryId] || {}).sort();
    if (subcategoryIds.length > 0) {
      // Pick one subcategory from this category
      const index = Math.floor(random() * subcategoryIds.length);
      const subcategoryId = subcategoryIds[index];
      selections.push({
        categoryId,
        subcategoryId,
        links: LINKS_DATA[categoryId][subcategoryId] || []
      });
    }
  });
  
  return selections;
}

/**
 * Get daily links selection (6 links from multiple subcategories)
 */
function getDailyLinks(dateString) {
  const seed = generateSeed(dateString);
  const random = createSeededRandom(seed);
  
  // Select one subcategory from each category
  const selections = selectSubcategoriesForDay(seed);
  
  // Collect all links from selected subcategories
  let allLinks = [];
  selections.forEach(selection => {
    // Shuffle links within each subcategory
    const shuffled = shuffleArray(selection.links, random);
    shuffled.forEach(link => {
      allLinks.push({
        ...link,
        categoryId: selection.categoryId,
        subcategoryId: selection.subcategoryId
      });
    });
  });
  
  // Shuffle all links together and take 6
  allLinks = shuffleArray(allLinks, random);
  const selectedLinks = allLinks.slice(0, Math.min(6, allLinks.length));
  
  return {
    selections, // Keep track of which subcategories were chosen
    links: selectedLinks
  };
}

// ============================================
// STORAGE & STATE MANAGEMENT
// ============================================

/**
 * Get completion state from localStorage
 */
function getCompletionState(dateString) {
  const key = `stride_completed_${dateString}`;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
}

/**
 * Save completion state to localStorage
 */
function saveCompletionState(dateString, completedUrls) {
  const key = `stride_completed_${dateString}`;
  localStorage.setItem(key, JSON.stringify(completedUrls));
}

/**
 * Mark a link as completed
 */
function markLinkCompleted(url, dateString) {
  const completed = getCompletionState(dateString);
  if (!completed.includes(url)) {
    completed.push(url);
    saveCompletionState(dateString, completed);
  }
}

/**
 * Clean up old completion data (keep only last 7 days)
 */
function cleanupOldData() {
  const keys = Object.keys(localStorage);
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  keys.forEach(key => {
    if (key.startsWith('stride_completed_')) {
      const dateString = key.replace('stride_completed_', '');
      const date = new Date(dateString);
      if (date < sevenDaysAgo) {
        localStorage.removeItem(key);
      }
    }
  });
}

// ============================================
// UI RENDERING
// ============================================

/**
 * Render the daily links to the page
 */
function render() {
  const todayDate = getTodayDateString();
  const { selections, links } = getDailyLinks(todayDate);
  const completed = getCompletionState(todayDate);
  
  // Update category badge with selected subcategories
  const categoryBadge = document.getElementById('categoryBadge');
  const badgeText = selections
    .map(s => `${keyToDisplayName(s.categoryId)} → ${keyToDisplayName(s.subcategoryId)}`)
    .join(' • ');
  categoryBadge.textContent = badgeText;
  
  // Render cards
  const cardsGrid = document.getElementById('cardsGrid');
  cardsGrid.innerHTML = '';
  
  links.forEach((link, index) => {
    const card = document.createElement('a');
    card.href = link.url;
    card.className = 'card';
    card.tabIndex = 0;
    card.setAttribute('data-url', link.url);
    card.setAttribute('data-index', index);
    
    if (completed.includes(link.url)) {
      card.classList.add('completed');
    }
    
    const title = document.createElement('div');
    title.className = 'card-title';
    title.textContent = getLinkTitle(link);
    
    card.appendChild(title);
    
    // Handle click
    card.addEventListener('click', (e) => {
      markLinkCompleted(link.url, todayDate);
      card.classList.add('completed');
    });
    
    // Handle keyboard navigation
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        markLinkCompleted(link.url, todayDate);
        card.classList.add('completed');
        window.open(link.url, '_blank');
      }
    });
    
    cardsGrid.appendChild(card);
  });
  
  // Setup arrow key navigation
  setupKeyboardNavigation();
}

/**
 * Setup keyboard navigation for cards
 */
function setupKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    const cards = Array.from(document.querySelectorAll('.card'));
    const activeElement = document.activeElement;
    const currentIndex = cards.indexOf(activeElement);
    
    if (currentIndex === -1) return;
    
    let nextIndex = currentIndex;
    
    switch(e.key) {
      case 'ArrowRight':
        e.preventDefault();
        nextIndex = Math.min(currentIndex + 1, cards.length - 1);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        nextIndex = Math.max(currentIndex - 1, 0);
        break;
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = Math.min(currentIndex + 2, cards.length - 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = Math.max(currentIndex - 2, 0);
        break;
    }
    
    if (nextIndex !== currentIndex) {
      cards[nextIndex].focus();
    }
  });
}

// ============================================
// SIDEBAR
// ============================================

/**
 * Render sidebar with all links organized by category → subcategory
 */
function renderSidebar() {
  const sidebarContent = document.getElementById('sidebarContent');
  const categoryIds = Object.keys(LINKS_DATA).sort();
  
  sidebarContent.innerHTML = categoryIds.map(categoryId => {
    const subcategories = LINKS_DATA[categoryId] || {};
    const subcategoryIds = Object.keys(subcategories).sort();
    
    if (subcategoryIds.length === 0) return '';
    
    // Count total links in this category
    const totalLinks = subcategoryIds.reduce((sum, subId) => sum + (subcategories[subId]?.length || 0), 0);
    
    return `
      <div class="sidebar-category">
        <button class="sidebar-category-header" data-category="${categoryId}">
          <span class="category-icon">▶</span>
          <span>${keyToDisplayName(categoryId)}</span>
          <span class="category-count">${totalLinks}</span>
        </button>
        <div class="sidebar-category-content" data-category="${categoryId}">
          ${subcategoryIds.map(subcategoryId => {
            const links = subcategories[subcategoryId] || [];
            if (links.length === 0) return '';
            
            return `
              <div class="sidebar-subcategory">
                <button class="sidebar-subcategory-header" data-category="${categoryId}" data-subcategory="${subcategoryId}">
                  <span class="subcategory-icon">▸</span>
                  <span>${keyToDisplayName(subcategoryId)}</span>
                  <span class="subcategory-count">${links.length}</span>
                </button>
                <div class="sidebar-subcategory-links" data-category="${categoryId}" data-subcategory="${subcategoryId}">
                  ${links.map(link => `
                    <a href="${link.url}" class="sidebar-link" target="_blank">
                      <span class="link-title">${escapeHtml(getLinkTitle(link))}</span>
                    </a>
                  `).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');
  
  // Add click handlers for collapsible category headers
  sidebarContent.querySelectorAll('.sidebar-category-header').forEach(header => {
    header.addEventListener('click', () => {
      const categoryId = header.dataset.category;
      const contentContainer = sidebarContent.querySelector(`.sidebar-category-content[data-category="${categoryId}"]`);
      const icon = header.querySelector('.category-icon');
      
      if (contentContainer.style.display === 'none' || !contentContainer.style.display) {
        contentContainer.style.display = 'block';
        icon.textContent = '▼';
      } else {
        contentContainer.style.display = 'none';
        icon.textContent = '▶';
      }
    });
  });
  
  // Add click handlers for collapsible subcategory headers
  sidebarContent.querySelectorAll('.sidebar-subcategory-header').forEach(header => {
    header.addEventListener('click', () => {
      const categoryId = header.dataset.category;
      const subcategoryId = header.dataset.subcategory;
      const linksContainer = sidebarContent.querySelector(`.sidebar-subcategory-links[data-category="${categoryId}"][data-subcategory="${subcategoryId}"]`);
      const icon = header.querySelector('.subcategory-icon');
      
      if (linksContainer.style.display === 'none' || !linksContainer.style.display) {
        linksContainer.style.display = 'block';
        icon.textContent = '▾';
      } else {
        linksContainer.style.display = 'none';
        icon.textContent = '▸';
      }
    });
  });
  
  // Initialize all as collapsed
  sidebarContent.querySelectorAll('.sidebar-category-content').forEach(container => {
    container.style.display = 'none';
  });
  sidebarContent.querySelectorAll('.sidebar-subcategory-links').forEach(container => {
    container.style.display = 'none';
  });
}

/**
 * Setup sidebar toggle functionality
 */
function setupSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const toggleBtn = document.getElementById('sidebarToggle');
  const closeBtn = document.getElementById('sidebarClose');
  
  const openSidebar = () => {
    sidebar.classList.add('open');
    overlay.classList.add('visible');
  };
  
  const closeSidebar = () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
  };
  
  toggleBtn.addEventListener('click', openSidebar);
  closeBtn.addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);
  
  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Load links from chrome.storage
 */
async function loadLinksData() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['stride_links'], (result) => {
      if (result.stride_links) {
        LINKS_DATA = result.stride_links;
      } else {
        LINKS_DATA = DEFAULT_LINKS;
      }
      
      resolve();
    });
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
  await loadLinksData();
  cleanupOldData();
  render();
  renderSidebar();
  setupSidebar();
  
  // Settings button
  document.getElementById('settingsBtn').addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });
});
