import sanityClient from '@sanity/client'
import { api } from '../../../studio/sanity.json'
const { projectId, dataset } = api

const client = sanityClient({
  projectId,
  dataset,
  apiVersion: '2021-12-05',
  useCdn: true
})

export default client
