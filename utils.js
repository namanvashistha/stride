// ============================================
// UTILITY FUNCTIONS
// ============================================
// Shared helper functions used across the extension
// ============================================

/**
 * Convert a key to a display name
 * @param {string} key - The key to convert (e.g., "system_design", "lld", "dsa")
 * @returns {string} - A human-readable display name
 */
function keyToDisplayName(key) {
  // Common abbreviations to uppercase
  const abbreviations = ['dsa', 'lld', 'hld', 'api', 'apis', 'sql', 'ui', 'ux', 'dp', 'bfs', 'dfs'];
  
  if (abbreviations.includes(key.toLowerCase())) {
    return key.toUpperCase();
  }
  
  // Split by underscores and capitalize each word
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
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
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} - Escaped HTML
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
