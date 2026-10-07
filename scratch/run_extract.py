import json, re

with open('scratch/all_elements_strict.json') as f:
    elements = json.load(f)

from scratch.build_helpers import clean_text, normalize_date, normalize_blood, normalize_phone, infer_emergency_contact, infer_gender, infer_doj

from scratch.extract_all_staff import STAFF_BASELINES

COLUMNS = [
    ('name', 0, 205),
    ('empCode', 205, 395),
    ('role', 395, 590),
    ('dob', 590, 710),
    ('primaryContact', 710, 890),
    ('address', 890, 1260),
    ('pincode', 1260, 1340),
    ('bloodGroup', 1340, 1460),
    ('phone', 1460, 2500)
]

def get_col(x):
    for col_name, x_min, x_max in COLUMNS:
        if x_min <= x < x_max:
            return col_name
    return None

records = []
for idx, (page, base_y, dept_id, dept_label, default_role) in enumerate(STAFF_BASELINES, 1):
    # Find all elements belonging to this row: within +- 26 of base_y on this page
    # Note: ensure we do NOT pick up elements from adjacent rows
    row_elems = [e for e in elements if e['page'] == page and abs(e['y'] - base_y) <= 26]
    
    # Exclude section headers (x between 80 and 300 with font F5 that match section titles)
    filtered = []
    for e in row_elems:
        t = e['text'].strip()
        if e['font'] == 'F5' and any(h in t.upper() for h in ['DEPT', 'DOCTOR', 'ADMIN', 'PRO', 'MARKETING', 'RECEPTIONIST', 'ALIGNER', 'LAB', 'OPG', 'PHARMACY', 'IMPRESSION', 'ASSISTANT', 'OFFICE', 'HOUSE', 'SECURITY', 'TRAINEE']):
            continue
        filtered.append(e)
        
    # Group filtered elements by column
    cols = {c[0]: [] for c in COLUMNS}
    for e in sorted(filtered, key=lambda x: (x['y'], x['x'])):
        c = get_col(e['x'])
        if c:
            cols[c].append(e['text'])
            
    raw_name = " ".join(cols['name']).replace('\n', ' ').strip()
    raw_code = " ".join(cols['empCode']).replace('\n', ' ').strip()
    raw_role = " ".join(cols['role']).replace('\n', ' ').strip() or default_role
    raw_dob = " ".join(cols['dob']).replace('\n', ' ').strip()
    raw_pc = " ".join(cols['primaryContact']).replace('\n', ' ').strip()
    raw_addr = " ".join(cols['address']).replace('\n', ' ').strip()
    raw_pin = " ".join(cols['pincode']).replace('\n', ' ').strip()
    raw_blood = " ".join(cols['bloodGroup']).replace('\n', ' ').strip()
    raw_phone = " ".join(cols['phone']).replace('\n', ' ').strip()
    
    # Clean up name: e.g. "Dr.Bladbin A" -> "Dr. Bladbin A"
    name = re.sub(r'Dr\.([A-Za-z])', r'Dr. \1', raw_name)
    name = re.sub(r'\s+', ' ', name).strip()
    
    # Clean up empCode: e.g. "JHS-2005-002-DIR"
    emp_code = re.sub(r'\s+', '', raw_code)
    if not emp_code:
        # Generate code if missing
        prefix = dept_id[:3].upper()
        emp_code = f"JHS-TKY-2026-{idx:03d}-{prefix}"
        
    # Clean up address:
    address_parts = [p.strip() for p in raw_addr.replace('\t', ' ').split(',') if p.strip()]
    cleaned_address = ", ".join(address_parts)
    if raw_pin and raw_pin not in cleaned_address:
        cleaned_address += f" - {raw_pin}"
    elif not raw_pin:
        # Check if 6-digit pin is in address
        pin_m = re.search(r'\b62\d{4}\b', cleaned_address)
        if pin_m:
            raw_pin = pin_m.group(0)
            
    norm_dob = normalize_date(raw_dob)
    norm_blood = normalize_blood(raw_blood)
    norm_phone = normalize_phone(raw_phone)
    emer_contact = infer_emergency_contact(raw_pc)
    gender = infer_gender(name, raw_pc, raw_role)
    doj = infer_doj(emp_code)
    
    # Custom image preservation if doctor
    img = ''
    if 'bladbin' in name.lower():
        img = '/images/doctors/bladbin1.webp'
        qualification = 'MBBS, LLB, MDS(OMFS), PHD, FAM(Ger)'
    elif 'binila' in name.lower():
        img = '/images/doctors/binila1.webp'
        qualification = 'BDS, MDS (OMFS), Cosmetologist'
    elif 'sherine' in name.lower():
        img = '/images/doctors/sherine1.webp'
        qualification = 'BDS, MDS (Prosthodontics)'
    elif 'brindha' in name.lower():
        img = '/images/doctors/brindha1.webp'
        qualification = 'MBA, BDS, MDS (Prosthodontics)'
    elif 'doctor' in raw_role.lower() or 'surgeon' in raw_role.lower() or 'endodontist' in raw_role.lower() or 'periodontist' in raw_role.lower() or 'prosthodontist' in raw_role.lower():
        qualification = 'BDS, Dental Surgery'
    elif 'cosmetologist' in raw_role.lower():
        qualification = 'Clinical Cosmetology & Aesthetic Medicine'
    elif 'developer' in raw_role.lower():
        qualification = 'B.E (Computer Science & Engineering)'
    else:
        qualification = ''

    rec = {
        'id': idx,
        'name': name,
        'empCode': emp_code,
        'dob': norm_dob,
        'gender': gender,
        'bloodGroup': norm_blood,
        'address': cleaned_address,
        'pincode': raw_pin,
        'phone': norm_phone,
        'dateOfJoining': doj,
        'department': dept_id,
        'branch': 'Jerush Head Clinic – Thuckalay',
        'role': raw_role,
        'image': img,
        'status': 'Active',
        'email': f"{name.lower().replace(' ', '.').replace('..', '.').replace('dr.', '')}@jerushdentoface.com",
        'qualification': qualification,
        'emergencyContact': emer_contact,
        'notes': f"{dept_label} — {raw_role}"
    }
    records.append(rec)

print(f"Successfully processed {len(records)} staff records!")
with open('scratch/parsed_staff_complete.json', 'w') as f:
    json.dump(records, f, indent=2)

for r in records[:15]:
    print(f"#{r['id']} [{r['empCode']}] {r['name']} ({r['role']}) | DOB: {r['dob']} | Blood: {r['bloodGroup']} | Phone: {r['phone']}")
