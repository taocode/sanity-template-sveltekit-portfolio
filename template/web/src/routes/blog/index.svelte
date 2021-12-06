<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	// see https://kit.svelte.dev/docs#loading
	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/api/blog.json');

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

	export let posts: Post[];
</script>

<svelte:head>
	<title>Blog </title>
</svelte:head>

<h1>Recent posts</h1>

<ul>
	{#each posts as post}
		<!-- we're using the non-standard `sveltekit:prefetch` attribute to
				tell SvelteKit to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li><a sveltekit:prefetch href='blog/{post.slug.current}'>{post.title}</a> ({formatDate(post.publishedAt)})</li>
	{/each}
</ul>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
</style>