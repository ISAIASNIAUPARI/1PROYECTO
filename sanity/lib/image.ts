import { createImageUrlBuilder } from '@sanity/image-url'
import type { Image } from 'sanity'

import { dataset, projectId } from '../env'

const builder = createImageUrlBuilder({ projectId, dataset })

/**
 * Construye la URL de una imagen de Sanity.
 * Devuelve null si el campo está vacío, para que el componente
 * pueda decidir qué hacer en vez de pintar un <img src="">.
 */
export function urlFor(source: Image | null | undefined) {
  if (!source || !(source as { asset?: unknown }).asset) return null
  return builder.image(source).auto('format').fit('max')
}

/** URL directa con ancho fijo. `null` si no hay imagen. */
export function imageUrl(
  source: Image | null | undefined,
  width = 1600
): string | null {
  const b = urlFor(source)
  return b ? b.width(width).url() : null
}
