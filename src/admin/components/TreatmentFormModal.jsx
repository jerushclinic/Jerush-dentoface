import React from 'react';
import { Undo, Redo } from 'lucide-react';
import FormModal from './FormModal';
import TagInput from './TagInput';
import useUndoRedo from '../hooks/useUndoRedo';

const CATEGORIES = ['dental', 'cosmetic', 'hair', 'body'];
const ICON_NAMES = ['Smile', 'Flame', 'Activity', 'ShieldCheck', 'Sparkles', 'Heart', 'TrendingUp', 'Scissors', 'UserCheck'];

const EMPTY = {
  id: '', title: '', category: 'dental', desc: '', iconName: 'Smile', image: '', details: '', benefits: [], subtitle: '', backDesc: ''
};

export default function TreatmentFormModal({ open, onClose, onSave, treatment }) {
  const {
    state: form,
    setState: setForm,
    undo,
    redo,
    canUndo,
    canRedo,
    reset
  } = useUndoRedo(treatment || EMPTY);

  React.useEffect(() => {
    reset(treatment || EMPTY);
  }, [treatment, open, reset]);

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }, false); // false = debounced
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalForm = { ...form };
    if (!finalForm.id) {
      finalForm.id = finalForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    onSave(finalForm);
    onClose();
  };

  const inputCls = "w-full px-4 py-2.5 bg-white/40 dark:bg-slate-900/35 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-brandSky dark:focus:border-brandSky focus:bg-white/80 dark:focus:bg-slate-900/75 focus:ring-2 focus:ring-brandSky/15 transition-all shadow-sm";
  const labelCls = "text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block";

  return (
    <FormModal open={open} onClose={onClose} title={treatment ? 'Edit Treatment' : 'Add New Treatment'} subtitle="Define treatment details and categorization">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className={labelCls}>Treatment Title</label>
            <input name="title" value={form.title || ''} onChange={handleChange} placeholder="e.g. Clear Aligners" required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Category</label>
            <select name="category" value={form.category || 'dental'} onChange={handleChange} className={inputCls}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className={labelCls}>Icon Name</label>
            <select name="iconName" value={form.iconName || 'Smile'} onChange={handleChange} className={inputCls}>
              {ICON_NAMES.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Slug / ID</label>
            <input name="id" value={form.id || ''} onChange={handleChange} placeholder="auto-generated-from-title" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Image URL</label>
            <input name="image" value={form.image || ''} onChange={handleChange} placeholder="/images/treatments/dental_implants.png" className={inputCls} />
          </div>
        </div>

        <div>
          <label className={labelCls}>Short Description</label>
          <textarea name="desc" value={form.desc || ''} onChange={handleChange} placeholder="Brief patient-facing description..." rows={2} className={`${inputCls} resize-y min-h-[60px]`} />
        </div>

        <div>
          <label className={labelCls}>Detailed Description</label>
          <textarea name="details" value={form.details || ''} onChange={handleChange} placeholder="In-depth clinical details..." rows={3} className={`${inputCls} resize-y min-h-[80px]`} />
        </div>

        <div>
          <label className={labelCls}>Benefits</label>
          <TagInput 
            value={form.benefits} 
            onChange={(tags) => setForm({ ...form, benefits: tags }, true)} // true = immediate
            placeholder="Type a benefit and press Enter" 
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className={labelCls}>Subtitle (Homepage)</label>
            <input name="subtitle" value={form.subtitle || ''} onChange={handleChange} placeholder="Short tagline for homepage card" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Back Description (Card Flip)</label>
            <input name="backDesc" value={form.backDesc || ''} onChange={handleChange} placeholder="Text shown on card back" className={inputCls} />
          </div>
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
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-750 dark:hover:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-colors cursor-pointer border-none">Cancel</button>
            <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-xl font-headline font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer border-none">
              {treatment ? 'Save Changes' : 'Add Treatment'}
            </button>
          </div>
        </div>
      </form>
    </FormModal>
  );
}
