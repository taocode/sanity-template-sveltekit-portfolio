<script>
  import Image from './Image.svelte'

  import urlBuilder from '@sanity/image-url';
  import client from '$lib/sanityClient';
  const urlFor = source => urlBuilder(client).image(source);

  export let project
  $: members = project.members
</script>

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


<style>
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
</style>
