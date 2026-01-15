# grejprrik.xyz

Source code for my personal website.

## Features

### Main Page (index.html)
- **Live Discord Presence Widget** using Lanyard API
  - Shows current status (online/idle/dnd/offline)
  - Real-time activity tracking with elapsed time
  - Expanded media player for Spotify and YouTube with:
    - Album/video thumbnails
    - Track/video title and artist/channel
    - Live progress bar and timestamps
  - Program activity display (VS Code, games, etc.) with icons
  - Updates every 3 seconds for near real-time sync
  
- **Bilingual Support** (Czech/English)
  - localStorage remembers language preference
  - Switch between languages with one click
  - All content dynamically updates
  
- **Visual Design**
  - Animated wave background at bottom of page (red accent)
  - Breathing blob effect behind header name
  - Decorative lines around header text
  - Smooth scroll-triggered animations (fade in + slide up)
  - Card shadows that appear above wave animation
  - Hover effects with red accent glow
  - Mobile-optimized (animations disabled on mobile for performance)
  - Animated favicon that cycles between two custom cat images every 500ms
  
- **Interactive Elements**
  - Hamburger navigation menu (links to home, gallery, GitHub repo)
  - Mute button for game card sounds (remembers preference via localStorage)
  - Hover-triggered school info card with photo and logo
  - Copy to clipboard for Discord handle with toast notification
  - Interactive game cards with sound effects:
    - Desktop: Plays on hover or click
    - Mobile: Only plays on tap (not when scrolling)
    - Volume controls and mute functionality
  
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
├── index.html              # Main landing page with Discord widget and animations
├── gallery.html            # Photo gallery with lightbox viewer
├── CNAME                   # Custom domain configuration for GitHub Pages
├── images/                 # Image assets
│   ├── photo*.jpg          # Full-resolution original images
│   ├── thumbs/             # Small thumbnails (400x400px, ~40-150KB)
│   ├── medium/             # Medium viewing images (1920px max, ~450KB-1.4MB)
│   ├── banners/            # Compressed game banner images (512px height)
│   │   ├── postal2.jpg     # POSTAL 2 banner (191KB)
│   │   └── css.jpg         # Counter-Strike: Source banner (54KB)
│   ├── hybrid.jpg          # Album cover - Linkin Park
│   ├── freedom.jpg         # Album cover - Sublime
│   ├── amnesiac.jpg        # Album cover - Radiohead
│   ├── return.jpg          # Album cover - Jamiroquai
│   └── goah.png            # School logo
├── sounds/                 # Audio files for interactive sound effects
│   ├── README.md           # Sound file specifications and documentation
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
- Mute button with localStorage persistence included

## Optimizing Game Banners

Game banner images are stored locally in `images/banners/` and optimized to 512px height:
- POSTAL 2: 191KB (down from 1.1MB)
- Counter-Strike: Source: 54KB (down from 18KB original)

This improves page load times significantly. Banners are referenced in CSS as local paths.

## Development

Run a local web server for proper testing:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000

Don't open HTML files directly (file:// protocol), browsers will block some features for security reasons.

### Key Features to Test

1. **Scroll Animations** - Scroll down to see sections fade in
2. **Discord Widget** - Should appear if online/active on Discord
3. **Language Switching** - Footer link toggles Czech/English
4. **Mute Button** - Top right, remembers state across sessions
5. **Game Card Sounds** - Hover on desktop, tap on mobile
6. **Wave Animation** - Red wave flowing at bottom of page
7. **Gallery Lightbox** - Click any photo to open viewer

### Discord Widget Configuration

The Discord presence widget uses the Lanyard API. To change the Discord user:

1. Find your Discord User ID (enable Developer Mode in Discord settings, right-click your profile)
2. Update `DISCORD_USER_ID` in index.html:
   ```javascript
   const DISCORD_USER_ID = 'YOUR_USER_ID_HERE';
   ```
3. Join the Lanyard Discord server: https://discord.gg/lanyard

Note: The widget displays:
- Current Discord status and activities
- Rich Presence data from apps like Spotify, YouTube, VS Code, and games
- Real-time progress for media playback
- Elapsed time for active programs

## Design Notes

### Color Scheme
- Background: `#0a0a0a` (near black)
- Card Background: `#161616` (dark gray)
- Accent: `#ff4d4d` (red, inspired by Left 4 Dead)
- Text: `#ededed` (off-white)
- Dimmed Text: `#a0a0a0` (gray)

### Animations
- **Wave Background**: 3s linear infinite loop, translateX animation
- **Breathing Blob**: 4s ease-in-out scale animation behind header
- **Scroll Reveals**: 0.6s fade-in with translateY, triggered by Intersection Observer
- **Card Hovers**: Transform translateY(-8px) with shadow intensification
- Mobile: Breathing animation disabled for performance

### Performance Optimizations
- Compressed banner images (512px height)
- Three-tier image loading in gallery
- Scroll animations disabled below intersection threshold
- Expensive blur effects disabled on mobile
- localStorage caching for user preferences

## Deployment

The site is configured for GitHub Pages:
1. Push to the `main` branch
2. GitHub Pages automatically deploys from root directory
3. Custom domain configured via CNAME file
4. No build process required - static HTML/CSS/JS

Don't open HTML files directly (file:// protocol), browsers will block image loading for security reasons.
