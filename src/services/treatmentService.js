import { apiClient } from "./api";
import { treatments } from "../data/treatments";

const TREATMENTS_STORAGE_KEY = 'jerush_treatments_catalogue_v6';

function getLocalTreatments() {
  try {
    // Purge legacy storage keys to ensure clients get updated catalogue & subcategories
    ['jerush_treatments_catalogue', 'jerush_treatments_catalogue_v1', 'jerush_treatments_catalogue_v2', 'jerush_treatments_catalogue_v3', 'jerush_treatments_catalogue_v4', 'jerush_treatments_catalogue_v5'].forEach(k => {
      try { localStorage.removeItem(k); } catch (e) {}
    });

    const raw = localStorage.getItem(TREATMENTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(TREATMENTS_STORAGE_KEY, JSON.stringify(treatments));
      return treatments;
    }
    const parsed = JSON.parse(raw);
    const hasMissingSubcategory = Array.isArray(parsed) && parsed.some(t => (t.id === 'single-visit-root-canal-treatment' || t.id === 'root-canal') && !t.subcategory);
    if (!Array.isArray(parsed) || parsed.length < treatments.length || hasMissingSubcategory) {
      localStorage.setItem(TREATMENTS_STORAGE_KEY, JSON.stringify(treatments));
      return treatments;
    }
    return parsed;
  } catch (e) {
    return treatments;
  }
}

function saveLocalTreatments(list) {
  try {
    localStorage.setItem(TREATMENTS_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error("Failed writing treatments to localStorage:", e);
  }
}

export const treatmentService = {
  getTreatments: async () => {
    try {
      const apiData = await apiClient.get('/treatments.php');
      const canonicalMap = new Map(treatments.map(t => [t.id, t]));

      if (Array.isArray(apiData) && apiData.length >= treatments.length) {
        const enrichedApiData = apiData.map(t => {
          const canon = canonicalMap.get(t.id) || (t.id === 'root-canal' ? canonicalMap.get('single-visit-root-canal-treatment') : null);
          return {
            ...t,
            id: (t.id === 'root-canal' && canon) ? 'single-visit-root-canal-treatment' : t.id,
            title: canon ? canon.title : t.title,
            subcategory: t.subcategory || canon?.subcategory,
            iconFile: t.iconFile || canon?.iconFile,
            image: t.image || canon?.image
          };
        });
        saveLocalTreatments(enrichedApiData);
        return enrichedApiData;
      } else if (Array.isArray(apiData) && apiData.length > 0) {
        const local = getLocalTreatments();
        const apiMap = new Map(apiData.map(t => [t.id, t]));
        const merged = local.map(t => {
          const apiItem = apiMap.get(t.id) || (t.id === 'single-visit-root-canal-treatment' ? apiMap.get('root-canal') : null);
          if (!apiItem) return t;
          return {
            ...t,
            ...apiItem,
            id: t.id,
            title: t.title,
            subcategory: apiItem.subcategory || t.subcategory,
            iconFile: apiItem.iconFile || t.iconFile,
            image: t.image || apiItem.image
          };
        });
        apiData.forEach(t => {
          if (t.id === 'root-canal' && merged.some(m => m.id === 'single-visit-root-canal-treatment')) {
            return;
          }
          if (!merged.some(m => m.id === t.id)) {
            merged.push(t);
          }
        });
        saveLocalTreatments(merged);
        return merged;
      }
    } catch (e) {
      console.warn("API failed, using local treatments cache:", e);
    }
    return getLocalTreatments();
  },

  getTreatmentsByCategory: async (category) => {
    const all = await treatmentService.getTreatments();
    if (!category || category === 'all') {
      return all;
    }
    return all.filter((t) => t.category === category);
  },

  getTreatmentById: async (id) => {
    try {
      const res = await apiClient.get(`/treatments.php?id=${id}`);
      if (res && res.id) return res;
    } catch (e) {
      console.warn(`API failed or bypassed for treatment id ${id}:`, e);
    }
    
    // Check local treatments list
    const list = getLocalTreatments();
    const cleanId = String(id).toLowerCase();
    const treatment = list.find(t => {
      const tid = String(t.id).toLowerCase();
      return tid === cleanId ||
        (cleanId === 'single-visit-root-canal-treatment' && (tid === 'root-canal' || tid === 'single-visit-root-canal-treatment')) ||
        (cleanId === 'root-canal' && (tid === 'single-visit-root-canal-treatment' || tid === 'root-canal')) ||
        (cleanId === 'root-canal-treatment' && (tid === 'single-visit-root-canal-treatment' || tid === 'root-canal')) ||
        (cleanId === 'dental-veneers' && (tid === 'veneers-laminates' || tid === 'veneers-and-laminates' || tid === 'dental-veneers')) ||
        (cleanId === 'veneers-and-laminates' && (tid === 'veneers-laminates' || tid === 'veneers-and-laminates' || tid === 'dental-veneers')) ||
        (cleanId === 'flap-surgery' && (tid === 'gum-surgery' || tid === 'flap-surgery' || tid === 'periodontal-flap-surgery')) ||
        (cleanId === 'metal-post-core' && (tid === 'post-core-metal-post' || tid === 'metal-post-core' || tid === 'post-and-core' || tid === 'metal-post')) ||
        (cleanId === 'post-core-metal-post' && (tid === 'metal-post-core' || tid === 'post-core-metal-post' || tid === 'post-and-core')) ||
        (cleanId === 'bone-tissue-grafting' && (tid === 'bone-tissue-grafting' || tid === 'bone-grafting' || tid === 'gum-grafting')) ||
        (cleanId === 'gum-grafting' && (tid === 'bone-tissue-grafting' || tid === 'bone-grafting' || tid === 'gum-grafting')) ||
        (cleanId === 'bone-grafting' && (tid === 'bone-tissue-grafting' || tid === 'bone-grafting' || tid === 'gum-grafting')) ||
        (cleanId === 'corrective-jaw-surgery' && (tid === 'corrective-jaw-surgery' || tid === 'jaw-surgery')) ||
        (cleanId === 'jaw-surgery' && (tid === 'corrective-jaw-surgery' || tid === 'jaw-surgery')) ||
        (cleanId === 'cleft-lip-palate' && (tid === 'cleft-lip-palate-surgery' || tid === 'cleft-lip-palate')) ||
        (cleanId === 'cleft-lip-palate-surgery' && (tid === 'cleft-lip-palate-surgery' || tid === 'cleft-lip-palate')) ||
        (cleanId === 'precancerous-lesion-management' && (tid === 'precancerous-lesion-management' || tid === 'management-of-precancerous-cervical-lesions-conditions')) ||
        (cleanId === 'management-of-precancerous-cervical-lesions-conditions' && (tid === 'precancerous-lesion-management' || tid === 'management-of-precancerous-cervical-lesions-conditions')) ||
        (cleanId === 'surgical-extrusion' && tid === 'surgical-extrusion') ||
        (cleanId === 'apexification' && tid === 'apexification') ||
        (cleanId === 'melasma-treatment' && tid === 'pigmentation-treatment') ||
        (cleanId === 'melasma' && tid === 'pigmentation-treatment') ||
        (cleanId === 'botox' && tid === 'botox-fillers') ||
        (cleanId === 'dermal-fillers' && tid === 'botox-fillers-1') ||
        (cleanId === 'skin-tag-removal' && tid === 'mole-removal-1') ||
        (cleanId === 'scar-revision-surgery' && tid === 'rhinoplasty-1') ||
        (cleanId === 'facial-surgery' && tid === 'facial-surgery-treatment') ||
        (cleanId === 'chemical-peel' && tid === 'chemical-peels') ||
        (cleanId === 'skin-whitening' && tid === 'skin-whitening-treatment') ||
        (cleanId === 'carbon-peel-laser' && tid === 'carbon-peel-laser-treatment') ||
        (cleanId === 'collagen' && tid === 'anti-ageing-facial') ||
        (cleanId === 'wrinkle-treatment' && tid === 'wrinkle-correction') ||
        (cleanId === 'laser-hair-removal' && tid === 'full-body-laser-hair-reduction') ||
        (cleanId === 'facial-laser-hair-removal' && tid === 'facial-hair-reduction') ||
        (cleanId === 'lip-brightening' && tid === 'lip-lightening-laser-therapy') ||
        (cleanId === 'fibre-post-core' && tid === 'fibre-post') ||
        (cleanId === 'fiber-post-core' && tid === 'fibre-post') ||
        (cleanId === 'fiber-post' && tid === 'fibre-post') ||
        (cleanId === 'post-core-fibre-post' && tid === 'fibre-post');
    });
    if (treatment) return treatment;

    // Smart fallback for any new SEO treatment slug:
    const formattedTitle = String(id)
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      id: id,
      title: formattedTitle,
      category: id.includes('hair') ? 'hair' : id.includes('skin') || id.includes('laser') || id.includes('peel') || id.includes('acne') ? 'cosmetic' : 'dental',
      desc: `Comprehensive clinical ${formattedTitle} procedure at Jerush Dentoface Hospital with state-of-the-art diagnostic and therapeutic technology.`,
      iconName: 'ShieldCheck',
      image: '/images/medical-services/dental_implants.png',
      details: `Our expert team at Jerush Dentoface provides specialized ${formattedTitle} using international medical standards, advanced sterilization, and personalized patient care.`,
      benefits: ['International clinical standards', 'Board-certified specialists', 'State-of-the-art pain-free technology']
    };
  },

  addTreatment: async (data) => {
    const list = getLocalTreatments();
    const slug = data.id || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newTreatment = {
      ...data,
      id: slug
    };
    const updated = [newTreatment, ...list.filter(t => t.id !== slug)];
    saveLocalTreatments(updated);

    try {
      const res = await apiClient.post('/treatments.php', newTreatment);
      return res || newTreatment;
    } catch (e) {
      console.warn("API addTreatment failed, saved to local cache:", e);
      return newTreatment;
    }
  },

  updateTreatment: async (id, data) => {
    const list = getLocalTreatments();
    const updated = list.map(t => String(t.id).toLowerCase() === String(id).toLowerCase() ? { ...t, ...data } : t);
    saveLocalTreatments(updated);

    try {
      const res = await apiClient.put(`/treatments.php?id=${id}`, data);
      return res || { success: true };
    } catch (e) {
      console.warn("API updateTreatment failed, updated in local cache:", e);
      return { success: true };
    }
  },

  deleteTreatment: async (id) => {
    const list = getLocalTreatments();
    const updated = list.filter(t => String(t.id).toLowerCase() !== String(id).toLowerCase());
    saveLocalTreatments(updated);

    try {
      await apiClient.delete(`/treatments.php?id=${id}`);
    } catch (e) {
      console.warn("API deleteTreatment failed, deleted from local cache:", e);
    }
    return { success: true };
  }
};
