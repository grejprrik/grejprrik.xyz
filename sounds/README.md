# Sound Files

Sound effects for the website.

## Required Files

- postal.mp3 - Sound for POSTAL 2 card (both hover and click)
- counterstrike.mp3 - Sound for CS:S card (both hover and click)

## How It Works

Each game card has its own unique sound that plays on:
- Desktop: Mouse hover or mouse click
- Mobile: Touch/tap 

The sound system automatically prevents duplicate playback on touch devices where both touch and mouse events could fire.

## Format Recommendation: MP3

Use MP3 because:
- Universal browser support (Chrome, Firefox, Safari, Edge, mobile)
- Excellent compression for small file sizes
- Quality loss is imperceptible for short UI sound effects
- Fast loading and decoding

## Adding More Game Cards

If you add more game cards to index.html:
1. Add a new sound file to this directory (e.g., game3.mp3)
2. Update the gameSounds array in the JavaScript to include it
3. The script automatically maps sounds to cards by position
