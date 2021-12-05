import { writable } from 'svelte/store'

import client from '$lib/sanityClient'

export const sampleProjects = writable([])

let loaded = false
export const fetchSampleProjects = async () => {
  if (! loaded) {
    const posts = await client.fetch('*[_type == "sampleProject" && defined(slug.current) && publishedAt < now()]|order(publishedAt desc)')
    // console.log('api fetchSampleProjects()', posts)
    sampleProjects.set(posts)
    loaded = true
  }
}
