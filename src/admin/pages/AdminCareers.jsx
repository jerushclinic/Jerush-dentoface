import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Mail, Phone, Calendar, Download, UserCheck, Briefcase } from 'lucide-react';
import DataTable from '../components/DataTable';
import CareerFormModal from '../components/CareerFormModal';
import { careerService } from '../../services/careerService';

export default function AdminCareers() {
  const [activeTab, setActiveTab] = useState('openings'); // 'openings' | 'applications'
  
  // Job Openings State
  const [careers, setCareers] = useState([]);
  const [loadingCareers, setLoadingCareers] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState(null);

  // Applications State
  const [applications, setApplications] = useState([]);
  const [loadingApps, setLoadingApps] = useState(false);

  const fetchCareers = (silent = false) => {
    if (!silent) setLoadingCareers(true);
    careerService.getCareers().then((data) => {
      setCareers(data || []);
      setLoadingCareers(false);
    }).catch(err => {
      console.error("Error loading careers:", err);
      setLoadingCareers(false);
    });
  };

  const fetchApplications = (silent = false) => {
    if (!silent) setLoadingApps(true);
    careerService.getApplications().then((data) => {
      setApplications(data || []);
      setLoadingApps(false);
    }).catch(err => {
      console.error("Error loading applications:", err);
      setLoadingApps(false);
    });
  };

  useEffect(() => {
    fetchCareers();
    fetchApplications();
  }, []);

  const handleAdd = () => {
    setEditingCareer(null);
    setModalOpen(true);
  };

  const handleEdit = (career) => {
    setEditingCareer(career);
    setModalOpen(true);
  };

  const handleDeleteCareer = async (career) => {
    if (confirm(`Delete position "${career.title}"?`)) {
      setCareers((prev) => prev.filter((c) => c.id !== career.id));
      try {
        await careerService.deleteCareer(career.id);
      } catch (e) {
        console.error("Error deleting career:", e);
      }
      fetchCareers(true);
    }
  };

  const handleDeleteApp = async (app) => {
    if (confirm(`Delete application from "${app.name}"?`)) {
      setApplications((prev) => prev.filter((a) => a.id !== app.id));
      try {
        await careerService.deleteApplication(app.id);
      } catch (e) {
        console.error("Error deleting app:", e);
      }
      fetchApplications(true);
    }
  };

  const handleSave = async (formData) => {
    try {
      if (editingCareer) {
        setCareers((prev) => prev.map((c) => c.id === editingCareer.id ? { ...c, ...formData } : c));
        await careerService.updateCareer(editingCareer.id, formData);
      } else {
        const tempItem = { ...formData, id: Date.now() };
        setCareers((prev) => [tempItem, ...prev]);
        await careerService.addCareer(formData);
      }
      fetchCareers(true);
    } catch (err) {
      console.error("Error saving career:", err);
      fetchCareers(true);
    }
  };

  // Job Openings Table Columns
  const openingColumns = [
    { 
      key: 'image', 
      label: 'Image', 
      render: (row) => (
        <div className="w-10 h-7 rounded overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
          {row.image ? (
            <img src={row.image} alt={row.title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-[8px] uppercase tracking-wider font-bold text-slate-400">None</span>
          )}
        </div>
      )
    },
    { key: 'title', label: 'Job Title', render: (row) => <span className="font-bold text-slate-800 dark:text-white">{row.title}</span> },
    { 
      key: 'department', 
      label: 'Department',
      render: (row) => (
        <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-brandBlue/5 dark:bg-brandBlue/10 text-brandBlue dark:text-brandSky border border-brandBlue/10 dark:border-brandBlue/20">
          {row.department}
        </span>
      )
    },
    { key: 'location', label: 'Location' },
    { key: 'type', label: 'Type', render: (row) => <span className="font-semibold text-slate-600 dark:text-slate-350">{row.type}</span> },
    { key: 'experience', label: 'Experience' },
  ];

  // Received Applications Table Columns
  const applicationColumns = [
    { 
      key: 'name', 
      label: 'Applicant Name', 
      render: (row) => (
        <div className="flex flex-col text-left">
          <span className="font-bold text-slate-900 dark:text-white text-xs">{row.name}</span>
          <span className="text-[10px] text-slate-400 font-semibold">{row.experience || 'No experience listed'}</span>
        </div>
      ) 
    },
    { 
      key: 'position', 
      label: 'Applied Position', 
      render: (row) => (
        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-brandSky/10 text-brandSky dark:bg-brandSky/20">
          {row.position || 'General Application'}
        </span>
      ) 
    },
    { 
      key: 'contact', 
      label: 'Contact Info', 
      render: (row) => (
        <div className="flex flex-col text-left text-[10px] space-y-0.5">
          <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-medium">
            <Mail className="w-3 h-3 text-brandSky" /> {row.email}
          </span>
          <span className="flex items-center gap-1 text-slate-500 font-medium">
            <Phone className="w-3 h-3 text-brandSky" /> {row.phone}
          </span>
        </div>
      ) 
    },
    { 
      key: 'resume', 
      label: 'Resume / CV', 
      render: (row) => (
        row.resumeData ? (
          <a 
            href={row.resumeData} 
            download={row.resumeName || 'Resume.pdf'} 
            className="inline-flex items-center gap-1 text-[10px] font-bold text-brandBlue dark:text-brandSky hover:underline bg-brandBlue/5 px-2.5 py-1 rounded-md"
          >
            <Download className="w-3 h-3" />
            {row.resumeName || 'Download CV'}
          </a>
        ) : (
          <span className="text-[10px] text-slate-400">{row.resumeName || 'No File'}</span>
        )
      ) 
    },
    { 
      key: 'submitted_at', 
      label: 'Submitted Date', 
      render: (row) => (
        <span className="text-[10px] text-slate-400 font-medium">
          {row.submitted_at ? new Date(row.submitted_at).toLocaleDateString() : 'Recent'}
        </span>
      ) 
    }
  ];

  return (
    <div className="space-y-6 relative z-10 text-left">
      
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline font-extrabold text-xl text-slate-800 dark:text-white">Careers Management</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-1">Manage job openings and view candidate job applications</p>
        </div>

        {activeTab === 'openings' && (
          <button 
            onClick={handleAdd} 
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-xl font-headline font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Position
          </button>
        )}
      </div>

      {/* Main Tab Bar Switcher */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setActiveTab('openings')}
          className={`px-5 py-3 text-xs font-headline font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === 'openings'
              ? 'border-brandSky text-brandSky'
              : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
          }`}
        >
          Job Openings ({careers.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('applications')}
          className={`px-5 py-3 text-xs font-headline font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'applications'
              ? 'border-brandSky text-brandSky'
              : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
          }`}
        >
          <span>Received Applications ({applications.length})</span>
          {applications.length > 0 && (
            <span className="w-2 h-2 rounded-full bg-brandSky animate-pulse" />
          )}
        </button>
      </div>

      {/* Tab 1: Job Openings Table */}
      {activeTab === 'openings' && (
        loadingCareers && careers.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-3 border-brandBlue border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <DataTable
            columns={openingColumns}
            data={careers}
            searchKeys={['title', 'department', 'location', 'type']}
            actions={(row) => (
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => handleEdit(row)} 
                  className="p-1.5 rounded-lg text-slate-400 hover:text-brandBlue hover:bg-brandBlue/5 transition-colors cursor-pointer"
                  title="Edit Position"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => handleDeleteCareer(row)} 
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Delete Position"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          />
        )
      )}

      {/* Tab 2: Received Applications Table */}
      {activeTab === 'applications' && (
        loadingApps && applications.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-3 border-brandBlue border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <DataTable
            columns={applicationColumns}
            data={applications}
            searchKeys={['name', 'email', 'phone', 'position']}
            actions={(row) => (
              <button 
                onClick={() => handleDeleteApp(row)} 
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                title="Delete Application"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          />
        )
      )}

      <CareerFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        career={editingCareer}
      />
    </div>
  );
}
