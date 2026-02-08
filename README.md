# grejprrik.xyz

Personal website with Discord presence widget, photo gallery, and bilingual Czech/English support.

**Live**: https://grejprrik.xyz

## Features

- Live Discord status via Lanyard API (Spotify, YouTube, VS Code, games)
- Bilingual interface with localStorage persistence
- Animated wave background, scroll animations, rotating cat favicon
- Game cards with hover/tap sounds and smart mobile detection (10px threshold)
- Photo gallery: 3-tier images (thumbnails → medium → full, all WebP)
- Inline SVG icons (no FontAwesome, ~70KB saved)
- Vanilla HTML/CSS/JS, no frameworks

## Tech Stack

- HTML5, CSS3, vanilla JavaScript
- Inter font (async loaded via media="print" trick)
- Lanyard API, Sharp for image optimization
- ImageMagick scripts for batch processing

## Quick Start

```bash
# Local server
python3 -m http.server 8000

# Generate images from JPG
./generate_thumbnails.sh      # 400x400px thumbnails
./generate_medium_images.sh   # 1920px max width

# Convert to WebP
cd images/thumbs && npm install sharp && node convert-to-webp.js
```

## Adding Gallery Images

1. Place full-res WebP in `images/`
2. Generate thumbnails: `cd images/thumbs && node convert-to-webp.js`
3. Generate medium: `cd images/medium && node convert-to-webp.js`
4. Add to gallery.html:
```html
<div class="gallery-item">
    <img src="images/thumbs/photo7.webp" alt="Photo 7" class="thumbnail" 
         data-medium="images/medium/photo7.webp" 
         data-full="images/photo7.webp" loading="lazy" decoding="async">
</div>
```

## Adding Sounds

See [sounds/README.md](sounds/README.md). Requirements: MP3, 0.1-0.5s, < 20KB.

## Discord Widget Setup

1. Get Discord User ID (Settings → Advanced → Developer Mode → Copy User ID)
2. Update `DISCORD_USER_ID` in index.html
3. Join https://discord.gg/lanyard

## Performance

- 95/100 Performance, 100/100 Accessibility/Best Practices/SEO
- FCP: 0.9s, LCP: 2.9s, CLS: 0.000
- WebP images (60-70% smaller), responsive banners, inline SVG icons
- Apache `.htaccess`: 1 year cache for static assets, gzip compression

## Deployment

Works on any static host (Netlify, Vercel, GitHub Pages, FTP). `.htaccess` for Apache servers included.

---

**Repo**: https://github.com/grejprrik/grejprrik.xyz  
**Contact**: contact@grejprrik.xyz

### Build Tools (Optional)
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

**Note**: The site works as static HTML/CSS/JS without building. Astro is optional for minification and optimization.

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

**Target scores** (mobile):
- Performance: 95/100
- Accessibility: 100/100
- Best Practices: 100/100
- SEO: 100/100

### Performance Optimizations
- **WebP images**: All images converted to WebP format for 60-70% size reduction
- **Responsive images**: Separate mobile/tablet/desktop versions of game banners with preload
- **Image optimization**: Counter-Strike icon reduced from 256x256 (8.4KB) to 105x105 (3.0KB)
- **Font loading optimization**: Uses `media="print"` trick to load fonts asynchronously
  - Prevents render blocking without causing FOUT (Flash of Unstyled Text)
  - Maintains 0.9s FCP (First Contentful Paint)
  - Tested approach: `rel="preload"` caused 2s FCP regression (0.9s → 2.9s)
- **Lazy loading**: Gallery images use `loading="lazy"` and `decoding="async"`
- **Three-tier image system**: Thumbnails (40-150KB) → Medium (450KB-1.4MB) → Full quality
- **DNS prefetching**: Preconnects to Google Fonts, Discord API, CDNs
- **CLS Prevention**: Min-heights set on dynamic content
  - Discord widget: `min-height: 100px`
  - Activity icons: `min-height: 16px`
  - Game cards: `min-height: 200px`
  - Album cards: `min-height: 150px`
  - Achieved CLS: 0.000
- **Gallery grid fix**: `main{width:100%;max-width:1200px}` prevents flexbox shrink-to-fit collapse
- **Inline SVG icons**: Removed FontAwesome CDN (~70KB), replaced with inline SVG
- **Mobile-specific optimizations**:
  - Animations disabled below intersection threshold
  - Breathing blob effect disabled on small screens
  - Grid layout switches to 2 columns on mobile
  - Smart touch detection (10px threshold) prevents scroll-triggered sounds

### Core Web Vitals
- **First Contentful Paint (FCP)**: 0.9s
- **Largest Contentful Paint (LCP)**: 2.9s
- **Total Blocking Time (TBT)**: 0ms
- **Cumulative Layout Shift (CLS)**: 0.000
- **Speed Index**: 1.2s

### SEO Configuration
- **Sitemap**: `sitemap.xml` lists all pages with priorities and update frequency
- **Robots.txt**: Configured to allow all crawlers with sitemap reference
- **Meta tags**: Comprehensive descriptions, keywords (including aliases), author/publisher
- **Keywords**: grejprrik, grejprr, graper, grejprrwashere, puddle_of_cum, primer.fiftyfive, Štěpán Pavlica
- **Canonical URLs**: Specified for each page to prevent duplicate content
- **Semantic HTML**: Proper use of header, main, footer, nav elements with ARIA labels
- **Alt text**: All images have descriptive alt attributes
- **Open Graph**: Meta tags for social media sharing

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
  - Achieves 0.9s FCP without FOUT issues
  - Fallback via noscript tag for JS-disabled browsers
- **Icons**: Inline SVG (no external dependencies)
  - Volume up/mute icons for sound toggle
  - GitHub icon for navigation
  - Download icon for gallery
  - Social media icons

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

The site is deployed as a static website and requires no server-side processing.

### Apache Configuration (.htaccess)
The `.htaccess` file includes production-ready optimizations:

```apache
# Cache static assets for 1 year
<FilesMatch "\.(jpg|jpeg|png|gif|webp|svg|ico|pdf|mp3|mp4|woff|woff2|ttf|eot)$">
    Header set Cache-Control "max-age=31536000, public, immutable"
</FilesMatch>

# Cache CSS and JavaScript for 1 year  
<FilesMatch "\.(css|js)$">
    Header set Cache-Control "max-age=31536000, public, immutable"
</FilesMatch>

# Cache HTML for 1 hour
<FilesMatch "\.(html|htm)$">
    Header set Cache-Control "max-age=3600, public"
</FilesMatch>

# Enable gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
    AddOutputFilterByType DEFLATE application/json application/xml image/svg+xml
    AddOutputFilterByType DEFLATE font/woff font/woff2
</IfModule>

# Enable Expires headers
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
</IfModule>
```



## Technologies Used

### Core
- **HTML5**: Semantic markup, meta tags for SEO, Open Graph tags
- **CSS3**: Custom properties, Grid, Flexbox, animations, media queries, min-heights for CLS prevention
- **JavaScript (Vanilla)**: No frameworks, modern ES6+ syntax, async/await for API calls

### APIs & Services
- **Lanyard API**: Real-time Discord presence (https://api.lanyard.rest/)
- **Google Fonts**: Inter font family (async loaded)
- **No icon libraries**: All inline SVG (FontAwesome removed)

### Build Tools (Optional)
- **Astro**: Modern static site generator (configured but not required)
- **Sharp**: High-performance image processing for Node.js (WebP conversion)
- **html-minifier-terser**: HTML minification for production builds

### Image Processing
- **ImageMagick**: Bash scripts for batch thumbnail/medium image generation from JPG
- **Sharp (Node.js)**: WebP conversion and image optimization (quality 80-85%)
- **WebP format**: Primary image format for 60-70% size reduction vs JPEG/PNG

## License

Personal project by Štěpán Pavlica

Štěpán Pavlica | contact@grejprrik.xyz

---

**Repository**: https://github.com/grejprrik/grejprrik.xyz  
**Live Site**: https://grejprrik.xyz
