import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // useCdn sirve las respuestas desde el CDN de Sanity: más rápido y más barato.
  // El contenido nuevo llega igualmente porque las páginas revalidan (ver `revalidate`).
  useCdn: true,
  perspective: 'published',
})
