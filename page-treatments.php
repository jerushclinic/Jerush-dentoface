<?php
/**
 * Template Name: Treatments
 * Description: All treatments page with category filtering
 */
get_header();
?>

<!-- ==========================================================================
   Treatments Page Hero with Breadcrumbs
   ========================================================================== -->
<section class="jerush-treatments-hero font-body">
	<div class="max-w-7xl mx-auto px-6">
		<h1 class="jerush-treatments-hero-title">Our Treatments</h1>
		<p class="jerush-treatments-hero-subtitle">
			Explore our complete range of dental, cosmetic, hair restoration, and body wellness treatments backed by 25+ years of clinical excellence.
		</p>
		<ul class="jerush-breadcrumbs mt-4">
			<li class="jerush-breadcrumb-item"><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a></li>
			<li class="jerush-breadcrumb-separator">›</li>
			<li class="jerush-breadcrumb-item active">Treatments</li>
		</ul>
	</div>
</section>

<!-- ==========================================================================
   Filter Tabs + Treatment Cards Grid
   ========================================================================== -->
<section class="jerush-filter-section font-body">
	<div class="max-w-7xl mx-auto px-6">

		<!-- Filter Bar -->
		<div class="jerush-filter-bar" id="treatmentsFilterBar">
			<div class="jerush-filter-pill"></div>
			<button class="jerush-filter-tab active" data-category="all">All <span class="jerush-filter-count">24</span></button>
			<button class="jerush-filter-tab" data-category="dental">Dental <span class="jerush-filter-count">7</span></button>
			<button class="jerush-filter-tab" data-category="cosmetic">Cosmetic <span class="jerush-filter-count">7</span></button>
			<button class="jerush-filter-tab" data-category="hair">Hair Restoration <span class="jerush-filter-count">4</span></button>
			<button class="jerush-filter-tab" data-category="body">Body Contouring <span class="jerush-filter-count">3</span></button>
		</div>

		<!-- Treatment Cards Grid -->
		<div class="jerush-treatments-page-grid" id="treatmentsPageGrid">

			<?php
			/**
			 * Treatment data array — all treatments across categories
			 * Each treatment has: title, category, description, icon (Heroicons path), link
			 */
			$treatments = array(
				// — DENTAL (7) —
				array(
					'title'    => 'Clear Aligners (Jerushaligne)',
					'category' => 'dental',
					'desc'     => 'Custom invisible aligners designed and manufactured in-house for precise, comfortable teeth straightening without metal braces.',
					'icon'     => 'M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z',
					'link'     => '/treatments/clear-aligners/',
				),
				array(
					'title'    => 'Advanced Dental Implants',
					'category' => 'dental',
					'desc'     => 'CBCT-guided precision titanium implants for permanent tooth replacement with digital 3D planning for optimal results.',
					'icon'     => 'M11.42 15.17l-5.21 3.07a1 1 0 01-1.46-1.05l1-5.82-4.24-4.13a1 1 0 01.56-1.71l5.84-.85 2.61-5.29a1 1 0 011.8 0l2.61 5.29 5.84.85a1 1 0 01.56 1.71l-4.24 4.13 1 5.82a1 1 0 01-1.46 1.05L12 15.17z',
					'link'     => '/treatments/dental-implants/',
				),
				array(
					'title'    => 'Root Canal Treatment',
					'category' => 'dental',
					'desc'     => 'Single-visit painless root canal procedures using advanced rotary instruments and apex locators to save damaged teeth.',
					'icon'     => 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
					'link'     => '/treatments/root-canal/',
				),
				array(
					'title'    => 'Fixed Partial Denture',
					'category' => 'dental',
					'desc'     => 'Precision dental bridge prosthetics cemented in place to replace one or more missing teeth with natural-looking results.',
					'icon'     => 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z',
					'link'     => '/treatments/fixed-partial-denture/',
				),
				array(
					'title'    => 'Professional Teeth Whitening',
					'category' => 'dental',
					'desc'     => 'In-office laser-assisted whitening treatment that brightens teeth up to 8 shades in a single comfortable session.',
					'icon'     => 'M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18',
					'link'     => '/treatments/teeth-whitening/',
				),
				array(
					'title'    => 'Orthodontics (Braces)',
					'category' => 'dental',
					'desc'     => 'Traditional and modern ceramic braces for complex bite corrections and smile alignment, guided by digital orthodontic planning.',
					'icon'     => 'M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75',
					'link'     => '/treatments/orthodontics/',
				),
				array(
					'title'    => 'Wisdom Tooth Extraction',
					'category' => 'dental',
					'desc'     => 'Safe, minimally invasive extraction of impacted or problematic wisdom teeth with advanced surgical techniques and rapid healing.',
					'icon'     => 'M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z',
					'link'     => '/treatments/wisdom-tooth/',
				),

				// — COSMETIC (7) —
				array(
					'title'    => 'Fractional CO₂ Laser',
					'category' => 'cosmetic',
					'desc'     => 'FDA-approved fractional laser resurfacing for deep acne scar reduction, wrinkle correction, and overall skin texture improvement.',
					'icon'     => 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z',
					'link'     => '/treatments/fractional-co2-laser/',
				),
				array(
					'title'    => 'HydraFacial Treatment',
					'category' => 'cosmetic',
					'desc'     => 'Patented multi-step treatment combining cleansing, exfoliation, extraction, and hydration with nutrient-rich serums for instant glow.',
					'icon'     => 'M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z',
					'link'     => '/treatments/hydrafacial/',
				),
				array(
					'title'    => 'Pico Laser Treatment',
					'category' => 'cosmetic',
					'desc'     => 'Picosecond laser technology for precise pigmentation removal, tattoo erasure, and skin rejuvenation with minimal heat damage.',
					'icon'     => 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
					'link'     => '/treatments/pico-laser/',
				),
				array(
					'title'    => 'Carbon Peel Laser',
					'category' => 'cosmetic',
					'desc'     => 'Hollywood-style carbon peel laser facial for deep pore cleansing, oil control, and radiant, even-toned skin in one session.',
					'icon'     => 'M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z',
					'link'     => '/treatments/carbon-peel/',
				),
				array(
					'title'    => 'Skin Whitening Treatment',
					'category' => 'cosmetic',
					'desc'     => 'Advanced glutathione-based skin brightening therapy combined with laser toning for even, luminous complexion results.',
					'icon'     => 'M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18',
					'link'     => '/treatments/skin-whitening/',
				),
				array(
					'title'    => 'Chemical Peels',
					'category' => 'cosmetic',
					'desc'     => 'Medical-grade chemical exfoliation treatments to improve skin texture, reduce pigmentation, and reveal fresher, younger-looking skin.',
					'icon'     => 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5',
					'link'     => '/treatments/chemical-peels/',
				),
				array(
					'title'    => 'Botox & Dermal Fillers',
					'category' => 'cosmetic',
					'desc'     => 'Expert facial rejuvenation with US FDA-approved botulinum toxin and hyaluronic acid fillers for wrinkle smoothing and volume restoration.',
					'icon'     => 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
					'link'     => '/treatments/botox-fillers/',
				),

				// — HAIR RESTORATION (4) —
				array(
					'title'    => 'GFC Hair Therapy',
					'category' => 'hair',
					'desc'     => 'Growth Factor Concentrate therapy using your own blood-derived growth factors to stimulate dormant follicles and promote natural hair regrowth.',
					'icon'     => 'M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1.001A3.75 3.75 0 0012 18z',
					'link'     => '/treatments/gfc-hair-therapy/',
				),
				array(
					'title'    => 'QR678 Regrowth Therapy',
					'category' => 'hair',
					'desc'     => 'Patented Indian hair regrowth formulation QR678 that targets hair follicle stem cells for clinically proven anti-hair-loss results.',
					'icon'     => 'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941',
					'link'     => '/treatments/qr678/',
				),
				array(
					'title'    => 'Micro-FUE Transplant',
					'category' => 'hair',
					'desc'     => 'Minimally invasive follicular unit extraction technique for natural-looking hair transplantation with faster recovery and no linear scars.',
					'icon'     => 'M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15',
					'link'     => '/treatments/micro-fue/',
				),
				array(
					'title'    => 'Scalp Laser Therapy',
					'category' => 'hair',
					'desc'     => 'Low-level laser therapy (LLLT) for scalp stimulation, improving blood circulation and follicular health for thicker, healthier hair growth.',
					'icon'     => 'M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z',
					'link'     => '/treatments/scalp-laser/',
				),

				// — BODY CONTOURING (3) —
				array(
					'title'    => 'Cryo Cool Sculpting',
					'category' => 'body',
					'desc'     => 'FDA-cleared cryolipolysis technology that freezes and eliminates stubborn fat cells without surgery, needles, or downtime.',
					'icon'     => 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
					'link'     => '/treatments/cryo-cool-sculpting/',
				),
				array(
					'title'    => 'Emsella Pelvic Wellness',
					'category' => 'body',
					'desc'     => 'Revolutionary non-invasive electromagnetic chair therapy for pelvic floor strengthening and urinary incontinence treatment.',
					'icon'     => 'M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z',
					'link'     => '/treatments/emsella/',
				),
				array(
					'title'    => 'EM-Muscle Sculpting',
					'category' => 'body',
					'desc'     => 'High-intensity focused electromagnetic energy for targeted muscle building and fat reduction — equivalent to 20,000 crunches per session.',
					'icon'     => 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
					'link'     => '/treatments/em-sculpting/',
				),
			);

			// Background class mapping
			$bg_map = array(
				'dental'   => 'dental-bg',
				'cosmetic' => 'cosmetic-bg',
				'hair'     => 'hair-bg',
				'body'     => 'body-bg',
			);

			$label_map = array(
				'dental'   => 'Dental',
				'cosmetic' => 'Cosmetic',
				'hair'     => 'Hair',
				'body'     => 'Body',
			);

			foreach ( $treatments as $treatment ) :
				$bg_class    = isset( $bg_map[ $treatment['category'] ] ) ? $bg_map[ $treatment['category'] ] : 'dental-bg';
				$badge_label = isset( $label_map[ $treatment['category'] ] ) ? $label_map[ $treatment['category'] ] : 'Treatment';
			?>
				<div class="jerush-tpage-card" data-category="<?php echo esc_attr( $treatment['category'] ); ?>">
					<div class="jerush-tpage-card-image">
						<div class="jerush-card-image-bg <?php echo esc_attr( $bg_class ); ?>">
							<span class="jerush-tpage-badge"><?php echo esc_html( $badge_label ); ?></span>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
								<path stroke-linecap="round" stroke-linejoin="round" d="<?php echo esc_attr( $treatment['icon'] ); ?>"/>
							</svg>
						</div>
					</div>
					<div class="jerush-tpage-card-body">
						<h3 class="jerush-tpage-card-title"><?php echo esc_html( $treatment['title'] ); ?></h3>
						<p class="jerush-tpage-card-desc"><?php echo esc_html( $treatment['desc'] ); ?></p>
						<a href="<?php echo esc_url( $treatment['link'] ); ?>" class="jerush-tpage-card-link">
							Learn More
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
								<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
							</svg>
						</a>
					</div>
				</div>
			<?php endforeach; ?>

		</div>

	</div>
</section>

<?php
get_footer();
?>
