import os
from PIL import Image

def resize_images(directory):
    max_size = (800, 800)
    for filename in os.listdir(directory):
        if filename.startswith("offkai_") and filename.lower().endswith(('.jpg', '.jpeg')):
            filepath = os.path.join(directory, filename)
            try:
                # Get initial file size for comparison
                initial_size = os.path.getsize(filepath)
                
                with Image.open(filepath) as img:
                    # Correct orientation based on EXIF tag if present
                    try:
                        from PIL import ImageOps
                        img = ImageOps.exif_transpose(img)
                    except Exception:
                        pass
                        
                    img.thumbnail(max_size, Image.Resampling.LANCZOS)
                    # Use progressive and optimized saving
                    img.save(filepath, "JPEG", optimize=True, quality=80, progressive=True)
                    
                final_size = os.path.getsize(filepath)
                print(f"Resized {filename}: {initial_size/1024:.1f}KB -> {final_size/1024:.1f}KB")
            except Exception as e:
                print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    resize_images("images")
