<?php
/**
 * Header template for Jerush Dentoface theme
 */
$navbar_scheme   = get_theme_mod( 'navbar_scheme', 'navbar-light bg-light' );
$navbar_position = get_theme_mod( 'navbar_position', 'static' );
$search_enabled  = get_theme_mod( 'search_enabled', '1' );
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div class="boxed_wrapper">

<div class="jerush-wrapper">
	<!-- Top Bar / Contact Information Area -->
	<div class="jerush-topbar">
		<div class="jerush-container">
			<div class="jerush-topbar-inner">
				<div class="jerush-topbar-contacts">
					<a href="tel:+919489160055" class="jerush-contact-item">
						<svg class="jerush-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
						<span class="jerush-loc-name">Thuckalay:</span>
						<span class="jerush-loc-phone">+91 94891 60055</span>
					</a>
					<a href="tel:+919489160011" class="jerush-contact-item">
						<svg class="jerush-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
						<span class="jerush-loc-name">Trichy:</span>
						<span class="jerush-loc-phone">+91 94891 60011</span>
					</a>
					<a href="tel:+919751010107" class="jerush-contact-item">
						<svg class="jerush-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
						<span class="jerush-loc-name">Chennai:</span>
						<span class="jerush-loc-phone">+91 97510 10107</span>
					</a>
					<a href="tel:+971507253105" class="jerush-contact-item">
						<svg class="jerush-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
						<span class="jerush-loc-name">Dubai:</span>
						<span class="jerush-loc-phone">+971 50725 3105</span>
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Main Navigation Bar -->
	<header class="jerush-header">
		<div class="jerush-container">
			<div class="jerush-navbar">
				<!-- Brand Logo -->
				<div class="jerush-logo">
					<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
						<?php
						$header_logo = get_theme_mod( 'header_logo' );
						if ( ! empty( $header_logo ) ) :
						?>
							<img src="<?php echo esc_url( $header_logo ); ?>" alt="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" class="jerush-logo-img" />
						<?php else : ?>
							<img src="<?php echo esc_url( get_template_directory_uri() . '/logo/jerush-logo.webp' ); ?>" alt="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" class="jerush-logo-img" onerror="this.style.display='none'; document.getElementById('logo-text-fallback').style.display='block';" />
							<span id="logo-text-fallback" style="display:none;" class="jerush-logo-text"><?php bloginfo( 'name' ); ?></span>
						<?php endif; ?>
					</a>
				</div>

				<!-- Navigation Menu (Desktop) -->
				<nav class="jerush-nav" aria-label="Main Navigation">
					<ul class="jerush-nav-list">
						<li class="jerush-nav-item"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="jerush-nav-link" data-i18n="nav_home">Home</a></li>
						
						<!-- About Us Mega Menu Trigger -->
						<li class="jerush-nav-item jerush-mega-trigger">
							<a href="#" class="jerush-nav-link" data-i18n="nav_about">About Us <span class="jerush-arrow"></span></a>
							
							<!-- About Us Mega Menu Panel -->
							<div class="jerush-megamenu">
								<div class="jerush-megamenu-inner">
									<!-- Left Sidebar Categories -->
									<div class="jerush-megamenu-sidebar">
										<button class="jerush-category-tab active" data-target="about-legacy">
											Our Legacy
											<span class="jerush-tab-arrow"></span>
										</button>
										<button class="jerush-category-tab" data-target="about-team">
											Doctors & Team
											<span class="jerush-tab-arrow"></span>
										</button>
										<button class="jerush-category-tab" data-target="about-quality">
											Quality & Care
											<span class="jerush-tab-arrow"></span>
										</button>
									</div>

									<!-- Right Content Panel -->
									<div class="jerush-megamenu-content">
										<!-- Our Legacy Pane -->
										<div class="jerush-megamenu-pane active" id="about-legacy">
											<h4 class="jerush-pane-title">Our Legacy</h4>
											<div class="jerush-grid-3cols">
												<div class="jerush-grid-column">
													<h5>Our History</h5>
													<ul>
														<li><a href="/about/">About Our Hospital</a></li>
														<li><a href="/our-legacy/">Milestones & Legacy</a></li>
													</ul>
												</div>
												<div class="jerush-grid-column">
													<h5>Our Values</h5>
													<ul>
														<li><a href="/clinical-precision/">Clinical Excellence</a></li>
														<li><a href="/ethical-healthcare/">Ethical Healthcare</a></li>
													</ul>
												</div>
												<div class="jerush-grid-column">
													<h5>Patient Voices</h5>
													<ul>
														<li><a href="/testimonials/">Testimonials</a></li>
														<li><a href="/reviews/">Patient Reviews</a></li>
													</ul>
												</div>
											</div>
										</div>

										<!-- Doctors & Team Pane -->
										<div class="jerush-megamenu-pane" id="about-team">
											<h4 class="jerush-pane-title">Meet Our Team</h4>
											<div class="jerush-grid-3cols">
												<div class="jerush-grid-column">
													<h5>Leadership</h5>
													<ul>
														<li><a href="/meet-our-directors/">Meet Our Directors</a></li>
													</ul>
												</div>
												<div class="jerush-grid-column">
													<h5>Specialists</h5>
													<ul>
														<li><a href="/our-doctors/">Meet Our Doctors</a></li>
													</ul>
												</div>
												<div class="jerush-grid-column">
													<h5>Support Care</h5>
													<ul>
														<li><a href="/meet-our-team/">Meet Our Team</a></li>
													</ul>
												</div>
											</div>
										</div>

										<!-- Quality & Care Pane -->
										<div class="jerush-megamenu-pane" id="about-quality">
											<h4 class="jerush-pane-title">Quality & Clinical Standards</h4>
											<div class="jerush-grid-3cols">
												<div class="jerush-grid-column">
													<h5>Clinical Standards</h5>
													<ul>
														<li><a href="/clinical-quality/">Clinical Quality</a></li>
														<li><a href="/patient-safety/">Patient Safety</a></li>
													</ul>
												</div>
												<div class="jerush-grid-column">
													<h5>Technology</h5>
													<ul>
														<li><a href="/precision-diagnostics/">Precision Diagnostics</a></li>
														<li><a href="/modern-facilities/">Modern Facilities</a></li>
													</ul>
												</div>
											</div>
										</div>
									</div>
									
									<!-- Right Sidebar: Quick Links Action List -->
									<div class="jerush-megamenu-quicklinks">
										<h5 class="jerush-ql-title">Quick Links</h5>
										<div class="jerush-ql-list">
											<!-- Emergency Support -->
											<a href="tel:+919489160055" class="jerush-ql-item ql-item-emergency">
												<div class="jerush-ql-item-icon">
													<svg class="jerush-ql-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
												</div>
												<div class="jerush-ql-item-text">
													<span class="jerush-ql-item-label">Emergency Support</span>
													<span class="jerush-ql-item-val">+91 94891 60055</span>
												</div>
												<svg class="jerush-ql-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
											</a>

											<!-- Dubai Helpline -->
											<a href="tel:+971507253105" class="jerush-ql-item ql-item-dubai">
												<div class="jerush-ql-item-icon">
													<svg class="jerush-ql-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
												</div>
												<div class="jerush-ql-item-text">
													<span class="jerush-ql-item-label">Fujairah - UAE Branch</span>
													<span class="jerush-ql-item-val">+971 50725 3105</span>
												</div>
												<svg class="jerush-ql-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
											</a>

											<!-- General Inquiry -->
											<a href="tel:+919751010107" class="jerush-ql-item ql-item-inquiry">
												<div class="jerush-ql-item-icon">
													<svg class="jerush-ql-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
												</div>
												<div class="jerush-ql-item-text">
													<span class="jerush-ql-item-label">General Inquiry</span>
													<span class="jerush-ql-item-val">+91 97510 10107</span>
												</div>
												<svg class="jerush-ql-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
											</a>

											<!-- Book Appointment -->
											<a href="<?php echo esc_url( home_url( '/book-appointment/' ) ); ?>" class="jerush-ql-item ql-item-appointment">
												<div class="jerush-ql-item-icon">
													<svg class="jerush-ql-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
												</div>
												<div class="jerush-ql-item-text">
													<span class="jerush-ql-item-label">Online Booking</span>
													<span class="jerush-ql-item-val">Book Appointment</span>
												</div>
												<svg class="jerush-ql-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
											</a>

											<!-- Find Doctors -->
											<a href="<?php echo esc_url( home_url( '/our-doctors/' ) ); ?>" class="jerush-ql-item ql-item-doctors">
												<div class="jerush-ql-item-icon">
													<svg class="jerush-ql-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
												</div>
												<div class="jerush-ql-item-text">
													<span class="jerush-ql-item-label">Our Specialists</span>
													<span class="jerush-ql-item-val">Find Doctors</span>
												</div>
												<svg class="jerush-ql-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
											</a>

											<!-- Contact Us -->
											<a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="jerush-ql-item ql-item-contact">
												<div class="jerush-ql-item-icon">
													<svg class="jerush-ql-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
												</div>
												<div class="jerush-ql-item-text">
													<span class="jerush-ql-item-label">Clinic Locations</span>
													<span class="jerush-ql-item-val">Contact Us</span>
												</div>
												<svg class="jerush-ql-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
											</a>
										</div>
									</div>
								</div>
							</div>
						</li>
						
						<!-- Treatments Mega Menu Trigger -->
						<li class="jerush-nav-item jerush-mega-trigger">
							<a href="#" class="jerush-nav-link">Treatments <span class="jerush-arrow"></span></a>
							
							<!-- Treatments Mega Menu Panel -->
							<div class="jerush-megamenu">
								<div class="jerush-megamenu-inner">
									<!-- Left Sidebar Categories -->
									<div class="jerush-megamenu-sidebar">
										<button class="jerush-category-tab active" data-target="dental-services">
											Dental Services
											<span class="jerush-tab-arrow"></span>
										</button>
										<button class="jerush-category-tab" data-target="cosmetic-dermatology">
											Cosmetic Dermatology & Laser
											<span class="jerush-tab-arrow"></span>
										</button>
										<button class="jerush-category-tab" data-target="hair-restoration">
											Hair Restoration
											<span class="jerush-tab-arrow"></span>
										</button>
										<button class="jerush-category-tab" data-target="body-contouring">
											Body Contouring & Wellness
											<span class="jerush-tab-arrow"></span>
										</button>
									</div>

									<!-- Right Content Panel -->
									<div class="jerush-megamenu-content">
										<!-- Dental Services Pane -->
										<div class="jerush-megamenu-pane active" id="dental-services">
											<h4 class="jerush-pane-title">Dental Services</h4>
											<div class="jerush-grid-3cols">
												<div class="jerush-grid-column">
													<h5>Specialized Care</h5>
													<ul>
														<li><a href="/treatments/oral-pathology/">Oral Pathology & Cancer Screening</a></li>
														<li><a href="/treatments/orthodontics/">Clear Aligners (Jerushaligne)</a></li>
														<li><a href="/treatments/orthodontics-braces/">Metal, Ceramic & Lingual Braces</a></li>
														<li><a href="/treatments/maxillofacial-surgery/">Oral & Maxillofacial Surgery</a></li>
													</ul>
												</div>
												<div class="jerush-grid-column">
													<h5>General & Restorative</h5>
													<ul>
														<li><a href="/treatments/endodontics/">Single Visit Root Canal</a></li>
														<li><a href="/treatments/prosthodontics/">Veneers, Crowns & Bridges</a></li>
														<li><a href="/treatments/implantology/">Dental Implants</a></li>
														<li><a href="/treatments/pedodontics/">Pediatric Dental Care</a></li>
													</ul>
												</div>
												<div class="jerush-grid-column">
													<h5>Diagnostics & Lab</h5>
													<ul>
														<li><a href="/treatments/periodontics/">Periodontics & Gum Surgery</a></li>
														<li><a href="/treatments/radiology/">Advanced Radiology (CBCT, OPG)</a></li>
														<li><a href="/treatments/dental-lab/">Precision In-house Dental Lab</a></li>
														<li><a href="/treatments/medical-lab/">Diagnostic Medical Lab Services</a></li>
													</ul>
												</div>
											</div>
										</div>

										<!-- Cosmetic Dermatology & Laser Pane -->
										<div class="jerush-megamenu-pane" id="cosmetic-dermatology">
											<h4 class="jerush-pane-title">Cosmetic Dermatology & Laser Services</h4>
											<div class="jerush-grid-3cols">
												<div class="jerush-grid-column">
													<h5>Laser Skin Resurfacing</h5>
													<ul>
														<li><a href="/treatments/fractional-co2-laser/">CO₂ / Fractional Laser</a></li>
														<li><a href="/treatments/pico-laser/">Pico Laser (Tattoo & Pigment Removal)</a></li>
														<li><a href="/treatments/diode-laser/">Diode Laser (Hair Reduction)</a></li>
														<li><a href="/treatments/excimer-lamp/">Excimer Lamp (Vitiligo/Psoriasis)</a></li>
													</ul>
												</div>
												<div class="jerush-grid-column">
													<h5>Skin Rejuvenation</h5>
													<ul>
														<li><a href="/treatments/hydraskin-revive/">Hydraskin Revive Therapy</a></li>
														<li><a href="/treatments/medifacials/">Premium Gold & Radiance Facials</a></li>
														<li><a href="/treatments/chemical-peels/">Chemical Peels (Pigmentation Correct)</a></li>
														<li><a href="/treatments/microdermabrasion/">Microdermabrasion & Skin Polishing</a></li>
													</ul>
												</div>
												<div class="jerush-grid-column">
													<h5>Advanced Aesthetics</h5>
													<ul>
														<li><a href="/treatments/hifu/">HIFU (Skin Tightening)</a></li>
														<li><a href="/treatments/botox-fillers/">Botox & Dermal Fillers</a></li>
														<li><a href="/treatments/rf-cautery/">RF Cautery (Moles & Warts Removal)</a></li>
														<li><a href="/treatments/micropigmentation/">Microblading & Micropigmentation</a></li>
													</ul>
												</div>
											</div>
										</div>

										<!-- Hair Restoration Pane -->
										<div class="jerush-megamenu-pane" id="hair-restoration">
											<h4 class="jerush-pane-title">Hair Restoration Services</h4>
											<div class="jerush-grid-3cols">
												<div class="jerush-grid-column">
													<h5>Regenerative Therapies</h5>
													<ul>
														<li><a href="/treatments/gfc-hair-therapy/">GFC (Growth Factor Concentrate)</a></li>
														<li><a href="/treatments/qr678-therapy/">QR678 Hair Regrowth Therapy</a></li>
														<li><a href="/treatments/exocell-therapy/">Exocell & Bio Cell Therapy</a></li>
													</ul>
												</div>
												<div class="jerush-grid-column">
													<h5>Surgical Procedures</h5>
													<ul>
														<li><a href="/treatments/hair-transplant/">FUE Hair Transplant</a></li>
														<li><a href="/treatments/hair-stabilization/">Hair Growth Stabilization Booster</a></li>
													</ul>
												</div>
												<div class="jerush-grid-column">
													<h5>Scalp Treatments</h5>
													<ul>
														<li><a href="/treatments/anti-dandruff-laser/">Dandruff Laser Treatment</a></li>
														<li><a href="/treatments/scalp-cleansing/">Scalp Cleansing Therapy</a></li>
													</ul>
												</div>
											</div>
										</div>

										<!-- Body Contouring & Wellness Pane -->
										<div class="jerush-megamenu-pane" id="body-contouring">
											<h4 class="jerush-pane-title">Body Contouring & Wellness</h4>
											<div class="jerush-grid-3cols">
												<div class="jerush-grid-column">
													<h5>Fat Reduction</h5>
													<ul>
														<li><a href="/treatments/cryo-cool-sculpting/">Cryo Cool Sculpting</a></li>
														<li><a href="/treatments/em-sculpting/">EM-Sculpting (Muscle & Fat)</a></li>
													</ul>
												</div>
												<div class="jerush-grid-column">
													<h5>Skin & Muscle Toning</h5>
													<ul>
														<li><a href="/treatments/rf-muscle-tightening/">RF Muscle Tightening</a></li>
														<li><a href="/treatments/emsella-chair/">Emsella Chair (Pelvic Floor Health)</a></li>
													</ul>
												</div>
												<div class="jerush-grid-column">
													<h5>Wellness & Recovery</h5>
													<ul>
														<li><a href="/about/clinical-wellness/">Clinical Body Wellness Overview</a></li>
													</ul>
												</div>
											</div>
										</div>
									</div>
									
									<!-- Right Sidebar: Quick Links Action List -->
									<div class="jerush-megamenu-quicklinks">
										<h5 class="jerush-ql-title">Quick Links</h5>
										<div class="jerush-ql-list">
											<!-- Emergency Support -->
											<a href="tel:+919489160055" class="jerush-ql-item ql-item-emergency">
												<div class="jerush-ql-item-icon">
													<svg class="jerush-ql-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
												</div>
												<div class="jerush-ql-item-text">
													<span class="jerush-ql-item-label">Emergency Support</span>
													<span class="jerush-ql-item-val">+91 94891 60055</span>
												</div>
												<svg class="jerush-ql-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
											</a>

											<!-- Dubai Helpline -->
											<a href="tel:+971507253105" class="jerush-ql-item ql-item-dubai">
												<div class="jerush-ql-item-icon">
													<svg class="jerush-ql-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
												</div>
												<div class="jerush-ql-item-text">
													<span class="jerush-ql-item-label">Dubai Helpline</span>
													<span class="jerush-ql-item-val">+971 50725 3105</span>
												</div>
												<svg class="jerush-ql-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
											</a>

											<!-- General Inquiry -->
											<a href="tel:+919751010107" class="jerush-ql-item ql-item-inquiry">
												<div class="jerush-ql-item-icon">
													<svg class="jerush-ql-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
												</div>
												<div class="jerush-ql-item-text">
													<span class="jerush-ql-item-label">General Inquiry</span>
													<span class="jerush-ql-item-val">+91 97510 10107</span>
												</div>
												<svg class="jerush-ql-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
											</a>

											<!-- Book Appointment -->
											<a href="<?php echo esc_url( home_url( '/book-appointment/' ) ); ?>" class="jerush-ql-item ql-item-appointment">
												<div class="jerush-ql-item-icon">
													<svg class="jerush-ql-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
												</div>
												<div class="jerush-ql-item-text">
													<span class="jerush-ql-item-label">Online Booking</span>
													<span class="jerush-ql-item-val">Book Appointment</span>
												</div>
												<svg class="jerush-ql-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
											</a>

											<!-- Find Doctors -->
											<a href="<?php echo esc_url( home_url( '/our-doctors/' ) ); ?>" class="jerush-ql-item ql-item-doctors">
												<div class="jerush-ql-item-icon">
													<svg class="jerush-ql-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
												</div>
												<div class="jerush-ql-item-text">
													<span class="jerush-ql-item-label">Our Specialists</span>
													<span class="jerush-ql-item-val">Find Doctors</span>
												</div>
												<svg class="jerush-ql-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
											</a>

											<!-- Contact Us -->
											<a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="jerush-ql-item ql-item-contact">
												<div class="jerush-ql-item-icon">
													<svg class="jerush-ql-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
												</div>
												<div class="jerush-ql-item-text">
													<span class="jerush-ql-item-label">Clinic Locations</span>
													<span class="jerush-ql-item-val">Contact Us</span>
												</div>
												<svg class="jerush-ql-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
											</a>
										</div>
									</div>
								</div>
							</div>
						</li>

						<!-- Gallery Mega Menu Trigger -->
						<li class="jerush-nav-item jerush-mega-trigger">
							<a href="#" class="jerush-nav-link" data-i18n="nav_gallery">Gallery <span class="jerush-arrow"></span></a>
							
							<!-- Gallery Mega Menu Panel -->
							<div class="jerush-megamenu">
								<div class="jerush-megamenu-inner">
									<!-- Left Sidebar Categories -->
									<div class="jerush-megamenu-sidebar">
										<button class="jerush-category-tab active" data-target="gallery-cases">
											Transformations
											<span class="jerush-tab-arrow"></span>
										</button>
										<button class="jerush-category-tab" data-target="gallery-media">
											Media & Tours
											<span class="jerush-tab-arrow"></span>
										</button>
										<button class="jerush-category-tab" data-target="gallery-reviews">
											Patient Stories
											<span class="jerush-tab-arrow"></span>
										</button>
									</div>

									<!-- Right Content Panel -->
									<div class="jerush-megamenu-content">
										<!-- Transformations Pane -->
										<div class="jerush-megamenu-pane active" id="gallery-cases">
											<h4 class="jerush-pane-title">Before & After Results</h4>
											<div class="jerush-grid-3cols">
												<div class="jerush-grid-column">
													<h5>Dentistry</h5>
													<ul>
														<li><a href="/smile-stories/">Smile Transformations</a></li>
														<li><a href="/cosmetic-resurfacing-gallery/">Cosmetic Resurfacing</a></li>
													</ul>
												</div>
												<div class="jerush-grid-column">
													<h5>Aesthetics</h5>
													<ul>
														<li><a href="/hair-restoration-gallery/">Hair Regrowth Results</a></li>
														<li><a href="/body-contouring-gallery/">Body Contouring Cases</a></li>
													</ul>
												</div>
											</div>
										</div>

										<!-- Media & Tours Pane -->
										<div class="jerush-megamenu-pane" id="gallery-media">
											<h4 class="jerush-pane-title">Tours & Outreach</h4>
											<div class="jerush-grid-3cols">
												<div class="jerush-grid-column">
													<h5>Facility Tours</h5>
													<ul>
														<li><a href="/clinic-tour/">Clinic Video Tour</a></li>
														<li><a href="/virtual-tour/">Virtual Tour (3D)</a></li>
													</ul>
												</div>
												<div class="jerush-grid-column">
													<h5>Community</h5>
													<ul>
														<li><a href="/camps/">Dental Health Camps</a></li>
														<li><a href="/wellness-seminars/">Wellness Seminars</a></li>
													</ul>
												</div>
											</div>
										</div>

										<!-- Patient Stories Pane -->
										<div class="jerush-megamenu-pane" id="gallery-reviews">
											<h4 class="jerush-pane-title">Patient Testimonials</h4>
											<div class="jerush-grid-3cols">
												<div class="jerush-grid-column">
													<h5>Direct Reviews</h5>
													<ul>
														<li><a href="/video-testimonials/">Video Testimonials</a></li>
														<li><a href="/photo-testimonials/">Photo Stories</a></li>
													</ul>
												</div>
												<div class="jerush-grid-column">
													<h5>Third Party Feed</h5>
													<ul>
														<li><a href="/google-reviews/">Google Patient Feed</a></li>
														<li><a href="/facebook-reviews/">Facebook Patient Feed</a></li>
													</ul>
												</div>
											</div>
										</div>
									</div>
									
									<!-- Right Sidebar: Quick Links Action List -->
									<div class="jerush-megamenu-quicklinks">
										<h5 class="jerush-ql-title">Quick Links</h5>
										<div class="jerush-ql-list">
											<!-- Emergency Support -->
											<a href="tel:+919489160055" class="jerush-ql-item ql-item-emergency">
												<div class="jerush-ql-item-icon">
													<svg class="jerush-ql-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
												</div>
												<div class="jerush-ql-item-text">
													<span class="jerush-ql-item-label">Emergency Support</span>
													<span class="jerush-ql-item-val">+91 94891 60055</span>
												</div>
												<svg class="jerush-ql-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
											</a>

											<!-- Dubai Helpline -->
											<a href="tel:+971507253105" class="jerush-ql-item ql-item-dubai">
												<div class="jerush-ql-item-icon">
													<svg class="jerush-ql-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
												</div>
												<div class="jerush-ql-item-text">
													<span class="jerush-ql-item-label">Dubai Helpline</span>
													<span class="jerush-ql-item-val">+971 50725 3105</span>
												</div>
												<svg class="jerush-ql-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
											</a>

											<!-- General Inquiry -->
											<a href="tel:+919751010107" class="jerush-ql-item ql-item-inquiry">
												<div class="jerush-ql-item-icon">
													<svg class="jerush-ql-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
												</div>
												<div class="jerush-ql-item-text">
													<span class="jerush-ql-item-label">General Inquiry</span>
													<span class="jerush-ql-item-val">+91 97510 10107</span>
												</div>
												<svg class="jerush-ql-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
											</a>

											<!-- Book Appointment -->
											<a href="<?php echo esc_url( home_url( '/book-appointment/' ) ); ?>" class="jerush-ql-item ql-item-appointment">
												<div class="jerush-ql-item-icon">
													<svg class="jerush-ql-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
												</div>
												<div class="jerush-ql-item-text">
													<span class="jerush-ql-item-label">Online Booking</span>
													<span class="jerush-ql-item-val">Book Appointment</span>
												</div>
												<svg class="jerush-ql-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
											</a>

											<!-- Find Doctors -->
											<a href="<?php echo esc_url( home_url( '/our-doctors/' ) ); ?>" class="jerush-ql-item ql-item-doctors">
												<div class="jerush-ql-item-icon">
													<svg class="jerush-ql-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
												</div>
												<div class="jerush-ql-item-text">
													<span class="jerush-ql-item-label">Our Specialists</span>
													<span class="jerush-ql-item-val">Find Doctors</span>
												</div>
												<svg class="jerush-ql-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
											</a>

											<!-- Contact Us -->
											<a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="jerush-ql-item ql-item-contact">
												<div class="jerush-ql-item-icon">
													<svg class="jerush-ql-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
												</div>
												<div class="jerush-ql-item-text">
													<span class="jerush-ql-item-label">Clinic Locations</span>
													<span class="jerush-ql-item-val">Contact Us</span>
												</div>
												<svg class="jerush-ql-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
											</a>
										</div>
									</div>
								</div>
							</div>
						</li>

						<li class="jerush-nav-item"><a href="<?php echo esc_url( home_url( '/blogs/' ) ); ?>" class="jerush-nav-link" data-i18n="nav_blogs">Blogs</a></li>
						<li class="jerush-nav-item"><a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="jerush-nav-link" data-i18n="nav_contact">Contact Us</a></li>
					</ul>
				</nav>

				<!-- Book Appointment CTA -->
				<div class="jerush-nav-cta">
					<!-- Language Selector Dropdown -->
					<div class="jerush-lang-selector notranslate z-30 mr-1">
						<button id="langSelectBtn" aria-haspopup="true" aria-expanded="false">
							<span class="flex items-center gap-0.5">
								<span class="text-[10px] text-slate-400 font-semibold lowercase">us</span>
								<span class="font-bold uppercase ml-0.5">en</span>
							</span>
							<svg class="arrow-icon" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
						</button>
						<div id="langDropdown" class="hidden">
							<a href="#" data-lang="en" class="lang-dropdown-item">
								<span class="flex items-center gap-3">
									<span class="lang-country-code">US</span>
									<span class="lang-name">English</span>
								</span>
								<span class="lang-checkmark hidden">✓</span>
							</a>
							<a href="#" data-lang="ta" class="lang-dropdown-item">
								<span class="flex items-center gap-3">
									<span class="lang-country-code">IN</span>
									<span class="lang-name">Tamil</span>
								</span>
								<span class="lang-checkmark hidden">✓</span>
							</a>
							<a href="#" data-lang="ar" class="lang-dropdown-item">
								<span class="flex items-center gap-3">
									<span class="lang-country-code">AE</span>
									<span class="lang-name">Arabic</span>
								</span>
								<span class="lang-checkmark hidden">✓</span>
							</a>
							<a href="#" data-lang="hi" class="lang-dropdown-item">
								<span class="flex items-center gap-3">
									<span class="lang-country-code">IN</span>
									<span class="lang-name">Hindi</span>
								</span>
								<span class="lang-checkmark hidden">✓</span>
							</a>
							<a href="#" data-lang="ml" class="lang-dropdown-item">
								<span class="flex items-center gap-3">
									<span class="lang-country-code">IN</span>
									<span class="lang-name">Malayalam</span>
								</span>
								<span class="lang-checkmark hidden">✓</span>
							</a>
							<a href="#" data-lang="te" class="lang-dropdown-item">
								<span class="flex items-center gap-3">
									<span class="lang-country-code">IN</span>
									<span class="lang-name">Telugu</span>
								</span>
								<span class="lang-checkmark hidden">✓</span>
							</a>
						</div>
					</div>

					<a href="<?php echo esc_url( home_url( '/book-appointment/' ) ); ?>" class="jerush-cta-btn" data-i18n="nav_book_cta">Book Appointment</a>
					
					<!-- Mobile Menu Toggle Button (Hamburger) -->
					<button class="jerush-hamburger" aria-expanded="false" aria-label="Toggle Navigation">
						<span class="jerush-bar"></span>
						<span class="jerush-bar"></span>
						<span class="jerush-bar"></span>
					</button>
				</div>
			</div>
		</div>
	</header>
</div> <!-- closes jerush-wrapper -->

<!-- Mobile Navigation Drawer Overlay -->
<div class="jerush-mobile-overlay"></div>

<!-- Mobile Navigation Drawer Container -->
<div class="jerush-mobile-drawer">
	<div class="jerush-mobile-drawer-header">
		<div class="jerush-mobile-logo">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>">
				<?php if ( ! empty( $header_logo ) ) : ?>
					<img src="<?php echo esc_url( $header_logo ); ?>" alt="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" class="jerush-logo-img" />
				<?php else : ?>
					<img src="<?php echo esc_url( get_template_directory_uri() . '/logo/jerush-logo.webp' ); ?>" alt="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" class="jerush-logo-img" onerror="this.style.display='none';" />
				<?php endif; ?>
			</a>
		</div>
		<button class="jerush-mobile-close" aria-label="Close Navigation Drawer">&times;</button>
	</div>
	
	<div class="jerush-mobile-drawer-body">
		<!-- Pinned Direct Contact Shortcuts (Top of Drawer) -->
		<div class="jerush-mobile-contacts">
			<a href="tel:+919489160055" class="jerush-mobile-contact-item">
				<span>Thuckalay Support</span>
				<strong>+91 94891 60055</strong>
			</a>
			<a href="tel:+919489160011" class="jerush-mobile-contact-item">
				<span>Trichy Helpline</span>
				<strong>+91 94891 60011</strong>
			</a>
			<a href="tel:+919751010107" class="jerush-mobile-contact-item">
				<span>Chennai Clinic</span>
				<strong>+91 97510 10107</strong>
			</a>
			<a href="tel:+971507253105" class="jerush-mobile-contact-item">
				<span>Dubai Liaison</span>
				<strong>+971 50725 3105</strong>
			</a>
		</div>

		<!-- Accordion Menus -->
		<ul class="jerush-mobile-menu">
			<li class="jerush-mobile-item"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="jerush-mobile-link">Home</a></li>
			
			<!-- About Accordion -->
			<li class="jerush-mobile-item has-accordion">
				<button class="jerush-mobile-accordion-toggle">About Us <span class="jerush-accordion-icon"></span></button>
				<ul class="jerush-mobile-submenu">
					<li><a href="/about/">Our Hospital</a></li>
					<li><a href="/our-legacy/">Milestones & Legacy</a></li>
					<li><a href="/clinical-precision/">Clinical Excellence</a></li>
					<li><a href="/ethical-healthcare/">Ethical Healthcare</a></li>
					<li><a href="/testimonials/">Patient Testimonials</a></li>
					<li><a href="/meet-our-directors/">Meet Our Directors</a></li>
					<li><a href="/our-doctors/">Meet Our Doctors</a></li>
					<li><a href="/meet-our-team/">Clinical Team</a></li>
					<li><a href="/clinical-quality/">Clinical Quality</a></li>
					<li><a href="/patient-safety/">Patient Safety</a></li>
					<li><a href="/precision-diagnostics/">Precision Diagnostics</a></li>
					<li><a href="/modern-facilities/">Modern Facilities</a></li>
				</ul>
			</li>

			<!-- Treatments Accordion -->
			<li class="jerush-mobile-item has-accordion">
				<button class="jerush-mobile-accordion-toggle">Treatments <span class="jerush-accordion-icon"></span></button>
				<ul class="jerush-mobile-submenu">
					<li class="jerush-mobile-subaccordion">
						<button class="jerush-mobile-subaccordion-toggle">Dental Services <span class="jerush-accordion-icon"></span></button>
						<ul class="jerush-mobile-subsubmenu">
							<li><a href="/treatments/oral-pathology/">Oral Pathology & Cancer</a></li>
							<li><a href="/treatments/orthodontics/">Clear Aligners (Jerushaligne)</a></li>
							<li><a href="/treatments/orthodontics-braces/">Traditional & Ceramic Braces</a></li>
							<li><a href="/treatments/maxillofacial-surgery/">Oral & Maxillofacial Surgery</a></li>
							<li><a href="/treatments/endodontics/">Single Visit Root Canal</a></li>
							<li><a href="/treatments/prosthodontics/">Veneers, Crowns & Bridges</a></li>
							<li><a href="/treatments/implantology/">Dental Implants</a></li>
							<li><a href="/treatments/pedodontics/">Pediatric Dental Care</a></li>
							<li><a href="/treatments/periodontics/">Periodontics & Gum Surgery</a></li>
							<li><a href="/treatments/radiology/">Advanced Radiology (CBCT, OPG)</a></li>
							<li><a href="/treatments/dental-lab/">Precision In-house Dental Lab</a></li>
							<li><a href="/treatments/medical-lab/">Diagnostic Medical Lab</a></li>
						</ul>
					</li>
					<li class="jerush-mobile-subaccordion">
						<button class="jerush-mobile-subaccordion-toggle">Cosmetic Dermatology & Laser <span class="jerush-accordion-icon"></span></button>
						<ul class="jerush-mobile-subsubmenu">
							<li><a href="/treatments/fractional-co2-laser/">CO₂ / Fractional Laser</a></li>
							<li><a href="/treatments/pico-laser/">Pico Laser Tattoo Removal</a></li>
							<li><a href="/treatments/diode-laser/">Diode Laser Hair Reduction</a></li>
							<li><a href="/treatments/excimer-lamp/">Excimer Lamp Treatment</a></li>
							<li><a href="/treatments/hydraskin-revive/">Hydraskin Revive Therapy</a></li>
							<li><a href="/treatments/medifacials/">Premium Gold & Radiance Facials</a></li>
							<li><a href="/treatments/chemical-peels/">Chemical Peels Treatment</a></li>
							<li><a href="/treatments/microdermabrasion/">Microdermabrasion & Polishing</a></li>
							<li><a href="/treatments/hifu/">HIFU Skin Tightening</a></li>
							<li><a href="/treatments/botox-fillers/">Botox & Dermal Fillers</a></li>
							<li><a href="/treatments/rf-cautery/">RF Cautery Moles & Warts</a></li>
							<li><a href="/treatments/micropigmentation/">Microblading & Micropigmentation</a></li>
						</ul>
					</li>
					<li class="jerush-mobile-subaccordion">
						<button class="jerush-mobile-subaccordion-toggle">Hair Restoration <span class="jerush-accordion-icon"></span></button>
						<ul class="jerush-mobile-subsubmenu">
							<li><a href="/treatments/gfc-hair-therapy/">GFC (Growth Factor Concentrate)</a></li>
							<li><a href="/treatments/qr678-therapy/">QR678 Hair Regrowth Therapy</a></li>
							<li><a href="/treatments/exocell-therapy/">Exocell & Bio Cell Therapy</a></li>
							<li><a href="/treatments/hair-transplant/">FUE Hair Transplant</a></li>
							<li><a href="/treatments/hair-stabilization/">Hair Growth Stabilization Booster</a></li>
							<li><a href="/treatments/anti-dandruff-laser/">Dandruff Laser Treatment</a></li>
							<li><a href="/treatments/scalp-cleansing/">Scalp Cleansing Therapy</a></li>
						</ul>
					</li>
					<li class="jerush-mobile-subaccordion">
						<button class="jerush-mobile-subaccordion-toggle">Body Contouring & Wellness <span class="jerush-accordion-icon"></span></button>
						<ul class="jerush-mobile-subsubmenu">
							<li><a href="/treatments/cryo-cool-sculpting/">Cryo Cool Sculpting</a></li>
							<li><a href="/treatments/em-sculpting/">EM-Sculpting</a></li>
							<li><a href="/treatments/rf-muscle-tightening/">RF Muscle Tightening</a></li>
							<li><a href="/treatments/emsella-chair/">Emsella Chair (Pelvic Health)</a></li>
							<li><a href="/about/clinical-wellness/">Clinical Body Wellness</a></li>
						</ul>
					</li>
				</ul>
			</li>

			<!-- Gallery Accordion -->
			<li class="jerush-mobile-item has-accordion">
				<button class="jerush-mobile-accordion-toggle">Gallery <span class="jerush-accordion-icon"></span></button>
				<ul class="jerush-mobile-submenu">
					<li class="jerush-mobile-subaccordion">
						<button class="jerush-mobile-subaccordion-toggle">Transformations <span class="jerush-accordion-icon"></span></button>
						<ul class="jerush-mobile-subsubmenu">
							<li><a href="/smile-stories/">Smile Stories Before & After</a></li>
							<li><a href="/cosmetic-resurfacing-gallery/">Cosmetic Resurfacing Gallery</a></li>
							<li><a href="/hair-restoration-gallery/">Hair Restoration Results</a></li>
							<li><a href="/body-contouring-gallery/">Body Contouring Transformations</a></li>
						</ul>
					</li>
					<li class="jerush-mobile-subaccordion">
						<button class="jerush-mobile-subaccordion-toggle">Media & Tours <span class="jerush-accordion-icon"></span></button>
						<ul class="jerush-mobile-subsubmenu">
							<li><a href="/clinic-tour/">Clinic Video Tour</a></li>
							<li><a href="/virtual-tour/">Virtual Facility Tour</a></li>
							<li><a href="/camps/">Dental Health Camps</a></li>
							<li><a href="/wellness-seminars/">Community Wellness Seminars</a></li>
						</ul>
					</li>
					<li class="jerush-mobile-subaccordion">
						<button class="jerush-mobile-subaccordion-toggle">Patient Stories <span class="jerush-accordion-icon"></span></button>
						<ul class="jerush-mobile-subsubmenu">
							<li><a href="/video-testimonials/">Video Patient Stories</a></li>
							<li><a href="/photo-testimonials/">Photo Testimonials</a></li>
							<li><a href="/google-reviews/">Google Reviews</a></li>
							<li><a href="/facebook-reviews/">Facebook Patient Feed</a></li>
						</ul>
					</li>
				</ul>
			</li>

			<li class="jerush-mobile-item"><a href="<?php echo esc_url( home_url( '/blogs/' ) ); ?>" class="jerush-mobile-link">Blogs</a></li>
			<li class="jerush-mobile-item"><a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="jerush-mobile-link">Contact Us</a></li>
		</ul>

		<!-- Book Appointment CTA (Mobile Drawer) -->
		<div class="jerush-mobile-drawer-cta">
			<a href="<?php echo esc_url( home_url( '/book-appointment/' ) ); ?>" class="jerush-mobile-cta-btn">Book Appointment</a>
		</div>
	</div>
</div>

<main id="main" class="container-fluid"<?php if ( isset( $navbar_position ) && 'fixed_top' === $navbar_position ) : echo ' style="padding-top: 100px;"'; elseif ( isset( $navbar_position ) && 'fixed_bottom' === $navbar_position ) : echo ' style="padding-bottom: 100px;"'; endif; ?>>
	<div class="row">
