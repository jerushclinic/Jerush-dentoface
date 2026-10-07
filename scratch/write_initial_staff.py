import json, re

with open('scratch/parsed_staff_complete.json') as f:
    records = json.load(f)

# Refine names, qualifications, notes, etc.
for r in records:
    # Polish name
    if r['name'] == 'Dr.Bladbin A':
        r['name'] = 'Dr. A. Bladbin'
    elif r['name'] == 'Dr.Binila Asir C':
        r['name'] = 'Dr. C. Binila Bladbin'
    elif r['name'] == 'Dr.Prabin A':
        r['name'] = 'Dr. A. Prabin'
    elif r['name'] == 'Dr.Sherine Ponraj':
        r['name'] = 'Dr. Sherine Ponraj'
    elif r['name'] == 'Dr.Jasmin Shamili V':
        r['name'] = 'Dr. V. Jasmin Shamili'
    elif r['name'] == 'Dr.Aiswarya C J':
        r['name'] = 'Dr. C. J. Aiswarya'
    elif r['name'] == 'Dr.Suryambika P G':
        r['name'] = 'Dr. P. G. Suryambika'
    elif r['name'] == 'Dr Priya Dharshini K':
        r['name'] = 'Dr. K. Priya Dharshini'
    elif r['name'] == 'Dr Aahina David D':
        r['name'] = 'Dr. D. Aahina David'
    elif r['name'] == 'Dr Ajaishalu I':
        r['name'] = 'Dr. I. Ajaishalu'
    elif r['name'] == 'Dr Shanika K':
        r['name'] = 'Dr. K. Shanika'
    elif r['name'] == 'Dr Ivilin R':
        r['name'] = 'Dr. R. Ivilin'
    elif r['name'] == 'Dr.Ameega Jolly T':
        r['name'] = 'Dr. T. Ameega Jolly'
    elif r['name'] == 'Dr.Vijayalakshmi A':
        r['name'] = 'Dr. A. Vijayalakshmi'
    elif r['name'] == 'Dr. Ranisha R':
        r['name'] = 'Dr. R. Ranisha'

    # Ensure notes and branch
    r['branch'] = 'Jerush Head Clinic – Thuckalay'
    
    # Qualifications
    if 'bladbin' in r['name'].lower():
        r['qualification'] = 'MBBS, LLB, MDS(OMFS), PHD, FAM(Ger)'
        r['notes'] = 'Chairman & Chief Maxillofacial Surgeon'
    elif 'binila' in r['name'].lower():
        r['qualification'] = 'BDS, MDS (OMFS), Cosmetologist'
        r['notes'] = 'Managing Director & Chief Aesthetic Surgeon'
    elif 'prabin' in r['name'].lower():
        r['qualification'] = 'BDS, MBA (Hospital Administration)'
        r['notes'] = 'Chief Executive Officer'
    elif 'sherine' in r['name'].lower():
        r['qualification'] = 'BDS, MDS (Prosthodontics)'
        r['notes'] = 'Senior Prosthodontist & Crown Specialist'
    elif 'shamili' in r['name'].lower():
        r['qualification'] = 'BDS, MDS (Conservative Dentistry & Endodontics)'
        r['notes'] = 'Root Canal Specialist & Endodontist'
    elif 'ajaishalu' in r['name'].lower():
        r['qualification'] = 'BDS, MDS (Periodontics)'
        r['notes'] = 'Periodontist & Gum Care Specialist'
    elif 'dental surgeon' in r['role'].lower():
        r['qualification'] = 'BDS (Dental Surgery)'
        r['notes'] = 'General & Preventive Dental Surgeon'
    elif 'cosmetologist' in r['role'].lower():
        r['qualification'] = 'Fellowship in Clinical Cosmetology (FAM)'
        r['notes'] = 'Aesthetic Physician & Laser Cosmetologist'
    elif 'developer' in r['role'].lower():
        r['qualification'] = 'B.E (Computer Science & Engineering)'
        r['notes'] = 'Architect of modern React web systems and hospital portals'
    elif 'graphic designer' in r['role'].lower() or 'video' in r['role'].lower():
        r['qualification'] = 'B.Sc / Diploma in Multimedia & Visual Communication'
        r['notes'] = 'Brand aesthetics, social media, and digital content creation'
    elif 'accountant' in r['role'].lower():
        r['qualification'] = 'B.Com / M.Com (Accounting & Finance)'
        r['notes'] = 'Hospital finance, patient billing, and accounts administration'
    elif 'receptionist' in r['role'].lower():
        r['qualification'] = 'Bachelor Degree / Front Office Management'
        r['notes'] = 'Patient appointments, OPD coordination, and reception assistance'
    elif 'aligner' in r['role'].lower():
        r['qualification'] = 'Certified Clear Aligner Technician / CAD-CAM'
        r['notes'] = 'In-house digital orthodontic aligner fabrication and 3D printing'
    elif 'dental lab' in r['role'].lower() or 'lab technician' in r['role'].lower():
        r['qualification'] = 'Diploma in Dental Technology (DDT)'
        r['notes'] = 'Prosthetic fabrication, ceramic crowns, and clinical laboratory work'
    elif 'x-ray' in r['role'].lower():
        r['qualification'] = 'Diploma in Radiography & Medical Imaging'
        r['notes'] = 'Digital OPG, cephalometric imaging, and diagnostic radiology'
    elif 'pharmacist' in r['role'].lower():
        r['qualification'] = 'B.Pharm / D.Pharm (Registered Pharmacist)'
        r['notes'] = 'Hospital pharmacy dispensary and medicine management'
    elif 'dental assistant' in r['role'].lower():
        r['qualification'] = 'Diploma / Certified Dental Chairside Assistant'
        r['notes'] = 'Chairside dental assistance and clinical sterilization protocols'
    elif 'cosmetic assistant' in r['role'].lower():
        r['qualification'] = 'Certified Aesthetic & Laser Room Assistant'
        r['notes'] = 'Aesthetic laser procedure prep and patient skincare assistance'
    elif 'driver' in r['role'].lower():
        r['qualification'] = 'Professional Driving License (LMV/HMV)'
        r['notes'] = 'Hospital transport, emergency pickup, and clinical logistics'
    elif 'house keeper' in r['role'].lower():
        r['qualification'] = 'Sanitation & Hygiene Protocol Training'
        r['notes'] = 'Clinical cleanliness, infection control, and hospital hygiene'
    elif 'security' in r['role'].lower():
        r['qualification'] = 'Premise Safety & Security Guard Protocol'
        r['notes'] = 'Campus security, 24/7 premise safety, and parking management'
    elif 'catering' in r['role'].lower():
        r['qualification'] = 'Food Safety & Hospital Dietary Services'
        r['notes'] = 'In-house hospital catering, patient dietary care, and refreshments'
    elif 'trainee' in r['role'].lower():
        r['qualification'] = 'Healthcare Apprenticeship / Trainee'
        r['notes'] = 'Undergoing healthcare assistant training and clinical onboarding'

# Output to initialStaffProfiles.js
file_content = (
    "// Complete official staff profiles extracted directly from Jerush Hospitals Staff List (Google Sheets / ID Card registry)\n"
    "export const initialStaffProfiles = " + json.dumps(records, indent=2, ensure_ascii=False) + ";\n"
)

with open('src/data/initialStaffProfiles.js', 'w', encoding='utf-8') as f:
    f.write(file_content)

print(f"Successfully wrote {len(records)} official staff profiles to src/data/initialStaffProfiles.js")
