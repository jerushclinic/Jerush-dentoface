import { apiClient } from "./api";
import { doctors } from "../data/doctors";

const DOCTORS_STORAGE_KEY = 'jerush_doctors_cache';

function getLocalDoctors() {
  try {
    const raw = localStorage.getItem(DOCTORS_STORAGE_KEY);
    let list = raw ? JSON.parse(raw) : doctors;
    if (!Array.isArray(list) || list.length === 0) {
      list = doctors;
    }

    let needsSave = !raw;
    list = list.map((doc, idx) => {
      const order = doc.sort_order !== undefined && doc.sort_order !== null && !isNaN(Number(doc.sort_order))
        ? Number(doc.sort_order)
        : (idx + 1);
      if (doc.sort_order !== order) {
        needsSave = true;
      }
      return { ...doc, sort_order: order };
    });

    // Always sort by sort_order ascending
    list.sort((a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0));

    if (needsSave) {
      saveLocalDoctors(list);
    }
    return list;
  } catch (e) {
    console.error("Failed reading doctors from localStorage:", e);
    return doctors.map((d, i) => ({ ...d, sort_order: d.sort_order || (i + 1) }));
  }
}

function saveLocalDoctors(list) {
  try {
    localStorage.setItem(DOCTORS_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error("Failed writing doctors to localStorage:", e);
  }
}

export const doctorService = {
  getDoctors: async () => {
    try {
      const apiDoctors = await apiClient.get('/doctors.php');
      if (Array.isArray(apiDoctors) && apiDoctors.length > 0) {
        const sorted = apiDoctors.map((doc, idx) => ({
          ...doc,
          sort_order: doc.sort_order !== undefined && doc.sort_order !== null && !isNaN(Number(doc.sort_order))
            ? Number(doc.sort_order)
            : (idx + 1)
        })).sort((a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0));

        saveLocalDoctors(sorted);
        return sorted;
      }
    } catch (e) {
      console.warn("API failed, using local doctors cache:", e);
    }
    return getLocalDoctors();
  },
  
  getDoctorById: async (id) => {
    try {
      const res = await apiClient.get(`/doctors.php?id=${id}`);
      if (res && res.id) return res;
    } catch (e) {
      console.warn(`API failed for doctor id ${id}:`, e);
    }
    const list = getLocalDoctors();
    const doc = list.find(d => String(d.id) === String(id));
    if (!doc) throw new Error("Doctor not found");
    return doc;
  },

  reorderDoctors: async (orderedList) => {
    // Normalize sort_order sequentially 1, 2, 3...
    const normalized = orderedList.map((doc, idx) => ({
      ...doc,
      sort_order: idx + 1
    }));
    saveLocalDoctors(normalized);

    try {
      const orderPayload = normalized.map(d => ({ id: d.id, sort_order: d.sort_order }));
      await apiClient.post('/doctors_reorder.php', { doctors: orderPayload });
    } catch (e) {
      console.warn("API reorderDoctors failed, saved to local cache:", e);
    }
    return normalized;
  },

  addDoctor: async (data) => {
    const list = getLocalDoctors();
    const targetOrder = data.sort_order ? Number(data.sort_order) : (list.length + 1);
    const newDoc = {
      ...data,
      id: data.id || `doc_${Date.now()}`,
      sort_order: targetOrder
    };

    let updated;
    if (data.sort_order && targetOrder <= list.length) {
      const targetIdx = Math.max(0, targetOrder - 1);
      updated = [...list];
      updated.splice(targetIdx, 0, newDoc);
      // Re-index all
      updated = updated.map((d, i) => ({ ...d, sort_order: i + 1 }));
    } else {
      updated = [...list, { ...newDoc, sort_order: list.length + 1 }];
    }

    saveLocalDoctors(updated);

    try {
      const res = await apiClient.post('/doctors.php', newDoc);
      return res || newDoc;
    } catch (e) {
      console.warn("API addDoctor failed, saved to local cache:", e);
      return newDoc;
    }
  },

  updateDoctor: async (id, data) => {
    const list = getLocalDoctors();
    const currentIdx = list.findIndex(d => String(d.id) === String(id));
    
    if (currentIdx === -1) return { success: false };

    let updated = [...list];
    const existingDoc = updated[currentIdx];
    const newDoc = { ...existingDoc, ...data };
    
    // Check if sort_order changed
    const targetOrder = data.sort_order !== undefined && data.sort_order !== null && data.sort_order !== ''
      ? Number(data.sort_order) 
      : existingDoc.sort_order;
    
    if (targetOrder && targetOrder !== existingDoc.sort_order) {
      updated.splice(currentIdx, 1);
      const targetIdx = Math.max(0, Math.min(updated.length, targetOrder - 1));
      updated.splice(targetIdx, 0, newDoc);
      updated = updated.map((d, i) => ({ ...d, sort_order: i + 1 }));
    } else {
      updated[currentIdx] = newDoc;
    }

    saveLocalDoctors(updated);

    try {
      const res = await apiClient.put(`/doctors.php?id=${id}`, data);
      return res || { success: true };
    } catch (e) {
      console.warn("API updateDoctor failed, updated in local cache:", e);
      return { success: true };
    }
  },

  deleteDoctor: async (id) => {
    const list = getLocalDoctors();
    const updated = list
      .filter(d => String(d.id) !== String(id))
      .map((d, i) => ({ ...d, sort_order: i + 1 }));
    saveLocalDoctors(updated);

    try {
      await apiClient.delete(`/doctors.php?id=${id}`);
    } catch (e) {
      console.warn("API deleteDoctor failed, deleted from local cache:", e);
    }
    return { success: true };
  }
};
