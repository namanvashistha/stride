// ============================================
// DATA MODEL
// ============================================
// Default links and categories are loaded from defaults.js
// Edit links via the Settings page (right-click extension icon > Options)
// ============================================

// These will be loaded from chrome.storage (defaults from defaults.js)
let LINKS_DATA = DEFAULT_LINKS;
let CATEGORIES_DATA = DEFAULT_CATEGORIES;

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
 * Select category for the day using deterministic rotation
 */
function selectCategoryForDay(seed) {
  const categories = Object.keys(LINKS_DATA);
  const index = seed % categories.length;
  return categories[index];
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
 * Get daily links selection
 */
function getDailyLinks(dateString) {
  const seed = generateSeed(dateString);
  const random = createSeededRandom(seed);
  
  // Select category for the day
  const selectedCategory = selectCategoryForDay(seed);
  
  // Get all links from selected category
  const categoryLinks = LINKS_DATA[selectedCategory] || [];
  
  // Shuffle and select up to 6 links
  const shuffled = shuffleArray(categoryLinks, random);
  const selectedLinks = shuffled.slice(0, Math.min(6, shuffled.length));
  
  return {
    category: selectedCategory,
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
  const { category, links } = getDailyLinks(todayDate);
  const completed = getCompletionState(todayDate);
  
  // Update category badge
  const categoryBadge = document.getElementById('categoryBadge');
  const categoryName = CATEGORIES_DATA[category]?.name || category.replace('_', ' ');
  categoryBadge.textContent = categoryName;
  
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
 * Render sidebar with all links organized by category
 */
function renderSidebar() {
  const sidebarContent = document.getElementById('sidebarContent');
  const sortedCategories = Object.keys(CATEGORIES_DATA)
    .map(id => ({ id, ...CATEGORIES_DATA[id] }))
    .sort((a, b) => a.order - b.order);
  
  sidebarContent.innerHTML = sortedCategories.map(cat => {
    const links = LINKS_DATA[cat.id] || [];
    if (links.length === 0) return '';
    
    return `
      <div class="sidebar-category">
        <button class="sidebar-category-header" data-category="${cat.id}">
          <span class="category-icon">▶</span>
          <span>${cat.name}</span>
          <span class="category-count">${links.length}</span>
        </button>
        <div class="sidebar-category-links" data-category="${cat.id}">
          ${links.map(link => `
            <a href="${link.url}" class="sidebar-link" target="_blank">
              <span class="link-title">${escapeHtml(getLinkTitle(link))}</span>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
  
  // Add click handlers for collapsible headers
  sidebarContent.querySelectorAll('.sidebar-category-header').forEach(header => {
    header.addEventListener('click', () => {
      const categoryId = header.dataset.category;
      const linksContainer = sidebarContent.querySelector(`.sidebar-category-links[data-category="${categoryId}"]`);
      const icon = header.querySelector('.category-icon');
      
      if (linksContainer.style.display === 'none' || !linksContainer.style.display) {
        linksContainer.style.display = 'block';
        icon.textContent = '▼';
      } else {
        linksContainer.style.display = 'none';
        icon.textContent = '▶';
      }
    });
  });
  
  // Initialize all as collapsed
  sidebarContent.querySelectorAll('.sidebar-category-links').forEach(container => {
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
 * Load links and categories from chrome.storage
 */
async function loadLinksData() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['stride_links', 'stride_categories'], (result) => {
      if (result.stride_links) {
        LINKS_DATA = result.stride_links;
      } else {
        LINKS_DATA = DEFAULT_LINKS;
      }
      
      if (result.stride_categories) {
        CATEGORIES_DATA = result.stride_categories;
      } else {
        CATEGORIES_DATA = DEFAULT_CATEGORIES;
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
