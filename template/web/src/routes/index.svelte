
<script context="module" lang="ts">
	export const prerender = true;
	import type { Load } from '@sveltejs/kit';

	// see https://kit.svelte.dev/docs#loading
	export const load: Load = async ({ fetch }) => {
		try {
			const res = await fetch('/project.json');

			if (res.ok) {
				const projects = await res.json();

				return {
					props: { projects }
				}
			}
		} catch (err) {
			return {
				status: 500,
				error: new Error("Error loading projects")
			}
		}
	}
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
		text-transform: uppercase;
	}
</style>
