import client from '$lib/sanityClient'

import type { RequestHandler } from '@sveltejs/kit'

// GET /api/blog.json
export const get: RequestHandler = async (request) => {
	// request.locals.userid comes from src/hooks.js
	const response = await client.fetch('*[_type == "sampleProject" && defined(slug.current) && publishedAt < now()]|order(publishedAt desc)')

	if (response.status === 404) {
		// user hasn't created a todo list.
		// start with an empty array
		return { body: [] };
	}

	return { body: response };
};

