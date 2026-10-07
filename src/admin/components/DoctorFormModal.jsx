import React from 'react';
import { Undo, Redo } from 'lucide-react';
import FormModal from './FormModal';
import TagInput from './TagInput';
import useUndoRedo from '../hooks/useUndoRedo';

const EMPTY_DOCTOR = {
  name: '', role: '', qualification: '', experience: '', image: '', fallbackImg: '', bio: '', schedule: '', specialties: [], sort_order: ''
};

export default function DoctorFormModal({ open, onClose, onSave, doctor }) {
  const {
    state: form,
    setState: setForm,
    undo,
    redo,
    canUndo,
    canRedo,
    reset
  } = useUndoRedo(doctor || EMPTY_DOCTOR);

  React.useEffect(() => {
    reset(doctor || EMPTY_DOCTOR);
  }, [doctor, open, reset]);

  // Handle keyboard shortcuts for Undo/Redo
  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      const isZ = e.key.toLowerCase() === 'z';
      const isY = e.key.toLowerCase() === 'y';
      
      if ((e.ctrlKey || e.metaKey) && isZ && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && (isY || (e.shiftKey && isZ))) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, undo, redo]);

  const [imageTab, setImageTab] = React.useState('upload'); // 'upload' | 'url'

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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
          setForm({ ...form, image: compressed }, true);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'sort_order' ? (value === '' ? '' : Number(value)) : value }, false); // false = debounced history save
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  const inputCls = "w-full px-4 py-2.5 bg-white/40 dark:bg-slate-900/35 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-brandSky dark:focus:border-brandSky focus:bg-white/80 dark:focus:bg-slate-900/75 focus:ring-2 focus:ring-brandSky/15 transition-all shadow-sm";
  const labelCls = "text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block";

  return (
    <FormModal open={open} onClose={onClose} title={doctor ? 'Edit Doctor' : 'Add New Doctor'} subtitle="Fill in the doctor's profile details">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className={labelCls}>Full Name</label>
            <input name="name" value={form.name || ''} onChange={handleChange} placeholder="Dr. Full Name" required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Role / Title</label>
            <input name="role" value={form.role || ''} onChange={handleChange} placeholder="e.g. Senior Periodontist" required className={inputCls} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className={labelCls}>Qualification</label>
            <input name="qualification" value={form.qualification || ''} onChange={handleChange} placeholder="e.g. MBBS, MDS, PHD" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Experience</label>
            <input name="experience" value={form.experience || ''} onChange={handleChange} placeholder="e.g. 15+ Years Experience" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Display Position</label>
            <input 
              name="sort_order" 
              type="number" 
              min="1" 
              value={form.sort_order ?? ''} 
              onChange={handleChange} 
              placeholder="e.g. 1" 
              className={inputCls} 
            />
            <p className="text-[9px] text-slate-400 mt-1">Order on site (1 = First)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[1.6fr_1fr] gap-6">
          <div>
            <label className={labelCls}>Profile Photo</label>
            {/* Image Selection Tabs */}
            <div className="flex gap-2 p-1 bg-slate-100/80 dark:bg-slate-950/40 rounded-xl mb-3 border border-slate-200/50 dark:border-slate-800/40 w-fit">
              <button
                type="button"
                onClick={() => setImageTab('upload')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  imageTab === 'upload'
                    ? 'bg-white dark:bg-slate-850 text-slate-800 dark:text-white shadow-sm border border-slate-200/30'
                    : 'text-slate-400 hover:text-slate-650'
                }`}
              >
                Upload File
              </button>
              <button
                type="button"
                onClick={() => setImageTab('url')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  imageTab === 'url'
                    ? 'bg-white dark:bg-slate-850 text-slate-800 dark:text-white shadow-sm border border-slate-200/30'
                    : 'text-slate-400 hover:text-slate-650'
                }`}
              >
                Paste URL
              </button>
            </div>

            {imageTab === 'upload' ? (
              <div className="space-y-3">
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 cursor-pointer hover:border-brandSky dark:hover:border-brandSky/60 transition-colors bg-white/20 dark:bg-slate-900/10">
                  <svg className="w-6 h-6 text-slate-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                  </svg>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Select Image File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <input name="image" value={form.image || ''} onChange={handleChange} className={inputCls} placeholder="e.g. https://domain.com/path/to/image.jpg" />
            )}
          </div>

          <div>
            <label className={labelCls}>Photo Preview</label>
            <div className="flex gap-4 items-center">
              <div className="w-14 h-14 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 flex items-center justify-center shrink-0 shadow-inner">
                {form.image ? (
                  <img src={form.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                ) : (
                  <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <label className={labelCls}>Fallback Image URL</label>
                <input name="fallbackImg" value={form.fallbackImg || ''} onChange={handleChange} placeholder="https://..." className={inputCls} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className={labelCls}>Specialties</label>
          <TagInput 
            value={form.specialties} 
            onChange={(tags) => setForm({ ...form, specialties: tags }, true)} // true = immediate history save
            placeholder="Type a specialty and press Enter" 
          />
        </div>

        <div>
          <label className={labelCls}>Bio</label>
          <textarea name="bio" value={form.bio || ''} onChange={handleChange} placeholder="Brief professional biography..." rows={3} className={`${inputCls} resize-y min-h-[90px]`} />
        </div>

        <div>
          <label className={labelCls}>Schedule</label>
          <textarea 
            name="schedule" 
            value={form.schedule || ''} 
            onChange={handleChange} 
            placeholder="e.g. Mon - Sat (10:00 AM - 6:00 PM)&#10;Sun (10:00 AM - 2:00 PM)" 
            rows={2} 
            className={`${inputCls} resize-y min-h-[70px]`} 
          />
        </div>

        {/* Actions & Undo/Redo */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={undo}
              disabled={!canUndo}
              className={`px-3.5 py-2 rounded-xl border border-slate-200/60 dark:border-slate-800/80 text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
                canUndo 
                  ? 'bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer active:scale-95' 
                  : 'bg-slate-50 dark:bg-slate-950/20 text-slate-300 dark:text-slate-700 cursor-not-allowed border-dashed'
              }`}
              title="Undo last edit (Ctrl+Z)"
            >
              <Undo className="w-3.5 h-3.5" />
              Undo
            </button>
            <button
              type="button"
              onClick={redo}
              disabled={!canRedo}
              className={`px-3.5 py-2 rounded-xl border border-slate-200/60 dark:border-slate-800/80 text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
                canRedo 
                  ? 'bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer active:scale-95' 
                  : 'bg-slate-50 dark:bg-slate-950/20 text-slate-300 dark:text-slate-700 cursor-not-allowed border-dashed'
              }`}
              title="Redo (Ctrl+Y)"
            >
              <Redo className="w-3.5 h-3.5" />
              Redo
            </button>
          </div>
          
          <div className="flex gap-3 justify-end">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-750 dark:hover:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-colors cursor-pointer border-none">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-xl font-headline font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer border-none">
              {doctor ? 'Save Changes' : 'Add Doctor'}
            </button>
          </div>
        </div>
      </form>
    </FormModal>
  );
}

