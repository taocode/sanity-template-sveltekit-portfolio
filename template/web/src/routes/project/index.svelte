<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	// see https://kit.svelte.dev/docs#loading
	export const load: Load = async ({ fetch }) => {
		try {
			const res = await fetch('/project.json');

			if (res.ok) {
				const projects = await res.json();

				return {
					props: { projects }
				};
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
	
	import ProjectPreviewGrid from '$lib/ProjectPreviewGrid.svelte';
	import type { Project } from '$lib/project';

export let projects: Project[];
</script>

<svelte:head>
	<title>Projects</title>
</svelte:head>

<div class="container">
	<h1>Projects</h1>
</div>

<ProjectPreviewGrid {projects} />

