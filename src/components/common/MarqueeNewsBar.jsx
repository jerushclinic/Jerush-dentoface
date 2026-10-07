import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Radio, X, ArrowRight, ExternalLink, Volume2, Sparkles, AlertCircle } from 'lucide-react';
import { marqueeService, MARQUEE_UPDATE_EVENT } from '../../services/marqueeService';

export default function MarqueeNewsBar() {
  const [items, setItems] = useState([]);
  const [settings, setSettings] = useState(null);
  const [dismissed, setDismissed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const loadData = async () => {
    try {
      const [fetchedItems, fetchedSettings] = await Promise.all([
        marqueeService.getItems(),
        marqueeService.getSettings(),
      ]);
      setItems(fetchedItems.filter(item => item.isActive));
      setSettings(fetchedSettings);
    } catch (e) {
      console.warn("Failed to load marquee news data:", e);
    }
  };

  useEffect(() => {
    loadData();

    // Listen to admin updates in realtime
    const handleUpdate = () => loadData();
    window.addEventListener(MARQUEE_UPDATE_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(MARQUEE_UPDATE_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  if (dismissed || !settings || !settings.enabled || items.length === 0) {
    return null;
  }

  // Slower, elegant animation speed durations
  const speedDurations = {
    slow: '90s',
    normal: '60s',
    fast: '35s',
  };

  const animDuration = speedDurations[settings.speed] || '60s';

  // Theme styles
  const themeClasses = {
    'dark-gradient': 'bg-gradient-to-r from-slate-950 via-[#071324] to-slate-950 text-slate-100 border-b border-brandSky/20 shadow-md',
    'brand-blue': 'bg-gradient-to-r from-brandBlue via-[#1a3c7a] to-brandBlue text-white border-b border-white/10 shadow-md',
    'sky-glow': 'bg-gradient-to-r from-brandBlue via-brandSky to-brandBlue text-white border-b border-cyan-400/30 shadow-md',
    'emerald-notice': 'bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-950 text-emerald-100 border-b border-emerald-500/30 shadow-md',
    'amber-alert': 'bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-amber-100 border-b border-amber-500/30 shadow-md',
  };

  const selectedTheme = themeClasses[settings.theme] || themeClasses['dark-gradient'];

  // Duplicate items array to ensure seamless infinite looping marquee width
  const displayItems = [...items, ...items, ...items];

  return (
    <div className={`relative z-[100] w-full text-xs font-body overflow-hidden transition-all duration-300 ${selectedTheme}`}>
      <div className="max-w-full mx-auto flex items-center h-9 sm:h-10 px-3 sm:px-4">
        
        {/* Left Fixed Badge: LIVE UPDATES */}
        {settings.showLiveBadge && (
          <div className="shrink-0 flex items-center gap-1.5 pr-2 sm:pr-3 border-r border-white/15 z-20 bg-inherit py-1">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandSky opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brandSky"></span>
            </span>
            <span className="font-headline font-black text-[9px] sm:text-[10px] tracking-wider uppercase flex items-center gap-1 text-brandSky dark:text-sky-300 whitespace-nowrap">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brandSky animate-pulse shrink-0" />
              <span>{settings.liveBadgeText || 'LIVE UPDATES'}</span>
            </span>
          </div>
        )}

        {/* Center Marquee Infinite Scrolling Content */}
        <div
          className="flex-1 overflow-hidden relative flex items-center h-full cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flex items-center gap-8 sm:gap-12 whitespace-nowrap will-change-transform"
            style={{
              animation: `marquee-left ${animDuration} linear infinite`,
              animationPlayState: isHovered && settings.pauseOnHover !== false ? 'paused' : 'running',
            }}
          >
            {displayItems.map((item, idx) => {
              const isExternal = item.link?.startsWith('http') || item.link?.startsWith('tel:');

              return (
                <div key={`${item.id}-${idx}`} className="flex items-center gap-2.5 shrink-0 py-0.5">
                  {/* Item Badge */}
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold tracking-widest uppercase shadow-sm ${item.badgeColor || 'bg-brandBlue text-white'}`}>
                      {item.badge}
                    </span>
                  )}

                  {/* Item News Title */}
                  <span className="font-medium text-[11px] sm:text-xs text-slate-100 hover:text-brandSky transition-colors tracking-wide">
                    {item.title}
                  </span>

                  {/* Optional Action Button / Link */}
                  {item.link && (
                    isExternal ? (
                      <a
                        href={item.link}
                        target={item.link.startsWith('http') ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-brandSky hover:text-white border border-white/20 text-[10px] font-headline font-bold uppercase tracking-wider transition-all duration-200"
                      >
                        <span>{item.linkText || 'Action'}</span>
                        <ExternalLink className="w-2.5 h-2.5 ml-0.5 opacity-80" />
                      </a>
                    ) : (
                      <Link
                        to={item.link}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-brandSky hover:text-white border border-white/20 text-[10px] font-headline font-bold uppercase tracking-wider transition-all duration-200"
                      >
                        <span>{item.linkText || 'View'}</span>
                        <ArrowRight className="w-2.5 h-2.5 ml-0.5 opacity-80" />
                      </Link>
                    )
                  )}

                  {/* Separator icon */}
                  <span className="text-white/20 ml-2 select-none">•</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Dismiss Button */}
        <div className="shrink-0 pl-2 border-l border-white/15 z-20 bg-inherit flex items-center">
          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-white/10 transition-colors"
            title="Dismiss Announcement Bar"
            aria-label="Dismiss Marquee"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
