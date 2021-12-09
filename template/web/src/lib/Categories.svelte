<script>
  import Image from './Image.svelte'

  import urlBuilder from '@sanity/image-url';
  import client from '$lib/sanityClient';
  const urlFor = source => urlBuilder(client).image(source);

  export let project
  $: categories = project.categories
</script>

<h3>Categories</h3>
<ul class="meta-categories">
  {#each categories as c}
    <li key={c._id}>{c.title}</li>
  {/each}
</ul>

<style>
  .meta-categories {
    list-style-type: none;
    padding: 0.25em 0;
  }
  .meta-categories li {
    margin: 0.75em 0;
  }
</style>
