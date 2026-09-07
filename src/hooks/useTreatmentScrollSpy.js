import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useTreatmentScrollSpy
 * Robust, bidirectional (top-to-bottom and bottom-to-top) scrollspy hook
 * for treatment pages with sticky header (80px) and sticky sub-navigation (~50px).
 *
 * @param {string[]} sectionIds - Array of section DOM element IDs in page order
 * @param {number} headerOffset - Offset in pixels from top of viewport for sticky elements (default: 138)
 */
export function useTreatmentScrollSpy(sectionIds, headerOffset = 138) {
  const [activeSection, setActiveSection] = useState(sectionIds?.[0] || '');
  const isManualScrollingRef = useRef(false);
  const manualScrollTimeoutRef = useRef(null);

  // Stable key from section IDs to prevent effect re-runs on new array references
  const sectionIdsKey = (sectionIds || []).join(',');

  // Function to smoothly scroll to a section when a tab is clicked
  const scrollToSection = useCallback((id) => {
    setActiveSection(id);
    isManualScrollingRef.current = true;

    if (manualScrollTimeoutRef.current) {
      clearTimeout(manualScrollTimeoutRef.current);
    }
    // Lock scroll spy updates during smooth scroll animation
    manualScrollTimeoutRef.current = setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 850);

    const el = document.getElementById(id);
    if (el) {
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + (window.pageYOffset || window.scrollY) - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    }
  }, [headerOffset]);

  useEffect(() => {
    const ids = sectionIdsKey ? sectionIdsKey.split(',') : [];
    if (ids.length === 0) return;

    let ticking = false;

    const handleScroll = () => {
      if (isManualScrollingRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;

          // 1. If at top of the page (hero banner area), activate first tab
          if (scrollY < 120) {
            setActiveSection(ids[0]);
            ticking = false;
            return;
          }

          // 2. If reached near bottom of page (footer / CTA area), activate last tab
          if (windowHeight + scrollY >= documentHeight - 60) {
            setActiveSection(ids[ids.length - 1]);
            ticking = false;
            return;
          }

          // 3. Trigger line: effective offset where section top crosses sticky header + subnav
          // Header (80px) + Subnav (~52px) + buffer (28px) = ~160px from top of viewport
          const triggerLine = headerOffset + 24;

          let currentActive = ids[0];

          for (let i = 0; i < ids.length; i++) {
            const el = document.getElementById(ids[i]);
            if (el) {
              const rect = el.getBoundingClientRect();
              // When scrolling down, as soon as a section's top crosses the trigger line, it activates.
              // When scrolling up, as soon as a section's top goes below the trigger line, the previous section activates.
              if (rect.top <= triggerLine) {
                currentActive = ids[i];
              }
            }
          }

          setActiveSection(currentActive);
          ticking = false;
        });

        ticking = true;
      }
    };

    // Initial check on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (manualScrollTimeoutRef.current) {
        clearTimeout(manualScrollTimeoutRef.current);
      }
    };
  }, [sectionIdsKey, headerOffset]);

  return { activeSection, setActiveSection, scrollToSection };
}

export default useTreatmentScrollSpy;
