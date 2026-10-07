import json, re

with open('scratch/all_elements_strict.json') as f:
    elements = json.load(f)

# Sort elements by page, y, x
elements.sort(key=lambda e: (e['page'], e['y'], e['x']))

def normalize_date(d_str):
    if not d_str: return ''
    d_str = d_str.strip().replace('.', '/').replace('-', '/')
    m = re.match(r'(\d{1,2})/(\d{1,2})/(\d{4})', d_str)
    if m:
        day = int(m.group(1))
        month = int(m.group(2))
        year = int(m.group(3))
        return f"{year:04d}-{month:02d}-{day:02d}"
    return d_str

def normalize_blood(b_str):
    if not b_str: return ''
    b = b_str.replace('\t', '').replace(' ', '').upper()
    b = b.replace('+VE', '+').replace('-VE', '-').replace('VE', '')
    return b

def normalize_phone(p_str):
    if not p_str: return ''
    cleaned = p_str.replace('\t', ' ').replace('\n', ' ')
    parts = re.findall(r'(\d{5}[-\s]?\d{5}|\d{10})', cleaned)
    if parts:
        formatted = []
        for part in parts:
            digits = re.sub(r'\D', '', part)
            if len(digits) == 10:
                formatted.append(f"+91 {digits[:5]} {digits[5:]}")
            else:
                formatted.append(part)
        return " / ".join(formatted)
    return p_str.strip()

# Print all elements on each page line by line to verify how they cluster
with open('scratch/page_inspection.txt', 'w') as out:
    for p in range(1, 7):
        p_elems = [e for e in elements if e['page'] == p]
        out.write(f"\n==================== PAGE {p} ====================\n")
        # group by exact y
        y_map = {}
        for e in p_elems:
            y_map.setdefault(e['y'], []).append(e)
        for y in sorted(y_map.keys()):
            items = y_map[y]
            items.sort(key=lambda x: x['x'])
            line_str = " | ".join([f"[x={it['x']:.1f}, font={it['font']}] {repr(it['text'])}" for it in items])
            out.write(f"y={y:6.1f}: {line_str}\n")

print("Wrote page inspection to scratch/page_inspection.txt")
