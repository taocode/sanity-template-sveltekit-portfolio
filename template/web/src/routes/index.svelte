
<script context="module" lang="ts">
	export const prerender = true;
	import type { Load } from '@sveltejs/kit';

	// see https://kit.svelte.dev/docs#loading
	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/project.json');

		if (res.ok) {
			const projects = await res.json();

			return {
				props: { projects }
			};
		}

		const { message } = await res.json();

		return {
			error: new Error(message)
		};
	};
</script>

<script lang="ts">
	import ProjectPreviewGrid from '$lib/ProjectPreviewGrid.svelte'
	import type { Project } from '$lib/project'
	export let projects: Project[]
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
<div class="container">
	<h2>Latest Projects</h2>
</div>
<ProjectPreviewGrid {projects} />
</section>

<style>

	h2 {
		text-transform: uppercase;;
	}
	.welcome {
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
