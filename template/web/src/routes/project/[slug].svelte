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
  import BlockContent from "@arzidava/svelte-portable-text";
  import serializers from "$lib/serializers";
  import urlBuilder from '@sanity/image-url';
  import client from '$lib/sanityClient';
  import Image from "$lib/Image.svelte";
  import { format, parseISO, differenceInDays, formatDistance } from 'date-fns'

  export let project;
  const urlFor = source => urlBuilder(client).image(source);

  $: heroImage = {
    alt: project.mainImage.alt,
    url: urlFor(project.mainImage).width(1200).height(675).fit('crop')
    }
  $: publishedAt = project.publishedAt
  $: publishDate = differenceInDays(parseISO(publishedAt), new Date()) > 3
                  ? formatDistance(parseISO(publishedAt), new Date())
                  : format(parseISO(publishedAt), "MMMM do yyyy")
  $: categories = project.categories
  $: members = project.members
  $: relatedProjects = project.relatedProjects
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
      {#if members}
      <div class="meta-item">
        <h2>Project members</h2>
        {#each members as m}
        <div class="meta-member">
          <div class="meta-member-image">
            <Image alt={m.person.image.alt} url={urlFor(m.person.image).width(100).height(100).fit('crop')}/>
          </div>
          <div class="meta-member-data">
            <div class=""><strong>{m.person.name}</strong></div>
            <div class="">{m.roles.join(', ')}</div>
          </div>
        </div>
        {/each}
      </div>
      {/if}
      {#if categories}
      <div class="meta-item">
        <h3>Categories</h3>
        <ul class="meta-categories">
          {#each categories as c}
            <li key={c._id}>{c.title}</li>
          {/each}
        </ul>
      </div>
      {/if}
      {#if relatedProjects}
      <div class="meta-item">
        <h3>Related Projects</h3>
        <ul class="meta-related">
          {#each relatedProjects as rp}
          <li>
            <a sveltekit:prefetch href={rp.slug.current}>
              {rp.title}
            </a>
          </li>
          {/each}
        </ul>
      </div>
      {/if}
    </div>
  </div>
</div>
  
<style>
  .meta-categories,
  .meta-related {
    list-style-type: none;
    padding: 0.25em 0;
  }
  .meta-categories li {
    margin: 0.75em 0;
  }
  .meta-date {
    color: var(--color-gray);
    margin: 1.5em 0 3em;
  }
  .meta-item {
    border-top: 2px solid var(--color-gray-very-light);
    margin: 2em 0 3em;
  }
  .meta-member {
    display: flex;
    margin: 1.5em 0;
    line-height: 1.33;
  }
  .meta-member-image {
    width: 3em;
    height: 3em;
    border-radius: 50%;
    overflow: hidden;
  }
  .meta-member-data {
    margin-left: 0.5em;
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