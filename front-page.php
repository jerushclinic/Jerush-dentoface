<?php
/**
 * Front Page template for Jerush Dentoface theme
 * Displays the landing page
 */
get_header();
?>

<!-- ==========================================================================
   1. Premium Video Hero Section (Full-Width Background Video)
   ========================================================================== -->
<section id="jerush-hero" class="w-full relative overflow-hidden font-body bg-slate-950 h-[700px] lg:h-[760px]">
	<!-- HTML5 Background Video -->
	<div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
		<video class="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-85" autoplay loop muted playsinline>
			<source src="<?php echo esc_url( get_template_directory_uri() . '/assets/videos/jerush-hero-video.mp4' ); ?>" type="video/mp4">
			<!-- Fallback background image or solid color -->
		</video>
		<!-- Multi-stage premium dark gradient overlay for optimal text contrast and boundary transition -->
		<div class="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/75"></div>
	</div>

	<!-- Enclosed Capsule Quick Actions Bar -->
	<div class="hidden lg:block absolute bottom-10 lg:bottom-16 left-1/2 -translate-x-1/2 z-20 w-full max-w-5xl px-6">
		<div class="bg-slate-950/80 backdrop-blur-xl border border-sky-500/30 rounded-2xl shadow-[0_0_30px_rgba(30,151,212,0.15)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-800/80 overflow-hidden transform transition-all duration-300 hover:border-sky-400/50 hover:shadow-[0_0_40px_rgba(30,151,212,0.25)]">
			
			<!-- Action 1: Book Appointment -->
			<a href="/book-appointment/" class="flex items-center justify-between p-6 hover:bg-white/[0.04] transition-all duration-300 group">
				<div class="flex flex-col text-left">
					<span class="font-headline font-bold text-[15px] text-white group-hover:text-brandSky transition-colors" data-i18n="hero_cta_book">Book Appointment</span>
					<span class="text-[11px] text-slate-400 group-hover:text-slate-300 mt-0.5 transition-colors" data-i18n="hero_cta_book_sub">Schedule a visit online</span>
				</div>
				<div class="w-8 h-8 rounded-full bg-brandSky/10 text-brandSky flex items-center justify-center shrink-0 group-hover:bg-brandSky group-hover:text-white group-hover:shadow-[0_0_12px_rgba(30,151,212,0.5)] transition-all duration-300 transform group-hover:translate-x-1">
					<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
				</div>
			</a>

			<!-- Action 2: Find Clinics -->
			<a href="/contact/" class="flex items-center justify-between p-6 hover:bg-white/[0.04] transition-all duration-300 group">
				<div class="flex flex-col text-left">
					<span class="font-headline font-bold text-[15px] text-white group-hover:text-brandSky transition-colors" data-i18n="hero_cta_clinics">Find Clinics</span>
					<span class="text-[11px] text-slate-400 group-hover:text-slate-300 mt-0.5 transition-colors" data-i18n="hero_cta_clinics_sub">Locate centre near you</span>
				</div>
				<div class="w-8 h-8 rounded-full bg-brandSky/10 text-brandSky flex items-center justify-center shrink-0 group-hover:bg-brandSky group-hover:text-white group-hover:shadow-[0_0_12px_rgba(30,151,212,0.5)] transition-all duration-300 transform group-hover:translate-x-1">
					<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
				</div>
			</a>

			<!-- Action 3: Explore Treatments -->
			<a href="#specialities" class="flex items-center justify-between p-6 hover:bg-white/[0.04] transition-all duration-300 group">
				<div class="flex flex-col text-left">
					<span class="font-headline font-bold text-[15px] text-white group-hover:text-brandSky transition-colors" data-i18n="hero_cta_specs">Specialities</span>
					<span class="text-[11px] text-slate-400 group-hover:text-slate-300 mt-0.5 transition-colors" data-i18n="hero_cta_specs_sub">View medical wings</span>
				</div>
				<div class="w-8 h-8 rounded-full bg-brandSky/10 text-brandSky flex items-center justify-center shrink-0 group-hover:bg-brandSky group-hover:text-white group-hover:shadow-[0_0_12px_rgba(30,151,212,0.5)] transition-all duration-300 transform group-hover:translate-x-1">
					<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
				</div>
			</a>

			<!-- Action 4: Smile Stories -->
			<a href="/smile-stories/" class="flex items-center justify-between p-6 hover:bg-white/[0.04] transition-all duration-300 group">
				<div class="flex flex-col text-left">
					<span class="font-headline font-bold text-[15px] text-white group-hover:text-brandSky transition-colors" data-i18n="hero_cta_stories">Smile Stories</span>
					<span class="text-[11px] text-slate-400 group-hover:text-slate-300 mt-0.5 transition-colors" data-i18n="hero_cta_stories_sub">View patient transformations</span>
				</div>
				<div class="w-8 h-8 rounded-full bg-brandSky/10 text-brandSky flex items-center justify-center shrink-0 group-hover:bg-brandSky group-hover:text-white group-hover:shadow-[0_0_12px_rgba(30,151,212,0.5)] transition-all duration-300 transform group-hover:translate-x-1">
					<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
				</div>
			</a>

		</div>
	</div>
</section>

<!-- ==========================================================================
   2. Premium Banner Showcase Section (Stacked Cards with Image Slider)
   ========================================================================== -->
<section id="jerush-banner-showcase" class="w-full font-body bg-neutralCool overflow-hidden">
	<div class="max-w-[1400px] mx-auto">

		<!-- Banner Slider Container -->
		<div class="jerush-banner-slider" id="jerushBannerSlider">

			<!-- Slide 1 — 25 Years Celebration -->
			<div class="jerush-banner-slide active" data-slide="0">
				<div class="jerush-banner-card">
					<!-- Left: Image -->
					<div class="jerush-banner-card-image">
						<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/jerush-banner1.webp' ); ?>"
							alt="Celebrating 25 Years of Service — Jerush Dentoface" loading="lazy" />
						<!-- Subtle gradient overlay for blending -->
						<div class="jerush-banner-image-overlay"></div>
					</div>

					<!-- Right: Text Content -->
					<div class="jerush-banner-card-content">
						<div class="jerush-banner-content-inner">
							<span class="jerush-banner-eyebrow">
								<span class="jerush-eyebrow-dot"></span>
								Milestone Achievement
							</span>
							<h2 class="jerush-banner-heading">
								Celebrating <span class="jerush-banner-highlight">25 Years</span> of
								Trusted Care
							</h2>
							<p class="jerush-banner-description">
								For over two and a half decades, Jerush Dentoface has been transforming
								smiles and lives.
								With <strong>100,000+ happy patients</strong> across our clinics in
								Thuckalay, Trichy, Chennai & Dubai,
								our journey is powered by trust, innovation, and clinical excellence.
							</p>
							<div class="jerush-banner-stats">
								<div class="jerush-stat-item">
									<span class="jerush-stat-number" data-count="25">25+</span>
									<span class="jerush-stat-label">Years of Excellence</span>
								</div>
								<div class="jerush-stat-divider"></div>
								<div class="jerush-stat-item">
									<span class="jerush-stat-number"
										data-count="100000">1,00,000+</span>
									<span class="jerush-stat-label">Smiling Patients</span>
								</div>
								<div class="jerush-stat-divider"></div>
								<div class="jerush-stat-item">
									<span class="jerush-stat-number" data-count="4">4</span>
									<span class="jerush-stat-label">Clinic Locations</span>
								</div>
							</div>
							<a href="#" class="jerush-banner-cta">
								Our Journey
								<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none"
									viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
									<path stroke-linecap="round" stroke-linejoin="round"
										d="M17 8l4 4m0 0l-4 4m4-4H3" />
								</svg>
							</a>
						</div>
					</div>
				</div>
			</div>

			<!-- Slide 2 — Advanced Digital Dentistry -->
			<div class="jerush-banner-slide" data-slide="1">
				<div class="jerush-banner-card">
					<!-- Left: Image -->
					<div class="jerush-banner-card-image">
						<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/jerush-banner2.webp' ); ?>"
							alt="Advanced Digital Dentistry — Jerush Dentoface" loading="lazy" />
						<div class="jerush-banner-image-overlay"></div>
					</div>

					<!-- Right: Text Content -->
					<div class="jerush-banner-card-content">
						<div class="jerush-banner-content-inner">
							<span class="jerush-banner-eyebrow">
								<span class="jerush-eyebrow-dot"></span>
								Advanced Technology
							</span>
							<h2 class="jerush-banner-heading">
								State-of-the-Art <span class="jerush-banner-highlight">Digital
									Dentistry</span>
							</h2>
							<p class="jerush-banner-description">
								Experience next-generation dental care powered by <strong>AI-driven
									diagnostics</strong>,
								intraoral 3D scanning, and our proprietary <strong>Jerushaligne</strong>
								clear aligners.
								From single-visit root canals to precision digital implant planning — we
								bring
								the future of dentistry to your smile.
							</p>
							<div class="jerush-banner-stats">
								<div class="jerush-stat-item">
									<span class="jerush-stat-number">3D</span>
									<span class="jerush-stat-label">Digital Scanning</span>
								</div>
								<div class="jerush-stat-divider"></div>
								<div class="jerush-stat-item">
									<span class="jerush-stat-number">AI</span>
									<span class="jerush-stat-label">Powered Diagnostics</span>
								</div>
								<div class="jerush-stat-divider"></div>
								<div class="jerush-stat-item">
									<span class="jerush-stat-number">1 Visit</span>
									<span class="jerush-stat-label">Root Canal</span>
								</div>
							</div>
							<a href="#" class="jerush-banner-cta">
								Explore Technology
								<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none"
									viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
									<path stroke-linecap="round" stroke-linejoin="round"
										d="M17 8l4 4m0 0l-4 4m4-4H3" />
								</svg>
							</a>
						</div>
					</div>
				</div>
			</div>

			<!-- Slide 3 — Multi-Location International Presence -->
			<div class="jerush-banner-slide" data-slide="2">
				<div class="jerush-banner-card">
					<!-- Left: Image -->
					<div class="jerush-banner-card-image">
						<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/jerush-banner3.webp' ); ?>"
							alt="Jerush Dentoface — Clinics across India and Dubai" loading="lazy" />
						<div class="jerush-banner-image-overlay"></div>
					</div>

					<!-- Right: Text Content -->
					<div class="jerush-banner-card-content">
						<div class="jerush-banner-content-inner">
							<span class="jerush-banner-eyebrow">
								<span class="jerush-eyebrow-dot"></span>
								International Presence
							</span>
							<h2 class="jerush-banner-heading">
								World-Class Care, <span class="jerush-banner-highlight">Closer to
									You</span>
							</h2>
							<p class="jerush-banner-description">
								From our flagship centre in <strong>Thuckalay</strong> to thriving
								clinics in
								<strong>Trichy, Chennai,</strong> and our international branch in
								<strong>Dubai</strong> —
								Jerush Dentoface brings premium multispeciality dental, dermatology, and
								cosmetic care
								wherever you are.
							</p>
							<div class="jerush-banner-stats">
								<div class="jerush-stat-item">
									<span class="jerush-stat-number">3</span>
									<span class="jerush-stat-label">India Clinics</span>
								</div>
								<div class="jerush-stat-divider"></div>
								<div class="jerush-stat-item">
									<span class="jerush-stat-number">1</span>
									<span class="jerush-stat-label">Dubai Centre</span>
								</div>
								<div class="jerush-stat-divider"></div>
								<div class="jerush-stat-item">
									<span class="jerush-stat-number">50+</span>
									<span class="jerush-stat-label">Specialists</span>
								</div>
							</div>
							<a href="#" class="jerush-banner-cta">
								Find a Clinic
								<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none"
									viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
									<path stroke-linecap="round" stroke-linejoin="round"
										d="M17 8l4 4m0 0l-4 4m4-4H3" />
								</svg>
							</a>
						</div>
					</div>
				</div>
			</div>

		</div>

		<!-- Slide Indicators -->
		<div class="jerush-banner-indicators" id="bannerIndicators">
			<button class="jerush-indicator-dot active" data-slide="0" aria-label="Slide 1"></button>
			<button class="jerush-indicator-dot" data-slide="1" aria-label="Slide 2"></button>
			<button class="jerush-indicator-dot" data-slide="2" aria-label="Slide 3"></button>
		</div>

	</div>
</section>

<!-- ==========================================================================
   3. Premium Welcome & Legacy Section (Asymmetric Grid Layout)
   ========================================================================== -->
<section id="jerush-about-welcome" class="w-full py-20 lg:py-24 bg-gradient-to-br from-white via-slate-50/50 to-sky-50/20 font-body relative overflow-hidden">
	<!-- Decorative Background Elements -->
	<div class="absolute top-0 right-0 w-[400px] h-[400px] bg-brandSky/5 rounded-full blur-3xl pointer-events-none -mr-40 -mt-20"></div>
	<div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brandBlue/5 rounded-full blur-3xl pointer-events-none -ml-60 -mb-40"></div>
	
	<!-- Thin grid lines decorative background -->
	<div class="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px]"></div>

	<div class="max-w-7xl mx-auto px-6 relative z-10">
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

			<!-- Left Column: Stylized Doctor Image and Floating Glass Badge -->
			<div class="lg:col-span-5 relative flex justify-center">
				<!-- Glowing radial backdrop glow on hover -->
				<div class="absolute -inset-4 bg-gradient-to-tr from-brandBlue/10 to-brandSky/10 rounded-[2.5rem] blur-2xl opacity-75 group-hover:opacity-100 transition duration-700 pointer-events-none"></div>

				<!-- Main Image Container with Asymmetric Border Radius -->
				<div class="relative w-full max-w-md aspect-[4/5] rounded-[2rem] lg:rounded-tl-[80px] lg:rounded-br-[80px] overflow-hidden shadow-2xl border border-slate-100 bg-white p-3 group">
					<div class="w-full h-full rounded-[1.5rem] lg:rounded-tl-[70px] lg:rounded-br-[70px] overflow-hidden relative">
						<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/dr-bladbin-binila.webp' ); ?>"
							alt="Dr. Bladbin & Dr. Binila - Directors of Jerush Dentofacial & Cosmetic Laser Centre"
							class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
							loading="lazy" />
						<!-- Soft Overlay gradient on image -->
						<div class="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40"></div>
					</div>

					<!-- Floating Glassmorphic Trust Badge -->
					<div class="absolute -bottom-6 -right-4 lg:right-6 bg-white/90 backdrop-blur-xl border border-white/40 p-4 lg:p-5 rounded-2xl shadow-[0_20px_40px_rgba(40,83,164,0.12)] flex items-center gap-4 animate-float-badge hover:scale-[1.03] transition-all duration-300 select-none">
						<div class="w-12 h-12 rounded-xl bg-brandBlue flex items-center justify-center text-white text-xl font-bold font-headline shadow-lg shadow-brandBlue/25 shrink-0">
							24+
						</div>
						<div class="flex flex-col text-left">
							<span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Years of Trust</span>
							<span class="text-sm font-extrabold text-primary leading-tight font-headline">Est. Since 2002</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Right Column: Welcome Texts and Interactive Timeline -->
			<div class="lg:col-span-7 text-left space-y-6 lg:pl-4">

				<!-- Section Category Eyebrow with pulsing indicator -->
				<div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brandBlue/5 border border-brandBlue/10">
					<span class="w-2 h-2 rounded-full bg-brandSky relative">
						<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandSky opacity-75"></span>
						<span class="relative inline-flex rounded-full h-2 w-2 bg-brandSky"></span>
					</span>
					<span class="text-[10px] font-bold text-brandBlue uppercase tracking-wider font-headline">About Jerush</span>
				</div>

				<!-- Headline -->
				<h2 class="font-headline font-extrabold text-3xl sm:text-4xl lg:text-5xl text-primary leading-tight">
					Excellence in <span class="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">Dentistry, Skin & Facial Aesthetics</span>
				</h2>

				<!-- Quote / Core Statement -->
				<div class="border-l-4 border-brandSky pl-4 py-1.5">
					<p class="text-base sm:text-lg font-bold text-slate-700 font-headline leading-snug">
						Jerush Dentoface: Transforming Dental & Cosmetic Care Since 2002
					</p>
				</div>

				<!-- Description -->
				<p class="text-secondary text-sm sm:text-base leading-relaxed max-w-2xl">
					Jerush Dentofacial & Cosmetic Laser Centre was established in 2002 with a mission to revolutionize dental care and cosmetic treatments. From the very beginning, we have been at the forefront of innovation, combining advanced technology with a patient-centric approach to deliver exceptional healthcare services.
				</p>

				<!-- Key Milestones Interactive Vertical Timeline -->
				<div class="space-y-6 pt-4 text-left">
					<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 font-headline">Key Milestones in Our Journey</h4>

					<div class="relative border-l-2 border-slate-100 pl-6 space-y-8">
						<!-- Timeline Step 1 -->
						<div class="relative group/timeline-item">
							<!-- Glowing Indicator Node -->
							<div class="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-2 border-brandBlue flex items-center justify-center transition-all duration-300 group-hover/timeline-item:border-brandSky group-hover/timeline-item:scale-125 shadow-sm">
								<div class="w-1.5 h-1.5 rounded-full bg-brandBlue transition-all duration-300 group-hover/timeline-item:bg-brandSky"></div>
							</div>
							<div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
								<span class="text-lg font-extrabold text-brandBlue font-headline">2002</span>
								<span class="text-sm font-bold text-slate-800 font-headline">Foundation of Medical Excellence</span>
							</div>
							<p class="text-secondary text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed">
								Established with a vision to integrate world-class facial aesthetics, cosmetic laser dermatology, and precision dental diagnostics under one roof.
							</p>
						</div>

						<!-- Timeline Step 2 -->
						<div class="relative group/timeline-item">
							<!-- Glowing Indicator Node -->
							<div class="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-2 border-brandBlue flex items-center justify-center transition-all duration-300 group-hover/timeline-item:border-brandSky group-hover/timeline-item:scale-125 shadow-sm">
								<div class="w-1.5 h-1.5 rounded-full bg-brandBlue transition-all duration-300 group-hover/timeline-item:bg-brandSky"></div>
							</div>
							<div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
								<span class="text-lg font-extrabold text-brandBlue font-headline">2006</span>
								<span class="text-sm font-bold text-slate-800 font-headline">Early Expansion</span>
							</div>
							<p class="text-secondary text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed">
								To meet the growing demand for high-quality dental care, we expanded our facility, adding 10 new advanced dental care units and expanding laboratory services.
							</p>
						</div>

						<!-- Timeline Step 3 -->
						<div class="relative group/timeline-item">
							<!-- Glowing Indicator Node -->
							<div class="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-2 border-brandBlue flex items-center justify-center transition-all duration-300 group-hover/timeline-item:border-brandSky group-hover/timeline-item:scale-125 shadow-sm">
								<div class="w-1.5 h-1.5 rounded-full bg-brandBlue transition-all duration-300 group-hover/timeline-item:bg-brandSky"></div>
							</div>
							<div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
								<span class="text-lg font-extrabold text-brandBlue font-headline">2024</span>
								<span class="text-sm font-bold text-slate-800 font-headline">Scaling New Heights</span>
							</div>
							<p class="text-secondary text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed">
								Expanding regional presence with state-of-the-art diagnostic facilities and international medical liaison services, serving over 100,000+ smiling patients globally.
							</p>
						</div>
					</div>
				</div>

				<!-- CTA button with modern sliding indicator -->
				<div class="pt-6">
					<a href="#" class="group relative inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-brandBlue to-brandSky text-white font-bold text-sm rounded-xl overflow-hidden shadow-lg shadow-brandBlue/15 hover:shadow-brandBlue/25 hover:-translate-y-0.5 transition-all duration-300 select-none">
						<span class="absolute inset-0 w-full h-full bg-gradient-to-r from-brandSky to-brandBlue opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
						<span class="relative z-10 flex items-center gap-2 font-headline uppercase tracking-wider text-xs">
							Read More
							<svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
							</svg>
						</span>
					</a>
				</div>

			</div>

		</div>
	</div>
</section>

<!-- Spacer to prevent content overlap with sticky bottom bar -->
<div class="h-20 lg:hidden"></div>

<!-- ==========================================================================
   2. Clinical Pillars / Specialities Grid
   ========================================================================== -->
<section id="specialities" class="w-full py-20 bg-white font-body">
	<div class="max-w-7xl mx-auto px-6 text-center">
		<div class="max-w-3xl mx-auto mb-16">
			<span class="text-xs font-bold uppercase tracking-wider text-brandSky" data-i18n="spec_label">What We Specialize In</span>
			<h2 class="font-headline font-extrabold text-3xl sm:text-4xl text-primary mt-2" data-i18n="spec_title">Comprehensive Clinical Specialities</h2>
			<p class="text-secondary text-sm sm:text-base mt-4 leading-relaxed" data-i18n="spec_desc">
				Jerush offers specialized medical care across four integrated wings. Select a speciality to learn more.
			</p>
		</div>
		
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
			<!-- Speciality 1: Dentistry -->
			<div class="group bg-neutralCool rounded-2xl p-8 border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 text-left flex flex-col">
				<div class="w-12 h-12 rounded-xl bg-brandBlue/10 text-brandBlue flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
					<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v1m0 11v3m8-9h-1M6 12H5m1.314-5.314l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>
				</div>
				<h3 class="font-headline font-bold text-lg text-primary mb-3" data-i18n="card_dentistry_title">Multispeciality Dentistry</h3>
				<p class="text-secondary text-xs sm:text-sm leading-relaxed mb-6 flex-grow" data-i18n="card_dentistry_desc">
					From custom invisible aligners (Jerushaligne) and digital implants to single-visit root canal treatments.
				</p>
				<a href="/treatments/dental-services/" class="text-xs font-bold text-brandBlue inline-flex items-center gap-1 hover:text-brandSky" data-i18n="card_learn_more">
					Learn More
					<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
				</a>
			</div>

			<!-- Speciality 2: Dermatology -->
			<div class="group bg-neutralCool rounded-2xl p-8 border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 text-left flex flex-col">
				<div class="w-12 h-12 rounded-xl bg-brandSky/10 text-brandSky flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
					<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
				</div>
				<h3 class="font-headline font-bold text-lg text-primary mb-3" data-i18n="card_derma_title">Laser Dermatology</h3>
				<p class="text-secondary text-xs sm:text-sm leading-relaxed mb-6 flex-grow" data-i18n="card_derma_desc">
					Advanced fractional CO₂ lasers, Pico laser tattoo/pigment removal, skin resurfacing, and premium gold facials.
				</p>
				<a href="/treatments/cosmetic-dermatology/" class="text-xs font-bold text-brandBlue inline-flex items-center gap-1 hover:text-brandSky" data-i18n="card_learn_more">
					Learn More
					<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
				</a>
			</div>

			<!-- Speciality 3: Hair Restoration -->
			<div class="group bg-neutralCool rounded-2xl p-8 border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 text-left flex flex-col">
				<div class="w-12 h-12 rounded-xl bg-brandBlue/10 text-brandBlue flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
					<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
				</div>
				<h3 class="font-headline font-bold text-lg text-primary mb-3" data-i18n="card_hair_title">Hair Restoration</h3>
				<p class="text-secondary text-xs sm:text-sm leading-relaxed mb-6 flex-grow" data-i18n="card_hair_desc">
					Scientific solutions including GFC, QR678 regrowth therapy, scalp laser cleansing, and micro-FUE transplants.
				</p>
				<a href="/treatments/hair-restoration/" class="text-xs font-bold text-brandBlue inline-flex items-center gap-1 hover:text-brandSky" data-i18n="card_learn_more">
					Learn More
					<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
				</a>
			</div>

			<!-- Speciality 4: Wellness -->
			<div class="group bg-neutralCool rounded-2xl p-8 border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 text-left flex flex-col">
				<div class="w-12 h-12 rounded-xl bg-brandSky/10 text-brandSky flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
					<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
				</div>
				<h3 class="font-headline font-bold text-lg text-primary mb-3" data-i18n="card_body_title">Body Contouring</h3>
				<p class="text-secondary text-xs sm:text-sm leading-relaxed mb-6 flex-grow" data-i18n="card_body_desc">
					Non-invasive wellness tech like Cryo Cool Sculpting, EM-Muscle sculpting, and Emsella pelvic floor strengthening.
				</p>
				<a href="/treatments/body-contouring/" class="text-xs font-bold text-brandBlue inline-flex items-center gap-1 hover:text-brandSky" data-i18n="card_learn_more">
					Learn More
					<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
				</a>
			</div>
		</div>
	</div>
</section>

<!-- ==========================================================================
   3. "Clinical Precision" Technology Showcase
   ========================================================================== -->
<section class="w-full py-20 bg-neutralCool font-body">
	<div class="max-w-7xl mx-auto px-6">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
			<!-- Tech Details -->
			<div class="text-left">
				<span class="text-xs font-bold uppercase tracking-wider text-brandSky" data-i18n="tech_label">Built for Accuracy</span>
				<h2 class="font-headline font-extrabold text-3xl sm:text-4xl text-primary mt-2 mb-6" data-i18n="tech_title">Equipped with Advanced Precision Technology</h2>
				<p class="text-secondary text-sm sm:text-base leading-relaxed mb-8" data-i18n="tech_desc">
					At Jerush, we believe in diagnostic precision. Our facility features in-house CBCT radiology (3D imaging) and the latest medical labs, ensuring your treatment plan is drafted with total clarity.
				</p>
				
				<div class="flex flex-col gap-6">
					<!-- Tech Item 1 -->
					<div class="flex gap-4">
						<div class="w-6 h-6 rounded-full bg-brandBlue/10 text-brandBlue flex items-center justify-center shrink-0 mt-1">
							<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
						</div>
						<div>
							<h4 class="font-headline font-bold text-sm text-primary" data-i18n="tech_item1_title">In-house Dental & Medical Lab</h4>
							<p class="text-xs text-secondary mt-1" data-i18n="tech_item1_desc">Same-day precision dental crowns and bridges crafted on site.</p>
						</div>
					</div>

					<!-- Tech Item 2 -->
					<div class="flex gap-4">
						<div class="w-6 h-6 rounded-full bg-brandBlue/10 text-brandBlue flex items-center justify-center shrink-0 mt-1">
							<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
						</div>
						<div>
							<h4 class="font-headline font-bold text-sm text-primary" data-i18n="tech_item2_title">CBCT & Digital Radiology</h4>
							<p class="text-xs text-secondary mt-1" data-i18n="tech_item2_desc">Safe, ultra-low radiation 3D scanning for implantology and bone mapping.</p>
						</div>
					</div>

					<!-- Tech Item 3 -->
					<div class="flex gap-4">
						<div class="w-6 h-6 rounded-full bg-brandBlue/10 text-brandBlue flex items-center justify-center shrink-0 mt-1">
							<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
						</div>
						<div>
							<h4 class="font-headline font-bold text-sm text-primary" data-i18n="tech_item3_title">Lumenis & Cynosure FDA Laser Systems</h4>
							<p class="text-xs text-secondary mt-1" data-i18n="tech_item3_desc">Gold-standard aesthetic lasers targeting skin texture and pigmentation.</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Image Graphic -->
			<div class="relative">
				<div class="absolute -inset-4 bg-brandBlue/5 rounded-3xl blur-xl opacity-50"></div>
				<div class="relative bg-white border border-slate-100 rounded-3xl p-8 shadow-xl shadow-slate-900/5 aspect-[4/3] flex flex-col items-center justify-center text-center">
					<div class="w-16 h-16 rounded-full bg-brandBlue/10 text-brandBlue flex items-center justify-center mb-6">
						<svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 9.172V5L8 4z"/></svg>
					</div>
					<h3 class="font-headline font-bold text-lg text-primary mb-2" data-i18n="tech_card_title">Technological Precision</h3>
					<p class="text-xs text-secondary max-w-[280px] leading-relaxed" data-i18n="tech_card_desc">
						Our diagnostic labs operate under strict ISO standards, providing clinical validation for surgical and dermatological treatments.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ==========================================================================
   4. Smile Stories Transformations (Gallery Preview)
   ========================================================================== -->
<section class="w-full py-20 bg-white font-body">
	<div class="max-w-7xl mx-auto px-6 text-center">
		<div class="max-w-3xl mx-auto mb-16">
			<span class="text-xs font-bold uppercase tracking-wider text-brandSky" data-i18n="gallery_label">Smile Gallery</span>
			<h2 class="font-headline font-extrabold text-3xl sm:text-4xl text-primary mt-2" data-i18n="gallery_title">Real Transformations, Real Stories</h2>
			<p class="text-secondary text-sm sm:text-base mt-4 leading-relaxed" data-i18n="gallery_desc">
				Explore actual results from patient cosmetic restorations and orthodontic alignment treatments.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			<!-- Case 1 -->
			<div class="bg-neutralCool border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
				<div class="aspect-[4/3] bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
					<h4 class="font-headline font-bold text-sm mb-1" data-i18n="gallery_case1_title">Clear Aligners (Jerushaligne)</h4>
					<p class="text-[10px] text-slate-400" data-i18n="gallery_case1_time">14 Months Treatment Time</p>
				</div>
				<div class="p-6 text-left">
					<h4 class="font-headline font-bold text-sm text-primary" data-i18n="gallery_case1_name">Smile Gap Closure</h4>
					<p class="text-xs text-secondary mt-1" data-i18n="gallery_case1_desc">Non-extraction alignment correction for upper gap spacing.</p>
				</div>
			</div>

			<!-- Case 2 -->
			<div class="bg-neutralCool border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
				<div class="aspect-[4/3] bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
					<h4 class="font-headline font-bold text-sm mb-1" data-i18n="gallery_case2_title">Cosmetic Resurfacing</h4>
					<p class="text-[10px] text-slate-400" data-i18n="gallery_case2_time">4 Sittings (Laser)</p>
				</div>
				<div class="p-6 text-left">
					<h4 class="font-headline font-bold text-sm text-primary" data-i18n="gallery_case2_name">Acne Scar Reduction</h4>
					<p class="text-xs text-secondary mt-1" data-i18n="gallery_case2_desc">Acne pitting repair utilizing Fractional CO₂ Laser skin boosting.</p>
				</div>
			</div>

			<!-- Case 3 -->
			<div class="bg-neutralCool border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
				<div class="aspect-[4/3] bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
					<h4 class="font-headline font-bold text-sm mb-1" data-i18n="gallery_case3_title">Hair Restoration</h4>
					<p class="text-[10px] text-slate-400" data-i18n="gallery_case3_time">6 Sessions (GFC)</p>
				</div>
				<div class="p-6 text-left">
					<h4 class="font-headline font-bold text-sm text-primary" data-i18n="gallery_case3_name">Scalp Hair Regrowth</h4>
					<p class="text-xs text-secondary mt-1" data-i18n="gallery_case3_desc">Growth factor booster treatment correcting crown bald patches.</p>
				</div>
			</div>
		</div>

		<div class="mt-12">
			<a href="/smile-stories/" class="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 hover:border-brandBlue text-secondary hover:text-brandBlue font-headline font-bold text-xs rounded-full bg-white transition-all duration-300">
				<span data-i18n="gallery_btn">View Full Gallery</span>
				<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
			</a>
		</div>
	</div>
</section>

<!-- ==========================================================================
   5. Interactive Location Cards / Pinned Contacts
   ========================================================================== -->
<section class="w-full py-20 bg-neutralCool font-body">
	<div class="max-w-7xl mx-auto px-6 text-center">
		<div class="max-w-3xl mx-auto mb-16">
			<span class="text-xs font-bold uppercase tracking-wider text-brandSky" data-i18n="loc_label">Our Facilities</span>
			<h2 class="font-headline font-extrabold text-3xl sm:text-4xl text-primary mt-2" data-i18n="loc_title">Clinic Locations & Support Helplines</h2>
			<p class="text-secondary text-sm sm:text-base mt-4 leading-relaxed" data-i18n="loc_desc">
				Reach out to our local clinic desks in India or the UAE liaison support desk for direct inquiries.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
			<!-- Location 1: Thuckalay -->
			<div class="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
				<h4 class="font-headline font-bold text-base text-primary mb-2" data-i18n="loc_name1">Thuckalay Desk</h4>
				<p class="text-xs text-secondary mb-4 leading-relaxed" data-i18n="loc_desc1">Jerush Dentoface, Thuckalay Centre, Kanyakumari, Tamil Nadu.</p>
				<a href="tel:+919489160055" class="inline-flex items-center gap-2 text-xs font-bold text-brandBlue hover:text-brandSky">
					<svg class="w-4 h-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
					+91 94891 60055
				</a>
			</div>

			<!-- Location 2: Trichy -->
			<div class="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
				<h4 class="font-headline font-bold text-base text-primary mb-2" data-i18n="loc_name2">Trichy Clinic</h4>
				<p class="text-xs text-secondary mb-4 leading-relaxed" data-i18n="loc_desc2">Cosmetic Laser & Dental Care Centre, Trichy, Tamil Nadu.</p>
				<a href="tel:+919489160011" class="inline-flex items-center gap-2 text-xs font-bold text-brandBlue hover:text-brandSky">
					<svg class="w-4 h-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
					+91 94891 60011
				</a>
			</div>

			<!-- Location 3: Chennai -->
			<div class="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
				<h4 class="font-headline font-bold text-base text-primary mb-2" data-i18n="loc_name3">Chennai Centre</h4>
				<p class="text-xs text-secondary mb-4 leading-relaxed" data-i18n="loc_desc3">Regional Dental Care liaison office, Chennai, Tamil Nadu.</p>
				<a href="tel:+919751010107" class="inline-flex items-center gap-2 text-xs font-bold text-brandBlue hover:text-brandSky">
					<svg class="w-4 h-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
					+91 97510 10107
				</a>
			</div>

			<!-- Location 4: Dubai -->
			<div class="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
				<h4 class="font-headline font-bold text-base text-primary mb-2" data-i18n="loc_name4">Dubai Liaison</h4>
				<p class="text-xs text-secondary mb-4 leading-relaxed" data-i18n="loc_desc4">International Liaison & Medical tourism support desk, Dubai, UAE.</p>
				<a href="tel:+971507253105" class="inline-flex items-center gap-2 text-xs font-bold text-brandBlue hover:text-brandSky">
					<svg class="w-4 h-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
					+971 50725 3105
				</a>
			</div>
		</div>
	</div>
</section>

<?php
get_footer();
?>
