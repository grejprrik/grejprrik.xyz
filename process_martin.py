from PIL import Image
import os

def process_martin():
    input_path = "images/martin.jpg"
    
    # 1. Full-size WebP
    with Image.open(input_path) as img:
        img.save("images/martin.webp", "WEBP", quality=85)
        print("✓ Created images/martin.webp")

    # 2. Thumbnail (400x400 squared, crop from center)
    with Image.open(input_path) as img:
        width, height = img.size
        min_dim = min(width, height)
        left = (width - min_dim) / 2
        top = (height - min_dim) / 2
        right = (width + min_dim) / 2
        bottom = (height + min_dim) / 2
        
        thumb = img.crop((left, top, right, bottom))
        thumb = thumb.resize((400, 400), Image.Resampling.LANCZOS)
        thumb.save("images/thumbs/martin.webp", "WEBP", quality=80)
        print("✓ Created images/thumbs/martin.webp")

    # 3. Medium (1920px max width)
    with Image.open(input_path) as img:
        width, height = img.size
        if width > 1920:
            ratio = 1920 / width
            new_height = int(height * ratio)
            medium = img.resize((1920, new_height), Image.Resampling.LANCZOS)
        else:
            medium = img
        medium.save("images/medium/martin.webp", "WEBP", quality=85)
        print("✓ Created images/medium/martin.webp")

if __name__ == "__main__":
    if os.path.exists("images/martin.jpg"):
        process_martin()
    else:
        print("Error: images/martin.jpg not found!")
