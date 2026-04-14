# Stride

A minimal, production-quality Chrome extension that replaces your new tab with a focused daily interview prep system.

## Features

- **Settings UI**: Easy-to-use interface for managing links without editing code
- **Daily Link Rotation**: Deterministic selection that changes daily but stays consistent throughout the day
- **Weighted Selection**: Important links appear more frequently
- **Pinned Links**: Keep essential resources always visible (max 2)
- **Category-Based**: Organized by DSA, System Design, Backend, and Behavioral
- **Completion Tracking**: Click to mark links as done (persists throughout the day)
- **Dark Theme**: Clean, distraction-free UI
- **Keyboard Navigation**: Arrow keys + Enter for accessibility
- **Import/Export**: Backup and restore your link configurations
- **Zero Dependencies**: Plain HTML, CSS, JS - fast and lightweight

## Installation

### Load as Unpacked Extension (Development)

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right corner)
3. Click "Load unpacked"
4. Select the `stride` directory
5. Open a new tab to see Stride in action

### Production Build

To package for distribution:

1. Ensure you have a 128x128 `icon.png` in the root directory
2. Zip the entire directory (excluding `.git`, `node_modules`, etc.)
3. Upload to Chrome Web Store or distribute the zip file

## Configuration

### Managing Links via Settings UI

1. Click the ⚙️ settings icon in the top-right corner of the new tab page
2. Or right-click the extension icon → "Options"
3. Select a category tab (DSA, System Design, Backend, Behavioral)
4. Add, edit, or delete links
5. Adjust weights (1-10, higher = more likely to appear)
6. Pin important links (max 2 total across all categories)
7. Click "Save Changes" to persist your edits

### Import/Export Links

- **Export**: Download your current link configuration as JSON
- **Import**: Upload a previously exported JSON file
- **Reset**: Restore default links

### Manual Configuration (Advanced)

You can also edit links by modifying the `DEFAULT_LINKS` object in `newtab.js`, though the Settings UI is recommended:

```javascript
const DEFAULT_LINKS = {
  dsa: [
    { url: 'https://example.com', title: 'My Link', weight: 2 },
    { url: 'https://example.com', title: 'Important Link', weight: 3, pinned: true }
  ],
  // ... more categories
};
```

**Link Properties:**
- `url` (required): The target URL
- `title` (required): Display text
- `weight` (optional): Probability multiplier (default: 1, higher = more likely)
- `pinned` (optional): Always show this link (max 2 total across all categories)

### How Selection Works

1. **Category Selection**: Rotates by day using a deterministic seed
2. **Link Selection**: Uses weighted random selection within the category
3. **Pinned Links**: Always included regardless of category
4. **Count**: Shows 5-6 links total (pinned + selected)

## Technical Details

- **Manifest Version**: V3
- **Permissions**: `storage` (for localStorage completion tracking)
- **Performance**: ~10ms load time, no external dependencies
- **Browser Support**: Chrome 88+ (Manifest V3)

## File Structure

```
stride/
├── manifest.json       # Extension configuration
├── newtab.html        # New tab page structure
├── newtab.js          # Core logic & data
├── styles.css         # Dark theme styling
├── options.html       # Settings page structure
├── options.js         # Settings page logic
├── options.css        # Settings page styling
├── icon.png           # Extension icon (128x128)
└── README.md          # This file
```

## Architecture

The extension uses:
- **Seeded Random**: Deterministic daily selections using date-based seeds
- **Weighted Selection**: Probability-based link picking
- **Chrome Storage**: Links configuration synced across devices
- **LocalStorage**: Completion state persists per day
- **Auto-cleanup**: Removes completion data older than 7 days

## Usage

1. **Open a new tab**: Stride appears automatically
2. **Click a link**: Opens in a new tab and marks as complete
3. **Manage links**: Click the ⚙️ settings icon to add, edit, or remove links
4. **Keyboard navigation**: Use arrow keys to move between cards, Enter to open
5. **Daily refresh**: Links automatically change at midnight

## Customization

### Changing Number of Daily Links

Edit the `targetCount` variable in `getDailyLinks()` function:

```javascript
const targetCount = 6;  // Change this number
```

### Modifying Theme Colors

Edit CSS custom properties in `styles.css`:

```css
:root {
  --bg-primary: #0a0a0a;
  --bg-card: #1a1a1a;
  --accent: #3b82f6;
  /* ... more variables */
}
```

## License

MIT