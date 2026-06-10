/**
 * Jerush Treatments Page — Filter Logic & Animations
 * Handles category tab filtering with animated pill indicator and card transitions
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const filterBar = document.getElementById('treatmentsFilterBar');
    if (!filterBar) return;

    const tabs = filterBar.querySelectorAll('.jerush-filter-tab');
    const pill = filterBar.querySelector('.jerush-filter-pill');
    const grid = document.getElementById('treatmentsPageGrid');
    const cards = grid ? grid.querySelectorAll('.jerush-tpage-card') : [];
    let activeCategory = 'all';
    let isAnimating = false;

    // Initialize pill position
    function updatePillPosition(tab) {
      if (!pill || !tab) return;
      const barRect = filterBar.getBoundingClientRect();
      const tabRect = tab.getBoundingClientRect();
      pill.style.width = tabRect.width + 'px';
      pill.style.left = (tabRect.left - barRect.left) + 'px';
    }

    // Set initial pill position
    const activeTab = filterBar.querySelector('.jerush-filter-tab.active');
    if (activeTab && pill) {
      updatePillPosition(activeTab);
    }

    // Update pill on window resize
    window.addEventListener('resize', function () {
      const currentActive = filterBar.querySelector('.jerush-filter-tab.active');
      if (currentActive) updatePillPosition(currentActive);
    });

    // Tab click handler
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        if (isAnimating) return;
        const category = this.getAttribute('data-category');
        if (category === activeCategory) return;

        isAnimating = true;
        activeCategory = category;

        // Update active tab state
        tabs.forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');

        // Animate pill
        updatePillPosition(this);

        // Filter cards with staggered animation
        filterCards(category);
      });
    });

    function filterCards(category) {
      const visibleCards = [];
      const hiddenCards = [];

      cards.forEach(function (card) {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          visibleCards.push(card);
        } else {
          hiddenCards.push(card);
        }
      });

      // Hide non-matching cards
      hiddenCards.forEach(function (card) {
        card.classList.add('hiding');
        card.classList.remove('showing');
      });

      // After hide animation, show matching cards
      setTimeout(function () {
        hiddenCards.forEach(function (card) {
          card.style.display = 'none';
        });

        visibleCards.forEach(function (card, index) {
          card.style.display = '';
          card.classList.remove('hiding');
          card.classList.add('showing');
          card.style.animationDelay = (index * 0.06) + 's';
        });

        // Clean up animation classes
        setTimeout(function () {
          visibleCards.forEach(function (card) {
            card.classList.remove('showing');
            card.style.animationDelay = '';
          });
          isAnimating = false;
        }, 500);
      }, 300);
    }
  });
})();
