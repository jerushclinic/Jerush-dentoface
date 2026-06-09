/**
 * Jerush Banner Showcase Slider
 * Handles auto-sliding, indicators, touch swipe, and scroll-reveal animation
 */
(function () {
  'use strict';

  const slider = document.getElementById('jerushBannerSlider');
  const indicatorsContainer = document.getElementById('bannerIndicators');

  if (!slider) return;

  const slides = slider.querySelectorAll('.jerush-banner-slide');
  const indicators = indicatorsContainer
    ? indicatorsContainer.querySelectorAll('.jerush-indicator-dot')
    : [];

  let currentSlide = 0;
  let autoplayInterval = null;
  const AUTOPLAY_DELAY = 6000; // 6 seconds per slide

  // Hide indicators if only 1 slide
  if (slides.length <= 1 && indicatorsContainer) {
    indicatorsContainer.style.display = 'none';
  }

  /**
   * Go to a specific slide index
   */
  function goToSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    // Remove active from current
    slides[currentSlide].classList.remove('active');
    if (indicators[currentSlide]) {
      indicators[currentSlide].classList.remove('active');
    }

    // Activate new
    currentSlide = index;
    slides[currentSlide].classList.remove('active');
    // Force reflow for animation restart
    void slides[currentSlide].offsetWidth;
    slides[currentSlide].classList.add('active');

    if (indicators[currentSlide]) {
      indicators[currentSlide].classList.add('active');
    }
  }

  /**
   * Next slide
   */
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  /**
   * Start autoplay (only when multiple slides)
   */
  function startAutoplay() {
    if (slides.length <= 1) return;
    stopAutoplay();
    autoplayInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
  }

  /**
   * Stop autoplay
   */
  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  /**
   * Indicator click events
   */
  indicators.forEach(function (dot) {
    dot.addEventListener('click', function () {
      const slideIndex = parseInt(this.getAttribute('data-slide'), 10);
      goToSlide(slideIndex);
      stopAutoplay();
      startAutoplay(); // restart timer
    });
  });

  /**
   * Touch / Swipe support
   */
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  slider.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swiped left → next slide
        goToSlide(currentSlide + 1);
      } else {
        // Swiped right → previous slide
        goToSlide(currentSlide - 1);
      }
      stopAutoplay();
      startAutoplay();
    }
  }

  /**
   * Scroll-triggered entrance animation (IntersectionObserver)
   */
  const section = document.getElementById('jerush-banner-showcase');
  if (section && 'IntersectionObserver' in window) {
    section.style.opacity = '0';
    section.style.transform = 'translateY(40px)';
    section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
            observer.unobserve(section);
            // Start autoplay after section is visible
            startAutoplay();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
  } else {
    startAutoplay();
  }

  /**
   * Pause autoplay on hover (desktop)
   */
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);

})();
