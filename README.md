# Stride

A minimal, production-quality Chrome extension that replaces your new tab with a focused daily interview prep system.

## Features

- **Settings UI**: Easy-to-use interface for managing links and categories without editing code
- **Configurable Categories**: Add, rename, or delete categories to match your prep needs
- **Sidebar Explorer**: View all your links at once with collapsible categories
- **Daily Link Rotation**: Deterministic selection that changes daily but stays consistent throughout the day
- **Simple & Fair**: Equal chance for all links—no complex weighting
- **Category-Based**: Organize by any topics you want (default: DSA, System Design, Backend, Behavioral)
- **Completion Tracking**: Click to mark links as done (persists throughout the day)
- **Dark Theme**: Clean, distraction-free UI
- **Keyboard Navigation**: Arrow keys + Enter for accessibility, Escape to close sidebar
- **Import/Export**: Backup and restore your configurations
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

### Managing Categories

**Add a Category:**
- Click the **+** button in the tabs section
- Enter a category ID (lowercase, no spaces, e.g., `frontend`)
- Enter a display name (e.g., `Frontend`)

**Rename a Category:**
- Right-click on a category tab
- Choose to rename and enter the new display name

**Delete a Category:**
- Right-click on a category tab
- Choose to delete (this will remove all links in that category)

### Managing Links

1. Click the ⚙️ settings icon in the top-right corner of the new tab page
2. Or right-click the extension icon → "Options"
3. Select a category tab
4. Add, edit, reorder, or delete links (only URL required)
5. Titles are automatically generated from URLs
6. Click "Save Changes" to persist your edits

### Import/Export Links

- **Export**: Download your current link configuration as JSON
- **Import**: Upload a previously exported JSON file
- **Reset**: Restore default links

### Manual Configuration (Advanced)

You can also edit links by modifying the `DEFAULT_LINKS` object in `defaults.js`, though the Settings UI is recommended:

```javascript
const DEFAULT_LINKS = {
  dsa: [
    { url: 'https://example.com' },
    { url: 'https://another.com' }
  ],
  // ... more categories
};
```

**Link Properties:**
- `url` (required): The target URL - titles are auto-generated from URLs

### How Selection Works

1. **Category Selection**: Rotates by day using a deterministic seed
2. **Link Selection**: Randomly shuffles and picks up to 6 links from the selected category
3. **Count**: Shows up to 6 links based on availability

## Technical Details

- **Manifest Version**: V3
- **Permissions**: `storage` (for localStorage completion tracking)
- **Performance**: ~10ms load time, no external dependencies
- **Browser Support**: Chrome 88+ (Manifest V3)

## File Structure

```
stride/
├── manifest.json       # Extension configuration
├── utils.js            # Shared utility functions
├── defaults.js         # Default links & categories
├── newtab.html        # New tab page structure
├── newtab.js          # Core logic & daily rotation
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
- **Fisher-Yates Shuffle**: Fair randomization for link selection
- **Chrome Storage**: Links configuration synced across devices
- **LocalStorage**: Completion state persists per day
- **Auto-cleanup**: Removes completion data older than 7 days

## Usage

1. **Open a new tab**: Stride appears automatically
2. **View all links**: Click the ☰ button (top-left) to open the sidebar with all links organized by category
3. **Click a link**: Opens in a new tab and marks as complete
4. **Manage links**: Click the ⚙️ settings icon to add, edit, or remove links
5. **Keyboard navigation**: Use arrow keys to move between cards, Enter to open, Escape to close sidebar
6. **Daily refresh**: Links automatically change at midnight

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