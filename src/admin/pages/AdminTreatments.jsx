import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Smile, Sparkles, Flame, Heart, Activity, Stethoscope } from 'lucide-react';
import DataTable from '../components/DataTable';
import TreatmentFormModal from '../components/TreatmentFormModal';
import { treatmentService } from '../../services/treatmentService';
import { motion } from 'framer-motion';

const CATEGORY_TABS = ['all', 'dental', 'cosmetic', 'hair', 'body'];

const CATEGORY_COLORS = {
  dental: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/40',
  cosmetic: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900/40',
  hair: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/40',
  body: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/40',
};

export default function AdminTreatments() {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const fetchTreatments = (showSpinner = false) => {
    if (showSpinner) setLoading(true);
    treatmentService.getTreatments()
      .then((data) => {
        setTreatments(data || []);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTreatments(true);
  }, []);

  const filtered = activeTab === 'all' 
    ? treatments 
    : treatments.filter((t) => t.category === activeTab);

  const handleSave = async (formData) => {
    try {
      if (editingItem) {
        setTreatments((prev) =>
          prev.map((t) => String(t.id).toLowerCase() === String(editingItem.id).toLowerCase() ? { ...t, ...formData } : t)
        );
        await treatmentService.updateTreatment(editingItem.id, formData);
      } else {
        const slug = formData.id || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const newTreatment = { ...formData, id: slug };
        setTreatments((prev) => [newTreatment, ...prev.filter(t => t.id !== slug)]);
        await treatmentService.addTreatment(formData);
      }
    } catch (err) {
      console.error("Save treatment error:", err);
    }
    fetchTreatments(false);
  };

  const handleDelete = async (item) => {
    if (confirm(`Delete "${item.title}"?`)) {
      setTreatments((prev) => prev.filter((t) => String(t.id).toLowerCase() !== String(item.id).toLowerCase()));
      try {
        await treatmentService.deleteTreatment(item.id);
      } catch (err) {
        console.error("Delete treatment error:", err);
      }
      fetchTreatments(false);
    }
  };

  const columns = [
    {
      key: 'image',
      label: 'Image',
      sortable: false,
      width: '70px',
      render: (row) => (
        <div className="w-12 h-9 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 shadow-sm">
          {row.image ? (
            <img 
              src={row.image} 
              alt={row.title} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }} 
            />
          ) : (
            <span className="text-[9px] font-bold text-slate-400">NO IMG</span>
          )}
        </div>
      )
    },
    {
      key: 'title',
      label: 'Treatment Title',
      render: (row) => (
        <div className="flex flex-col text-left max-w-[240px]">
          <span className="font-headline font-bold text-slate-800 dark:text-white text-sm leading-tight">{row.title}</span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium truncate mt-0.5">{row.id}</span>
        </div>
      )
    },
    {
      key: 'category',
      label: 'Category',
      render: (row) => (
        <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-lg border ${CATEGORY_COLORS[row.category] || 'bg-slate-100 text-slate-500 border-slate-200'}`}>
          {row.category === 'hair' ? 'Hair' : row.category === 'body' ? 'Body' : row.category}
        </span>
      )
    },
    {
      key: 'iconName',
      label: 'Icon',
      render: (row) => (
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-800">
          {row.iconName || 'Smile'}
        </span>
      )
    },
    {
      key: 'desc',
      label: 'Patient Summary',
      render: (row) => (
        <span className="line-clamp-1 max-w-[260px] text-slate-600 dark:text-slate-400 text-xs font-body">
          {row.desc}
        </span>
      )
    },
  ];

  const counts = {
    all: treatments.length,
    dental: treatments.filter(t => t.category === 'dental').length,
    cosmetic: treatments.filter(t => t.category === 'cosmetic').length,
    hair: treatments.filter(t => t.category === 'hair').length,
    body: treatments.filter(t => t.category === 'body').length,
  };

  if (loading && treatments.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-3 border-brandBlue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative z-10 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline font-extrabold text-xl text-slate-800 dark:text-white">Treatments Management</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-1">Manage clinical services across Dental, Cosmetic, Hair, and Body categories</p>
        </div>
        <button
          onClick={() => { setEditingItem(null); setModalOpen(true); }}
          className="inline-flex items-center gap-2 px-4.5 py-2.5 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-xl font-headline font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer border-none"
        >
          <Plus className="w-4 h-4" />
          Add Treatment
        </button>
      </div>

      {/* Summary KPI Cards - Clickable Filters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          type="button"
          onClick={() => setActiveTab(activeTab === 'dental' ? 'all' : 'dental')}
          className={`text-left bg-white/70 dark:bg-slate-900/70 border rounded-2xl p-4 flex items-center gap-3.5 shadow-sm transition-all cursor-pointer ${
            activeTab === 'dental'
              ? 'border-brandBlue ring-2 ring-brandBlue/20 bg-brandBlue/5 dark:bg-brandBlue/10'
              : 'border-slate-200/80 dark:border-slate-800 hover:border-brandSky/50'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-brandBlue dark:text-blue-400 flex items-center justify-center shrink-0">
            <Smile className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dental Care</p>
            <p className="font-headline font-black text-xl text-slate-800 dark:text-white">{counts.dental}</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab(activeTab === 'cosmetic' ? 'all' : 'cosmetic')}
          className={`text-left bg-white/70 dark:bg-slate-900/70 border rounded-2xl p-4 flex items-center gap-3.5 shadow-sm transition-all cursor-pointer ${
            activeTab === 'cosmetic'
              ? 'border-purple-500 ring-2 ring-purple-500/20 bg-purple-500/5 dark:bg-purple-500/10'
              : 'border-slate-200/80 dark:border-slate-800 hover:border-purple-400/50'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Skin & Laser</p>
            <p className="font-headline font-black text-xl text-slate-800 dark:text-white">{counts.cosmetic}</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab(activeTab === 'hair' ? 'all' : 'hair')}
          className={`text-left bg-white/70 dark:bg-slate-900/70 border rounded-2xl p-4 flex items-center gap-3.5 shadow-sm transition-all cursor-pointer ${
            activeTab === 'hair'
              ? 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-500/5 dark:bg-amber-500/10'
              : 'border-slate-200/80 dark:border-slate-800 hover:border-amber-400/50'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hair Restoration</p>
            <p className="font-headline font-black text-xl text-slate-800 dark:text-white">{counts.hair}</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab(activeTab === 'body' ? 'all' : 'body')}
          className={`text-left bg-white/70 dark:bg-slate-900/70 border rounded-2xl p-4 flex items-center gap-3.5 shadow-sm transition-all cursor-pointer ${
            activeTab === 'body'
              ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-500/10'
              : 'border-slate-200/80 dark:border-slate-800 hover:border-emerald-400/50'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Body Contouring</p>
            <p className="font-headline font-black text-xl text-slate-800 dark:text-white">{counts.body}</p>
          </div>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 relative">
        {CATEGORY_TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-2 rounded-xl text-xs font-headline font-bold uppercase tracking-wider transition-all duration-200 overflow-hidden cursor-pointer ${
                isActive
                  ? 'text-white border border-transparent'
                  : 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-900 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-gradient-to-r from-brandBlue to-brandSky rounded-xl shadow-md z-0"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">
                {tab === 'all'
                  ? `All Treatments (${counts.all})`
                  : `${tab.charAt(0).toUpperCase() + tab.slice(1)} (${counts[tab]})`}
              </span>
            </button>
          );
        })}
      </div>

      {/* Treatments Table */}
      <DataTable
        columns={columns}
        data={filtered}
        searchKeys={['title', 'category', 'desc', 'id']}
        actions={(row) => (
          <div className="flex items-center gap-1">
            <button 
              onClick={() => { setEditingItem(row); setModalOpen(true); }} 
              className="p-1.5 rounded-lg text-slate-400 hover:text-brandBlue hover:bg-brandBlue/5 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Edit Treatment"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => handleDelete(row)} 
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
              title="Delete Treatment"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      />

      <TreatmentFormModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onSave={handleSave} 
        treatment={editingItem} 
      />
    </div>
  );
}
