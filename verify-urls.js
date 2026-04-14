#!/usr/bin/env node

/**
 * URL Verification Script
 * Checks all GitHub and LeetCode URLs in defaults.js to ensure they exist (200 status)
 */

const https = require('https');
const { DEFAULT_LINKS } = require('./defaults.js');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { 
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000 
    }, (res) => {
      resolve({
        url,
        status: res.statusCode,
        ok: res.statusCode === 200
      });
    }).on('error', (err) => {
      resolve({
        url,
        status: 'ERROR',
        ok: false,
        error: err.message
      });
    }).on('timeout', () => {
      resolve({
        url,
        status: 'TIMEOUT',
        ok: false
      });
    });
  });
}

function extractAllUrls(categories) {
  const urls = [];
  
  for (const [categoryName, subcategories] of Object.entries(categories)) {
    for (const [subcategoryName, links] of Object.entries(subcategories)) {
      for (const link of links) {
        if (link.urls) {
          // Multi-URL format - extract all URLs
          link.urls.forEach(url => {
            const type = url.includes('github.com') ? 'GitHub' : 
                        url.includes('leetcode.com') ? 'LeetCode' : 'Other';
            urls.push({
              url,
              type,
              category: categoryName,
              subcategory: subcategoryName
            });
          });
        } else if (link.url) {
          // Single URL format
          const type = link.url.includes('github.com') ? 'GitHub' : 
                      link.url.includes('leetcode.com') ? 'LeetCode' : 'Other';
          urls.push({
            url: link.url,
            type,
            category: categoryName,
            subcategory: subcategoryName
          });
        }
      }
    }
  }
  
  return urls;
}

async function verifyAllUrls() {
  console.log(`${colors.cyan}╔════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║   URL Verification Script              ║${colors.reset}`);
  console.log(`${colors.cyan}╚════════════════════════════════════════╝${colors.reset}\n`);

  const urlsToCheck = extractAllUrls(DEFAULT_LINKS);
  
  const githubUrls = urlsToCheck.filter(u => u.type === 'GitHub');
  const leetcodeUrls = urlsToCheck.filter(u => u.type === 'LeetCode');
  const otherUrls = urlsToCheck.filter(u => u.type === 'Other');
  
  console.log(`${colors.blue}Found URLs to verify:${colors.reset}`);
  console.log(`  • GitHub: ${githubUrls.length}`);
  console.log(`  • LeetCode: ${leetcodeUrls.length}`);
  if (otherUrls.length > 0) {
    console.log(`  • Other: ${otherUrls.length}`);
  }
  console.log(`  • Total: ${urlsToCheck.length}\n`);

  const results = [];
  const batchSize = 10; // Check 10 URLs at a time to avoid overwhelming the server
  
  for (let i = 0; i < urlsToCheck.length; i += batchSize) {
    const batch = urlsToCheck.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(item => checkUrl(item.url).then(result => ({ ...item, ...result })))
    );
    
    results.push(...batchResults);
    
    // Progress indicator
    const progress = Math.min(i + batchSize, urlsToCheck.length);
    process.stdout.write(`\rProgress: ${progress}/${urlsToCheck.length} URLs checked`);
    
    // Small delay between batches to be polite to servers
    if (i + batchSize < urlsToCheck.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  console.log('\n');

  // Analyze results by type
  const githubResults = results.filter(r => r.type === 'GitHub');
  const leetcodeResults = results.filter(r => r.type === 'LeetCode');
  const otherResults = results.filter(r => r.type === 'Other');
  
  const githubFailed = githubResults.filter(r => !r.ok);
  const leetcodeFailed = leetcodeResults.filter(r => !r.ok);
  const otherFailed = otherResults.filter(r => !r.ok);
  const allFailed = [...githubFailed, ...leetcodeFailed, ...otherFailed];

  // Display results by type
  console.log(`${colors.cyan}═══════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}RESULTS BY TYPE${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════${colors.reset}\n`);
  
  // GitHub results
  if (githubFailed.length === 0) {
    console.log(`${colors.green}✓ GitHub: All ${githubResults.length} URLs valid${colors.reset}`);
  } else {
    console.log(`${colors.red}✗ GitHub: ${githubFailed.length}/${githubResults.length} failed${colors.reset}`);
  }
  
  // LeetCode results
  if (leetcodeFailed.length === 0) {
    console.log(`${colors.green}✓ LeetCode: All ${leetcodeResults.length} URLs valid${colors.reset}`);
  } else {
    console.log(`${colors.red}✗ LeetCode: ${leetcodeFailed.length}/${leetcodeResults.length} failed${colors.reset}`);
  }
  
  // Other results
  if (otherResults.length > 0) {
    if (otherFailed.length === 0) {
      console.log(`${colors.green}✓ Other: All ${otherResults.length} URLs valid${colors.reset}`);
    } else {
      console.log(`${colors.red}✗ Other: ${otherFailed.length}/${otherResults.length} failed${colors.reset}`);
    }
  }
  
  console.log('');

  // Display failed URLs if any
  if (allFailed.length > 0) {
    console.log(`${colors.cyan}═══════════════════════════════════════${colors.reset}`);
    console.log(`${colors.red}FAILED URLs (${allFailed.length})${colors.reset}`);
    console.log(`${colors.cyan}═══════════════════════════════════════${colors.reset}\n`);
    
    allFailed.forEach((item, index) => {
      const typeColor = item.type === 'GitHub' ? colors.blue : 
                        item.type === 'LeetCode' ? colors.yellow : colors.cyan;
      console.log(`${colors.red}${index + 1}. [${item.status}] ${typeColor}${item.type}${colors.reset}`);
      console.log(`   Category: ${colors.yellow}${item.category}${colors.reset} / ${colors.yellow}${item.subcategory}${colors.reset}`);
      console.log(`   URL: ${colors.cyan}${item.url}${colors.reset}`);
      if (item.error) {
        console.log(`   Error: ${item.error}`);
      }
      console.log('');
    });
  } else {
    console.log(`${colors.green}╔════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.green}║  ✓ All ${urlsToCheck.length} URLs are valid!           ║${colors.reset}`);
    console.log(`${colors.green}╚════════════════════════════════════════╝${colors.reset}\n`);
  }

  return allFailed.length === 0;
}

// Run verification
verifyAllUrls().then(success => {
  process.exit(success ? 0 : 1);
});
