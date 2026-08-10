'use client'

/**
 * Configuración de Sanity Studio.
 * El Studio se sirve dentro de la propia web, en la ruta /studio
 * (ver app/studio/[[...tool]]/page.tsx).
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './sanity/env'
import { schemaTypes } from './sanity/schemaTypes'
import { singletons, structure } from './sanity/structure'

const singletonTypes = new Set(singletons.map((s) => s.type))

export default defineConfig({
  basePath: '/studio',
  title: 'La Gloria Restaurante',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({ structure }),
    // Vision permite probar consultas GROQ. Útil para depurar, no para el cliente.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    // Las secciones son únicas: se editan, no se crean ni se borran.
    actions: (prev, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? prev.filter(
            ({ action }) =>
              action &&
              ['publish', 'discardChanges', 'restore'].includes(action)
          )
        : prev,
  },
})
