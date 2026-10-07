import json

with open('scratch/all_elements_strict.json') as f:
    elements = json.load(f)

# Department titles keywords
DEPT_KEYWORDS = [
    'ADMIN STAFFS', 'DUTY DOCTORS - DENTAL', 'DUTY DOCTORS - COSMETIC',
    'DENTAL PRO', 'COSMETIC PRO', 'ACCOUNTS DEPT', 'DIGITAL MARKETING',
    'MAINTENANCE DEPT', 'RECEPTIONIST', 'ALIGNER', 'DENTAL LAB',
    'OPG', 'PHARMACY', 'IMPRESSION ROOM', 'LAB', 'DENTAL ASSISTANTS',
    'COSMETIC ASSISTANTS', 'OFFICE STAFFS', 'HOUSE KEEPER', 'SECURITY',
    'TRAINEE'
]

# Let's inspect elements on all pages sorted by page, y, x
for p in range(1, 7):
    p_elems = [e for e in elements if e['page'] == p]
    p_elems.sort(key=lambda e: (e['y'], e['x']))
    print(f"=== PAGE {p} (Total elements: {len(p_elems)}) ===")
    # Print distinct y levels
    y_levels = sorted(list(set([e['y'] for e in p_elems])))
    print(f"Y levels ({len(y_levels)}): {y_levels[:15]}...")
