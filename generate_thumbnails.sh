#!/bin/bash

# Create thumbnails directory if it doesn't exist
mkdir -p images/thumbs

# Generate thumbnails for all gallery photos (max width 400px, maintains aspect ratio)
for i in {1..6}; do
    if [ -f "images/photo$i.jpg" ]; then
        convert "images/photo$i.jpg" -resize 400x400^ -gravity center -extent 400x400 -quality 85 "images/thumbs/photo$i.jpg"
        echo "Created thumbnail for photo$i.jpg"
    fi
done

echo "Thumbnails generated successfully!"
