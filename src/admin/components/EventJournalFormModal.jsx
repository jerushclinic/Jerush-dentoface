import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, Sparkles, Image as ImageIcon, Layers, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EventJournalFormModal({ isOpen, onClose, onSave, eventData }) {
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    category: 'Grand Festival',
    status: 'upcoming',
    date: '',
    isoDate: '',
    time: '',
    location: 'Jerush Main Campus Auditorium, Thuckalay',
    badge: 'Upcoming Event',
    badgeColor: 'from-brandSky to-cyan-400',
    coverImage: '',
    description: '',
    organizer: 'Jerush Executive Board',
    photoCount: 30
  });

  useEffect(() => {
    if (eventData) {
      setFormData({
        id: eventData.id,
        title: eventData.title || '',
        tagline: eventData.tagline || '',
        category: eventData.category || 'Grand Festival',
        status: eventData.status || 'upcoming',
        date: eventData.date || '',
        isoDate: eventData.isoDate || '',
        time: eventData.time || '',
        location: eventData.location || 'Jerush Main Campus Auditorium, Thuckalay',
        badge: eventData.badge || '',
        badgeColor: eventData.badgeColor || 'from-brandSky to-cyan-400',
        coverImage: eventData.coverImage || '',
        description: eventData.description || '',
        organizer: eventData.organizer || 'Jerush Executive Board',
        photoCount: eventData.photoCount || 30
      });
    } else {
      setFormData({
        title: '',
        tagline: '',
        category: 'Grand Festival',
        status: 'upcoming',
        date: '',
        isoDate: new Date().toISOString().slice(0, 19),
        time: '10:00 AM IST',
        location: 'Jerush Main Campus Auditorium, Thuckalay',
        badge: 'Upcoming Festive Event',
        badgeColor: 'from-brandSky to-cyan-400',
        coverImage: '/images/events/jerushaligne-opening-event/jerush-outdoor.webp',
        description: '',
        organizer: 'Jerush Executive Board',
        photoCount: 30
      });
    }
  }, [eventData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date) return;
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[2100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 text-left my-8 border border-slate-200"
        >
          {/* Header */}
          <div className="px-6 py-5 bg-gradient-to-r from-brandBlue to-brandSky text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-5 h-5 text-amber-300" />
              <h3 className="font-headline font-bold text-lg text-white">
                {eventData ? 'Edit Celebration Event' : 'Add New Event to Journal'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar">

            {/* Title & Tagline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-headline font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jerush Onam Celebration 2026"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-brandSky"
                />
              </div>

              <div>
                <label className="block text-xs font-headline font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Subtitle / Tagline
                </label>
                <input
                  type="text"
                  placeholder="e.g. 24 Years of Surgical Excellence"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-brandSky"
                />
              </div>
            </div>

            {/* Category & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-headline font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-brandSky bg-white"
                >
                  <option value="Grand Festival">Grand Festival</option>
                  <option value="Milestone Honor">Milestone Honor</option>
                  <option value="Grand Opening">Grand Opening</option>
                  <option value="Founder Celebration">Founder Celebration</option>
                  <option value="Healthcare Camp">Healthcare Camp</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-headline font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Event Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-brandSky bg-white"
                >
                  <option value="upcoming">Upcoming (Live Countdown)</option>
                  <option value="completed">Completed Milestone (View Album)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-headline font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Badge Text
                </label>
                <input
                  type="text"
                  placeholder="e.g. Upcoming Festive Event"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-brandSky"
                />
              </div>
            </div>

            {/* Date, Time & ISO Date */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-headline font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Display Date *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. August 26, 2026"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-brandSky"
                />
              </div>

              <div>
                <label className="block text-xs font-headline font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  ISO Date (for Countdown)
                </label>
                <input
                  type="datetime-local"
                  value={formData.isoDate ? formData.isoDate.slice(0, 16) : ''}
                  onChange={(e) => setFormData({ ...formData, isoDate: e.target.value ? new Date(e.target.value).toISOString() : '' })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-brandSky"
                />
              </div>

              <div>
                <label className="block text-xs font-headline font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Timing
                </label>
                <input
                  type="text"
                  placeholder="e.g. 9:00 AM - 4:30 PM IST"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-brandSky"
                />
              </div>
            </div>

            {/* Location & Cover Image */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-headline font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Venue Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Jerush Main Campus Auditorium, Thuckalay"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-brandSky"
                />
              </div>

              <div>
                <label className="block text-xs font-headline font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Cover Photo URL
                </label>
                <input
                  type="text"
                  placeholder="/images/events/jerushaligne-opening-event/jerush-outdoor.webp"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-brandSky"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-headline font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Full Event Description
              </label>
              <textarea
                rows={3}
                placeholder="Write event description..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-brandSky"
              />
            </div>

            {/* Buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-headline font-bold text-xs hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brandBlue to-brandSky text-white font-headline font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition-all cursor-pointer"
              >
                Save Event
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
