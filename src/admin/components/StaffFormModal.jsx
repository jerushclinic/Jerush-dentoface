import React, { useState, useEffect } from 'react';
import { 
  X, Upload, Link2, Sparkles, RefreshCw, Undo, Redo, 
  User, Shield, Heart, MapPin, Phone, Calendar, Building2, Plus
} from 'lucide-react';
import { BLOOD_GROUPS, GENDERS, STAFF_STATUSES } from '../../data/staffDepartments';

const DEFAULT_STAFF = {
  name: '',
  empCode: '',
  role: '',
  department: 'dental_doctors',
  branch: 'Jerush Head Clinic – Thuckalay',
  dob: '',
  gender: 'Male',
  bloodGroup: 'O+',
  phone: '',
  dateOfJoining: new Date().toISOString().split('T')[0],
  address: '',
  status: 'Active',
  image: '',
  qualification: '',
  notes: ''
};

export default function StaffFormModal({
  open,
  onClose,
  onSave,
  staff = null,
  departments = [],
  branches = [],
  onOpenDepartmentModal
}) {
  const [form, setForm] = useState(DEFAULT_STAFF);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [imageTab, setImageTab] = useState('upload'); // 'upload' | 'url'
  const [customBranchMode, setCustomBranchMode] = useState(false);
  const [customBranchInput, setCustomBranchInput] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      if (staff) {
        setForm({
          ...DEFAULT_STAFF,
          ...staff
        });
        const isKnownBranch = branches.includes(staff.branch);
        if (!isKnownBranch && staff.branch) {
          setCustomBranchMode(true);
          setCustomBranchInput(staff.branch);
        } else {
          setCustomBranchMode(false);
          setCustomBranchInput('');
        }
      } else {
        // Auto-suggest next emp code for Add mode
        const defaultDept = departments[0]?.id || 'dental_doctors';
        const deptObj = departments.find(d => d.id === defaultDept);
        const codePrefix = deptObj?.code || 'DD';
        const randomNum = Math.floor(100 + Math.random() * 900);
        
        const initial = {
          ...DEFAULT_STAFF,
          department: defaultDept,
          empCode: `JDT-${codePrefix}-${randomNum}`
        };
        setForm(initial);
        setCustomBranchMode(false);
        setCustomBranchInput('');
      }
      setHistory([]);
      setHistoryIndex(-1);
      setErrors({});
    }
  }, [open, staff, departments, branches]);

  // Undo / Redo state management
  const updateFormState = (nextState, saveHistory = true) => {
    if (saveHistory) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(form);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
    setForm(nextState);
  };

  const handleUndo = () => {
    if (historyIndex >= 0) {
      const prev = history[historyIndex];
      setHistoryIndex(historyIndex - 1);
      setForm(prev);
    }
  };

  const handleRedo = () => {
    if (historyIndex + 1 < history.length) {
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setForm(next);
    }
  };

  // Keyboard shortcut: Esc to close, Ctrl+Z / Ctrl+Y for Undo/Redo
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'y' || (e.shiftKey && e.key.toLowerCase() === 'z'))) {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose, historyIndex, history]);

  if (!open) return null;

  const handleFieldChange = (field, value) => {
    updateFormState({ ...form, [field]: value });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  // Auto generate code helper
  const handleAutoGenerateCode = () => {
    const deptObj = departments.find(d => d.id === form.department);
    const prefix = deptObj?.code || 'STF';
    const rand = Math.floor(100 + Math.random() * 900);
    handleFieldChange('empCode', `JDT-${prefix}-${rand}`);
  };

  // Image Upload handler with Canvas Compression
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const maxDim = 600;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', 0.85);
        handleFieldChange('image', compressed);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required';
    if (!form.empCode.trim()) newErrors.empCode = 'Employee code is required';
    if (!form.role.trim()) newErrors.role = 'Role / Designation is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.dob) newErrors.dob = 'Date of birth is required';
    if (!form.dateOfJoining) newErrors.dateOfJoining = 'Date of joining is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const finalBranch = customBranchMode && customBranchInput.trim() 
      ? customBranchInput.trim() 
      : form.branch;

    onSave({
      ...form,
      branch: finalBranch
    });
    onClose();
  };

  const inputCls = (error) => `w-full px-4 py-2.5 bg-white/60 dark:bg-slate-950/60 border ${
    error ? 'border-red-400 dark:border-red-500' : 'border-slate-200 dark:border-slate-800'
  } rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-brandSky focus:ring-2 focus:ring-brandSky/15 transition-all`;

  const labelCls = "text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between";

  return (
    <div 
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-fadeIn"
    >
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden relative my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brandBlue to-brandSky text-white flex items-center justify-center shadow-md">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-headline font-black text-base text-slate-900 dark:text-white">
                {staff ? 'Update Staff Member' : 'Add New Staff Profile'}
              </h2>
              <p className="text-[11px] text-slate-400">
                {staff ? `Modifying records for ${staff.name}` : 'Create a new employee profile in Jerush database'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Undo/Redo */}
            <button
              type="button"
              onClick={handleUndo}
              disabled={historyIndex < 0}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Undo (Ctrl+Z)"
            >
              <Undo className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleRedo}
              disabled={historyIndex + 1 >= history.length}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Redo (Ctrl+Y)"
            >
              <Redo className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Section 1: Core Credentials & Office Managed Fields */}
          <div>
            <h3 className="text-xs font-headline font-black text-brandBlue dark:text-brandSky uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              1. Official Credentials & Department (Office Controlled)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className={labelCls}>
                  <span>Full Name *</span>
                  {errors.name && <span className="text-red-500 normal-case font-normal">{errors.name}</span>}
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  placeholder="e.g. Dr. Rajesh Kumar / Mrs. Sangeetha"
                  className={inputCls(errors.name)}
                />
              </div>

              {/* Emp Code with auto-gen */}
              <div>
                <div className={labelCls}>
                  <span>Emp Code (Office Use Only) *</span>
                  <button
                    type="button"
                    onClick={handleAutoGenerateCode}
                    className="text-[9px] text-brandSky hover:underline flex items-center gap-1 cursor-pointer font-bold lowercase"
                  >
                    <RefreshCw className="w-2.5 h-2.5" /> auto-gen
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={form.empCode}
                  onChange={(e) => handleFieldChange('empCode', e.target.value.toUpperCase())}
                  placeholder="e.g. JDT-DD-001"
                  className={`${inputCls(errors.empCode)} font-mono font-bold uppercase`}
                />
                {errors.empCode && <p className="text-[10px] text-red-500 mt-1">{errors.empCode}</p>}
              </div>

              {/* Role / Designation */}
              <div>
                <label className={labelCls}>
                  <span>Role / Designation *</span>
                  {errors.role && <span className="text-red-500 normal-case font-normal">{errors.role}</span>}
                </label>
                <input
                  type="text"
                  required
                  value={form.role}
                  onChange={(e) => handleFieldChange('role', e.target.value)}
                  placeholder="e.g. Senior Dental Surgeon / Lab Incharge"
                  className={inputCls(errors.role)}
                />
              </div>

              {/* Department with + Add New Department shortcut */}
              <div>
                <div className={labelCls}>
                  <span>Department *</span>
                  {onOpenDepartmentModal && (
                    <button
                      type="button"
                      onClick={onOpenDepartmentModal}
                      className="text-[9px] text-brandSky hover:underline flex items-center gap-1 cursor-pointer font-bold"
                    >
                      <Plus className="w-2.5 h-2.5" /> New Dept
                    </button>
                  )}
                </div>
                <select
                  value={form.department}
                  onChange={(e) => handleFieldChange('department', e.target.value)}
                  className={inputCls(false)}
                >
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.label} ({d.code || 'DEPT'})
                    </option>
                  ))}
                </select>
              </div>

              {/* Branch / Centre */}
              <div>
                <div className={labelCls}>
                  <span>Hospital Centre / Branch *</span>
                  <button
                    type="button"
                    onClick={() => setCustomBranchMode(!customBranchMode)}
                    className="text-[9px] text-brandSky hover:underline cursor-pointer font-bold"
                  >
                    {customBranchMode ? 'Select existing' : '+ Custom Branch'}
                  </button>
                </div>
                {customBranchMode ? (
                  <input
                    type="text"
                    value={customBranchInput}
                    onChange={(e) => setCustomBranchInput(e.target.value)}
                    placeholder="e.g. Jerush Madurai Centre"
                    className={inputCls(false)}
                  />
                ) : (
                  <select
                    value={form.branch}
                    onChange={(e) => handleFieldChange('branch', e.target.value)}
                    className={inputCls(false)}
                  >
                    {branches.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                )}
              </div>

              {/* Duty Status */}
              <div>
                <label className={labelCls}>
                  <span>Duty Status *</span>
                </label>
                <select
                  value={form.status}
                  onChange={(e) => handleFieldChange('status', e.target.value)}
                  className={inputCls(false)}
                >
                  {STAFF_STATUSES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Personal, Medical & Demographics */}
          <div>
            <h3 className="text-xs font-headline font-black text-brandBlue dark:text-brandSky uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5" />
              2. Personal, Medical & Demographics
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* DOB */}
                <div>
                  <label className={labelCls}>
                    <span>Date of Birth (DOB) *</span>
                    {errors.dob && <span className="text-red-500 normal-case font-normal">{errors.dob}</span>}
                  </label>
                  <input
                    type="date"
                    required
                    value={form.dob}
                    onChange={(e) => handleFieldChange('dob', e.target.value)}
                    className={inputCls(errors.dob)}
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className={labelCls}>
                    <span>Gender *</span>
                  </label>
                  <select
                    value={form.gender}
                    onChange={(e) => handleFieldChange('gender', e.target.value)}
                    className={inputCls(false)}
                  >
                    {GENDERS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                {/* Blood Group */}
                <div>
                  <label className={labelCls}>
                    <span>Blood Group *</span>
                  </label>
                  <select
                    value={form.bloodGroup}
                    onChange={(e) => handleFieldChange('bloodGroup', e.target.value)}
                    className={`${inputCls(false)} font-bold`}
                  >
                    {BLOOD_GROUPS.map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div>
                  <label className={labelCls}>
                    <span>Phone Number *</span>
                    {errors.phone && <span className="text-red-500 normal-case font-normal">{errors.phone}</span>}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.phone}
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                    placeholder="+91 94431 00000"
                    className={inputCls(errors.phone)}
                  />
                </div>

                {/* Date of Joining */}
                <div>
                  <label className={labelCls}>
                    <span>Date of Joining *</span>
                    {errors.dateOfJoining && <span className="text-red-500 normal-case font-normal">{errors.dateOfJoining}</span>}
                  </label>
                  <input
                    type="date"
                    required
                    value={form.dateOfJoining}
                    onChange={(e) => handleFieldChange('dateOfJoining', e.target.value)}
                    className={inputCls(errors.dateOfJoining)}
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className={labelCls}>
                  <span>Residential Address *</span>
                  {errors.address && <span className="text-red-500 normal-case font-normal">{errors.address}</span>}
                </label>
                <textarea
                  rows={2}
                  required
                  value={form.address}
                  onChange={(e) => handleFieldChange('address', e.target.value)}
                  placeholder="Full residential or communication address..."
                  className={inputCls(errors.address)}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Photo Upload (Office Use Only) */}
          <div>
            <h3 className="text-xs font-headline font-black text-brandBlue dark:text-brandSky uppercase tracking-wider mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5" />
                3. Employee Photo (Office Use Only — Uploaded by Admin)
              </span>
              <span className="text-[10px] text-slate-400 font-normal lowercase">PNG, JPG, WebP</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] gap-4 items-center bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800">
              <div>
                {/* Switcher Tab */}
                <div className="flex gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 w-fit mb-3">
                  <button
                    type="button"
                    onClick={() => setImageTab('upload')}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                      imageTab === 'upload'
                        ? 'bg-brandBlue text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageTab('url')}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                      imageTab === 'url'
                        ? 'bg-brandBlue text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    Image URL
                  </button>
                </div>

                {imageTab === 'upload' ? (
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-brandSky rounded-xl p-4 cursor-pointer bg-white/50 dark:bg-slate-900/50 transition-colors">
                    <Upload className="w-5 h-5 text-slate-400 mb-1" />
                    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">Click to Select Photo</span>
                    <span className="text-[9px] text-slate-400">Compressed automatically for high performance</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <input
                    type="url"
                    value={form.image}
                    onChange={(e) => handleFieldChange('image', e.target.value)}
                    placeholder="https://... / path/to/photo.webp"
                    className={inputCls(false)}
                  />
                )}
              </div>

              {/* Preview Box */}
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="w-20 h-20 rounded-2xl border-2 border-brandSky/30 overflow-hidden bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0 relative shadow-inner">
                  {form.image ? (
                    <img
                      src={form.image}
                      alt="Staff Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <User className="w-8 h-8 text-slate-400" />
                  )}
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-700 dark:text-slate-200">
                    {form.image ? 'Photo Loaded' : 'No Photo'}
                  </p>
                  {form.image && (
                    <button
                      type="button"
                      onClick={() => handleFieldChange('image', '')}
                      className="text-[10px] text-red-500 hover:underline mt-1 block font-medium"
                    >
                      Remove Photo
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-xl font-headline font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              {staff ? 'Save Changes' : 'Create Staff Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
