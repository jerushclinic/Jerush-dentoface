import json, re

with open('scratch/page_inspection.txt') as f:
    lines = f.readlines()

def clean_text(t):
    return t.replace('\t', ' ').strip()

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
    if b == 'O+VE': b = 'O+'
    if b == 'B+VE': b = 'B+'
    if b == 'A+VE': b = 'A+'
    if b == 'AB+VE': b = 'AB+'
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

def infer_emergency_contact(pc_str):
    if not pc_str:
        return {'name': '', 'phone': '', 'relation': 'Relative'}
    pc = pc_str.strip()
    m_so = re.match(r'S/O[.\s]*(.*)', pc, re.IGNORECASE)
    if m_so:
        return {'name': m_so.group(1).strip(), 'phone': '', 'relation': 'Father'}
    m_do = re.match(r'D/O[.,\s]*(.*)', pc, re.IGNORECASE)
    if m_do:
        return {'name': m_do.group(1).strip(), 'phone': '', 'relation': 'Father'}
    m_wo = re.match(r'W/O[.\s]*(.*)', pc, re.IGNORECASE)
    if m_wo:
        return {'name': m_wo.group(1).strip(), 'phone': '', 'relation': 'Spouse'}
    return {'name': pc, 'phone': '', 'relation': 'Contact'}

def infer_gender(name, pc_str, role):
    if pc_str:
        if re.search(r'S/O', pc_str, re.IGNORECASE):
            return 'Male'
        if re.search(r'D/O|W/O', pc_str, re.IGNORECASE):
            return 'Female'
    # Name heuristics
    male_names = ['Bladbin', 'Prabin', 'Rajesh', 'Satheesh', 'Shine', 'Liju', 'Dhivin', 'Sukustel', 'Darwin', 'Stanley', 'Vijayan', 'Rajendran', 'Raja Kumar', 'Ajith']
    for m in male_names:
        if m.lower() in name.lower():
            return 'Male'
    return 'Female'

def infer_doj(emp_code):
    if not emp_code:
        return '2025-01-01'
    m = re.search(r'(\d{4})', emp_code)
    if m:
        year = m.group(1)
        return f"{year}-01-01"
    return '2025-01-01'

print("Setup helper functions ready.")
