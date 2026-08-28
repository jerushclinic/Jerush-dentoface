import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import MarqueeNewsBar from '../components/common/MarqueeNewsBar';

const renderDentalIconItem = (to, label, iconFile, handleLinkClick, isMobile = false) => {
  const iconSrc = `/images/icons/dental/${iconFile}`;
  if (isMobile) {
    return (
      <Link to={to} onClick={handleLinkClick} className="flex flex-row items-center gap-3 py-1.5 group w-full text-left">
        <span className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-slate-800/90 border border-slate-700/80 p-1 shrink-0 group-hover:scale-105 group-hover:border-brandSky/60 transition-all">
          <img src={iconSrc} alt={label} className="w-full h-full object-contain" />
        </span>
        <span className="text-slate-200 font-medium text-[0.875rem] group-hover:text-white transition-colors leading-snug">{label}</span>
      </Link>
    );
  }

  return (
    <Link to={to} onClick={handleLinkClick} className="flex items-center gap-3 py-1 group text-slate-800 hover:text-brandBlue transition-all">
      <span className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-50/90 via-sky-50/80 to-white border border-sky-100 p-1 shadow-[0_2px_8px_rgba(30,151,212,0.12)] shrink-0 group-hover:scale-110 group-hover:shadow-[0_4px_14px_rgba(30,151,212,0.25)] group-hover:border-brandSky/40 transition-all">
        <img src={iconSrc} alt={label} className="w-full h-full object-contain" />
      </span>
      <span className="font-medium text-[0.875rem] leading-tight group-hover:translate-x-0.5 transition-transform">{label}</span>
    </Link>
  );
};

const renderSkinIconItem = (to, label, iconFile, handleLinkClick, isMobile = false) => {
  const iconSrc = `/images/icons/skin/${iconFile}`;
  if (isMobile) {
    return (
      <Link to={to} onClick={handleLinkClick} className="flex flex-row items-center gap-3 py-1.5 group w-full text-left">
        <span className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-slate-800/90 border border-slate-700/80 p-1 shrink-0 group-hover:scale-105 group-hover:border-brandSky/60 transition-all">
          <img src={iconSrc} alt={label} className="w-full h-full object-contain" />
        </span>
        <span className="text-slate-200 font-medium text-[0.875rem] group-hover:text-white transition-colors leading-snug">{label}</span>
      </Link>
    );
  }

  return (
    <Link to={to} onClick={handleLinkClick} className="flex items-center gap-3 py-1 group text-slate-800 hover:text-brandBlue transition-all">
      <span className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-50/90 via-sky-50/80 to-white border border-sky-100 p-1 shadow-[0_2px_8px_rgba(30,151,212,0.12)] shrink-0 group-hover:scale-110 group-hover:shadow-[0_4px_14px_rgba(30,151,212,0.25)] group-hover:border-brandSky/40 transition-all">
        <img src={iconSrc} alt={label} className="w-full h-full object-contain" />
      </span>
      <span className="font-medium text-[0.875rem] leading-tight group-hover:translate-x-0.5 transition-transform">{label}</span>
    </Link>
  );
};

const renderHairIconItem = (to, label, iconFile, handleLinkClick, isMobile = false) => {
  const iconSrc = `/images/icons/hair/${iconFile}`;
  if (isMobile) {
    return (
      <Link to={to} onClick={handleLinkClick} className="flex flex-row items-center gap-3 py-1.5 group w-full text-left">
        <span className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-slate-800/90 border border-slate-700/80 p-1 shrink-0 group-hover:scale-105 group-hover:border-brandSky/60 transition-all">
          <img src={iconSrc} alt={label} className="w-full h-full object-contain" />
        </span>
        <span className="text-slate-200 font-medium text-[0.875rem] group-hover:text-white transition-colors leading-snug">{label}</span>
      </Link>
    );
  }

  return (
    <Link to={to} onClick={handleLinkClick} className="flex items-center gap-3 py-1 group text-slate-800 hover:text-brandBlue transition-all">
      <span className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-50/90 via-sky-50/80 to-white border border-sky-100 p-1 shadow-[0_2px_8px_rgba(30,151,212,0.12)] shrink-0 group-hover:scale-110 group-hover:shadow-[0_4px_14px_rgba(30,151,212,0.25)] group-hover:border-brandSky/40 transition-all">
        <img src={iconSrc} alt={label} className="w-full h-full object-contain" />
      </span>
      <span className="font-medium text-[0.875rem] leading-tight group-hover:translate-x-0.5 transition-transform">{label}</span>
    </Link>
  );
};

const renderBodyIconItem = (to, label, iconFile, handleLinkClick, isMobile = false) => {
  const iconSrc = `/images/icons/body/${iconFile}`;
  if (isMobile) {
    return (
      <Link to={to} onClick={handleLinkClick} className="flex flex-row items-center gap-3 py-1.5 group w-full text-left">
        <span className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-slate-800/90 border border-slate-700/80 p-1 shrink-0 group-hover:scale-105 group-hover:border-brandSky/60 transition-all">
          <img src={iconSrc} alt={label} className="w-full h-full object-contain" />
        </span>
        <span className="text-slate-200 font-medium text-[0.875rem] group-hover:text-white transition-colors leading-snug">{label}</span>
      </Link>
    );
  }

  return (
    <Link to={to} onClick={handleLinkClick} className="flex items-center gap-3 py-1 group text-slate-800 hover:text-brandBlue transition-all">
      <span className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-50/90 via-sky-50/80 to-white border border-sky-100 p-1 shadow-[0_2px_8px_rgba(30,151,212,0.12)] shrink-0 group-hover:scale-110 group-hover:shadow-[0_4px_14px_rgba(30,151,212,0.25)] group-hover:border-brandSky/40 transition-all">
        <img src={iconSrc} alt={label} className="w-full h-full object-contain" />
      </span>
      <span className="font-medium text-[0.875rem] leading-tight group-hover:translate-x-0.5 transition-transform">{label}</span>
    </Link>
  );
};


export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [activeSubAccordion, setActiveSubAccordion] = useState(null);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const lastScrollY = useRef(0);

  // Desktop Megamenu Category tabs state
  const [aboutActiveTab, setAboutActiveTab] = useState('about-legacy');
  const [treatmentsActiveTab, setTreatmentsActiveTab] = useState('dental-services');
  const [galleryActiveTab, setGalleryActiveTab] = useState('gallery-cases');
  const [activeHoverMenu, setActiveHoverMenu] = useState(null);

  // Handle scroll events for sticky header and smooth hide-on-scroll-down / show-on-scroll-up
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Comprehensive check for treatment pages where sub-navigation is sticky
          const isTreatmentPage =
            location.pathname === '/dental-implants' ||
            location.pathname === '/jerushaligne' ||
            location.pathname === '/root-canal-treatment' ||
            location.pathname === '/crowns-bridges' ||
            location.pathname === '/oral-pathology' ||
            location.pathname === '/gfc-hair' ||
            location.pathname === '/hair-transplant' ||
            location.pathname === '/fractional-co2-laser' ||
            location.pathname === '/cryo-sculpting' ||
            location.pathname === '/dental-camps' ||
            location.pathname.startsWith('/dental-treatments/') ||
            location.pathname.startsWith('/cosmetic-dermatology-laser-treatments/') ||
            location.pathname.startsWith('/hair-restoration-treatments/') ||
            location.pathname.startsWith('/body-contouring-wellness/') ||
            location.pathname.startsWith('/treatments');

          // Scrolled state: main navbar turns glassmorphic/sticky when scroll > 40
          if (currentScrollY > 40) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }

          // Mobile menu open: prevent hiding
          if (isMobileMenuOpen) {
            setIsNavHidden(false);
            lastScrollY.current = currentScrollY;
            ticking = false;
            return;
          }

          // Treatment pages keep header visible
          if (isTreatmentPage) {
            setIsNavHidden(false);
            lastScrollY.current = currentScrollY;
            ticking = false;
            return;
          }

          // For all other pages (Home, About, Doctors, Blogs, Careers, Gallery, Reviews, etc.):
          // If at the very top of the page, always show
          if (currentScrollY <= 60) {
            setIsNavHidden(false);
          } else {
            const delta = currentScrollY - lastScrollY.current;
            // Smooth threshold buffer to prevent micro-jitter
            if (delta > 8 && currentScrollY > 90) {
              // Scrolling down smoothly hides the header
              setIsNavHidden(true);
            } else if (delta < -6) {
              // Scrolling up smoothly reveals the header
              setIsNavHidden(false);
            }
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, isMobileMenuOpen]);

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
    setIsScrolled(false);
    setIsNavHidden(false);
    setActiveHoverMenu(null);
    lastScrollY.current = 0;
  }, [location.pathname]);

  const toggleLangDropdown = () => setLangDropdownOpen(!langDropdownOpen);

  const selectLanguage = (langCode) => {
    setSelectedLang(langCode);
    setLangDropdownOpen(false);

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
                <svg className="jerush-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="jerush-loc-name">Thuckalay:</span>
                <span className="jerush-loc-phone">+91 94891 60055</span>
              </a>
              <a href="tel:+919489160011" className="jerush-contact-item">
                <svg className="jerush-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="jerush-loc-name">Trichy:</span>
                <span className="jerush-loc-phone">+91 94891 60011</span>
              </a>
              <a href="tel:+919751010107" className="jerush-contact-item">
                <svg className="jerush-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="jerush-loc-name">Chennai:</span>
                <span className="jerush-loc-phone">+91 97510 10107</span>
              </a>
              <a href="tel:+971507253105" className="jerush-contact-item">
                <svg className="jerush-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="jerush-loc-name">Dubai:</span>
                <span className="jerush-loc-phone">+971 50725 3105</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className={`jerush-header ${location.pathname !== '/' && location.pathname !== '/careers' ? 'non-home-header' : ''} ${isScrolled ? 'sticky-nav mobile-scrolled' : ''} ${isNavHidden ? 'nav-hide' : ''}`}>
        {/* Top Marquee News Bar */}
        <MarqueeNewsBar />

        <div className="jerush-container">
          <div className="jerush-navbar">
            {/* Brand Logo */}
            <div className="jerush-logo">
              <Link to="/" onClick={handleLinkClick} rel="home">
                <img src="/images/logo/jerush-logo.webp" alt="Jerush Logo" className="jerush-logo-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallback = document.getElementById('logo-text-fallback');
                    if (fallback) fallback.style.display = 'block';
                  }} />
                <span id="logo-text-fallback" style={{ display: 'none' }} className="jerush-logo-text">JERUSH DENTOFACE</span>
              </Link>
            </div>

            {/* Navigation Menu (Desktop) */}
            <nav className="jerush-nav" aria-label="Main Navigation" onMouseLeave={() => setActiveHoverMenu(null)}>
              <ul className="jerush-nav-list">
                <li className="jerush-nav-item" onMouseEnter={() => setActiveHoverMenu(null)}>
                  <NavLink to="/" className={({ isActive }) => `jerush-nav-link ${isActive && location.pathname === '/' ? 'active-trigger' : ''}`} onClick={handleLinkClick}>
                    Home
                  </NavLink>
                </li>

                {/* About Us Mega Menu Trigger */}
                <li className={`jerush-nav-item jerush-mega-trigger ${activeHoverMenu === 'about' ? 'open' : ''}`} onMouseEnter={() => setActiveHoverMenu('about')}>
                  <Link to="/about" onClick={handleLinkClick} className="jerush-nav-link font-headline">
                    About Jerush <span className="jerush-arrow"></span>
                  </Link>

                  {/* About Us Mega Menu Panel */}
                  <div className={`jerush-megamenu ${isForceClosed ? 'force-closed' : ''}`}>
                    <div className="jerush-megamenu-inner">
                      {/* Left Sidebar Categories */}
                      <div className="jerush-megamenu-sidebar">
                        <button
                          className={`jerush-category-tab ${aboutActiveTab === 'about-legacy' ? 'active' : ''}`}
                          onMouseEnter={() => setAboutActiveTab('about-legacy')}
                        >
                          Our Legacy
                          <span className="jerush-tab-arrow"></span>
                        </button>
                        <button
                          className={`jerush-category-tab ${aboutActiveTab === 'about-team' ? 'active' : ''}`}
                          onMouseEnter={() => setAboutActiveTab('about-team')}
                        >
                          Doctors & Team
                          <span className="jerush-tab-arrow"></span>
                        </button>
                        <button
                          className={`jerush-category-tab ${aboutActiveTab === 'about-quality' ? 'active' : ''}`}
                          onMouseEnter={() => setAboutActiveTab('about-quality')}
                        >
                          Quality & Care
                          <span className="jerush-tab-arrow"></span>
                        </button>
                      </div>

                      {/* Right Content Panel */}
                      <div className="jerush-megamenu-content">
                        {/* Our Legacy Pane */}
                        <div className={`jerush-megamenu-pane ${aboutActiveTab === 'about-legacy' ? 'active' : ''}`}>
                          <h4 className="jerush-pane-title">Our Legacy</h4>
                          <div className="jerush-grid-3cols">
                            <div className="jerush-grid-column">
                              <h5>Our History</h5>
                              <ul>
                                <li><Link to="/about" onClick={handleLinkClick}>About Our Hospital</Link></li>
                                <li><Link to="/about/milestones-legacy" onClick={handleLinkClick}>Milestones & Legacy</Link></li>
                              </ul>
                            </div>
                            <div className="jerush-grid-column">
                              <h5>Our Values</h5>
                              <ul>
                                <li><Link to="/about/clinical-excellence" onClick={handleLinkClick}>Clinical Excellence</Link></li>
                                <li><Link to="/about/ethical-healthcare" onClick={handleLinkClick}>Ethical Healthcare</Link></li>
                              </ul>
                            </div>
                            <div className="jerush-grid-column">
                              <h5>Patient Voices</h5>
                              <ul>
                                <li><Link to="/reviews" onClick={handleLinkClick}>Testimonials</Link></li>
                                <li><Link to="/reviews" onClick={handleLinkClick}>Patient Reviews</Link></li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Doctors & Team Pane */}
                        <div className={`jerush-megamenu-pane ${aboutActiveTab === 'about-team' ? 'active' : ''}`}>
                          <h4 className="jerush-pane-title">Meet Our Team</h4>
                          <div className="jerush-grid-3cols">
                            <div className="jerush-grid-column">
                              <h5>Leadership</h5>
                              <ul>
                                <li><Link to="/leadership/dr-a-bladbin-chairman-founder" onClick={handleLinkClick}>Dr. A. Bladbin - Chairman & Founder</Link></li>
                                <li><Link to="/leadership/dr-c-binila-bladbin-managing-director" onClick={handleLinkClick}>Dr. C. Binila Bladbin - MD</Link></li>
                                <li><Link to="/leadership/dr-a-prabin-chief-executive-officer" onClick={handleLinkClick}>Dr. A. Prabin - CEO</Link></li>
                              </ul>
                            </div>
                            <div className="jerush-grid-column">
                              <h5>Specialists</h5>
                              <ul>
                                <li><Link to="/doctors" onClick={handleLinkClick}>Meet Our Doctors</Link></li>
                              </ul>
                            </div>
                            <div className="jerush-grid-column">
                              <h5>Support Care</h5>
                              <ul>
                                <li><Link to="/meet-our-team" onClick={handleLinkClick}>Meet Our Team</Link></li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Quality & Care Pane */}
                        <div className={`jerush-megamenu-pane ${aboutActiveTab === 'about-quality' ? 'active' : ''}`}>
                          <h4 className="jerush-pane-title">Quality & Clinical Standards</h4>
                          <div className="jerush-grid-3cols">
                            <div className="jerush-grid-column">
                              <h5>Clinical Standards</h5>
                              <ul>
                                <li><Link to="/about" onClick={handleLinkClick}>Clinical Quality</Link></li>
                                <li><Link to="/about" onClick={handleLinkClick}>Patient Safety</Link></li>
                              </ul>
                            </div>
                            <div className="jerush-grid-column">
                              <h5>Technology</h5>
                              <ul>
                                <li><Link to="/about" onClick={handleLinkClick}>Precision Diagnostics</Link></li>
                                <li><Link to="/about" onClick={handleLinkClick}>Modern Facilities</Link></li>
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

                {/* Treatments Mega Menu Trigger */}
                <li className={`jerush-nav-item jerush-mega-trigger ${activeHoverMenu === 'treatments' ? 'open' : ''}`} onMouseEnter={() => setActiveHoverMenu('treatments')}>
                  <Link to="/treatments" onClick={handleLinkClick} className="jerush-nav-link font-headline">
                    Treatments <span className="jerush-arrow"></span>
                  </Link>

                  {/* Treatments Mega Menu Panel */}
                  <div className={`jerush-megamenu ${isForceClosed ? 'force-closed' : ''}`}>
                    <div className="jerush-megamenu-inner">
                      {/* Left Sidebar Categories */}
                      <div className="jerush-megamenu-sidebar">
                        <button
                          className={`jerush-category-tab ${treatmentsActiveTab === 'dental-services' ? 'active' : ''}`}
                          onMouseEnter={() => setTreatmentsActiveTab('dental-services')}
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
                          <h4 className="jerush-pane-title">Dental Treatments</h4>
                          <div className="jerush-grid-3cols">
                            <div className="jerush-grid-column">
                              <div className="jerush-megamenu-subgroup">
                                <h5>Smile Makeover</h5>
                                <ul>
                                  <li>{renderDentalIconItem('/dental-treatments/top-quality-invisible-clear-aligners-jerushaligne', 'Clear Aligners (Jerush Aligne)', 'clear-aligner.webp', handleLinkClick)}</li>
                                  <li>{renderDentalIconItem('/treatments/metal-braces', 'Metal Braces', 'metal-braces.webp', handleLinkClick)}</li>
                                  <li>{renderDentalIconItem('/treatments/ceramic-braces', 'Ceramic Braces', 'ceramic-braces.webp', handleLinkClick)}</li>
                                  <li>{renderDentalIconItem('/treatments/lingual-braces', 'Lingual Braces', 'lingual-braces.webp', handleLinkClick)}</li>
                                  <li>{renderDentalIconItem('/treatments/self-ligating-braces', 'Self-Ligating Braces', 'ligating-braces.webp', handleLinkClick)}</li>
                                  <li>{renderDentalIconItem('/treatments/dental-veneers', 'Veneers & Laminates', 'veneers.webp', handleLinkClick)}</li>
                                </ul>
                              </div>
                              <div className="jerush-megamenu-subgroup">
                                <h5>Kids Dentistry & Oral Health</h5>
                                <ul>
                                  <li>{renderDentalIconItem('/treatments/pediatric-dentistry', 'Pediatric Dental Care', 'pediatric-dental-care.webp', handleLinkClick)}</li>
                                  <li>{renderDentalIconItem('/dental-treatments/oral-pathology-screening', 'Oral Cancer Screening', 'oral-cancer-screen.webp', handleLinkClick)}</li>
                                </ul>
                              </div>
                            </div>
                            <div className="jerush-grid-column">
                              <div className="jerush-megamenu-subgroup">
                                <h5>Tooth Replacement</h5>
                                <ul>
                                  <li>{renderDentalIconItem('/dental-implants', 'Dental Implants', 'dental-implant.webp', handleLinkClick)}</li>
                                  <li>{renderDentalIconItem('/treatments/dental-crowns-bridges', 'Crowns & Bridges', 'dental-crown-bridge.webp', handleLinkClick)}</li>
                                  <li>{renderDentalIconItem('/treatments/dentures', 'Dentures', 'denture.webp', handleLinkClick)}</li>
                                  <li>{renderDentalIconItem('/treatments/fixed-partial-denture', 'Fixed Partial Dentures', 'fixed-partial-dentures.webp', handleLinkClick)}</li>
                                </ul>
                              </div>
                              <div className="jerush-megamenu-subgroup">
                                <h5>Root Canal & Tooth Repair</h5>
                                <ul>
                                  <li>{renderDentalIconItem('/dental-treatments/root-canal-treatment-in-tamilnadu', 'Single Visit Root Canal', 'root-canal.webp', handleLinkClick)}</li>
                                  <li>{renderDentalIconItem('/treatments/tooth-coloured-fillings', 'Tooth-Coloured Fillings', 'tooth-colored-fillings.webp', handleLinkClick)}</li>
                                  <li>{renderDentalIconItem('/treatments/post-and-core', 'Post & Core', 'teeth-post-core.webp', handleLinkClick)}</li>
                                </ul>
                              </div>
                            </div>
                            <div className="jerush-grid-column">
                              <div className="jerush-megamenu-subgroup">
                                <h5>Gum Care</h5>
                                <ul>
                                  <li>{renderDentalIconItem('/treatments/gum-disease-treatment', 'Gum Disease Treatment', 'gum-disease.webp', handleLinkClick)}</li>
                                  <li>{renderDentalIconItem('/treatments/deep-teeth-cleaning', 'Deep Teeth Cleaning', 'deep-teeth-cleaning.webp', handleLinkClick)}</li>
                                  <li>{renderDentalIconItem('/treatments/gum-surgery', 'Gum Surgery', 'gum-surgery.webp', handleLinkClick)}</li>
                                  <li>{renderDentalIconItem('/treatments/gum-grafting', 'Gum Grafting', 'gum-grafting.webp', handleLinkClick)}</li>
                                </ul>
                              </div>
                              <div className="jerush-megamenu-subgroup">
                                <h5>Oral Surgery</h5>
                                <ul>
                                  <li>{renderDentalIconItem('/treatments/wisdom-tooth-removal', 'Wisdom Tooth Removal', 'wisdom-tooth.webp', handleLinkClick)}</li>
                                  <li>{renderDentalIconItem('/treatments/jaw-surgery', 'Jaw Surgery', 'jaw-surgery.webp', handleLinkClick)}</li>
                                  <li>{renderDentalIconItem('/treatments/cleft-lip-palate', 'Cleft Lip & Palate', 'cleft-lip-palate.webp', handleLinkClick)}</li>
                                  <li>{renderDentalIconItem('/treatments/dental-implant-surgery', 'Dental Implant Surgery', 'dental-implant.webp', handleLinkClick)}</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Skin & Laser Treatments Pane */}
                        <div className={`jerush-megamenu-pane ${treatmentsActiveTab === 'cosmetic-dermatology' ? 'active' : ''}`}>
                          <h4 className="jerush-pane-title">Skin & Laser Treatments</h4>
                          <div className="jerush-grid-3cols">
                            <div className="jerush-grid-column">
                              <div className="jerush-megamenu-subgroup">
                                <h5>Acne & Pigmentation</h5>
                                <ul>
                                  <li>{renderSkinIconItem('/treatments/acne-treatment', 'Acne Treatment', 'acne-treatment.webp', handleLinkClick)}</li>
                                  <li>{renderSkinIconItem('/cosmetic-dermatology-laser-treatments/fractional-co2-laser', 'Acne Scars', 'acne-scar.webp', handleLinkClick)}</li>
                                  <li>{renderSkinIconItem('/treatments/pigmentation-treatment', 'Pigmentation', 'pigmentation-treatment.webp', handleLinkClick)}</li>
                                  <li>{renderSkinIconItem('/treatments/melasma-treatment', 'Melasma', 'melasma-teatment.webp', handleLinkClick)}</li>
                                  <li>{renderSkinIconItem('/treatments/uneven-skin-tone', 'Uneven Skin Tone', 'uneven-skin-tone.webp', handleLinkClick)}</li>
                                  <li>{renderSkinIconItem('/treatments/freckles-removal', 'Freckles Removal', 'freckles-removal.webp', handleLinkClick)}</li>
                                  <li>{renderSkinIconItem('/treatments/suntan-removal', 'Sun Tan Removal', 'sun-tan-removal.webp', handleLinkClick)}</li>
                                </ul>
                              </div>
                              <div className="jerush-megamenu-subgroup">
                                <h5>Cosmetic Surgery</h5>
                                <ul>
                                  <li>{renderSkinIconItem('/treatments/facial-surgery', 'Facial Surgery', 'facial-surgery-icon.webp', handleLinkClick)}</li>
                                  <li>{renderSkinIconItem('/treatments/rhinoplasty', 'Rhinoplasty', 'rhinoplasty.webp', handleLinkClick)}</li>
                                  <li>{renderSkinIconItem('/treatments/lip-correction-surgery', 'Lip Correction Surgery', 'lip-correction-surgery.webp', handleLinkClick)}</li>
                                  <li>{renderSkinIconItem('/treatments/scar-revision-surgery', 'Scar Revision Surgery', 'scar-revision-surgery.webp', handleLinkClick)}</li>
                                </ul>
                              </div>
                            </div>
                            <div className="jerush-grid-column">
                              <div className="jerush-megamenu-subgroup">
                                <h5>Skin Glow & Rejuvenation</h5>
                                <ul>
                                  <li>{renderSkinIconItem('/treatments/hydrafacial', 'HydraFacial', 'hydrafacial.webp', handleLinkClick)}</li>
                                  <li>{renderSkinIconItem('/treatments/carbon-peel-laser', 'Carbon Peel Laser', 'carbon-peel-laser.webp', handleLinkClick)}</li>
                                  <li>{renderSkinIconItem('/treatments/chemical-peel', 'Chemical Peel', 'carbon-peel-laser.webp', handleLinkClick)}</li>
                                  <li>{renderSkinIconItem('/treatments/skin-whitening', 'Skin Whitening', 'skin-whitening.webp', handleLinkClick)}</li>
                                  <li>{renderSkinIconItem('/treatments/skin-brightening', 'Skin Brightening', 'skin-brightening.webp', handleLinkClick)}</li>
                                  <li>{renderSkinIconItem('/treatments/anti-ageing-facial', 'Anti-Ageing Facial', 'anti-ageing-facial.webp', handleLinkClick)}</li>
                                </ul>
                              </div>
                              <div className="jerush-megamenu-subgroup">
                                <h5>Mole & Skin Growth Removal</h5>
                                <ul>
                                  <li>{renderSkinIconItem('/treatments/mole-removal', 'Mole Removal', 'mole-removal.webp', handleLinkClick)}</li>
                                  <li>{renderSkinIconItem('/treatments/wart-removal', 'Wart Removal', 'wart-removal-treatment.webp', handleLinkClick)}</li>
                                  <li>{renderSkinIconItem('/treatments/skin-tag-removal', 'Skin Tag Removal', 'benign-skin-growth-removal.webp', handleLinkClick)}</li>
                                  <li>{renderSkinIconItem('/treatments/xanthelasma-removal', 'Xanthelasma Removal', 'xanthelasma-removal.webp', handleLinkClick)}</li>
                                  <li>{renderSkinIconItem('/treatments/benign-skin-growth-removal', 'Benign Skin Growth Removal', 'benign-skin-growth-removal.webp', handleLinkClick)}</li>
                                </ul>
                              </div>
                            </div>
                            <div className="jerush-grid-column">
                              <div className="jerush-megamenu-subgroup">
                                <h5>Laser Hair Removal</h5>
                                <ul>
                                  <li>{renderSkinIconItem('/treatments/laser-hair-removal', 'Full Body Laser Hair Removal', 'full-body-laser-hair-removal.webp', handleLinkClick)}</li>
                                  <li>{renderSkinIconItem('/treatments/facial-laser-hair-removal', 'Facial Hair Removal', 'facial-hair-removal.webp', handleLinkClick)}</li>
                                  <li>{renderSkinIconItem('/treatments/lip-brightening', 'Lip Brightening', 'lip-brightening.webp', handleLinkClick)}</li>
                                </ul>
                              </div>
                              <div className="jerush-megamenu-subgroup">
                                <h5>Anti-Ageing & Aesthetics</h5>
                                <ul>
                                  <li>{renderSkinIconItem('/treatments/wrinkle-treatment', 'Wrinkle Reduction', 'wrinkle-reduction.webp', handleLinkClick)}</li>
                                  <li>{renderSkinIconItem('/treatments/botox', 'Botox', 'botox-treatment.webp', handleLinkClick)}</li>
                                  <li>{renderSkinIconItem('/treatments/dermal-fillers', 'Dermal Fillers', 'dermal-fillers.webp', handleLinkClick)}</li>
                                  <li>{renderSkinIconItem('/treatments/hifu-skin-tightening', 'HIFU Skin Tightening', 'hifu-skin-tightening.webp', handleLinkClick)}</li>
                                  <li>{renderSkinIconItem('/treatments/microdermabrasion', 'Microdermabrasion', 'microdermabrasion.webp', handleLinkClick)}</li>
                                </ul>
                              </div>
                              <div className="jerush-megamenu-subgroup">
                                <h5>Medical Skin Care</h5>
                                <ul>
                                  <li>{renderSkinIconItem('/treatments/psoriasis-treatment', 'Psoriasis Treatment', 'psoriasis-treatment.webp', handleLinkClick)}</li>
                                  <li>{renderSkinIconItem('/treatments/vitiligo-treatment', 'Vitiligo Treatment', 'vitiligo-treatment.webp', handleLinkClick)}</li>
                                  <li>{renderSkinIconItem('/treatments/excimer-laser-therapy', 'Excimer Laser Therapy', 'excimer-laser-therapy.webp', handleLinkClick)}</li>
                                  <li>{renderSkinIconItem('/treatments/eczema-treatment', 'Eczema / Dermatitis', 'eczema-dermatitis-treatment.webp', handleLinkClick)}</li>
                                  <li>{renderSkinIconItem('/treatments/keloid-treatment', 'Keloid Treatment', 'keloid-treatment.webp', handleLinkClick)}</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Hair Restoration Pane */}
                        <div className={`jerush-megamenu-pane ${treatmentsActiveTab === 'hair-restoration' ? 'active' : ''}`}>
                          <h4 className="jerush-pane-title">Hair Restoration</h4>
                          <div className="jerush-grid-3cols">
                            <div className="jerush-grid-column">
                              <div className="jerush-megamenu-subgroup">
                                <h5>Hair Fall Treatments</h5>
                                <ul>
                                  <li>{renderHairIconItem('/treatments/prp-hair-treatment', 'PRP Hair Therapy', 'prp-hair-therapy.webp', handleLinkClick)}</li>
                                  <li>{renderHairIconItem('/hair-restoration-treatments/gfc-growth-factor-concentrate', 'GFC Hair Therapy', 'gfc-hair-therapy.webp', handleLinkClick)}</li>
                                  <li>{renderHairIconItem('/treatments/qr678-hair-treatment', 'QR678 Hair Therapy', 'qr678-hair-therapy.webp', handleLinkClick)}</li>
                                  <li>{renderHairIconItem('/treatments/exocell-hair-treatment', 'Exocell Therapy', 'exocell-therapy.webp', handleLinkClick)}</li>
                                  <li>{renderHairIconItem('/treatments/biocell-hair-treatment', 'Bio Cell Therapy', 'biocell-therapy.webp', handleLinkClick)}</li>
                                </ul>
                              </div>
                            </div>
                            <div className="jerush-grid-column">
                              <div className="jerush-megamenu-subgroup">
                                <h5>Hair Transplant</h5>
                                <ul>
                                  <li>{renderHairIconItem('/hair-restoration-treatments/hair-transplant', 'Hair Transplant', 'hair-transplant.webp', handleLinkClick)}</li>
                                  <li>{renderHairIconItem('/treatments/beard-transplant', 'Beard Transplant', 'beard-transplant.webp', handleLinkClick)}</li>
                                  <li>{renderHairIconItem('/treatments/hairline-correction', 'Hairline Correction', 'hairline-correction.webp', handleLinkClick)}</li>
                                </ul>
                              </div>
                            </div>
                            <div className="jerush-grid-column">
                              <div className="jerush-megamenu-subgroup">
                                <h5>Scalp Care</h5>
                                <ul>
                                  <li>{renderHairIconItem('/treatments/dandruff-treatment', 'Dandruff Treatment', 'dandruff-treatment.webp', handleLinkClick)}</li>
                                  <li>{renderHairIconItem('/treatments/scalp-cleansing', 'Scalp Cleansing', 'scalp-cleansing-treatment.webp', handleLinkClick)}</li>
                                  <li>{renderHairIconItem('/treatments/hair-growth-booster', 'Hair Growth Booster', 'hair-growth-booster.webp', handleLinkClick)}</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Body Contouring Pane */}
                        <div className={`jerush-megamenu-pane ${treatmentsActiveTab === 'body-contouring' ? 'active' : ''}`}>
                          <h4 className="jerush-pane-title">Body Contouring & Wellness</h4>
                          <div className="jerush-grid-3cols">
                            <div className="jerush-grid-column">
                              <div className="jerush-megamenu-subgroup">
                                <h5>Fat Reduction</h5>
                                <ul>
                                  <li>{renderBodyIconItem('/body-contouring-wellness/cryo-cool-sculpting', 'Cryolipolysis Fat Reduction', 'cryolipolysis-fat-reduction.webp', handleLinkClick)}</li>
                                  <li>{renderBodyIconItem('/treatments/emsculpt-body-contouring', 'EMSculpt Body Contouring', 'emsculpt-body-contouring.webp', handleLinkClick)}</li>
                                </ul>
                              </div>
                            </div>
                            <div className="jerush-grid-column">
                              <div className="jerush-megamenu-subgroup">
                                <h5>Body Sculpting</h5>
                                <ul>
                                  <li>{renderBodyIconItem('/treatments/muscle-toning', 'Muscle Toning', 'muscle-toning.webp', handleLinkClick)}</li>
                                  <li>{renderBodyIconItem('/treatments/rf-body-tightening', 'RF Body Tightening', 'rf-body-tightening.webp', handleLinkClick)}</li>
                                </ul>
                              </div>
                            </div>
                            <div className="jerush-grid-column">
                              <div className="jerush-megamenu-subgroup">
                                <h5>Body Wellness</h5>
                                <ul>
                                  <li>{renderBodyIconItem('/treatments/emsella-chair', 'Emsella Chair Therapy', 'emsella-chair-therapy.webp', handleLinkClick)}</li>
                                  <li>{renderBodyIconItem('/treatments/pelvic-floor-treatment', 'Pelvic Floor Strengthening', 'pelvic-floor-strengthening.webp', handleLinkClick)}</li>
                                  <li>{renderBodyIconItem('/treatments/clinical-wellness', 'Clinical Wellness Programs', 'clinical-wellness-programs.webp', handleLinkClick)}</li>
                                </ul>
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
                <li className={`jerush-nav-item jerush-mega-trigger ${activeHoverMenu === 'gallery' ? 'open' : ''}`} onMouseEnter={() => setActiveHoverMenu('gallery')}>
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
                                <li><Link to="/smile-stories?category=dental" onClick={handleLinkClick}>Smile Transformations</Link></li>
                              </ul>
                            </div>
                            <div className="jerush-grid-column">
                              <h5>Aesthetics</h5>
                              <ul>
                                <li><Link to="/smile-stories?category=skin" onClick={handleLinkClick}>Cosmetic Resurfacing</Link></li>
                                <li><Link to="/smile-stories?category=hair" onClick={handleLinkClick}>Hair Regrowth Results</Link></li>
                                <li><Link to="/smile-stories?category=body" onClick={handleLinkClick}>Body Contouring Cases</Link></li>
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
                                <li><Link to="/smile-stories" onClick={handleLinkClick}>Photo Stories</Link></li>
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

                <li className="jerush-nav-item" onMouseEnter={() => setActiveHoverMenu(null)}>
                  <NavLink to="/blog" className={({ isActive }) => `jerush-nav-link ${isActive ? 'active-trigger' : ''}`} onClick={handleLinkClick}>
                    Blog
                  </NavLink>
                </li>
                <li className="jerush-nav-item" onMouseEnter={() => setActiveHoverMenu(null)}>
                  <NavLink to="/careers" className={({ isActive }) => `jerush-nav-link ${isActive ? 'active-trigger' : ''}`} onClick={handleLinkClick}>
                    Careers
                  </NavLink>
                </li>
                <li className="jerush-nav-item" onMouseEnter={() => setActiveHoverMenu(null)}>
                  <NavLink to="/events" state={{ reset: Date.now() }} className={({ isActive }) => `jerush-nav-link ${isActive ? 'active-trigger' : ''}`} onClick={handleLinkClick}>
                    Jerush Events
                  </NavLink>
                </li>
                <li className="jerush-nav-item" onMouseEnter={() => setActiveHoverMenu(null)}>
                  <NavLink to="/contact" className={({ isActive }) => `jerush-nav-link ${isActive ? 'active-trigger' : ''}`} onClick={handleLinkClick}>
                    Contact Us
                  </NavLink>
                </li>
              </ul>
            </nav>

            {/* Book Appointment CTA */}
            <div className="jerush-nav-cta">
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

              {/* Mobile Menu Toggle Button (Hamburger) */}
              <button
                className="jerush-hamburger xl:hidden"
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
        </div>
      </header>

      {/* Mobile Navigation Drawer Overlay */}
      <div
        className={`jerush-mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* Mobile Navigation Drawer Container */}
      <div className={`jerush-mobile-drawer ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="jerush-mobile-drawer-header">
          <div className="jerush-mobile-logo">
            <Link to="/" onClick={handleLinkClick}>
              <img src="/images/logo/jerush-logo.webp" alt="Jerush Logo" className="jerush-logo-img"
                onError={(e) => { e.target.style.display = 'none'; }} />
            </Link>
          </div>
          <button className="jerush-mobile-close" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close Navigation Drawer">&times;</button>
        </div>

        <div className="jerush-mobile-drawer-body">
          {/* Pinned Direct Contact Shortcuts (Top of Drawer) */}
          <div className="jerush-mobile-contacts">
            <a href="tel:+919489160055" className="jerush-mobile-contact-item">
              <span>Thuckalay Support</span>
              <strong>+91 94891 60055</strong>
            </a>
            <a href="tel:+919489160011" className="jerush-mobile-contact-item">
              <span>Trichy Helpline</span>
              <strong>+91 94891 60011</strong>
            </a>
            <a href="tel:+919751010107" className="jerush-mobile-contact-item">
              <span>Chennai Clinic</span>
              <strong>+91 97510 10107</strong>
            </a>
            <a href="tel:+971507253105" className="jerush-mobile-contact-item">
              <span>Dubai Liaison</span>
              <strong>+971 50725 3105</strong>
            </a>
          </div>

          {/* Accordion Menus */}
          <ul className="jerush-mobile-menu">
            <li className="jerush-mobile-item">
              <Link to="/" onClick={handleLinkClick} className="jerush-mobile-link">Home</Link>
            </li>

            {/* About Accordion */}
            <li className="jerush-mobile-item has-accordion">
              <button className={`jerush-mobile-accordion-toggle ${activeAccordion === 'about' ? 'active' : ''}`} onClick={() => handleAccordionToggle('about')}>
                About Jerush <span className="jerush-accordion-icon"></span>
              </button>
              <ul className={`jerush-mobile-submenu ${activeAccordion === 'about' ? 'open' : ''}`}>
                <li><Link to="/about" onClick={handleLinkClick}>Our Hospital</Link></li>
                <li><Link to="/about/milestones-legacy" onClick={handleLinkClick}>Milestones & Legacy</Link></li>
                <li><Link to="/about/clinical-excellence" onClick={handleLinkClick}>Clinical Excellence</Link></li>
                <li><Link to="/about/ethical-healthcare" onClick={handleLinkClick}>Ethical Healthcare</Link></li>
                <li><Link to="/reviews" onClick={handleLinkClick}>Patient Testimonials</Link></li>
                <li><Link to="/leadership/dr-a-bladbin-chairman-founder" onClick={handleLinkClick}>Dr. A. Bladbin (Chairman & Founder)</Link></li>
                <li><Link to="/leadership/dr-c-binila-bladbin-managing-director" onClick={handleLinkClick}>Dr. C. Binila Bladbin (Managing Director)</Link></li>
                <li><Link to="/leadership/dr-a-prabin-chief-executive-officer" onClick={handleLinkClick}>Dr. A. Prabin (Chief Executive Officer)</Link></li>
                <li><Link to="/doctors" onClick={handleLinkClick}>Meet Our Doctors</Link></li>
                <li><Link to="/meet-our-team" onClick={handleLinkClick}>Clinical Team</Link></li>
                <li><Link to="/about" onClick={handleLinkClick}>Clinical Quality</Link></li>
                <li><Link to="/about" onClick={handleLinkClick}>Patient Safety</Link></li>
                <li><Link to="/about" onClick={handleLinkClick}>Precision Diagnostics</Link></li>
                <li><Link to="/about" onClick={handleLinkClick}>Modern Facilities</Link></li>
              </ul>
            </li>

            {/* Treatments Accordion */}
            <li className="jerush-mobile-item has-accordion">
              <button className={`jerush-mobile-accordion-toggle ${activeAccordion === 'treatments' ? 'active' : ''}`} onClick={() => handleAccordionToggle('treatments')}>
                Treatments <span className="jerush-accordion-icon"></span>
              </button>
              <ul className={`jerush-mobile-submenu ${activeAccordion === 'treatments' ? 'open' : ''}`}>
                <li className="jerush-mobile-subaccordion">
                  <button className={`jerush-mobile-subaccordion-toggle ${activeSubAccordion === 'dental' ? 'active' : ''}`} onClick={() => handleSubAccordionToggle('dental')}>
                    <span className="flex items-center gap-3 pointer-events-none">
                      <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-slate-950 border border-brandSky/60 shadow-[0_0_8px_rgba(30,151,212,0.5)] overflow-hidden shrink-0 isolate pointer-events-none">
                        <img src="/gifs/dental-care.gif" alt="Dental Treatments" loading="eager" className="w-full h-full object-cover scale-110 pointer-events-none" />
                        <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-brandSky/40 pointer-events-none" />
                      </span>
                      <span>Dental Treatments</span>
                    </span>
                    <span className="jerush-accordion-icon"></span>
                  </button>
                  <ul className={`jerush-mobile-subsubmenu ${activeSubAccordion === 'dental' ? 'open' : ''}`}>
                    <li className="jerush-mobile-submenu-header">Smile Makeover</li>
                    <li>{renderDentalIconItem('/dental-treatments/top-quality-invisible-clear-aligners-jerushaligne', 'Clear Aligners (Jerush Aligne)', 'clear-aligner.webp', handleLinkClick, true)}</li>
                    <li>{renderDentalIconItem('/treatments/metal-braces', 'Metal Braces', 'metal-braces.webp', handleLinkClick, true)}</li>
                    <li>{renderDentalIconItem('/treatments/ceramic-braces', 'Ceramic Braces', 'ceramic-braces.webp', handleLinkClick, true)}</li>
                    <li>{renderDentalIconItem('/treatments/lingual-braces', 'Lingual Braces', 'lingual-braces.webp', handleLinkClick, true)}</li>
                    <li>{renderDentalIconItem('/treatments/self-ligating-braces', 'Self-Ligating Braces', 'ligating-braces.webp', handleLinkClick, true)}</li>
                    <li>{renderDentalIconItem('/treatments/dental-veneers', 'Veneers & Laminates', 'veneers.webp', handleLinkClick, true)}</li>

                    <li className="jerush-mobile-submenu-header">Kids Dentistry & Oral Health</li>
                    <li>{renderDentalIconItem('/treatments/pediatric-dentistry', 'Pediatric Dental Care', 'pediatric-dental-care.webp', handleLinkClick, true)}</li>
                    <li>{renderDentalIconItem('/dental-treatments/oral-pathology-screening', 'Oral Cancer Screening', 'oral-cancer-screen.webp', handleLinkClick, true)}</li>

                    <li className="jerush-mobile-submenu-header">Tooth Replacement</li>
                    <li>{renderDentalIconItem('/dental-implants', 'Dental Implants', 'dental-implant.webp', handleLinkClick, true)}</li>
                    <li>{renderDentalIconItem('/treatments/dental-crowns-bridges', 'Crowns & Bridges', 'dental-crown-bridge.webp', handleLinkClick, true)}</li>
                    <li>{renderDentalIconItem('/treatments/dentures', 'Dentures', 'denture.webp', handleLinkClick, true)}</li>
                    <li>{renderDentalIconItem('/treatments/fixed-partial-denture', 'Fixed Partial Dentures', 'fixed-partial-dentures.webp', handleLinkClick, true)}</li>

                    <li className="jerush-mobile-submenu-header">Root Canal & Tooth Repair</li>
                    <li>{renderDentalIconItem('/dental-treatments/root-canal-treatment-in-tamilnadu', 'Single Visit Root Canal', 'root-canal.webp', handleLinkClick, true)}</li>
                    <li>{renderDentalIconItem('/treatments/tooth-coloured-fillings', 'Tooth-Coloured Fillings', 'tooth-colored-fillings.webp', handleLinkClick, true)}</li>
                    <li>{renderDentalIconItem('/treatments/post-and-core', 'Post & Core', 'teeth-post-core.webp', handleLinkClick, true)}</li>

                    <li className="jerush-mobile-submenu-header">Gum Care</li>
                    <li>{renderDentalIconItem('/treatments/gum-disease-treatment', 'Gum Disease Treatment', 'gum-disease.webp', handleLinkClick, true)}</li>
                    <li>{renderDentalIconItem('/treatments/deep-teeth-cleaning', 'Deep Teeth Cleaning', 'deep-teeth-cleaning.webp', handleLinkClick, true)}</li>
                    <li>{renderDentalIconItem('/treatments/gum-surgery', 'Gum Surgery', 'gum-surgery.webp', handleLinkClick, true)}</li>
                    <li>{renderDentalIconItem('/treatments/gum-grafting', 'Gum Grafting', 'gum-grafting.webp', handleLinkClick, true)}</li>

                    <li className="jerush-mobile-submenu-header">Oral Surgery</li>
                    <li>{renderDentalIconItem('/treatments/wisdom-tooth-removal', 'Wisdom Tooth Removal', 'wisdom-tooth.webp', handleLinkClick, true)}</li>
                    <li>{renderDentalIconItem('/treatments/jaw-surgery', 'Jaw Surgery', 'jaw-surgery.webp', handleLinkClick, true)}</li>
                    <li>{renderDentalIconItem('/treatments/cleft-lip-palate', 'Cleft Lip & Palate', 'cleft-lip-palate.webp', handleLinkClick, true)}</li>
                    <li>{renderDentalIconItem('/treatments/dental-implant-surgery', 'Dental Implant Surgery', 'dental-implant.webp', handleLinkClick, true)}</li>
                  </ul>
                </li>
                <li className="jerush-mobile-subaccordion">
                  <button className={`jerush-mobile-subaccordion-toggle ${activeSubAccordion === 'cosmetic' ? 'active' : ''}`} onClick={() => handleSubAccordionToggle('cosmetic')}>
                    <span className="flex items-center gap-3 pointer-events-none">
                      <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-slate-950 border border-brandSky/60 shadow-[0_0_8px_rgba(30,151,212,0.5)] overflow-hidden shrink-0 isolate pointer-events-none">
                        <img src="/gifs/cosmetic.gif" alt="Skin & Laser Treatments" loading="eager" className="w-full h-full object-cover scale-110 pointer-events-none" />
                        <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-brandSky/40 pointer-events-none" />
                      </span>
                      <span>Skin & Laser Treatments</span>
                    </span>
                    <span className="jerush-accordion-icon"></span>
                  </button>
                  <ul className={`jerush-mobile-subsubmenu ${activeSubAccordion === 'cosmetic' ? 'open' : ''}`}>
                    <li className="jerush-mobile-submenu-header">Acne & Pigmentation</li>
                    <li>{renderSkinIconItem('/treatments/acne-treatment', 'Acne Treatment', 'acne-treatment.webp', handleLinkClick, true)}</li>
                    <li>{renderSkinIconItem('/cosmetic-dermatology-laser-treatments/fractional-co2-laser', 'Acne Scars', 'acne-scar.webp', handleLinkClick, true)}</li>
                    <li>{renderSkinIconItem('/treatments/pigmentation-treatment', 'Pigmentation', 'pigmentation-treatment.webp', handleLinkClick, true)}</li>
                    <li>{renderSkinIconItem('/treatments/melasma-treatment', 'Melasma', 'melasma-teatment.webp', handleLinkClick, true)}</li>
                    <li>{renderSkinIconItem('/treatments/uneven-skin-tone', 'Uneven Skin Tone', 'uneven-skin-tone.webp', handleLinkClick, true)}</li>
                    <li>{renderSkinIconItem('/treatments/freckles-removal', 'Freckles Removal', 'freckles-removal.webp', handleLinkClick, true)}</li>
                    <li>{renderSkinIconItem('/treatments/suntan-removal', 'Sun Tan Removal', 'sun-tan-removal.webp', handleLinkClick, true)}</li>

                    <li className="jerush-mobile-submenu-header">Skin Glow & Rejuvenation</li>
                    <li>{renderSkinIconItem('/treatments/hydrafacial', 'HydraFacial', 'hydrafacial.webp', handleLinkClick, true)}</li>
                    <li>{renderSkinIconItem('/treatments/carbon-peel-laser', 'Carbon Peel Laser', 'carbon-peel-laser.webp', handleLinkClick, true)}</li>
                    <li>{renderSkinIconItem('/treatments/chemical-peel', 'Chemical Peel', 'carbon-peel-laser.webp', handleLinkClick, true)}</li>
                    <li>{renderSkinIconItem('/treatments/skin-whitening', 'Skin Whitening', 'skin-whitening.webp', handleLinkClick, true)}</li>
                    <li>{renderSkinIconItem('/treatments/skin-brightening', 'Skin Brightening', 'skin-brightening.webp', handleLinkClick, true)}</li>
                    <li>{renderSkinIconItem('/treatments/anti-ageing-facial', 'Anti-Ageing Facial', 'anti-ageing-facial.webp', handleLinkClick, true)}</li>

                    <li className="jerush-mobile-submenu-header">Mole & Skin Growth Removal</li>
                    <li>{renderSkinIconItem('/treatments/mole-removal', 'Mole Removal', 'mole-removal.webp', handleLinkClick, true)}</li>
                    <li>{renderSkinIconItem('/treatments/wart-removal', 'Wart Removal', 'wart-removal-treatment.webp', handleLinkClick, true)}</li>
                    <li>{renderSkinIconItem('/treatments/skin-tag-removal', 'Skin Tag Removal', 'benign-skin-growth-removal.webp', handleLinkClick, true)}</li>
                    <li>{renderSkinIconItem('/treatments/xanthelasma-removal', 'Xanthelasma Removal', 'xanthelasma-removal.webp', handleLinkClick, true)}</li>
                    <li>{renderSkinIconItem('/treatments/benign-skin-growth-removal', 'Benign Skin Growth Removal', 'benign-skin-growth-removal.webp', handleLinkClick, true)}</li>

                    <li className="jerush-mobile-submenu-header">Laser Hair Removal</li>
                    <li>{renderSkinIconItem('/treatments/laser-hair-removal', 'Full Body Laser Hair Removal', 'full-body-laser-hair-removal.webp', handleLinkClick, true)}</li>
                    <li>{renderSkinIconItem('/treatments/facial-laser-hair-removal', 'Facial Hair Removal', 'facial-hair-removal.webp', handleLinkClick, true)}</li>
                    <li>{renderSkinIconItem('/treatments/lip-brightening', 'Lip Brightening', 'lip-brightening.webp', handleLinkClick, true)}</li>

                    <li className="jerush-mobile-submenu-header">Cosmetic Surgery</li>
                    <li>{renderSkinIconItem('/treatments/facial-surgery', 'Facial Surgery', 'facial-surgery-icon.webp', handleLinkClick, true)}</li>
                    <li>{renderSkinIconItem('/treatments/rhinoplasty', 'Rhinoplasty', 'rhinoplasty.webp', handleLinkClick, true)}</li>
                    <li>{renderSkinIconItem('/treatments/lip-correction-surgery', 'Lip Correction Surgery', 'lip-correction-surgery.webp', handleLinkClick, true)}</li>
                    <li>{renderSkinIconItem('/treatments/scar-revision-surgery', 'Scar Revision Surgery', 'scar-revision-surgery.webp', handleLinkClick, true)}</li>

                    <li className="jerush-mobile-submenu-header">Anti-Ageing & Aesthetics</li>
                    <li>{renderSkinIconItem('/treatments/wrinkle-treatment', 'Wrinkle Reduction', 'wrinkle-reduction.webp', handleLinkClick, true)}</li>
                    <li>{renderSkinIconItem('/treatments/botox', 'Botox', 'botox-treatment.webp', handleLinkClick, true)}</li>
                    <li>{renderSkinIconItem('/treatments/dermal-fillers', 'Dermal Fillers', 'dermal-fillers.webp', handleLinkClick, true)}</li>
                    <li>{renderSkinIconItem('/treatments/hifu-skin-tightening', 'HIFU Skin Tightening', 'hifu-skin-tightening.webp', handleLinkClick, true)}</li>
                    <li>{renderSkinIconItem('/treatments/microdermabrasion', 'Microdermabrasion', 'microdermabrasion.webp', handleLinkClick, true)}</li>

                    <li className="jerush-mobile-submenu-header">Medical Skin Care</li>
                    <li>{renderSkinIconItem('/treatments/psoriasis-treatment', 'Psoriasis Treatment', 'psoriasis-treatment.webp', handleLinkClick, true)}</li>
                    <li>{renderSkinIconItem('/treatments/vitiligo-treatment', 'Vitiligo Treatment', 'vitiligo-treatment.webp', handleLinkClick, true)}</li>
                    <li>{renderSkinIconItem('/treatments/excimer-laser-therapy', 'Excimer Laser Therapy', 'excimer-laser-therapy.webp', handleLinkClick, true)}</li>
                    <li>{renderSkinIconItem('/treatments/eczema-treatment', 'Eczema / Dermatitis', 'eczema-dermatitis-treatment.webp', handleLinkClick, true)}</li>
                    <li>{renderSkinIconItem('/treatments/keloid-treatment', 'Keloid Treatment', 'keloid-treatment.webp', handleLinkClick, true)}</li>
                  </ul>
                </li>
                <li className="jerush-mobile-subaccordion">
                  <button className={`jerush-mobile-subaccordion-toggle ${activeSubAccordion === 'hair' ? 'active' : ''}`} onClick={() => handleSubAccordionToggle('hair')}>
                    <span className="flex items-center gap-3 pointer-events-none">
                      <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-slate-950 border border-brandSky/60 shadow-[0_0_8px_rgba(30,151,212,0.5)] overflow-hidden shrink-0 isolate pointer-events-none">
                        <img src="/gifs/hair.gif" alt="Hair Restoration" loading="eager" className="w-full h-full object-cover scale-110 pointer-events-none" />
                        <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-brandSky/40 pointer-events-none" />
                      </span>
                      <span>Hair Restoration</span>
                    </span>
                    <span className="jerush-accordion-icon"></span>
                  </button>
                  <ul className={`jerush-mobile-subsubmenu ${activeSubAccordion === 'hair' ? 'open' : ''}`}>
                    <li className="jerush-mobile-submenu-header">Hair Fall Treatments</li>
                    <li>{renderHairIconItem('/treatments/prp-hair-treatment', 'PRP Hair Therapy', 'prp-hair-therapy.webp', handleLinkClick, true)}</li>
                    <li>{renderHairIconItem('/hair-restoration-treatments/gfc-growth-factor-concentrate', 'GFC Hair Therapy', 'gfc-hair-therapy.webp', handleLinkClick, true)}</li>
                    <li>{renderHairIconItem('/treatments/qr678-hair-treatment', 'QR678 Hair Therapy', 'qr678-hair-treatment.webp', handleLinkClick, true)}</li>
                    <li>{renderHairIconItem('/treatments/exocell-hair-treatment', 'Exocell Therapy', 'exocell-therapy.webp', handleLinkClick, true)}</li>
                    <li>{renderHairIconItem('/treatments/biocell-hair-treatment', 'Bio Cell Therapy', 'biocell-therapy.webp', handleLinkClick, true)}</li>

                    <li className="jerush-mobile-submenu-header">Hair Transplant</li>
                    <li>{renderHairIconItem('/hair-restoration-treatments/hair-transplant', 'Hair Transplant', 'hair-transplant.webp', handleLinkClick, true)}</li>
                    <li>{renderHairIconItem('/treatments/beard-transplant', 'Beard Transplant', 'beard-transplant.webp', handleLinkClick, true)}</li>
                    <li>{renderHairIconItem('/treatments/hairline-correction', 'Hairline Correction', 'hairline-correction.webp', handleLinkClick, true)}</li>

                    <li className="jerush-mobile-submenu-header">Scalp Care</li>
                    <li>{renderHairIconItem('/treatments/dandruff-treatment', 'Dandruff Treatment', 'dandruff-treatment.webp', handleLinkClick, true)}</li>
                    <li>{renderHairIconItem('/treatments/scalp-cleansing', 'Scalp Cleansing', 'scalp-cleansing-treatment.webp', handleLinkClick, true)}</li>
                    <li>{renderHairIconItem('/treatments/hair-growth-booster', 'Hair Growth Booster', 'hair-growth-booster.webp', handleLinkClick, true)}</li>
                  </ul>
                </li>
                <li className="jerush-mobile-subaccordion">
                  <button className={`jerush-mobile-subaccordion-toggle ${activeSubAccordion === 'body' ? 'active' : ''}`} onClick={() => handleSubAccordionToggle('body')}>
                    <span className="flex items-center gap-3 pointer-events-none">
                      <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-slate-950 border border-brandSky/60 shadow-[0_0_8px_rgba(30,151,212,0.5)] overflow-hidden shrink-0 isolate pointer-events-none">
                        <img src="/gifs/body-reduction.gif" alt="Body Contouring & Wellness" loading="eager" className="w-full h-full object-cover scale-110 pointer-events-none" />
                        <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-brandSky/40 pointer-events-none" />
                      </span>
                      <span>Body Contouring & Wellness</span>
                    </span>
                    <span className="jerush-accordion-icon"></span>
                  </button>
                  <ul className={`jerush-mobile-subsubmenu ${activeSubAccordion === 'body' ? 'open' : ''}`}>
                    <li className="jerush-mobile-submenu-header">Fat Reduction</li>
                    <li>{renderBodyIconItem('/body-contouring-wellness/cryo-cool-sculpting', 'Cryolipolysis Fat Reduction', 'cryolipolysis-fat-reduction.webp', handleLinkClick, true)}</li>
                    <li>{renderBodyIconItem('/treatments/emsculpt-body-contouring', 'EMSculpt Body Contouring', 'emsculpt-body-contouring.webp', handleLinkClick, true)}</li>

                    <li className="jerush-mobile-submenu-header">Body Sculpting</li>
                    <li>{renderBodyIconItem('/treatments/muscle-toning', 'Muscle Toning', 'muscle-toning.webp', handleLinkClick, true)}</li>
                    <li>{renderBodyIconItem('/treatments/rf-body-tightening', 'RF Body Tightening', 'rf-body-tightening.webp', handleLinkClick, true)}</li>

                    <li className="jerush-mobile-submenu-header">Women's Wellness</li>
                    <li>{renderBodyIconItem('/treatments/emsella-chair', 'Emsella Chair Therapy', 'emsella-chair-therapy.webp', handleLinkClick, true)}</li>
                    <li>{renderBodyIconItem('/treatments/pelvic-floor-treatment', 'Pelvic Floor Strengthening', 'pelvic-floor-strengthening.webp', handleLinkClick, true)}</li>
                    <li>{renderBodyIconItem('/treatments/clinical-wellness', 'Clinical Wellness Programs', 'clinical-wellness-programs.webp', handleLinkClick, true)}</li>
                  </ul>
                </li>
              </ul>
            </li>

            {/* Smile Stories Accordion */}
            <li className="jerush-mobile-item has-accordion">
              <button className={`jerush-mobile-accordion-toggle ${activeAccordion === 'gallery' ? 'active' : ''}`} onClick={() => handleAccordionToggle('gallery')}>
                Smile Stories <span className="jerush-accordion-icon"></span>
              </button>
              <ul className={`jerush-mobile-submenu ${activeAccordion === 'gallery' ? 'open' : ''}`}>
                <li className="jerush-mobile-subaccordion">
                  <button className={`jerush-mobile-subaccordion-toggle ${activeSubAccordion === 'gallery-results' ? 'active' : ''}`} onClick={() => handleSubAccordionToggle('gallery-results')}>
                    Before & After Results <span className="jerush-accordion-icon"></span>
                  </button>
                  <ul className={`jerush-mobile-subsubmenu ${activeSubAccordion === 'gallery-results' ? 'open' : ''}`}>
                    <li><Link to="/smile-stories?category=dental" onClick={handleLinkClick}>Smile Transformations</Link></li>
                    <li><Link to="/smile-stories?category=skin" onClick={handleLinkClick}>Cosmetic Resurfacing</Link></li>
                    <li><Link to="/smile-stories?category=hair" onClick={handleLinkClick}>Hair Regrowth Results</Link></li>
                    <li><Link to="/smile-stories?category=body" onClick={handleLinkClick}>Body Contouring Cases</Link></li>
                  </ul>
                </li>
                <li className="jerush-mobile-subaccordion">
                  <button className={`jerush-mobile-subaccordion-toggle ${activeSubAccordion === 'gallery-tours' ? 'active' : ''}`} onClick={() => handleSubAccordionToggle('gallery-tours')}>
                    Hospital & Outreach <span className="jerush-accordion-icon"></span>
                  </button>
                  <ul className={`jerush-mobile-subsubmenu ${activeSubAccordion === 'gallery-tours' ? 'open' : ''}`}>
                    <li><Link to="/video-testimonials" onClick={handleLinkClick}>Clinic Video Tour</Link></li>
                    <li><Link to="/events" onClick={handleLinkClick}>Hospital Facilities</Link></li>
                    <li><Link to="/camps" onClick={handleLinkClick}>Dental Health Camps</Link></li>
                    <li><Link to="/events" onClick={handleLinkClick}>Wellness Seminars</Link></li>
                  </ul>
                </li>
                <li className="jerush-mobile-subaccordion">
                  <button className={`jerush-mobile-subaccordion-toggle ${activeSubAccordion === 'gallery-testimonials' ? 'active' : ''}`} onClick={() => handleSubAccordionToggle('gallery-testimonials')}>
                    Patient Testimonials <span className="jerush-accordion-icon"></span>
                  </button>
                  <ul className={`jerush-mobile-subsubmenu ${activeSubAccordion === 'gallery-testimonials' ? 'open' : ''}`}>
                    <li><Link to="/video-testimonials" onClick={handleLinkClick}>Video Testimonials</Link></li>
                    <li><Link to="/smile-stories" onClick={handleLinkClick}>Photo Stories</Link></li>
                    <li><Link to="/reviews" onClick={handleLinkClick}>Google Reviews Feed</Link></li>
                  </ul>
                </li>
              </ul>
            </li>

            <li className="jerush-mobile-item">
              <Link to="/blog" onClick={handleLinkClick} className="jerush-mobile-link">Blog</Link>
            </li>
            <li className="jerush-mobile-item">
              <Link to="/careers" onClick={handleLinkClick} className="jerush-mobile-link">Careers</Link>
            </li>
            <li className="jerush-mobile-item">
              <Link to="/events" state={{ reset: Date.now() }} onClick={handleLinkClick} className="jerush-mobile-link">Jerush Events</Link>
            </li>
            <li className="jerush-mobile-item">
              <Link to="/contact" onClick={handleLinkClick} className="jerush-mobile-link">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Book Appointment CTA (Mobile Drawer) */}
        <div className="jerush-mobile-drawer-cta">
          <Link to="/contact" onClick={handleLinkClick} className="jerush-mobile-cta-btn">Book Appointment</Link>
        </div>
      </div>
    </div>
  );
}
