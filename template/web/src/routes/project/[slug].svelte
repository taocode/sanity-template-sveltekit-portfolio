<script context="module" lang="ts">
import type { Load } from '@sveltejs/kit';

// see https://kit.svelte.dev/docs#loading
export const load: Load = async ({fetch, page}) => {
    try {
      // console.log(page.params.slug,{page})
      const res = await fetch(`/project/${page.params.slug}.json`)
      // console.log({res})
      const project = await res.json()
      // console.log({project})
      return {
				props: { project }
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
  import urlBuilder from '@sanity/image-url';
  import client from '$lib/sanityClient';
  import Image from "$lib/Image.svelte";
  import { format, parseISO, differenceInDays, formatDistance } from 'date-fns'

  export let project;
  const urlFor = source => urlBuilder(client).image(source);

  const heroImgURL = urlFor(project.mainImage).width(1200).height(675).fit('crop')
  const publishedAt = project.publishedAt
  const publishDate = differenceInDays(parseISO(publishedAt), new Date()) > 3
                  ? formatDistance(parseISO(publishedAt), new Date())
                  : format(parseISO(publishedAt), "MMMM do yyyy")
  console.log(project.categories)
  const categories = project.categories.map(category => 
            `<li key=${category._id}>${category.title}</li>`
          )
</script>

<svelte:head>
  <title>{project.title}</title>
</svelte:head>
<Image url={heroImgURL} alt={project.mainImage.alt} />

<div class="container">
  <div class="grid">
    <div class="content-main">
      <h1>{project.title}</h1>
      <div class="content">
        <BlockContent blocks={project.body} {serializers} />
      </div>
    </div>
    <div class="content-meta">
      <div class="meta-date">{publishDate}</div>
      <div class="meta-item">
        <h2>Project members</h2>
        {#each project.members as m}
        <BlockContent blocks={m} {serializers} />
        {/each}
        
      </div>
      <div class="meta-item">
        <h3>Categories</h3>
        {#each project.members as m}
        <BlockContent blocks={m} {serializers} />
        {/each}
        <ul>
          {#each categories as c}
          <div class="">{@html c}</div>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</div>
  
<style>
  .meta-date {
    color: var(--color-gray);
    margin: 1.5em 0 3em;
  }
  .meta-item {
    border-top: 2px solid var(--color-gray-very-light);
    margin: 2em 0 3em;
  }
  .container {
    max-width: 960px;
    margin: 0 auto;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 2em;
  }
  @media (min-width: 675px) {
    .grid {
      grid-template-columns: 3fr 1fr;
    }
  }
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