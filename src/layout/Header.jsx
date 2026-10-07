import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Phone, Search, Bell, X, ChevronDown, Building2, Calendar, Sparkles, Check } from 'lucide-react';
import MarqueeNewsBar from '../components/common/MarqueeNewsBar';

const renderDentalIconItem = (to, label, iconFile, handleLinkClick, isMobile = false) => {
  const iconSrc = iconFile ? `/images/icons/dental/${iconFile}` : null;
  if (isMobile) {
    return (
      <Link to={to} onClick={handleLinkClick} className="flex flex-row items-center gap-3 py-1.5 group w-full text-left">
        <span className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-slate-800/90 border border-slate-700/80 p-1 shrink-0 group-hover:scale-105 group-hover:border-brandSky/60 transition-all overflow-hidden">
          {iconSrc ? (
            <>
              <img
                src={iconSrc}
                alt={label}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.nextElementSibling) e.currentTarget.nextElementSibling.style.display = 'flex';
                }}
              />
              <span style={{ display: 'none' }} className="w-full h-full items-center justify-center text-brandSky">
                <Sparkles className="w-4 h-4" />
              </span>
            </>
          ) : (
            <span className="w-full h-full flex items-center justify-center text-brandSky">
              <Sparkles className="w-4 h-4" />
            </span>
          )}
        </span>
        <span className="text-slate-200 font-medium text-[0.875rem] group-hover:text-white transition-colors leading-snug">{label}</span>
      </Link>
    );
  }

  return (
    <Link to={to} onClick={handleLinkClick} className="flex items-center gap-2.5 py-0.5 group text-slate-800 hover:text-brandBlue transition-all">
      <span className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-50/90 via-sky-50/80 to-white border border-sky-100 p-1 shadow-[0_1px_4px_rgba(30,151,212,0.1)] shrink-0 group-hover:scale-105 group-hover:shadow-[0_3px_10px_rgba(30,151,212,0.2)] group-hover:border-brandSky/40 transition-all overflow-hidden">
        {iconSrc ? (
          <>
            <img
              src={iconSrc}
              alt={label}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.nextElementSibling) e.currentTarget.nextElementSibling.style.display = 'flex';
              }}
            />
            <span style={{ display: 'none' }} className="w-full h-full items-center justify-center text-brandBlue">
              <Sparkles className="w-3.5 h-3.5 text-brandSky" />
            </span>
          </>
        ) : (
          <span className="w-full h-full flex items-center justify-center text-brandBlue">
            <Sparkles className="w-3.5 h-3.5 text-brandSky" />
          </span>
        )}
      </span>
      <span className="font-semibold text-[13px] leading-tight group-hover:translate-x-0.5 transition-transform">{label}</span>
    </Link>
  );
};

const renderSkinIconItem = (to, label, iconFile, handleLinkClick, isMobile = false) => {
  const iconSrc = iconFile ? `/images/icons/skin/${iconFile}` : null;
  if (isMobile) {
    return (
      <Link to={to} onClick={handleLinkClick} className="flex flex-row items-center gap-3 py-1.5 group w-full text-left">
        <span className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-slate-800/90 border border-slate-700/80 p-1 shrink-0 group-hover:scale-105 group-hover:border-brandSky/60 transition-all overflow-hidden">
          {iconSrc ? (
            <>
              <img
                src={iconSrc}
                alt={label}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.nextElementSibling) e.currentTarget.nextElementSibling.style.display = 'flex';
                }}
              />
              <span style={{ display: 'none' }} className="w-full h-full items-center justify-center text-brandSky">
                <Sparkles className="w-4 h-4" />
              </span>
            </>
          ) : (
            <span className="w-full h-full flex items-center justify-center text-brandSky">
              <Sparkles className="w-4 h-4" />
            </span>
          )}
        </span>
        <span className="text-slate-200 font-medium text-[0.875rem] group-hover:text-white transition-colors leading-snug">{label}</span>
      </Link>
    );
  }

  return (
    <Link to={to} onClick={handleLinkClick} className="flex items-center gap-2.5 py-0.5 group text-slate-800 hover:text-brandBlue transition-all">
      <span className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-50/90 via-sky-50/80 to-white border border-sky-100 p-1 shadow-[0_1px_4px_rgba(30,151,212,0.1)] shrink-0 group-hover:scale-105 group-hover:shadow-[0_3px_10px_rgba(30,151,212,0.2)] group-hover:border-brandSky/40 transition-all overflow-hidden">
        {iconSrc ? (
          <>
            <img
              src={iconSrc}
              alt={label}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.nextElementSibling) e.currentTarget.nextElementSibling.style.display = 'flex';
              }}
            />
            <span style={{ display: 'none' }} className="w-full h-full items-center justify-center text-brandBlue">
              <Sparkles className="w-3.5 h-3.5 text-brandSky" />
            </span>
          </>
        ) : (
          <span className="w-full h-full flex items-center justify-center text-brandBlue">
            <Sparkles className="w-3.5 h-3.5 text-brandSky" />
          </span>
        )}
      </span>
      <span className="font-semibold text-[13px] leading-tight group-hover:translate-x-0.5 transition-transform">{label}</span>
    </Link>
  );
};

const renderHairIconItem = (to, label, iconFile, handleLinkClick, isMobile = false) => {
  const iconSrc = iconFile ? `/images/icons/hair/${iconFile}` : null;
  if (isMobile) {
    return (
      <Link to={to} onClick={handleLinkClick} className="flex flex-row items-center gap-3 py-1.5 group w-full text-left">
        <span className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-slate-800/90 border border-slate-700/80 p-1 shrink-0 group-hover:scale-105 group-hover:border-brandSky/60 transition-all overflow-hidden">
          {iconSrc ? (
            <>
              <img
                src={iconSrc}
                alt={label}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.nextElementSibling) e.currentTarget.nextElementSibling.style.display = 'flex';
                }}
              />
              <span style={{ display: 'none' }} className="w-full h-full items-center justify-center text-brandSky">
                <Sparkles className="w-4 h-4" />
              </span>
            </>
          ) : (
            <span className="w-full h-full flex items-center justify-center text-brandSky">
              <Sparkles className="w-4 h-4" />
            </span>
          )}
        </span>
        <span className="text-slate-200 font-medium text-[0.875rem] group-hover:text-white transition-colors leading-snug">{label}</span>
      </Link>
    );
  }

  return (
    <Link to={to} onClick={handleLinkClick} className="flex items-center gap-2.5 py-0.5 group text-slate-800 hover:text-brandBlue transition-all">
      <span className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-50/90 via-sky-50/80 to-white border border-sky-100 p-1 shadow-[0_1px_4px_rgba(30,151,212,0.1)] shrink-0 group-hover:scale-105 group-hover:shadow-[0_3px_10px_rgba(30,151,212,0.2)] group-hover:border-brandSky/40 transition-all overflow-hidden">
        {iconSrc ? (
          <>
            <img
              src={iconSrc}
              alt={label}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.nextElementSibling) e.currentTarget.nextElementSibling.style.display = 'flex';
              }}
            />
            <span style={{ display: 'none' }} className="w-full h-full items-center justify-center text-brandBlue">
              <Sparkles className="w-3.5 h-3.5 text-brandSky" />
            </span>
          </>
        ) : (
          <span className="w-full h-full flex items-center justify-center text-brandBlue">
            <Sparkles className="w-3.5 h-3.5 text-brandSky" />
          </span>
        )}
      </span>
      <span className="font-semibold text-[13px] leading-tight group-hover:translate-x-0.5 transition-transform">{label}</span>
    </Link>
  );
};

const renderBodyIconItem = (to, label, iconFile, handleLinkClick, isMobile = false) => {
  const iconSrc = iconFile ? `/images/icons/body/${iconFile}` : null;
  if (isMobile) {
    return (
      <Link to={to} onClick={handleLinkClick} className="flex flex-row items-center gap-3 py-1.5 group w-full text-left">
        <span className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-slate-800/90 border border-slate-700/80 p-1 shrink-0 group-hover:scale-105 group-hover:border-brandSky/60 transition-all overflow-hidden">
          {iconSrc ? (
            <>
              <img
                src={iconSrc}
                alt={label}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.nextElementSibling) e.currentTarget.nextElementSibling.style.display = 'flex';
                }}
              />
              <span style={{ display: 'none' }} className="w-full h-full items-center justify-center text-brandSky">
                <Sparkles className="w-4 h-4" />
              </span>
            </>
          ) : (
            <span className="w-full h-full flex items-center justify-center text-brandSky">
              <Sparkles className="w-4 h-4" />
            </span>
          )}
        </span>
        <span className="text-slate-200 font-medium text-[0.875rem] group-hover:text-white transition-colors leading-snug">{label}</span>
      </Link>
    );
  }

  return (
    <Link to={to} onClick={handleLinkClick} className="flex items-center gap-2.5 py-0.5 group text-slate-800 hover:text-brandBlue transition-all">
      <span className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-50/90 via-sky-50/80 to-white border border-sky-100 p-1 shadow-[0_1px_4px_rgba(30,151,212,0.1)] shrink-0 group-hover:scale-105 group-hover:shadow-[0_3px_10px_rgba(30,151,212,0.2)] group-hover:border-brandSky/40 transition-all overflow-hidden">
        {iconSrc ? (
          <>
            <img
              src={iconSrc}
              alt={label}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.nextElementSibling) e.currentTarget.nextElementSibling.style.display = 'flex';
              }}
            />
            <span style={{ display: 'none' }} className="w-full h-full items-center justify-center text-brandBlue">
              <Sparkles className="w-3.5 h-3.5 text-brandSky" />
            </span>
          </>
        ) : (
          <span className="w-full h-full flex items-center justify-center text-brandBlue">
            <Sparkles className="w-3.5 h-3.5 text-brandSky" />
          </span>
        )}
      </span>
      <span className="font-semibold text-[13px] leading-tight group-hover:translate-x-0.5 transition-transform">{label}</span>
    </Link>
  );
};

const renderMobileTreatmentItem = (to, label, iconFile, folder, handleLinkClick) => {
  const iconSrc = iconFile ? `/images/icons/${folder}/${iconFile}` : null;
  return (
    <Link
      key={to + label}
      to={to}
      onClick={handleLinkClick}
      className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-brandSky/50 backdrop-blur-md transition-all group"
    >
      <span className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900/80 border border-white/15 p-1 shadow-xs shrink-0 group-hover:scale-105 group-hover:border-brandSky/60 transition-all overflow-hidden">
        {iconSrc ? (
          <>
            <img
              src={iconSrc}
              alt={label}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.nextElementSibling) e.currentTarget.nextElementSibling.style.display = 'flex';
              }}
            />
            <span style={{ display: 'none' }} className="w-full h-full items-center justify-center text-brandSky">
              <Sparkles className="w-3.5 h-3.5 text-brandSky" />
            </span>
          </>
        ) : (
          <span className="w-full h-full flex items-center justify-center text-brandSky">
            <Sparkles className="w-3.5 h-3.5 text-brandSky" />
          </span>
        )}
      </span>
      <span className="text-[12px] font-semibold text-slate-200 group-hover:text-brandSky transition-colors leading-tight line-clamp-2">
        {label}
      </span>
    </Link>
  );
};


export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const hasHeroBanner = location.pathname === '/' || location.pathname === '/careers' || location.pathname === '/careers/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileNavStack, setMobileNavStack] = useState(['root']);
  const currentScreen = mobileNavStack[mobileNavStack.length - 1] || 'root';
  const pushNav = (screen) => setMobileNavStack((prev) => [...prev, screen]);
  const popNav = () => setMobileNavStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : ['root']));
  const resetNav = () => setMobileNavStack(['root']);

  const [activeAccordion, setActiveAccordion] = useState(null);
  const [activeSubAccordion, setActiveSubAccordion] = useState(null);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const lastScrollY = useRef(0);
  const headerRef = useRef(null);

  // Dynamically measure header and topbar heights and set CSS variables
  useEffect(() => {
    const updateHeaderHeights = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
      const topbarEl = document.querySelector('.jerush-topbar');
      if (topbarEl && window.innerWidth >= 1280) {
        const measured = topbarEl.offsetHeight;
        const topbarHeight = measured > 10 ? measured : 44;
        document.documentElement.style.setProperty('--topbar-height', `${topbarHeight}px`);
      } else {
        document.documentElement.style.setProperty('--topbar-height', '0px');
      }
    };

    updateHeaderHeights();

    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(updateHeaderHeights);
      if (headerRef.current) resizeObserver.observe(headerRef.current);
      const topbarEl = document.querySelector('.jerush-topbar');
      if (topbarEl) resizeObserver.observe(topbarEl);
    }
    window.addEventListener('resize', updateHeaderHeights);

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeaderHeights);
    };
  }, []);

  // Desktop Megamenu Category tabs state
  const [aboutActiveTab, setAboutActiveTab] = useState('about-legacy');
  const [treatmentsActiveTab, setTreatmentsActiveTab] = useState('dental-services');
  const [galleryActiveTab, setGalleryActiveTab] = useState('gallery-cases');
  const [activeHoverMenu, setActiveHoverMenu] = useState(null);
  const hoverTimeoutRef = useRef(null);

  const handleMenuEnter = (menu) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setActiveHoverMenu(menu);
  };

  const handleMenuLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveHoverMenu(null);
      hoverTimeoutRef.current = null;
    }, 120);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // Synchronize nav-hidden class on <html> document element for smooth sticky sub-nav coordination
  useEffect(() => {
    if (isNavHidden) {
      document.documentElement.classList.add('nav-hidden');
    } else {
      document.documentElement.classList.remove('nav-hidden');
    }
    return () => {
      document.documentElement.classList.remove('nav-hidden');
    };
  }, [isNavHidden]);

  // Handle scroll events for sticky header and smooth hide-on-scroll-down / show-on-scroll-up
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const safeScrollY = Math.max(0, currentScrollY);

          // Scrolled state: main navbar turns fixed & solid white when past top contact bar
          if (safeScrollY > 40) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }

          // If mobile menu is open, keep navbar visible
          if (isMobileMenuOpen) {
            setIsNavHidden(false);
            lastScrollY.current = safeScrollY;
            ticking = false;
            return;
          }

          // When near the top of the page, always show navbar
          if (safeScrollY <= 60) {
            setIsNavHidden(false);
            lastScrollY.current = safeScrollY;
          } else {
            const scrollDelta = safeScrollY - lastScrollY.current;
            const maxScroll = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
            const isNearBottom = maxScroll > 0 && safeScrollY >= maxScroll - 25;

            // Scroll down: hide navbar smoothly once past banner threshold
            if (scrollDelta > 8 && safeScrollY > 90) {
              setIsNavHidden(true);
              lastScrollY.current = safeScrollY;
              setActiveHoverMenu(null);
              setLangDropdownOpen(false);
              setMobileLangOpen(false);
            }
            // Scroll up: reveal navbar smoothly unless bouncing at page bottom
            else if (scrollDelta < -6 && !isNearBottom) {
              setIsNavHidden(false);
              lastScrollY.current = safeScrollY;
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  // Load translation state from cookie on mount
  useEffect(() => {
    const getTranslateCookie = () => {
      const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
      return match ? match[1] : 'en';
    };
    setSelectedLang(getTranslateCookie());
  }, []);

  // Handle window resize to automatically close mobile drawer on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset navigation and scroll states on page navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
    resetNav();
    setIsScrolled(false);
    setIsNavHidden(false);
    setActiveHoverMenu(null);
    lastScrollY.current = 0;
    document.documentElement.classList.remove('nav-hidden');
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('jerush-mobile-nav-open');
    } else {
      document.body.classList.remove('jerush-mobile-nav-open');
      resetNav();
      setLangDropdownOpen(false);
    }
    return () => {
      document.body.classList.remove('jerush-mobile-nav-open');
    };
  }, [isMobileMenuOpen]);

  const toggleLangDropdown = () => setLangDropdownOpen(!langDropdownOpen);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.jerush-lang-selector')) {
        setLangDropdownOpen(false);
        setMobileLangOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const selectLanguage = (langCode) => {
    setSelectedLang(langCode);
    setLangDropdownOpen(false);
    setMobileLangOpen(false);

    const domain = window.location.hostname;

    // 1. Clear existing conflicting cookies
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;
    if (domain !== 'localhost' && domain !== '127.0.0.1') {
      const parts = domain.split('.');
      if (parts.length > 2) {
        const parentDomain = parts.slice(-2).join('.');
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${parentDomain};`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${parentDomain};`;
      }
    }

    // 2. Set the new cookie value
    const cookieVal = `/en/${langCode}`;
    document.cookie = `googtrans=${cookieVal}; path=/;`;
    if (domain !== 'localhost' && domain !== '127.0.0.1') {
      document.cookie = `googtrans=${cookieVal}; path=/; domain=.${domain}`;
    }

    // 3. Force reload to ensure Google Translate element initializes clean translation
    window.location.reload();
  };

  const [isForceClosed, setIsForceClosed] = useState(false);

  const handleLinkClick = () => {
    setIsForceClosed(true);
    setActiveHoverMenu(null);
    setTimeout(() => setIsForceClosed(false), 2000);
    setIsMobileMenuOpen(false);
    resetNav();
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleScrollToSection = (sectionId, e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  // Toggle Accordion for Mobile Drawer
  const handleAccordionToggle = (menuName) => {
    setActiveAccordion(activeAccordion === menuName ? null : menuName);
    setActiveSubAccordion(null);
  };

  const handleSubAccordionToggle = (subMenuName) => {
    setActiveSubAccordion(activeSubAccordion === subMenuName ? null : subMenuName);
  };

  const langLabels = {
    en: 'en',
    ta: 'ta',
    ar: 'ar',
    hi: 'hi',
    ml: 'ml',
    te: 'te',
  };

  const langRegions = {
    en: 'us',
    ta: 'in',
    ar: 'ae',
    hi: 'in',
    ml: 'in',
    te: 'in',
  };

  // Shared Desktop Megamenu Quick Links list
  const renderQuickLinks = () => (
    <div className="jerush-megamenu-quicklinks">
      <h5 className="jerush-ql-title">Quick Links</h5>
      <div className="jerush-ql-list">
        {/* Emergency Support */}
        <a href="tel:+919489160055" className="jerush-ql-item ql-item-emergency">
          <div className="jerush-ql-item-icon">
            <svg className="jerush-ql-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </div>
          <div className="jerush-ql-item-text">
            <span className="jerush-ql-item-label">Emergency Support</span>
            <span className="jerush-ql-item-val">+91 94891 60055</span>
          </div>
          <svg className="jerush-ql-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </a>

        {/* Dubai Helpline */}
        <a href="tel:+971507253105" className="jerush-ql-item ql-item-dubai">
          <div className="jerush-ql-item-icon">
            <svg className="jerush-ql-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
          </div>
          <div className="jerush-ql-item-text">
            <span className="jerush-ql-item-label">Dubai Helpline</span>
            <span className="jerush-ql-item-val">+971 50725 3105</span>
          </div>
          <svg className="jerush-ql-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </a>

        {/* General Inquiry */}
        <a href="tel:+919751010107" className="jerush-ql-item ql-item-inquiry">
          <div className="jerush-ql-item-icon">
            <svg className="jerush-ql-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <div className="jerush-ql-item-text">
            <span className="jerush-ql-item-label">General Inquiry</span>
            <span className="jerush-ql-item-val">+91 97510 10107</span>
          </div>
          <svg className="jerush-ql-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </a>

        {/* Online Booking */}
        <Link to="/contact" onClick={handleLinkClick} className="jerush-ql-item ql-item-appointment">
          <div className="jerush-ql-item-icon">
            <svg className="jerush-ql-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <div className="jerush-ql-item-text">
            <span className="jerush-ql-item-label">Online Booking</span>
            <span className="jerush-ql-item-val">Book Appointment</span>
          </div>
          <svg className="jerush-ql-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </Link>

        {/* Our Specialists */}
        <Link to="/doctors" onClick={handleLinkClick} className="jerush-ql-item ql-item-doctors">
          <div className="jerush-ql-item-icon">
            <svg className="jerush-ql-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div className="jerush-ql-item-text">
            <span className="jerush-ql-item-label">Our Specialists</span>
            <span className="jerush-ql-item-val">Find Doctors</span>
          </div>
          <svg className="jerush-ql-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </Link>

        {/* Contact Us */}
        <Link to="/contact" onClick={handleLinkClick} className="jerush-ql-item ql-item-contact">
          <div className="jerush-ql-item-icon">
            <svg className="jerush-ql-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <div className="jerush-ql-item-text">
            <span className="jerush-ql-item-label">Clinic Locations</span>
            <span className="jerush-ql-item-val">Contact Us</span>
          </div>
          <svg className="jerush-ql-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="jerush-wrapper">
      {/* Top Bar / Contact Information Area */}
      <div className="jerush-topbar">
        <div className="jerush-container">
          <div className="jerush-topbar-inner">
            <div className="jerush-topbar-contacts">
              <a href="tel:+919489160055" className="jerush-contact-item">
                <svg className="jerush-icon shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="jerush-loc-name">Thuckalay:</span>
                <span className="jerush-loc-phone">+91 94891 60055</span>
              </a>
              <a href="tel:+919489160011" className="jerush-contact-item">
                <svg className="jerush-icon shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="jerush-loc-name">Trichy:</span>
                <span className="jerush-loc-phone">+91 94891 60011</span>
              </a>
              <a href="tel:+919751010107" className="jerush-contact-item">
                <svg className="jerush-icon shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="jerush-loc-name">Chennai:</span>
                <span className="jerush-loc-phone">+91 97510 10107</span>
              </a>
              <a href="tel:+971507253105" className="jerush-contact-item">
                <svg className="jerush-icon shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="jerush-loc-name">Dubai:</span>
                <span className="jerush-loc-phone">+971 50725 3105</span>
              </a>

              {/* Book Appointment CTA Button Placed Next to Dubai */}
              <Link
                to="/contact"
                onClick={handleLinkClick}
                className="jerush-topbar-cta inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-brandSky to-[#1686bd] hover:from-[#38bdf8] hover:to-brandSky text-white font-headline font-bold text-xs shadow-xs hover:shadow transition-all uppercase tracking-wider shrink-0 ml-1"
              >
                <svg className="w-3.5 h-3.5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>Book Appointment</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar Anchor & Wrapper to prevent layout shift */}
      <div className={`jerush-header-placeholder ${hasHeroBanner ? 'has-hero-banner' : ''} ${isScrolled ? 'is-scrolled' : ''}`}>
        <header
          ref={headerRef}
          className={`jerush-header ${hasHeroBanner ? 'hero-banner-header' : 'non-home-header'} ${isScrolled ? 'sticky-nav is-fixed mobile-scrolled' : ''} ${isNavHidden ? 'nav-hide' : ''}`}
        >
          {/* Top Marquee News Bar */}
          <MarqueeNewsBar />

          <div className="jerush-container">
            <div className="jerush-navbar jerush-split-navbar">
              {/* Mobile Navigation Header (< xl) */}
              <div className="flex xl:hidden items-center justify-between w-full h-full px-2">
                {/* Brand Logo */}
                <div className="jerush-logo">
                  <Link to="/" onClick={handleLinkClick} rel="home">
                    <img
                      src="/images/logo/jerush-logo.webp"
                      alt="Jerush Logo"
                      className="jerush-logo-img"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const fallback = document.getElementById('mobile-logo-text-fallback');
                        if (fallback) fallback.style.display = 'block';
                      }}
                    />
                    <span id="mobile-logo-text-fallback" style={{ display: 'none' }} className="jerush-logo-text">JERUSH DENTOFACE</span>
                  </Link>
                </div>

                {/* Mobile Right Controls: Book Appt CTA + Language Switcher + Hamburger */}
                <div className="flex items-center gap-2.5 sm:gap-3.5">
                  {/* Mobile Book Appointment Pill Button */}
                  <Link
                    to="/contact"
                    onClick={handleLinkClick}
                    className="jerush-mobile-top-cta inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-brandSky to-[#1686bd] text-white font-headline font-bold text-[11px] sm:text-xs shadow-sm hover:shadow transition-all shrink-0 uppercase tracking-wider"
                  >
                    <svg className="w-3 h-3 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>Book Appt</span>
                  </Link>

                  {/* Mobile Language Selector Dropdown */}
                  <div className="jerush-lang-selector relative notranslate z-30">
                    <button
                      id="mobileLangSelectBtn"
                      className="flex items-center gap-1 px-2 py-1 rounded-full border text-[11px] font-headline font-bold transition-all"
                      onClick={() => setMobileLangOpen(!mobileLangOpen)}
                      aria-haspopup="true"
                      aria-expanded={mobileLangOpen}
                    >
                      <span className="uppercase">{selectedLang}</span>
                      <svg className="w-2.5 h-2.5 arrow-icon" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {mobileLangOpen && (
                      <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50">
                        <a href="#" onClick={(e) => { e.preventDefault(); selectLanguage('en'); setMobileLangOpen(false); }} className={`lang-dropdown-item ${selectedLang === 'en' ? 'active' : ''}`}>
                          <span className="flex items-center gap-2">
                            <span className="lang-country-code">US</span>
                            <span className="lang-name">English</span>
                          </span>
                          {selectedLang === 'en' && <span className="lang-checkmark">✓</span>}
                        </a>
                        <a href="#" onClick={(e) => { e.preventDefault(); selectLanguage('ta'); setMobileLangOpen(false); }} className={`lang-dropdown-item ${selectedLang === 'ta' ? 'active' : ''}`}>
                          <span className="flex items-center gap-2">
                            <span className="lang-country-code">IN</span>
                            <span className="lang-name">Tamil</span>
                          </span>
                          {selectedLang === 'ta' && <span className="lang-checkmark">✓</span>}
                        </a>
                        <a href="#" onClick={(e) => { e.preventDefault(); selectLanguage('ar'); setMobileLangOpen(false); }} className={`lang-dropdown-item ${selectedLang === 'ar' ? 'active' : ''}`}>
                          <span className="flex items-center gap-2">
                            <span className="lang-country-code">AE</span>
                            <span className="lang-name">Arabic</span>
                          </span>
                          {selectedLang === 'ar' && <span className="lang-checkmark">✓</span>}
                        </a>
                        <a href="#" onClick={(e) => { e.preventDefault(); selectLanguage('hi'); setMobileLangOpen(false); }} className={`lang-dropdown-item ${selectedLang === 'hi' ? 'active' : ''}`}>
                          <span className="flex items-center gap-2">
                            <span className="lang-country-code">IN</span>
                            <span className="lang-name">Hindi</span>
                          </span>
                          {selectedLang === 'hi' && <span className="lang-checkmark">✓</span>}
                        </a>
                        <a href="#" onClick={(e) => { e.preventDefault(); selectLanguage('ml'); setMobileLangOpen(false); }} className={`lang-dropdown-item ${selectedLang === 'ml' ? 'active' : ''}`}>
                          <span className="flex items-center gap-2">
                            <span className="lang-country-code">IN</span>
                            <span className="lang-name">Malayalam</span>
                          </span>
                          {selectedLang === 'ml' && <span className="lang-checkmark">✓</span>}
                        </a>
                        <a href="#" onClick={(e) => { e.preventDefault(); selectLanguage('te'); setMobileLangOpen(false); }} className={`lang-dropdown-item ${selectedLang === 'te' ? 'active' : ''}`}>
                          <span className="flex items-center gap-2">
                            <span className="lang-country-code">IN</span>
                            <span className="lang-name">Telugu</span>
                          </span>
                          {selectedLang === 'te' && <span className="lang-checkmark">✓</span>}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Mobile Menu Toggle Button (Hamburger) */}
                  <button
                    className="jerush-hamburger"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-expanded={isMobileMenuOpen}
                    aria-label="Toggle Navigation"
                  >
                    <span className="jerush-bar"></span>
                    <span className="jerush-bar"></span>
                    <span className="jerush-bar"></span>
                  </button>
                </div>
              </div>

              {/* Desktop Left Wing (4 Tabs): Home, About Jerush, Medical Services, Smile Stories */}
              <div className="hidden xl:flex jerush-nav-wing jerush-nav-wing-left">
                <nav className="jerush-nav" aria-label="Main Navigation Left Wing" onMouseLeave={handleMenuLeave}>
                  <ul className="jerush-nav-list">

                    {/* Home Nav Link */}
                    <li className="jerush-nav-item" onMouseEnter={() => handleMenuEnter(null)}>
                      <NavLink to="/" className={({ isActive }) => `jerush-nav-link ${isActive && location.pathname === '/' ? 'active-trigger' : ''}`} onClick={handleLinkClick}>
                        Home
                      </NavLink>
                    </li>

                    {/* About Us Mega Menu Trigger */}
                    <li className={`jerush-nav-item jerush-mega-trigger ${activeHoverMenu === 'about' ? 'open' : ''}`} onMouseEnter={() => handleMenuEnter('about')} onMouseLeave={handleMenuLeave}>
                      <Link to="/about" onClick={handleLinkClick} className="jerush-nav-link font-headline">
                        About Jerush <span className="jerush-arrow"></span>
                      </Link>

                      {/* About Us Mega Menu Panel - Clean Multi-Column Layout (No Vertical Tabs) */}
                      <div className={`jerush-megamenu ${isForceClosed ? 'force-closed' : ''}`}>
                        <div className="jerush-megamenu-inner">
                          {/* Full-width Multi-Column Content */}
                          <div className="jerush-megamenu-content !p-6 flex-grow">
                            <div className="grid grid-cols-4 gap-6">
                              {/* Col 1: Our Legacy & History */}
                              <div className="jerush-grid-column">
                                <h5 className="font-headline font-bold text-sm text-primary mb-3 pb-2 border-b border-slate-200/80">Our Legacy</h5>
                                <ul className="space-y-2">
                                  <li><Link to="/about" onClick={handleLinkClick} className="text-xs font-semibold text-slate-700 hover:text-brandBlue transition-colors block">About Our Hospital</Link></li>
                                  <li><Link to="/about/milestones-legacy" onClick={handleLinkClick} className="text-xs font-semibold text-slate-700 hover:text-brandBlue transition-colors block">Milestones & Legacy</Link></li>
                                  <li><Link to="/about" onClick={handleLinkClick} className="text-xs font-semibold text-slate-700 hover:text-brandBlue transition-colors block">Modern Facilities</Link></li>
                                  <li><Link to="/about" onClick={handleLinkClick} className="text-xs font-semibold text-slate-700 hover:text-brandBlue transition-colors block">Precision Diagnostics</Link></li>
                                </ul>
                              </div>

                              {/* Col 2: Leadership */}
                              <div className="jerush-grid-column">
                                <h5 className="font-headline font-bold text-sm text-primary mb-3 pb-2 border-b border-slate-200/80">Leadership</h5>
                                <ul className="space-y-2">
                                  <li><Link to="/leadership/dr-a-bladbin-chairman-founder" onClick={handleLinkClick} className="text-xs font-semibold text-slate-700 hover:text-brandBlue transition-colors block">Dr. A. Bladbin (Chairman & Founder)</Link></li>
                                  <li><Link to="/leadership/dr-c-binila-bladbin-managing-director" onClick={handleLinkClick} className="text-xs font-semibold text-slate-700 hover:text-brandBlue transition-colors block">Dr. C. Binila Bladbin (MD)</Link></li>
                                  <li><Link to="/leadership/dr-a-prabin-chief-executive-officer" onClick={handleLinkClick} className="text-xs font-semibold text-slate-700 hover:text-brandBlue transition-colors block">Dr. A. Prabin (CEO)</Link></li>
                                </ul>
                              </div>

                              {/* Col 3: Medical Team & Care */}
                              <div className="jerush-grid-column">
                                <h5 className="font-headline font-bold text-sm text-primary mb-3 pb-2 border-b border-slate-200/80">Doctors & Team</h5>
                                <ul className="space-y-2">
                                  <li><Link to="/doctors" onClick={handleLinkClick} className="text-xs font-semibold text-slate-700 hover:text-brandBlue transition-colors block">Meet Our Doctors</Link></li>
                                  <li><Link to="/meet-our-team" onClick={handleLinkClick} className="text-xs font-semibold text-slate-700 hover:text-brandBlue transition-colors block">Clinical & Support Team</Link></li>
                                  <li><Link to="/careers" onClick={handleLinkClick} className="text-xs font-semibold text-slate-700 hover:text-brandBlue transition-colors block">Careers at Jerush</Link></li>
                                  <li><Link to="/events" onClick={handleLinkClick} className="text-xs font-semibold text-slate-700 hover:text-brandBlue transition-colors block">Events & Seminars</Link></li>
                                </ul>
                              </div>

                              {/* Col 4: Quality & Ethics */}
                              <div className="jerush-grid-column">
                                <h5 className="font-headline font-bold text-sm text-primary mb-3 pb-2 border-b border-slate-200/80">Quality & Standards</h5>
                                <ul className="space-y-2">
                                  <li><Link to="/about/clinical-excellence" onClick={handleLinkClick} className="text-xs font-semibold text-slate-700 hover:text-brandBlue transition-colors block">Clinical Excellence</Link></li>
                                  <li><Link to="/about/ethical-healthcare" onClick={handleLinkClick} className="text-xs font-semibold text-slate-700 hover:text-brandBlue transition-colors block">Ethical Healthcare</Link></li>
                                  <li><Link to="/editorial-standards" onClick={handleLinkClick} className="text-xs font-semibold text-slate-700 hover:text-brandBlue transition-colors block">Editorial Standards</Link></li>
                                  <li><Link to="/reviews" onClick={handleLinkClick} className="text-xs font-semibold text-slate-700 hover:text-brandBlue transition-colors block">Patient Reviews</Link></li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          {/* Right Sidebar: Quick Links */}
                          {renderQuickLinks()}
                        </div>
                      </div>
                    </li>

                    {/* Medical Services Mega Menu Trigger */}
                    <li className={`jerush-nav-item jerush-mega-trigger ${activeHoverMenu === 'treatments' ? 'open' : ''}`} onMouseEnter={() => handleMenuEnter('treatments')} onMouseLeave={handleMenuLeave}>
                      <Link to="/treatments" onClick={handleLinkClick} className="jerush-nav-link font-headline">
                        Medical Services <span className="jerush-arrow"></span>
                      </Link>

                      {/* Treatments Mega Menu Panel */}
                      <div className={`jerush-megamenu ${isForceClosed ? 'force-closed' : ''}`}>
                        <div className="jerush-megamenu-inner">
                          {/* Left Sidebar Categories */}
                          <div className="jerush-megamenu-sidebar">
                            <button
                              className={`jerush-category-tab ${treatmentsActiveTab === 'dental-services' ? 'active' : ''}`}
                              onMouseEnter={() => setTreatmentsActiveTab('dental-services')}
                              onClick={() => setTreatmentsActiveTab('dental-services')}
                            >
                              <span className="flex items-center gap-3 pointer-events-none">
                                <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-slate-950 border border-brandSky/60 shadow-[0_0_10px_rgba(30,151,212,0.5)] overflow-hidden shrink-0 isolate pointer-events-none">
                                  <img src="/gifs/dental-care.gif" alt="Dental Treatments" loading="eager" className="w-full h-full object-cover scale-110 pointer-events-none" />
                                  <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-brandSky/40 pointer-events-none" />
                                </span>
                                <span>Dental Treatments</span>
                              </span>
                              <span className="jerush-tab-arrow"></span>
                            </button>
                            <button
                              className={`jerush-category-tab ${treatmentsActiveTab === 'cosmetic-dermatology' ? 'active' : ''}`}
                              onMouseEnter={() => setTreatmentsActiveTab('cosmetic-dermatology')}
                              onClick={() => setTreatmentsActiveTab('cosmetic-dermatology')}
                            >
                              <span className="flex items-center gap-3 pointer-events-none">
                                <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-slate-950 border border-brandSky/60 shadow-[0_0_10px_rgba(30,151,212,0.5)] overflow-hidden shrink-0 isolate pointer-events-none">
                                  <img src="/gifs/cosmetic.gif" alt="Skin & Laser Treatments" loading="eager" className="w-full h-full object-cover scale-110 pointer-events-none" />
                                  <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-brandSky/40 pointer-events-none" />
                                </span>
                                <span>Skin & Laser Treatments</span>
                              </span>
                              <span className="jerush-tab-arrow"></span>
                            </button>
                            <button
                              className={`jerush-category-tab ${treatmentsActiveTab === 'hair-restoration' ? 'active' : ''}`}
                              onMouseEnter={() => setTreatmentsActiveTab('hair-restoration')}
                              onClick={() => setTreatmentsActiveTab('hair-restoration')}
                            >
                              <span className="flex items-center gap-3 pointer-events-none">
                                <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-slate-950 border border-brandSky/60 shadow-[0_0_10px_rgba(30,151,212,0.5)] overflow-hidden shrink-0 isolate pointer-events-none">
                                  <img src="/gifs/hair.gif" alt="Hair Restoration" loading="eager" className="w-full h-full object-cover scale-110 pointer-events-none" />
                                  <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-brandSky/40 pointer-events-none" />
                                </span>
                                <span>Hair Restoration</span>
                              </span>
                              <span className="jerush-tab-arrow"></span>
                            </button>
                            <button
                              className={`jerush-category-tab ${treatmentsActiveTab === 'body-contouring' ? 'active' : ''}`}
                              onMouseEnter={() => setTreatmentsActiveTab('body-contouring')}
                              onClick={() => setTreatmentsActiveTab('body-contouring')}
                            >
                              <span className="flex items-center gap-3 pointer-events-none">
                                <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-slate-950 border border-brandSky/60 shadow-[0_0_10px_rgba(30,151,212,0.5)] overflow-hidden shrink-0 isolate pointer-events-none">
                                  <img src="/gifs/body-reduction.gif" alt="Body Contouring & Wellness" loading="eager" className="w-full h-full object-cover scale-110 pointer-events-none" />
                                  <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-brandSky/40 pointer-events-none" />
                                </span>
                                <span>Body Contouring & Wellness</span>
                              </span>
                              <span className="jerush-tab-arrow"></span>
                            </button>
                          </div>

                          {/* Right Content Panel */}
                          <div className="jerush-megamenu-content">
                            {/* Dental Treatments Pane */}
                            <div className={`jerush-megamenu-pane ${treatmentsActiveTab === 'dental-services' ? 'active' : ''}`}>
                              <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-100">
                                <div>
                                  <h4 className="jerush-pane-title !mb-0.5">Dental Treatments</h4>
                                  <p className="text-xs text-slate-500 font-medium">Specialized Departments & Clinical Procedures</p>
                                </div>
                                <Link
                                  to="/treatments?category=dental"
                                  onClick={handleLinkClick}
                                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50/80 hover:bg-brandBlue text-brandBlue hover:text-white font-headline text-xs font-bold transition-all shadow-xs group"
                                >
                                  <span>Explore All Dental Procedures</span>
                                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                              </div>

                              <div className="jerush-grid-4cols">
                                {/* Column 1: Kids, Cosmetic, Orthodontic */}
                                <div className="jerush-grid-column">
                                  <div className="jerush-megamenu-subgroup">
                                    <h5>
                                      <Link to="/treatments?category=dental&sub=Kids%20Dentistry%20%2F%20Pedodontics" onClick={handleLinkClick} className="hover:text-brandBlue transition-colors block w-full">
                                        Kids Dentistry / Pedodontics
                                      </Link>
                                    </h5>
                                    <ul>
                                      <li>{renderDentalIconItem('/treatments/pediatric-dentistry', 'Pediatric Dental Care', 'pediatric-dental-care.webp', handleLinkClick)}</li>
                                      <li>{renderDentalIconItem('/treatments/pulpectomy', 'Painless Root Canal', 'pulpectomy.webp', handleLinkClick)}</li>
                                      <li>{renderDentalIconItem('/treatments/pit-fissure-sealants', 'Pit & Fissure Sealants', 'pit-fissure-sealants.webp', handleLinkClick)}</li>
                                      <li>{renderDentalIconItem('/treatments/habit-breaking-appliances', 'Habit Appliances', 'habit-breaking-appliances.webp', handleLinkClick)}</li>
                                    </ul>
                                  </div>
                                  <div className="jerush-megamenu-subgroup">
                                    <h5>
                                      <Link to="/treatments?category=dental&sub=Cosmetic%20Dentistry" onClick={handleLinkClick} className="hover:text-brandBlue transition-colors block w-full">
                                        Cosmetic Dentistry
                                      </Link>
                                    </h5>
                                    <ul>
                                      <li>{renderDentalIconItem('/treatments/smile-designing', 'Smile Designing', 'smile-designing.webp', handleLinkClick)}</li>
                                      <li>{renderDentalIconItem('/treatments/dental-veneers', 'Veneers & Laminates', 'veneers.webp', handleLinkClick)}</li>
                                      <li>{renderDentalIconItem('/treatments/tooth-jewellery', 'Tooth Jewellery', 'tooth-jewellery.webp', handleLinkClick)}</li>
                                    </ul>
                                  </div>
                                  <div className="jerush-megamenu-subgroup">
                                    <h5>
                                      <Link to="/treatments?category=dental&sub=Orthodontic%20Care" onClick={handleLinkClick} className="hover:text-brandBlue transition-colors block w-full">
                                        Orthodontic Care
                                      </Link>
                                    </h5>
                                    <ul>
                                      <li>{renderDentalIconItem('/dental-treatments/top-quality-invisible-clear-aligners-jerushaligne', 'Jerushaligne Aligners', 'clear-aligner.webp', handleLinkClick)}</li>
                                      <li>{renderDentalIconItem('/treatments/metal-braces', 'Metal Braces', 'metal-braces.webp', handleLinkClick)}</li>
                                      <li>{renderDentalIconItem('/treatments/ceramic-braces', 'Ceramic & Lingual Braces', 'ceramic-braces.webp', handleLinkClick)}</li>
                                    </ul>
                                  </div>
                                </div>

                                {/* Column 2: Prosthodontic, Endodontic, Geriatric */}
                                <div className="jerush-grid-column">
                                  <div className="jerush-megamenu-subgroup">
                                    <h5>
                                      <Link to="/treatments?category=dental&sub=Prosthodontic%20Care%20%2F%20Tooth%20Replacement" onClick={handleLinkClick} className="hover:text-brandBlue transition-colors block w-full">
                                        Prosthodontic Care
                                      </Link>
                                    </h5>
                                    <ul>
                                      <li>{renderDentalIconItem('/dental-implants', 'Dental Implants & All-on-4', 'dental-implant.webp', handleLinkClick)}</li>
                                      <li>{renderDentalIconItem('/treatments/dental-crowns-bridges', 'Crowns & Bridges', 'dental-crown-bridge.webp', handleLinkClick)}</li>
                                      <li>{renderDentalIconItem('/treatments/dentures', 'Precision Complete Dentures', 'denture.webp', handleLinkClick)}</li>
                                      <li>{renderDentalIconItem('/treatments/fixed-partial-denture', 'Fixed Partial Dentures', 'fixed-partial-dentures.webp', handleLinkClick)}</li>
                                    </ul>
                                  </div>
                                  <div className="jerush-megamenu-subgroup">
                                    <h5>
                                      <Link to="/treatments?category=dental&sub=Endodontic%20Care" onClick={handleLinkClick} className="hover:text-brandBlue transition-colors block w-full">
                                        Endodontic Care
                                      </Link>
                                    </h5>
                                    <ul>
                                      <li>{renderDentalIconItem('/dental-treatments/root-canal-treatment-in-tamilnadu', 'Single Visit Rotary RCT', 'root-canal.webp', handleLinkClick)}</li>
                                      <li>{renderDentalIconItem('/treatments/tooth-coloured-fillings', 'Tooth Restorations', 'tooth-colored-fillings.webp', handleLinkClick)}</li>
                                      <li>{renderDentalIconItem('/treatments/post-and-core', 'Post & Core Reconstruction', 'teeth-post-core.webp', handleLinkClick)}</li>
                                    </ul>
                                  </div>
                                  <div className="jerush-megamenu-subgroup">
                                    <h5>
                                      <Link to="/treatments?category=dental&sub=Geriatric%20Dentistry" onClick={handleLinkClick} className="hover:text-brandBlue transition-colors block w-full">
                                        Geriatric Dentistry
                                      </Link>
                                    </h5>
                                    <ul>
                                      <li>{renderDentalIconItem('/treatments/geriatric-dental-care', 'Geriatric Dental Care', 'denture.webp', handleLinkClick)}</li>
                                      <li>{renderDentalIconItem('/treatments/dentures', 'Complete & Flexible Dentures', 'denture.webp', handleLinkClick)}</li>
                                    </ul>
                                  </div>
                                </div>

                                {/* Column 3: Periodontal, Maxillofacial, Oral Medicine */}
                                <div className="jerush-grid-column">
                                  <div className="jerush-megamenu-subgroup">
                                    <h5>
                                      <Link to="/treatments?category=dental&sub=Periodontal%20%2F%20Gum%20Care" onClick={handleLinkClick} className="hover:text-brandBlue transition-colors block w-full">
                                        Periodontal / Gum Care
                                      </Link>
                                    </h5>
                                    <ul>
                                      <li>{renderDentalIconItem('/treatments/deep-teeth-cleaning', 'Deep Ultrasonic Scaling', 'deep-teeth-cleaning.webp', handleLinkClick)}</li>
                                      <li>{renderDentalIconItem('/treatments/gum-surgery', 'Regenerative Flap Surgery', 'gum-surgery.webp', handleLinkClick)}</li>
                                      <li>{renderDentalIconItem('/treatments/gum-grafting', 'Bone & Tissue Grafting', 'gum-grafting.webp', handleLinkClick)}</li>
                                      <li>{renderDentalIconItem('/treatments/crown-lengthening', 'Crown Lengthening', 'crown-lengthening.webp', handleLinkClick)}</li>
                                    </ul>
                                  </div>
                                  <div className="jerush-megamenu-subgroup">
                                    <h5>
                                      <Link to="/treatments?category=dental&sub=Oral%20%26%20Maxillofacial%20Care" onClick={handleLinkClick} className="hover:text-brandBlue transition-colors block w-full">
                                        Oral & Maxillofacial Care
                                      </Link>
                                    </h5>
                                    <ul>
                                      <li>{renderDentalIconItem('/treatments/wisdom-tooth-removal', 'Wisdom Tooth Impaction', 'wisdom-tooth.webp', handleLinkClick)}</li>
                                      <li>{renderDentalIconItem('/treatments/jaw-surgery', 'Corrective Jaw Surgery', 'jaw-surgery.webp', handleLinkClick)}</li>
                                      <li>{renderDentalIconItem('/treatments/cleft-lip-palate', 'Cleft Lip & Palate Surgery', 'cleft-lip-palate.webp', handleLinkClick)}</li>
                                      <li>{renderDentalIconItem('/treatments/cyst-tumour-surgery', 'Cyst & Tumour Surgery', 'cyst-tumour-surgery.webp', handleLinkClick)}</li>
                                    </ul>
                                  </div>
                                  <div className="jerush-megamenu-subgroup">
                                    <h5>
                                      <Link to="/treatments?category=dental&sub=Oral%20Medicine" onClick={handleLinkClick} className="hover:text-brandBlue transition-colors block w-full">
                                        Oral Medicine
                                      </Link>
                                    </h5>
                                    <ul>
                                      <li>{renderDentalIconItem('/treatments/oral-disease-management', 'Oral Disease Management', 'pediatric-dental-care.webp', handleLinkClick)}</li>
                                      <li>{renderDentalIconItem('/treatments/precancerous-lesion-management', 'Precancerous Lesion Care', 'oral-cancer-screen.webp', handleLinkClick)}</li>
                                    </ul>
                                  </div>
                                </div>

                                {/* Column 4: Dental Radiology, TMJ Care, Community Dentistry */}
                                <div className="jerush-grid-column">
                                  <div className="jerush-megamenu-subgroup">
                                    <h5>
                                      <Link to="/treatments?category=dental&sub=Radiology" onClick={handleLinkClick} className="hover:text-brandBlue transition-colors block w-full">
                                        Dental Radiology
                                      </Link>
                                    </h5>
                                    <ul>
                                      <li>{renderDentalIconItem('/treatments/cbct-3d', 'CBCT 3D Cone Beam Imaging', 'cbct-3d.webp', handleLinkClick)}</li>
                                      <li>{renderDentalIconItem('/treatments/opg', 'OPG Panoramic Digital X-Ray', 'opg.webp', handleLinkClick)}</li>
                                      <li>{renderDentalIconItem('/treatments/cephalo-frontal-view', 'Cephalo & Sinus Views', 'cephalo-frontal-view.webp', handleLinkClick)}</li>
                                    </ul>
                                  </div>
                                  <div className="jerush-megamenu-subgroup">
                                    <h5>
                                      <Link to="/treatments?category=dental&sub=Temporomandibular%20Joint%20(TMJ)%20Care" onClick={handleLinkClick} className="hover:text-brandBlue transition-colors block w-full">
                                        TMJ Care
                                      </Link>
                                    </h5>
                                    <ul>
                                      <li>{renderDentalIconItem('/treatments/tmj-splints', 'TMJ Soft & Hard Splints', 'soft-splints.webp', handleLinkClick)}</li>
                                      <li>{renderDentalIconItem('/treatments/night-guards', 'Bruxism Night Guards', 'night-guards.webp', handleLinkClick)}</li>
                                      <li>{renderDentalIconItem('/treatments/botox', 'TMJ Botox for Bruxism', 'botox-treatment.webp', handleLinkClick)}</li>
                                    </ul>
                                  </div>
                                  <div className="jerush-megamenu-subgroup">
                                    <h5>
                                      <Link to="/treatments?category=dental&sub=Community%20Dentistry" onClick={handleLinkClick} className="hover:text-brandBlue transition-colors block w-full">
                                        Community Dentistry
                                      </Link>
                                    </h5>
                                    <ul>
                                      <li>{renderDentalIconItem('/treatments/dental-health-camps', 'Dental Health Camps', 'dental-health-camps.webp', handleLinkClick)}</li>
                                      <li>{renderDentalIconItem('/dental-treatments/oral-pathology-screening', 'Oral Cancer Screening', 'oral-cancer-screen.webp', handleLinkClick)}</li>
                                      <li>{renderDentalIconItem('/treatments/oral-health-care', 'Community Oral Health Care', 'oral-health-care.webp', handleLinkClick)}</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              {/* Bottom Highlight Strip */}
                              <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                                <span className="text-slate-500 font-medium">Looking for a specialized dental procedure? Search our complete clinical database.</span>
                                <Link to="/treatments?category=dental" onClick={handleLinkClick} className="font-bold text-brandBlue hover:text-brandSky flex items-center gap-1 transition-colors">
                                  <span>View All Dental Procedures</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </Link>
                              </div>
                            </div>

                            {/* Skin & Laser Treatments Pane */}
                            <div className={`jerush-megamenu-pane ${treatmentsActiveTab === 'cosmetic-dermatology' ? 'active' : ''}`}>
                              <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-slate-100">
                                <div>
                                  <h4 className="jerush-pane-title !mb-0.5">Skin & Laser Treatments</h4>
                                  <p className="text-xs text-slate-500 font-medium">8 Clinical Disciplines • 41 Advanced Procedures</p>
                                </div>
                                <Link
                                  to="/treatments?category=cosmetic"
                                  onClick={handleLinkClick}
                                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50/80 hover:bg-brandBlue text-brandBlue hover:text-white font-headline text-xs font-bold transition-all shadow-xs group"
                                >
                                  <span>Explore All 41 Skin & Laser Procedures</span>
                                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                              </div>

                              <div className="jerush-grid-4cols">
                                {/* Col 1: Acne & Pigmentation */}
                                <div className="jerush-grid-column">
                                  <div className="jerush-megamenu-subgroup">
                                    <h5>Acne & Scar Revision</h5>
                                    <ul>
                                      <li>{renderSkinIconItem('/treatments/acne-treatment', 'Active Acne Clearance', 'acne-treatment.webp', handleLinkClick)}</li>
                                      <li>{renderSkinIconItem('/cosmetic-dermatology-laser-treatments/fractional-co2-laser', 'Fractional CO2 Laser', 'acne-scar.webp', handleLinkClick)}</li>
                                      <li>{renderSkinIconItem('/treatments/tca-cross-peel', 'TCA Cross Peel for Scars', 'carbon-peel-laser.webp', handleLinkClick)}</li>
                                    </ul>
                                  </div>
                                  <div className="jerush-megamenu-subgroup">
                                    <h5>Pigmentation & Tone</h5>
                                    <ul>
                                      <li>{renderSkinIconItem('/treatments/pigmentation-treatment', 'Pigmentation Correction', 'pigmentation-treatment.webp', handleLinkClick)}</li>
                                      <li>{renderSkinIconItem('/treatments/melasma-treatment', 'Melasma Triple Therapy', 'melasma-teatment.webp', handleLinkClick)}</li>
                                      <li>{renderSkinIconItem('/treatments/uneven-skin-tone', 'Uneven Skin Tone', 'uneven-skin-tone.webp', handleLinkClick)}</li>
                                      <li>{renderSkinIconItem('/treatments/freckles-removal', 'Freckles Laser Removal', 'freckles-removal.webp', handleLinkClick)}</li>
                                    </ul>
                                  </div>
                                </div>

                                {/* Col 2: Medi-Facials & Laser Hair Removal */}
                                <div className="jerush-grid-column">
                                  <div className="jerush-megamenu-subgroup">
                                    <h5>Medi-Facials & Glow</h5>
                                    <ul>
                                      <li>{renderSkinIconItem('/treatments/hydrafacial', 'HydraFacial MD Elite', 'hydrafacial.webp', handleLinkClick)}</li>
                                      <li>{renderSkinIconItem('/treatments/carbon-peel-laser', 'Carbon Hollywood Laser', 'carbon-peel-laser.webp', handleLinkClick)}</li>
                                      <li>{renderSkinIconItem('/treatments/chemical-peel', 'Clinical Chemical Peels', 'carbon-peel-laser.webp', handleLinkClick)}</li>
                                      <li>{renderSkinIconItem('/treatments/skin-whitening', 'Glutathione Skin Brightening', 'skin-whitening.webp', handleLinkClick)}</li>
                                    </ul>
                                  </div>
                                  <div className="jerush-megamenu-subgroup">
                                    <h5>Laser Hair Removal</h5>
                                    <ul>
                                      <li>{renderSkinIconItem('/treatments/laser-hair-removal', 'Full Body Laser Hair Removal', 'full-body-laser-hair-removal.webp', handleLinkClick)}</li>
                                      <li>{renderSkinIconItem('/treatments/facial-laser-hair-removal', 'Facial Precision Hair Removal', 'facial-hair-removal.webp', handleLinkClick)}</li>
                                      <li>{renderSkinIconItem('/treatments/lip-brightening', 'Lip Brightening Laser', 'lip-brightening.webp', handleLinkClick)}</li>
                                    </ul>
                                  </div>
                                </div>

                                {/* Col 3: Anti-Ageing & Minor Dermatology */}
                                <div className="jerush-grid-column">
                                  <div className="jerush-megamenu-subgroup">
                                    <h5>Anti-Ageing & Aesthetics</h5>
                                    <ul>
                                      <li>{renderSkinIconItem('/treatments/botox', 'Botox Wrinkle Smoothing', 'botox-treatment.webp', handleLinkClick)}</li>
                                      <li>{renderSkinIconItem('/treatments/dermal-fillers', 'Hyaluronic Dermal Fillers', 'dermal-fillers.webp', handleLinkClick)}</li>
                                      <li>{renderSkinIconItem('/treatments/hifu-skin-tightening', 'HIFU Non-Surgical Facelift', 'hifu-skin-tightening.webp', handleLinkClick)}</li>
                                      <li>{renderSkinIconItem('/treatments/microdermabrasion', 'Diamond Microdermabrasion', 'microdermabrasion.webp', handleLinkClick)}</li>
                                    </ul>
                                  </div>
                                  <div className="jerush-megamenu-subgroup">
                                    <h5>Mole & Skin Growths</h5>
                                    <ul>
                                      <li>{renderSkinIconItem('/treatments/mole-removal', 'RF Mole Removal', 'mole-removal.webp', handleLinkClick)}</li>
                                      <li>{renderSkinIconItem('/treatments/wart-removal', 'Wart & Verruca Removal', 'wart-removal-treatment.webp', handleLinkClick)}</li>
                                      <li>{renderSkinIconItem('/treatments/skin-tag-removal', 'Skin Tag Vaporization', 'benign-skin-growth-removal.webp', handleLinkClick)}</li>
                                      <li>{renderSkinIconItem('/treatments/xanthelasma-removal', 'Xanthelasma Removal', 'xanthelasma-removal.webp', handleLinkClick)}</li>
                                    </ul>
                                  </div>
                                </div>

                                {/* Col 4: Cosmetic Surgery & Clinical Dermatology */}
                                <div className="jerush-grid-column">
                                  <div className="jerush-megamenu-subgroup">
                                    <h5>Cosmetic Facial Surgery</h5>
                                    <ul>
                                      <li>{renderSkinIconItem('/treatments/rhinoplasty', 'Rhinoplasty (Nose Reshaping)', 'rhinoplasty.webp', handleLinkClick)}</li>
                                      <li>{renderSkinIconItem('/treatments/facial-surgery', 'Facial Aesthetic Surgery', 'facial-surgery-icon.webp', handleLinkClick)}</li>
                                      <li>{renderSkinIconItem('/treatments/lip-correction-surgery', 'Lip Correction Surgery', 'lip-correction-surgery.webp', handleLinkClick)}</li>
                                      <li>{renderSkinIconItem('/treatments/scar-revision-surgery', 'Precision Scar Revision', 'scar-revision-surgery.webp', handleLinkClick)}</li>
                                    </ul>
                                  </div>
                                  <div className="jerush-megamenu-subgroup">
                                    <h5>Clinical Dermatology</h5>
                                    <ul>
                                      <li>{renderSkinIconItem('/treatments/excimer-laser-therapy', 'Excimer Laser for Vitiligo', 'excimer-laser-therapy.webp', handleLinkClick)}</li>
                                      <li>{renderSkinIconItem('/treatments/psoriasis-treatment', 'Psoriasis Biological Therapy', 'psoriasis-treatment.webp', handleLinkClick)}</li>
                                      <li>{renderSkinIconItem('/treatments/keloid-treatment', 'Keloid Intralesional Therapy', 'keloid-treatment.webp', handleLinkClick)}</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              {/* Bottom Highlight Strip */}
                              <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                                <span className="text-slate-500 font-medium">Looking for customized laser or skin rejuvenation? View the complete dermatology suite.</span>
                                <Link to="/treatments?category=cosmetic" onClick={handleLinkClick} className="font-bold text-brandBlue hover:text-brandSky flex items-center gap-1 transition-colors">
                                  <span>Search Dermatology Catalogue</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </Link>
                              </div>
                            </div>

                            {/* Hair Restoration Pane */}
                            <div className={`jerush-megamenu-pane ${treatmentsActiveTab === 'hair-restoration' ? 'active' : ''}`}>
                              <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-slate-100">
                                <div>
                                  <h4 className="jerush-pane-title !mb-0.5">Hair Restoration</h4>
                                  <p className="text-xs text-slate-500 font-medium">3 Clinical Disciplines • 12 Advanced Protocols</p>
                                </div>
                                <Link
                                  to="/treatments?category=hair"
                                  onClick={handleLinkClick}
                                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50/80 hover:bg-brandBlue text-brandBlue hover:text-white font-headline text-xs font-bold transition-all shadow-xs group"
                                >
                                  <span>Explore All 12 Hair Procedures</span>
                                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                              </div>

                              <div className="jerush-grid-4cols">
                                <div className="jerush-grid-column">
                                  <div className="jerush-megamenu-subgroup">
                                    <h5>Regenerative Therapies</h5>
                                    <ul>
                                      <li>{renderHairIconItem('/treatments/prp-hair-treatment', 'PRP Hair Therapy', 'prp-hair-therapy.webp', handleLinkClick)}</li>
                                      <li>{renderHairIconItem('/hair-restoration-treatments/gfc-growth-factor-concentrate', 'GFC Growth Factor Therapy', 'gfc-hair-therapy.webp', handleLinkClick)}</li>
                                      <li>{renderHairIconItem('/treatments/qr678-hair-treatment', 'QR678 Neo Bio-Therapy', 'qr678-hair-therapy.webp', handleLinkClick)}</li>
                                      <li>{renderHairIconItem('/treatments/exocell-hair-treatment', 'Exocell Cellular Therapy', 'exocell-therapy.webp', handleLinkClick)}</li>
                                      <li>{renderHairIconItem('/treatments/biocell-hair-treatment', 'Bio Cell Regenerative Care', 'biocell-therapy.webp', handleLinkClick)}</li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="jerush-grid-column">
                                  <div className="jerush-megamenu-subgroup">
                                    <h5>Hair Transplantation</h5>
                                    <ul>
                                      <li>{renderHairIconItem('/hair-restoration-treatments/hair-transplant', 'Micro-FUE Hair Transplant', 'hair-transplant.webp', handleLinkClick)}</li>
                                      <li>{renderHairIconItem('/treatments/beard-transplant', 'Beard & Moustache Transplant', 'beard-transplant.webp', handleLinkClick)}</li>
                                      <li>{renderHairIconItem('/treatments/hairline-correction', 'Natural Hairline Design', 'hairline-correction.webp', handleLinkClick)}</li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="jerush-grid-column">
                                  <div className="jerush-megamenu-subgroup">
                                    <h5>Scalp Health & Detox</h5>
                                    <ul>
                                      <li>{renderHairIconItem('/treatments/dandruff-treatment', 'Anti-Dandruff Clinical Protocol', 'dandruff-treatment.webp', handleLinkClick)}</li>
                                      <li>{renderHairIconItem('/treatments/scalp-cleansing', 'Deep Scalp Detoxification', 'scalp-cleansing-treatment.webp', handleLinkClick)}</li>
                                      <li>{renderHairIconItem('/treatments/hair-growth-booster', 'Laser Scalp Growth Booster', 'hair-growth-booster.webp', handleLinkClick)}</li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="jerush-grid-column">
                                  <div className="rounded-2xl p-4 bg-gradient-to-br from-blue-50/80 via-sky-50/50 to-white border border-sky-100 flex flex-col justify-between h-full">
                                    <div>
                                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brandBlue/10 text-brandBlue text-[10px] font-bold uppercase tracking-wider font-headline mb-2">
                                        Clinical Excellence
                                      </span>
                                      <h5 className="!border-none !mb-1 font-headline font-bold text-sm text-[#0E2752]">
                                        Hair Restoration Care
                                      </h5>
                                      <p className="text-xs text-slate-500 leading-relaxed mt-1">
                                        High-density FUE follicle grafting & personalized growth protocols across 4 Regional Centres.
                                      </p>
                                    </div>
                                    <div className="mt-3 flex flex-col gap-1.5">
                                      <Link
                                        to="/hair-regrowth-results"
                                        onClick={handleLinkClick}
                                        className="inline-flex items-center gap-1 text-xs font-bold text-brandBlue hover:text-brandSky transition-colors"
                                      >
                                        <span>View Hair Regrowth Cases</span>
                                        <ChevronRight className="w-3.5 h-3.5" />
                                      </Link>
                                      <Link
                                        to="/treatments?category=hair"
                                        onClick={handleLinkClick}
                                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-brandBlue transition-colors"
                                      >
                                        <span>Browse All Hair Treatments →</span>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Body Contouring Pane */}
                            <div className={`jerush-megamenu-pane ${treatmentsActiveTab === 'body-contouring' ? 'active' : ''}`}>
                              <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-slate-100">
                                <div>
                                  <h4 className="jerush-pane-title !mb-0.5">Body Contouring & Wellness</h4>
                                  <p className="text-xs text-slate-500 font-medium">3 Clinical Disciplines • 8 Specialized Procedures</p>
                                </div>
                                <Link
                                  to="/treatments?category=body"
                                  onClick={handleLinkClick}
                                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50/80 hover:bg-brandBlue text-brandBlue hover:text-white font-headline text-xs font-bold transition-all shadow-xs group"
                                >
                                  <span>Explore All 8 Body Procedures</span>
                                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                              </div>

                              <div className="jerush-grid-4cols">
                                <div className="jerush-grid-column">
                                  <div className="jerush-megamenu-subgroup">
                                    <h5>Fat Reduction</h5>
                                    <ul>
                                      <li>{renderBodyIconItem('/body-contouring-wellness/cryo-cool-sculpting', 'Cryolipolysis 360° Fat Freeze', 'cryolipolysis-fat-reduction.webp', handleLinkClick)}</li>
                                      <li>{renderBodyIconItem('/treatments/emsculpt-body-contouring', 'EMSculpt Body Contouring', 'emsculpt-body-contouring.webp', handleLinkClick)}</li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="jerush-grid-column">
                                  <div className="jerush-megamenu-subgroup">
                                    <h5>Body Sculpting</h5>
                                    <ul>
                                      <li>{renderBodyIconItem('/treatments/muscle-toning', 'High-Intensity Muscle Toning', 'muscle-toning.webp', handleLinkClick)}</li>
                                      <li>{renderBodyIconItem('/treatments/rf-body-tightening', 'Multi-Polar RF Body Tightening', 'rf-body-tightening.webp', handleLinkClick)}</li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="jerush-grid-column">
                                  <div className="jerush-megamenu-subgroup">
                                    <h5>Pelvic Health & Wellness</h5>
                                    <ul>
                                      <li>{renderBodyIconItem('/treatments/emsella-chair', 'Emsella Chair Pelvic Therapy', 'emsella-chair-therapy.webp', handleLinkClick)}</li>
                                      <li>{renderBodyIconItem('/treatments/pelvic-floor-treatment', 'Pelvic Floor Strengthening', 'pelvic-floor-strengthening.webp', handleLinkClick)}</li>
                                      <li>{renderBodyIconItem('/treatments/clinical-wellness', 'Clinical Wellness Protocols', 'clinical-wellness-programs.webp', handleLinkClick)}</li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="jerush-grid-column">
                                  <div className="rounded-2xl p-4 bg-gradient-to-br from-blue-50/80 via-sky-50/50 to-white border border-sky-100 flex flex-col justify-between h-full">
                                    <div>
                                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brandBlue/10 text-brandBlue text-[10px] font-bold uppercase tracking-wider font-headline mb-2">
                                        Non-Invasive Suite
                                      </span>
                                      <h5 className="!border-none !mb-1 font-headline font-bold text-sm text-[#0E2752]">
                                        Body Transformation
                                      </h5>
                                      <p className="text-xs text-slate-500 leading-relaxed mt-1">
                                        Zero-downtime inch loss, medical muscle definition, and FDA-cleared pelvic floor rehabilitation.
                                      </p>
                                    </div>
                                    <div className="mt-3 flex flex-col gap-1.5">
                                      <Link
                                        to="/body-contouring-cases"
                                        onClick={handleLinkClick}
                                        className="inline-flex items-center gap-1 text-xs font-bold text-brandBlue hover:text-brandSky transition-colors"
                                      >
                                        <span>View Transformation Cases</span>
                                        <ChevronRight className="w-3.5 h-3.5" />
                                      </Link>
                                      <Link
                                        to="/treatments?category=body"
                                        onClick={handleLinkClick}
                                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-brandBlue transition-colors"
                                      >
                                        <span>Browse All Body Contouring →</span>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right Sidebar: Quick Links */}
                          {renderQuickLinks()}
                        </div>
                      </div>
                    </li>

                    {/* Smile Stories Mega Menu Trigger */}
                    <li className={`jerush-nav-item jerush-mega-trigger ${activeHoverMenu === 'gallery' ? 'open' : ''}`} onMouseEnter={() => handleMenuEnter('gallery')} onMouseLeave={handleMenuLeave}>
                      <Link to="/smile-stories" onClick={handleLinkClick} className="jerush-nav-link font-headline">
                        Smile Stories <span className="jerush-arrow"></span>
                      </Link>

                      {/* Gallery Mega Menu Panel */}
                      <div className={`jerush-megamenu ${isForceClosed ? 'force-closed' : ''}`}>
                        <div className="jerush-megamenu-inner">
                          {/* Left Sidebar Categories */}
                          <div className="jerush-megamenu-sidebar">
                            <button
                              className={`jerush-category-tab ${galleryActiveTab === 'gallery-cases' ? 'active' : ''}`}
                              onMouseEnter={() => setGalleryActiveTab('gallery-cases')}
                            >
                              Transformations
                              <span className="jerush-tab-arrow"></span>
                            </button>
                            <button
                              className={`jerush-category-tab ${galleryActiveTab === 'gallery-media' ? 'active' : ''}`}
                              onMouseEnter={() => setGalleryActiveTab('gallery-media')}
                            >
                              Media & Events
                              <span className="jerush-tab-arrow"></span>
                            </button>
                            <button
                              className={`jerush-category-tab ${galleryActiveTab === 'gallery-reviews' ? 'active' : ''}`}
                              onMouseEnter={() => setGalleryActiveTab('gallery-reviews')}
                            >
                              Patient Stories
                              <span className="jerush-tab-arrow"></span>
                            </button>
                          </div>

                          {/* Right Content Panel */}
                          <div className="jerush-megamenu-content">
                            {/* Transformations Pane */}
                            <div className={`jerush-megamenu-pane ${galleryActiveTab === 'gallery-cases' ? 'active' : ''}`}>
                              <h4 className="jerush-pane-title">Before & After Results</h4>
                              <div className="jerush-grid-3cols">
                                <div className="jerush-grid-column">
                                  <h5>Dentistry</h5>
                                  <ul>
                                    <li><Link to="/smile-transformations" onClick={handleLinkClick}>Smile Transformations</Link></li>
                                  </ul>
                                </div>
                                <div className="jerush-grid-column">
                                  <h5>Aesthetics</h5>
                                  <ul>
                                    <li><Link to="/cosmetic-resurfacing" onClick={handleLinkClick}>Cosmetic Resurfacing</Link></li>
                                    <li><Link to="/hair-regrowth-results" onClick={handleLinkClick}>Hair Regrowth Results</Link></li>
                                    <li><Link to="/body-contouring-cases" onClick={handleLinkClick}>Body Contouring Cases</Link></li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            {/* Media & Tours Pane */}
                            <div className={`jerush-megamenu-pane ${galleryActiveTab === 'gallery-media' ? 'active' : ''}`}>
                              <h4 className="jerush-pane-title">Tours & Outreach</h4>
                              <div className="jerush-grid-3cols">
                                <div className="jerush-grid-column">
                                  <h5>Hospital Tours</h5>
                                  <ul>
                                    <li><Link to="/video-testimonials" onClick={handleLinkClick}>Clinic Video Tour</Link></li>
                                    <li><Link to="/events" onClick={handleLinkClick}>Hospital Facilities</Link></li>
                                  </ul>
                                </div>
                                <div className="jerush-grid-column">
                                  <h5>Community</h5>
                                  <ul>
                                    <li><Link to="/camps" onClick={handleLinkClick}>Dental Health Camps</Link></li>
                                    <li><Link to="/events" onClick={handleLinkClick}>Wellness Seminars</Link></li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            {/* Patient Stories Pane */}
                            <div className={`jerush-megamenu-pane ${galleryActiveTab === 'gallery-reviews' ? 'active' : ''}`}>
                              <h4 className="jerush-pane-title">Patient Testimonials</h4>
                              <div className="jerush-grid-3cols">
                                <div className="jerush-grid-column">
                                  <h5>Direct Reviews</h5>
                                  <ul>
                                    <li><Link to="/video-testimonials" onClick={handleLinkClick}>Video Testimonials</Link></li>
                                    <li><Link to="/smile-transformations" onClick={handleLinkClick}>Photo Stories</Link></li>
                                  </ul>
                                </div>
                                <div className="jerush-grid-column">
                                  <h5>Third Party Feed</h5>
                                  <ul>
                                    <li><Link to="/reviews" onClick={handleLinkClick}>Google Reviews Feed</Link></li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right Sidebar: Quick Links */}
                          {renderQuickLinks()}
                        </div>
                      </div>
                    </li>

                  </ul>
                </nav>
              </div>

              {/* Desktop Center: Prominent Enlarged Logo */}
              <div className="jerush-logo jerush-logo-center hidden xl:flex">
                <Link to="/" onClick={handleLinkClick} rel="home" className="flex items-center group">
                  <img
                    src="/images/logo/jerush-logo.webp"
                    alt="Jerush Logo"
                    className="jerush-logo-img group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = document.getElementById('logo-text-fallback');
                      if (fallback) fallback.style.display = 'block';
                    }}
                  />
                  <span id="logo-text-fallback" style={{ display: 'none' }} className="jerush-logo-text">JERUSH DENTOFACE</span>
                </Link>
              </div>

              {/* Desktop Right Wing (4 Tabs): Medical Insights, Careers, Jerush Events, Contact Us */}
              <div className="hidden xl:flex jerush-nav-wing jerush-nav-wing-right">
                <nav className="jerush-nav" aria-label="Main Navigation Right Wing" onMouseLeave={handleMenuLeave}>
                  <ul className="jerush-nav-list">
                    <li className="jerush-nav-item" onMouseEnter={() => handleMenuEnter(null)}>
                      <NavLink to="/blog" className={({ isActive }) => `jerush-nav-link ${isActive ? 'active-trigger' : ''}`} onClick={handleLinkClick}>
                        Medical Insights
                      </NavLink>
                    </li>
                    <li className="jerush-nav-item" onMouseEnter={() => handleMenuEnter(null)}>
                      <NavLink to="/careers" className={({ isActive }) => `jerush-nav-link ${isActive ? 'active-trigger' : ''}`} onClick={handleLinkClick}>
                        Careers
                      </NavLink>
                    </li>
                    <li className="jerush-nav-item" onMouseEnter={() => handleMenuEnter(null)}>
                      <NavLink to="/events" state={{ reset: Date.now() }} className={({ isActive }) => `jerush-nav-link ${isActive ? 'active-trigger' : ''}`} onClick={handleLinkClick}>
                        Jerush Events
                      </NavLink>
                    </li>
                    <li className="jerush-nav-item" onMouseEnter={() => handleMenuEnter(null)}>
                      <NavLink to="/contact" className={({ isActive }) => `jerush-nav-link ${isActive ? 'active-trigger' : ''}`} onClick={handleLinkClick}>
                        Contact Us
                      </NavLink>
                    </li>
                  </ul>
                </nav>

                {/* Action Buttons: Language Selector Dropdown & Book Appointment CTA */}
                <div className="jerush-nav-cta flex items-center gap-2 shrink-0">
                  {/* Language Selector Dropdown */}
                  <div className="jerush-lang-selector notranslate z-30 mr-1">
                    <button
                      id="langSelectBtn"
                      onClick={toggleLangDropdown}
                      aria-haspopup="true"
                      aria-expanded={langDropdownOpen}
                    >
                      <span className="flex items-center gap-0.5">
                        <span className="text-[10px] text-slate-400 font-semibold lowercase">{langRegions[selectedLang]}</span>
                        <span className="font-bold uppercase ml-0.5">{langLabels[selectedLang]}</span>
                      </span>
                      <svg className="arrow-icon" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {langDropdownOpen && (
                      <div id="langDropdown" className="block">
                        <a href="#" onClick={(e) => { e.preventDefault(); selectLanguage('en'); }} className={`lang-dropdown-item ${selectedLang === 'en' ? 'active' : ''}`}>
                          <span className="flex items-center gap-3">
                            <span className="lang-country-code">US</span>
                            <span className="lang-name">English</span>
                          </span>
                          {selectedLang === 'en' && <span className="lang-checkmark">✓</span>}
                        </a>
                        <a href="#" onClick={(e) => { e.preventDefault(); selectLanguage('ta'); }} className={`lang-dropdown-item ${selectedLang === 'ta' ? 'active' : ''}`}>
                          <span className="flex items-center gap-3">
                            <span className="lang-country-code">IN</span>
                            <span className="lang-name">Tamil</span>
                          </span>
                          {selectedLang === 'ta' && <span className="lang-checkmark">✓</span>}
                        </a>
                        <a href="#" onClick={(e) => { e.preventDefault(); selectLanguage('ar'); }} className={`lang-dropdown-item ${selectedLang === 'ar' ? 'active' : ''}`}>
                          <span className="flex items-center gap-3">
                            <span className="lang-country-code">AE</span>
                            <span className="lang-name">Arabic</span>
                          </span>
                          {selectedLang === 'ar' && <span className="lang-checkmark">✓</span>}
                        </a>
                        <a href="#" onClick={(e) => { e.preventDefault(); selectLanguage('hi'); }} className={`lang-dropdown-item ${selectedLang === 'hi' ? 'active' : ''}`}>
                          <span className="flex items-center gap-3">
                            <span className="lang-country-code">IN</span>
                            <span className="lang-name">Hindi</span>
                          </span>
                          {selectedLang === 'hi' && <span className="lang-checkmark">✓</span>}
                        </a>
                        <a href="#" onClick={(e) => { e.preventDefault(); selectLanguage('ml'); }} className={`lang-dropdown-item ${selectedLang === 'ml' ? 'active' : ''}`}>
                          <span className="flex items-center gap-3">
                            <span className="lang-country-code">IN</span>
                            <span className="lang-name">Malayalam</span>
                          </span>
                          {selectedLang === 'ml' && <span className="lang-checkmark">✓</span>}
                        </a>
                        <a href="#" onClick={(e) => { e.preventDefault(); selectLanguage('te'); }} className={`lang-dropdown-item ${selectedLang === 'te' ? 'active' : ''}`}>
                          <span className="flex items-center gap-3">
                            <span className="lang-country-code">IN</span>
                            <span className="lang-name">Telugu</span>
                          </span>
                          {selectedLang === 'te' && <span className="lang-checkmark">✓</span>}
                        </a>
                      </div>
                    )}
                  </div>

                  <Link to="/contact" onClick={handleLinkClick} className="jerush-cta-btn-premium whitespace-nowrap shrink-0">
                    <span className="cta-icon-wrapper shrink-0">
                      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </span>
                    <span className="cta-text-wrapper whitespace-nowrap">Book Appointment</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Navigation Drawer Overlay */}
      <div
        className={`jerush-mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* Mobile Navigation Drawer Container - Apollo Style Drill-down Navigation */}
      <div className={`jerush-mobile-drawer ${isMobileMenuOpen ? 'active' : ''}`}>
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-white/10 bg-[#071324]/95 backdrop-blur-xl sticky top-0 z-20 shrink-0">
          {/* Logo - Enlarged for Prominence & Clarity */}
          <Link to="/" onClick={handleLinkClick} className="flex items-center pl-0.5 shrink-0">
            <img
              src="/images/logo/jerush-logo.webp"
              alt="Jerush Dentofacial Logo"
              className="h-11 sm:h-12 w-auto object-contain brightness-0 invert transition-all"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </Link>

          {/* Action Buttons Right - Phone & Close with generous spacing */}
          <div className="flex items-center gap-3.5 sm:gap-4">
            {/* Phone Call Button - Jerush Blue Gradient */}
            <a
              href="tel:+919489160055"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-brandSky via-[#198BC8] to-brandBlue text-white flex items-center justify-center shadow-[0_2px_10px_rgba(30,151,212,0.4)] hover:scale-105 active:scale-95 transition-transform shrink-0"
              title="Call Jerush Hospital"
              aria-label="Call Jerush Hospital"
            >
              <Phone className="w-4 h-4 text-white fill-white" />
            </a>

            {/* Close Button - X */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white hover:text-brandSky active:scale-95 transition-all shrink-0"
              aria-label="Close Navigation Drawer"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* Drawer Scrollable Body with Clean Drill-down Navigation */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 pb-16 bg-transparent text-left">
          {/* Submenu "GO BACK" Bar with Jerush Accent */}
          {currentScreen !== 'root' && (
            <div className="pt-1 pb-3 mb-4 border-b border-white/10 flex items-center">
              <button
                onClick={popNav}
                className="inline-flex items-center gap-2.5 text-brandSky hover:text-white transition-colors group cursor-pointer py-1"
              >
                <span className="w-7 h-7 rounded-full bg-white/10 border border-white/20 group-hover:bg-brandSky group-hover:border-brandSky flex items-center justify-center transition-all shadow-2xs">
                  <ArrowLeft className="w-3.5 h-3.5 text-brandSky group-hover:text-white transition-colors stroke-[2.5]" />
                </span>
                <span className="font-headline font-bold text-xs sm:text-sm tracking-wider uppercase text-slate-200 group-hover:text-white transition-colors">
                  GO BACK
                </span>
              </button>
            </div>
          )}

          {/* ───────── SCREEN 1: ROOT MENU (Jerush Signature Design) ───────── */}
          {currentScreen === 'root' && (
            <div className="jerush-mobile-screen">
              {/* Primary Navigation Items with Jerush Chevrons */}
              <div className="space-y-1">
                <button
                  onClick={() => pushNav('about')}
                  className="w-full flex items-center justify-between py-3.5 sm:py-4 text-left font-headline font-bold text-[15px] sm:text-base tracking-wide text-white hover:text-brandSky uppercase group transition-colors"
                >
                  <span className="group-hover:translate-x-1 transition-transform">ABOUT JERUSH</span>
                  <span className="w-7 h-7 rounded-full bg-white/10 border border-white/15 group-hover:bg-brandSky group-hover:border-brandSky flex items-center justify-center transition-all shadow-2xs">
                    <ChevronRight className="w-3.5 h-3.5 text-brandSky group-hover:text-white transition-colors" />
                  </span>
                </button>

                <button
                  onClick={() => pushNav('centres')}
                  className="w-full flex items-center justify-between py-3.5 sm:py-4 text-left font-headline font-bold text-[15px] sm:text-base tracking-wide text-white hover:text-brandSky uppercase group transition-colors"
                >
                  <span className="group-hover:translate-x-1 transition-transform">FIND A CENTRE</span>
                  <span className="w-7 h-7 rounded-full bg-white/10 border border-white/15 group-hover:bg-brandSky group-hover:border-brandSky flex items-center justify-center transition-all shadow-2xs">
                    <ChevronRight className="w-3.5 h-3.5 text-brandSky group-hover:text-white transition-colors" />
                  </span>
                </button>

                <button
                  onClick={() => pushNav('services')}
                  className="w-full flex items-center justify-between py-3.5 sm:py-4 text-left font-headline font-bold text-[15px] sm:text-base tracking-wide text-white hover:text-brandSky uppercase group transition-colors"
                >
                  <span className="group-hover:translate-x-1 transition-transform">MEDICAL SERVICES</span>
                  <span className="w-7 h-7 rounded-full bg-white/10 border border-white/15 group-hover:bg-brandSky group-hover:border-brandSky flex items-center justify-center transition-all shadow-2xs">
                    <ChevronRight className="w-3.5 h-3.5 text-brandSky group-hover:text-white transition-colors" />
                  </span>
                </button>

                <button
                  onClick={() => pushNav('stories')}
                  className="w-full flex items-center justify-between py-3.5 sm:py-4 text-left font-headline font-bold text-[15px] sm:text-base tracking-wide text-white hover:text-brandSky uppercase group transition-colors"
                >
                  <span className="group-hover:translate-x-1 transition-transform">SMILE STORIES & RESULTS</span>
                  <span className="w-7 h-7 rounded-full bg-white/10 border border-white/15 group-hover:bg-brandSky group-hover:border-brandSky flex items-center justify-center transition-all shadow-2xs">
                    <ChevronRight className="w-3.5 h-3.5 text-brandSky group-hover:text-white transition-colors" />
                  </span>
                </button>
              </div>

              {/* Direct Action Links */}
              <div className="mt-3 space-y-0.5 border-t border-white/10 pt-3">
                <Link
                  to="/doctors"
                  onClick={handleLinkClick}
                  className="block py-2.5 text-[14.5px] font-medium text-slate-300 hover:text-white hover:translate-x-1 transition-all"
                >
                  Meet Our Doctors
                </Link>
                <Link
                  to="/meet-our-team"
                  onClick={handleLinkClick}
                  className="block py-2.5 text-[14.5px] font-medium text-slate-300 hover:text-white hover:translate-x-1 transition-all"
                >
                  Clinical Team & Specialists
                </Link>
                <Link
                  to="/blog"
                  onClick={handleLinkClick}
                  className="block py-2.5 text-[14.5px] font-medium text-slate-300 hover:text-white hover:translate-x-1 transition-all"
                >
                  Medical Insights & Blog
                </Link>
                <Link
                  to="/careers"
                  onClick={handleLinkClick}
                  className="block py-2.5 text-[14.5px] font-medium text-slate-300 hover:text-white hover:translate-x-1 transition-all"
                >
                  Careers at Jerush
                </Link>
                <Link
                  to="/contact"
                  onClick={handleLinkClick}
                  className="block py-2.5 text-[14.5px] font-medium text-slate-300 hover:text-white hover:translate-x-1 transition-all"
                >
                  Contact Us
                </Link>
              </div>

              {/* Quick Links Section - Jerush Signature Aesthetic */}
              <div className="mt-8 mb-4">
                <div className="flex items-center gap-2 mb-3.5">
                  <span className="w-2 h-2 rounded-full bg-brandSky"></span>
                  <h3 className="font-headline font-bold text-[15px] text-white uppercase tracking-wider">
                    Quick Helplines & Support
                  </h3>
                </div>

                <div className="space-y-3">
                  {/* Card 1: Emergency & Apex Support */}
                  <a
                    href="tel:+919489160055"
                    className="block p-3.5 sm:p-4 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-brandSky/50 backdrop-blur-md shadow-lg transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brandSky to-brandBlue text-white flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(30,151,212,0.3)]">
                        <Phone className="w-4 h-4 text-white fill-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-bold text-brandSky uppercase tracking-wider">
                          Emergency & Apex Hospital
                        </div>
                        <div className="text-base sm:text-lg font-bold text-white group-hover:text-brandSky transition-colors tracking-tight">
                          +91 94891 60055
                        </div>
                        <div className="text-[11px] text-slate-400">Thuckalay Apex Facility • 24/7 Trauma Care</div>
                      </div>
                    </div>
                  </a>

                  {/* Card 2: Regional Centres Helpline */}
                  <a
                    href="tel:+919489160011"
                    className="block p-3.5 sm:p-4 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-brandSky/50 backdrop-blur-md shadow-lg transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E97D4] to-[#2853A4] text-white flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(14,39,82,0.3)]">
                        <Building2 className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-bold text-sky-300 uppercase tracking-wider">
                          Regional Centres Helpline
                        </div>
                        <div className="text-base sm:text-lg font-bold text-white group-hover:text-brandSky transition-colors tracking-tight">
                          +91 94891 60011
                        </div>
                        <div className="text-[11px] text-slate-400">Trichy & Chennai Regional Centres</div>
                      </div>
                    </div>
                  </a>

                  {/* Card 3: Dubai Liaison & International Patients */}
                  <a
                    href="tel:+971507253105"
                    className="block p-3.5 sm:p-4 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-purple-400/50 backdrop-blur-md shadow-lg transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-brandBlue text-white flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(147,51,234,0.3)]">
                        <Phone className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider">
                            International Patients
                          </span>
                          <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/30">Dubai</span>
                        </div>
                        <div className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition-colors tracking-tight">
                          +971 50725 3105
                        </div>
                        <div className="text-[11px] text-slate-400">Dubai Healthcare City Liaison Office</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Primary Book Appointment CTA Gradient Button at the very last */}
              <div className="mt-6 mb-2">
                <Link
                  to="/contact"
                  onClick={handleLinkClick}
                  className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-brandSky via-[#198BC8] to-brandBlue hover:from-[#38BDF8] hover:via-brandSky hover:to-brandBlue text-white font-headline font-bold text-sm sm:text-[15px] uppercase tracking-wider flex items-center justify-between shadow-[0_4px_18px_rgba(30,151,212,0.45)] hover:shadow-[0_6px_24px_rgba(30,151,212,0.6)] active:scale-[0.98] transition-all group border border-white/20"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                      <Calendar className="w-4 h-4 text-white" />
                    </span>
                    <span className="text-white drop-shadow-xs">Book Appointment</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/90 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )}

          {/* ───────── SCREEN 2: SUBMENU ABOUT JERUSH (Matching Apollo Screenshot 2) ───────── */}
          {currentScreen === 'about' && (
            <div className="jerush-mobile-screen space-y-1">
              <button
                onClick={() => pushNav('about-story')}
                className="w-full flex items-center justify-between py-3.5 text-left font-headline font-semibold text-[15px] text-slate-200 hover:text-brandSky group"
              >
                <span>The Jerush Story</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brandSky group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={() => pushNav('about-leadership')}
                className="w-full flex items-center justify-between py-3.5 text-left font-headline font-semibold text-[15px] text-slate-200 hover:text-brandSky group"
              >
                <span>Leadership</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brandSky group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={() => pushNav('about-team')}
                className="w-full flex items-center justify-between py-3.5 text-left font-headline font-semibold text-[15px] text-slate-200 hover:text-brandSky group"
              >
                <span>Doctors & Specialists</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brandSky group-hover:translate-x-0.5 transition-all" />
              </button>

              <Link
                to="/about/milestones-legacy"
                onClick={handleLinkClick}
                className="w-full flex items-center justify-between py-3.5 text-left font-headline font-semibold text-[15px] text-slate-200 hover:text-brandSky group"
              >
                <span>Milestones & Legacy</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brandSky group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link
                to="/about/clinical-excellence"
                onClick={handleLinkClick}
                className="w-full flex items-center justify-between py-3.5 text-left font-headline font-semibold text-[15px] text-slate-200 hover:text-brandSky group"
              >
                <span>Clinical Excellence</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brandSky group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link
                to="/about/ethical-healthcare"
                onClick={handleLinkClick}
                className="w-full flex items-center justify-between py-3.5 text-left font-headline font-semibold text-[15px] text-slate-200 hover:text-brandSky group"
              >
                <span>Ethical Healthcare</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brandSky group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link
                to="/editorial-standards"
                onClick={handleLinkClick}
                className="w-full flex items-center justify-between py-3.5 text-left font-headline font-semibold text-[15px] text-slate-200 hover:text-brandSky group"
              >
                <span>Editorial Standards</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brandSky group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link
                to="/reviews"
                onClick={handleLinkClick}
                className="w-full flex items-center justify-between py-3.5 text-left font-headline font-semibold text-[15px] text-slate-200 hover:text-brandSky group"
              >
                <span>Patient Testimonials & Reviews</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brandSky group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          )}

          {/* ───────── SCREEN 3: THE JERUSH STORY (Matching Apollo Screenshot 3 - Clean 2-Column Grid!) ───────── */}
          {currentScreen === 'about-story' && (
            <div className="jerush-mobile-screen py-2">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <Link to="/about" onClick={handleLinkClick} className="block text-[14px] font-semibold text-slate-200 hover:text-brandSky transition-colors leading-snug">
                  Overview
                </Link>
                <Link to="/about" onClick={handleLinkClick} className="block text-[14px] font-semibold text-slate-200 hover:text-brandSky transition-colors leading-snug">
                  Vision & Mission
                </Link>

                <Link to="/about" onClick={handleLinkClick} className="block text-[14px] font-semibold text-slate-200 hover:text-brandSky transition-colors leading-snug">
                  Our History
                </Link>
                <Link to="/about/milestones-legacy" onClick={handleLinkClick} className="block text-[14px] font-semibold text-slate-200 hover:text-brandSky transition-colors leading-snug">
                  Milestones & Legacy
                </Link>

                <Link to="/about/clinical-excellence" onClick={handleLinkClick} className="block text-[14px] font-semibold text-slate-200 hover:text-brandSky transition-colors leading-snug">
                  Clinical Excellence
                </Link>
                <Link to="/about/ethical-healthcare" onClick={handleLinkClick} className="block text-[14px] font-semibold text-slate-200 hover:text-brandSky transition-colors leading-snug">
                  Ethical Healthcare
                </Link>

                <Link to="/about" onClick={handleLinkClick} className="block text-[14px] font-semibold text-slate-200 hover:text-brandSky transition-colors leading-snug">
                  Hospital Facilities
                </Link>
                <Link to="/editorial-standards" onClick={handleLinkClick} className="block text-[14px] font-semibold text-slate-200 hover:text-brandSky transition-colors leading-snug">
                  Editorial Standards
                </Link>

                <Link to="/reviews" onClick={handleLinkClick} className="block text-[14px] font-semibold text-slate-200 hover:text-brandSky transition-colors leading-snug">
                  Patient Reviews
                </Link>
                <Link to="/careers" onClick={handleLinkClick} className="block text-[14px] font-semibold text-slate-200 hover:text-brandSky transition-colors leading-snug">
                  Careers
                </Link>
              </div>
            </div>
          )}

          {/* ───────── SCREEN: LEADERSHIP (Clean 2-Column Grid!) ───────── */}
          {currentScreen === 'about-leadership' && (
            <div className="jerush-mobile-screen py-2">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <Link
                  to="/leadership/dr-a-bladbin-chairman-founder"
                  onClick={handleLinkClick}
                  className="block text-[14px] font-semibold text-slate-200 hover:text-brandSky transition-colors leading-snug"
                >
                  <div>Dr. A. Bladbin</div>
                  <div className="text-xs text-brandSky font-medium mt-0.5">Chairman & Founder</div>
                </Link>

                <Link
                  to="/leadership/dr-c-binila-bladbin-managing-director"
                  onClick={handleLinkClick}
                  className="block text-[14px] font-semibold text-slate-200 hover:text-brandSky transition-colors leading-snug"
                >
                  <div>Dr. C. Binila Bladbin</div>
                  <div className="text-xs text-brandSky font-medium mt-0.5">Managing Director</div>
                </Link>

                <Link
                  to="/leadership/dr-a-prabin-chief-executive-officer"
                  onClick={handleLinkClick}
                  className="block text-[14px] font-semibold text-slate-200 hover:text-brandSky transition-colors leading-snug"
                >
                  <div>Dr. A. Prabin</div>
                  <div className="text-xs text-brandSky font-medium mt-0.5">Chief Executive Officer</div>
                </Link>

                <Link
                  to="/meet-our-team"
                  onClick={handleLinkClick}
                  className="block text-[14px] font-semibold text-slate-200 hover:text-brandSky transition-colors leading-snug"
                >
                  <div>Specialist Faculty</div>
                  <div className="text-xs text-brandSky font-medium mt-0.5">Clinical Leadership</div>
                </Link>
              </div>

              <div className="mt-6 pt-3.5 border-t border-white/10">
                <Link
                  to="/meet-our-team"
                  onClick={handleLinkClick}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brandSky hover:text-white uppercase tracking-wider transition-colors"
                >
                  <span>Meet Complete Leadership & Faculty</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* ───────── SCREEN: DOCTORS & SPECIALISTS (Clean 2-Column Grid!) ───────── */}
          {currentScreen === 'about-team' && (
            <div className="jerush-mobile-screen py-2">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <Link
                  to="/doctors"
                  onClick={handleLinkClick}
                  className="block text-[14px] font-semibold text-slate-200 hover:text-brandSky transition-colors leading-snug"
                >
                  <div>Senior Surgeons</div>
                  <div className="text-xs text-slate-400 mt-0.5">Maxillofacial & Dental</div>
                </Link>

                <Link
                  to="/doctors"
                  onClick={handleLinkClick}
                  className="block text-[14px] font-semibold text-slate-200 hover:text-brandSky transition-colors leading-snug"
                >
                  <div>Aesthetic Doctors</div>
                  <div className="text-xs text-slate-400 mt-0.5">Dermatology & Lasers</div>
                </Link>

                <Link
                  to="/doctors"
                  onClick={handleLinkClick}
                  className="block text-[14px] font-semibold text-slate-200 hover:text-brandSky transition-colors leading-snug"
                >
                  <div>Hair Specialists</div>
                  <div className="text-xs text-slate-400 mt-0.5">Transplants & Bio-PRP</div>
                </Link>

                <Link
                  to="/meet-our-team"
                  onClick={handleLinkClick}
                  className="block text-[14px] font-semibold text-slate-200 hover:text-brandSky transition-colors leading-snug"
                >
                  <div>Clinical Care Team</div>
                  <div className="text-xs text-slate-400 mt-0.5">4 Regional Centres</div>
                </Link>
              </div>

              <div className="mt-6 pt-3.5 border-t border-white/10">
                <Link
                  to="/doctors"
                  onClick={handleLinkClick}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brandSky hover:text-white uppercase tracking-wider transition-colors"
                >
                  <span>View All Doctors & Specialists</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* ───────── SCREEN: FIND A CENTRE ───────── */}
          {currentScreen === 'centres' && (
            <div className="jerush-mobile-screen py-1 space-y-3">
              <Link
                to="/centres/thuckalay"
                onClick={handleLinkClick}
                className="block p-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-brandSky/50 backdrop-blur-md transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-headline font-bold text-[15px] text-white group-hover:text-brandSky transition-colors">
                    Thuckalay Centre (Apex Facility)
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brandSky transition-transform group-hover:translate-x-0.5" />
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Jerush Nagar, Thuckalay, Kanyakumari</p>
                <div className="text-xs font-semibold text-brandSky mt-1.5 flex items-center gap-1.5">
                  <Phone className="w-3 h-3 fill-brandSky" /> +91 94891 60055
                </div>
              </Link>

              <Link
                to="/centres/trichy"
                onClick={handleLinkClick}
                className="block p-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-brandSky/50 backdrop-blur-md transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-headline font-bold text-[15px] text-white group-hover:text-brandSky transition-colors">
                    Trichy Regional Centre
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brandSky transition-transform group-hover:translate-x-0.5" />
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Central Bus Stand Road, Cantonment, Trichy</p>
                <div className="text-xs font-semibold text-brandSky mt-1.5 flex items-center gap-1.5">
                  <Phone className="w-3 h-3 fill-brandSky" /> +91 94891 60011
                </div>
              </Link>

              <Link
                to="/centres/chennai"
                onClick={handleLinkClick}
                className="block p-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-brandSky/50 backdrop-blur-md transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-headline font-bold text-[15px] text-white group-hover:text-brandSky transition-colors">
                    Chennai Regional Clinic
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brandSky transition-transform group-hover:translate-x-0.5" />
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Nungambakkam High Road, Chennai</p>
                <div className="text-xs font-semibold text-brandSky mt-1.5 flex items-center gap-1.5">
                  <Phone className="w-3 h-3 fill-brandSky" /> +91 97510 10107
                </div>
              </Link>

              <div className="block p-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-purple-400/50 backdrop-blur-md transition-all">
                <div className="flex items-center justify-between">
                  <span className="font-headline font-bold text-[15px] text-white">
                    Dubai Patient Liaison
                  </span>
                  <span className="text-[10px] font-bold text-purple-200 uppercase bg-purple-500/20 border border-purple-400/30 px-2 py-0.5 rounded-full">International</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Dubai Healthcare City, UAE</p>
                <div className="text-xs font-semibold text-purple-300 mt-1.5 flex items-center gap-1.5">
                  <Phone className="w-3 h-3 fill-purple-300" /> +971 50725 3105
                </div>
              </div>
            </div>
          )}

          {/* ───────── SCREEN: MEDICAL SERVICES (Submenu Level 1 - Animated GIFs) ───────── */}
          {currentScreen === 'services' && (
            <div className="jerush-mobile-screen space-y-1.5">
              <button
                onClick={() => pushNav('services-dental')}
                className="w-full flex items-center justify-between py-3.5 text-left font-headline font-semibold text-[15px] text-slate-200 hover:text-brandSky group"
              >
                <span className="flex items-center gap-3">
                  <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-slate-950 border border-brandSky/60 shadow-[0_0_8px_rgba(30,151,212,0.35)] overflow-hidden shrink-0">
                    <img src="/gifs/dental-care.gif" alt="Dental Treatments" className="w-full h-full object-cover scale-110" />
                  </span>
                  <div>
                    <span className="block text-[15px] font-semibold text-white group-hover:text-brandSky transition-colors">Dental Treatments</span>
                    <span className="text-[11px] font-medium text-sky-300">Clinical Departments & Procedures</span>
                  </div>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brandSky group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={() => pushNav('services-skin')}
                className="w-full flex items-center justify-between py-3.5 text-left font-headline font-semibold text-[15px] text-slate-200 hover:text-brandSky group"
              >
                <span className="flex items-center gap-3">
                  <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-slate-950 border border-brandSky/60 shadow-[0_0_8px_rgba(30,151,212,0.35)] overflow-hidden shrink-0">
                    <img src="/gifs/cosmetic.gif" alt="Skin & Laser Treatments" className="w-full h-full object-cover scale-110" />
                  </span>
                  <div>
                    <span className="block text-[15px] font-semibold text-white group-hover:text-brandSky transition-colors">Skin & Laser Treatments</span>
                    <span className="text-[11px] font-medium text-sky-300">8 Departments • 41 Procedures</span>
                  </div>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brandSky group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={() => pushNav('services-hair')}
                className="w-full flex items-center justify-between py-3.5 text-left font-headline font-semibold text-[15px] text-slate-200 hover:text-brandSky group"
              >
                <span className="flex items-center gap-3">
                  <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-slate-950 border border-amber-400/60 shadow-[0_0_8px_rgba(245,158,11,0.35)] overflow-hidden shrink-0">
                    <img src="/gifs/hair.gif" alt="Hair Restoration" className="w-full h-full object-cover scale-110" />
                  </span>
                  <div>
                    <span className="block text-[15px] font-semibold text-white group-hover:text-brandSky transition-colors">Hair Restoration</span>
                    <span className="text-[11px] font-medium text-amber-300">3 Departments • 12 Procedures</span>
                  </div>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brandSky group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={() => pushNav('services-body')}
                className="w-full flex items-center justify-between py-3.5 text-left font-headline font-semibold text-[15px] text-slate-200 hover:text-brandSky group"
              >
                <span className="flex items-center gap-3">
                  <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-slate-950 border border-emerald-400/60 shadow-[0_0_8px_rgba(16,185,129,0.35)] overflow-hidden shrink-0">
                    <img src="/gifs/body-reduction.gif" alt="Body Contouring & Wellness" className="w-full h-full object-cover scale-110" />
                  </span>
                  <div>
                    <span className="block text-[15px] font-semibold text-white group-hover:text-brandSky transition-colors">Body Contouring & Wellness</span>
                    <span className="text-[11px] font-medium text-emerald-300">3 Departments • 8 Procedures</span>
                  </div>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brandSky group-hover:translate-x-0.5 transition-all" />
              </button>

              <Link
                to="/treatments"
                onClick={handleLinkClick}
                className="w-full flex items-center justify-between py-3.5 text-left font-headline font-bold text-[15px] text-brandSky hover:text-white group mt-2 pt-3.5 border-t border-white/10 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-brandSky shrink-0">
                    <Sparkles className="w-4 h-4 text-brandSky" />
                  </span>
                  <span>Explore All Medical Treatments</span>
                </span>
                <ChevronRight className="w-4 h-4 text-brandSky group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          )}

          {/* ───────── SCREEN: DENTAL TREATMENTS (All 12 Clinical Categories!) ───────── */}
          {currentScreen === 'services-dental' && (
            <div className="jerush-mobile-screen py-1">
              {/* Department Header Banner */}
              <div className="flex items-center gap-3 mb-3.5 p-3 rounded-2xl bg-gradient-to-r from-blue-50/90 via-sky-50/50 to-white border border-sky-100">
                <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-slate-950 border border-brandSky/60 shadow-[0_0_8px_rgba(30,151,212,0.35)] overflow-hidden shrink-0">
                  <img src="/gifs/dental-care.gif" alt="Dental Care" className="w-full h-full object-cover scale-110" />
                </span>
                <div>
                  <h4 className="font-headline font-bold text-sm text-[#0E2752] uppercase tracking-wide">
                    Dental Treatments
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">Specialized Departments & Clinical Procedures</p>
                </div>
              </div>

              {/* Kids Dentistry / Pedodontics */}
              <div className="mb-3.5">
                <Link
                  to="/treatments?category=dental&sub=Kids%20Dentistry%20%2F%20Pedodontics"
                  onClick={handleLinkClick}
                  className="flex items-center justify-between gap-2 mb-2 pb-1 border-b border-white/10 group/hdr"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brandSky group-hover/hdr:scale-125 transition-transform"></span>
                    <h5 className="font-headline font-bold text-xs uppercase tracking-wider text-slate-200 group-hover/hdr:text-brandSky transition-colors">
                      Kids Dentistry / Pedodontics
                    </h5>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/hdr:text-brandSky transition-colors" />
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  {renderMobileTreatmentItem('/treatments/pediatric-dentistry', 'Pediatric Care', 'pediatric-dental-care.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/pulpectomy', 'Painless Root Canal', 'pulpectomy.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/pit-fissure-sealants', 'Pit & Fissure Sealants', 'pit-fissure-sealants.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/habit-breaking-appliances', 'Habit Appliances', 'habit-breaking-appliances.webp', 'dental', handleLinkClick)}
                </div>
              </div>

              {/* Cosmetic Dentistry */}
              <div className="mb-3.5">
                <Link
                  to="/treatments?category=dental&sub=Cosmetic%20Dentistry"
                  onClick={handleLinkClick}
                  className="flex items-center justify-between gap-2 mb-2 pb-1 border-b border-white/10 group/hdr"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brandSky group-hover/hdr:scale-125 transition-transform"></span>
                    <h5 className="font-headline font-bold text-xs uppercase tracking-wider text-slate-200 group-hover/hdr:text-brandSky transition-colors">
                      Cosmetic Dentistry
                    </h5>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/hdr:text-brandSky transition-colors" />
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  {renderMobileTreatmentItem('/treatments/smile-designing', 'Smile Designing', 'smile-designing.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/dental-veneers', 'Veneers & Laminates', 'veneers.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/tooth-jewellery', 'Tooth Jewellery', 'tooth-jewellery.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/full-mouth-rehabilitation', 'Full Mouth Rehab', 'full-mouth-rehabilitation.webp', 'dental', handleLinkClick)}
                </div>
              </div>

              {/* Orthodontic Care */}
              <div className="mb-3.5">
                <Link
                  to="/treatments?category=dental&sub=Orthodontic%20Care"
                  onClick={handleLinkClick}
                  className="flex items-center justify-between gap-2 mb-2 pb-1 border-b border-white/10 group/hdr"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brandSky group-hover/hdr:scale-125 transition-transform"></span>
                    <h5 className="font-headline font-bold text-xs uppercase tracking-wider text-slate-200 group-hover/hdr:text-brandSky transition-colors">
                      Orthodontic Care
                    </h5>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/hdr:text-brandSky transition-colors" />
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  {renderMobileTreatmentItem('/dental-treatments/top-quality-invisible-clear-aligners-jerushaligne', 'Jerushaligne Aligners', 'clear-aligner.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/metal-braces', 'Metal Braces', 'metal-braces.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/ceramic-braces', 'Ceramic Braces', 'ceramic-braces.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/self-ligating-braces', 'Self-Ligating Braces', 'ligating-braces.webp', 'dental', handleLinkClick)}
                </div>
              </div>

              {/* Prosthodontic Care */}
              <div className="mb-3.5">
                <Link
                  to="/treatments?category=dental&sub=Prosthodontic%20Care%20%2F%20Tooth%20Replacement"
                  onClick={handleLinkClick}
                  className="flex items-center justify-between gap-2 mb-2 pb-1 border-b border-white/10 group/hdr"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brandSky group-hover/hdr:scale-125 transition-transform"></span>
                    <h5 className="font-headline font-bold text-xs uppercase tracking-wider text-slate-200 group-hover/hdr:text-brandSky transition-colors">
                      Prosthodontic Care
                    </h5>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/hdr:text-brandSky transition-colors" />
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  {renderMobileTreatmentItem('/dental-implants', 'Dental Implants & All-on-4', 'dental-implant.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/dental-crowns-bridges', 'Crowns & Bridges', 'dental-crown-bridge.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/dentures', 'Complete Dentures', 'denture.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/fixed-partial-denture', 'Fixed Partials', 'fixed-partial-dentures.webp', 'dental', handleLinkClick)}
                </div>
              </div>

              {/* Endodontic Care */}
              <div className="mb-3.5">
                <Link
                  to="/treatments?category=dental&sub=Endodontic%20Care"
                  onClick={handleLinkClick}
                  className="flex items-center justify-between gap-2 mb-2 pb-1 border-b border-white/10 group/hdr"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brandSky group-hover/hdr:scale-125 transition-transform"></span>
                    <h5 className="font-headline font-bold text-xs uppercase tracking-wider text-slate-200 group-hover/hdr:text-brandSky transition-colors">
                      Endodontic Care
                    </h5>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/hdr:text-brandSky transition-colors" />
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  {renderMobileTreatmentItem('/dental-treatments/root-canal-treatment-in-tamilnadu', 'Single Visit RCT', 'root-canal.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/multiple-visit-root-canal', 'Multiple-Visit RCT', 'root-canal.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/tooth-coloured-fillings', 'Tooth Restorations', 'tooth-colored-fillings.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/post-and-core', 'Post & Core', 'teeth-post-core.webp', 'dental', handleLinkClick)}
                </div>
              </div>

              {/* Geriatric Dentistry */}
              <div className="mb-3.5">
                <Link
                  to="/treatments?category=dental&sub=Geriatric%20Dentistry"
                  onClick={handleLinkClick}
                  className="flex items-center justify-between gap-2 mb-2 pb-1 border-b border-white/10 group/hdr"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brandSky group-hover/hdr:scale-125 transition-transform"></span>
                    <h5 className="font-headline font-bold text-xs uppercase tracking-wider text-slate-200 group-hover/hdr:text-brandSky transition-colors">
                      Geriatric Dentistry
                    </h5>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/hdr:text-brandSky transition-colors" />
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  {renderMobileTreatmentItem('/treatments/geriatric-dental-care', 'Geriatric Dental Care', 'denture.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/dentures', 'Complete & Flexible Dentures', 'denture.webp', 'dental', handleLinkClick)}
                </div>
              </div>

              {/* Periodontal / Gum Care */}
              <div className="mb-3.5">
                <Link
                  to="/treatments?category=dental&sub=Periodontal%20%2F%20Gum%20Care"
                  onClick={handleLinkClick}
                  className="flex items-center justify-between gap-2 mb-2 pb-1 border-b border-white/10 group/hdr"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brandSky group-hover/hdr:scale-125 transition-transform"></span>
                    <h5 className="font-headline font-bold text-xs uppercase tracking-wider text-slate-200 group-hover/hdr:text-brandSky transition-colors">
                      Periodontal / Gum Care
                    </h5>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/hdr:text-brandSky transition-colors" />
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  {renderMobileTreatmentItem('/treatments/deep-teeth-cleaning', 'Scaling & Curettage', 'deep-teeth-cleaning.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/gum-surgery', 'Flap Surgery', 'gum-surgery.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/gum-grafting', 'Bone Grafting', 'gum-grafting.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/crown-lengthening', 'Crown Lengthening', 'crown-lengthening.webp', 'dental', handleLinkClick)}
                </div>
              </div>

              {/* Oral & Maxillofacial Care */}
              <div className="mb-3.5">
                <Link
                  to="/treatments?category=dental&sub=Oral%20%26%20Maxillofacial%20Care"
                  onClick={handleLinkClick}
                  className="flex items-center justify-between gap-2 mb-2 pb-1 border-b border-white/10 group/hdr"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brandSky group-hover/hdr:scale-125 transition-transform"></span>
                    <h5 className="font-headline font-bold text-xs uppercase tracking-wider text-slate-200 group-hover/hdr:text-brandSky transition-colors">
                      Oral & Maxillofacial Care
                    </h5>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/hdr:text-brandSky transition-colors" />
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  {renderMobileTreatmentItem('/treatments/wisdom-tooth-removal', 'Wisdom Tooth Removal', 'wisdom-tooth.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/jaw-surgery', 'Corrective Jaw Surgery', 'jaw-surgery.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/cleft-lip-palate', 'Cleft Lip & Palate', 'cleft-lip-palate.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/cyst-tumour-surgery', 'Cyst & Tumour Surgery', 'cyst-tumour-surgery.webp', 'dental', handleLinkClick)}
                </div>
              </div>

              {/* Oral Medicine */}
              <div className="mb-3.5">
                <Link
                  to="/treatments?category=dental&sub=Oral%20Medicine"
                  onClick={handleLinkClick}
                  className="flex items-center justify-between gap-2 mb-2 pb-1 border-b border-white/10 group/hdr"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brandSky group-hover/hdr:scale-125 transition-transform"></span>
                    <h5 className="font-headline font-bold text-xs uppercase tracking-wider text-slate-200 group-hover/hdr:text-brandSky transition-colors">
                      Oral Medicine
                    </h5>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/hdr:text-brandSky transition-colors" />
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  {renderMobileTreatmentItem('/treatments/oral-disease-management', 'Disease Management', 'pediatric-dental-care.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/oral-health-evaluation', 'Oral Health Evaluation', 'pediatric-dental-care.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/precancerous-lesion-management', 'Precancerous Lesions', 'oral-cancer-screen.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/dental-treatments/oral-pathology-screening', 'Pathology Screening', 'oral-cancer-screen.webp', 'dental', handleLinkClick)}
                </div>
              </div>

              {/* Dental Radiology */}
              <div className="mb-3.5">
                <Link
                  to="/treatments?category=dental&sub=Radiology"
                  onClick={handleLinkClick}
                  className="flex items-center justify-between gap-2 mb-2 pb-1 border-b border-white/10 group/hdr"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brandSky group-hover/hdr:scale-125 transition-transform"></span>
                    <h5 className="font-headline font-bold text-xs uppercase tracking-wider text-slate-200 group-hover/hdr:text-brandSky transition-colors">
                      Dental Radiology
                    </h5>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/hdr:text-brandSky transition-colors" />
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  {renderMobileTreatmentItem('/treatments/cbct-3d', 'CBCT 3D Cone Beam', 'cbct-3d.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/opg', 'OPG Panoramic X-Ray', 'opg.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/cephalo-frontal-view', 'Cephalo Views', 'cephalo-frontal-view.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/water-s-view', 'Water’s Sinus View', 'water-s-view.webp', 'dental', handleLinkClick)}
                </div>
              </div>

              {/* TMJ Care */}
              <div className="mb-3.5">
                <Link
                  to="/treatments?category=dental&sub=Temporomandibular%20Joint%20(TMJ)%20Care"
                  onClick={handleLinkClick}
                  className="flex items-center justify-between gap-2 mb-2 pb-1 border-b border-white/10 group/hdr"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brandSky group-hover/hdr:scale-125 transition-transform"></span>
                    <h5 className="font-headline font-bold text-xs uppercase tracking-wider text-slate-200 group-hover/hdr:text-brandSky transition-colors">
                      TMJ Care
                    </h5>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/hdr:text-brandSky transition-colors" />
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  {renderMobileTreatmentItem('/treatments/tmj-splints', 'Soft & Hard Splints', 'soft-splints.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/night-guards', 'Bruxism Night Guards', 'night-guards.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/botox', 'TMJ Botox Therapy', 'botox-treatment.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/tmj-appliances', 'TMJ Appliances', 'tmj-appliances.webp', 'dental', handleLinkClick)}
                </div>
              </div>

              {/* Community Dentistry */}
              <div className="mb-3.5">
                <Link
                  to="/treatments?category=dental&sub=Community%20Dentistry"
                  onClick={handleLinkClick}
                  className="flex items-center justify-between gap-2 mb-2 pb-1 border-b border-white/10 group/hdr"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brandSky group-hover/hdr:scale-125 transition-transform"></span>
                    <h5 className="font-headline font-bold text-xs uppercase tracking-wider text-slate-200 group-hover/hdr:text-brandSky transition-colors">
                      Community Dentistry
                    </h5>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/hdr:text-brandSky transition-colors" />
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  {renderMobileTreatmentItem('/treatments/dental-health-camps', 'Dental Health Camps', 'dental-health-camps.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/dental-treatments/oral-pathology-screening', 'Oral Cancer Screening', 'oral-cancer-screen.webp', 'dental', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/oral-health-care', 'Community Oral Care', 'oral-health-care.webp', 'dental', handleLinkClick)}
                </div>
              </div>

              {/* Bottom CTA to view all treatments */}
              <div className="mt-5 pt-3.5 border-t border-white/10">
                <Link
                  to="/treatments?category=dental"
                  onClick={handleLinkClick}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-headline font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/15 backdrop-blur-md transition-colors"
                >
                  <span>Explore All Dental Procedures</span>
                  <ChevronRight className="w-3.5 h-3.5 text-brandSky" />
                </Link>
              </div>
            </div>
          )}

          {/* ───────── SCREEN: SKIN & LASER TREATMENTS (Categorized 2-Column Grid with WebP Icons!) ───────── */}
          {currentScreen === 'services-skin' && (
            <div className="jerush-mobile-screen py-1">
              {/* Department Header Banner */}
              <div className="flex items-center gap-3 mb-4 p-3 rounded-2xl bg-white/[0.07] border border-white/10 backdrop-blur-md">
                <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-slate-950 border border-brandSky/60 shadow-[0_0_8px_rgba(30,151,212,0.35)] overflow-hidden shrink-0">
                  <img src="/gifs/cosmetic.gif" alt="Skin & Laser" className="w-full h-full object-cover scale-110" />
                </span>
                <div>
                  <h4 className="font-headline font-bold text-sm text-white uppercase tracking-wide">
                    Skin & Laser Treatments
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium">Cosmetic Dermatology & Advanced Laser Technology</p>
                </div>
              </div>

              {/* Group 1: Acne & Pigmentation */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2 pb-1 border-b border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandSky"></span>
                  <h5 className="font-headline font-bold text-xs uppercase tracking-wider text-slate-200">
                    Acne & Pigmentation
                  </h5>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {renderMobileTreatmentItem('/treatments/acne-treatment', 'Acne Treatment', 'acne-treatment.webp', 'skin', handleLinkClick)}
                  {renderMobileTreatmentItem('/cosmetic-dermatology-laser-treatments/fractional-co2-laser', 'Acne Scars', 'acne-scar.webp', 'skin', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/pigmentation-treatment', 'Pigmentation', 'pigmentation-treatment.webp', 'skin', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/melasma-treatment', 'Melasma Care', 'melasma-teatment.webp', 'skin', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/uneven-skin-tone', 'Uneven Skin Tone', 'uneven-skin-tone.webp', 'skin', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/freckles-removal', 'Freckles Removal', 'freckles-removal.webp', 'skin', handleLinkClick)}
                </div>
              </div>

              {/* Group 2: Skin Glow & Rejuvenation */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2 pb-1 border-b border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandSky"></span>
                  <h5 className="font-headline font-bold text-xs uppercase tracking-wider text-slate-200">
                    Skin Glow & Rejuvenation
                  </h5>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {renderMobileTreatmentItem('/treatments/hydrafacial', 'HydraFacial', 'hydrafacial.webp', 'skin', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/carbon-peel-laser', 'Carbon Laser Peel', 'carbon-peel-laser.webp', 'skin', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/chemical-peel', 'Chemical Peel', 'carbon-peel-laser.webp', 'skin', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/skin-whitening', 'Skin Whitening', 'skin-whitening.webp', 'skin', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/skin-brightening', 'Skin Brightening', 'skin-brightening.webp', 'skin', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/anti-ageing-facial', 'Anti-Ageing Facial', 'anti-ageing-facial.webp', 'skin', handleLinkClick)}
                </div>
              </div>

              {/* Group 3: Laser Hair Removal */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2 pb-1 border-b border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandSky"></span>
                  <h5 className="font-headline font-bold text-xs uppercase tracking-wider text-slate-200">
                    Laser Hair Removal
                  </h5>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {renderMobileTreatmentItem('/treatments/laser-hair-removal', 'Full Body Laser', 'full-body-laser-hair-removal.webp', 'skin', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/facial-laser-hair-removal', 'Facial Hair Removal', 'facial-hair-removal.webp', 'skin', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/lip-brightening', 'Lip Brightening', 'lip-brightening.webp', 'skin', handleLinkClick)}
                </div>
              </div>

              {/* Group 4: Cosmetic Surgery */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2 pb-1 border-b border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandSky"></span>
                  <h5 className="font-headline font-bold text-xs uppercase tracking-wider text-slate-200">
                    Cosmetic Surgery
                  </h5>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {renderMobileTreatmentItem('/treatments/facial-surgery', 'Facial Surgery', 'facial-surgery-icon.webp', 'skin', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/rhinoplasty', 'Rhinoplasty', 'rhinoplasty.webp', 'skin', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/lip-correction-surgery', 'Lip Correction', 'lip-correction-surgery.webp', 'skin', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/scar-revision-surgery', 'Scar Revision', 'scar-revision-surgery.webp', 'skin', handleLinkClick)}
                </div>
              </div>

              {/* Group 5: Anti-Ageing & Aesthetics */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2 pb-1 border-b border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandSky"></span>
                  <h5 className="font-headline font-bold text-xs uppercase tracking-wider text-slate-200">
                    Anti-Ageing & Aesthetics
                  </h5>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {renderMobileTreatmentItem('/treatments/wrinkle-treatment', 'Wrinkle Reduction', 'wrinkle-reduction.webp', 'skin', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/botox', 'Botox Treatment', 'botox-treatment.webp', 'skin', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/dermal-fillers', 'Dermal Fillers', 'dermal-fillers.webp', 'skin', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/hifu-skin-tightening', 'HIFU Tightening', 'hifu-skin-tightening.webp', 'skin', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/microdermabrasion', 'Microdermabrasion', 'microdermabrasion.webp', 'skin', handleLinkClick)}
                </div>
              </div>

              {/* Group 6: Mole & Skin Growth Removal */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2 pb-1 border-b border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandSky"></span>
                  <h5 className="font-headline font-bold text-xs uppercase tracking-wider text-slate-200">
                    Mole & Skin Growth Removal
                  </h5>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {renderMobileTreatmentItem('/treatments/mole-removal', 'Mole Removal', 'mole-removal.webp', 'skin', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/wart-removal', 'Wart Removal', 'wart-removal-treatment.webp', 'skin', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/skin-tag-removal', 'Skin Tag Removal', 'benign-skin-growth-removal.webp', 'skin', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/xanthelasma-removal', 'Xanthelasma', 'xanthelasma-removal.webp', 'skin', handleLinkClick)}
                </div>
              </div>

              {/* Group 7: Medical Skin Care */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2 pb-1 border-b border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandSky"></span>
                  <h5 className="font-headline font-bold text-xs uppercase tracking-wider text-slate-200">
                    Medical Skin Care
                  </h5>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {renderMobileTreatmentItem('/treatments/psoriasis-treatment', 'Psoriasis Care', 'psoriasis-treatment.webp', 'skin', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/vitiligo-treatment', 'Vitiligo Care', 'vitiligo-treatment.webp', 'skin', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/excimer-laser-therapy', 'Excimer Laser', 'excimer-laser-therapy.webp', 'skin', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/keloid-treatment', 'Keloid Treatment', 'keloid-treatment.webp', 'skin', handleLinkClick)}
                </div>
              </div>

              {/* Bottom CTA to view all treatments */}
              <div className="mt-5 pt-3.5 border-t border-white/10">
                <Link
                  to="/treatments?category=cosmetic"
                  onClick={handleLinkClick}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-headline font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/15 backdrop-blur-md transition-colors"
                >
                  <span>Explore All 41 Skin & Laser Procedures</span>
                  <ChevronRight className="w-3.5 h-3.5 text-brandSky" />
                </Link>
              </div>
            </div>
          )}

          {/* ───────── SCREEN: HAIR RESTORATION (Categorized 2-Column Grid with WebP Icons!) ───────── */}
          {currentScreen === 'services-hair' && (
            <div className="jerush-mobile-screen py-1">
              {/* Department Header Banner */}
              <div className="flex items-center gap-3 mb-4 p-3 rounded-2xl bg-white/[0.07] border border-white/10 backdrop-blur-md">
                <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-slate-950 border border-brandSky/60 shadow-[0_0_8px_rgba(30,151,212,0.35)] overflow-hidden shrink-0">
                  <img src="/gifs/hair.gif" alt="Hair Restoration" className="w-full h-full object-cover scale-110" />
                </span>
                <div>
                  <h4 className="font-headline font-bold text-sm text-white uppercase tracking-wide">
                    Hair Restoration
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium">Transplants, Regenerative Therapies & Scalp Care</p>
                </div>
              </div>

              {/* Group 1: Hair Fall Treatments */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2 pb-1 border-b border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandSky"></span>
                  <h5 className="font-headline font-bold text-xs uppercase tracking-wider text-slate-200">
                    Hair Fall Therapies
                  </h5>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {renderMobileTreatmentItem('/treatments/prp-hair-treatment', 'PRP Hair Therapy', 'prp-hair-therapy.webp', 'hair', handleLinkClick)}
                  {renderMobileTreatmentItem('/hair-restoration-treatments/gfc-growth-factor-concentrate', 'GFC Growth Factor', 'gfc-hair-therapy.webp', 'hair', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/qr678-hair-treatment', 'QR678 Hair Therapy', 'qr678-hair-therapy.webp', 'hair', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/exocell-hair-treatment', 'Exocell Therapy', 'exocell-therapy.webp', 'hair', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/biocell-hair-treatment', 'Bio Cell Therapy', 'biocell-therapy.webp', 'hair', handleLinkClick)}
                </div>
              </div>

              {/* Group 2: Hair Transplant */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2 pb-1 border-b border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandSky"></span>
                  <h5 className="font-headline font-bold text-xs uppercase tracking-wider text-slate-200">
                    Hair Transplant
                  </h5>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {renderMobileTreatmentItem('/hair-restoration-treatments/hair-transplant', 'Micro-FUE Transplant', 'hair-transplant.webp', 'hair', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/beard-transplant', 'Beard Transplant', 'beard-transplant.webp', 'hair', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/hairline-correction', 'Hairline Correction', 'hairline-correction.webp', 'hair', handleLinkClick)}
                </div>
              </div>

              {/* Group 3: Scalp Care */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2 pb-1 border-b border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandSky"></span>
                  <h5 className="font-headline font-bold text-xs uppercase tracking-wider text-slate-200">
                    Scalp Care & Boosters
                  </h5>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {renderMobileTreatmentItem('/treatments/dandruff-treatment', 'Dandruff Treatment', 'dandruff-treatment.webp', 'hair', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/scalp-cleansing', 'Scalp Cleansing', 'scalp-cleansing-treatment.webp', 'hair', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/hair-growth-booster', 'Hair Growth Booster', 'hair-growth-booster.webp', 'hair', handleLinkClick)}
                </div>
              </div>

              {/* Bottom CTA to view all treatments */}
              <div className="mt-5 pt-3.5 border-t border-white/10">
                <Link
                  to="/treatments?category=hair"
                  onClick={handleLinkClick}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-headline font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/15 backdrop-blur-md transition-colors"
                >
                  <span>Explore All 12 Hair Procedures</span>
                  <ChevronRight className="w-3.5 h-3.5 text-brandSky" />
                </Link>
              </div>
            </div>
          )}

          {/* ───────── SCREEN: BODY CONTOURING & WELLNESS (Categorized 2-Column Grid with WebP Icons!) ───────── */}
          {currentScreen === 'services-body' && (
            <div className="jerush-mobile-screen py-1">
              {/* Department Header Banner */}
              <div className="flex items-center gap-3 mb-4 p-3 rounded-2xl bg-white/[0.07] border border-white/10 backdrop-blur-md">
                <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-slate-950 border border-brandSky/60 shadow-[0_0_8px_rgba(30,151,212,0.35)] overflow-hidden shrink-0">
                  <img src="/gifs/body-reduction.gif" alt="Body Contouring" className="w-full h-full object-cover scale-110" />
                </span>
                <div>
                  <h4 className="font-headline font-bold text-sm text-white uppercase tracking-wide">
                    Body Contouring & Wellness
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium">Non-Invasive Sculpting & Pelvic Rehabilitation</p>
                </div>
              </div>

              {/* Group 1: Fat Reduction & Sculpting */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2 pb-1 border-b border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandSky"></span>
                  <h5 className="font-headline font-bold text-xs uppercase tracking-wider text-slate-200">
                    Fat Reduction & Sculpting
                  </h5>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {renderMobileTreatmentItem('/body-contouring-wellness/cryo-cool-sculpting', 'Cryo Fat Freeze', 'cryolipolysis-fat-reduction.webp', 'body', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/emsculpt-body-contouring', 'EMSculpt Contouring', 'emsculpt-body-contouring.webp', 'body', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/muscle-toning', 'Muscle Toning', 'muscle-toning.webp', 'body', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/rf-body-tightening', 'RF Tightening', 'rf-body-tightening.webp', 'body', handleLinkClick)}
                </div>
              </div>

              {/* Group 2: Women's Wellness & Therapy */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2 pb-1 border-b border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandSky"></span>
                  <h5 className="font-headline font-bold text-xs uppercase tracking-wider text-slate-200">
                    Women's Wellness & Therapy
                  </h5>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {renderMobileTreatmentItem('/treatments/emsella-chair', 'Emsella Chair', 'emsella-chair-therapy.webp', 'body', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/pelvic-floor-treatment', 'Pelvic Floor Care', 'pelvic-floor-strengthening.webp', 'body', handleLinkClick)}
                  {renderMobileTreatmentItem('/treatments/clinical-wellness', 'Clinical Wellness', 'clinical-wellness-programs.webp', 'body', handleLinkClick)}
                </div>
              </div>

              {/* Bottom CTA to view all treatments */}
              <div className="mt-5 pt-3.5 border-t border-white/10">
                <Link
                  to="/treatments?category=body"
                  onClick={handleLinkClick}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-headline font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/15 backdrop-blur-md transition-colors"
                >
                  <span>Explore All 8 Body Procedures</span>
                  <ChevronRight className="w-3.5 h-3.5 text-brandSky" />
                </Link>
              </div>
            </div>
          )}

          {/* ───────── SCREEN: SMILE STORIES & RESULTS (2-Column Grid!) ───────── */}
          {currentScreen === 'stories' && (
            <div className="jerush-mobile-screen py-2">
              <div className="grid grid-cols-2 gap-x-5 gap-y-3.5">
                <Link to="/smile-transformations" onClick={handleLinkClick} className="block text-xs sm:text-sm font-semibold text-slate-200 hover:text-brandSky transition-colors leading-snug">
                  Smile Transformations
                </Link>
                <Link to="/video-testimonials" onClick={handleLinkClick} className="block text-xs sm:text-sm font-semibold text-slate-200 hover:text-brandSky transition-colors leading-snug">
                  Video Testimonials
                </Link>

                <Link to="/cosmetic-resurfacing" onClick={handleLinkClick} className="block text-xs sm:text-sm font-semibold text-slate-200 hover:text-brandSky transition-colors leading-snug">
                  Cosmetic Resurfacing
                </Link>
                <Link to="/reviews" onClick={handleLinkClick} className="block text-xs sm:text-sm font-semibold text-slate-200 hover:text-brandSky transition-colors leading-snug">
                  Google Reviews Feed
                </Link>

                <Link to="/hair-regrowth-results" onClick={handleLinkClick} className="block text-xs sm:text-sm font-semibold text-slate-200 hover:text-brandSky transition-colors leading-snug">
                  Hair Regrowth Cases
                </Link>
                <Link to="/events" onClick={handleLinkClick} className="block text-xs sm:text-sm font-semibold text-slate-200 hover:text-brandSky transition-colors leading-snug">
                  Hospital Facilities
                </Link>

                <Link to="/body-contouring-cases" onClick={handleLinkClick} className="block text-xs sm:text-sm font-semibold text-slate-200 hover:text-brandSky transition-colors leading-snug">
                  Body Contouring Cases
                </Link>
                <Link to="/camps" onClick={handleLinkClick} className="block text-xs sm:text-sm font-semibold text-slate-200 hover:text-brandSky transition-colors leading-snug">
                  Community Outreach
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
