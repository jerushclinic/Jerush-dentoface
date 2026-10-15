import { apiClient } from "./api";
import { treatments } from "../data/treatments";

const TREATMENTS_STORAGE_KEY = 'jerush_treatments_catalogue_v3';

function getLocalTreatments() {
  try {
    const raw = localStorage.getItem(TREATMENTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(TREATMENTS_STORAGE_KEY, JSON.stringify(treatments));
      return treatments;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length < treatments.length) {
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
      if (Array.isArray(apiData) && apiData.length >= treatments.length) {
        saveLocalTreatments(apiData);
        return apiData;
      } else if (Array.isArray(apiData) && apiData.length > 0) {
        const local = getLocalTreatments();
        const apiMap = new Map(apiData.map(t => [t.id, t]));
        const merged = local.map(t => apiMap.get(t.id) || t);
        apiData.forEach(t => {
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
    const treatment = list.find(t => String(t.id).toLowerCase() === String(id).toLowerCase());
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


