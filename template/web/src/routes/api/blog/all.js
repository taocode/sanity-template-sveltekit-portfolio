import client from '$lib/sanityClient'

/**
 * This route is called 'all' instead of index to prevent route conflicts.
 * @see {https} ://sapper.svelte.dev/docs#Route_conflicts
 * @param {any} req
 * @param {{ "": any; writeHead: (arg0: number, arg1: { 'Content-Type': string; }) => void; end: (arg0: string) => void; }} res
 */
export async function get (req, res) {
  console.log('api get()',{req, res})
  try {
    const posts = await client.fetch('*[_type == "sampleProject" && defined(slug.current) && publishedAt < now()]|order(publishedAt desc)')
    console.log({posts})
    return res
  } catch (err) {
    console.log('woops!',err)
    res.writeHead(500, {
      'Content-Type': 'application/json'
    });

    res.end(JSON.stringify({
      message: err.message
    }));  
  }
};