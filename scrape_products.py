import urllib.request
from html.parser import HTMLParser
import json
import re

req = urllib.request.Request('https://orionpeptide.com/shop/', headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    
    # Let's just find titles and prices
    titles = re.findall(r'<h2 class="woocommerce-loop-product__title">(.*?)</h2>', html)
    prices = re.findall(r'<span class="woocommerce-Price-currencySymbol">&#36;</span>([0-9.]+)', html)
    images = re.findall(r'<img width="300" height="300" src="([^"]+)"', html)
    
    products = []
    for i in range(min(len(titles), len(prices))):
        img = images[i] if i < len(images) else "https://picsum.photos/seed/peptide/300/300"
        products.append({
            'title': titles[i].replace('&#8211;', '-'),
            'price': prices[i],
            'image': img,
            'description': 'High-purity research peptide.'
        })
    print(json.dumps(products, indent=2))
except Exception as e:
    print(e)
