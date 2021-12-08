import client from '$lib/sanityClient'

import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async (req) => {
  // We have access to req.params.slug because the filename has [slug] in it.
  const { slug } = req.params
  const filter = `*[_type == "sampleProject" && slug.current == $slug][0]`
  const projection = `{
    title,
    publishedAt,
    mainImage,
    categories[]->{_id,title},
    body[]{
      ...,
      children[]{
        ...,
      }
    },
    members[]{
      roles,
      person->{name,image}
    },
    relatedProjects[]->{title,slug}
  }`;

  const query = filter + projection
  const project = await client.fetch(query, { slug })
  return {
    body: project
  }

};