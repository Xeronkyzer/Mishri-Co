import os
import math
from PIL import Image

def main():
    img_path = '/Users/suryash/Downloads/MISHRI&co/public/logo-original.png'
    out_path = '/Users/suryash/Downloads/MISHRI&co/public/logo-aaharvedik.png'
    
    if not os.path.exists(img_path):
        print(f"Error: {img_path} does not exist.")
        return
        
    img = Image.open(img_path)
    img = img.convert('RGBA')
    width, height = img.size
    
    # Bounding box coordinates to search for logo (avoid shadows in corners)
    min_x, max_x = 200, 824
    min_y, max_y = 150, 423
    
    # Sample background color at (200, 150)
    bg_pixel = img.getpixel((200, 150))
    bg_r, bg_g, bg_b, _ = bg_pixel
    print(f"Background color: R={bg_r}, G={bg_g}, B={bg_b}")
    
    left, right = max_x, min_x
    top, bottom = max_y, min_y
    
    # Second pass: let's filter for dark green/olive pixels.
    # The logo color is olive green: R around 60-120, G around 80-140, B around 30-90.
    # Let's define olive green color criteria: R < 160, G < 170, B < 120, and diff from bg is significant.
    for y in range(min_y, max_y):
        for x in range(min_x, max_x):
            r, g, b, a = img.getpixel((x, y))
            dist = math.sqrt((r - bg_r)**2 + (g - bg_g)**2 + (b - bg_b)**2)
            # Only count as logo if it is dark/greenish (not a shadow)
            if dist > 30 and r < 160 and g < 170 and b < 120:
                if x < left:
                    left = x
                if x > right:
                    right = x
                if y < top:
                    top = y
                if y > bottom:
                    bottom = y
                    
    print(f"Filtered Bounding box: left={left}, top={top}, right={right}, bottom={bottom}")
    
    if left >= right or top >= bottom:
        print("Error: Logo bounding box not found.")
        return
        
    # Crop to bounding box
    crop_w = right - left + 1
    crop_h = bottom - top + 1
    
    logo_img = Image.new('RGBA', (crop_w, crop_h))
    
    # Copy pixels and make background transparent
    for y in range(crop_h):
        for x in range(crop_w):
            orig_x = left + x
            orig_y = top + y
            r, g, b, a = img.getpixel((orig_x, orig_y))
            dist = math.sqrt((r - bg_r)**2 + (g - bg_g)**2 + (b - bg_b)**2)
            
            # If the pixel is close to background, or is not in the olive color range (i.e. shadow)
            if dist <= 30 or r >= 170 or g >= 180 or b >= 140:
                # Transparent
                logo_img.putpixel((x, y), (0, 0, 0, 0))
            else:
                # Smooth transparency transition based on how distinct the pixel is
                alpha = int(min(255, (dist - 20) * 10))
                logo_img.putpixel((x, y), (r, g, b, alpha))
                
    logo_img.save(out_path, 'PNG')
    print(f"Extracted transparent logo saved to {out_path}")

if __name__ == '__main__':
    main()
