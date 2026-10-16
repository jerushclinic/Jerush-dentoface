import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DoctorProfileModal({ doctor, onClose }) {
  const navigate = useNavigate();
  const overlayRef = useRef(null);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Close on backdrop click
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const handleBookClick = (e) => {
    e.preventDefault();
    onClose();
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!doctor) return null;

  const hasSocialLinks = doctor.socialLinks && Object.keys(doctor.socialLinks).some(key => doctor.socialLinks[key]);

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md"
    >
      <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-xl w-full relative flex flex-col max-h-[92vh] animate-fadeIn text-left overflow-hidden">

        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-brandBlue to-brandSky px-6 pt-5 pb-4 sm:px-8 sm:pt-6 sm:pb-5 flex justify-between items-center relative z-20">
          <div>
            <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest block">
              Specialist Profile
            </span>
            <h3 className="font-headline font-extrabold text-lg sm:text-xl text-white mt-1 leading-tight">
              {doctor.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white bg-white/15 hover:bg-white/25 text-xl font-bold w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 active:scale-90 shrink-0"
            aria-label="Close profile modal (ESC)"
            title="Close (ESC)"
          >
            &times;
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="overflow-y-auto p-6 sm:p-8 pt-5 sm:pt-6 flex-grow scrollbar-hide">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Profile Image */}
            <div className="w-28 h-36 sm:w-36 sm:h-48 rounded-xl overflow-hidden bg-slate-100 shrink-0 mx-auto sm:mx-0 shadow-md border border-slate-200 isolate transform-gpu [contain:paint]">
              <img
                src={doctor.image || doctor.fallbackImg}
                alt={doctor.name}
                className="jerush-doctor-modal-img w-full h-full object-cover object-top transform-gpu [transform:translateZ(0)] [backface-visibility:hidden]"
                style={{
                  transform: 'translateZ(0)',
                  WebkitBackfaceVisibility: 'hidden',
                  imageRendering: 'auto'
                }}
                onError={(e) => {
                  e.target.src = doctor.fallbackImg;
                }}
              />
            </div>

            {/* Profile Details */}
            <div className="space-y-3 flex-grow">
              <p className="text-brandBlue font-bold text-xs font-headline uppercase leading-none">
                {doctor.role}
              </p>
              <p className="text-[11px] text-slate-400 font-semibold uppercase">
                {doctor.qualification}
              </p>
              <p className="text-secondary text-xs sm:text-sm leading-relaxed">
                {doctor.bio}
              </p>
            </div>
          </div>

          {/* Specialties & Schedule */}
          <div className="mt-6 space-y-4 pt-4 border-t border-slate-100">
            <div>
              <h4 className="text-xs font-extrabold uppercase text-slate-400 font-headline mb-2">
                Specialized Treatments
              </h4>
              <div className="flex flex-wrap gap-2">
                {doctor.specialties && doctor.specialties.map((spec, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-bold text-brandBlue bg-brandBlue/5 border border-brandBlue/10 px-2.5 py-1 rounded-md"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center text-xs">
              <div>
                <h4 className="text-xs font-extrabold uppercase text-slate-400 font-headline">
                  Schedule Timings
                </h4>
                <span className="text-slate-600 font-semibold whitespace-pre-line">{doctor.schedule}</span>
              </div>
              <div className="font-bold text-brandSky uppercase tracking-wider">
                {doctor.experience}
              </div>
            </div>

            {/* Social Links */}
            {hasSocialLinks && (
              <div className="pt-3 border-t border-slate-100">
                <h4 className="text-xs font-extrabold uppercase text-slate-400 font-headline mb-2">
                  Connect
                </h4>
                <div className="flex gap-3">
                  {doctor.socialLinks.facebook && (
                    <a
                      href={doctor.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-blue-600 transition-colors duration-200"
                      title="Facebook"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                  )}
                  {doctor.socialLinks.instagram && (
                    <a
                      href={doctor.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-pink-50 hover:bg-pink-100 flex items-center justify-center text-pink-600 transition-colors duration-200"
                      title="Instagram"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                  )}
                  {(doctor.socialLinks.twitter || doctor.socialLinks.x) && (
                    <a
                      href={doctor.socialLinks.twitter || doctor.socialLinks.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors duration-200"
                      title="X (Twitter)"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                  )}
                  {doctor.socialLinks.linkedin && (
                    <a
                      href={doctor.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-blue-700 transition-colors duration-200"
                      title="LinkedIn"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTAs Footer */}
        <div className="p-6 sm:p-8 pt-4 sm:pt-4 border-t border-slate-100 flex gap-4 bg-slate-50/50">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-headline font-semibold text-xs uppercase tracking-wider rounded-xl transition-all"
          >
            Close
          </button>
          <a
            href="#"
            onClick={handleBookClick}
            className="px-6 py-2.5 bg-gradient-to-r from-brandBlue to-brandSky hover:from-brandBlue/90 hover:to-brandSky/90 text-white font-headline font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex-grow text-center shadow-md shadow-brandBlue/10"
          >
            Book Appointment
          </a>
        </div>
      </div>
    </div>
  );
}
