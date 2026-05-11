// ============================================
// UTILITY FUNCTIONS
// ============================================
// Shared helper functions used across the extension
// ============================================

/**
 * Convert a key to a display name
 * @param {string} key - The key to convert (e.g., "system_design", "lld", "dsa", "01-arrays-hashing")
 * @returns {string} - A human-readable display name
 */
function keyToDisplayName(key) {
  // Remove numeric prefix if present (e.g., "01-" from "01-arrays-hashing")
  let cleanKey = key.replace(/^\d+-/, '');
  
  // Common abbreviations to uppercase
  const abbreviations = ['dsa', 'lld', 'hld', 'api', 'apis', 'sql', 'ui', 'ux', 'dp', 'bfs', 'dfs', '1d', '2d'];
  
  if (abbreviations.includes(cleanKey.toLowerCase())) {
    return cleanKey.toUpperCase();
  }
  
  // Split by underscores or dashes and capitalize each word
  return cleanKey
    .split(/[_-]/)
    .map(word => {
      // Handle special cases for abbreviations within words
      if (abbreviations.includes(word.toLowerCase())) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

/**
 * Generate a clean title from a URL
 * @param {string} url - The URL to parse
 * @returns {string} - A human-readable title
 */
function generateTitleFromUrl(url) {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/').filter(p => p.length > 0);
    
    // Special handling for GitHub markdown files
    if (urlObj.hostname.includes('github.com') && pathParts.length > 0) {
      const filename = pathParts[pathParts.length - 1];
      return cleanGithubFilename(filename);
    }
    
    // General URL handling
    const hostname = urlObj.hostname.replace(/^www\./, '');
    const domainParts = hostname.split('.');
    const mainDomain = domainParts[0];
    
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    
    if (pathParts.length > 0) {
      const lastPart = pathParts[pathParts.length - 1];
      const cleanPath = lastPart
        .replace(/\.(html|php|aspx?)$/i, '')
        .replace(/[-_]/g, ' ');
      
      if (cleanPath.length > 2) {
        return capitalize(mainDomain) + ' ' + capitalize(cleanPath);
      }
    }
    
    return capitalize(mainDomain);
  } catch (e) {
    return url;
  }
}

/**
 * Clean up GitHub markdown filename to readable title
 * Remove number prefixes, handle special cases
 * @param {string} filename - The filename to clean (e.g., "01-subsets.md")
 * @returns {string} - Clean title (e.g., "Subsets")
 */
function cleanGithubFilename(filename) {
  // Remove file extension
  let title = filename.replace(/\.(md|markdown)$/i, '');
  
  // Remove number prefix (e.g., "01-", "02-", etc.)
  title = title.replace(/^\d+-/, '');
  
  // Split by dashes or underscores
  const words = title.split(/[-_]/);
  
  // Special cases mapping
  const specialCases = {
    'ii': 'II',
    'iii': 'III',
    'iv': 'IV',
    'lru': 'LRU',
    'bst': 'BST',
    'dfs': 'DFS',
    'bfs': 'BFS',
    'dp': 'DP',
    '1d': '1D',
    '2d': '2D',
    'k': 'K',
    'n': 'N',
    'x': 'X'
  };
  
  // Capitalize each word
  const cleanedWords = words.map(word => {
    const lower = word.toLowerCase();
    // Check if it's a special case
    if (specialCases[lower]) {
      return specialCases[lower];
    }
    // Regular capitalization
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  
  return cleanedWords.join(' ');
}

/**
 * Get title for a link (uses provided title or generates from URL)
 * @param {Object} link - Link object with url and optional title
 * @returns {string} - The display title
 */
function getLinkTitle(link) {
  return link.title && link.title.trim() ? link.title : generateTitleFromUrl(link.url);
}

/**
 * Get a favicon URL for a page. Uses Chrome's MV3 _favicon API when available
 * (requires "favicon" permission in manifest), falls back to Google's s2 service.
 * @param {string} pageUrl
 * @param {number} size
 * @returns {string}
 */
function getFaviconUrl(pageUrl, size = 32) {
  try {
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getURL) {
      const url = new URL(chrome.runtime.getURL('/_favicon/'));
      url.searchParams.set('pageUrl', pageUrl);
      url.searchParams.set('size', String(size));
      return url.toString();
    }
  } catch (e) { /* fall through */ }
  try {
    const host = new URL(pageUrl).hostname;
    return `https://www.google.com/s2/favicons?sz=${size}&domain=${encodeURIComponent(host)}`;
  } catch (e) {
    return '';
  }
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} - Escaped HTML
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
