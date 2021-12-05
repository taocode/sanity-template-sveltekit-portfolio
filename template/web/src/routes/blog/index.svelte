<script context="module">
  // import { fetchSampleProjects } from "../../stores/projectStore"
  // export async function load() {
  //   try {
  //     // fetchSampleProjects()
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
</script>

<script>
  import { sampleProjects } from "../../stores/projectStore";
  console.log($sampleProjects)
  export let posts = sampleProjects

  function formatDate(date) {
    return new Date(date).toLocaleDateString()
  }
</script>

<svelte:head>
	<title>Blog </title>
</svelte:head>

<h1>Recent posts</h1>

<ul>
	{#each $posts as post}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
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