<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	// see https://kit.svelte.dev/docs#loading
	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/project.json');

		if (res.ok) {
			const posts = await res.json();

			return {
				props: { posts }
			};
		}

		const { message } = await res.json();

		return {
			error: new Error(message)
		};
	};
</script>

<script lang="ts">
import Image from '$lib/Image.svelte'
  import urlBuilder from '@sanity/image-url'
  import client from '$lib/sanityClient'
  import BlockContent from "@arzidava/svelte-portable-text";
  import serializers from "$lib/serializers";

import { post } from '../todos/index.json';
	
	type Post = {
		slug: {
			current: string;
		};
		publishedAt: Date;
		createdAt: Date;
		title: string;
	};

	function formatDate(date: Date) {
    return new Date(date).toLocaleDateString()
  }

  const urlFor = source => urlBuilder(client).image(source);

export let posts: Post[];
</script>

<svelte:head>
	<title>Projects</title>
</svelte:head>

<h1>Projects</h1>

<div class="container">
	{#each posts as post}
		<!-- we're using the non-standard `sveltekit:prefetch` attribute to
				tell SvelteKit to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<a sveltekit:prefetch href='project/{post.slug.current}'>
		<div class="project-preview">
			<Image url={urlFor(post.mainImage).width(600).height(337)} alt={post.mainImage.alt} />
				{post.title}
				<div><BlockContent blocks={post.excerpt}
					{serializers}/></div>

		</div>
		</a> 
	{/each}
</div>

<style>
	.container {
		margin: 0 0 1em 0;
		line-height: 1.5;
		display: flex;
		flex-wrap: wrap;
	}
	.container > a {
		width: 33%;
	}
</style>