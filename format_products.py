import json
import random

with open('products_data.json', 'r') as f:
    products = json.load(f)

for p in products:
    if not p.get('image'):
        # Fallback image using placeholder
        # random color based on id to make them look different
        p['image'] = f"https://picsum.photos/seed/peptide{p['id']}/400/400"
    
    # Optional: categorize based on name
    title = p['title'].lower()
    if 'retatrutide' in title:
        p['category'] = 'Retatrutide'
    elif 'tirzepatide' in title:
        p['category'] = 'Tirzepatide'
    elif 'semaglutide' in title:
        p['category'] = 'Semaglutide'
    elif 'blend' in title or '+' in title:
        p['category'] = 'Blends'
    else:
        p['category'] = 'Other Peptides'

with open('app/shop/products.json', 'w') as f:
    json.dump(products, f, indent=2)

