# Sound Files

Sound effects for interactive game cards on the website.

## Required Files

- `postal.mp3` - Sound for POSTAL 2 card
- `counterstrike.mp3` - Sound for Counter-Strike: Source card

## How It Works

Each game card has its own unique sound that plays on:
- **Desktop**: Mouse hover or mouse click
- **Mobile**: Touch/tap (only on definitive tap, not when scrolling)

### Mute Button
- Located at top-right of page, below hamburger menu
- Toggles sound on/off
- State persisted via localStorage (remembers across page reloads)
- Icon changes between volume-up and volume-mute
- Red accent color when muted
- Stops all currently playing sounds when muted

### Smart Touch Handling
The sound system includes intelligent touch event detection:
- Tracks touch start position
- Monitors touch movement during gesture
- Only plays sound if movement is less than 10px (distinguishes tap from scroll)
- Prevents duplicate playback on devices that fire both touch and mouse events
- Touch events have priority over mouse events to avoid double-triggering

This ensures sounds only play for intentional taps, not accidental touches while scrolling.

## Format Recommendation: MP3

Use MP3 because:
- Universal browser support (Chrome, Firefox, Safari, Edge, mobile browsers)
- Excellent compression for small file sizes
- Quality loss is imperceptible for short UI sound effects
- Fast loading and decoding
- No licensing issues for personal use

Alternative formats like OGG or WAV are not recommended:
- OGG: Limited Safari/iOS support
- WAV: Too large for web use (uncompressed)

## Technical Specifications

- **Format**: MP3
- **Bitrate**: 128-192kbps (good balance of quality and size)
- **Sample Rate**: 44.1kHz or 48kHz
- **Length**: 0.1-0.5 seconds (short, punchy effects work best)
- **Target file size**: Under 20KB each
- **Volume**: Set programmatically in JavaScript
  - `postal.mp3`: 50% (0.5)
  - `counterstrike.mp3`: 35% (0.35)
  - Adjust based on source audio levels

## Creating Sound Effects

### Tools
- **Audacity** (free, cross-platform)
- **ffmpeg** (command-line, excellent for batch processing)
- **Online converters** (for quick conversions)

### Recommended Workflow
1. Find or create your sound effect (royalty-free sources recommended)
2. Trim to 0.1-0.5 seconds
3. Normalize audio to prevent clipping
4. Apply fade-in/fade-out (1-5ms) to prevent clicks
5. Export as MP3:
   - Bitrate: 128-192kbps
   - Quality: High
6. Test file size (should be under 20KB)
7. Test in browser with your target volume setting

## Adding More Game Cards

If you add more game cards to index.html:

### 1. Add the sound file
Place your new sound file in this directory (e.g., `game3.mp3`)

### 2. Create the Audio object in JavaScript
```javascript
const game3Sound = new Audio('sounds/game3.mp3');
game3Sound.volume = 0.4; // Adjust as needed (0.0 to 1.0)
```

### 3. Add to the gameSounds array
The array maps sounds to cards by position:
```javascript
const gameSounds = [
    postalSound,        // First card (POSTAL 2)
    counterstrikeSound, // Second card (CS:S)
    game3Sound          // Third card (your new game)
];
```

### 4. Add the HTML for the game card
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

### Sound doesn't play
- Check browser console for errors
- Verify file path is correct
- Ensure file format is MP3
- Test with mute button disabled
- Some browsers block autoplay - user interaction required first

### Sound plays twice on mobile
- Ensure touch event handling is implemented correctly
- The `touchUsed` flag should prevent mouse events after touch

### Volume too loud/quiet
- Adjust the `volume` property (0.0 to 1.0)
- Consider normalizing source audio files
- Test on multiple devices

### File too large
- Re-export at lower bitrate (try 128kbps)
- Trim unnecessary silence
- Shorten duration if possible

## Resources

- **Royalty-free sounds**: Freesound.org, Zapsplat.com
- **Audacity**: https://www.audacityteam.org/
- **ffmpeg**: https://ffmpeg.org/
- **Web Audio API docs**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
