// ============================================
// DATA MODEL
// ============================================
// Default links - used if no custom links are saved
// Edit links via the Settings page (right-click extension icon > Options)
// ============================================

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

// This will be loaded from chrome.storage
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
 * Select category for the day using deterministic rotation
 */
function selectCategoryForDay(seed) {
  const categories = Object.keys(LINKS_DATA);
  const index = seed % categories.length;
  return categories[index];
}

/**
 * Weighted random selection from an array
 */
function weightedRandomSelect(items, count, random) {
  const totalWeight = items.reduce((sum, item) => sum + (item.weight || 1), 0);
  const selected = [];
  const remaining = [...items];
  
  while (selected.length < count && remaining.length > 0) {
    let randomWeight = random() * totalWeight;
    let cumulativeWeight = 0;
    
    for (let i = 0; i < remaining.length; i++) {
      cumulativeWeight += remaining[i].weight || 1;
      if (randomWeight <= cumulativeWeight) {
        selected.push(remaining[i]);
        remaining.splice(i, 1);
        break;
      }
    }
  }
  
  return selected;
}

/**
 * Get pinned links (max 2)
 */
function getPinnedLinks() {
  const pinned = [];
  for (const category in LINKS_DATA) {
    const categoryPinned = LINKS_DATA[category].filter(link => link.pinned);
    pinned.push(...categoryPinned);
  }
  return pinned.slice(0, 2);
}

/**
 * Get daily links selection
 */
function getDailyLinks(dateString) {
  const seed = generateSeed(dateString);
  const random = createSeededRandom(seed);
  
  // Get pinned links
  const pinnedLinks = getPinnedLinks();
  
  // Select category for the day
  const selectedCategory = selectCategoryForDay(seed);
  
  // Get non-pinned links from selected category
  const categoryLinks = LINKS_DATA[selectedCategory].filter(link => !link.pinned);
  
  // Calculate how many more links we need (5-6 total)
  const targetCount = 6;
  const remainingSlots = targetCount - pinnedLinks.length;
  
  // Select weighted random links
  const selectedLinks = weightedRandomSelect(categoryLinks, remainingSlots, random);
  
  // Combine pinned and selected
  const allLinks = [...pinnedLinks, ...selectedLinks];
  
  return {
    category: selectedCategory,
    links: allLinks
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
  categoryBadge.textContent = category.replace('_', ' ');
  
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
    
    if (link.pinned) {
      card.classList.add('pinned');
    }
    
    if (completed.includes(link.url)) {
      card.classList.add('completed');
    }
    
    const title = document.createElement('div');
    title.className = 'card-title';
    title.textContent = link.title;
    
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
  
  // Settings button
  document.getElementById('settingsBtn').addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });
});
