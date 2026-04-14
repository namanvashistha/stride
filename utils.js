// ============================================
// UTILITY FUNCTIONS
// ============================================
// Shared helper functions used across the extension
// ============================================

/**
 * Generate a clean title from a URL
 * @param {string} url - The URL to parse
 * @returns {string} - A human-readable title
 */
function generateTitleFromUrl(url) {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.replace(/^www\./, '');
    const pathParts = urlObj.pathname.split('/').filter(p => p.length > 0);
    
    // Extract domain name
    const domainParts = hostname.split('.');
    const mainDomain = domainParts[0];
    
    // Capitalize first letter
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    
    // If there's a meaningful path, use it
    if (pathParts.length > 0) {
      const lastPart = pathParts[pathParts.length - 1];
      // Clean up path (remove file extensions, replace dashes/underscores)
      const cleanPath = lastPart
        .replace(/\.(html|php|aspx?)$/i, '')
        .replace(/[-_]/g, ' ');
      
      if (cleanPath.length > 2) {
        return capitalize(mainDomain) + ' ' + capitalize(cleanPath);
      }
    }
    
    // Fallback to just the domain
    return capitalize(mainDomain);
  } catch (e) {
    // If URL parsing fails, return the URL itself
    return url;
  }
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
