<?php
/**
 * Jerush Dentoface Tailwind Theme functions and definitions
 */

if ( ! function_exists( 'jerush_tailwind_setup' ) ) :
	function jerush_tailwind_setup() {
		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		// Let WordPress manage the document title.
		add_theme_support( 'title-tag' );

		// Enable support for Post Thumbnails on posts and pages.
		add_theme_support( 'post-thumbnails' );

		// Register Navigation Menus.
		register_nav_menus(
			array(
				'menu-1' => esc_html__( 'Primary Menu', 'jerush-tailwind-theme' ),
				'footer-menu' => esc_html__( 'Footer Menu', 'jerush-tailwind-theme' ),
			)
		);

		// Switch default core markup to output valid HTML5.
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
			)
		);

		// Add support for core custom logo.
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 250,
				'width'       => 250,
				'flex-width'  => true,
				'flex-height' => true,
			)
		);
	}
endif;
add_action( 'after_setup_theme', 'jerush_tailwind_setup' );

/**
 * Enqueue scripts and styles.
 */
function jerush_tailwind_scripts() {
	// Enqueue the compiled Tailwind CSS file
	wp_enqueue_style( 
		'jerush-tailwind-compiled', 
		get_template_directory_uri() . '/assets/css/tailwind-compiled.css', 
		array(), 
		'1.0.0' 
	);

	// Enqueue Google Fonts (Inter & Manrope)
	wp_enqueue_style(
		'google-fonts',
		'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap',
		array(),
		null
	);

	// Enqueue navigation Javascript logic
	wp_enqueue_script( 
		'jerush-navigation-js', 
		get_template_directory_uri() . '/assets/js/header-new-design.js', 
		array(), 
		'1.0.0', 
		true 
	);

	// Enqueue banner slider Javascript logic
	wp_enqueue_script( 
		'jerush-banner-slider-js', 
		get_template_directory_uri() . '/assets/js/banner-slider.js', 
		array(), 
		'1.0.0', 
		true 
	);
}
add_action( 'wp_enqueue_scripts', 'jerush_tailwind_scripts' );
