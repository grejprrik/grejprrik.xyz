# Sound Effects System

Interactive sound effects for game cards on the main page. This system provides hover/tap sounds with intelligent touch detection and user preferences.

## Overview

Each game card on the website plays a unique sound effect when users interact with it. The system is designed to work seamlessly across desktop and mobile devices while respecting user preferences.

**Current Implementation:**
- 2 game cards with sounds (POSTAL 2, Counter-Strike: Source)
- Smart touch/mouse event handling
- Mute toggle with localStorage persistence
- No sound on accidental scroll touches

## Sound Files

### Required Files

### Required Files

| Filename | Purpose | Volume | Size Target |
|----------|---------|--------|-------------|
| `postal.mp3` | POSTAL 2 card sound | 50% (0.5) | < 20KB |
| `counterstrike.mp3` | Counter-Strike: Source card sound | 35% (0.35) | < 20KB |

**File Locations**: Place all sound files in the `/sounds/` directory at the repository root.

## Playback Behavior

## Playback Behavior

### Desktop
- **Mouse Hover**: Sound plays when mouse enters the game card area
- **Mouse Click**: Sound also plays on click (as backup for hover-disabled devices)
- **Repeat Prevention**: Hovering multiple times doesn't stack audio

### Mobile
- **Tap Only**: Sound plays on definitive tap gestures
- **No Scroll Trigger**: Movement > 10px cancels the tap detection
- **Single Play**: Touch and mouse events don't trigger simultaneously

### Event Flow
```javascript
Desktop:
  mouseenter → play sound
  click → play sound (if not already playing)

Mobile:
  touchstart → record position
  touchmove → check if moved > 10px
  touchend → if movement < 10px, play sound
  prevents mouseover/click → avoid double playback
```

## Mute Button

### Features
- **Location**: Fixed position at top-right of page, below hamburger menu (85px from top)
- **Visual Design**: 
  - Matches card background (`#161616`)
  - 45px × 45px rounded button
  - FontAwesome volume icons (volume-up / volume-mute)
  - Red accent color when muted
  - Hover effect with border color change
- **Persistence**: State saved in `localStorage` as `soundMuted` (remembers across page reloads)
- **Behavior**: 
  - Stops all currently playing sounds when activated
  - Prevents new sounds from playing while muted
  - Icon toggles between volume-up and volume-mute
  - Smooth transition effects

### Implementation
```javascript
// Check mute state
const isMuted = localStorage.getItem('soundMuted') === 'true';

// Save mute state
localStorage.setItem('soundMuted', 'true');

// Play sound only if not muted
if (!isMuted) {
    sound.currentTime = 0;
    sound.play();
}
```

## Smart Touch Detection

### Problem Solved
On mobile devices, we need to distinguish between:
- **Intentional tap**: User wants to interact with the card
- **Scroll gesture**: User is just scrolling past the card

### Solution
The system tracks touch movement and only plays sound for minimal movement:

```javascript
let touchStartY = 0;
let touchMoved = false;

card.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
    touchMoved = false;
});

card.addEventListener('touchmove', (e) => {
    const touchY = e.touches[0].clientY;
    const deltaY = Math.abs(touchY - touchStartY);
    
    if (deltaY > 10) {  // 10px threshold
        touchMoved = true;
    }
});

card.addEventListener('touchend', (e) => {
    if (!touchMoved) {
        // Play sound - this was a tap, not a scroll
        playSound();
    }
    e.preventDefault(); // Prevent mouse events
});
```

### Touch Detection Features
- **Movement threshold**: 10px (distinguishes tap from scroll)
- **Prevents duplicate events**: Touch events have priority over mouse events
- **No scroll interruption**: Scrolling past cards doesn't trigger sounds
- **Works on hybrid devices**: Prevents double-triggering on devices with both touch and mouse

### Edge Cases Handled
✅ Quick taps while scrolling  
✅ Slow deliberate taps  
✅ Accidental touches during scroll  
✅ Touch + stylus input  
✅ Devices that fire both touch and mouse events

## Audio Format: MP3

### Why MP3?

| Format | Browser Support | Size | Decoding Speed | Recommended |
|--------|----------------|------|----------------|-------------|
| **MP3** | ✅ Universal | Small | Fast | ✅ **YES** |
| OGG | ⚠️ Limited Safari/iOS | Small | Fast | ❌ No |
| WAV | ✅ Universal | **Very Large** | Fast | ❌ No |
| M4A/AAC | ✅ Good | Small | Fast | ⚠️ Eh |

**Reasons for MP3**:
- ✅ Universal browser support (Chrome, Firefox, Safari, Edge, mobile)
- ✅ Excellent compression for small file sizes
- ✅ Quality loss imperceptible for short UI sound effects
- ✅ Fast loading and decoding
- ✅ No licensing issues for personal use
- ✅ Widely supported by audio editing tools

**Why not alternatives**:
- ❌ **OGG Vorbis**: Poor Safari/iOS support
- ❌ **WAV**: Uncompressed format = 10-20x larger file sizes
- ⚠️ **M4A/AAC**: Good option but MP3 is more universal for legacy browsers

## Technical Specifications

### Recommended Settings

| Property | Value | Reasoning |
|----------|-------|-----------|
| **Format** | MP3 | Universal browser support |
| **Bitrate** | 128-192kbps | Balance of quality and size |
| **Sample Rate** | 44.1kHz or 48kHz | Standard audio quality |
| **Channels** | Mono or Stereo | Stereo for spatial effects, mono for simple sounds |
| **Duration** | 0.1 - 0.5 seconds | Short, punchy UI feedback |
| **Target Size** | < 20KB each | Fast loading over slow connections |
| **Normalization** | -3dB to -6dB peak | Prevents clipping and distortion |

### Volume Levels (Set in JavaScript)

Each sound has a programmatically set volume to balance levels:

```javascript
const postalSound = new Audio('sounds/postal.mp3');
postalSound.volume = 0.5;  // 50% - Medium volume

const counterstrikeSound = new Audio('sounds/counterstrike.mp3');
counterstrikeSound.volume = 0.35;  // 35% - Lower volume (louder source file)
```

**Important**: Adjust volume based on source audio levels. Use normalization during export, then fine-tune in code.

## Creating Sound Effects

### Tools

#### Free & Open Source
- **[Audacity](https://www.audacityteam.org/)** (Recommended)
  - Free, cross-platform (Windows, macOS, Linux)
  - Full-featured audio editor
  - Built-in MP3 export
  - Excellent for trimming, normalizing, and effects

- **[Ocenaudio](https://www.ocenaudio.com/)**
  - Free, lightweight alternative
  - Simpler interface than Audacity
  - Good for quick edits

#### Command-Line
- **[ffmpeg](https://ffmpeg.org/)**
  - Powerful command-line tool
  - Excellent for batch processing
  - Precise control over encoding parameters
  
  ```bash
  # Convert to MP3 with specific settings
  ffmpeg -i input.wav -codec:a libmp3lame -b:a 128k -ar 44100 output.mp3
  
  # Trim to 0.5 seconds
  ffmpeg -i input.mp3 -t 0.5 -c copy output.mp3
  ```

#### Online Tools
- **CloudConvert** - https://cloudconvert.com/
- **Online Audio Converter** - https://online-audio-converter.com/
- Good for quick one-off conversions

### Recommended Workflow

#### 1. **Source Audio**
Find or create your sound effect:
- **Free sources**: 
  - [Freesound.org](https://freesound.org/) - CC-licensed sounds
  - [Zapsplat.com](https://www.zapsplat.com/) - Free sound effects
  - [BBC Sound Effects](https://sound-effects.bbcrewind.co.uk/) - Archive
- **Create your own**: Record and synthesize using DAW software
- **Extract from games**: Use game audio extractors (check licensing!)

#### 2. **Import and Trim**
In Audacity:
1. Import your sound file
2. Select the best 0.1-0.5 second portion
3. Trim away excess silence and unwanted parts
4. Listen to ensure clean start and end

#### 3. **Apply Effects**
```
Effect → Normalize → 
  ☑ Remove DC offset
  ☑ Normalize peak amplitude to -3.0 dB
  
Effect → Fade In → 1-5ms (prevents clicks)
Effect → Fade Out → 1-5ms (prevents clicks)
```

#### 4. **Export as MP3**
```
File → Export → Export as MP3

Settings:
  - Bit Rate Mode: Constant
  - Quality: 128-192 kbps
  - Channel Mode: Stereo (or Mono for simpler sounds)
```

#### 5. **Test and Optimize**
1. Check file size (should be < 20KB)
   - If too large: reduce duration, lower bitrate to 96kbps, or convert to mono
2. Test in browser using dev tools console:
   ```javascript
   const test = new Audio('sounds/yourfile.mp3');
   test.volume = 0.5;
   test.play();
   ```
3. Adjust volume in JavaScript if needed

#### 6. **Fine-Tune Volume**
After adding to the site:
1. Play alongside existing sounds
2. Adjust `sound.volume` property (0.0 to 1.0)
3. Test on different devices (speakers, headphones, mobile)

## Adding More Game Cards with Sounds

If you want to add additional game cards to [index.html](../index.html), follow these steps:

### 1. Add the Sound File
Place your new sound file in the `/sounds/` directory:
```bash
sounds/
  ├── postal.mp3
  ├── counterstrike.mp3
  └── newgame.mp3  # Your new sound
```

### 2. Create Audio Object in JavaScript
In [index.html](../index.html), add after existing sound definitions:

```javascript
// Existing sounds
const postalSound = new Audio('sounds/postal.mp3');
postalSound.volume = 0.5;

const counterstrikeSound = new Audio('sounds/counterstrike.mp3');
counterstrikeSound.volume = 0.35;

// Your new sound
const newGameSound = new Audio('sounds/newgame.mp3');
newGameSound.volume = 0.4;  // Adjust as needed (0.0 to 1.0)
```

### 3. Add to gameSounds Array
The array maps sounds to cards by their position in the HTML:

```javascript
const gameSounds = [
    postalSound,        // First .game-card in HTML
    counterstrikeSound, // Second .game-card in HTML
    newGameSound        // Third .game-card (your new one)
];
```

**Important**: Array order must match the order of `.game-card` elements in the HTML.

### 4. Add HTML for the Game Card
In the games section of [index.html](../index.html):

```html
<div class="game-card">
    <div class="game-banner new-game-banner">
        <div class="game-icon">
            <img src="images/icons/newgame.webp" alt="New Game Icon">
        </div>
    </div>
    <div class="game-info">
        <h3>Your Game Title</h3>
        <p id="lang-newgame-desc">Short description</p>
    </div>
</div>
```

### 5. Add CSS for the Banner
In the `<style>` section or CSS file:

```css
.new-game-banner { 
    background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), 
                      url('images/banners/newgame.webp');
    background-size: cover;
    background-position: center;
}
```

### 6. Add Translations (Optional)
If using bilingual support, add to the translations object:

```javascript
const translations = {
    cs: {
        // ... existing translations
        newgame_desc: "Popis hry v češtině"
    },
    en: {
        // ... existing translations  
        newgame_desc: "Game description in English"
    }
};
```

Then update the `setLanguage()` function to include:
```javascript
document.getElementById("lang-newgame-desc").textContent = 
    translations[lang].newgame_desc;
```

### Complete Example

**HTML**:
```html
<div class="game-card">
    <div class="game-banner half-life-banner">
        <div class="game-icon">
            <img src="images/icons/halflife.webp" alt="Half-Life">
        </div>
    </div>
    <div class="game-info">
        <h3>Half-Life 2</h3>
        <p id="lang-halflife-desc">Physics-based FPS masterpiece</p>
    </div>
</div>
```

**JavaScript**:
```javascript
const halfLifeSound = new Audio('sounds/halflife.mp3');
halfLifeSound.volume = 0.45;

const gameSounds = [
    postalSound,
    counterstrikeSound,
    halfLifeSound  // Add to array
];
```

**CSS**:
```css
.half-life-banner {
    background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)),
                url('images/banners/halflife.webp');
}
```

### How It Works

The existing event listeners automatically handle all `.game-card` elements:

```javascript
gameCards.forEach((card, index) => {
    const sound = gameSounds[index];  // Maps by position
    
    card.addEventListener('mouseenter', () => {
        if (!isMuted) {
            sound.currentTime = 0;
            sound.play();
        }
    });
    
    // ... touch events handled similarly
});
```

No need to add new event listeners - they're created dynamically for all game cards!
```html
<div class="game-card">
    <div class="game-banner your-game-banner">
        <div class="game-icon">
            <img src="path/to/icon.png" alt="Game Icon">
        </div>
    </div>
    <div class="game-info">
        <h3>Your Game Title</h3>
        <p id="lang-your-game-desc">Description</p>
    </div>
</div>
```

### 5. Add CSS for the banner
```css
.your-game-banner { 
    background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0)), 
                      url('images/banners/your-game.jpg'); 
}
```

### 6. Update translations (optional)
If using bilingual support, add translations for your game description:
```javascript
const translations = {
    cs: {
        // ... existing translations
        your_game_desc: "Czech description"
    },
    en: {
        // ... existing translations  
        your_game_desc: "English description"
    }
};
```

The script automatically maps sounds to cards by array position. The event listeners are added dynamically to all `.game-card` elements.

## Troubleshooting

### Sound Doesn't Play

**Check browser console for errors**:
```javascript
// Open DevTools (F12), check Console tab
// Look for errors like:
// "Failed to load resource: net::ERR_FILE_NOT_FOUND"
```

**Common causes**:
- ❌ Incorrect file path (check case-sensitivity on Linux servers)
- ❌ File not uploaded to `/sounds/` directory
- ❌ Wrong file extension (must be `.mp3`, not `.mp3.mp3` or `.MP3`)
- ❌ Mute button is activated (check localStorage)
- ❌ Browser autoplay policy (user must interact with page first)

**Solutions**:
```javascript
// Test sound manually in console
const test = new Audio('sounds/postal.mp3');
test.volume = 0.5;
test.play().then(() => {
    console.log('Sound played successfully');
}).catch(err => {
    console.error('Playback failed:', err);
});
```

### Sound Plays Twice on Mobile

**Symptom**: Tapping a card on mobile plays the sound twice

**Cause**: Both touch and mouse events firing on the same interaction

**Solution**: Ensure `preventDefault()` is called in `touchend` handler:
```javascript
card.addEventListener('touchend', (e) => {
    if (!touchMoved) {
        playSound();
    }
    e.preventDefault(); // Prevents mouse events from firing
});
```

### Volume Too Loud or Quiet

**Quick fix**: Adjust the `volume` property in JavaScript:
```javascript
// Too loud? Reduce volume
postalSound.volume = 0.3;  // Was 0.5

// Too quiet? Increase volume
counterstrikeSound.volume = 0.6;  // Was 0.35
```

**Better fix**: Normalize source audio files in Audacity:
1. Open sound file in Audacity
2. `Effect → Normalize → -3.0 dB`
3. Re-export as MP3
4. Test and adjust JavaScript volume as needed

### File Too Large

**If file size > 20KB**:

1. **Reduce bitrate**:
   ```bash
   ffmpeg -i input.mp3 -b:a 96k output.mp3
   ```

2. **Shorten duration**:
   - Re-trim in Audacity to 0.2-0.3 seconds
   - Remove silence at start/end

3. **Convert to mono** (if stereo):
   ```bash
   ffmpeg -i input.mp3 -ac 1 -b:a 128k output.mp3
   ```

4. **Use online compressor**: https://www.mp3smaller.com/

### Sounds Cut Off or Overlap

**Symptom**: Rapid hovering causes sounds to stack or cut each other off

**Solution**: Reset playback position before playing:
```javascript
sound.currentTime = 0;  // Reset to start
sound.play();
```

This is already implemented in the current code, but ensure it's present in your event handlers.

### Browser Autoplay Policy Blocks Sound

**Symptom**: First sound doesn't play, but subsequent sounds work

**Cause**: Modern browsers block autoplay until user interacts with page

**Current solution**: Sounds only play on user interaction (hover, click, tap)

**No fix needed** - This is expected browser behavior and the site handles it correctly.

### Sound Plays While Scrolling on Mobile

**Symptom**: Scrolling past game cards triggers sounds unintentionally

**Cause**: Touch detection threshold too low or missing

**Solution**: Verify 10px movement threshold is implemented:
```javascript
const deltaY = Math.abs(touchY - touchStartY);
if (deltaY > 10) {
    touchMoved = true;  // Cancel sound playback
}
```

Increase threshold to 15-20px if still triggering on slow scrolls.

### Testing Checklist

Before deploying sound changes:

- [ ] Test on desktop with mouse (hover and click)
- [ ] Test on mobile/tablet with touch (tap and scroll)
- [ ] Test mute button (enable/disable)
- [ ] Test page reload with mute enabled (localStorage persistence)
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Check file sizes (all < 20KB)
- [ ] Check console for errors
- [ ] Test with headphones and speakers (volume levels)
- [ ] Test while scrolling quickly (should not trigger)
- [ ] Test rapid tapping/hovering (should not stack audio)

## Resources & Further Reading

### Free Sound Libraries
- **[Freesound.org](https://freesound.org/)** - Collaborative database of CC-licensed sounds
- **[Zapsplat.com](https://www.zapsplat.com/)** - Free sound effects and music
- **[BBC Sound Effects](https://sound-effects.bbcrewind.co.uk/)** - 16,000+ effects from the BBC archive
- **[Sonniss Game Audio GDC](https://sonniss.com/gameaudiogdc)** - Annual free game audio bundle
- **[Kenney.nl](https://kenney.nl/assets?q=audio)** - Free game assets including sounds

### Audio Editing Software
- **[Audacity](https://www.audacityteam.org/)** - Free, open-source audio editor
- **[Ocenaudio](https://www.ocenaudio.com/)** - Simple, cross-platform audio editor
- **[LMMS](https://lmms.io/)** - Free DAW for creating original sounds
- **[Audiotool](https://www.audiotool.com/)** - Browser-based music production

### Command-Line Tools
- **[ffmpeg](https://ffmpeg.org/)** - Audio/video conversion and processing
- **[SoX](http://sox.sourceforge.net/)** - Sound eXchange, audio manipulation utility

### Documentation & Guides
- **[Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)** - MDN documentation
- **[HTML Audio Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)** - Audio tag reference
- **[Touch Events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)** - Touch interaction handling
- **[Autoplay Policy](https://developer.chrome.com/blog/autoplay/)** - Chrome autoplay documentation

### Browser Compatibility
- **[Can I Use - MP3](https://caniuse.com/mp3)** - MP3 format support
- **[Can I Use - Audio API](https://caniuse.com/audio-api)** - Web Audio API support
- **[Can I Use - Touch Events](https://caniuse.com/touch)** - Touch event support

### Online Tools
- **[CloudConvert](https://cloudconvert.com/)** - Online file converter
- **[Online Audio Converter](https://online-audio-converter.com/)** - Audio format conversion
- **[MP3 Smaller](https://www.mp3smaller.com/)** - Compress MP3 files online
- **[AudioMass](https://audiomass.co/)** - Browser-based audio editor

---

## Summary

This sound system provides:
- ✅ Desktop hover and click interactions  
- ✅ Mobile tap detection with scroll prevention  
- ✅ User-controlled mute toggle with persistence  
- ✅ Optimized MP3 files for fast loading  
- ✅ Smart touch handling to prevent accidental playback  
- ✅ Easy expansion for additional game cards

**Current implementation**: 2 game cards with sounds  
**Expandable to**: Unlimited cards (just follow the pattern)  
**File size**: < 20KB per sound for optimal performance  
**Browser support**: Universal (all modern browsers)

For questions or issues, see the [Troubleshooting](#troubleshooting) section above.

**Main README**: [../README.md](../README.md)  
**Live site**: https://grejprrik.xyz

