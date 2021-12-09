<script lang="ts">
	import Header from '$lib/header/Header.svelte'
	import Footer from '$lib/Footer.svelte'
	import '../app.css'
</script>

<Header />

<main>
	<slot />
</main>

<Footer />

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
