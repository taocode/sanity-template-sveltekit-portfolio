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
      console.log('project load error',err)
      return {
        status: 500,
        error: err
      };
    }
  };
</script>

<script>
  import BlockContent from "@arzidava/svelte-portable-text"
  import serializers from "$lib/serializers"
  import urlBuilder from '@sanity/image-url'
  import client from '$lib/sanityClient'
  import Image from "$lib/Image.svelte"
  import ProjectMembers from '$lib/ProjectMembers.svelte'
  import Categories from '$lib/Categories.svelte'
  import { format, parseISO, differenceInDays, formatDistance } from 'date-fns'
  import RelatedProjects from "$lib/RelatedProjects.svelte"

  const urlFor = source => urlBuilder(client).image(source)
  
  export let project

  $: heroImage = {
      alt: project.mainImage.alt,
      url: urlFor(project.mainImage).width(1200).height(675).fit('crop')
    }
  $: publishedAt = parseISO(project.publishedAt)
  $: publishDate = differenceInDays(publishedAt, new Date()) > 3
                  ? formatDistance(publishedAt, new Date())
                  : format(publishedAt, "MMMM do yyyy")
</script>

<svelte:head>
  <title>{project.title}</title>
</svelte:head>
<Image url={heroImage.url} alt={heroImage.alt} />

<div class="container">
  <div class="grid">
    <div class="content-main">
      <h1>{project.title}</h1>
      {#if project.body}
      <div class="content">
        <BlockContent blocks={project.body} {serializers} />
      </div>
      {/if}
    </div>
    <div class="content-meta">
      <div class="meta-date">{publishDate}</div>
      {#if project.members}
      <div class="meta-item">
        <ProjectMembers members={project.members} />
      </div>
      {/if}
      {#if project.categories}
      <div class="meta-item">
        <Categories categories={project.categories} />
      </div>
      {/if}
      {#if project.relatedProjects}
      <div class="meta-item">
        <RelatedProjects projects={project.relatedProjects} />
      </div>
      {/if}
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