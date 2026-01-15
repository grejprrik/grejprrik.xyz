# Sound Files

Sound effects for the website.

## Required Files

- postal.mp3 - Sound for POSTAL 2 card
- counterstrike.mp3 - Sound for CS:S card

## How It Works

Each game card has its own unique sound that plays on:
- Desktop: Mouse hover or mouse click
- Mobile: Touch/tap (only on definitive tap, not when scrolling)

The sound system includes smart touch handling:
- Tracks touch start position
- Monitors touch movement during gesture
- Only plays sound if movement is less than 10px (a tap, not a scroll)
- Prevents duplicate playback on devices that fire both touch and mouse events

## Format Recommendation: MP3

Use MP3 because:
- Universal browser support (Chrome, Firefox, Safari, Edge, mobile)
- Excellent compression for small file sizes
- Quality loss is imperceptible for short UI sound effects
- Fast loading and decoding

## Technical Specifications

- Format: MP3
- Bitrate: 128-192kbps
- Length: 0.1-0.5 seconds
- Target file size: Under 20KB each
- Volume: Automatically set (postal: 50%, counterstrike: 35%)

## Adding More Game Cards

If you add more game cards to index.html:
1. Add a new sound file to this directory (e.g., game3.mp3)
2. Create the Audio object in the JavaScript:
   ```javascript
   const game3Sound = new Audio('sounds/game3.mp3');
   game3Sound.volume = 0.4; // Adjust as needed
   ```
3. Add it to the gameSounds array:
   ```javascript
   const gameSounds = [
       postalSound,        // First card
       counterstrikeSound, // Second card
       game3Sound          // Third card
   ];
   ```

The script automatically maps sounds to cards by array position.
