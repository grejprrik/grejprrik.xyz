const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imageFolder = './'; // Current directory, change if needed
const quality = 80;

async function convertToWebP() {
    try {
        const files = fs.readdirSync(imageFolder);

        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ext === '.jpg' || ext === '.jpeg' || ext === '.png';
        });

        if (imageFiles.length === 0) {
            console.log('No JPG or PNG files found.');
            return;
        }

        console.log(`Found ${imageFiles.length} image(s) to convert...\n`);

        for (const file of imageFiles) {
            const inputPath = path.join(imageFolder, file);
            const outputPath = path.join(
                imageFolder,
                path.basename(file, path.extname(file)) + '.webp'
            );

            try {
                await sharp(inputPath)
                .webp({ quality: quality })
                .toFile(outputPath);

                const inputStats = fs.statSync(inputPath);
                const outputStats = fs.statSync(outputPath);
                const savedPercent = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

                console.log(`✓ ${file} -> ${path.basename(outputPath)}`);
                console.log(`  Size: ${(inputStats.size / 1024).toFixed(1)}KB -> ${(outputStats.size / 1024).toFixed(1)}KB (${savedPercent}% saved)\n`);
            } catch (err) {
                console.error(`✗ Failed to convert ${file}:`, err.message);
            }
        }

        console.log('Conversion complete!');
    } catch (err) {
        console.error('Error:', err.message);
    }
}

convertToWebP();
