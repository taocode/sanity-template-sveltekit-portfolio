
import client from './sanityClient'
import imageUrlBuilder from '@sanity/image-url'

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client)

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
function urlFor(source) {
  return builder.image(source)
}

export function Figure({ node }) {
  console.log('Figure({ node })',{node})
  if (!node.asset) {
    return null;
  }

  return urlFor(node)
}