import json, re

with open('scratch/all_elements_strict.json') as f:
    elements = json.load(f)

# Define column x-ranges
COLUMNS = [
    ('name', 0, 205),
    ('empCode', 205, 395),
    ('role', 395, 590),
    ('dob', 590, 710),
    ('primaryContact', 710, 890),
    ('address', 890, 1260),
    ('pincode', 1260, 1340),
    ('bloodGroup', 1340, 1460),
    ('phone', 1460, 2000)
]

def get_column(x):
    for col_name, x_min, x_max in COLUMNS:
        if x_min <= x < x_max:
            return col_name
    return None

# Known headers or non-staff rows
IGNORE_TEXTS = ['THUCKALA', 'THUCKALAY', 'NAME', 'EMPLOYEE', 'DESIGNATION', 'DATE OF BIRTH', 'PRIMARY CONTACT', 'ADDRESS', 'PINCODE', 'BLOOD GROUP', 'PHONE NUMBER']

current_dept = "MANAGEMENT"
staff_records = []

# Group elements by page
for p in range(1, 7):
    p_elems = [e for e in elements if e['page'] == p]
    # Filter out header elements on page 1 (y < 120)
    if p == 1:
        p_elems = [e for e in p_elems if e['y'] > 120]
        
    p_elems.sort(key=lambda e: (e['y'], e['x']))
    
    # Let's find section headers and row baselines on this page
    # A section header is usually font F5, has text in name column or across, and no empCode/dob
    # First, cluster elements into Y bands. If two elements have abs(y1 - y2) <= 18, they can be part of the same row
    # But notice: row baselines have an empCode OR a role OR (for trainees) a Name+DOB!
    
    # Let's collect baselines: elements that have an employee code (starts with JHS-) or specific roles
    baselines = []
    for e in p_elems:
        col = get_column(e['x'])
        if col == 'empCode' and ('JHS' in e['text'] or '-' in e['text']):
            baselines.append(e['y'])
            
    # Also check if there are rows without empCode (like trainees or staff without code)
    # Let's inspect which elements are NOT captured by empCode baselines
    print(f"Page {p}: Found {len(baselines)} empCode baselines")
