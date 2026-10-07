import React, { useState, useEffect } from 'react';
import { X, Plus, Sparkles, Check } from 'lucide-react';

const COLOR_OPTIONS = [
  { label: 'Magenta / Rose', value: 'from-pink-600 to-rose-600', badge: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20' },
  { label: 'Emerald / Green', value: 'from-emerald-600 to-teal-600', badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
  { label: 'Violet / Purple', value: 'from-violet-600 to-purple-600', badge: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20' },
  { label: 'Fuchsia / Pink', value: 'from-fuchsia-600 to-pink-600', badge: 'bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/20' },
  { label: 'Amber / Orange', value: 'from-amber-600 to-orange-600', badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
  { label: 'Rose / Coral', value: 'from-rose-600 to-pink-600', badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20' },
  { label: 'Berry / Wine', value: 'from-purple-800 to-pink-900', badge: 'bg-pink-900/10 text-pink-800 dark:text-pink-300 border-pink-800/20' },
  { label: 'Slate / Charcoal', value: 'from-slate-700 to-slate-900', badge: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20' },
];

export default function DepartmentModal({ open, onClose, onSave }) {
  const [label, setLabel] = useState('');
  const [code, setCode] = useState('');
  const [colorIndex, setColorIndex] = useState(0);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleLabelChange = (e) => {
    const val = e.target.value;
    setLabel(val);
    if (!code || code === label.slice(0, 3).toUpperCase()) {
      const generated = val.replace(/[^a-zA-Z]/g, '').slice(0, 3).toUpperCase();
      setCode(generated);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!label.trim()) {
      setError('Please provide a department name.');
      return;
    }

    const selectedColor = COLOR_OPTIONS[colorIndex];
    const newDept = {
      label: label.trim(),
      code: (code.trim() || label.slice(0, 3)).toUpperCase(),
      color: selectedColor.value,
      badgeColor: selectedColor.badge,
      description: description.trim() || `${label.trim()} Department at Jerush Dentofacial.`
    };

    onSave(newDept);
    setLabel('');
    setCode('');
    setDescription('');
    setError('');
    onClose();
  };

  const inputCls = "w-full px-4 py-2.5 bg-white/60 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-brandSky focus:ring-2 focus:ring-brandSky/15 transition-all";
  const labelCls = "text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block";

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn"
    >
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brandBlue to-brandSky flex items-center justify-center shadow-sm text-white">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-headline font-bold text-sm text-slate-800 dark:text-white">Create New Department</h2>
              <p className="text-[10px] text-slate-400">Add an official hospital wing or department</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl text-xs text-red-600 dark:text-red-400 font-medium">
              {error}
            </div>
          )}

          <div>
            <label className={labelCls}>Department Name *</label>
            <input
              type="text"
              required
              value={label}
              onChange={handleLabelChange}
              placeholder="e.g. Pediatric Dental Wing, Maxillofacial Trauma Unit"
              className={inputCls}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Department Code (2-4 letters) *</label>
              <input
                type="text"
                required
                maxLength={5}
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g. PED, MTU"
                className={`${inputCls} font-mono uppercase`}
              />
              <p className="text-[9px] text-slate-400 mt-1">Used for employee codes (e.g. JDT-{code || 'XX'}-001)</p>
            </div>

            <div>
              <label className={labelCls}>Theme Badge Preview</label>
              <div className="mt-1 flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border ${COLOR_OPTIONS[colorIndex].badge}`}>
                  <Sparkles className="w-3 h-3" />
                  {label.trim() || 'Sample Department'}
                </span>
              </div>
            </div>
          </div>

          {/* Color palette */}
          <div>
            <label className={labelCls}>Choose Theme Color</label>
            <div className="grid grid-cols-4 gap-2">
              {COLOR_OPTIONS.map((col, idx) => (
                <button
                  key={col.label}
                  type="button"
                  onClick={() => setColorIndex(idx)}
                  className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${colorIndex === idx
                      ? 'border-brandSky ring-2 ring-brandSky/20 bg-brandSky/5'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${col.value} shrink-0 flex items-center justify-center text-white`}>
                    {colorIndex === idx && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 truncate">{col.label.split(' / ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>Description / Scope (Optional)</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Specialist team focused on clinical pediatric care, child sedation, and fluoride treatments."
              className={inputCls}
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-xl font-headline font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              Add Department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
