import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import DataTable from '../components/DataTable';
import DoctorFormModal from '../components/DoctorFormModal';
import DoctorReorderModal from '../components/DoctorReorderModal';
import { doctorService } from '../../services/doctorService';

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [reorderModalOpen, setReorderModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);

  const fetchDoctors = (showSpinner = false) => {
    if (showSpinner) setLoading(true);
    doctorService.getDoctors()
      .then((data) => {
        setDoctors(data || []);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDoctors(true);
  }, []);

  const handleAdd = () => {
    setEditingDoctor({
      sort_order: doctors.length + 1
    });
    setModalOpen(true);
  };

  const handleEdit = (doc) => {
    const globalIdx = doctors.findIndex((d) => String(d.id) === String(doc.id));
    setEditingDoctor({
      ...doc,
      sort_order: doc.sort_order !== undefined && doc.sort_order !== null ? doc.sort_order : (globalIdx + 1)
    });
    setModalOpen(true);
  };

  const handleDelete = async (doc) => {
    if (confirm(`Delete ${doc.name}?`)) {
      setDoctors((prev) => prev.filter((d) => String(d.id) !== String(doc.id)));
      try {
        await doctorService.deleteDoctor(doc.id);
      } catch (err) {
        console.error("Delete doctor error:", err);
      }
      fetchDoctors(false);
    }
  };

  const handleSave = async (formData) => {
    try {
      if (editingDoctor && editingDoctor.id) {
        await doctorService.updateDoctor(editingDoctor.id, formData);
      } else {
        await doctorService.addDoctor(formData);
      }
    } catch (err) {
      console.error("Save doctor error:", err);
    }
    fetchDoctors(false);
  };

  const handleMove = async (docId, delta) => {
    const idx = doctors.findIndex((d) => String(d.id) === String(docId));
    if (idx === -1) return;
    const targetIdx = idx + delta;
    if (targetIdx < 0 || targetIdx >= doctors.length) return;

    const newDocs = [...doctors];
    const [moved] = newDocs.splice(idx, 1);
    newDocs.splice(targetIdx, 0, moved);

    const updated = newDocs.map((d, i) => ({ ...d, sort_order: i + 1 }));
    setDoctors(updated);
    await doctorService.reorderDoctors(updated);
  };

  const handleSaveOrder = async (reorderedList) => {
    const updated = reorderedList.map((d, i) => ({ ...d, sort_order: i + 1 }));
    setDoctors(updated);
    await doctorService.reorderDoctors(updated);
  };

  const columns = [
    {
      key: 'sort_order',
      label: 'Position',
      sortable: true,
      width: '95px',
      render: (row) => {
        const globalIdx = doctors.findIndex((d) => String(d.id) === String(row.id));
        const isFirst = globalIdx === 0;
        const isLast = globalIdx === doctors.length - 1;
        const pos = globalIdx !== -1 ? globalIdx + 1 : (row.sort_order || 1);

        return (
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <span 
              className="w-7 h-7 rounded-lg bg-brandBlue/10 dark:bg-brandBlue/20 text-brandBlue dark:text-brandSky font-extrabold text-xs flex items-center justify-center shrink-0 border border-brandBlue/20"
              title={`Display Position #${pos}`}
            >
              #{pos}
            </span>
            <div className="flex flex-col -space-y-0.5">
              <button
                type="button"
                onClick={() => handleMove(row.id, -1)}
                disabled={isFirst}
                className="p-0.5 rounded text-slate-400 hover:text-brandBlue hover:bg-brandBlue/10 dark:hover:bg-slate-800 disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer"
                title={`Move ${row.name} up`}
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleMove(row.id, 1)}
                disabled={isLast}
                className="p-0.5 rounded text-slate-400 hover:text-brandBlue hover:bg-brandBlue/10 dark:hover:bg-slate-800 disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer"
                title={`Move ${row.name} down`}
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );
      }
    },
    {
      key: 'image',
      label: 'Photo',
      sortable: false,
      width: '60px',
      render: (row) => (
        <div className="w-9 h-9 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shrink-0">
          <img
            src={row.image || row.fallbackImg}
            alt={row.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
      )
    },
    { key: 'name', label: 'Name', render: (row) => <span className="font-bold text-slate-800 dark:text-white">{row.name}</span> },
    { key: 'role', label: 'Role' },
    { key: 'experience', label: 'Experience' },
    {
      key: 'specialties',
      label: 'Specialties',
      sortable: false,
      render: (row) => (
        <div className="flex flex-wrap gap-1">
          {(row.specialties || []).slice(0, 2).map((s) => (
            <span key={s} className="text-[9px] font-bold bg-brandBlue/5 text-brandBlue px-2 py-0.5 rounded-md">{s}</span>
          ))}
          {(row.specialties || []).length > 2 && (
            <span className="text-[9px] font-bold text-slate-400">+{row.specialties.length - 2}</span>
          )}
        </div>
      )
    },
  ];

  if (loading && doctors.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-3 border-brandBlue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative z-10 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-headline font-extrabold text-xl text-slate-800 dark:text-white">Doctors</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-1">
            Manage your medical team profiles and display sequence ({doctors.length} doctors)
          </p>
        </div>
        
        <div className="flex items-center gap-2.5">
          <button 
            type="button"
            onClick={() => setReorderModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white/70 dark:bg-slate-900/70 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-200 rounded-xl font-headline font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
            title="Reorder all doctors sequence"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-brandBlue dark:text-brandSky" />
            Reorder Doctors
          </button>

          <button 
            type="button"
            onClick={handleAdd} 
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-xl font-headline font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer border-none"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Doctor
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={doctors}
        searchKeys={['name', 'role', 'specialties']}
        actions={(row) => (
          <div className="flex items-center gap-1">
            <button 
              type="button"
              onClick={() => handleEdit(row)} 
              className="p-1.5 rounded-lg text-slate-400 hover:text-brandBlue hover:bg-brandBlue/5 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Edit Doctor"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button 
              type="button"
              onClick={() => handleDelete(row)} 
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
              title="Delete Doctor"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      />

      <DoctorFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        doctor={editingDoctor}
      />

      <DoctorReorderModal
        open={reorderModalOpen}
        onClose={() => setReorderModalOpen(false)}
        doctors={doctors}
        onSaveOrder={handleSaveOrder}
      />
    </div>
  );
}
