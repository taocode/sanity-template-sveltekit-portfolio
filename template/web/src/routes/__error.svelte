<script context="module">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	export function load({ error, status }) {
		return {
			props: {
				status,
				error
			}
		};
	}
</script>

<script>
	export let status;
	export let error;

	import { dev } from '$app/env';
</script>

<svelte:head>
	<title>Error {status}: {error.message}</title>
</svelte:head>

<h1>Error {status}</h1>

<p>{error.message}</p>

{#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if}

<style>
	h1, p {
		margin: 0 auto;
		text-align: center;
	}

	h1 {
		font-size: 2.8rem;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		font-size: 1.5rem;
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4rem;
		}
	}
</style>