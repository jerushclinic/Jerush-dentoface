import { apiClient } from "./api";
import { doctors } from "../data/doctors";

const DOCTORS_STORAGE_KEY = 'jerush_doctors_cache';
const DOCTORS_ORDER_KEY = 'jerush_doctors_order_sequence';

function getSavedOrderSequence() {
  try {
    const raw = localStorage.getItem(DOCTORS_ORDER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed.map(String) : null;
  } catch (e) {
    return null;
  }
}

function saveSavedOrderSequence(orderedIds) {
  try {
    localStorage.setItem(DOCTORS_ORDER_KEY, JSON.stringify(orderedIds.map(String)));
  } catch (e) {
    console.error("Failed saving doctors order sequence:", e);
  }
}

function sortListByOrderSequence(list, savedOrder) {
  if (!Array.isArray(list) || list.length === 0) return [];
  if (!Array.isArray(savedOrder) || savedOrder.length === 0) {
    return list.map((doc, idx) => ({ ...doc, sort_order: doc.sort_order || (idx + 1) }));
  }

  const map = new Map(list.map((d) => [String(d.id), d]));
  const sorted = [];

  // 1. Append in explicit saved order
  for (const id of savedOrder) {
    if (map.has(id)) {
      sorted.push(map.get(id));
      map.delete(id);
    }
  }

  // 2. Any remaining doctors (newly added or not yet sequenced) go at the end
  for (const remaining of map.values()) {
    sorted.push(remaining);
  }

  // 3. Sequentially re-number 1, 2, 3...
  return sorted.map((doc, idx) => ({
    ...doc,
    sort_order: idx + 1
  }));
}

function getLocalDoctors() {
  try {
    const raw = localStorage.getItem(DOCTORS_STORAGE_KEY);
    let list = raw ? JSON.parse(raw) : doctors;
    if (!Array.isArray(list) || list.length === 0) {
      list = doctors;
    }

    const savedOrder = getSavedOrderSequence();
    if (savedOrder && savedOrder.length > 0) {
      list = sortListByOrderSequence(list, savedOrder);
    } else {
      list = list.map((doc, idx) => {
        const order = doc.sort_order !== undefined && doc.sort_order !== null && !isNaN(Number(doc.sort_order))
          ? Number(doc.sort_order)
          : (idx + 1);
        return { ...doc, sort_order: order };
      });
      list.sort((a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0));
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

function notifyDoctorsUpdated(list) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('jerush_doctors_updated', { detail: list }));
  }
}

export const doctorService = {
  getDoctors: async () => {
    try {
      const apiDoctors = await apiClient.get('/doctors.php');
      if (Array.isArray(apiDoctors) && apiDoctors.length > 0) {
        const savedOrder = getSavedOrderSequence();

        // Check if API response contains valid, populated sort_order (not all 0 or undefined)
        const hasValidApiSortOrder = apiDoctors.some(
          (d) => d.sort_order !== undefined && d.sort_order !== null && Number(d.sort_order) > 0
        );

        let resolvedList;

        if (savedOrder && savedOrder.length > 0) {
          // User has customized the display order locally — preserve it across all API refreshes!
          resolvedList = sortListByOrderSequence(apiDoctors, savedOrder);
        } else if (hasValidApiSortOrder) {
          // Database already has populated sort_order
          resolvedList = apiDoctors
            .map((doc, idx) => ({
              ...doc,
              sort_order: doc.sort_order !== undefined && doc.sort_order !== null && !isNaN(Number(doc.sort_order))
                ? Number(doc.sort_order)
                : (idx + 1)
            }))
            .sort((a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0));
        } else {
          // Default sequence from API
          resolvedList = apiDoctors.map((doc, idx) => ({
            ...doc,
            sort_order: idx + 1
          }));
        }

        const normalized = resolvedList.map((d, i) => ({ ...d, sort_order: i + 1 }));
        saveLocalDoctors(normalized);
        saveSavedOrderSequence(normalized.map((d) => d.id));
        return normalized;
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
    const doc = list.find((d) => String(d.id) === String(id));
    if (!doc) throw new Error("Doctor not found");
    return doc;
  },

  reorderDoctors: async (orderedList) => {
    // 1. Normalize sort_order sequentially 1, 2, 3...
    const normalized = orderedList.map((doc, idx) => ({
      ...doc,
      sort_order: idx + 1
    }));

    // 2. Persist to localStorage immediately
    saveLocalDoctors(normalized);
    const orderedIds = normalized.map((d) => String(d.id));
    saveSavedOrderSequence(orderedIds);

    // 3. Notify all listeners in the UI immediately
    notifyDoctorsUpdated(normalized);

    // 4. Synchronize with backend API
    const orderPayload = normalized.map((d, idx) => ({
      id: isNaN(Number(d.id)) ? d.id : Number(d.id),
      sort_order: idx + 1
    }));

    let syncSuccess = false;
    try {
      // Primary reorder endpoint
      await apiClient.post('/doctors_reorder.php', { doctors: orderPayload });
      syncSuccess = true;
    } catch (err1) {
      console.warn("Primary /doctors_reorder.php not available yet, trying fallback...", err1);
    }

    if (!syncSuccess) {
      try {
        // Fallback action endpoint on doctors.php
        await apiClient.post('/doctors.php?action=reorder', { doctors: orderPayload });
        syncSuccess = true;
      } catch (err2) {
        console.warn("Fallback /doctors.php?action=reorder not available yet:", err2);
      }
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
      updated = updated.map((d, i) => ({ ...d, sort_order: i + 1 }));
    } else {
      updated = [...list, { ...newDoc, sort_order: list.length + 1 }];
    }

    saveLocalDoctors(updated);
    saveSavedOrderSequence(updated.map((d) => d.id));
    notifyDoctorsUpdated(updated);

    try {
      const res = await apiClient.post('/doctors.php', newDoc);
      if (res && res.id) {
        const withRealId = updated.map((d) => (d.id === newDoc.id ? { ...d, id: res.id } : d));
        saveLocalDoctors(withRealId);
        saveSavedOrderSequence(withRealId.map((d) => d.id));
        return { ...newDoc, id: res.id };
      }
      return res || newDoc;
    } catch (e) {
      console.warn("API addDoctor failed, saved to local cache:", e);
      return newDoc;
    }
  },

  updateDoctor: async (id, data) => {
    const list = getLocalDoctors();
    const currentIdx = list.findIndex((d) => String(d.id) === String(id));
    
    if (currentIdx === -1) return { success: false };

    let updated = [...list];
    const existingDoc = updated[currentIdx];
    const newDoc = { ...existingDoc, ...data };
    
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
    saveSavedOrderSequence(updated.map((d) => d.id));
    notifyDoctorsUpdated(updated);

    try {
      const res = await apiClient.put(`/doctors.php?id=${id}`, newDoc);
      return res || { success: true };
    } catch (e) {
      console.warn("API updateDoctor failed, updated in local cache:", e);
      return { success: true };
    }
  },

  deleteDoctor: async (id) => {
    const list = getLocalDoctors();
    const updated = list
      .filter((d) => String(d.id) !== String(id))
      .map((d, i) => ({ ...d, sort_order: i + 1 }));
    saveLocalDoctors(updated);
    saveSavedOrderSequence(updated.map((d) => d.id));
    notifyDoctorsUpdated(updated);

    try {
      await apiClient.delete(`/doctors.php?id=${id}`);
    } catch (e) {
      console.warn("API deleteDoctor failed, deleted from local cache:", e);
    }
    return { success: true };
  }
};
