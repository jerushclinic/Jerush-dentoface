<?php
/**
 * Template Name: Contact Page
 *
 * Description: A premium contact page template for Jerush Dentoface theme.
 * Features a custom breadcrumb hero and a responsive two-column grid (Image + Contact Form).
 */

get_header();
?>

<!-- Contact Breadcrumb Hero -->
<section class="jerush-contact-hero font-body w-full">
	<div class="jerush-container">
		<h1 class="jerush-contact-hero-title"><?php the_title(); ?></h1>
		<ul class="jerush-breadcrumbs">
			<li class="jerush-breadcrumb-item">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a>
			</li>
			<li class="jerush-breadcrumb-separator">&gt;</li>
			<li class="jerush-breadcrumb-item active"><?php the_title(); ?></li>
		</ul>
	</div>
</section>

<!-- Contact Form and Image Grid Section -->
<section class="jerush-contact-section font-body w-full">
	<div class="jerush-container">
		<div class="jerush-contact-grid">
			
			<!-- Left Column: Premium Treatment Image -->
			<div class="jerush-contact-image-card">
				<img src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/images/contact-treatment.png" alt="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?> Cosmetic & Skin Treatment" loading="lazy" />
				<div class="jerush-contact-image-overlay"></div>
			</div>

			<!-- Right Column: Get in Touch Contact Card -->
			<div class="jerush-contact-form-card text-left">
				<div class="jerush-form-header">
					<h2 class="font-headline font-extrabold text-2xl sm:text-3xl text-primary">Get in Touch</h2>
					<p class="jerush-form-subtitle">Have questions about skin, hair, or dental treatments? Reach out — our expert medical team is happy to help.</p>
				</div>

				<?php
				/**
				 * Form Integration:
				 * To use Contact Form 7, WPForms or other plugins, simply paste the shortcode
				 * in the WordPress page editor. This template will automatically check for 
				 * standard shortcodes in the post content first. If empty, it falls back to 
				 * our beautiful native form design.
				 */
				$has_shortcode = false;
				$post_content = get_post_field( 'post_content', get_the_ID() );

				if ( has_shortcode( $post_content, 'contact-form-7' ) || has_shortcode( $post_content, 'wpforms' ) ) {
					$has_shortcode = true;
				}

				if ( $has_shortcode ) :
					// Render the editor content which contains the shortcode
					while ( have_posts() ) : the_post();
						the_content();
					endwhile;
				else :
					// Fallback Native Styled Contact Form
				?>
					<form id="wpContactUsForm" class="jerush-contact-form" method="post" action="">
						<!-- Full Name -->
						<div class="jerush-form-group">
							<label for="fullName" class="jerush-form-label">Full Name</label>
							<div class="jerush-input-wrapper">
								<input type="text" id="fullName" name="fullName" class="jerush-input" placeholder="Enter your full name" required />
							</div>
						</div>

						<!-- Phone Number Row with country code -->
						<div class="jerush-form-group">
							<label for="phoneNumber" class="jerush-form-label">Phone Number</label>
							<div class="jerush-phone-row">
								<select id="countryCode" name="countryCode" class="jerush-input jerush-country-select">
									<option value="+91" selected>🇮🇳 +91</option>
									<option value="+971">🇦🇪 +971</option>
									<option value="+1">🇺🇸 +1</option>
									<option value="+44">🇬🇧 +44</option>
								</select>
								<div class="jerush-input-wrapper">
									<input type="tel" id="phoneNumber" name="phoneNumber" class="jerush-input" placeholder="Phone number" required pattern="[0-9]{8,11}" title="Please enter a valid phone number (8-11 digits)" />
								</div>
							</div>
						</div>

						<!-- Email Address -->
						<div class="jerush-form-group">
							<label for="emailAddress" class="jerush-form-label">Email Address</label>
							<div class="jerush-input-wrapper">
								<input type="email" id="emailAddress" name="emailAddress" class="jerush-input" placeholder="yourname@example.com" required />
							</div>
						</div>

						<!-- Your Message -->
						<div class="jerush-form-group">
							<label for="yourMessage" class="jerush-form-label">Your Message</label>
							<div class="jerush-input-wrapper">
								<textarea id="yourMessage" name="yourMessage" class="jerush-input jerush-textarea" placeholder="How can our clinical specialists help you?" required></textarea>
							</div>
						</div>

						<!-- Submit Button -->
						<button type="submit" class="jerush-form-btn">
							Send Message
						</button>
					</form>
				<?php endif; ?>
			</div>

		</div>
	</div>
</section>

<?php
get_footer();
?>
