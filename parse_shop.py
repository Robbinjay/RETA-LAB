import re
import json

with open('shop.html', 'r', encoding='utf-8') as f:
    html = f.read()

titles_iter = re.finditer(r'<h[34][^>]*>(?:<a href="([^"]+)">)?([^<]+)(?:</a>)?</h[34]>', html)

products = []
seen = set()

for match in titles_iter:
    url = match.group(1) or ""
    title = match.group(2).replace('&#8211;', '-').strip()
    
    if not title or title in seen:
        continue
        
    start_pos = match.end()
    price_match = re.search(r'<bdi><span class="woocommerce-Price-currencySymbol"[^>]*>&#36;</span>([0-9.]+)</bdi>', html[start_pos:start_pos+2000])
    price = price_match.group(1) if price_match else "0.00"
    
    # Try to find the image in the containing block
    # Search backwards for a containing div, or just search backwards up to 8000 characters
    back_start = max(0, match.start() - 8000)
    back_html = html[back_start:match.start()]
    
    img_matches = re.findall(r'<img[^>]+nitro-lazy-src="([^"]+)"', back_html)
    if not img_matches:
        img_matches = re.findall(r'<img[^>]+data-src="([^"]+)"', back_html)
    if not img_matches:
        img_matches = re.findall(r'<img[^>]+src="([^"]+)"', back_html)
        
    image = ""
    if img_matches:
        for img in reversed(img_matches):
            if 'logo' not in img.lower() and 'icon' not in img.lower() and 'data:image' not in img:
                image = img
                break
                
    seen.add(title)
    
    # Category detection
    t_lower = title.lower()
    if 'retatrutide' in t_lower: category = 'Retatrutide'
    elif 'tirzepatide' in t_lower: category = 'Tirzepatide'
    elif 'semaglutide' in t_lower: category = 'Semaglutide'
    elif 'blend' in t_lower or '+' in t_lower: category = 'Blends'
    else: category = 'Other Peptides'
    
    # Use placeholder if still no image
    if not image:
        image = f"https://picsum.photos/seed/peptide{len(products) + 1}/400/400"

    products.append({
        "id": len(products) + 1,
        "title": title,
        "price": f"${price}",
        "url": url,
        "image": image,
        "category": category,
        "description": "High-purity research peptide."
    })

print(f"Total products: {len(products)}")
print(f"Products with real images: {len([p for p in products if 'picsum.photos' not in p['image']])}")

with open('app/shop/products.json', 'w') as out:
    json.dump(products, out, indent=2)
