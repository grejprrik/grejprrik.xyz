#!/bin/bash

# Create medium-sized images directory if it doesn't exist
mkdir -p images/medium

# Generate medium-sized images for all photo*.jpg files (max 1920px width for 1080p screens)
for img in images/photo*.jpg; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        magick "$img" -resize 1920x1920\> -quality 90 "images/medium/$filename"
        echo "Created medium image for $filename"
    fi
done

echo "Medium-sized images generated successfully!"
