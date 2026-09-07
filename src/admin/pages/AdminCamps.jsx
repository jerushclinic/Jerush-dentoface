import React, { useState, useEffect } from 'react';
import {
  HeartHandshake, Plus, Search, Edit2, Trash2, CheckCircle2,
  Clock, MapPin, Users, Calendar, AlertCircle, X, Check, Eye,
  Building, Mail, Phone, Sparkles, Filter, ExternalLink
} from 'lucide-react';
import { campsService, CAMPS_UPDATE_EVENT } from '../../services/campsService';

export default function AdminCamps() {
  const [camps, setCamps] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('camps'); // 'camps' | 'inquiries'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCamp, setEditingCamp] = useState(null);
  const [formState, setFormState] = useState({
    title: '',
    tagline: '',
    category: 'dental',
    campType: 'Dental Camp',
    status: 'upcoming',
    date: '',
    time: '9:00 AM – 4:30 PM',
    location: '',
    targetBeneficiaries: 'General Public & Families',
    expectedBeneficiaries: '500+ Patients',
    leadDoctors: 'Dr. A. Bladbin, MDS, PhD & Dr. C. Binila Asir, MDS',
    teamSize: '6 Doctors, 4 Nurses, 3 Hygienists',
    coverImage: '/images/events/medical-camp/free-community-medical-camp-group-photo.webp',
    galleryImagesText: '/images/events/medical-camp/free-community-medical-camp-group-photo.webp\n/images/events/medical-camp/doctors-providing-health-consultation-medical-camp.webp',
    servicesProvidedText: 'Free Oral Cancer & Leukoplakia Screening\nDigital Intraoral Camera Caries Checkups\nFree Pediatric Fluoride Treatment\nEmergency Pain Relief Extractions\nComplimentary Toothbrush & Fluoride Paste Kit',
    description: '',
    organizer: 'Jerush Medical Foundation',
    contactNumber: '+91 94891 60055',
    capacity: 500
  });

  // Notification Toast
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadData = async () => {
    try {
      const [campsData, inqData] = await Promise.all([
        campsService.getCamps(),
        campsService.getInquiries()
      ]);
      setCamps(campsData);
      setInquiries(inqData);
    } catch (err) {
      console.error("Error loading admin camps:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener(CAMPS_UPDATE_EVENT, handleUpdate);
    return () => window.removeEventListener(CAMPS_UPDATE_EVENT, handleUpdate);
  }, []);

  const openCreateModal = () => {
    setEditingCamp(null);
    setFormState({
      title: '',
      tagline: '',
      category: 'dental',
      campType: 'Dental Camp',
      status: 'upcoming',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      time: '9:00 AM – 4:30 PM',
      location: '',
      targetBeneficiaries: 'General Public & Families',
      expectedBeneficiaries: '500+ Patients',
      leadDoctors: 'Dr. A. Bladbin, MDS, PhD & Dr. C. Binila Asir, MDS',
      teamSize: '6 Doctors, 4 Nurses',
      coverImage: '/images/events/medical-camp/free-community-medical-camp-group-photo.webp',
      galleryImagesText: '/images/events/medical-camp/free-community-medical-camp-group-photo.webp\n/images/events/medical-camp/doctors-providing-health-consultation-medical-camp.webp',
      servicesProvidedText: 'Free Oral Cancer Screening\nDigital Caries & Gum Diagnosis\nFree Fluoride Treatment for Kids\nTooth Extraction for Emergency Pain\nFree Dental Care Kit Distribution',
      description: '',
      organizer: 'Jerush Medical Foundation',
      contactNumber: '+91 94891 60055',
      capacity: 500
    });
    setIsModalOpen(true);
  };

  const openEditModal = (camp) => {
    setEditingCamp(camp);
    setFormState({
      title: camp.title || '',
      tagline: camp.tagline || '',
      category: camp.category || 'dental',
      campType: camp.campType || 'Dental Camp',
      status: camp.status || 'upcoming',
      date: camp.date || '',
      time: camp.time || '9:00 AM – 4:30 PM',
      location: camp.location || '',
      targetBeneficiaries: camp.targetBeneficiaries || '',
      expectedBeneficiaries: camp.expectedBeneficiaries || '500+ Patients',
      leadDoctors: camp.leadDoctors || '',
      teamSize: camp.teamSize || '',
      coverImage: camp.coverImage || '/images/events/medical-camp/free-community-medical-camp-group-photo.webp',
      galleryImagesText: (camp.galleryImages || [camp.coverImage]).filter(Boolean).join('\n'),
      servicesProvidedText: (camp.servicesProvided || []).join('\n'),
      description: camp.description || '',
      organizer: camp.organizer || 'Jerush Medical Foundation',
      contactNumber: camp.contactNumber || '+91 94891 60055',
      capacity: camp.capacity || 500
    });
    setIsModalOpen(true);
  };

  const handleSaveCamp = async (e) => {
    e.preventDefault();
    if (!formState.title || !formState.location) return;

    const servicesList = formState.servicesProvidedText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const galleryList = formState.galleryImagesText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const payload = {
      ...formState,
      servicesProvided: servicesList,
      galleryImages: galleryList.length > 0 ? galleryList : [formState.coverImage]
    };
    delete payload.servicesProvidedText;
    delete payload.galleryImagesText;

    try {
      if (editingCamp) {
        await campsService.updateCamp(editingCamp.id, payload);
        showToast('Camp updated successfully!');
      } else {
        await campsService.createCamp(payload);
        showToast('New outreach camp created and published!');
      }
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      console.error("Error saving camp:", err);
      showToast('Error saving camp.');
    }
  };

  const handleDeleteCamp = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await campsService.deleteCamp(id);
        showToast('Camp deleted.');
        loadData();
      } catch (err) {
        console.error("Error deleting camp:", err);
      }
    }
  };

  const handleInquiryStatusChange = async (inqId, newStatus) => {
    try {
      await campsService.updateInquiryStatus(inqId, newStatus);
      showToast(`Request status updated to ${newStatus}.`);
      loadData();
    } catch (err) {
      console.error("Error updating inquiry:", err);
    }
  };

  const handleDeleteInquiry = async (inqId) => {
    if (window.confirm('Delete this community request?')) {
      try {
        await campsService.deleteInquiry(inqId);
        showToast('Request deleted.');
        loadData();
      } catch (err) {
        console.error("Error deleting inquiry:", err);
      }
    }
  };

  // Filtered camps
  const filteredCamps = camps.filter((camp) => {
    const matchesSearch =
      camp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || camp.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 font-body text-left pb-16">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-brandSky/30 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-headline font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandBlue/10 dark:bg-brandBlue/20 text-brandBlue dark:text-brandSky text-[11px] font-bold uppercase tracking-wider mb-2 font-headline">
            <HeartHandshake className="w-3.5 h-3.5" />
            Social Outreach Control
          </div>
          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Camps
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
            Manage upcoming speciality health camps, photos, and outreach drives.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/camps"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brandSky text-slate-700 dark:text-slate-300 hover:text-brandBlue font-headline font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View Public Page
          </a>
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brandBlue to-brandSky text-white font-headline font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-md shadow-brandBlue/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add New Camp
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-headline">Total Camps</span>
          <div className="font-headline font-black text-2xl text-primary dark:text-white">{camps.length}</div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-500 font-headline">Upcoming / Active</span>
          <div className="font-headline font-black text-2xl text-emerald-600 dark:text-emerald-400">
            {camps.filter(c => c.status === 'upcoming').length}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Completed Outreaches</span>
          <div className="font-headline font-black text-2xl text-brandBlue dark:text-brandSky">
            {camps.filter(c => c.status === 'completed').length}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-500 font-headline">Community Requests</span>
          <div className="font-headline font-black text-2xl text-purple-600 dark:text-purple-400">{inquiries.length}</div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('camps')}
          className={`pb-3 font-headline font-bold text-sm tracking-wide transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === 'camps'
              ? 'border-brandBlue text-brandBlue dark:text-brandSky'
              : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Outreach Camps ({camps.length})
        </button>
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`pb-3 font-headline font-bold text-sm tracking-wide transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === 'inquiries'
              ? 'border-brandBlue text-brandBlue dark:text-brandSky'
              : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }`}
        >
          <Building className="w-4 h-4" />
          Community Requests ({inquiries.length})
        </button>
      </div>

      {/* Tab 1: Camps List */}
      {activeTab === 'camps' && (
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search camp by title or venue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-xl text-xs focus:outline-none focus:border-brandSky"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Camps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCamps.map((camp) => (
              <div
                key={camp.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/9] bg-slate-800 overflow-hidden">
                    <img
                      src={camp.coverImage}
                      alt={camp.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/images/events/medical-camp/jerush-medical-camp-group-photo.webp';
                      }}
                    />
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-headline font-extrabold uppercase tracking-wider ${
                        camp.status === 'upcoming'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-800/90 text-slate-200'
                      }`}
                    >
                      {camp.status}
                    </span>
                    <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold">
                      {camp.registeredCount || 0} Registered
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <span className="text-[10px] font-bold text-brandSky uppercase tracking-wider">
                        {camp.campType}
                      </span>
                      <h3 className="font-headline font-bold text-base text-slate-900 dark:text-white line-clamp-1">
                        {camp.title}
                      </h3>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-brandBlue shrink-0" />
                        <span>{camp.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-brandSky shrink-0" />
                        <span>{camp.time}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{camp.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    Target: {camp.expectedBeneficiaries}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(camp)}
                      className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-brandBlue hover:bg-white dark:hover:bg-slate-700 transition-colors"
                      title="Edit Camp"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCamp(camp.id, camp.title)}
                      className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Delete Camp"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Community Requests */}
      {activeTab === 'inquiries' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <div>
              <h3 className="font-headline font-bold text-base text-slate-900 dark:text-white">
                Host Camp Submissions
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">
                Requests submitted by schools, NGOs, and community leaders from the public portal.
              </p>
            </div>
            <span className="px-3 py-1 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 text-xs font-bold rounded-full font-headline">
              {inquiries.length} Requests
            </span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {inquiries.map((inq) => (
              <div key={inq.id} className="p-5 space-y-3 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brandSky font-headline">
                      {inq.campType}
                    </span>
                    <h4 className="font-headline font-bold text-base text-slate-900 dark:text-white">
                      {inq.organizationName}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Contact: <span className="font-semibold text-slate-800 dark:text-slate-200">{inq.contactPerson}</span> ({inq.designation || 'Organizer'}) • {inq.phone} • {inq.email}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-headline font-extrabold uppercase tracking-wider ${
                        inq.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                          : inq.status === 'declined'
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
                      }`}
                    >
                      {inq.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Preferred Date:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{inq.preferredDate || 'Flexible'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Location:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{inq.location}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Expected Attendance:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{inq.expectedCount}</span>
                  </div>
                </div>

                {inq.notes && (
                  <p className="text-xs text-slate-500 italic bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                    "{inq.notes}"
                  </p>
                )}

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] text-slate-400">
                    Submitted: {new Date(inq.submittedAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleInquiryStatusChange(inq.id, 'approved')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-headline font-bold text-[11px] uppercase tracking-wider hover:bg-emerald-700 transition-colors"
                    >
                      Approve Camp
                    </button>
                    <button
                      onClick={() => handleInquiryStatusChange(inq.id, 'declined')}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-500 text-[11px] font-bold"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => handleDeleteInquiry(inq.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── Create / Edit Camp Modal ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="font-headline font-black text-xl text-slate-900 dark:text-white">
                {editingCamp ? 'Edit Outreach Camp' : 'Create New Outreach Camp'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCamp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 font-headline">
                  Camp Title *
                </label>
                <input
                  type="text"
                  required
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  placeholder="e.g. Mega Free Dental Screening Camp — Thuckalay"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-brandSky"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 font-headline">
                  Tagline / Objective
                </label>
                <input
                  type="text"
                  value={formState.tagline}
                  onChange={(e) => setFormState({ ...formState, tagline: e.target.value })}
                  placeholder="e.g. Free Specialist Oral Diagnosis & Hygiene Kits for All"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-brandSky"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 font-headline">
                    Speciality Category
                  </label>
                  <select
                    value={formState.category}
                    onChange={(e) => {
                      const val = e.target.value;
                      let typeLabel = 'Dental Camp';
                      if (val === 'aligner') typeLabel = 'Aligner Camp';
                      if (val === 'skin') typeLabel = 'Skin Camp';
                      if (val === 'hair') typeLabel = 'Hair Camp';
                      if (val === 'fat-reduction') typeLabel = 'Body Fat Reduction Camp';
                      if (val === 'social') typeLabel = 'Social & Rural Outreach';
                      setFormState({ ...formState, category: val, campType: typeLabel });
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none"
                  >
                    <option value="dental">Dental Camp</option>
                    <option value="aligner">Aligner Camp</option>
                    <option value="skin">Skin & Laser Camp</option>
                    <option value="hair">Hair & Scalp Camp</option>
                    <option value="fat-reduction">Body Fat Reduction Camp</option>
                    <option value="social">Social & Rural Outreach</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 font-headline">
                    Status
                  </label>
                  <select
                    value={formState.status}
                    onChange={(e) => setFormState({ ...formState, status: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none"
                  >
                    <option value="upcoming">Upcoming (Registration Open)</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed (Impact Archive)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 font-headline">
                    Capacity (Passes)
                  </label>
                  <input
                    type="number"
                    value={formState.capacity}
                    onChange={(e) => setFormState({ ...formState, capacity: parseInt(e.target.value) || 500 })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 font-headline">
                    Date *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. October 15, 2026"
                    value={formState.date}
                    onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 font-headline">
                    Time *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 9:00 AM – 4:00 PM"
                    value={formState.time}
                    onChange={(e) => setFormState({ ...formState, time: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 font-headline">
                  Venue / Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jerush Community Auditorium, Thuckalay"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 font-headline">
                    Lead Doctors
                  </label>
                  <input
                    type="text"
                    value={formState.leadDoctors}
                    onChange={(e) => setFormState({ ...formState, leadDoctors: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 font-headline">
                    Target Beneficiaries
                  </label>
                  <input
                    type="text"
                    value={formState.targetBeneficiaries}
                    onChange={(e) => setFormState({ ...formState, targetBeneficiaries: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 font-headline">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  value={formState.coverImage}
                  onChange={(e) => setFormState({ ...formState, coverImage: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 font-headline">
                  Photo Gallery URLs (One image URL per line for the Camp Lightbox)
                </label>
                <textarea
                  rows={3}
                  value={formState.galleryImagesText}
                  onChange={(e) => setFormState({ ...formState, galleryImagesText: e.target.value })}
                  placeholder="/images/events/medical-camp/photo1.webp&#10;/images/events/medical-camp/photo2.webp"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none font-mono text-xs"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 font-headline">
                  Free Services Provided (One per line)
                </label>
                <textarea
                  rows={4}
                  value={formState.servicesProvidedText}
                  onChange={(e) => setFormState({ ...formState, servicesProvidedText: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none font-mono text-xs"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-headline font-bold text-xs uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-brandBlue to-brandSky text-white font-headline font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-md transition-all cursor-pointer"
                >
                  {editingCamp ? 'Save Changes' : 'Create & Publish Camp'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
