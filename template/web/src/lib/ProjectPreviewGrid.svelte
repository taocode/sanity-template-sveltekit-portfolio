<script lang="ts">
	import Image from '$lib/Image.svelte'
  import urlBuilder from '@sanity/image-url'
  import client from '$lib/sanityClient'
  import BlockContent from "@arzidava/svelte-portable-text";
  import serializers from "$lib/serializers";
	
  import type { Project } from './project';

  const urlFor = source => urlBuilder(client).image(source);

  export let projects: Project[];
</script>

<ul class="project-preview-grid">
	{#each projects as p}
		<!-- we're using the non-standard `sveltekit:prefetch` attribute to
				tell SvelteKit to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li>
			<a class="project-preview-link" sveltekit:prefetch href='project/{p.slug.current}'>
			<div class="project-preview">
				<Image url={urlFor(p.mainImage).width(600).height(337)} alt={p.mainImage.alt} />
					<h3>{p.title}</h3>
					<BlockContent blocks={p.excerpt}
						{serializers}/>
			</div>
			</a>
		</li>
	{/each}
</ul>

<style>
	.project-preview-grid {
		margin: 0 auto 1em;
		padding: 0;
		line-height: 1.25;
		width: min(90%, 60rem);
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 2em;
		list-style: none;
	}
	.project-preview-link {
		color: inherit;
		display: block;
		text-decoration: none;
	}
	.project-preview-link:hover h3 {
		text-decoration: underline;
	}
	@media (min-width: 450px) {
		.project-preview-grid {
	    grid-template-columns: 1fr 1fr;
		}
	}
	@media (min-width: 675px) {
		.project-preview-grid {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
</style>