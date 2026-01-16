const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Convert images to WebP with 70% quality for better compression
const convertToWebP = async (inputFile, quality = 70) => {
    const outputFile = inputFile.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    
    try {
        const inputStats = fs.statSync(inputFile);
        await sharp(inputFile)
            .webp({ quality })
            .toFile(outputFile);
        
        const outputStats = fs.statSync(outputFile);
        const savedBytes = inputStats.size - outputStats.size;
        const savedPercent = ((savedBytes / inputStats.size) * 100).toFixed(1);
        
        console.log(`✓ ${path.basename(inputFile)} → ${path.basename(outputFile)}`);
        console.log(`  ${(inputStats.size / 1024).toFixed(1)}KB → ${(outputStats.size / 1024).toFixed(1)}KB (saved ${savedPercent}%)\n`);
        
        return true;
    } catch (err) {
        console.error(`✗ Error converting ${inputFile}:`, err.message);
        return false;
    }
};

// Process all images in current directory
const processDirectory = async () => {
    const files = fs.readdirSync('.');
    const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f) && !f.startsWith('.'));
    
    if (imageFiles.length === 0) {
        console.log('No JPG/PNG images found in current directory.');
        return;
    }
    
    console.log(`Found ${imageFiles.length} images to convert:\n`);
    
    for (const file of imageFiles) {
        await convertToWebP(file, 70);
    }
    
    console.log('✓ Conversion complete!');
};

processDirectory();
