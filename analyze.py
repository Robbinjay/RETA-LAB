import re
from html.parser import HTMLParser

with open('shop.html', 'r', encoding='utf-8') as f:
    content = f.read()

products = re.findall(r'<li[^>]*class="[^"]*product type-product[^"]*"[^>]*>(.*?)</li>', content, re.IGNORECASE | re.DOTALL)
print(f"Total products found: {len(products)}")

if products:
    sample = products[0]
    title_match = re.search(r'<h2[^>]*class="woocommerce-loop-product__title"[^>]*>(.*?)</h2>', sample, re.IGNORECASE)
    price_match = re.search(r'<span class="woocommerce-Price-currencySymbol"[^>]*>.*?</span>([0-9.]+)', sample, re.IGNORECASE)
    img_match = re.search(r'<img[^>]*src="([^"]+)"', sample, re.IGNORECASE)
    link_match = re.search(r'<a href="([^"]+)"', sample, re.IGNORECASE)
    
    print("Sample Product Data:")
    if title_match: print("Title:", title_match.group(1))
    if price_match: print("Price:", price_match.group(1))
    if img_match: print("Image URL:", img_match.group(1))
    if link_match: print("Link URL:", link_match.group(1))
