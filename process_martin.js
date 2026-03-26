const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processMartin() {
    const input = 'images/martin.jpg';
    
    // 1. Full-res WebP
    await sharp(input)
        .webp({ quality: 85 })
        .toFile('images/martin.webp');
    console.log('✓ Created images/martin.webp');

    // 2. Thumbnail (400x400 squared)
    await sharp(input)
        .resize(400, 400, {
            fit: 'cover',
            position: 'center'
        })
        .webp({ quality: 80 })
        .toFile('images/thumbs/martin.webp');
    console.log('✓ Created images/thumbs/martin.webp');

    // 3. Medium (1920 max width)
    await sharp(input)
        .resize({ width: 1920, withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile('images/medium/martin.webp');
    console.log('✓ Created images/medium/martin.webp');
}

processMartin().catch(err => {
    console.error('Error processing martin.jpg:', err);
    process.exit(1);
});
