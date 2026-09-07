import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Camera, Maximize2, ArrowRight, ChevronLeft, ChevronRight,
  Image as ImageIcon, Search, Layers, Sparkles, Filter, CheckCircle2
} from 'lucide-react';
import { galleryService } from '../services/galleryService';

// Helper function for SEO-friendly image alt tags derived from descriptive filenames or title
const getSeoAltText = (imageUrl, eventTitle, index = 0) => {
  const displayName = getImageDisplayName(imageUrl, index, eventTitle);
  return `${displayName} - Jerush Dentofacial`;
};

// Helper function to derive clean human-readable image names from filename, title, or index
const getImageDisplayName = (photo, index = 0, eventTitle = '') => {
  if (!photo) return '';
  if (typeof photo === 'object') {
    if (photo.name && !photo.name.startsWith('event_photo') && !photo.name.startsWith('photo_')) return photo.name;
    if (photo.title && !photo.title.startsWith('event_photo') && !photo.title.startsWith('photo_')) return photo.title;
  }

  const url = typeof photo === 'object' ? (photo.image_url || photo.url || '') : String(photo);
  if (url) {
    let filename = url.split('/').pop()?.split('.')[0] || '';
    if (filename && !filename.startsWith('data:')) {
      // Strip timestamp suffix if present (e.g. _1786359684 or _1786359684_920)
      filename = filename.replace(/_\d{8,}(_\d+)?$/g, '');

      if (filename && !filename.startsWith('photo') && !filename.startsWith('event_photo')) {
        const readable = filename.replace(/[-_]/g, ' ').trim().replace(/\b\w/g, l => l.toUpperCase());
        if (readable.length > 1) {
          return readable;
        }
      }
    }
  }

  if (eventTitle) {
    return `${eventTitle} - Photo ${index + 1}`;
  }
  return `Jerush Event Photo ${index + 1}`;
};

// Smooth Image Loader component supporting both portrait and landscape aspect ratios neatly
function EventImage({ src, alt, className, aspect: initialAspect, ...props }) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [aspect, setAspect] = useState(initialAspect || 'landscape');

  useEffect(() => {
    setCurrentSrc(src);
    setError(false);
    setLoaded(false);
  }, [src]);

  const handleImageLoad = (e) => {
    setLoaded(true);
    if (e.target.naturalHeight > e.target.naturalWidth * 1.1) {
      setAspect('portrait');
    } else {
      setAspect('landscape');
    }
  };

  const handleImageError = () => {
    setError(true);
  };

  const isMissingSrc = !currentSrc || typeof currentSrc !== 'string' || currentSrc.trim() === '';

  if (error || isMissingSrc) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800/60 flex flex-col items-center justify-center p-8 text-center min-h-[220px] group ${className || ''}`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brandSky/10 via-transparent to-transparent pointer-events-none" />
        <div className="w-14 h-14 rounded-2xl bg-slate-850/90 border border-slate-700/60 flex items-center justify-center text-brandSky shadow-xl mb-3 relative z-10 group-hover:scale-105 group-hover:border-brandSky/50 transition-all duration-300">
          <Camera className="w-7 h-7" />
        </div>
        <span className="text-[11px] font-extrabold text-slate-400 font-headline uppercase tracking-widest relative z-10">
          Jerush Event
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-slate-900/80 ${className || ''}`}>
      {!loaded && (
        <div className={`absolute inset-0 bg-slate-900 animate-pulse flex items-center justify-center ${aspect === 'portrait' ? 'min-h-[340px]' : 'min-h-[220px]'}`}>
          <ImageIcon className="w-6 h-6 text-slate-800" />
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt || 'Event image'}
        loading="lazy"
        decoding="async"
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`w-full ${className && className.includes('h-full') ? 'h-full' : 'h-auto'} object-cover transition-all duration-500 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-102'}`}
        {...props}
      />
    </div>
  );
}

// Helper to sort events descending by year and date
const sortEventsByDate = (eventList) => {
  if (!Array.isArray(eventList)) return [];
  return [...eventList].sort((a, b) => {
    const dateA = a.event_date ? new Date(a.event_date).getTime() : 0;
    const dateB = b.event_date ? new Date(b.event_date).getTime() : 0;

    if (!isNaN(dateA) && dateA > 0 && !isNaN(dateB) && dateB > 0 && dateA !== dateB) {
      return dateB - dateA;
    }

    const yearA = parseInt((a.event_date || a.title || '').match(/\b(20\d\d)\b/)?.[1] || '0', 10);
    const yearB = parseInt((b.event_date || b.title || '').match(/\b(20\d\d)\b/)?.[1] || '0', 10);

    if (yearA !== yearB) {
      return yearB - yearA;
    }

    return (b.id || 0) - (a.id || 0);
  });
};

export default function EventsPage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  // Jerush Events States
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingAlbumPhotos, setLoadingAlbumPhotos] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [selectedYear, setSelectedYear] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Load published events list on mount
  useEffect(() => {
    setLoadingEvents(true);
    galleryService.getEvents()
      .then(data => {
        const publishedEvents = (data || []).filter(e => e.status !== 'draft');
        const sortedEvents = sortEventsByDate(publishedEvents);
        setEvents(sortedEvents);
        setLoadingEvents(false);
      })
      .catch(err => {
        console.error("Error loading events:", err);
        setLoadingEvents(false);
      });
  }, []);

  // Check URL parameter for specific event linking & reset to events list on navigation
  useEffect(() => {
    const eventIdParam = searchParams.get('eventId');
    if (eventIdParam) {
      setLoadingEvents(true);
      setLoadingAlbumPhotos(true);
      galleryService.getEventById(eventIdParam)
        .then(data => {
          if (data && data.status === 'draft') {
            setSelectedEvent(null);
          } else {
            setSelectedEvent(data);
          }
          setLoadingEvents(false);
          setLoadingAlbumPhotos(false);
        })
        .catch(err => {
          console.error("Error loading event photos from parameter:", err);
          setLoadingEvents(false);
          setLoadingAlbumPhotos(false);
        });
    } else {
      setSelectedEvent(null);
      setLoadingAlbumPhotos(false);
    }
  }, [searchParams, location.key, location.pathname, location.state]);

  const handleEventClick = (eventItem) => {
    setSelectedEvent(eventItem);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (eventItem && eventItem.photos && eventItem.photos.length > 0) {
      setLoadingAlbumPhotos(false);
    } else {
      setLoadingAlbumPhotos(true);
    }

    galleryService.getEventById(eventItem.id)
      .then(data => {
        if (data && data.photos) {
          setSelectedEvent(prev => (prev && prev.id === data.id ? { ...prev, photos: data.photos } : prev));
        }
        setLoadingAlbumPhotos(false);
      })
      .catch(err => {
        console.error("Error updating detailed event photos:", err);
        setLoadingAlbumPhotos(false);
      });
  };

  const openLightbox = (photo, index) => {
    setLightboxPhoto(photo);
    setLightboxIndex(index);
  };

  const handleNextPhoto = () => {
    if (!selectedEvent || !selectedEvent.photos || selectedEvent.photos.length === 0) return;
    const nextIdx = (lightboxIndex + 1) % selectedEvent.photos.length;
    setLightboxPhoto(selectedEvent.photos[nextIdx]);
    setLightboxIndex(nextIdx);
  };

  const handlePrevPhoto = () => {
    if (!selectedEvent || !selectedEvent.photos || selectedEvent.photos.length === 0) return;
    const prevIdx = (lightboxIndex - 1 + selectedEvent.photos.length) % selectedEvent.photos.length;
    setLightboxPhoto(selectedEvent.photos[prevIdx]);
    setLightboxIndex(prevIdx);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!lightboxPhoto) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxPhoto(null);
      } else if (e.key === 'ArrowRight') {
        handleNextPhoto();
      } else if (e.key === 'ArrowLeft') {
        handlePrevPhoto();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxPhoto, lightboxIndex, selectedEvent]);

  // Extract available event years dynamically
  const availableYears = useMemo(() => {
    const yearsSet = new Set();
    events.forEach(ev => {
      const match = (ev.event_date || ev.title || '').match(/\b(20\d\d)\b/);
      if (match && match[1]) {
        yearsSet.add(match[1]);
      }
    });
    return Array.from(yearsSet).sort((a, b) => b - a);
  }, [events]);

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return events.filter(ev => {
      const matchYear = selectedYear === 'all' || (ev.event_date || ev.title || '').includes(selectedYear);
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || ev.title.toLowerCase().includes(q) || ev.description.toLowerCase().includes(q);
      return matchYear && matchSearch;
    });
  }, [events, selectedYear, searchQuery]);

  // Photos inside selected event
  const displayedPhotos = useMemo(() => {
    return selectedEvent?.photos || [];
  }, [selectedEvent]);

  return (
    <div className="bg-slate-950 text-white min-h-screen pt-0 font-body relative overflow-hidden text-left">

      {/* Background Lights */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brandBlue/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-brandSky/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 pt-[85px] lg:pt-14 pb-8 sm:pb-12 px-4 sm:px-8 lg:px-12 border-b border-slate-850/70 text-center">
        <div className="w-full max-w-[1920px] mx-auto relative z-10 flex flex-col items-center justify-center">

          {/* Top Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-brandSky/30 shadow-[0_0_15px_rgba(30,151,212,0.2)] mb-5 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-brandSky animate-pulse" />
            <span className="text-[11px] font-extrabold text-brandSky uppercase tracking-widest font-headline">
              Official Media &amp; Celebrations Hub
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-headline font-black text-3xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-brandSky tracking-tight leading-tight mb-4 pt-1">
            Jerush <span className="font-cursive font-normal text-transparent bg-clip-text bg-gradient-to-r from-brandSky via-cyan-300 to-sky-200 text-4xl sm:text-6xl md:text-7xl capitalize px-2 tracking-normal inline-block overflow-visible drop-shadow-[0_2px_20px_rgba(30,151,212,0.4)]">Events Gallery</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed font-light mb-2">
            Immerse yourself in our grand inaugurations, surgical milestones, clinical achievements and vibrant team celebrations.
          </p>

        </div>
      </section>

      {/* Main Content Area */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 relative z-10 py-8 sm:py-12">

        {/* Controls & Filter Bar (Apple Theme Finish - Segmented Glass Pill Controls) */}
        {!selectedEvent && (
          <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/60 backdrop-blur-2xl p-2.5 sm:p-3 rounded-2xl border border-white/5 shadow-2xl">

            {/* Year Filters (Apple Segmented Control) */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/70 p-1.5 rounded-xl border border-white/5 shadow-inner w-full md:w-auto">
              <span className="text-[11px] font-semibold text-slate-400 px-2.5 hidden sm:inline-block">Filter Year:</span>
              <button
                onClick={() => setSelectedYear('all')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${selectedYear === 'all'
                    ? 'bg-gradient-to-r from-brandBlue to-brandSky text-white shadow-md shadow-cyan-500/20 scale-[1.02]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                All Years ({events.length})
              </button>
              {availableYears.map(year => {
                const count = events.filter(e => (e.event_date || e.title || '').includes(year)).length;
                return (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${selectedYear === year
                        ? 'bg-gradient-to-r from-brandBlue to-brandSky text-white shadow-md shadow-cyan-500/20 scale-[1.02]'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    {year} ({count})
                  </button>
                );
              })}
            </div>

            {/* Search Input (Apple Style Search Box) */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search event albums..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-950/70 border border-white/10 text-slate-100 text-xs font-medium rounded-xl placeholder-slate-500 focus:outline-none focus:border-brandSky/60 focus:bg-slate-900/90 transition-all shadow-inner"
              />
            </div>

          </div>
        )}

        {/* Content Container */}
        <div className="min-h-[450px]">

          {/* MAIN EVENTS GRID VIEW */}
          {!selectedEvent && (
            <div>
              {loadingEvents ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-6 sm:gap-8">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="bg-slate-900/40 border border-slate-800/60 rounded-3xl overflow-hidden h-[380px] animate-pulse">
                      <div className="aspect-[16/10] bg-slate-850" />
                      <div className="p-6 space-y-3">
                        <div className="h-3 bg-slate-800 rounded w-1/3" />
                        <div className="h-5 bg-slate-800 rounded w-2/3" />
                        <div className="h-4 bg-slate-800/60 rounded w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-6 sm:gap-8"
                >
                  {filteredEvents.map((ev) => (
                    <motion.div
                      key={ev.id}
                      onClick={() => handleEventClick(ev)}
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.3 }}
                      className="group relative bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/90 border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_0_40px_rgba(30,151,212,0.25)] hover:border-brandSky/50 transition-all duration-500 cursor-pointer flex flex-col justify-between text-left"
                    >
                      {/* Accent glow corner */}
                      <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-brandSky/5 group-hover:bg-gradient-to-br group-hover:from-brandBlue/30 group-hover:to-brandSky/40 group-hover:scale-125 transition-all duration-500 pointer-events-none -translate-y-10 translate-x-10 z-0" />

                      <div className="relative z-10">
                        {/* Cover Image Wrap with Stacked Cards visual effect */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-955 shrink-0 p-2">
                          <div className="w-full h-full rounded-2xl overflow-hidden relative">
                            <EventImage
                              src={ev.cover_image}
                              alt={ev.title}
                              className="w-full h-full group-hover:scale-108 transition-transform duration-700 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 pointer-events-none" />

                            {/* Layered Album Stack Badge */}
                            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 shadow-lg">
                              <Layers className="w-3.5 h-3.5 text-brandSky" />
                              <span className="text-[10px] font-black uppercase tracking-wider text-slate-200">
                                {ev.photo_count || (ev.photos ? ev.photos.length : 0)} Photos
                              </span>
                            </div>

                            {/* Hover overlay hint */}
                            <div className="absolute inset-0 bg-brandBlue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <span className="px-4 py-2 rounded-xl bg-slate-950/90 text-white font-headline font-bold text-xs uppercase tracking-wider shadow-xl border border-brandSky/40 flex items-center gap-2">
                                <Maximize2 className="w-3.5 h-3.5 text-brandSky" /> Open Exhibition Album
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Content details */}
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <span className="inline-flex items-center gap-1.5 text-[10px] text-brandSky font-bold uppercase tracking-wider mb-2.5 px-2.5 py-1 rounded-md bg-brandSky/10 border border-brandSky/20">
                              <Calendar className="w-3 h-3" />
                              {ev.event_date}
                            </span>
                            <h3 className="font-headline font-extrabold text-lg leading-snug text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-brandSky group-hover:from-brandSky group-hover:to-cyan-300 transition-all">
                              {ev.title}
                            </h3>
                            <p className="text-slate-400 text-xs sm:text-sm mt-2.5 leading-relaxed line-clamp-2">
                              {ev.description}
                            </p>
                          </div>

                          {/* Action footer */}
                          <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-extrabold uppercase tracking-widest text-slate-400 group-hover:text-brandSky transition-colors">
                            <span>Explore Event Album</span>
                            <div className="w-8 h-8 rounded-full bg-slate-800/80 group-hover:bg-gradient-to-r group-hover:from-brandBlue group-hover:to-brandSky text-slate-400 group-hover:text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-all duration-300 border border-slate-700/50">
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {filteredEvents.length === 0 && (
                    <div className="col-span-full py-20 text-center bg-slate-900/40 border border-slate-800/60 rounded-3xl">
                      <Camera className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                      <p className="text-sm text-slate-400 font-medium">No published event albums found matching criteria.</p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          )}

          {/* DETAILED EVENT ALBUM PHOTOS VIEW */}
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              {/* Event Album Top Navigation Bar (Interchanged: Left = Photo Count, Right = All Events) */}
              <div className="pb-4 border-b border-slate-800/60 flex flex-row items-center justify-between gap-3">

                {/* Left Side: Compact Photo Count Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-slate-900/70 border border-white/10 text-xs font-medium text-slate-400 backdrop-blur-md shrink-0">
                  <Layers className="w-3.5 h-3.5 text-brandSky" />
                  <span className="text-slate-200 font-bold">{selectedEvent.photos ? selectedEvent.photos.length : 0}</span>
                  <span>Photos</span>
                </div>

                {/* Right Side: Return to All Events Button */}
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-slate-900/90 border border-white/10 text-slate-300 hover:text-white hover:border-brandSky/40 text-xs font-semibold backdrop-blur-md shadow-sm transition-all active:scale-95 cursor-pointer shrink-0"
                >
                  &larr; All Events
                </button>

              </div>

              {/* Event Title & Metadata Banner with Ambient Cover Image Background */}
              <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
                {/* Event Cover Image Ambient Background */}
                {selectedEvent.cover_image && (
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <img
                      src={selectedEvent.cover_image}
                      alt=""
                      className="w-full h-full object-cover object-center opacity-30 scale-105 filter blur-[2px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/65" />
                    <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-xs" />
                  </div>
                )}

                <div className="absolute top-0 right-0 w-64 h-64 bg-brandSky/10 rounded-full blur-3xl pointer-events-none z-10" />

                <div className="max-w-5xl relative z-10 space-y-3">
                  <span className="inline-flex items-center gap-1.5 text-xs text-brandSky font-bold uppercase tracking-wider bg-brandSky/10 px-3 py-1 rounded-md border border-brandSky/20">
                    <Calendar className="w-4 h-4" />
                    {selectedEvent.event_date}
                  </span>
                  <h2 className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white via-brandSky to-cyan-300 leading-snug tracking-tight">
                    {selectedEvent.title}
                  </h2>
                  <p className="text-slate-200 text-sm leading-relaxed font-light">
                    {selectedEvent.description}
                  </p>
                </div>
              </div>

              {/* Photos Masonry Column Grid */}
              {loadingAlbumPhotos ? (
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 2xl:columns-5 3xl:columns-6 gap-6 sm:gap-8 space-y-6 sm:space-y-8 block">
                  {[320, 240, 380, 260, 340, 220, 300, 280].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}px` }}
                      className="break-inside-avoid rounded-3xl bg-slate-900/60 border border-slate-800/60 animate-pulse mb-8"
                    />
                  ))}
                </div>
              ) : displayedPhotos.length > 0 ? (
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 2xl:columns-5 3xl:columns-6 gap-6 sm:gap-8 space-y-6 sm:space-y-8 block">
                  {displayedPhotos.map((photo, index) => {
                    const originalIndex = (selectedEvent.photos || []).findIndex(p => p.id === photo.id);
                    const photoIdx = originalIndex !== -1 ? originalIndex : index;
                    const displayName = getImageDisplayName(photo, photoIdx, selectedEvent?.title);
                    return (
                      <motion.div
                        key={photo.id || index}
                        onClick={() => openLightbox(photo, photoIdx)}
                        whileHover={{ scale: 1.02, y: -4 }}
                        transition={{ duration: 0.25 }}
                        className="break-inside-avoid group relative rounded-3xl overflow-hidden border border-slate-800/80 bg-slate-900 cursor-pointer shadow-xl hover:shadow-[0_0_30px_rgba(30,151,212,0.3)] hover:border-brandSky/60 transition-all duration-300 mb-8"
                      >
                        <EventImage
                          src={photo.image_url}
                          alt={getSeoAltText(photo.image_url, selectedEvent?.title, photoIdx)}
                          aspect={photo.aspect}
                          className="w-full h-auto"
                        />

                        {/* Hover Dark Gradient Overlay & Expand Button */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-955/90 via-slate-955/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                          <div className="flex justify-end">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brandBlue to-brandSky text-white flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                              <Maximize2 className="w-5 h-5" />
                            </div>
                          </div>

                          {displayName && (
                            <div className="bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow-lg">
                              <p className="text-xs font-headline font-bold text-white tracking-wide truncate">
                                {displayName}
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="max-w-xl mx-auto py-14 px-8 text-center bg-slate-900/50 border border-slate-800/80 rounded-3xl shadow-2xl relative overflow-hidden backdrop-blur-md">
                  <div className="w-20 h-20 rounded-3xl bg-slate-850/90 border border-brandSky/30 shadow-xl flex items-center justify-center mx-auto mb-6">
                    <Camera className="w-10 h-10 text-brandSky" />
                  </div>
                  <h3 className="text-xl font-headline font-extrabold text-white mb-2">
                    Album Photos Coming Soon
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm mb-6">
                    We are currently curating and publishing official photos for this celebration album. Please check back soon!
                  </p>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brandBlue to-brandSky text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    &larr; Return to All Events
                  </button>
                </div>
              )}
            </motion.div>
          )}

        </div>

      </div>

      {/* ULTRA-PREMIUM LIGHTBOX MODAL WITH FILMSTRIP CAROUSEL */}
      <AnimatePresence>
        {lightboxPhoto && (
          <div className="fixed inset-0 z-[2000] flex flex-col items-center justify-between p-2 sm:p-6 overflow-hidden">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxPhoto(null)}
              className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl"
            />

            {/* Lightbox Top Header Controls */}
            <div className="relative z-20 w-full max-w-[1800px] flex items-center justify-between py-3 px-4 bg-slate-900/80 border border-slate-800/80 rounded-2xl backdrop-blur-md shadow-2xl">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold font-headline uppercase tracking-widest text-brandSky bg-brandSky/10 px-3 py-1 rounded-lg border border-brandSky/20">
                  Photo {lightboxIndex + 1} of {selectedEvent?.photos?.length || 0}
                </span>
                {getImageDisplayName(lightboxPhoto, lightboxIndex, selectedEvent?.title) && (
                  <span className="text-xs font-medium text-slate-300 hidden sm:inline-block truncate max-w-md">
                    {getImageDisplayName(lightboxPhoto, lightboxIndex, selectedEvent?.title)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLightboxPhoto(null)}
                  className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center font-bold text-lg cursor-pointer transition-all border border-slate-700"
                  title="Close (Esc)"
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Main Lightbox Photo Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative max-w-[1800px] w-full flex-1 flex items-center justify-center z-10 py-2"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={lightboxPhoto.image_url}
                  alt={getSeoAltText(lightboxPhoto.image_url, selectedEvent?.title, lightboxIndex)}
                  className="max-w-full max-h-[72vh] object-contain rounded-2xl shadow-2xl border border-slate-800/80 bg-slate-900"
                />

                {/* Glowing Circular Nav Buttons */}
                {selectedEvent && selectedEvent.photos && selectedEvent.photos.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); handlePrevPhoto(); }}
                      className="absolute left-1 sm:left-4 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-slate-900/90 hover:bg-brandBlue border border-brandSky/40 text-white flex items-center justify-center transition-all shadow-2xl active:scale-95 cursor-pointer backdrop-blur-md z-20 group"
                      title="Previous photo (←)"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleNextPhoto(); }}
                      className="absolute right-1 sm:right-4 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-slate-900/90 hover:bg-brandBlue border border-brandSky/40 text-white flex items-center justify-center transition-all shadow-2xl active:scale-95 cursor-pointer backdrop-blur-md z-20 group"
                      title="Next photo (→)"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </>
                )}
              </div>
            </motion.div>

            {/* Lightbox Bottom Thumbnail Filmstrip Carousel */}
            {selectedEvent && selectedEvent.photos && selectedEvent.photos.length > 1 && (
              <div className="relative z-20 w-full max-w-5xl py-2 px-3 bg-slate-900/80 border border-slate-800/80 rounded-2xl backdrop-blur-md shadow-2xl flex items-center gap-2 overflow-x-auto scrollbar-hide">
                {selectedEvent.photos.map((thumb, idx) => (
                  <button
                    key={thumb.id || idx}
                    onClick={() => { setLightboxPhoto(thumb); setLightboxIndex(idx); }}
                    className={`w-14 h-14 shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer relative ${idx === lightboxIndex
                        ? 'border-brandSky scale-105 shadow-[0_0_12px_#1E97D4]'
                        : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600'
                      }`}
                  >
                    <img
                      src={thumb.image_url}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
