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

# Let's inspect each page's distinct Y lines and detect sections vs rows
SECTIONS_MAP = {
    'ADMIN STAFFS': ('management', 'Management'),
    'DUTY DOCTORS - DENTAL': ('dental_doctors', 'Dental Doctors'),
    'DUTY DOCTORS - COSMETIC': ('cosmetic_doctors', 'Cosmetic Doctors'),
    'DENTAL PRO': ('pro', 'Patient Relationship Officers'),
    'COSMETIC PRO': ('pro', 'Patient Relationship Officers'),
    'ACCOUNTS DEPT': ('accounts', 'Accounts Department'),
    'DIGITAL MARKETING': ('digital_tech', 'Digital Tech "E" Team'),
    'MAINTENANCE DEPT': ('maintenance', 'Maintenance Department'),
    'RECEPTIONIST': ('front_office', 'Front Office Team'),
    'ALIGNER': ('aligners_crowns', 'Clear Aligner and Dental Crown Manufacturing Department'),
    'DENTAL LAB': ('lab_technician', 'Dental Lab'),
    'OPG': ('xray', 'X-Ray Department'),
    'PHARMAC\\': ('pharmacy', 'Pharmacy Department'),
    'PHARMACY': ('pharmacy', 'Pharmacy Department'),
    'IMPRESSION ROOM': ('lab_technician', 'Impression Room'),
    'LAB': ('lab_technician', 'Lab Technician'),
    "DENTAL ASSISTANT'S": ('dental_assistants', 'Dental Assistants'),
    "COSMETIC ASSISTANT'S": ('cosmetic_assistants', 'Cosmetic Assistants'),
    'OFFICE STAFFS': ('transport', 'Office Staff & Transport'),
    'HOUSE KEEPER': ('housekeeping', 'House Keeping Department'),
    'SECURITY': ('security', 'Security Service Department'),
    'TRAINEE': ('trainee', 'Trainees')
}

# Let's test identifying rows on each page
print("Testing section mapping...")
