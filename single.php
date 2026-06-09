<?php
/**
 * Single post detail view template
 */
get_header();
?>
<div class="max-w-4xl mx-auto px-6 py-20 font-body text-left">
	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
		<article class="mx-auto">
			<span class="text-xs font-bold uppercase tracking-wider text-brandSky"><?php echo get_the_date(); ?></span>
			<h1 class="font-headline font-extrabold text-3xl sm:text-4xl text-primary mt-2 mb-6"><?php the_title(); ?></h1>
			
			<?php if ( has_post_thumbnail() ) : ?>
				<div class="rounded-2xl overflow-hidden mb-8 shadow-md aspect-[21/9] bg-neutralCool">
					<?php the_post_thumbnail('large', array('class' => 'w-full h-full object-cover')); ?>
				</div>
			<?php endif; ?>

			<div class="text-secondary text-sm sm:text-base leading-relaxed space-y-6">
				<?php the_content(); ?>
			</div>
		</article>
	<?php endwhile; endif; ?>
</div>
<?php
get_footer();
?>
