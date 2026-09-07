import React, { useState, useEffect } from 'react';
import { Undo, Redo, Upload, Trash2, Calendar, FileText, Image as ImageIcon, AlertCircle } from 'lucide-react';
import FormModal from './FormModal';
import { galleryService, normalizeImageUrl } from '../../services/galleryService';

const EMPTY_EVENT = { title: '', event_date: '', description: '', cover_image: '', status: 'published' };

// High performance client-side image compression and resizing
const compressImageFile = (file, maxDim = 1600, quality = 0.85) => {
  return new Promise((resolve) => {
    if (!file || !file.type.startsWith('image/') || file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onloadend = () => resolve({ name: file?.name || 'photo.jpg', url: reader.result });
      reader.onerror = () => resolve({ name: file?.name || 'photo.jpg', url: '' });
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedUrl = canvas.toDataURL('image/jpeg', quality);
        resolve({
          name: file.name,
          url: compressedUrl
        });
      };
      img.onerror = () => {
        resolve({ name: file.name, url: e.target.result });
      };
      img.src = e.target.result;
    };
    reader.onerror = () => {
      resolve({ name: file.name, url: '' });
    };
    reader.readAsDataURL(file);
  });
};

// Component for rendering existing photos with fallback for deleted/missing server files
function ExistingPhotoCard({ photo, pIdx, title, onDelete }) {
  const [hasError, setHasError] = useState(false);
  const originalUrl = typeof photo === 'string'
    ? photo
    : (photo.image_url || photo.url || photo.image || photo.photo_url || photo.cleanPath || '');
  const imgSrc = normalizeImageUrl(originalUrl, title, false, pIdx);
  const photoId = (photo && photo.id) || pIdx;

  return (
    <div className="group relative aspect-square rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 flex items-center justify-center shadow-md">
      {imgSrc && !hasError ? (
        <img
          src={imgSrc}
          alt="Event photo"
          className="w-full h-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="w-full h-full p-3 flex flex-col items-center justify-center text-center bg-red-950/30 border border-red-500/20">
          <AlertCircle className="w-6 h-6 text-red-400 mb-1" />
          <span className="text-[9px] font-bold text-red-300 uppercase tracking-wider">File Missing</span>
          <span className="text-[8px] text-red-400/80 mt-0.5">Click trash to remove</span>
        </div>
      )}
      <button
        type="button"
        onClick={() => onDelete(photoId)}
        className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white shadow-md cursor-pointer z-10 transition-transform active:scale-95"
        title="Delete this photo"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export default function EventFormModal({ open, onClose, onSave, event }) {
  const [form, setForm] = useState(EMPTY_EVENT);
  const [newPhotos, setNewPhotos] = useState([]);
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [activeSubTab, setActiveSubTab] = useState('details'); // 'details' or 'photos'

  useEffect(() => {
    if (open) {
      setActiveSubTab('details');
      setNewPhotos([]);
      setUploadStatus('');

      if (event && event.id) {
        const initialCover = event.cover_image ? normalizeImageUrl(event.cover_image, event.title || '', true, 0) : '';
        setForm({
          title: event.title || '',
          event_date: event.event_date || '',
          description: event.description || '',
          cover_image: initialCover,
          status: event.status || 'published'
        });
        setExistingPhotos(event.photos || []);

        // Fetch full photo list in background
        galleryService.getEventById(event.id)
          .then(data => {
            if (data) {
              if (data.photos) setExistingPhotos(data.photos);
              setForm(prev => ({
                ...prev,
                cover_image: data.cover_image ? normalizeImageUrl(data.cover_image, data.title || prev.title, true, 0) : ''
              }));
            }
          })
          .catch(err => {
            console.error("Error fetching event details for admin:", err);
          });
      } else {
        setForm(EMPTY_EVENT);
        setExistingPhotos([]);
      }
    }
  }, [event, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Convert cover image file to compressed base64
  const handleCoverFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadStatus('Optimizing cover image...');
      const compressed = await compressImageFile(file, 1600, 0.85);
      setForm(prev => ({ ...prev, cover_image: compressed.url }));
      setUploadStatus('');
    }
  };

  // Convert multiple album photos with client-side auto-compression
  const handlePhotosChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploadStatus(`Optimizing ${files.length} images...`);
    const readPromises = files.map(file => compressImageFile(file, 1600, 0.85));
    const items = await Promise.all(readPromises);
    setNewPhotos(prev => [...prev, ...items]);
    setUploadStatus('');
  };

  // Remove photo from new upload queue
  const removeNewPhoto = (idxToRemove) => {
    setNewPhotos(prev => prev.filter((_, idx) => idx !== idxToRemove));
  };

  // Delete existing photo from the database immediately
  const handleDeleteExistingPhoto = (photoId) => {
    if (confirm("Are you sure you want to delete this photo from the event album?")) {
      galleryService.deletePhotoFromEvent(photoId, event.id)
        .then(() => {
          setExistingPhotos(prev => prev.filter(p => p.id !== photoId));
        })
        .catch(err => {
          alert("Failed to delete photo: " + err.message);
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.event_date) {
      alert("Please fill in the event title and date.");
      return;
    }

    setLoading(true);
    setUploadStatus('Saving album details...');

    try {
      // Format pending new photos
      const formattedNewPhotos = newPhotos.map(item => {
        if (typeof item === 'string') return item;
        if (typeof item === 'object' && item !== null) {
          return {
            name: item.name || '',
            url: item.url || item.cleanPath || ''
          };
        }
        return String(item);
      });

      const BATCH_SIZE = 6;

      if (event && event.id) {
        // Update Event Details
        await galleryService.updateEvent(event.id, form);

        // Upload new photos in safe chunks of 6 to prevent timeouts and payload limit crashes
        if (formattedNewPhotos.length > 0) {
          for (let i = 0; i < formattedNewPhotos.length; i += BATCH_SIZE) {
            const batch = formattedNewPhotos.slice(i, i + BATCH_SIZE);
            const batchNum = Math.floor(i / BATCH_SIZE) + 1;
            const totalBatches = Math.ceil(formattedNewPhotos.length / BATCH_SIZE);
            setUploadStatus(`Uploading photos (batch ${batchNum} of ${totalBatches})...`);
            await galleryService.addPhotosToEvent(event.id, batch);
          }
        }
      } else {
        // Create new event with initial chunk
        const initialChunk = formattedNewPhotos.slice(0, BATCH_SIZE);
        const remainingChunks = formattedNewPhotos.slice(BATCH_SIZE);

        const createPayload = {
          ...form,
          photos: initialChunk
        };

        const res = await galleryService.addEvent(createPayload);
        const newEventId = res?.id || (typeof res === 'number' ? res : null);

        // Upload any remaining photo chunks
        if (newEventId && remainingChunks.length > 0) {
          for (let i = 0; i < remainingChunks.length; i += BATCH_SIZE) {
            const batch = remainingChunks.slice(i, i + BATCH_SIZE);
            setUploadStatus(`Uploading remaining photos (${i + 1} to ${Math.min(i + BATCH_SIZE, remainingChunks.length)})...`);
            await galleryService.addPhotosToEvent(newEventId, batch);
          }
        }
      }

      setLoading(false);
      setUploadStatus('');
      onSave();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error saving event: " + err.message);
      setLoading(false);
      setUploadStatus('');
    }
  };

  const inputCls = "w-full px-4 py-2.5 bg-white/40 dark:bg-slate-900/35 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-brandSky dark:focus:border-brandSky focus:bg-white/80 dark:focus:bg-slate-900/75 focus:ring-2 focus:ring-brandSky/15 transition-all shadow-sm";
  const labelCls = "text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block";

  return (
    <FormModal
      open={open}
      onClose={onClose}
      title={event ? 'Edit Event Album' : 'Create Event Album'}
      subtitle="Configure event details, cover image, and photos"
      maxWidth="max-w-2xl"
    >
      {/* Sub tabs for multi-part management */}
      {event && (
        <div className="flex border-b border-slate-100 dark:border-slate-800/80 mb-6">
          <button
            type="button"
            onClick={() => setActiveSubTab('details')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeSubTab === 'details'
                ? 'border-brandSky text-brandSky'
                : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            Album Details
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('photos')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeSubTab === 'photos'
                ? 'border-brandSky text-brandSky'
                : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            Album Photos ({existingPhotos.length + newPhotos.length})
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col justify-center items-center h-56 gap-3">
          <div className="w-10 h-10 border-3 border-brandSky border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300 font-headline uppercase tracking-wider">
            {uploadStatus || 'Saving Album...'}
          </span>
          <span className="text-[11px] text-slate-400">Please do not close this window</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 text-left">

          {/* Sub Tab: DETAILS */}
          {activeSubTab === 'details' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelCls}>Event Title</label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Onam Celebration 2k25"
                    required
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Event Date</label>
                  <input
                    name="event_date"
                    value={form.event_date}
                    onChange={handleChange}
                    placeholder="e.g. September 05, 2025"
                    required
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>Status</label>
                <select name="status" value={form.status} onChange={handleChange} className={inputCls}>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div>
                <label className={labelCls}>Event Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Summarize the event highlights..."
                  rows={4}
                  className="w-full px-4 py-2.5 bg-white/40 dark:bg-slate-900/35 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-brandSky dark:focus:border-brandSky focus:bg-white/80 dark:focus:bg-slate-900/75 focus:ring-2 focus:ring-brandSky/15 transition-all shadow-sm resize-none"
                />
              </div>

              {/* Cover Image Upload */}
              <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-6 items-center">
                <div>
                  <label className={labelCls}>Cover Photo</label>
                  <div className="flex items-center gap-3">
                    <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-brandSky dark:hover:border-brandSky/60 rounded-2xl p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-all">
                      <Upload className="w-5 h-5 text-slate-400 mb-2" />
                      <span className="text-[10px] font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider">Upload Cover Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                <div className="w-full flex justify-center">
                  {form.cover_image ? (
                    <div className="relative aspect-[16/10] w-full max-w-[200px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                      <img src={form.cover_image} alt="Cover Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, cover_image: '' }))}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500 hover:bg-red-650 text-white shadow-md transition-all scale-90"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="aspect-[16/10] w-full max-w-[200px] rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center text-slate-400">
                      <ImageIcon className="w-8 h-8 opacity-30 mb-1" />
                      <span className="text-[8px] uppercase font-black tracking-widest">No Cover Photo</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Sub Tab: PHOTOS (ALBUM IMAGES) */}
          {(activeSubTab === 'photos' || !event) && (
            <div className="space-y-6">

              {/* Batch Upload Selector */}
              <div>
                <label className={labelCls}>Upload Album Photos (Multiple allowed)</label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-brandSky dark:hover:border-brandSky/60 rounded-2xl p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-all">
                  <Upload className="w-6 h-6 text-slate-400 mb-2" />
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Select Files</span>
                  <span className="text-[10px] text-slate-400 mt-1">Auto-optimized for ultra fast web loading (PNG, JPG, WEBP)</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotosChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Photos lists */}
              <div className="space-y-4">

                {/* New photos pending save */}
                {newPhotos.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-extrabold text-brandSky uppercase tracking-widest mb-3">
                      New Upload Queue ({newPhotos.length})
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {newPhotos.map((item, idx) => {
                        const imgSrc = typeof item === 'object' ? (item.cleanPath || item.url) : item;
                        const fileName = typeof item === 'object' ? item.name : '';
                        return (
                          <div key={idx} className="group relative aspect-square rounded-2xl overflow-hidden border border-brandSky/40 bg-slate-950 flex items-center justify-center shadow-md">
                            <img src={imgSrc} alt={fileName || "New upload preview"} className="w-full h-full object-cover" />
                            {fileName && (
                              <span className="absolute bottom-2 left-2 right-2 text-[8px] font-medium text-white bg-slate-950/80 px-1.5 py-0.5 rounded truncate backdrop-blur-sm">
                                {fileName}
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => removeNewPhoto(idx)}
                              className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500 text-white shadow-md scale-95 cursor-pointer z-10 hover:scale-105 transition-transform"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Existing photos in database */}
                {event && existingPhotos.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">
                      Existing Album Photos ({existingPhotos.length})
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {existingPhotos.map((photo, pIdx) => (
                        <ExistingPhotoCard
                          key={photo.id || pIdx}
                          photo={photo}
                          pIdx={pIdx}
                          title={form.title}
                          onDelete={handleDeleteExistingPhoto}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-5 border-t border-slate-100 dark:border-slate-800/80">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-550 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-xl font-headline font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              Save Album
            </button>
          </div>

        </form>
      )}
    </FormModal>
  );
}
