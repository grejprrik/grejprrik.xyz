#!/bin/bash

# Create medium-sized images directory if it doesn't exist
mkdir -p images/medium

# Generate medium-sized images for viewing (max 1920px width for 1080p screens)
for i in {1..6}; do
    if [ -f "images/photo$i.jpg" ]; then
        convert "images/photo$i.jpg" -resize 1920x1920\> -quality 90 "images/medium/photo$i.jpg"
        echo "Created medium image for photo$i.jpg"
    fi
done

echo "Medium-sized images generated successfully!"
