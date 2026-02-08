# grejprrik.xyz

Personal website for Štěpán Pavlica (grejprrik) featuring a dynamic Discord presence widget, photo gallery, and bilingual (Czech/English) interface.

**Live at**: https://grejprrik.xyz

## Features

### Main Page (index.html)
- **Live Discord Presence Widget** using Lanyard API
  
- **Bilingual Support** (Czech/English)
  - localStorage remembers language preference
  - Switch between languages with one click
  - All content dynamically updates
  
- **Visual Design**
  - Animated wave background at bottom of page (red accent)
  - Decorative lines around header text
  - Smooth scroll-triggered animations (fade in + slide up)
  - Card shadows that appear above wave animation
  - Hover effects with red accent glow
  - Mobile-optimized (animations disabled on mobile for performance)
  - Animated favicon that cycles between two custom cat images every 500ms
  
- **Interactive Elements**
  - Hamburger navigation menu (links to home, gallery, GitHub repo)
  - Mute button for game card sounds (since it's fucking annoying)
  - Hover-triggered school info card with photo and logo
  - Copy to clipboard for Discord handle with toast notification
  - Interactive game cards with sound effects:
    - Desktop: Plays on hover or click
    - Mobile: Only plays on tap (not when scrolling)
    - Mute functionality
  
- **Personal Information Section**
  - School information with hover card
  - Music genre preferences
  - Location
  - Favorite games with optimized local banner images
  - Favorite albums with hover overlays
  - Social media links (GitHub, Instagram, Steam, Discord)
  
- **Technical Features**
  - Built with vanilla HTML5, CSS3, and JavaScript
  - Dark mode aesthetic using Inter font and FontAwesome icons
  - CSS custom properties for theming
  - Intersection Observer API for scroll animations
  - Responsive design with mobile-specific optimizations
  - Local asset optimization (compressed game banners)

### Gallery Page (gallery.html)
- **Three-tier Image System**
  - Thumbnails (~40-150KB) for fast grid display
  - Medium viewing images (~450KB-1.4MB) for lightbox
  - Full originals available via "View Full Quality" button
  
- **Lightbox Viewer**
  - Loading spinner during image load
  - Navigation with left/right arrows
  - Keyboard controls (Arrow keys, Escape to close)
  - Shows current resolution and file size
  - One-click download icon for full-resolution images
  - Smart image preloading
  
- **Visual Design**
  - Same animated wave background as main page
  - Breathing blob effect behind header
  - Decorative header lines
  - Card shadows for depth
  - 2-column layout on mobile, auto-fill grid on desktop
  - Smooth hover animations
  
- **Navigation**
  - Hamburger menu matching main page
  - Bilingual interface
  - Links to home and GitHub repo

## Tech Stack

- **HTML5 / CSS3**
  - Custom CSS variables for theming
  - CSS Grid and Flexbox for layouts
  - CSS animations and transitions
  - Keyframe animations (wave flow, breathing effect)
  - Intersection Observer API for scroll animations
  
- **JavaScript**
  - Language switching with localStorage persistence
  - Clipboard API for copy-to-clipboard functionality
  - Image preloading and lazy loading
  - Discord Lanyard API integration
  - Real-time progress tracking for media
  - Audio playback with intelligent touch event handling
  - Scroll-triggered animations with Intersection Observer
  - localStorage for user preferences (language, mute state)
  
- **External Resources**
  - Inter font from Google Fonts
  - FontAwesome 6.0 icons
  - Lanyard API for Discord Rich Presence (https://api.lanyard.rest/)
  
- **Build Tools**
  - ImageMagick for generating optimized images
  - Bash scripts for image processing automation

## Project Structure

```text
├── index.html                    # Main landing page with Discord widget
├── gallery.html                  # Photo gallery with lightbox viewer
├── CNAME                         # Custom domain: grejprrik.xyz
├── sitemap.xml                   # SEO sitemap for search engines
├── robots.txt                    # Search engine crawler instructions
├── package.json                  # NPM package configuration (Astro, Sharp)
├── lighthouserc.json            # Lighthouse CI performance testing config
├── favicon1.webp                # Animated favicon frame 1 (cat image)
├── favicon2.webp                # Animated favicon frame 2 (cat image)
├── images/                       # Image assets directory
│   ├── photo1-6.webp            # Full-resolution gallery images
│   ├── DSC_0101_01.webp         # Additional photo
│   ├── goah.webp                # School building photo
│   ├── goah.png                 # School logo (original)
│   ├── goah_budova.webp         # School building (alternative)
│   ├── banners/                 # Game banner images (WebP, optimized)
│   │   ├── postal2.webp         # POSTAL 2 banner (desktop)
│   │   ├── postal2-tablet.webp  # POSTAL 2 banner (tablet)
│   │   ├── postal2-mobile.webp  # POSTAL 2 banner (mobile)
│   │   └── css.webp             # Counter-Strike: Source banner
│   ├── icons/                   # Icon files
│   │   ├── postal.webp          # POSTAL 2 icon
│   │   ├── counterstrike.webp   # Counter-Strike icon
│   │   └── counterstrike-backup.webp
│   ├── thumbs/                  # Gallery thumbnails (400x400px, ~40-150KB)
│   │   ├── photo1-6.webp        # Gallery photo thumbnails
│   │   ├── amnesiac.webp        # Album cover - Radiohead
│   │   ├── freedom.webp         # Album cover - Sublime
│   │   ├── hybrid.webp          # Album cover - Linkin Park
│   │   ├── return.webp          # Album cover - Jamiroquai
│   │   └── convert-to-webp.js   # Node.js script to convert images to WebP
│   └── medium/                  # Gallery medium-res (1920px max, ~450KB-1.4MB)
│       └── photo1-6.webp        # Medium-resolution gallery images
├── sounds/                       # Audio files for game card interactions
│   ├── README.md                # Sound system documentation
│   ├── postal.mp3               # POSTAL 2 game card sound
│   └── counterstrike.mp3        # Counter-Strike game card sound
├── generate_thumbnails.sh       # Bash script to create 400x400px thumbnails
├── generate_medium_images.sh    # Bash script to create 1920px viewing images
└── README.md                    # This file
```

## Adding New Gallery Images

### Option 1: Using WebP

#### Step 1: Add Full-Resolution Images
Place  full-resolution WebP images in `images/` directory 

#### Step 2: Create Optimized Versions Using Node.js
The `images/thumbs/convert-to-webp.js` script can convert and resize images:

```bash
# dependencies
npm install sharp

# thumbnails 
cd images/thumbs
# Place source images in this directory
node convert-to-webp.js

# medium-sized images
cd ../medium
# Place source images in this directory
node convert-to-webp.js
```

Or manually use Sharp in Node.js:
```javascript
const sharp = require('sharp');

// Thumbnail (400x400px square)
await sharp('images/photo7.webp')
  .resize(400, 400, { fit: 'cover' })
  .webp({ quality: 80 })
  .toFile('images/thumbs/photo7.webp');

// Medium (1920px max width)
await sharp('images/photo7.webp')
  .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
  .webp({ quality: 85 })
  .toFile('images/medium/photo7.webp');
```

### Option 2: ImageMagick (Legacy Scripts)
The included bash scripts work with JPG files:

```bash
# For JPG source files
./generate_thumbnails.sh      # 400x400px squares
./generate_medium_images.sh   # 1920px max width for viewing
```

**Note**: These scripts look for `photo*.jpg` files and create JPG outputs. You'll need to convert them to WebP separately cause I'm fucking lazy

### Step 3: Update gallery.html
Add new gallery items to the grid:

```html
<div class="gallery-item">
    <img src="images/thumbs/photo7.webp" alt="Photo 7" class="thumbnail" 
         data-medium="images/medium/photo7.webp" 
         data-full="images/photo7.webp"
         loading="lazy" 
         decoding="async">
</div>
```

## Adding Sound Effects

See [sounds/README.md](sounds/README.md) for detailed documentation. Quick summary:

### Requirements
- **Format**: MP3
- **Length**: 0.1-0.5s
- **Target size**: Under 20KB each
- **Sample rate**: 44.1kHz or 48kHz

### Current Sound Files
- `postal.mp3`
- `counterstrike.mp3`

### Features
- **Smart playback**: Desktop hover + click, mobile tap-only (no scroll triggers)
- **Mute toggle**: Persisted via localStorage across sessions
- **Touch detection**: 10px movement threshold to distinguish taps from scrolls
- **Duplicate prevention**: Touch events override mouse events on hybrid devices

For adding more game cards with sounds, see the detailed guide in [sounds/README.md](sounds/README.md).

## Image Optimization

### WebP Conversion Script
Located at `images/thumbs/convert-to-webp.js` - a Node.js script using Sharp for batch WebP conversion:

```bash
npm install sharp

# Convert all JPG/PNG files in current directory to WebP
node convert-to-webp.js
```

**Features**:
- Converts JPG and PNG files to WebP format
- 80% quality setting (good balance of size vs. quality)
- Displays size savings for each conversion
- Preserves original files

### Manual Optimization with Sharp
```javascript
const sharp = require('sharp');

// Convert to WebP
await sharp('input.jpg')
  .webp({ quality: 80 })
  .toFile('output.webp');

// Create images
await sharp('banner.jpg')
  .resize(512, null)  // 512px height, auto width
  .webp({ quality: 85 })
  .toFile('banner-optimized.webp');
```

### Current Image Formats
- All visible website images are in **WebP format** for optimal performance
- Album covers: Located in `images/thumbs/` (amnesiac.webp, freedom.webp, hybrid.webp, return.webp)
- Game banners: Responsive images in `images/banners/` (separate mobile/tablet/desktop versions)
- Gallery photos: Three-tier system (thumbnails, medium, full) all in WebP

### Banner Optimization Strategy
Game banners use responsive images with different versions for different screen sizes:
- **Desktop**: `postal2.webp` (full quality)
- **Tablet**: `postal2-tablet.webp` (medium quality)
- **Mobile**: `postal2-mobile.webp` (optimized for small screens)

This is implemented via HTML `<link rel="preload">` with media queries for optimal performance.

## Development

### Local Development Server
Run a local web server for proper testing (required for some features to work):

```bash
# Python 3
python3 -m http.server 8000

# Node.js (if you have http-server installed)
npx http-server -p 8000

# PHP (if installed)
php -S localhost:8000
```

Then open http://localhost:8000

### Build Tools
The site uses Astro for potential build optimization:

```bash
# Install dependencies
npm install

# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

**Note**: The current site works as static HTML/CSS/JS without building.

### Discord Widget Configuration

The Discord presence widget uses the Lanyard API to display real-time Discord status.

**To configure for your Discord account:**

1. Get your Discord User ID:
   - Enable Developer Mode in Discord (Settings → Advanced → Developer Mode)
   - Right-click your profile and select "Copy User ID"

2. Update the User ID in [index.html](index.html):
   ```javascript
   const DISCORD_USER_ID = 'YOUR_USER_ID_HERE';
   ```

3. Join the Lanyard Discord server:
   - Visit https://discord.gg/lanyard
   - Join the server to enable your status tracking

**Widget displays:**
- Current Discord status (online/idle/dnd/offline) with color-coded indicators
- Rich Presence data from applications:
  - **Spotify**: Album art, track name, artist, live progress bar
  - **YouTube**: Video thumbnail, title, channel name, live progress
  - **VS Code**: File being edited, workspace info
  - **Games**: Game name, details, elapsed time, game icon
- Updates every 3 seconds for near real-time sync
- Gracefully handles offline status and connection errors

## Performance & SEO

### Lighthouse CI Configuration
Performance testing is configured in `lighthouserc.json`:

```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "staticDistDir": "."
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.95}],
        "categories:accessibility": ["error", {"minScore": 1.0}],
        "categories:best-practices": ["error", {"minScore": 1.0}],
        "categories:seo": ["error", {"minScore": 1.0}]
      }
    }
  }
}
```

**Target scores** (mobile):
- Performance: 95/100 (0.9s First Contentful Paint achieved)
- Accessibility: 100/100
- Best Practices: 100/100
- SEO: 100/100

### Performance Optimizations
- **WebP images**: All images converted to WebP format for 60-70% size reduction
- **Responsive images**: Separate mobile/tablet/desktop versions of game banners
- **Image preloading**: Critical images preloaded with media queries
- **Font loading optimization**: Uses `media="print"` trick to load fonts asynchronously
  - Prevents render blocking without causing FOUT (Flash of Unstyled Text)
  - Maintains 0.9s FCP (First Contentful Paint)
- **Lazy loading**: Gallery images use `loading="lazy"` and `decoding="async"`
- **Three-tier image system**: Thumbnails → Medium → Full quality
- **DNS prefetching**: Preconnects to Google Fonts, Discord API, CDNs
- **Mobile-specific optimizations**:
  - Animations disabled below intersection threshold
  - Breathing blob effect disabled on small screens
  - Grid layout switches to 2 columns on mobile

### SEO Configuration
- **Sitemap**: `sitemap.xml` lists all pages with priorities and update frequency
- **Robots.txt**: Configured to allow all crawlers with sitemap reference
- **Meta tags**: Comprehensive meta descriptions, keywords, and Open Graph data
- **Canonical URLs**: Specified for each page
- **Semantic HTML**: Proper use of header, main, footer, nav elements
- **Alt text**: All images have descriptive alt attributes

## Design & Styling

### Color Scheme
- Background: `#0a0a0a` (near black)
- Card Background: `#161616` (dark gray)
- Accent: `#ff4d4d` (vibrant red, inspired by Left 4 Dead)
- Text: `#ededed` (off-white, high contrast)
- Dimmed Text: `#b8b8b8` (gray for secondary content)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300 (light), 400 (regular), 700 (bold)
- **Font Loading**: Async loading via `media="print"` trick prevents render blocking
- **Icons**: FontAwesome 6.0 (via CDN with preconnect)

### Animations & Effects
- **Wave Background**: 
  - 3-second linear infinite loop
  - CSS translateX animation moving SVG path
  - Red accent color (#ff4d4d) at 25% opacity
  - Positioned at bottom of page with overflow hidden
  
- **Scroll Reveal Animations**: 
  - 0.6s fade-in with translateY(20px → 0)
  - Triggered by Intersection Observer API (threshold: 0.1)
  - Applied to all `.scroll-reveal` elements
  - Only fires once per element
  
- **Card Hover Effects**: 
  - Transform: `translateY(-8px)` on hover
  - Box shadow intensification with red accent glow
  - Border color change to accent red
  - 0.3s ease transition timing
  
- **Animated Favicon**: 
  - Alternates between `favicon1.webp` and `favicon2.webp`
  - 500ms interval (2 FPS)
  - Custom cat images for unique branding
  - Implemented via JavaScript setInterval

### Responsive Design
- **Mobile breakpoint**: 600px
- **Mobile optimizations**:
  - Hamburger menu collapses to 45px × 45px
  - Gallery grid switches to 2 columns
  - Breathing animation disabled
  - Font sizes reduced
  - Touch-optimized button sizes
- **Tablet optimizations**:
  - Medium-resolution banner images
  - Adjusted grid layouts
  - Optimized spacing

## Deployment

### Manual Deployment (Alternative)
Can be deployed to any static hosting service:
- Netlify: Drag and drop the repository folder
- Vercel: Connect GitHub repository
- Cloudflare Pages: Connect repository or upload files
- Traditional hosting: Upload via FTP/SFTP

**Requirements**: Any web server capable of serving static files (no server-side processing needed)

## Technologies Used

### Core
- **HTML5**: Semantic markup, meta tags for SEO
- **CSS3**: Custom properties, Grid, Flexbox, animations, media queries
- **JavaScript (Vanilla)**: No frameworks, modern ES6+ syntax

### APIs & Services
- **Lanyard API**: Real-time Discord presence (https://api.lanyard.rest/)
- **Google Fonts**: Inter font family
- **FontAwesome**: Icons (version 6.0)

### Build Tools (Optional)
- **Astro**: Modern static site generator (configured but not required)
- **Sharp**: High-performance image processing for Node.js
- **html-minifier-terser**: HTML minification for production builds

### Image Processing
- **ImageMagick**: Bash scripts for batch thumbnail/medium image generation
- **Sharp (Node.js)**: WebP conversion and image optimization
- **WebP format**: Primary image format for 60-70% size reduction

## License

Personal project by Štěpán Pavlica

Štěpán Pavlica | contact@grejprrik.xyz

---

**Repository**: https://github.com/grejprrik/grejprrik.xyz  
**Live Site**: https://grejprrik.xyz
