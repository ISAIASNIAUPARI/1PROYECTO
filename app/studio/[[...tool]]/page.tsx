/**
 * Sanity Studio embebido.
 *
 * Esta ruta sirve el panel de edición en /studio dentro de la propia web,
 * así el cliente entra a [dominio].vercel.app/studio y edita sin instalar nada.
 * El catch-all [[...tool]] recoge las sub-rutas internas del Studio.
 */

import { NextStudio } from 'next-sanity/studio'

import config from '../../../sanity.config'

export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}
