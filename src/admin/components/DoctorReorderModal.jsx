import React, { useState, useEffect } from 'react';
import { 
  GripVertical, ChevronUp, ChevronDown, ArrowUpToLine, ArrowDownToLine, 
  RotateCcw, Check, Search, Info 
} from 'lucide-react';
import FormModal from './FormModal';

export default function DoctorReorderModal({ open, onClose, doctors, onSaveOrder }) {
  const [list, setList] = useState([]);
  const [filterQuery, setFilterQuery] = useState('');
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (open) {
      setList(doctors ? [...doctors] : []);
      setFilterQuery('');
      setSavedSuccess(false);
    }
  }, [open, doctors]);

  const moveItem = (fromIdx, toIdx) => {
    if (toIdx < 0 || toIdx >= list.length || fromIdx === toIdx) return;
    const updated = [...list];
    const [moved] = updated.splice(fromIdx, 1);
    updated.splice(toIdx, 0, moved);
    setList(updated);
  };

  const moveToTop = (idx) => moveItem(idx, 0);
  const moveToBottom = (idx) => moveItem(idx, list.length - 1);
  const moveUp = (idx) => moveItem(idx, idx - 1);
  const moveDown = (idx) => moveItem(idx, idx + 1);

  const handleDragStart = (e, index) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === index) return;
    setDragOverIdx(index);
  };

  const handleDrop = (e, targetIdx) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === targetIdx) return;
    moveItem(draggedIdx, targetIdx);
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  const handleSave = () => {
    onSaveOrder(list);
    setSavedSuccess(true);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  const handleReset = () => {
    setList([...doctors]);
  };

  // Filter for display while preserving true global list index
  const visibleDoctors = list
    .map((doc, globalIndex) => ({ doc, globalIndex }))
    .filter(({ doc }) => {
      if (!filterQuery.trim()) return true;
      const q = filterQuery.toLowerCase();
      return (
        doc.name.toLowerCase().includes(q) ||
        (doc.role && doc.role.toLowerCase().includes(q))
      );
    });

  return (
    <FormModal
      open={open}
      onClose={onClose}
      title="Reorder Doctors & Specialists"
      subtitle="Drag and drop or use the controls to change the sequence shown on the website"
      maxWidth="max-w-3xl"
    >
      <div className="space-y-4">
        {/* Info banner & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-brandBlue/5 dark:bg-brandBlue/10 p-3 rounded-xl border border-brandBlue/10 dark:border-brandBlue/20">
          <div className="flex items-center gap-2 text-xs text-brandBlue dark:text-brandSky font-medium">
            <Info className="w-4 h-4 shrink-0" />
            <span>Doctors will appear on the website and team section in this exact sequence (Top = #1).</span>
          </div>

          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Find doctor..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-brandSky"
            />
          </div>
        </div>

        {/* Scrollable Doctors List */}
        <div className="max-h-[55vh] overflow-y-auto space-y-2 pr-1 select-none">
          {visibleDoctors.map(({ doc, globalIndex }) => {
            const isDragging = draggedIdx === globalIndex;
            const isDragOver = dragOverIdx === globalIndex;
            const isFirst = globalIndex === 0;
            const isLast = globalIndex === list.length - 1;

            return (
              <div
                key={doc.id || globalIndex}
                draggable
                onDragStart={(e) => handleDragStart(e, globalIndex)}
                onDragOver={(e) => handleDragOver(e, globalIndex)}
                onDrop={(e) => handleDrop(e, globalIndex)}
                onDragEnd={handleDragEnd}
                className={`flex items-center justify-between gap-3 p-2.5 rounded-xl border transition-all ${
                  isDragging
                    ? 'opacity-40 border-brandSky/60 bg-brandSky/10 scale-[0.99]'
                    : isDragOver
                    ? 'border-brandBlue dark:border-brandSky bg-brandBlue/10 dark:bg-brandBlue/20 ring-2 ring-brandSky/30 shadow-md'
                    : 'bg-white/70 dark:bg-slate-900/60 border-slate-200/70 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
                }`}
              >
                {/* Left: Drag Handle, Number, Photo & Info */}
                <div className="flex items-center gap-3 min-w-0">
                  <div 
                    className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                    title="Drag to reposition"
                  >
                    <GripVertical className="w-4 h-4" />
                  </div>

                  <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-brandBlue dark:text-brandSky font-extrabold text-xs flex items-center justify-center shrink-0 border border-slate-200/60 dark:border-slate-700/60">
                    #{globalIndex + 1}
                  </span>

                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shrink-0">
                    <img
                      src={doc.image || doc.fallbackImg}
                      alt={doc.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>

                  <div className="min-w-0 truncate">
                    <p className="font-bold text-xs text-slate-800 dark:text-white truncate">
                      {doc.name}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                      {doc.role || 'Specialist'}
                    </p>
                  </div>
                </div>

                {/* Right: Quick Position Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  {/* Jump position select */}
                  <select
                    value={globalIndex + 1}
                    onChange={(e) => moveItem(globalIndex, Number(e.target.value) - 1)}
                    className="text-[11px] font-bold py-1 px-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-700 outline-none cursor-pointer hover:border-brandSky"
                    title="Jump to position"
                  >
                    {list.map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Pos #{i + 1}
                      </option>
                    ))}
                  </select>

                  {/* Move to Top */}
                  <button
                    type="button"
                    onClick={() => moveToTop(globalIndex)}
                    disabled={isFirst}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-brandBlue hover:bg-brandBlue/5 disabled:opacity-25 disabled:pointer-events-none transition-colors cursor-pointer"
                    title="Move to top (#1)"
                  >
                    <ArrowUpToLine className="w-3.5 h-3.5" />
                  </button>

                  {/* Move Up */}
                  <button
                    type="button"
                    onClick={() => moveUp(globalIndex)}
                    disabled={isFirst}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-brandBlue hover:bg-brandBlue/5 disabled:opacity-25 disabled:pointer-events-none transition-colors cursor-pointer"
                    title="Move up one position"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>

                  {/* Move Down */}
                  <button
                    type="button"
                    onClick={() => moveDown(globalIndex)}
                    disabled={isLast}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-brandBlue hover:bg-brandBlue/5 disabled:opacity-25 disabled:pointer-events-none transition-colors cursor-pointer"
                    title="Move down one position"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {/* Move to Bottom */}
                  <button
                    type="button"
                    onClick={() => moveToBottom(globalIndex)}
                    disabled={isLast}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-brandBlue hover:bg-brandBlue/5 disabled:opacity-25 disabled:pointer-events-none transition-colors cursor-pointer"
                    title="Move to bottom"
                  >
                    <ArrowDownToLine className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Original
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-xl font-headline font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer border-none"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  Saved!
                </>
              ) : (
                'Save New Order'
              )}
            </button>
          </div>
        </div>
      </div>
    </FormModal>
  );
}
