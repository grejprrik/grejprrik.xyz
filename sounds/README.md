# Sound Files

Sound effects for the website.

## Required Files

- postal.mp3 - Sound for POSTAL 2 card (both hover and click)
- counterstrike.mp3 - Sound for CS:S card (both hover and click)

## How It Works

Each game card has its own unique sound that plays on:
- Desktop: Mouse hover + mouse click
- Mobile: Touch/tap (plays once, not twice)

The sound system automatically prevents duplicate playback on touch devices where both touch and mouse events could fire.

## Placeholder Notice

These files are currently missing. The code is ready but sounds will be silently ignored until you add actual audio files here.

## Format Recommendation: MP3

Use MP3 because:
- Universal browser support (Chrome, Firefox, Safari, Edge, mobile)
- Excellent compression for small file sizes
- Quality loss is imperceptible for short UI sound effects
- Fast loading and decoding

Don't use FLAC:
- Not supported in all browsers (Safari doesn't support it)
- Much larger file sizes (5-10x bigger than MP3)
- Overkill quality for short UI sounds
- Slower loading times

## Specs

- Format: MP3
- Bitrate: 128kbps or 192kbps
- Length: 0.1-0.5 seconds
- Sample Rate: 44.1kHz
- Volume: Pre-normalized to avoid being too loud (script sets volume to 35%)
- Target Size: Under 20KB each

## Suggested Sounds

- POSTAL 2: Something gritty/edgy (gunshot, weapon sound, voice clip)
- Counter-Strike: Tactical sound (weapon switch, reload click, radio beep)

## Adding More Game Cards

If you add more game cards to index.html:
1. Add a new sound file to this directory (e.g., game3.mp3)
2. Update the gameSounds array in the JavaScript to include it
3. The script automatically maps sounds to cards by position
