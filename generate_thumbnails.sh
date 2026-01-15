#!/bin/bash

# Create thumbnails directory if it doesn't exist
mkdir -p images/thumbs

# Generate thumbnails for all photo*.jpg files
for img in images/photo*.jpg; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        magick "$img" -resize 400x400^ -gravity center -extent 400x400 -quality 85 "images/thumbs/$filename"
        echo "Created thumbnail for $filename"
    fi
done

echo "Thumbnails generated successfully!"
