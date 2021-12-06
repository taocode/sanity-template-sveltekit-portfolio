<script context="module" lang="ts">
import type { Load } from '@sveltejs/kit';

// see https://kit.svelte.dev/docs#loading
export const load: Load = async ({fetch, page}) => {
    try {
      // console.log(page.params.slug,{page})
      const res = await fetch(`/api/blog/${page.params.slug}.json`)
      // console.log({res})
      const post = await res.json()
      // console.log({post})
      return {
				props: { post }
			}
    } catch (err) {
      console.log('blog load error',err)
      return {
        status: 500,
        error: err
      };
    }
  };
</script>

<script>
  import BlockContent from "@arzidava/svelte-portable-text";
  import serializers from "$lib/serializers";

  export let post;
</script>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>

<h1>{post.title}</h1>

<div class="content">
  <BlockContent blocks={post.body} {serializers} />
</div>
  
<style>
  .content :global(h2) {
    font-size: 1.4em;
    font-weight: 500;
  }

  .content :global(img) {
    display: block;
    max-width: 100%;
  }

  .content :global(figure) {
    margin: 0;
  }

  .content :global(ul) {
    line-height: 1.5;
  }

  .content :global(li) {
    margin: 0 0 0.5em 0;
  }
</style>