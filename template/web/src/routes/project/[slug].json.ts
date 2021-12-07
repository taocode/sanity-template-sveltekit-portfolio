import client from '$lib/sanityClient'

import type { RequestHandler } from '@sveltejs/kit'

// GET /api/blog.json
export const newget: RequestHandler = async (request) => {

	const response = await client.fetch('*[_type == "sampleProject" && defined(slug.current) && publishedAt < now()]|order(publishedAt desc)')

	if (response.status === 404) {
		// user hasn't created a todo list.
		// start with an empty array
		return { body: [] };
	}

	return { body: response };
};



export const get: RequestHandler = async (req) => {
  // We have access to req.params.slug because the filename has [slug] in it.
  const { slug } = req.params
  const filter = `*[_type == "sampleProject" && slug.current == "${slug}"][0]`
  // console.log({filter})

  const query = filter
  // console.log({filter, projection, query})
  const post = await client.fetch(query, { slug })
  return {
    body: post
  }

};