import { defineCliConfig } from 'sanity/cli'

/**
 * Configuración para la CLI de Sanity (`npx sanity ...`).
 * La usamos sobre todo para `npm run schema:deploy`, que sube el schema
 * a Sanity para que las herramientas remotas conozcan la estructura.
 */
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
  studioHost: 'la-gloria-restaurante',
  autoUpdates: true,
})
