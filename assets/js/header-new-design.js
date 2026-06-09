/**
 * Jerush New Design Navigation JS
 * Handles: Sticky nav, Mega Menu tab switching scoped per menu, and Mobile Accordion Drawer
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMegaMenuTabs();
  initMobileDrawer();
  initLanguageSelector();
});

/**
 * 1. Sticky Header Functionality
 * Adds a class when the page is scrolled to make the navbar sticky and glassmorphic
 */
function initStickyHeader() {
  const header = document.querySelector('.jerush-header');
  if (!header) return;

  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const isMobile = window.innerWidth <= 1024;
    const heroSection = document.getElementById('jerush-hero');
    const heroHeight = heroSection ? heroSection.offsetHeight : 700;

    if (isMobile) {
      // Remove desktop class just in case
      header.classList.remove('sticky-nav');

      if (heroSection) {
        if (currentScrollY <= heroHeight - 10) {
          // Within hero zone: transparent, show header
          header.classList.remove('mobile-scrolled');
          header.classList.remove('nav-hide');
        } else {
          // Past hero zone
          if (currentScrollY > lastScrollY) {
            // Scrolling down -> hide navbar
            header.classList.add('nav-hide');
          } else {
            // Scrolling up -> show navbar with white glassmorphic bg
            header.classList.remove('nav-hide');
            header.classList.add('mobile-scrolled');
          }
        }
      } else {
        // Fallback for subpages without a hero
        if (currentScrollY > 40) {
          header.classList.add('mobile-scrolled');
        } else {
          header.classList.remove('mobile-scrolled');
        }

        if (currentScrollY > 150) {
          if (currentScrollY > lastScrollY) {
            header.classList.add('nav-hide');
          } else {
            header.classList.remove('nav-hide');
          }
        } else {
          header.classList.remove('nav-hide');
        }
      }
    } else {
      // Desktop behavior
      header.classList.remove('mobile-scrolled');

      if (currentScrollY > 40) {
        header.classList.add('sticky-nav');
      } else {
        header.classList.remove('sticky-nav');
      }

      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollY) {
          header.classList.add('nav-hide');
        } else {
          header.classList.remove('nav-hide');
        }
      } else {
        header.classList.remove('nav-hide');
      }
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleScroll);
  handleScroll();
}

/**
 * 2. Mega Menu Tab Switching (Desktop)
 * Toggles content panes inside their respective mega menus independently
 */
function initMegaMenuTabs() {
  const megamenus = document.querySelectorAll('.jerush-megamenu');
  
  megamenus.forEach(menu => {
    const tabs = menu.querySelectorAll('.jerush-category-tab');
    const panes = menu.querySelectorAll('.jerush-megamenu-pane');
    
    if (tabs.length === 0 || panes.length === 0) return;

    const switchTab = (tab) => {
      const targetId = tab.getAttribute('data-target');
      const targetPane = menu.querySelector('#' + targetId);

      if (!targetPane) return;

      // Deactivate tabs and panes ONLY within this specific mega menu
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      // Activate selected tab and pane
      tab.classList.add('active');
      targetPane.classList.add('active');
    };

    tabs.forEach(tab => {
      // Switch on Hover for premium fluid experience
      tab.addEventListener('mouseenter', () => {
        switchTab(tab);
      });

      // Switch on Click/Tap for accessibility
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        switchTab(tab);
      });
    });
  });
}

/**
 * 3. Mobile Navigation Drawer & Accordion Functionality
 * Handles hamburger toggling and sliding drawer, plus expanding nested lists
 */
function initMobileDrawer() {
  const hamburger = document.querySelector('.jerush-hamburger');
  const drawer = document.querySelector('.jerush-mobile-drawer');
  const overlay = document.querySelector('.jerush-mobile-overlay');
  const closeBtn = document.querySelector('.jerush-mobile-close');

  if (!hamburger || !drawer || !overlay) return;

  const openDrawer = () => {
    hamburger.setAttribute('aria-expanded', 'true');
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop background scrolling
  };

  const closeDrawer = () => {
    hamburger.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore background scrolling
  };

  // Open / Close events
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  // Esc key closes drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });

  // Handle Accordion Toggles (Mobile Menu)
  const accordionToggles = document.querySelectorAll('.jerush-mobile-accordion-toggle');
  
  accordionToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      
      const submenu = toggle.nextElementSibling;
      if (!submenu) return;

      const isOpen = submenu.classList.contains('open');

      // Close other top level accordions
      accordionToggles.forEach(otherToggle => {
        if (otherToggle !== toggle) {
          otherToggle.classList.remove('active');
          const otherSubmenu = otherToggle.nextElementSibling;
          if (otherSubmenu) {
            otherSubmenu.classList.remove('open');
            otherSubmenu.style.maxHeight = null;
          }
        }
      });

      if (isOpen) {
        toggle.classList.remove('active');
        submenu.classList.remove('open');
        submenu.style.maxHeight = null;
      } else {
        toggle.classList.add('active');
        submenu.classList.add('open');
        submenu.style.maxHeight = submenu.scrollHeight + 'px';
      }
    });
  });

  // Handle Nested Sub-accordion Toggles
  const subaccordionToggles = document.querySelectorAll('.jerush-mobile-subaccordion-toggle');
  
  subaccordionToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      
      const subsubmenu = toggle.nextElementSibling;
      if (!subsubmenu) return;

      const parentSubmenu = toggle.closest('.jerush-mobile-submenu');
      const isOpen = subsubmenu.classList.contains('open');

      if (isOpen) {
        toggle.classList.remove('active');
        subsubmenu.classList.remove('open');
        subsubmenu.style.maxHeight = null;
      } else {
        toggle.classList.add('active');
        subsubmenu.classList.add('open');
        subsubmenu.style.maxHeight = subsubmenu.scrollHeight + 'px';
        
        // Dynamically adjust parent height to accommodate the expanded child height
        if (parentSubmenu) {
          parentSubmenu.style.maxHeight = (parentSubmenu.scrollHeight + subsubmenu.scrollHeight) + 'px';
        }
      }
    });
  });
}

/**
 * 4. Language Selector Dropdown Functionality
 * Handles toggling, click-outside, and selections of different languages.
 */
function initLanguageSelector() {
  const btn = document.getElementById('langSelectBtn');
  const dropdown = document.getElementById('langDropdown');
  if (!btn || !dropdown) return;

  // Translation Dictionaries
  const translations = {
    en: {
      nav_book: "Book Appt",
      nav_clinics: "Clinics",
      nav_specialities: "Specialities",
      nav_stories: "Stories",
      nav_home: "Home",
      nav_about: "About Us",
      nav_gallery: "Gallery",
      nav_blogs: "Blogs",
      nav_contact: "Contact Us",
      nav_book_cta: "Book Appointment",
      spec_label: "What We Specialize In",
      spec_title: "Comprehensive Clinical Specialities",
      spec_desc: "Jerush offers specialized medical care across four integrated wings. Select a speciality to learn more.",
      card_dentistry_title: "Multispeciality Dentistry",
      card_dentistry_desc: "From custom invisible aligners (Jerushaligne) and digital implants to single-visit root canal treatments.",
      card_derma_title: "Laser Dermatology",
      card_derma_desc: "Advanced fractional CO₂ lasers, Pico laser tattoo/pigment removal, skin resurfacing, and premium gold facials.",
      card_hair_title: "Hair Restoration",
      card_hair_desc: "Scientific solutions including GFC, QR678 regrowth therapy, scalp laser cleansing, and micro-FUE transplants.",
      card_body_title: "Body Contouring",
      card_body_desc: "Non-invasive wellness tech like Cryo Cool Sculpting, EM-Muscle sculpting, and Emsella pelvic floor strengthening.",
      card_learn_more: "Learn More",
      tech_label: "Built for Accuracy",
      tech_title: "Equipped with Advanced Precision Technology",
      tech_desc: "At Jerush, we believe in diagnostic precision. Our facility features in-house CBCT radiology (3D imaging) and the latest medical labs, ensuring your treatment plan is drafted with total clarity.",
      tech_item1_title: "In-house Dental & Medical Lab",
      tech_item1_desc: "Same-day precision dental crowns and bridges crafted on site.",
      tech_item2_title: "CBCT & Digital Radiology",
      tech_item2_desc: "Safe, ultra-low radiation 3D scanning for implantology and bone mapping.",
      tech_item3_title: "Lumenis & Cynosure FDA Laser Systems",
      tech_item3_desc: "Gold-standard aesthetic lasers targeting skin texture and pigmentation.",
      tech_card_title: "Technological Precision",
      tech_card_desc: "Our diagnostic labs operate under strict ISO standards, providing clinical validation for surgical and dermatological treatments.",
      gallery_label: "Smile Gallery",
      gallery_title: "Real Transformations, Real Stories",
      gallery_desc: "Explore actual results from patient cosmetic restorations and orthodontic alignment treatments.",
      gallery_case1_title: "Clear Aligners (Jerushaligne)",
      gallery_case1_time: "14 Months Treatment Time",
      gallery_case1_name: "Smile Gap Closure",
      gallery_case1_desc: "Non-extraction alignment correction for upper gap spacing.",
      gallery_case2_title: "Cosmetic Resurfacing",
      gallery_case2_time: "4 Sittings (Laser)",
      gallery_case2_name: "Acne Scar Reduction",
      gallery_case2_desc: "Acne pitting repair utilizing Fractional CO₂ Laser skin boosting.",
      gallery_case3_title: "Hair Restoration",
      gallery_case3_time: "6 Sessions (GFC)",
      gallery_case3_name: "Scalp Hair Regrowth",
      gallery_case3_desc: "Growth factor booster treatment correcting crown bald patches.",
      gallery_btn: "View Full Gallery",
      loc_label: "Our Facilities",
      loc_title: "Clinic Locations & Support Helplines",
      loc_desc: "Reach out to our local clinic desks in India or the UAE liaison support desk for direct inquiries.",
      loc_name1: "Thuckalay Desk",
      loc_desc1: "Jerush Dentoface, Thuckalay Centre, Kanyakumari, Tamil Nadu.",
      loc_name2: "Trichy Clinic",
      loc_desc2: "Cosmetic Laser & Dental Care Centre, Trichy, Tamil Nadu.",
      loc_name3: "Chennai Centre",
      loc_desc3: "Regional Dental Care liaison office, Chennai, Tamil Nadu.",
      loc_name4: "Dubai Liaison",
      loc_desc4: "International Liaison & Medical tourism support desk, Dubai, UAE.",
      hero_cta_book: "Book Appointment",
      hero_cta_book_sub: "Schedule a visit online",
      hero_cta_clinics: "Find Clinics",
      hero_cta_clinics_sub: "Locate centre near you",
      hero_cta_specs: "Specialities",
      hero_cta_specs_sub: "View medical wings",
      hero_cta_stories: "Smile Stories",
      hero_cta_stories_sub: "View patient transformations"
    },
    ta: {
      nav_book: "பதிவு செய்ய",
      nav_clinics: "கிளினிக்குகள்",
      nav_specialities: "சிறப்பு பிரிவுகள்",
      nav_stories: "கதைகள்",
      nav_home: "முகப்பு",
      nav_about: "எங்களைப் பற்றி",
      nav_gallery: "காட்சியகம்",
      nav_blogs: "வலைப்பதிவுகள்",
      nav_contact: "தொடர்பு கொள்ள",
      nav_book_cta: "பதிவு செய்ய",
      spec_label: "எங்கள் சிறப்பு சிகிச்சைகள்",
      spec_title: "முழுமையான மருத்துவ சேவைகள்",
      spec_desc: "ஜெருஷ் நான்கு ஒருங்கிணைந்த பிரிவுகளில் சிறப்பு மருத்துவ சேவைகளை வழங்குகிறது. மேலும் அறிய ஒரு பிரிவைத் தேர்ந்தெடுக்கவும்.",
      card_dentistry_title: "பல் மருத்துவத் துறை",
      card_dentistry_desc: "இன்விசிபிள் அலைனர்கள், டிஜிட்டல் பல் மாற்று சிகிச்சை மற்றும் ஒற்றை அமர்வு வேர் சிகிச்சை (Root Canal) போன்ற நவீன சேவைகள்.",
      card_derma_title: "லேசர் தோல் சிகிச்சை",
      card_derma_desc: "நவீன CO₂ லேசர், டாட்டூ மற்றும் நிறமி நீக்கம், தோல் புத்துணர்ச்சி மற்றும் பிரீமியம் கோல்ட் ஃபேஷியல் சிகிச்சைகள்.",
      card_hair_title: "முடி மாற்று சிகிச்சை",
      card_hair_desc: "வளர்ச்சி காரணி பூஸ்டர் (GFC), QR678 முடி வளர்ச்சி சிகிச்சை, லேசர் சுத்தம் மற்றும் FUE முடி மாற்று முறைகள்.",
      card_body_title: "உடல் பருமன் குறைப்பு",
      card_body_desc: "அறுவைசிகிச்சை இல்லாத உடல் பருமன் குறைப்பு, தசை வலுப்படுத்துதல் மற்றும் இடுப்பு தசை சீரமைப்பு சிகிச்சைகள்.",
      card_learn_more: "மேலும் அறிய",
      tech_label: "துல்லியமான கண்டறிதல்",
      tech_title: "நவீன அதிநவீன தொழில்நுட்பங்கள்",
      tech_desc: "ஜெருஷில், நாங்கள் துல்லியமான நோய் கண்டறிதலை நம்புகிறோம். எங்கள் மையத்தில் 3D இமேஜிங் மற்றும் நவீன ஆய்வகங்கள் உள்ளன, இது சிகிச்சையைத் துல்லியமாகத் திட்டமிட உதவுகிறது.",
      tech_item1_title: "உள் பல் மற்றும் மருத்துவ ஆய்வகம்",
      tech_item1_desc: "ஒரே நாளில் துல்லியமான பல் கிரீடங்கள் மற்றும் பால்கள் தயாரிக்கப்படுகின்றன.",
      tech_item2_title: "CBCT & டிஜிட்டல் ரேடியாலஜி",
      tech_item2_desc: "பாதுகாப்பான, மிகக் குறைந்த கதிர்வீச்சு கொண்ட 3D ஸ்கேனிங் வசதி.",
      tech_item3_title: "அங்கீகரிக்கப்பட்ட லேசர் அமைப்புகள்",
      tech_item3_desc: "தோல் அமைப்பு மற்றும் நிறமிகளைக் குறிவைக்கும் சிறந்த அழகியல் லேசர்கள்.",
      tech_card_title: "தொழில்நுட்ப துல்லியம்",
      tech_card_desc: "எங்கள் கண்டறியும் ஆய்வகங்கள் கடுமையான ISO தரநிலைகளின் கீழ் செயல்படுகின்றன, அறுவை சிகிச்சை மற்றும் தோல் சிகிச்சைகளுக்கு மருத்துவ அங்கீகாரத்தை வழங்குகின்றன.",
      gallery_label: "புன்னகை காட்சியகம்",
      gallery_title: "உண்மையான மாற்றங்கள், உண்மையான கதைகள்",
      gallery_desc: "அழகியல் பற்கள் சீரமைப்பு மற்றும் ஆர்த்தோடோன்டிக் சிகிச்சைகளின் உண்மையான முடிவுகளை ஆராயுங்கள்.",
      gallery_case1_title: "இன்விசிபிள் அலைனர்கள்",
      gallery_case1_time: "14 மாத சிகிச்சை காலம்",
      gallery_case1_name: "பற்கள் இடைவெளி மூடுதல்",
      gallery_case1_desc: "பற்களை எடுக்காமல் மேல் பற்களின் இடைவெளியை சீரமைக்கும் சிகிச்சை.",
      gallery_case2_title: "தோல் புத்துணர்ச்சி சிகிச்சை",
      gallery_case2_time: "4 அமர்வுகள் (லேசர்)",
      gallery_case2_name: "முகப்பரு தழும்பு குறைப்பு",
      gallery_case2_desc: "CO₂ லேசர் மூலம் முகப்பரு தழும்புகளை சரிசெய்யும் சிகிச்சை.",
      gallery_case3_title: "முடி மாற்று சிகிச்சை",
      gallery_case3_time: "6 அமர்வுகள் (GFC)",
      gallery_case3_name: "தலைமுடி மீண்டும் வளர்தல்",
      gallery_case3_desc: "வளர்ச்சி காரணி பூஸ்டர் சிகிச்சை மூலம் வழுக்கையை சரிசெய்தல்.",
      gallery_btn: "முழு காட்சியகத்தை பார்க்க",
      loc_label: "எங்கள் கிளைகள்",
      loc_title: "சிகிச்சை மையங்கள் மற்றும் உதவி எண்கள்",
      loc_desc: "நேரடி விசாரணைகளுக்கு இந்தியாவில் உள்ள எங்கள் கிளினிக் அல்லது ஐக்கிய அரபு அமீரக ஆதரவு மேசையைத் தொடர்பு கொள்ளவும்.",
      loc_name1: "தக்கலை கிளை",
      loc_desc1: "ஜெருஷ் டெண்டோஃபேஸ், தக்கலை மையம், கன்னியாகுமரி, தமிழ்நாடு.",
      loc_name2: "திருச்சி கிளை",
      loc_desc2: "அழகியல் லேசர் மற்றும் பல் பராமரிப்பு மையம், திருச்சி, தமிழ்நாடு.",
      loc_name3: "சென்னை கிளை",
      loc_desc3: "பிராந்திய பல் பராமரிப்பு தொடர்பு அலுவலகம், சென்னை, தமிழ்நாடு.",
      loc_name4: "துபாய் தொடர்பு அலுவலகம்",
      loc_desc4: "சர்வதேச தொடர்பு மற்றும் மருத்துவ சுற்றுலா ஆதரவு மேசை, துபாய், யுஏஇ.",
      hero_cta_book: "பதிவு செய்ய",
      hero_cta_book_sub: "ஆன்லைனில் பதிவு செய்ய",
      hero_cta_clinics: "கிளினிக்குகள்",
      hero_cta_clinics_sub: "அருகிலுள்ள கிளைகளை அறிய",
      hero_cta_specs: "சிறப்பு பிரிவுகள்",
      hero_cta_specs_sub: "மருத்துவ சேவைகளைக் காண",
      hero_cta_stories: "புன்னகை கதைகள்",
      hero_cta_stories_sub: "நோயாளிகளின் மாற்றங்களைக் காண"
    },
    ar: {
      nav_book: "حجز موعد",
      nav_clinics: "العيادات",
      nav_specialities: "التخصصات",
      nav_stories: "قصص",
      nav_home: "الرئيسية",
      nav_about: "من نحن",
      nav_gallery: "المعرض",
      nav_blogs: "المدونات",
      nav_contact: "اتصل بنا",
      nav_book_cta: "حجز موعد",
      spec_label: "ما نتخصص فيه",
      spec_title: "التخصصات السريرية الشاملة",
      spec_desc: "يقدم جيروش رعاية طبية متخصصة عبر أربعة أجنحة متكاملة. اختر التخصص لمعرفة المزيد.",
      card_dentistry_title: "طب الأسنان متعدد التخصصات",
      card_dentistry_desc: "من تقويم الأسنان الشفاف المخصص وزراعة الأسنان الرقمية إلى علاجات قناة الجذر في زيارة واحدة.",
      card_derma_title: "طب الجلد بالليزر",
      card_derma_desc: "ليزر ثاني أكسيد الكربون الجزئي المتقدم، وإزالة التصبغ والوشم بليزر بيكو، وتجديد البشرة.",
      card_hair_title: "استعادة الشعر",
      card_hair_desc: "حلول علمية تشمل علاج نمو الشعر GFC و QR678، وتطهير فروة الرأس بالليزر، وزراعة الشعر FUE.",
      card_body_title: "نحت الجسم",
      card_body_desc: "تقنيات غير جراحية لنحت الجسم مثل نحت العضلات الكهرومغناطيسي، وتقوية عضلات الحوض.",
      card_learn_more: "لمعرفة المزيد",
      tech_label: "صُنعت بدقة",
      tech_title: "مجهزة بتقنية الدقة المتقدمة",
      tech_desc: "في جيروش، نؤمن بدقة التشخيص. تتميز منشأتنا بالتصوير ثلاثي الأبعاد وأحدث المختبرات الطبية، لضمان وضع خطة علاجك بوضوح تام.",
      tech_item1_title: "مختبر الأسنان الطبي الداخلي",
      tech_item1_desc: "تيجان وجسور أسنان دقيقة في نفس اليوم يتم تصنيعها في الموقع.",
      tech_item2_title: "CBCT والأشعة الرقمية",
      tech_item2_desc: "فحص ثلاثي الأبعاد آمن ومنخفض الإشعاع لزراعة الأسنان وتخطيط العظام.",
      tech_item3_title: "أنظمة ليزر معتمدة من إدارة الغذاء والدواء",
      tech_item3_desc: "أجهزة ليزر تجميلية ممتازة تستهدف نسيج الجلد والتصبغ.",
      tech_card_title: "الدقة التكنولوجية",
      tech_card_desc: "تعمل مختبراتنا التشخيصية بموجب معايير ISO الصارمة، مما يوفر التحقق السريري للعلاجات الجراحية والجلدية.",
      gallery_label: "معرض الابتسامات",
      gallery_title: "تحولات حقيقية، وقصص واقعية",
      gallery_desc: "استكشف النتائج الفعلية لترميمات التجميل وعلاجات تقويم الأسنان للمرضى.",
      gallery_case1_title: "تقويم الأسنان الشفاف",
      gallery_case1_time: "مدة العلاج 14 شهرًا",
      gallery_case1_name: "إغلاق فجوة الابتسامة",
      gallery_case1_desc: "تصحيح محاذاة الفكين العلويين دون خلع أسنان للفجوات السنية.",
      gallery_case2_title: "إعادة أسطح الجلد التجميلية",
      gallery_case2_time: "4 جلسات (ليزر)",
      gallery_case2_name: "تقليل ندبات حب الشباب",
      gallery_case2_desc: "اصلاح حفر حب الشباب باستخدام تعزيز الجلد بليزر CO₂ المجزأ.",
      gallery_case3_title: "استعادة الشعر",
      gallery_case3_time: "6 جلسات (GFC)",
      gallery_case3_name: "إعادة نمو شعر فروة الرأس",
      gallery_case3_desc: "علاج معزز لعامل النمو لتصحيح بقع الصلع في تاج الرأس.",
      gallery_btn: "عرض المعرض الكامل",
      loc_label: "مرافقنا",
      loc_title: "مواقع العيادات وخطوط الدعم",
      loc_desc: "تواصل مع مكاتب عياداتنا المحلية في الهند أو مكتب دعم وتنسيق الإمارات للاستفسارات المباشرة.",
      loc_name1: "مكتب ثوكالاي",
      loc_desc1: "جيروش دينتوفيس، مركز ثوكالاي، كينياكوماري، تاميل نادو.",
      loc_name2: "عيادة تريشي",
      loc_desc2: "مركز التجميل بالليزر والعناية بالأسنان، تريشي، تاميل نادو.",
      loc_name3: "مركز تشيناي",
      loc_desc3: "مكتب تنسيق العناية بالأسنان الإقليمي، تشيناي، تاميل نادو.",
      loc_name4: "مكتب اتصال دبي",
      loc_desc4: "مكتب الاتصال الدولي ودعم السياحة العلاجية، دبي، الإمارات.",
      hero_cta_book: "حجز موعد",
      hero_cta_book_sub: "جدول زيارة عبر الإنترنت",
      hero_cta_clinics: "البحث عن العيادات",
      hero_cta_clinics_sub: "تحديد موقع مركز بالقرب منك",
      hero_cta_specs: "التخصصات",
      hero_cta_specs_sub: "عرض الأجنحة الطبية",
      hero_cta_stories: "قصص الابتسامات",
      hero_cta_stories_sub: "عرض تحولات المرضى"
    },
    hi: {
      nav_book: "बुक अपॉइंटमेंट",
      nav_clinics: "क्लीनिक",
      nav_specialities: "विशेषज्ञताएं",
      nav_stories: "कहानियाँ",
      nav_home: "होम",
      nav_about: "हमारे बारे में",
      nav_gallery: "गैलरी",
      nav_blogs: "ब्लॉग",
      nav_contact: "संपर्क करें",
      nav_book_cta: "अपॉइंटमेंट बुक करें",
      spec_label: "हम किसमें विशेषज्ञ हैं",
      spec_title: "व्यापक नैदानिक ​​विशेषज्ञताएं",
      spec_desc: "जेरुश चार एकीकृत विंगों में विशेष चिकित्सा देखभाल प्रदान करता है। अधिक जानने के लिए एक विशेषता चुनें.",
      card_dentistry_title: "बहु-विशेषज्ञता दंत चिकित्सा",
      card_dentistry_desc: "कस्टम इनविजिबल एलाइनर्स (जेरुशलाइन), डिजिटल इम्प्लांट से लेकर सिंगल-विजिट रूट कैनाल उपचार तक।",
      card_derma_title: "लेजर त्वचा विज्ञान",
      card_derma_desc: "उन्नत आंशिक CO₂ लेजर, पिको लेजर टैटू/पिगमेंट हटाना, त्वचा का पुनरुत्थान, और प्रीमियम गोल्ड फेशियल।",
      card_hair_title: "बालों की बहाली",
      card_hair_desc: "जीएफसी (GFC), QR678 थेरेपी, स्कैल्प लेजर क्लींजिंग और माइक्रो-FUE हेयर ट्रांसप्लांट सहित वैज्ञानिक समाधान।",
      card_body_title: "बॉडी कॉन्टूरिंग",
      card_body_desc: "गैर-आक्रामक वेलनेस तकनीक जैसे क्रायो कूल स्कल्पटिंग, ईएम-मसल स्कल्पटिंग और पेल्विक फ्लोर थेरेपी।",
      card_learn_more: "अधिक जानें",
      tech_label: "सटीकता के लिए निर्मित",
      tech_title: "उन्नत परिशुद्धता तकनीक से सुसज्जित",
      tech_desc: "जेरुश में, हम सटीक निदान में विश्वास करते हैं। हमारी सुविधा में 3D इमेजिंग और नवीनतम चिकित्सा प्रयोगशालाएँ शामिल हैं, जिससे उपचार योजना स्पष्ट हो जाती है।",
      tech_item1_title: "इन-हाउस डेंटल और मेडिकल लैब",
      tech_item1_desc: "एक ही दिन में सटीक डेंटल क्राउन और ब्रिज साइट पर तैयार किए जाते हैं।",
      tech_item2_title: "CBCT और डिजिटल रेडियोलॉजी",
      tech_item2_desc: "इम्प्लांटोलॉजी और बोन मैपिंग के लिए सुरक्षित, अल्ट्रा-लो रेडिएशन 3D स्कैनिंग।",
      tech_item3_title: "एफडीए लेजर सिस्टम",
      tech_item3_desc: "त्वचा की बनावट और रंजकता को लक्षित करने वाले उत्कृष्ट सौंदर्य लेजर।",
      tech_card_title: "तकनीकी सटीकता",
      tech_card_desc: "हमारी नैदानिक ​​प्रयोगशालाएँ सख्त आईएसओ मानकों के तहत काम करती हैं, जो सर्जिकल और त्वचा संबंधी उपचारों के लिए नैदानिक ​​सत्यापन प्रदान करती हैं।",
      gallery_label: "स्माइल गैलरी",
      gallery_title: "वास्तविक बदलाव, वास्तविक कहानियाँ",
      gallery_desc: "रोगियों के कॉस्मेटिक रिस्टोरेशन और ऑर्थोडॉन्टिक उपचार के वास्तविक परिणाम देखें।",
      gallery_case1_title: "क्लियर एलाइनर",
      gallery_case1_time: "14 महीने उपचार का समय",
      gallery_case1_name: "दांतों के बीच का अंतर कम करना",
      gallery_case1_desc: "ऊपरी दांतों के बीच के अंतर को ठीक करने के लिए बिना दांत निकाले एलाइनमेंट।",
      gallery_case2_title: "कॉस्मेटिक रीसर्फेसिंग",
      gallery_case2_time: "4 सीटिंग्स (लेजर)",
      gallery_case2_name: "मुँहासे के निशान कम करना",
      gallery_case2_desc: "फ्रैक्शनल CO₂ लेजर स्किन बूस्टिंग का उपयोग करके मुँहासे के गड्ढों को ठीक करना।",
      gallery_case3_title: "बालों की बहाली",
      gallery_case3_time: "6 सत्र (GFC)",
      gallery_case3_name: "बालों का दोबारा उगना",
      gallery_case3_desc: "सिर के गंजे पैच को ठीक करने के लिए ग्रोथ फैक्टर बूस्टर उपचार।",
      gallery_btn: "पूरी गैलरी देखें",
      loc_label: "हमारी सुविधाएं",
      loc_title: "क्लीनिक स्थान और सहायता हेल्पलाइन",
      loc_desc: "सीधे पूछताछ के लिए भारत में हमारे स्थानीय क्लिनिक डेस्क या यूएई संपर्क सहायता डेस्क से संपर्क करें।",
      loc_name1: "थुकले डेस्क",
      loc_desc1: "जेरुश डेंटोफेस, थुकले सेंटर, कन्याकुमारी, तमिलनाडु।",
      loc_name2: "त्रिची क्लिनिक",
      loc_desc2: "कॉस्मेटिक लेजर और डेंटल केयर सेंटर, त्रिची, तमिलनाडु।",
      loc_name3: "चेन्नई केंद्र",
      loc_desc3: "क्षेत्रीय दंत चिकित्सा संपर्क कार्यालय, चेन्नई, तमिलनाडु।",
      loc_name4: "दुबई संपर्क",
      loc_desc4: "अंतर्राष्ट्रीय संपर्क और चिकित्सा पर्यटन सहायता डेस्क, दुबई, यूएई।",
      hero_cta_book: "अपॉइंटमेंट बुक करें",
      hero_cta_book_sub: "ऑनलाइन अपॉइंटमेंट लें",
      hero_cta_clinics: "क्लीनिक खोजें",
      hero_cta_clinics_sub: "अपने नजदीकी केंद्र का पता लगाएं",
      hero_cta_specs: "विशेषज्ञताएं",
      hero_cta_specs_sub: "चिकित्सा प्रभाग देखें",
      hero_cta_stories: "स्माइल कहानियाँ",
      hero_cta_stories_sub: "रोगियों के बदलाव देखें"
    },
    ml: {
      nav_book: "ബുക്കിംഗ്",
      nav_clinics: "ക്ലിനിക്കുകൾ",
      nav_specialities: "ചികിത്സകൾ",
      nav_stories: "ചരിത്രങ്ങൾ",
      nav_home: "ഹോം",
      nav_about: "ഞങ്ങളെക്കുറിച്ച്",
      nav_gallery: "ഗാലറി",
      nav_blogs: "ബ്ലോഗുകൾ",
      nav_contact: "ബന്ധപ്പെടുക",
      nav_book_cta: "ബുക്കിംഗ്",
      spec_label: "ഞങ്ങളുടെ സ്പെഷ്യാലിറ്റികൾ",
      spec_title: "വിപുലമായ ക്ലിനിക്കൽ സ്പെഷ്യാലിറ്റികൾ",
      spec_desc: "ജെറുഷ് നാല് സംയോജിത വിഭാഗങ്ങളിലായി പ്രത്യേക പരിചരണം നൽകുന്നു. കൂടുതൽ അറിയാൻ ഒരു സ്പെഷ്യാലിറ്റി തിരഞ്ഞെടുക്കുക.",
      card_dentistry_title: "മൾട്ടിസ്പെഷ്യാലിറ്റി ദന്തചികിത്സ",
      card_dentistry_desc: "ഇൻവിസിബിൾ അലൈനറുകൾ, ഡിജറ്റൽ ഇംപ്ലാന്റുകൾ, ഒരു സിറ്റിംഗിലുള്ള റൂട്ട് കനാൽ ചികിത്സകൾ എന്നിവ.",
      card_derma_title: "ലേസർ ഡെർമറ്റോളജി",
      card_derma_desc: "അത്യാധുനിക CO₂ ലേസർ, ടാറ്റൂ/പിഗ്മെന്റേഷൻ മാറ്റൽ, ചർമ്മം പുനരുജ്ജീവിപ്പിക്കൽ, ഗോൾഡ് ഫേഷ്യൽ എന്നിവ.",
      card_hair_title: "ഹെയർ റീസ്റ്റോറേഷൻ",
      card_hair_desc: "ജിഎഫ്സി (GFC), QR678 മുടി വളർച്ചാ ചികിത്സകൾ, തലയോട്ടി ലേസർ ക്ലീൻസിംഗ്, എഫ്.യു.ഇ ഹെയർ ട്രാൻസ്പ്ലാന്റ്.",
      card_body_title: "ബോഡി കോണ്ടൂറിംഗ്",
      card_body_desc: "സർജറി ഇല്ലാത്ത കൊഴുപ്പ് കുറയ്ക്കൽ, പേശി ശക്തിപ്പെടുത്തൽ, ഇടുപ്പ് പേശി പുനരുജ്ജീവന ചികിത്സകൾ.",
      card_learn_more: "കൂടുതൽ അറിയാൻ",
      tech_label: "കൃത്യതയ്ക്കായി നിർമ്മിച്ചത്",
      tech_title: "അത്യാധുനിക കൃത്യതയുള്ള സാങ്കേതികവിദ്യ",
      tech_desc: "ജെറുഷിൽ കൃത്യമായ രോഗനിർണ്ണയം ഞങ്ങൾ ഉറപ്പുനൽകുന്നു. ഞങ്ങളുടെ കേന്ദ്രത്തിൽ 3D ഇമേജിംഗും അത്യാധുനിക ലാബുകളും ലഭ്യമാണ്.",
      tech_item1_title: "ഇൻ-ഹൗസ് ഡെന്റൽ & മെഡിക്കൽ ലാബ്",
      tech_item1_desc: "കൃത്യതയാർന്ന ദന്ത കിരീടങ്ങളും ബ്രിഡ്ജുകളും ഒരേ ദിവസം തന്നെ തയ്യാറാക്കുന്നു.",
      tech_item2_title: "CBCT & ഡിജിറ്റൽ റേഡിയോളജി",
      tech_item2_desc: "കുറഞ്ഞ വികിരണത്തോടെയുള്ള സുരക്ഷിതമായ 3D സ്കാനിംഗ് സൗകര്യം.",
      tech_item3_title: "അംഗീകൃത ലേസർ സംവിധാനങ്ങൾ",
      tech_item3_desc: "ചർമ്മത്തിന്റെ ഘടനയും നിറവും മെച്ചപ്പെടുത്തുന്ന മികച്ച ലേസർ ചികിത്സകൾ.",
      tech_card_title: "സാങ്കേതിക കൃത്യത",
      tech_card_desc: "ശസ്ത്രക്രിയകൾക്കും ചർമ്മ ചികിത്സകൾക്കും ക്ലിനിക്കൽ സ്ഥിരീകരണം നൽകുന്ന ഞങ്ങളുടെ ലബോറട്ടറികൾ ISO അംഗീകൃതമാണ്.",
      gallery_label: "സ്മൈൽ ഗാലറി",
      gallery_title: "യഥാർത്ഥ മാറ്റങ്ങൾ, യഥാർത്ഥ കഥകൾ",
      gallery_desc: "രോഗികളുടെ ദന്ത ക്രമീകരണങ്ങളുടെയും ചികിത്സകളുടെയും യഥാർത്ഥ ഫലങ്ങൾ കാണുക.",
      gallery_case1_title: "ക്ലിയർ അലൈനറുകൾ",
      gallery_case1_time: "14 മാസത്തെ ചികിത്സ",
      gallery_case1_name: "പല്ലുകളിലെ വിടവ് നികത്തൽ",
      gallery_case1_desc: "പല്ല് പിഴുതെടുക്കാതെയുള്ള മുകൾ നിരയിലെ വിടവ് നികത്തൽ ചികിത്സ.",
      gallery_case2_title: "കോസ്മെറ്റിക് റീസർഫേസിംഗ്",
      gallery_case2_time: "4 സിറ്റിംഗുകൾ (ലേസർ)",
      gallery_case2_name: "മുഖക്കുരു പാടുകൾ മാറ്റൽ",
      gallery_case2_desc: "CO₂ ലേസർ ഉപയോഗിച്ചുള്ള മുഖക്കുരുവിന്റെ പാടുകൾ മാറ്റുന്ന ചികിത്സ.",
      gallery_case3_title: "ഹെയർ റീസ്റ്റോറേഷൻ",
      gallery_case3_time: "6 സെഷനുകൾ (GFC)",
      gallery_case3_name: "മുടി വളർച്ചാ ചികിത്സ",
      gallery_case3_desc: "മുടി കൊഴിച്ചിൽ തടഞ്ഞു തലയിൽ മുടി വളരാൻ സഹായിക്കുന്ന ചികിത്സ.",
      gallery_btn: "ഗാലറി കാണുക",
      loc_label: "ഞങ്ങളുടെ ശാഖകൾ",
      loc_title: "ക്ലിനിക്ക് ലൊക്കേഷനുകളും ഹെൽപ്പ്‌ലൈനുകളും",
      loc_desc: "കൂടുതൽ വിവരങ്ങൾക്കായി ഞങ്ങളുടെ ഇന്ത്യയിലെ ക്ലിനിക്കുകളുമായോ യുഎഇ ഡെസ്കുമായോ ബന്ധപ്പെടുക.",
      loc_name1: "തക്കല ഡെസ്ക്",
      loc_desc1: "ജെറുഷ് ഡെന്റോഫേസ്, തക്കല സെന്റർ, കന്യാകുമാരി, തമിഴ്‌നാട്.",
      loc_name2: "തിരുച്ചി ക്ലിനിക്",
      loc_desc2: "കോസ്മെറ്റിക് ലേസർ & ഡെന്റൽ കെയർ സെന്റർ, തിരുച്ചി, തമിഴ്‌നാട്.",
      loc_name3: "ചെന്നൈ സെന്റർ",
      loc_desc3: "ഡെന്റൽ കെയർ ലെയ്സൺ ഓഫീസ്, ചെന്നൈ, തമിഴ്‌നാട്.",
      loc_name4: "ദുബായ് ഡെസ്ക്",
      loc_desc4: "ഇന്റർനാഷണൽ മെഡിക്കൽ ടൂറിസം സപ്പോർട്ട് ഡെസ്ക്, ദുബായ്, യുഎഇ.",
      hero_cta_book: "ബുക്കിംഗ്",
      hero_cta_book_sub: "ഓൺലൈൻ ബുക്കിംഗ്",
      hero_cta_clinics: "ക്ലിനിക്കുകൾ കണ്ടെത്തുക",
      hero_cta_clinics_sub: "അടുത്തുള്ള കേന്ദ്രം കണ്ടെത്തുക",
      hero_cta_specs: "ചികിത്സകൾ",
      hero_cta_specs_sub: "വിഭാഗങ്ങൾ കാണുക",
      hero_cta_stories: "ചരിത്രങ്ങൾ",
      hero_cta_stories_sub: "രോഗികളുടെ മാറ്റങ്ങൾ"
    },
    te: {
      nav_book: "బుకింగ్",
      nav_clinics: "క్లినిక్‌లు",
      nav_specialities: "ప్రత్యేకతలు",
      nav_stories: "కథలు",
      nav_home: "హోమ్",
      nav_about: "మా గురించి",
      nav_gallery: "గ్యాలరీ",
      nav_blogs: "బ్లాగులు",
      nav_contact: "మమ్మల్ని సంప్రదించండి",
      nav_book_cta: "అపాయింట్‌మెంట్ బుక్ చేయండి",
      spec_label: "మా ప్రత్యేకతలు",
      spec_title: "సమగ్ర క్లినికల్ ప్రత్యేకతలు",
      spec_desc: "జెరుష్ నాలుగు సమగ్ర విభాగాలలో ప్రత్యేక వైద్య సంరక్షణను అందిస్తుంది. మరింత తెలుసుకోవడానికి ఒక ప్రత్యేకతను ఎంచుకోండి.",
      card_dentistry_title: "మల్టీస్పెషాలిటీ డెంటిస్ట్రీ",
      card_dentistry_desc: "కస్టమ్ ఇన్విజిబుల్ అలైనర్లు (జెరుష్‌అలైన్), డిజిటల్ ఇంప్లాంట్లు మరియు ఒకే విజిట్‌లో రూట్ కెనాల్ చికిత్సలు.",
      card_derma_title: "లేజర్ డెర్మటాలజీ",
      card_derma_desc: "అధునాతన ఫ్రాక్షనల్ CO₂ లేజర్లు, పికో లేజర్ టాటూ/పిగ్మెంట్ తొలగింపు, చర్మ పునరుజ్జీవనం మరియు ప్రీమియం ఫేషియల్స్.",
      card_hair_title: "హెయిర్ రిస్టోరేషన్",
      card_hair_desc: "GFC, QR678 హెయిర్ రీగ్రోత్ థెరపీ, స్కాల్ప్ లేజర్ క్లెన్సింగ్ మరియు మైక్రో-FUE హెయిర్ ట్రాన్స్‌ప్లాంట్లు.",
      card_body_title: "బాడీ కాంటౌరింగ్",
      card_body_desc: "శస్త్రచికిత్స లేని బాడీ షేపింగ్, కండరాల బలోపేతం మరియు పెల్విక్ ఫ్లోర్ బలోపేతం చికిత్సలు.",
      card_learn_more: "మరింత తెలుసుకోండి",
      tech_label: "ఖచ్చితత్వం కోసం నిర్మించబడింది",
      tech_title: "అధునాతన ఖచ్చితత్వ సాంకేతికతతో అమర్చబడింది",
      tech_desc: "జెరుష్‌లో, మేము ఖచ్చితమైన నిర్ధారణను విశ్వసిస్తాము. మా సదుపాయంలో 3D ఇమేజింగ్ మరియు అత్యాధునిక ల్యాబ్‌లు ఉన్నాయి, చికిత్స ప్రణాళికను స్పష్టం చేస్తాయి.",
      tech_item1_title: "ఇన్-హౌస్ డెంటల్ & మెడికల్ ల్యాబ్",
      tech_item1_desc: "ఒకే రోజులో ఖచ్చితమైన డెంటల్ క్రౌన్స్ మరియు బ్రిడ్జిలు ఇక్కడే తయారు చేయబడతాయి.",
      tech_item2_title: "CBCT & డిజిటల్ రేడియాలజీ",
      tech_item2_desc: "ఇంప్లాంటాలజీ మరియు బోన్ మ్యాపింగ్ కోసం సురక్షితమైన, అత్యల్ప రేడియేషన్ 3D స్కానింగ్.",
      tech_item3_title: "FDA ఆమోదిత లేజర్ వ్యవస్థలు",
      tech_item3_desc: "చర్మ ఆకృతి మరియు పిగ్మెంటేషన్‌ను లక్ష్యంగా చేసుకునే గోల్డ్-స్టాండర్డ్ సౌందర్య లేజర్లు.",
      tech_card_title: "సాంకేతిక ఖచ్చితత్వం",
      tech_card_desc: "మా విశ్లేషణ ల్యాబ్‌లు కఠినమైన ISO ప్రమాణాల క్రింద పనిచేస్తాయి, శస్త్రచికిత్స మరియు చర్మసంబంధమైన చికిత్సల కోసం క్లినికల్ ధృవీకరణను అందిస్తాయి.",
      gallery_label: "స్మైల్ గ్యాలరీ",
      gallery_title: "నిజమైన రూపాంతరాలు, నిజమైన కథలు",
      gallery_desc: "రోగుల సౌందర్య పునరుద్ధరణలు మరియు ఆర్థోడాంటిక్ అలైన్‌మెంట్ చికిత్సల యొక్క వాస్తవ ఫలితాలను అన్వేషించండి.",
      gallery_case1_title: "క్లియర్ అలైనర్లు",
      gallery_case1_time: "14 నెలల చికిత్స సమయం",
      gallery_case1_name: "స్మైల్ గ్యాప్ క్లోజర్",
      gallery_case1_desc: "పై దంతాల గ్యాప్ స్పేసింగ్ కోసం నాన్-ఎక్స్‌ట్రాక్షన్ అలైన్‌మెంట్ కరెక్షన్.",
      gallery_case2_title: "సౌందర్య పునరుద్ధరణ",
      gallery_case2_time: "4 సిట్టింగ్‌లు (లేజర్)",
      gallery_case2_name: "మొటిమల మచ్చల తగ్గింపు",
      gallery_case2_desc: "ఫ్రాక్షనల్ CO₂ లేజర్ స్కిన్ బూస్టింగ్ ఉపయోగించి మొటిమల గుంటల నివారణ.",
      gallery_case3_title: "హెయిర్ రిస్టోరేషన్",
      gallery_case3_time: "6 సెషన్లు (GFC)",
      gallery_case3_name: "నెత్తిమీద జుట్టు తిరిగి పెరగడం",
      gallery_case3_desc: "తల పైభాగంలో బట్టతల మచ్చలను సరిచేసే గ్రోث ఫ్యాక్టర్ బూస్టర్ చికిత్స.",
      gallery_btn: "పూర్తి గ్యాలరీని వీక్షించండి",
      loc_label: "మా సౌకర్యాలు",
      loc_title: "క్లినికల్ స్థానాలు & సహాయ హెల్ప్‌లైన్లు",
      loc_desc: "నేరుగా విచారణల కోసం భారతదేశంలోని మా స్థానిక క్లినిక్ డెస్క్‌లు లేదా UAE లైజన్ సపోర్ట్ డెస్క్‌ను సంప్రదించండి.",
      loc_name1: "తుకలే డెస్క్",
      loc_desc1: "జెరుష్ డెంటోఫేస్, తుకలే సెంటర్, కన్యాకుమారి, తమిళనాడు.",
      loc_name2: "త్రిచి క్లినిక్",
      loc_desc2: "కాస్మెటిక్ లేజర్ & డెంటల్ కేర్ సెంటర్, త్రిచి, తమిళనాడు.",
      loc_name3: "చెన్నై కేంద్రం",
      loc_desc3: "ప్రాంతీయ డెంటల్ కేర్ లైజన్ ఆఫీస్, చెన్నై, తమిళనాడు.",
      loc_name4: "దుబాయ్ లైజన్",
      loc_desc4: "ఇంటర్నేషనల్ లైజన్ & మెడికల్ టూరిజం సపోర్ట్ డెస్క్, దుబాయ్, UAE.",
      hero_cta_book: "అపాయింట్‌మెంట్ బుక్ చేయండి",
      hero_cta_book_sub: "ఆన్‌లైన్‌లో షెడ్యూల్ చేయండి",
      hero_cta_clinics: "క్లినిక్‌లను కనుగొనండి",
      hero_cta_clinics_sub: "మీ సమీప కేంద్రాన్ని కనుగొనండి",
      hero_cta_specs: "ప్రత్యేకతలు",
      hero_cta_specs_sub: "వైద్య విభాగాలను చూడండి",
      hero_cta_stories: "స్మైల్ స్టోరీస్",
      hero_cta_stories_sub: "రోగుల రూపాంతరాలను చూడండి"
    }
  };

  const translatePage = (lang) => {
    // Set Google Translate cookie
    const cookieValue = `/en/${lang}`;
    
    if (lang === 'en') {
      // Clear cookie
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname + ";";
      
      const hostParts = window.location.hostname.split('.');
      if (hostParts.length > 2) {
        const domain = '.' + hostParts.slice(-2).join('.');
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + domain + ";";
      }
    } else {
      // Set cookie
      document.cookie = "googtrans=" + cookieValue + "; path=/;";
      document.cookie = "googtrans=" + cookieValue + "; path=/; domain=" + window.location.hostname + ";";
      
      const hostParts = window.location.hostname.split('.');
      if (hostParts.length > 2) {
        const domain = '.' + hostParts.slice(-2).join('.');
        document.cookie = "googtrans=" + cookieValue + "; path=/; domain=" + domain + ";";
      }
    }

    // Update custom dropdown button label on page
    const textSpan = btn.querySelector('span');
    if (textSpan) {
      const langCountryMap = {
        en: 'us',
        ta: 'in',
        ar: 'ae',
        hi: 'in',
        ml: 'in',
        te: 'in'
      };
      const countryCode = langCountryMap[lang] || 'us';
      textSpan.innerHTML = `<span class="text-[10px] text-slate-400 font-semibold lowercase">${countryCode}</span><span class="font-bold uppercase ml-0.5">${lang}</span>`;
    }

    // Update active checkmarks and background in dropdown
    const items = dropdown.querySelectorAll('.lang-dropdown-item');
    items.forEach(item => {
      const checkmark = item.querySelector('.lang-checkmark');
      const isSelected = item.getAttribute('data-lang') === lang;
      if (checkmark) {
        if (isSelected) {
          checkmark.classList.remove('hidden');
          item.classList.add('active');
        } else {
          checkmark.classList.add('hidden');
          item.classList.remove('active');
        }
      }
    });

    // Trigger Google Translate select dropdown
    const selectEl = document.querySelector('.goog-te-combo');
    if (selectEl) {
      selectEl.value = lang;
      selectEl.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      // Wait for the Google Translate element combo box to load asynchronously
      let checkCount = 0;
      const interval = setInterval(() => {
        const selectElRetry = document.querySelector('.goog-te-combo');
        checkCount++;
        if (selectElRetry) {
          selectElRetry.value = lang;
          selectElRetry.dispatchEvent(new Event('change', { bubbles: true }));
          clearInterval(interval);
        } else if (checkCount > 12) {
          clearInterval(interval);
          // If the page was just loaded with a non-English language, and Google Translate
          // hasn't initialized the select box in 3.6 seconds, we reload as fallback if we haven't already.
          if (!sessionStorage.getItem('jerush_lang_reloaded_' + lang)) {
            sessionStorage.setItem('jerush_lang_reloaded_' + lang, 'true');
            location.reload();
          }
        }
      }, 300);
    }
  };

  // Toggle dropdown on button click
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isHidden = dropdown.classList.contains('hidden');
    if (isHidden) {
      dropdown.classList.remove('hidden');
      btn.setAttribute('aria-expanded', 'true');
    } else {
      dropdown.classList.add('hidden');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  // Close dropdown when clicking anywhere else on the document
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.add('hidden');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  // Handle language link selection click
  const links = dropdown.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedLang = link.getAttribute('data-lang');
      const currentLang = localStorage.getItem('jerush_selected_lang') || 'en';
      
      // If the selected language is already active, do nothing
      if (selectedLang === currentLang) return;
      
      const selectedCode = selectedLang.toUpperCase();
      
      // Close dropdown
      dropdown.classList.add('hidden');
      btn.setAttribute('aria-expanded', 'false');
      
      // Persist language selection locally
      localStorage.setItem('jerush_selected_lang', selectedLang);

      // Perform Translation
      translatePage(selectedLang);

      console.log(`Language switched to: ${selectedCode}`);

      // Reload page immediately to apply Google Translation cleanly across all headers/footers/pages
      setTimeout(() => {
        location.reload();
      }, 100);
    });
  });

  // Restore previously saved language choice if available
  const savedLang = localStorage.getItem('jerush_selected_lang') || 'en';
  translatePage(savedLang);
}

