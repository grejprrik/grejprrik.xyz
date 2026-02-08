# Sound Effects System

Game card hover/tap sounds with touch detection and mute toggle.

## Files

| File | Purpose | Volume | Size |
|------|---------|--------|------|
| `postal.mp3` | POSTAL 2 sound | 50% | < 20KB |
| `counterstrike.mp3` | CS:S sound | 35% | < 20KB |

## How It Works

**Desktop**: Sound plays on hover or click  
**Mobile**: Tap only (10px threshold prevents scroll triggers)  
**Mute**: localStorage persisted, inline SVG icon

## Adding New Sound

1. Place MP3 in `/sounds/` (0.1-0.5s, < 20KB, 128-192kbps)
2. Add to index.html:
```javascript
const newSound = new Audio('sounds/newgame.mp3');
newSound.volume = 0.4;

const gameSounds = [postalSound, counterstrikeSound, newSound];
```
3. Add game card HTML (order must match array)

## Creating Sounds

Use [Audacity](https://www.audacityteam.org/):
1. Import audio
2. Trim to 0.1-0.5s
3. Effect → Normalize → -3.0 dB
4. Export as MP3 (128kbps)

Or ffmpeg:
```bash
ffmpeg -i input.wav -codec:a libmp3lame -b:a 128k -t 0.5 output.mp3
```

## Troubleshooting

- **No sound**: Check console, verify file path, ensure user interaction happened
- **Plays twice**: Add `e.preventDefault()` in touchend handler
- **Too loud/quiet**: Adjust `sound.volume` in JavaScript
- **Plays while scrolling**: Increase threshold to 15-20px

## Resources

- [Freesound.org](https://freesound.org/) - Free CC sounds
- [Audacity](https://www.audacityteam.org/) - Audio editor
- [ffmpeg](https://ffmpeg.org/) - CLI conversion

---

**Live**: https://grejprrik.xyz  
**Repo**: https://github.com/grejprrik/grejprrik.xyz