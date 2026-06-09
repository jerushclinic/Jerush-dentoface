<?php
/**
 * Main fallback template file
 */
get_header();
?>
<div class="max-w-7xl mx-auto px-6 py-20 font-body text-left">
	<h1 class="font-headline font-bold text-3xl text-primary mb-8">Latest Updates & Blogs</h1>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
		<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
			<article class="bg-neutralCool border border-slate-100 rounded-2xl overflow-hidden p-6 flex flex-col justify-between">
				<div>
					<h2 class="font-headline font-bold text-lg text-primary mb-2">
						<a href="<?php the_permalink(); ?>" class="hover:text-brandSky transition-colors"><?php the_title(); ?></a>
					</h2>
					<p class="text-secondary text-sm leading-relaxed mb-4">
						<?php echo wp_trim_words( get_the_excerpt(), 20 ); ?>
					</p>
				</div>
				<a href="<?php the_permalink(); ?>" class="text-xs font-bold text-brandBlue inline-flex items-center gap-1 hover:text-brandSky font-headline">
					Read Article
					<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
				</a>
			</article>
		<?php endwhile; else : ?>
			<p class="text-secondary text-sm">No posts found.</p>
		<?php endif; ?>
	</div>
</div>
<?php
get_footer();
?>
