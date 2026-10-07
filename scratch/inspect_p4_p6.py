import json, re

with open('scratch/all_elements_strict.json') as f:
    elements = json.load(f)

# Sort all elements
elements.sort(key=lambda e: (e['page'], e['y'], e['x']))

# Find all department section headers and staff rows
# A section header is when text in x < 300 has no JHS emp code, no dob, and is all caps or matches known dept titles
KNOWN_SECTIONS = [
    'ADMIN STAFFS', 'DUTY DOCTORS - DENTAL', 'DUTY DOCTORS - COSMETIC',
    'DENTAL PRO', 'COSMETIC PRO', 'ACCOUNTS DEPT', 'DIGITAL MARKETING',
    'MAINTENANCE DEPT', 'RECEPTIONIST', 'ALIGNER', 'DENTAL LAB',
    'OPG', 'PHARMACY', 'IMPRESSION ROOM', 'LAB', 'DENTAL ASSISTANTS',
    'COSMETIC ASSISTANTS', 'OFFICE STAFFS', 'HOUSE KEEPER', 'SECURITY',
    'TRAINEE'
]

# Print all elements on Page 4 and Page 6 to understand non-empCode staff
print("=== PAGE 4 elements without JHS in their y-band ===")
p4_elems = [e for e in elements if e['page'] == 4]
y4 = sorted(list(set([e['y'] for e in p4_elems])))
for y in y4:
    row_elems = [e for e in p4_elems if e['y'] == y]
    has_jhs = any('JHS' in e['text'] for e in row_elems)
    if not has_jhs:
        print(f"P4 y={y:6.1f}: {[e['text'] for e in row_elems]}")

print("\n=== PAGE 6 elements ===")
p6_elems = [e for e in elements if e['page'] == 6]
y6 = sorted(list(set([e['y'] for e in p6_elems])))
for y in y6:
    row_elems = [e for e in p6_elems if e['y'] == y]
    print(f"P6 y={y:6.1f}: {[e['text'] for e in row_elems]}")
