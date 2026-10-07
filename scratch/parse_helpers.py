import json, re

with open('scratch/all_elements_strict.json') as f:
    elements = json.load(f)

# Sort elements by page, y, x
elements.sort(key=lambda e: (e['page'], e['y'], e['x']))

# Helper to normalize date: e.g. "30/6/1978" -> "1978-06-30", "01.01.1963" -> "1963-01-01"
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

# Helper to normalize blood group: e.g. "AB\t+ve" -> "AB+", "O+ve" -> "O+", "o+ve" -> "O+", "A1+Ve" -> "A1+", "A1-ve" -> "A1-", "A-ve" -> "A-"
def normalize_blood(b_str):
    if not b_str: return ''
    b = b_str.replace('\t', '').replace(' ', '').upper()
    b = b.replace('+VE', '+').replace('-VE', '-').replace('VE', '')
    return b

# Helper to normalize phone: e.g. "94431-47724\t/\n94883-01111" -> "+91 94431 47724 / +91 94883 01111"
def normalize_phone(p_str):
    if not p_str: return ''
    # extract all 10-digit or 5+5 numbers
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

# Let's inspect each page and parse
print("Testing parsing...")
