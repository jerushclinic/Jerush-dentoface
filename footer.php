<?php
/**
 * Footer template for Jerush Dentoface theme
 */
?>
	</div> <!-- closes row -->
</main> <!-- closes main -->

<!-- Footer Section (Designed with Tailwind CSS) -->
<footer class="bg-primary text-slate-400 font-body border-t border-slate-800 pt-16 pb-8">
	<div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
		<!-- Column 1: Brand & Bio -->
		<div class="flex flex-col gap-4">
			<div class="flex items-center gap-2">
				<img src="<?php echo esc_url( get_template_directory_uri() . '/logo/jerush-logo.webp' ); ?>" alt="Jerush Logo" class="max-h-12 w-auto brightness-0 invert" onerror="this.style.display='none';" />
			</div>
			<p class="text-sm leading-relaxed mt-2 text-slate-400">
				Leading Multispeciality Dental & Cosmetic Laser Centre in Tamil Nadu and Dubai. Dedicated to premium healthcare with clinical precision and ethics.
			</p>
			<!-- Pinned Accreditations or badging -->
			<div class="flex items-center gap-3 mt-4 text-xs font-semibold uppercase text-slate-500">
				<span class="px-2.5 py-1 border border-slate-800 rounded bg-slate-900/50">ISO 9001:2015</span>
				<span class="px-2.5 py-1 border border-slate-800 rounded bg-slate-900/50">Clinical Excellence</span>
			</div>
		</div>

		<!-- Column 2: Quick Links -->
		<div>
			<h4 class="font-headline font-semibold text-white text-sm uppercase tracking-wider mb-6 pb-2 border-b border-slate-800">Quick Links</h4>
			<ul class="flex flex-col gap-3.5 text-sm">
				<li><a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="hover:text-brandSky transition-colors">Home</a></li>
				<li><a href="/about/" class="hover:text-brandSky transition-colors">Our Legacy</a></li>
				<li><a href="/our-doctors/" class="hover:text-brandSky transition-colors">Meet Our Specialists</a></li>
				<li><a href="/smile-stories/" class="hover:text-brandSky transition-colors">Smile Transformations</a></li>
				<li><a href="/contact/" class="hover:text-brandSky transition-colors">Contact & Locations</a></li>
			</ul>
		</div>

		<!-- Column 3: Primary Treatments -->
		<div>
			<h4 class="font-headline font-semibold text-white text-sm uppercase tracking-wider mb-6 pb-2 border-b border-slate-800">Specialities</h4>
			<ul class="flex flex-col gap-3.5 text-sm">
				<li><a href="/treatments/orthodontics/" class="hover:text-brandSky transition-colors">Clear Aligners (Jerushaligne)</a></li>
				<li><a href="/treatments/implantology/" class="hover:text-brandSky transition-colors">Advanced Dental Implants</a></li>
				<li><a href="/treatments/fractional-co2-laser/" class="hover:text-brandSky transition-colors">CO₂ Fractional Lasers</a></li>
				<li><a href="/treatments/gfc-hair-therapy/" class="hover:text-brandSky transition-colors">GFC Hair Restoration</a></li>
				<li><a href="/treatments/emsella-chair/" class="hover:text-brandSky transition-colors">Emsella Pelvic Wellness</a></li>
			</ul>
		</div>

		<!-- Column 4: Contact details -->
		<div>
			<h4 class="font-headline font-semibold text-white text-sm uppercase tracking-wider mb-6 pb-2 border-b border-slate-800">Connect Support</h4>
			<ul class="flex flex-col gap-4 text-sm text-slate-400">
				<li class="flex items-start gap-3">
					<svg class="w-5 h-5 text-brandSky shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
					<span>Thuckalay, Trichy, Chennai and Fujairah Dubai (UAE)</span>
				</li>
				<li class="flex items-center gap-3">
					<svg class="w-5 h-5 text-brandSky shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
					<a href="tel:+919489160055" class="hover:text-brandSky font-bold text-white transition-colors">+91 94891 60055</a>
				</li>
				<li class="flex items-center gap-3">
					<svg class="w-5 h-5 text-brandSky shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
					<a href="mailto:info@jerushdentoface.com" class="hover:text-brandSky transition-colors">info@jerushdentoface.com</a>
				</li>
			</ul>
		</div>
	</div>

	<!-- Copyright Bar -->
	<div class="max-w-7xl mx-auto px-6 border-t border-slate-800/80 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
		<p>&copy; <?php echo date('Y'); ?> Jerush Dentofacial & Cosmetic Laser Centre. All rights reserved.</p>
		<p class="flex gap-4">
			<a href="/privacy-policy/" class="hover:text-slate-400">Privacy Policy</a>
			<span class="text-slate-800">|</span>
			<a href="/terms/" class="hover:text-slate-400">Terms of Use</a>
		</p>
	</div>
</footer>

<!-- Mobile Sticky Bottom Navigation Bar (Hidden on Desktop) -->
<div class="jerush-mobile-bottombar fixed bottom-0 left-0 right-0 z-[9999] lg:hidden bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/80 px-2 pt-2 pb-3.5 grid grid-cols-4 justify-items-center items-center shadow-[0_-10px_30px_rgba(2,6,23,0.5)]">
	<!-- Item 1: Book Appt -->
	<a href="/book-appointment/" class="flex flex-col items-center justify-center text-center w-full py-1 text-slate-400 hover:text-brandSky transition-all duration-200 group">
		<svg class="w-[15px] h-[15px] mb-0.5 group-hover:scale-110 transition-all duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="3" y="5" width="18" height="15" rx="3.5" stroke="#38bdf8" stroke-width="1.8" fill="#38bdf8" fill-opacity="0.15"/>
			<rect x="6" y="2" width="2.5" height="5" rx="1.25" fill="#f43f5e"/>
			<rect x="15.5" y="2" width="2.5" height="5" rx="1.25" fill="#f43f5e"/>
			<path d="M12 16C12 16 8.5 13.5 8.5 11.2C8.5 9.8 9.5 9 10.5 9C11.2 9 11.7 9.4 12 9.8C12.3 9.4 12.8 9 13.5 9C14.5 9 15.5 9.8 15.5 11.2C15.5 13.5 12 16 12 16Z" fill="#f43f5e"/>
		</svg>
		<span class="text-[9px] font-bold uppercase tracking-wider font-headline mt-0.5" data-i18n="nav_book">Book Appt</span>
	</a>

	<!-- Item 2: Clinics -->
	<a href="/contact/" class="flex flex-col items-center justify-center text-center w-full py-1 text-slate-400 hover:text-brandSky transition-all duration-200 group">
		<svg class="w-[15px] h-[15px] mb-0.5 group-hover:scale-110 transition-all duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M12 21C16.5 16.8 19 13.2 19 9.5C19 5.36 15.86 2 12 2C8.14 2 5 5.36 5 9.5C5 13.2 7.5 16.8 12 21Z" stroke="#f43f5e" stroke-width="1.8" fill="#f43f5e" fill-opacity="0.15" stroke-linejoin="round"/>
			<circle cx="12" cy="9.5" r="3.5" fill="#38bdf8"/>
			<path d="M12 7.5V11.5M10 9.5H14" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round"/>
		</svg>
		<span class="text-[9px] font-bold uppercase tracking-wider font-headline mt-0.5" data-i18n="nav_clinics">Clinics</span>
	</a>

	<!-- Item 3: Specialities -->
	<a href="#specialities" class="flex flex-col items-center justify-center text-center w-full py-1 text-slate-400 hover:text-brandSky transition-all duration-200 group">
		<svg class="w-[15px] h-[15px] mb-0.5 group-hover:scale-110 transition-all duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M12 3C9 3 7 4.2 7 7.5C7 9.8 8 11.5 8 14.5C8 17.5 9.5 19.5 9.5 19.5C9.5 19.5 10.5 17.8 12 17.8C13.5 17.8 14.5 19.5 14.5 19.5C14.5 19.5 16 17.5 16 14.5C16 11.5 17 9.8 17 7.5C17 4.2 15 3 12 3Z" stroke="#34d399" stroke-width="1.8" fill="#34d399" fill-opacity="0.15" stroke-linejoin="round"/>
			<path d="M18.5 4.5L19 5.5L20 5.8L19 6.1L18.5 7.1L18 6.1L17 5.8L18 5.5L18.5 4.5Z" fill="#fbbf24"/>
			<path d="M5.5 7.5L5.8 8.2L6.5 8.4L5.8 8.6L5.5 9.3L5.2 8.6L4.5 8.4L5.2 8.2L5.5 7.5Z" fill="#fbbf24"/>
		</svg>
		<span class="text-[9px] font-bold uppercase tracking-wider font-headline mt-0.5" data-i18n="nav_specialities">Specialities</span>
	</a>

	<!-- Item 4: Smile Stories -->
	<a href="/smile-stories/" class="flex flex-col items-center justify-center text-center w-full py-1 text-slate-400 hover:text-brandSky transition-all duration-200 group">
		<svg class="w-[15px] h-[15px] mb-0.5 group-hover:scale-110 transition-all duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<circle cx="12" cy="12" r="8.5" stroke="#fbbf24" stroke-width="1.8" fill="#fbbf24" fill-opacity="0.15"/>
			<circle cx="9" cy="10.5" r="1" fill="#475569"/>
			<circle cx="15" cy="10.5" r="1" fill="#475569"/>
			<circle cx="7" cy="12.5" r="1.5" fill="#f43f5e" fill-opacity="0.5"/>
			<circle cx="17" cy="12.5" r="1.5" fill="#f43f5e" fill-opacity="0.5"/>
			<path d="M9.5 13.5C10.2 15.2 13.8 15.2 14.5 13.5" stroke="#475569" stroke-width="1.5" stroke-linecap="round"/>
			<path d="M19 4L19.4 4.8L20.2 5L19.4 5.2L19 6L18.6 5.2L17.8 5L18.6 4.8L19 4Z" fill="#38bdf8"/>
		</svg>
		<span class="text-[9px] font-bold uppercase tracking-wider font-headline mt-0.5" data-i18n="nav_stories">Stories</span>
	</a>
</div>

<!-- Google Translate Element (Hidden) -->
<div id="google_translate_element" style="position: absolute; top: -9999px; left: -9999px; width: 0; height: 0; overflow: hidden; z-index: -1;"></div>
<script type="text/javascript">
	function googleTranslateElementInit() {
		new google.translate.TranslateElement({
			pageLanguage: 'en',
			includedLanguages: 'en,ta,hi,ar,ml,te',
			layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
			autoDisplay: false
		}, 'google_translate_element');
	}
</script>
<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>

<?php wp_footer(); ?>
</body>
</html>
