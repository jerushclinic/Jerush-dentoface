import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Image as ImageIcon, Calendar, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import EventFormModal from '../components/EventFormModal';
import { galleryService } from '../../services/galleryService';

const INITIAL_GALLERY = [
  { id: 1, url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600', caption: 'State-of-the-art Dental Suite', category: 'clinic', type: 'photo' },
  { id: 2, url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600', caption: 'Clear Aligner Fitting', category: 'treatment', type: 'photo' },
  { id: 3, url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600', caption: 'Laser Skin Resurfacing', category: 'treatment', type: 'photo' },
  { id: 4, url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600', caption: 'Hair Restoration Lab', category: 'clinic', type: 'photo' },
  { id: 5, url: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=600', caption: 'Patient Consultation', category: 'clinic', type: 'photo' },
  { id: 6, url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=600', caption: 'Before & After Smile Makeover', category: 'before-after', type: 'photo' },
];

const CATEGORY_TABS = ['all', 'clinic', 'treatment', 'before-after'];

export default function AdminGallery() {
  // Main modes: 'events' (Jerush Events) or 'general' (General categories)
  const [mainTab, setMainTab] = useState('events');

  // General Gallery states
  const [generalItems, setGeneralItems] = useState(() => {
    const local = localStorage.getItem('jerush_general_gallery');
    return local ? JSON.parse(local) : INITIAL_GALLERY;
  });
  const [activeGeneralTab, setActiveGeneralTab] = useState('all');
  const [generalModalOpen, setGeneralModalOpen] = useState(false);
  const [newGeneralItem, setNewGeneralItem] = useState({ url: '', caption: '', category: 'clinic', type: 'photo' });

  // Jerush Events states
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Fetch Events
  const fetchEvents = (silent = false) => {
    if (!silent) setLoadingEvents(true);
    galleryService.getEvents()
      .then(data => {
        setEvents(data || []);
        setLoadingEvents(false);
      })
      .catch(err => {
        console.error("Error loading events in admin:", err);
        setLoadingEvents(false);
      });
  };

  useEffect(() => {
    if (mainTab === 'events') {
      fetchEvents();
    }
  }, [mainTab]);

  // Persist general gallery changes
  useEffect(() => {
    try {
      localStorage.setItem('jerush_general_gallery', JSON.stringify(generalItems));
    } catch (e) {
      console.warn("Failed to persist general gallery to localStorage:", e);
    }
  }, [generalItems]);

  // General Gallery CRUD Handlers
  const handleAddGeneral = (e) => {
    e.preventDefault();
    if (!newGeneralItem.url) return;
    const id = Math.max(0, ...generalItems.map((i) => i.id)) + 1;
    setGeneralItems((prev) => [...prev, { ...newGeneralItem, id }]);
    setNewGeneralItem({ url: '', caption: '', category: 'clinic', type: 'photo' });
    setGeneralModalOpen(false);
  };

  const handleDeleteGeneral = (item) => {
    if (confirm(`Delete "${item.caption || 'this image'}" from general gallery?`)) {
      setGeneralItems((prev) => prev.filter((i) => i.id !== item.id));
    }
  };

  // Event CRUD Handlers
  const handleDeleteEvent = (eventItem) => {
    if (confirm(`Are you sure you want to delete the event album "${eventItem.title}" and all its photos?`)) {
      setEvents((prev) => prev.filter((ev) => ev.id !== eventItem.id));
      galleryService.deleteEvent(eventItem.id)
        .then(() => {
          fetchEvents(true);
        })
        .catch(err => {
          alert("Failed to delete event: " + err.message);
          fetchEvents(true);
        });
    }
  };

  const filteredGeneral = activeGeneralTab === 'all' 
    ? generalItems 
    : generalItems.filter((i) => i.category === activeGeneralTab);

  // Event Status Toggle Handler (Instant 1-click Draft / Published)
  const handleToggleStatus = (row) => {
    const newStatus = row.status === 'published' || !row.status ? 'draft' : 'published';
    setEvents(prev => prev.map(item => item.id === row.id ? { ...item, status: newStatus } : item));
    galleryService.updateEvent(row.id, { ...row, status: newStatus }).catch(err => {
      console.error("Failed to toggle status:", err);
      fetchEvents(true);
    });
  };

  const inputCls = "w-full px-4 py-2.5 bg-white/40 dark:bg-slate-950/40 border border-white/50 dark:border-slate-800/80 rounded-xl text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-brandSky focus:bg-white/70 dark:focus:bg-slate-950/60 transition-all shadow-sm";
  const labelCls = "text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block";

  const eventColumns = [
    {
      key: 'cover_image', label: 'Cover Image', sortable: false, width: '70px',
      render: (row) => (
        <div className="w-12 h-8 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
          {row.cover_image ? (
            <img src={row.cover_image} alt={row.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-slate-200 dark:bg-slate-900 flex items-center justify-center text-[8px] font-bold text-slate-400">
              NO IMG
            </div>
          )}
        </div>
      )
    },
    {
      key: 'title', label: 'Event Album Title', render: (row) => (
        <div className="flex flex-col text-left max-w-[280px]">
          <span className="font-bold text-slate-800 dark:text-white line-clamp-1">{row.title}</span>
          <span className="text-[10px] text-slate-400 font-semibold line-clamp-2 mt-0.5 leading-snug">{row.description || 'No description'}</span>
        </div>
      )
    },
    {
      key: 'event_date', label: 'Event Date', render: (row) => (
        <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold">{row.event_date}</span>
      )
    },
    {
      key: 'photo_count', label: 'Photos count', render: (row) => (
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brandSky/10 text-brandSky dark:bg-brandSky/20">
          {row.photo_count || (row.photos ? row.photos.length : 0)} Photos
        </span>
      )
    },
    {
      key: 'status', label: 'Status', render: (row) => {
        const isPublished = row.status === 'published' || !row.status;
        return (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleToggleStatus(row); }}
            className={`inline-flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
              isPublished 
                ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400' 
                : 'bg-amber-500/10 text-amber-600 border-amber-500/30 hover:bg-amber-500/20 dark:bg-amber-500/20 dark:text-amber-400'
            }`}
            title="Click to toggle Published / Draft"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isPublished ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            {isPublished ? 'PUBLISHED' : 'DRAFT'}
          </button>
        );
      }
    }
  ];

  return (
    <div className="space-y-6 relative z-10 text-left">
      
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline font-extrabold text-xl text-slate-800 dark:text-white">Gallery & Events</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-1">
            Manage Jerush Event albums and general clinical/treatment showcase photos
          </p>
        </div>
        {mainTab === 'events' ? (
          <button 
            onClick={() => { setEditingEvent(null); setEventModalOpen(true); }}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-xl font-headline font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer border-none"
          >
            <Plus className="w-3.5 h-3.5" /> Create Event Album
          </button>
        ) : (
          <button 
            onClick={() => setGeneralModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-xl font-headline font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer border-none"
          >
            <Plus className="w-3.5 h-3.5" /> Add Showcase Photo
          </button>
        )}
      </div>

      {/* Main Switcher Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800/80 pb-3">
        <button
          onClick={() => setMainTab('events')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            mainTab === 'events'
              ? 'bg-brandSky/10 text-brandSky dark:bg-brandSky/20'
              : 'text-slate-450 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Jerush Events
        </button>
        <button
          onClick={() => setMainTab('general')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            mainTab === 'general'
              ? 'bg-brandSky/10 text-brandSky dark:bg-brandSky/20'
              : 'text-slate-455 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'
          }`}
        >
          <Layers className="w-4 h-4" />
          General Showcase
        </button>
      </div>

      {/* SECTION 1: JERUSH EVENTS */}
      {mainTab === 'events' && (
        <div className="space-y-6">
          {loadingEvents && events.length === 0 ? (
            <div className="flex items-center justify-center h-48">
              <div className="w-8 h-8 border-3 border-brandSky border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <DataTable
              columns={eventColumns}
              data={events}
              searchKeys={['title', 'event_date', 'description']}
              actions={(row) => (
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => { setEditingEvent(row); setEventModalOpen(true); }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-brandBlue hover:bg-brandBlue/5 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Edit Album Details & Photos"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => handleDeleteEvent(row)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
                    title="Delete Album"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            />
          )}
        </div>
      )}

      {/* SECTION 2: GENERAL SHOWCASE */}
      {mainTab === 'general' && (
        <div className="space-y-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 relative">
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeGeneralTab === tab;
              const label = tab === 'all'
                ? `All (${generalItems.length})`
                : `${tab.replace('-', '/')} (${generalItems.filter(i => i.category === tab).length})`;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveGeneralTab(tab)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-headline font-bold uppercase tracking-wider transition-colors duration-200 overflow-hidden cursor-pointer ${
                    isActive
                      ? 'text-white border border-transparent'
                      : 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-800/80 text-slate-500 dark:text-slate-400 hover:bg-white/80 dark:hover:bg-slate-900/80 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="galleryTabPill"
                      className="absolute inset-0 bg-gradient-to-r from-brandBlue to-brandSky rounded-xl shadow-md z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredGeneral.map((item) => (
              <div key={item.id} className="group relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/50 dark:border-slate-800/80 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-brandBlue/5 transition-all duration-300">
                <div className="aspect-square overflow-hidden bg-slate-100 dark:bg-slate-950">
                  <img src={item.url} alt={item.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-3">
                  <p className="text-xs font-bold text-slate-800 dark:text-white line-clamp-1">{item.caption || 'Untitled'}</p>
                  <span className="text-[9px] font-bold text-brandSky dark:text-brandSky/80 uppercase tracking-wider">{item.category}</span>
                </div>
                {/* Delete button overlay */}
                <button
                  onClick={() => handleDeleteGeneral(item)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-white/50 dark:border-slate-800/80 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-sm cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {filteredGeneral.length === 0 && (
              <div className="col-span-full py-16 text-center bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/50 dark:border-slate-800/80 rounded-2xl">
                <ImageIcon className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <p className="text-sm text-slate-400 dark:text-slate-505 font-medium">No images in this category</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add General Image Modal */}
      <FormModal open={generalModalOpen} onClose={() => setGeneralModalOpen(false)} title="Add Gallery Image" subtitle="Provide the image URL and metadata" maxWidth="max-w-lg">
        <form onSubmit={handleAddGeneral} className="space-y-4">
          <div>
            <label className={labelCls}>Image URL</label>
            <input value={newGeneralItem.url} onChange={(e) => setNewGeneralItem({ ...newGeneralItem, url: e.target.value })} placeholder="https://..." required className={inputCls} />
          </div>
          {newGeneralItem.url && (
            <div className="aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-white/30 dark:border-slate-800/80">
              <img src={newGeneralItem.url} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
            </div>
          )}
          <div>
            <label className={labelCls}>Caption</label>
            <input value={newGeneralItem.caption} onChange={(e) => setNewGeneralItem({ ...newGeneralItem, caption: e.target.value })} placeholder="Describe the image" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Category</label>
            <select value={newGeneralItem.category} onChange={(e) => setNewGeneralItem({ ...newGeneralItem, category: e.target.value })} className={inputCls}>
              <option value="clinic">Clinic</option>
              <option value="treatment">Treatment</option>
              <option value="before-after">Before / After</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-white/20 dark:border-slate-800/60">
            <button type="button" onClick={() => setGeneralModalOpen(false)} className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">Cancel</button>
            <button type="submit" className="px-5 py-2.5 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-xl font-headline font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer">Add to Gallery</button>
          </div>
        </form>
      </FormModal>

      {/* Add/Edit Event Album Modal */}
      <EventFormModal
        open={eventModalOpen}
        onClose={() => setEventModalOpen(false)}
        onSave={() => fetchEvents(true)}
        event={editingEvent}
      />
      
    </div>
  );
}
