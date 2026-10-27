import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useTreatmentScrollSpy
 * Robust, bidirectional (top-to-bottom and bottom-to-top) scrollspy hook
 * for treatment pages with sticky header (80px) and sticky sub-navigation (~54px).
 *
 * @param {string[]} sectionIds - Array of section DOM element IDs in page order
 * @param {number} headerOffset - Fallback offset in pixels
 */
export function useTreatmentScrollSpy(sectionIds, headerOffset = 138) {
  // Ensure initial active section is a valid ID from the list
  const [activeSection, setActiveSection] = useState(sectionIds?.[0] || '');
  const isManualScrollingRef = useRef(false);
  const scrollEndTimeoutRef = useRef(null);

  // Stable key from section IDs to prevent effect re-runs on new array references
  const sectionIdsKey = (sectionIds || []).join(',');

  // Dynamically measure actual live subnav height from DOM
  const getSubnavHeight = useCallback(() => {
    if (typeof window === 'undefined') return 54;
    const subnavEl = document.querySelector('.jerush-sticky-subnav');
    return subnavEl ? subnavEl.getBoundingClientRect().height : 54;
  }, []);

  // Dynamically calculate effective offset based on live header height and subnav height
  const getDynamicOffset = useCallback(() => {
    if (typeof window === 'undefined') return headerOffset;
    const isNavHidden = document.documentElement.classList.contains('nav-hidden');
    const computedH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height'));
    const headerH = !isNaN(computedH) && computedH > 0 ? computedH : 80;
    const subnavH = getSubnavHeight();
    return (isNavHidden ? 0 : headerH) + subnavH;
  }, [headerOffset, getSubnavHeight]);

  // Function to smoothly scroll to a section when a tab is clicked
  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) {
      console.warn(`[useTreatmentScrollSpy] Section #${id} not found in DOM.`);
      return;
    }

    setActiveSection(id);
    isManualScrollingRef.current = true;
    window.__jerush_subnav_scrolling = true;

    // Immediately hide the main navbar so the sticky subnav docks cleanly at top: 0
    document.documentElement.classList.add('nav-hidden');
    window.dispatchEvent(new CustomEvent('jerush:hide-nav'));

    // Clear any pending scroll-end timers
    if (scrollEndTimeoutRef.current) {
      clearTimeout(scrollEndTimeoutRef.current);
    }

    // Modern cleanup via scrollend event or fallback timer
    const finishScroll = () => {
      isManualScrollingRef.current = false;
      window.__jerush_subnav_scrolling = false;
      window.removeEventListener('scrollend', finishScroll);
      if (scrollEndTimeoutRef.current) {
        clearTimeout(scrollEndTimeoutRef.current);
      }
    };

    if ('onscrollend' in window) {
      window.addEventListener('scrollend', finishScroll, { once: true });
    }
    scrollEndTimeoutRef.current = setTimeout(finishScroll, 1200);

    // Calculate exact target position:
    // With header hidden, sticky subnav is at top: 0
    // Position section so its header starts neatly beneath the subnav with 16px of breathing margin
    const subnavHeight = getSubnavHeight();
    const breathingRoom = 16;
    const targetOffset = subnavHeight + breathingRoom;

    const elementRect = el.getBoundingClientRect();
    const currentScrollY = window.pageYOffset || window.scrollY;
    const elementTopAbsolute = elementRect.top + currentScrollY;
    const targetScrollY = Math.max(0, elementTopAbsolute - targetOffset);

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  }, [getSubnavHeight]);

  useEffect(() => {
    const rawIds = sectionIdsKey ? sectionIdsKey.split(',') : [];
    if (rawIds.length === 0) return;

    let ticking = false;

    const handleScroll = () => {
      if (isManualScrollingRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Filter to IDs that actually exist in the DOM
          const validIds = rawIds.filter(id => !!document.getElementById(id));
          if (validIds.length === 0) {
            ticking = false;
            return;
          }

          const scrollY = window.scrollY || window.pageYOffset;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;

          // 1. If at top of the page (hero banner area), activate first valid tab
          if (scrollY < 120) {
            setActiveSection(validIds[0]);
            ticking = false;
            return;
          }

          // 2. If reached near bottom of page (footer / CTA area), activate last valid tab
          if (windowHeight + scrollY >= documentHeight - 60) {
            setActiveSection(validIds[validIds.length - 1]);
            ticking = false;
            return;
          }

          // 3. Trigger line: offset where section top crosses sticky header + subnav
          const effectiveOffset = getDynamicOffset();
          const triggerLine = effectiveOffset + 32;

          let currentActive = validIds[0];

          for (let i = 0; i < validIds.length; i++) {
            const el = document.getElementById(validIds[i]);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= triggerLine) {
                currentActive = validIds[i];
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
      if (scrollEndTimeoutRef.current) {
        clearTimeout(scrollEndTimeoutRef.current);
      }
      isManualScrollingRef.current = false;
      window.__jerush_subnav_scrolling = false;
    };
  }, [sectionIdsKey, getDynamicOffset]);

  return { activeSection, setActiveSection, scrollToSection };
}

export default useTreatmentScrollSpy;

