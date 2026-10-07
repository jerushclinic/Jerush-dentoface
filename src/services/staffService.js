import { INITIAL_DEPARTMENTS, INITIAL_BRANCHES } from '../data/staffDepartments';
import { initialStaffProfiles } from '../data/initialStaffProfiles';

const STAFF_STORAGE_KEY = 'jerush_staff_profiles';
const DEPTS_STORAGE_KEY = 'jerush_staff_departments';
const BRANCHES_STORAGE_KEY = 'jerush_staff_branches';
const DATA_VERSION_KEY = 'jerush_staff_registry_version';
const CURRENT_DATA_VERSION = 'v2026_pdf_84';

function getStored(key, defaultVal, checkVersion = false) {
  try {
    if (checkVersion) {
      const storedVersion = localStorage.getItem(DATA_VERSION_KEY);
      if (storedVersion !== CURRENT_DATA_VERSION) {
        localStorage.setItem(DATA_VERSION_KEY, CURRENT_DATA_VERSION);
        localStorage.setItem(key, JSON.stringify(defaultVal));
        return defaultVal;
      }
    }
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultVal));
      return defaultVal;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Failed reading ${key} from localStorage:`, err);
    return defaultVal;
  }
}

function setStored(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (err) {
    console.error(`Failed writing ${key} to localStorage:`, err);
  }
}

export const staffService = {
  // --- Departments ---
  getDepartments: async () => {
    return getStored(DEPTS_STORAGE_KEY, INITIAL_DEPARTMENTS, true);
  },

  addDepartment: async (deptData) => {
    const departments = getStored(DEPTS_STORAGE_KEY, INITIAL_DEPARTMENTS);
    const slug = deptData.id || deptData.label.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
    const code = (deptData.code || deptData.label.slice(0, 3)).toUpperCase();
    
    const newDept = {
      id: slug,
      label: deptData.label,
      code: code,
      color: deptData.color || 'from-blue-600 to-cyan-500',
      badgeColor: deptData.badgeColor || 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      icon: deptData.icon || 'Users2',
      description: deptData.description || 'Jerush Hospital Department',
      isCustom: true
    };

    const exists = departments.some(d => d.id === slug);
    const updated = exists 
      ? departments.map(d => d.id === slug ? { ...d, ...newDept } : d)
      : [...departments, newDept];

    setStored(DEPTS_STORAGE_KEY, updated);
    return newDept;
  },

  deleteDepartment: async (deptId) => {
    const departments = getStored(DEPTS_STORAGE_KEY, INITIAL_DEPARTMENTS);
    const filtered = departments.filter(d => d.id !== deptId);
    setStored(DEPTS_STORAGE_KEY, filtered);
    return true;
  },

  // --- Branches ---
  getBranches: async () => {
    return getStored(BRANCHES_STORAGE_KEY, INITIAL_BRANCHES);
  },

  addBranch: async (branchName) => {
    const trimmed = (branchName || '').trim();
    if (!trimmed) return null;
    const branches = getStored(BRANCHES_STORAGE_KEY, INITIAL_BRANCHES);
    if (!branches.includes(trimmed)) {
      const updated = [...branches, trimmed];
      setStored(BRANCHES_STORAGE_KEY, updated);
      return trimmed;
    }
    return trimmed;
  },

  // --- Staff Profiles ---
  getStaffProfiles: async () => {
    const profiles = getStored(STAFF_STORAGE_KEY, initialStaffProfiles, true);
    return profiles;
  },

  getStaffProfileById: async (id) => {
    const profiles = getStored(STAFF_STORAGE_KEY, initialStaffProfiles);
    const staff = profiles.find(s => String(s.id) === String(id));
    if (!staff) throw new Error(`Staff member with ID ${id} not found.`);
    return staff;
  },

  addStaffProfile: async (data) => {
    const profiles = getStored(STAFF_STORAGE_KEY, initialStaffProfiles);
    const nextId = profiles.length > 0 ? Math.max(...profiles.map(p => Number(p.id) || 0)) + 1 : 1;
    
    // Auto-generate empCode if missing or blank
    let code = (data.empCode || '').trim();
    if (!code) {
      const deptCode = (data.department || 'STF').slice(0, 3).toUpperCase();
      code = `JDT-${deptCode}-${String(nextId).padStart(3, '0')}`;
    }

    const newStaff = {
      id: nextId,
      name: data.name || '',
      empCode: code,
      dob: data.dob || '',
      gender: data.gender || 'Male',
      bloodGroup: data.bloodGroup || 'O+',
      address: data.address || '',
      phone: data.phone || '',
      dateOfJoining: data.dateOfJoining || new Date().toISOString().split('T')[0],
      department: data.department || 'dental_doctors',
      branch: data.branch || 'Jerush Head Clinic – Thuckalay',
      role: data.role || 'Staff Member',
      image: data.image || '',
      status: data.status || 'Active',
      email: data.email || '',
      qualification: data.qualification || '',
      emergencyContact: data.emergencyContact || { name: '', phone: '', relation: '' },
      notes: data.notes || '',
      createdAt: new Date().toISOString()
    };

    const updated = [newStaff, ...profiles];
    setStored(STAFF_STORAGE_KEY, updated);

    // If new branch was typed, also register branch
    if (newStaff.branch) {
      await staffService.addBranch(newStaff.branch);
    }

    return newStaff;
  },

  updateStaffProfile: async (id, data) => {
    const profiles = getStored(STAFF_STORAGE_KEY, initialStaffProfiles);
    const index = profiles.findIndex(p => String(p.id) === String(id));
    if (index === -1) throw new Error(`Staff profile ${id} not found.`);

    const existing = profiles[index];
    const updatedStaff = {
      ...existing,
      ...data,
      id: existing.id, // preserve id
      updatedAt: new Date().toISOString()
    };

    profiles[index] = updatedStaff;
    setStored(STAFF_STORAGE_KEY, profiles);

    if (updatedStaff.branch) {
      await staffService.addBranch(updatedStaff.branch);
    }

    return updatedStaff;
  },

  deleteStaffProfile: async (id) => {
    const profiles = getStored(STAFF_STORAGE_KEY, initialStaffProfiles);
    const filtered = profiles.filter(p => String(p.id) !== String(id));
    setStored(STAFF_STORAGE_KEY, filtered);
    return true;
  },

  resetToDefault: async () => {
    localStorage.setItem(DATA_VERSION_KEY, CURRENT_DATA_VERSION);
    setStored(STAFF_STORAGE_KEY, initialStaffProfiles);
    setStored(DEPTS_STORAGE_KEY, INITIAL_DEPARTMENTS);
    setStored(BRANCHES_STORAGE_KEY, INITIAL_BRANCHES);
    return {
      staff: initialStaffProfiles,
      departments: INITIAL_DEPARTMENTS,
      branches: INITIAL_BRANCHES
    };
  }
};
