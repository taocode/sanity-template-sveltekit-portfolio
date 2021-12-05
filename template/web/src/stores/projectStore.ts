import { writable } from 'svelte/store'

import client from '$lib/sanityClient'

export const sampleProjects = writable([])

let runOnce = false
export const fetchSampleProjects = async () => {
  console.log('api fetchSampleProjects()')
  const posts = await client.fetch('*[_type == "sampleProject" && defined(slug.current) && publishedAt < now()]|order(publishedAt desc)')
  sampleProjects.set(posts)
  runOnce = true
}
console.log({runOnce, sampleProjects})
if (!runOnce) fetchSampleProjects()