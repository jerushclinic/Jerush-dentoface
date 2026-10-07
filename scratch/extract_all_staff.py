import json, re

with open('scratch/all_elements_strict.json') as f:
    elements = json.load(f)

# Sort elements
elements.sort(key=lambda e: (e['page'], e['y'], e['x']))

# Defined staff list with their base Y coordinates and department categories
STAFF_BASELINES = [
    # Page 1
    (1, 173.0, 'management', 'Management', 'Chairman'),
    (1, 258.0, 'management', 'Management', 'Director'),
    (1, 374.0, 'management', 'Management', 'Chief Executive Officer'),
    (1, 447.0, 'management', 'Management', 'Manager'),
    (1, 559.0, 'dental_doctors', 'Dental Doctors', 'Prosthodontist'),
    (1, 632.0, 'dental_doctors', 'Dental Doctors', 'Endodontist'),
    (1, 705.0, 'dental_doctors', 'Dental Doctors', 'Dental Surgeon'),
    (1, 778.0, 'dental_doctors', 'Dental Doctors', 'Dental Surgeon'),
    (1, 851.0, 'dental_doctors', 'Dental Doctors', 'Dental Surgeon'),
    (1, 924.0, 'dental_doctors', 'Dental Doctors', 'Dental Surgeon'),
    (1, 997.0, 'dental_doctors', 'Dental Doctors', 'Periodontist'),
    (1, 1070.0, 'dental_doctors', 'Dental Doctors', 'Dental Surgeon'),
    (1, 1143.0, 'dental_doctors', 'Dental Doctors', 'Dental Surgeon'),

    # Page 2
    (2, 1248.0, 'cosmetic_doctors', 'Cosmetic Doctors', 'Cosmetologist'),
    (2, 1314.0, 'cosmetic_doctors', 'Cosmetic Doctors', 'Cosmetologist'),
    (2, 1380.0, 'cosmetic_doctors', 'Cosmetic Doctors', 'Cosmetologist'),
    (2, 1484.0, 'pro', 'Patient Relationship Officers', 'Dental PRO'),
    (2, 1550.0, 'pro', 'Patient Relationship Officers', 'Dental PRO'),
    (2, 1650.0, 'pro', 'Patient Relationship Officers', 'Cosmetic PRO'),
    (2, 1716.0, 'pro', 'Patient Relationship Officers', 'Cosmetic PRO'),
    (2, 1808.0, 'accounts', 'Accounts Department', 'Accountant'),
    (2, 1874.0, 'accounts', 'Accounts Department', 'Accountant'),
    (2, 1940.0, 'accounts', 'Accounts Department', 'Accountant'),
    (2, 2039.0, 'digital_tech', 'Digital Tech "E" Team', 'Graphic Designer'),
    (2, 2105.0, 'digital_tech', 'Digital Tech "E" Team', 'Full Stack Developer'),
    (2, 2171.0, 'digital_tech', 'Digital Tech "E" Team', 'Content Creator'),
    (2, 2237.0, 'digital_tech', 'Digital Tech "E" Team', 'Graphic Designer & Video Editor'),
    (2, 2337.0, 'maintenance', 'Maintenance Department', 'Maintenance Manager'),

    # Page 3
    (3, 2438.0, 'front_office', 'Front Office Team', 'Receptionist'),
    (3, 2504.0, 'front_office', 'Front Office Team', 'Receptionist'),
    (3, 2570.0, 'front_office', 'Front Office Team', 'Receptionist'),
    (3, 2636.0, 'front_office', 'Front Office Team', 'Receptionist'),
    (3, 2702.0, 'front_office', 'Front Office Team', 'Receptionist'),
    (3, 2800.0, 'aligners_crowns', 'Clear Aligner and Dental Crown Manufacturing Department', 'Aligner Technician'),
    (3, 2866.0, 'aligners_crowns', 'Clear Aligner and Dental Crown Manufacturing Department', 'Aligner Technician'),
    (3, 2932.0, 'aligners_crowns', 'Clear Aligner and Dental Crown Manufacturing Department', 'Aligner Technician'),
    (3, 3033.0, 'lab_technician', 'Lab Technician', 'Dental Lab Technician'),
    (3, 3134.0, 'xray', 'X-Ray Department', 'X-Ray Technician'),
    (3, 3200.0, 'xray', 'X-Ray Department', 'X-Ray Technician'),
    (3, 3299.0, 'pharmacy', 'Pharmacy Department', 'Pharmacist'),
    (3, 3365.0, 'pharmacy', 'Pharmacy Department', 'Pharmacist'),
    (3, 3469.0, 'lab_technician', 'Lab Technician', 'Impression Technician'),
    (3, 3535.0, 'lab_technician', 'Lab Technician', 'Impression Technician'),

    # Page 4
    (4, 3601.0, 'lab_technician', 'Lab Technician', 'Impression Assistant'),
    (4, 3694.0, 'lab_technician', 'Lab Technician', 'Lab Technician'),
    (4, 3795.0, 'dental_assistants', 'Dental Assistants', 'Dental Assistant'),
    (4, 3861.0, 'dental_assistants', 'Dental Assistants', 'Dental Assistant'),
    (4, 3927.0, 'dental_assistants', 'Dental Assistants', 'Dental Assistant'),
    (4, 3993.0, 'dental_assistants', 'Dental Assistants', 'Dental Assistant'),
    (4, 4059.0, 'dental_assistants', 'Dental Assistants', 'Dental Assistant'),
    (4, 4125.0, 'dental_assistants', 'Dental Assistants', 'Dental Assistant'),
    (4, 4191.0, 'dental_assistants', 'Dental Assistants', 'Dental Assistant'),
    (4, 4257.0, 'dental_assistants', 'Dental Assistants', 'Dental Assistant'),
    (4, 4323.0, 'dental_assistants', 'Dental Assistants', 'Dental Assistant'),
    (4, 4389.0, 'dental_assistants', 'Dental Assistants', 'Dental Assistant'),
    (4, 4455.0, 'dental_assistants', 'Dental Assistants', 'Dental Assistant'),
    (4, 4521.0, 'dental_assistants', 'Dental Assistants', 'Dental Assistant'),
    (4, 4587.0, 'dental_assistants', 'Dental Assistants', 'Dental Assistant'),
    (4, 4653.0, 'dental_assistants', 'Dental Assistants', 'Dental Assistant'),
    (4, 4719.0, 'dental_assistants', 'Dental Assistants', 'Dental Assistant'),

    # Page 5
    (5, 4785.0, 'dental_assistants', 'Dental Assistants', 'Dental Assistant'),
    (5, 4851.0, 'dental_assistants', 'Dental Assistants', 'Dental Assistant'),
    (5, 4954.0, 'cosmetic_assistants', 'Cosmetic Assistants', 'Cosmetic Assistant'),
    (5, 5020.0, 'cosmetic_assistants', 'Cosmetic Assistants', 'Cosmetic Assistant'),
    (5, 5086.0, 'cosmetic_assistants', 'Cosmetic Assistants', 'Cosmetic Assistant'),
    (5, 5152.0, 'cosmetic_assistants', 'Cosmetic Assistants', 'Cosmetic Assistant'),
    (5, 5218.0, 'cosmetic_assistants', 'Cosmetic Assistants', 'Cosmetic Assistant'),
    (5, 5284.0, 'cosmetic_assistants', 'Cosmetic Assistants', 'Cosmetic Assistant'),
    (5, 5350.0, 'cosmetic_assistants', 'Cosmetic Assistants', 'Cosmetic Assistant'),
    (5, 5452.0, 'catering', 'Hospital Catering', 'Hospital Catering Staff'),
    (5, 5518.0, 'transport', 'Transport Department', 'Driver'),
    (5, 5584.0, 'transport', 'Transport Department', 'Driver'),
    (5, 5688.0, 'housekeeping', 'House Keeping Department', 'House Keeper'),
    (5, 5754.0, 'housekeeping', 'House Keeping Department', 'House Keeper'),
    (5, 5820.0, 'housekeeping', 'House Keeping Department', 'House Keeper'),
    (5, 5886.0, 'housekeeping', 'House Keeping Department', 'House Keeper'),

    # Page 6
    (6, 5989.0, 'security', 'Security Service Department', 'Security'),
    (6, 6055.0, 'security', 'Security Service Department', 'Security'),
    (6, 6224.0, 'trainee', 'Trainee Department', 'Trainee'),
    (6, 6290.0, 'trainee', 'Trainee Department', 'Trainee'),
    (6, 6356.0, 'trainee', 'Trainee Department', 'Trainee'),
    (6, 6422.0, 'trainee', 'Trainee Department', 'Trainee'),
    (6, 6488.0, 'trainee', 'Trainee Department', 'Trainee'),
    (6, 6554.0, 'trainee', 'Trainee Department', 'Trainee')
]

print(f"Total staff baselines defined: {len(STAFF_BASELINES)}")
