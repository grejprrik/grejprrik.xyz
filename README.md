# grejprrik.xyz

Source code for my personal website. Dark-themed portfolio showing my interests, education, and social presence.

## Features

### Main Page (index.html)
- Bilingual support (Czech/English) with localStorage to remember preference
- Hover-triggered school info card
- Responsive game and music grids
- Copy to clipboard for Discord handle with toast notifications
- Interactive sound effects on game cards (requires sound files - see sounds/README.md)
- Hamburger navigation menu for mobile and desktop
- Built with vanilla HTML5, CSS3, and JavaScript
- Dark mode aesthetic using Inter font and FontAwesome icons

### Gallery Page (gallery.html)
- Three-tier image system: thumbnails (~40-150KB), medium viewing images (~450KB-1.4MB), and full originals
- Lightbox viewer with loading spinner
- Navigation with left/right arrows and keyboard controls (Arrow keys, Escape to close)
- Smart loading: fast thumbnails in grid, medium images in viewer, full-res on demand
- Shows current resolution and file size for displayed image
- One-click download icon for full-resolution images
- 2-column layout on mobile, auto-fill grid on desktop
- Bilingual interface

## Tech Stack

- HTML5 / CSS3 with custom CSS variables
- JavaScript for language switching, clipboard API, and image preloading
- Inter font from Google Fonts
- FontAwesome 6.0 icons
- ImageMagick for generating optimized images

## Project Structure

```text
├── index.html              # Main landing page
├── gallery.html            # Photo gallery with lightbox viewer
├── images/                 # Image assets
│   ├── photo*.jpg          # Full-resolution original images
│   ├── thumbs/             # Small thumbnails (400x400px, ~40-150KB)
│   └── medium/             # Medium viewing images (1920px max, ~450KB-1.4MB)
├── sounds/                 # Audio files for interactive sound effects
│   ├── README.md           # Sound file specifications
│   ├── postal.mp3          # Sound for POSTAL 2 game card
│   └── counterstrike.mp3   # Sound for CS:S game card
├── generate_thumbnails.sh  # Script to create thumbnail images
├── generate_medium_images.sh # Script to create medium-sized images
└── README.md               # This file
```

## Adding New Gallery Images

### Step 1: Add Images
Place full-resolution images in `images/` directory as `photo*.jpg` (e.g., photo7.jpg, photo8.jpg, etc.)

### Step 2: Generate Optimized Versions
Run both scripts:

```bash
./generate_thumbnails.sh      # Creates 400x400px squares
./generate_medium_images.sh   # Creates 1920px max width for viewing
```

Both scripts automatically detect all photo*.jpg files and create optimized versions. Safe to run multiple times.

### Step 3: Update gallery.html
Add new gallery items:

```html
<div class="gallery-item">
    <img src="images/thumbs/photo7.jpg" alt="Photo 7" class="thumbnail" 
         data-medium="images/medium/photo7.jpg" data-full="images/photo7.jpg">
</div>
```

The three-tier system ensures fast loading:
- Thumbnails: Quick grid display
- Medium: Fast viewer loading
- Full: Available via "View Full Quality" button or download

## Adding Sound Effects

See sounds/README.md for details. Quick summary:
- Format: MP3 (128-192kbps)
- Length: 0.1-0.5 seconds
- Target size: Under 20KB each
- Files needed: postal.mp3, counterstrike.mp3

## Development

Run a local web server for proper testing:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000

Don't open HTML files directly (file:// protocol), browsers will block image loading for security reasons.
