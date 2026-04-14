# Stride

A minimal, production-quality Chrome extension that replaces your new tab with a focused daily interview prep system.

## Features

- **2-Level Organization**: Category → Subcategory → Links structure for better organization
- **Settings UI**: Manage categories, subcategories, and links without editing code
- **Configurable**: Add or delete categories and subcategories to match your prep needs
- **Sidebar Explorer**: View all links with collapsible 2-level nesting
- **Daily Link Rotation**: Picks one subcategory from each category daily, shows ~6 links total
- **Auto-Generated Titles**: Link titles and category names generated automatically from URLs and keys
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

1. Click the ⚙️ settings icon in the sidebar (☰ button to open)
2. Or right-click the extension icon → "Options"
3. Select a category tab (DSA, System Design, etc.)
4. Manage subcategories and their links
5. Add/delete categories, subcategories, and links
6. Titles are automatically generated from URLs
7. Click "Save Changes" to persist your edits

### Import/Export Links

- **Export**: Download your current link configuration as JSON
- **Import**: Upload a previously exported JSON file
- **Reset**: Restore default links

### Manual Configuration (Advanced)

You can also edit links by modifying the `DEFAULT_LINKS` object in `defaults.js`, though the Settings UI is recommended:

```javascript
const DEFAULT_LINKS = {
  dsa: {
    arrays: [{ url: 'https://example.com' }],
    trees: [{ url: 'https://another.com' }]
  },
  system_design: {
    lld: [{ url: 'https://designpatterns.com' }]
  }
};
```

**Structure:**
- 2-level nesting: Category → Subcategory → Links
- Titles are auto-generated from URLs
- Display names auto-generated from keys (e.g., `lld` → "LLD", `star_method` → "Star Method")

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