<script>
  import Image from './Image.svelte'

  import urlBuilder from '@sanity/image-url';
  import client from '$lib/sanityClient';
  const urlFor = source => urlBuilder(client).image(source);

  export let projects
</script>

<h3>Related Projects</h3>
<ul class="meta-related">
  {#each projects as rp}
  <li>
    <a sveltekit:prefetch href={rp.slug.current}>
      {rp.title}
    </a>
  </li>
  {/each}
</ul>

<style>
  .meta-related {
    list-style-type: none;
    padding: 0.25em 0;
  }
</style>
