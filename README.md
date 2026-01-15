# grejprrik.xyz

The source code for my personal landing page. A minimalist, dark-themed portfolio designed to showcase my interests, education, and social presence.

## 🚀 Features

### Main Page (index.html)
* **Bilingual Support**: Integrated Czech and English translations with local storage to remember user preference.
* **Dynamic UI**: 
    * Hover-triggered school information card with custom branding.
    * Responsive game and music grids with CSS-driven animations.
    * "Copy to Clipboard" functionality for Discord handle with custom toast notifications.
* **Interactive Sound Effects**: Game cards play unique sounds on hover/click (requires sound files - see [sounds/README.md](sounds/README.md))
* **Hamburger Navigation Menu**: Smooth slide-in menu for mobile and desktop navigation.
* **Modern Tech Stack**: Built using vanilla HTML5, CSS3 (Flexbox/Grid), and ES6+ JavaScript.
* **Design Aesthetic**: High-contrast dark mode using the Inter font family and FontAwesome icons.

### Gallery Page (gallery.html)
* **Three-Tier Image System**: Optimized loading with small thumbnails, medium-resolution viewing images, and full-quality originals
* **Lightbox Viewer**: Click thumbnails to view images in a fullscreen lightbox with smooth loading spinner
* **Image Navigation**: Left/right arrows and keyboard controls (Arrow keys, Escape to close)
* **Smart Image Loading**: 
    - Grid displays tiny thumbnails (~40-150KB) for fast page load
    - Viewer opens medium-quality images (~450KB-1.4MB) optimized for 1080p
    - "View Full Quality" button loads original high-res on demand
* **Download Support**: One-click download of full-resolution images
* **Responsive Grid**: 2-column layout on mobile, auto-fill grid on desktop
* **Bilingual Interface**: All text translates between Czech and English

## 🛠️ Built With

* **HTML5 / CSS3**: Semantic structure and custom CSS variables for easy theming.
* **JavaScript**: Custom language switching logic, clipboard API integration, and image preloading system.
* **Fonts**: [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts.
* **Icons**: [FontAwesome 6.0](https://fontawesome.com/).
* **Image Processing**: ImageMagick for generating optimized thumbnails and medium-sized images.

## 📂 Project Structure

```text
├── index.html              # Main landing page
├── gallery.html            # Photo gallery with lightbox viewer
├── images/                 # Image assets
│   ├── photo*.jpg          # Full-resolution original images
│   ├── thumbs/             # Small thumbnails (400x400px, ~40-150KB)
│   └── medium/             # Medium viewing images (1920px max, ~450KB-1.4MB)
├── sounds/                 # Audio files for interactive sound effects
│   ├── README.md           # Sound file specifications
│   ├── postal.mp3          # Sound for POSTAL 2 game card (placeholder)
│   └── counterstrike.mp3   # Sound for CS:S game card (placeholder)
├── generate_thumbnails.sh  # Script to create thumbnail images
├── generate_medium_images.sh # Script to create medium-sized images
└── README.md               # This file
```

## 🖼️ Adding New Gallery Images

### Step 1: Add Your Images
Place your full-resolution images in the `images/` directory with the naming pattern `photo*.jpg` (e.g., `photo7.jpg`, `photo8.jpg`, etc.)

### Step 2: Generate Optimized Versions
Run both scripts to automatically create thumbnails and medium versions:

```bash
# Generate thumbnails (400x400px squares)
./generate_thumbnails.sh

# Generate medium images (1920px max width for viewing)
./generate_medium_images.sh
```

Both scripts will:
- Automatically detect all `photo*.jpg` files
- Create optimized versions in `images/thumbs/` and `images/medium/`
- Skip if source files don't exist
- Regenerate existing ones if re-run (safe to run multiple times)

### Step 3: Update gallery.html
Add new gallery items to the grid:

```html
<div class="gallery-item">
    <img src="images/thumbs/photo7.jpg" alt="Photo 7" class="thumbnail" 
         data-medium="images/medium/photo7.jpg" data-full="images/photo7.jpg">
</div>
```

**Note**: The three-tier system ensures fast loading:
- **Thumbnails**: Quick grid display
- **Medium**: Fast viewer loading (most people won't notice the difference from full-res)
- **Full**: Available via "View Full Quality" button or download

## 🔊 Adding Sound Effects

See [sounds/README.md](sounds/README.md) for detailed specifications. Quick summary:
- Format: MP3 (128-192kbps)
- Length: 0.1-0.5 seconds
- Target size: Under 20KB each
- Files needed: `postal.mp3`, `counterstrike.mp3`

## 🌐 Development

### Local Testing
Run a local web server (required for proper image loading):

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser.

**Important**: Don't open HTML files directly (file:// protocol) as browsers will block image loading for security reasons.
