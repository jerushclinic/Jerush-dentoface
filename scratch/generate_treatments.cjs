const fs = require("fs");
const path = require("path");

const { treatments: existing } = require("../src/data/treatments.js");

const content = fs.readFileSync("content/Medical_Services_Catalogue.md", "utf8");
const lines = content.split("\n");

let currentCategory = "";
let currentSubcategory = "";
const catalogue = [];

for (let line of lines) {
  line = line.trim();
  if (!line || line.startsWith("─")) continue;
  if (line.includes("MEDICAL SERVICES") || line.includes("Comprehensive Service Catalogue")) continue;

  const clean = line.replace(/\\/g, "").replace(/\*\*/g, "").trim();

  if (clean.startsWith("1. Kids Dentistry") || clean.includes("Kids Dentistry / Pedodontics")) {
    currentCategory = "dental";
    currentSubcategory = "Kids Dentistry";
    continue;
  } else if (clean.startsWith("2. Cosmetic Dentistry")) {
    currentCategory = "dental";
    currentSubcategory = "Cosmetic Dentistry";
    continue;
  } else if (clean.startsWith("3. Prosthodontic Care")) {
    currentCategory = "dental";
    currentSubcategory = "Prosthodontics & Tooth Replacement";
    continue;
  } else if (clean.startsWith("4. Endodontic Care")) {
    currentCategory = "dental";
    currentSubcategory = "Endodontic & Root Canal Care";
    continue;
  } else if (clean.includes("Periodontal / Gum Care")) {
    currentCategory = "dental";
    currentSubcategory = "Periodontal & Gum Care";
    continue;
  } else if (clean.includes("Orthodontic Care")) {
    currentCategory = "dental";
    currentSubcategory = "Orthodontic Care";
    continue;
  } else if (clean.includes("Geriatric Dentistry")) {
    currentCategory = "dental";
    currentSubcategory = "Geriatric Dentistry";
    continue;
  } else if (clean.includes("Oral & Maxillofacial Care")) {
    currentCategory = "dental";
    currentSubcategory = "Oral & Maxillofacial Surgery";
    continue;
  } else if (clean.includes("Oral Medicine")) {
    currentCategory = "dental";
    currentSubcategory = "Oral Medicine & Diagnostics";
    continue;
  } else if (clean.includes("Radiology")) {
    currentCategory = "dental";
    currentSubcategory = "3D Radiology & Imaging";
    continue;
  } else if (clean.includes("Temporomandibular Joint") || clean.includes("TMJ")) {
    currentCategory = "dental";
    currentSubcategory = "TMJ & Occlusal Care";
    continue;
  } else if (clean.includes("Community Dentistry")) {
    currentCategory = "dental";
    currentSubcategory = "Community Dentistry";
    continue;
  } else if (clean.includes("2. SKIN & LASER TREATMENTS")) {
    currentCategory = "cosmetic";
    currentSubcategory = "";
    continue;
  } else if (clean.includes("3. HAIR RESTORATION")) {
    currentCategory = "hair";
    currentSubcategory = "";
    continue;
  } else if (clean.includes("4. BODY CONTOURING & WELLNESS")) {
    currentCategory = "body";
    currentSubcategory = "";
    continue;
  }

  if (line.startsWith("**") && line.endsWith("**")) {
    currentSubcategory = clean;
    continue;
  }

  if (line.startsWith("*")) {
    let service = line.replace(/^\*+\s*/, "").replace(/\*\*/g, "").trim();
    if (service.endsWith(":")) {
      service = service.replace(/:$/, "").trim();
    }
    if (service) {
      catalogue.push({
        category: currentCategory,
        subcategory: currentSubcategory,
        service: service
      });
    }
  }
}

// Icon mappings
const exactIconMappings = {
  // Dental
  "Jerushaligne Clear Aligners": "clear-aligner.webp",
  "Metal Braces": "metal-braces.webp",
  "Ceramic Braces": "ceramic-braces.webp",
  "Lingual Braces": "lingual-braces.webp",
  "Self-Ligating Braces": "ligating-braces.webp",
  "Veneers & Laminates": "veneers.webp",
  "Tooth-Coloured Restorations": "tooth-colored-fillings.webp",
  "Dental Implants": "dental-implant.webp",
  "Implant-Supported Fixed Partial Dentures": "dental-implant.webp",
  "Implant-Supported Complete Dentures": "dental-implant.webp",
  "Implant-Supported Prosthesis": "dental-implant.webp",
  "Fixed Partial Dentures / Crowns & Bridges": "dental-crown-bridge.webp",
  "Removable Partial Dentures": "denture.webp",
  "Complete Dentures": "denture.webp",
  "Flexible Dentures": "denture.webp",
  "Dentures": "denture.webp",
  "Single-Visit Root Canal Treatment": "root-canal.webp",
  "Multiple-Visit Root Canal Treatment": "root-canal.webp",
  "Post & Core": "teeth-post-core.webp",
  "Metal Post": "teeth-post-core.webp",
  "Fibre Post": "teeth-post-core.webp",
  "Scaling & Curettage": "deep-teeth-cleaning.webp",
  "Flap Surgery": "gum-surgery.webp",
  "Guided Tissue Regeneration": "gum-surgery.webp",
  "Bone Grafting": "gum-grafting.webp",
  "Guided Bone Regeneration": "gum-grafting.webp",
  "Pediatric Dental Care": "pediatric-dental-care.webp",
  "Dental Consultation": "pediatric-dental-care.webp",
  "Cleft Lip & Palate Correction": "cleft-lip-palate.webp",
  "Cleft Lip & Palate Surgery": "cleft-lip-palate.webp",
  "Tooth Extraction": "wisdom-tooth.webp",
  "Impacted Tooth Removal": "wisdom-tooth.webp",
  "Pedo Extractions": "wisdom-tooth.webp",
  "Oral Surgery": "jaw-surgery.webp",
  "Intermaxillary Fixation (IMF)": "jaw-surgery.webp",
  "Oral Cancer Screening": "oral-cancer-screen.webp",
  "Geriatric Dental Care": "denture.webp",
  "TMJ Diagnosis & Treatment": "jaw-surgery.webp",
  "TMJ Botox Treatment": "botox-treatment.webp",

  // Skin
  "Acne Treatment": "acne-treatment.webp",
  "Melasma": "melasma-teatment.webp",
  "Uneven Skin Tone": "uneven-skin-tone.webp",
  "Freckles Removal": "freckles-removal.webp",
  "HydraFacial": "hydrafacial.webp",
  "Carbon Peel Laser": "carbon-peel-laser.webp",
  "Chemical Peel": "carbon-peel-laser.webp",
  "Skin Whitening": "skin-whitening.webp",
  "Microdermabrasion": "microdermabrasion.webp",
  "CO2 Fractional Laser Therapy": "acne-scar.webp",
  "Full Body Laser Hair Reduction": "full-body-laser-hair-removal.webp",
  "Facial Hair Reduction": "facial-hair-removal.webp",
  "Wrinkle Correction": "wrinkle-reduction.webp",
  "Botox": "botox-treatment.webp",
  "Dermal Fillers": "dermal-fillers.webp",
  "HIFU Skin Tightening": "hifu-skin-tightening.webp",
  "Mole Removal": "mole-removal.webp",
  "Wart Removal": "wart-removal-treatment.webp",
  "Skin Tag Removal": "benign-skin-growth-removal.webp",
  "Xanthelasma Removal": "xanthelasma-removal.webp",
  "Facial Surgery": "facial-surgery-icon.webp",
  "Rhinoplasty": "rhinoplasty.webp",
  "Lip Correction Surgery": "lip-correction-surgery.webp",
  "Scar Revision Surgery": "scar-revision-surgery.webp",
  "Psoriasis Treatment": "psoriasis-treatment.webp",
  "Vitiligo Treatment": "vitiligo-treatment.webp",
  "Excimer Laser Therapy": "excimer-laser-therapy.webp",
  "Eczema / Dermatitis Treatment": "eczema-dermatitis-treatment.webp",
  "Keloid Treatment": "keloid-treatment.webp",
  "Lip Lightening Laser Therapy": "lip-brightening.webp",
  "Lip Lightening Peel Therapy": "lip-brightening.webp",

  // Hair
  "GFC Hair Therapy": "gfc-hair-therapy.webp",
  "QR678 Hair Therapy": "qr678-hair-therapy.webp",
  "Exocell Therapy": "exocell-therapy.webp",
  "Bio Cell Therapy": "biocell-therapy.webp",
  "Hair Transplantation": "hair-transplant.webp",
  "Beard / Moustache Correction": "beard-transplant.webp",
  "Hairline Correction": "hairline-correction.webp",
  "Anti-dandruff Treatment": "dandruff-treatment.webp",
  "Dandruff Treatment": "dandruff-treatment.webp",
  "Scalp Cleansing": "scalp-cleansing-treatment.webp",
  "Hair Growth Booster": "hair-growth-booster.webp",

  // Body
  "Cryolipolysis Fat Reduction": "cryolipolysis-fat-reduction.webp",
  "Emsculpt Body Contouring": "emsculpt-body-contouring.webp",
  "Muscle Toning": "muscle-toning.webp",
  "RF Body Tightening": "rf-body-tightening.webp",
  "Emsella Chair Therapy": "emsella-chair-therapy.webp",
  "Pelvic Floor Strengthening": "pelvic-floor-strengthening.webp",
  "Clinical Wellness Programs": "clinical-wellness-programs.webp"
};

// Default images by department
const defaultImages = {
  dental: "/images/treatments/dental_implants.png",
  cosmetic: "/images/treatments/botox_fillers.png",
  hair: "/images/treatments/gfc_hair_therapy.png",
  body: "/images/treatments/cryo_sculpting.png"
};

// Default icons by department
const defaultIcons = {
  dental: "Smile",
  cosmetic: "Sparkles",
  hair: "TrendingUp",
  body: "Heart"
};

const fullList = [];
const usedSlugs = new Set();

for (const item of catalogue) {
  const sNorm = item.service.toLowerCase().replace(/[^a-z0-9]/g, "");
  
  // Find if exists in existing treatments
  const existingMatch = existing.find(e => {
    const tNorm = e.title.toLowerCase().replace(/[^a-z0-9]/g, "");
    const idNorm = e.id.toLowerCase().replace(/[^a-z0-9]/g, "");
    return tNorm === sNorm || tNorm.includes(sNorm) || sNorm.includes(tNorm) || idNorm === sNorm;
  });

  const iconFile = exactIconMappings[item.service] || null;
  
  let slug = item.service.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  if (existingMatch) {
    slug = existingMatch.id;
  }
  
  // Guarantee unique slug
  let finalSlug = slug;
  let counter = 1;
  while (usedSlugs.has(finalSlug)) {
    finalSlug = `${slug}-${counter}`;
    counter++;
  }
  usedSlugs.add(finalSlug);

  if (existingMatch) {
    fullList.push({
      ...existingMatch,
      id: finalSlug,
      title: item.service,
      category: item.category,
      subcategory: item.subcategory,
      iconFile: iconFile || existingMatch.iconFile || null
    });
  } else {
    // Generate clean medical entry
    const desc = `Specialized ${item.service} procedure providing advanced clinical care and lasting results at Jerush Dentoface.`;
    const details = `Our specialist clinicians provide high-precision ${item.service} with state-of-the-art diagnostic protocols, personalized treatment planning, and strict international sterilization standards.`;
    const benefits = [
      "Specialist clinical expertise",
      "Advanced diagnostic technology",
      "Personalized treatment plan"
    ];

    let iconName = defaultIcons[item.category] || "ShieldCheck";
    if (item.service.toLowerCase().includes("laser")) iconName = "Flame";
    else if (item.service.toLowerCase().includes("surgery") || item.service.toLowerCase().includes("biopsy") || item.service.toLowerCase().includes("extraction")) iconName = "Scissors";
    else if (item.service.toLowerCase().includes("scan") || item.service.toLowerCase().includes("view") || item.service.toLowerCase().includes("cbct") || item.service.toLowerCase().includes("opg")) iconName = "Activity";
    else if (item.service.toLowerCase().includes("therapy") || item.service.toLowerCase().includes("wellness")) iconName = "Heart";

    let img = defaultImages[item.category];
    if (item.service.toLowerCase().includes("braces") || item.service.toLowerCase().includes("aligner")) img = "/images/treatments/orthodontics_braces.png";
    else if (item.service.toLowerCase().includes("peel") || item.service.toLowerCase().includes("acne")) img = "/images/treatments/chemical_peels.png";
    else if (item.service.toLowerCase().includes("whitening") || item.service.toLowerCase().includes("glow") || item.service.toLowerCase().includes("facial")) img = "/images/treatments/hydrafacial.png";

    fullList.push({
      id: finalSlug,
      title: item.service,
      category: item.category,
      subcategory: item.subcategory,
      desc,
      details,
      benefits,
      iconName,
      iconFile,
      image: img
    });
  }
}

console.log("Constructed full list length:", fullList.length);
console.log("Sample items:", JSON.stringify(fullList.slice(0, 3), null, 2));

// Generate the new treatments.js file content
const fileHeader = `// Comprehensive Medical Services Catalogue for Jerush Dentofacial & Cosmetic Laser Centre
// Total Clinical Procedures: ${fullList.length}
// Structured by Department & Subspecialty

export const treatments = ${JSON.stringify(fullList, null, 2)};
`;

fs.writeFileSync("src/data/treatments.js", fileHeader, "utf8");
console.log("Successfully wrote src/data/treatments.js with 147 services!");
