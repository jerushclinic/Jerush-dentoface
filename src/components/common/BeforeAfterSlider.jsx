import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Sparkles, MoveHorizontal, Columns, Eye } from 'lucide-react';

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  aspectRatio = 'aspect-[4/3]',
  className = '',
  defaultPosition = 50,
  allowModes = true,
  theme = 'light',
  alt = 'Before and After Clinical Transformation'
}) {
  const [sliderPos, setSliderPos] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState('slider'); // 'slider', 'split', 'before', 'after'
  const containerRef = useRef(null);

  const isLight = theme === 'light';

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  }, [handleMove]);

  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  }, [isDragging, handleMove]);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleTouchMove]);

  return (
    <div className={`flex flex-col space-y-3 select-none ${className}`}>
      {/* Mode Switcher Buttons */}
      {allowModes && (
        <div className="flex items-center justify-between gap-2 px-1">
          <div className={`flex items-center gap-1 p-1 rounded-xl text-[11px] font-headline font-bold ${
            isLight
              ? 'bg-slate-100/90 border border-slate-200/90 text-slate-600'
              : 'bg-slate-900/80 border border-slate-800 text-slate-400'
          }`}>
            <button
              type="button"
              onClick={() => setViewMode('slider')}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'slider'
                  ? 'bg-brandBlue text-white shadow-sm'
                  : isLight ? 'hover:text-slate-900 hover:bg-white/60' : 'hover:text-slate-200'
              }`}
              title="Interactive Wipe Slider"
            >
              <MoveHorizontal className="w-3 h-3" />
              <span>Slider</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('split')}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'split'
                  ? 'bg-brandBlue text-white shadow-sm'
                  : isLight ? 'hover:text-slate-900 hover:bg-white/60' : 'hover:text-slate-200'
              }`}
              title="Side-by-Side View"
            >
              <Columns className="w-3 h-3" />
              <span>Side-by-Side</span>
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setViewMode(viewMode === 'before' ? 'slider' : 'before')}
              className={`px-2 py-1 rounded-lg border text-[10px] font-headline font-bold uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'before'
                  ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                  : isLight
                    ? 'bg-white text-rose-700 border-rose-200 hover:bg-rose-50'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              Before
            </button>
            <button
              type="button"
              onClick={() => setViewMode(viewMode === 'after' ? 'slider' : 'after')}
              className={`px-2 py-1 rounded-lg border text-[10px] font-headline font-bold uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'after'
                  ? 'bg-brandBlue text-white border-brandBlue shadow-sm'
                  : isLight
                    ? 'bg-white text-brandBlue border-sky-200 hover:bg-sky-50'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              After
            </button>
          </div>
        </div>
      )}

      {/* Main Image Container */}
      {viewMode === 'slider' && (
        <div
          ref={containerRef}
          onMouseDown={(e) => {
            setIsDragging(true);
            handleMove(e.clientX);
          }}
          onTouchStart={(e) => {
            setIsDragging(true);
            if (e.touches && e.touches[0]) handleMove(e.touches[0].clientX);
          }}
          className={`relative w-full ${aspectRatio} rounded-2xl overflow-hidden cursor-ew-resize border shadow-md group ${
            isLight
              ? 'border-slate-200/90 bg-slate-100'
              : 'border-slate-800 bg-slate-950'
          }`}
        >
          {/* AFTER Image (Base Layer) */}
          <img
            src={afterImage}
            alt={`${alt} - After`}
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            loading="lazy"
          />

          {/* BEFORE Image (Clipped Overlay Layer) */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ width: `${sliderPos}%` }}
          >
            <img
              src={beforeImage}
              alt={`${alt} - Before`}
              className="absolute top-0 left-0 max-w-none h-full object-cover object-center"
              style={{
                width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%'
              }}
              loading="lazy"
            />
          </div>

          {/* Center Divider Line & Handle */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.3)] z-20 pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-brandBlue shadow-lg flex items-center justify-center border-2 border-brandSky transition-transform group-hover:scale-110 pointer-events-auto cursor-ew-resize">
              <MoveHorizontal className="w-4 h-4 text-brandBlue" />
            </div>
          </div>

          {/* Badges */}
          <div className={`absolute bottom-3 left-3 z-10 px-2.5 py-1 text-[10px] font-headline font-bold uppercase tracking-wider rounded-lg shadow-sm backdrop-blur-md ${
            isLight
              ? 'bg-white/95 border border-rose-200 text-rose-700'
              : 'bg-slate-950/80 border border-rose-500/30 text-rose-400'
          }`}>
            {beforeLabel}
          </div>
          <div className={`absolute bottom-3 right-3 z-10 px-2.5 py-1 text-[10px] font-headline font-bold uppercase tracking-wider rounded-lg shadow-sm flex items-center gap-1 backdrop-blur-md ${
            isLight
              ? 'bg-white/95 border border-sky-200 text-brandBlue'
              : 'bg-slate-950/80 border border-brandSky/30 text-brandSky'
          }`}>
            <Sparkles className="w-3 h-3 text-brandSky" />
            {afterLabel}
          </div>

          {/* Hint Overlay */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 bg-slate-900/80 backdrop-blur-md rounded-full text-white text-[10px] font-headline font-semibold tracking-wider opacity-85 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1.5 shadow">
            <MoveHorizontal className="w-3 h-3 text-brandSky" />
            <span>Drag slider to compare</span>
          </div>
        </div>
      )}

      {/* Side-by-Side Mode */}
      {viewMode === 'split' && (
        <div className="grid grid-cols-2 gap-3">
          <div className={`relative ${aspectRatio} rounded-2xl overflow-hidden border shadow-sm ${
            isLight ? 'border-rose-200 bg-slate-100' : 'border-rose-500/20 bg-slate-950'
          }`}>
            <img src={beforeImage} alt={`${alt} - Before`} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 bg-rose-600 text-white text-[9px] font-headline font-bold uppercase tracking-wider rounded shadow-sm">
              {beforeLabel}
            </div>
          </div>
          <div className={`relative ${aspectRatio} rounded-2xl overflow-hidden border shadow-sm ${
            isLight ? 'border-sky-200 bg-slate-100' : 'border-brandSky/30 bg-slate-950'
          }`}>
            <img src={afterImage} alt={`${alt} - After`} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 bg-brandBlue text-white text-[9px] font-headline font-bold uppercase tracking-wider rounded flex items-center gap-1 shadow-sm">
              <Sparkles className="w-2.5 h-2.5" />
              {afterLabel}
            </div>
          </div>
        </div>
      )}

      {/* Before Only Mode */}
      {viewMode === 'before' && (
        <div className={`relative w-full ${aspectRatio} rounded-2xl overflow-hidden border shadow-md ${
          isLight ? 'border-rose-200 bg-slate-100' : 'border-rose-500/30 bg-slate-950'
        }`}>
          <img src={beforeImage} alt={`${alt} - Before`} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-rose-600 text-white text-[10px] font-headline font-bold uppercase tracking-wider rounded-lg shadow">
            {beforeLabel} (Initial State)
          </div>
        </div>
      )}

      {/* After Only Mode */}
      {viewMode === 'after' && (
        <div className={`relative w-full ${aspectRatio} rounded-2xl overflow-hidden border shadow-md ${
          isLight ? 'border-sky-200 bg-slate-100' : 'border-brandSky/40 bg-slate-950'
        }`}>
          <img src={afterImage} alt={`${alt} - After`} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-brandBlue text-white text-[10px] font-headline font-bold uppercase tracking-wider rounded-lg shadow flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            {afterLabel} (Completed Result)
          </div>
        </div>
      )}
    </div>
  );
}
