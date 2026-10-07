import { apiClient } from "./api";
import { defaultCareers } from "../data/careers";

const CAREERS_STORAGE_KEY = 'jerush_careers_cache';

function getLocalCareers() {
  try {
    const raw = localStorage.getItem(CAREERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CAREERS_STORAGE_KEY, JSON.stringify(defaultCareers));
      return defaultCareers;
    }
    return JSON.parse(raw);
  } catch (e) {
    return defaultCareers;
  }
}

function saveLocalCareers(list) {
  try {
    localStorage.setItem(CAREERS_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error("Failed writing careers to localStorage:", e);
  }
}

export const careerService = {
  getCareers: async () => {
    try {
      const res = await apiClient.get('/careers.php');
      const apiCareers = Array.isArray(res) ? res : res?.data;
      if (Array.isArray(apiCareers) && apiCareers.length > 0) {
        saveLocalCareers(apiCareers);
        return apiCareers;
      }
    } catch (e) {
      console.warn("API failed, using local careers cache:", e);
    }
    return getLocalCareers();
  },

  getCareerById: async (id) => {
    try {
      return await apiClient.get(`/careers.php?id=${id}`);
    } catch (e) {
      console.warn(`API failed for career id ${id}:`, e);
    }
    const list = getLocalCareers();
    const career = list.find(c => String(c.id) === String(id));
    if (!career) throw new Error("Career vacancy not found");
    return career;
  },

  saveCareersList: async (careersList) => {
    saveLocalCareers(careersList);
    return true;
  },

  addCareer: async (careerData) => {
    const list = getLocalCareers();
    const newCareer = {
      ...careerData,
      id: careerData.id || `job_${Date.now()}`
    };
    const updated = [newCareer, ...list];
    saveLocalCareers(updated);

    try {
      const res = await apiClient.post('/careers.php', newCareer);
      return res || newCareer;
    } catch (e) {
      console.warn("API addCareer failed, saved to local cache:", e);
      return newCareer;
    }
  },

  updateCareer: async (id, careerData) => {
    const list = getLocalCareers();
    const updated = list.map(c => String(c.id) === String(id) ? { ...c, ...careerData } : c);
    saveLocalCareers(updated);

    try {
      const res = await apiClient.put(`/careers.php?id=${id}`, careerData);
      return res || { success: true };
    } catch (e) {
      console.warn("API updateCareer failed, updated in local cache:", e);
      return { success: true };
    }
  },

  deleteCareer: async (id) => {
    const list = getLocalCareers();
    const updated = list.filter(c => String(c.id) !== String(id));
    saveLocalCareers(updated);

    try {
      await apiClient.delete(`/careers.php?id=${id}`);
    } catch (e) {
      console.warn("API deleteCareer failed, deleted from local cache:", e);
    }
    return { success: true };
  },

  submitApplication: async (applicationData) => {
    const payload = {
      ...applicationData,
      submitted_at: new Date().toISOString()
    };
    
    // Save to LocalStorage fallback
    try {
      const existing = JSON.parse(localStorage.getItem('jerush_career_applications') || '[]');
      existing.unshift({ id: Date.now(), ...payload });
      localStorage.setItem('jerush_career_applications', JSON.stringify(existing));
    } catch (e) {
      console.warn("Failed saving application to localStorage:", e);
    }

    try {
      return await apiClient.post('/career_applications.php', payload);
    } catch (e) {
      console.warn("API submission fallback to localStorage:", e);
      return { success: true, message: "Application stored locally" };
    }
  },

  getApplications: async () => {
    try {
      const res = await apiClient.get('/career_applications.php');
      return res || [];
    } catch (e) {
      try {
        return JSON.parse(localStorage.getItem('jerush_career_applications') || '[]');
      } catch (err) {
        return [];
      }
    }
  },

  deleteApplication: async (id) => {
    try {
      const list = JSON.parse(localStorage.getItem('jerush_career_applications') || '[]');
      const filtered = list.filter(item => String(item.id) !== String(id));
      localStorage.setItem('jerush_career_applications', JSON.stringify(filtered));
    } catch (e) {}

    try {
      return await apiClient.delete(`/career_applications.php?id=${id}`);
    } catch (e) {
      return true;
    }
  }
};

