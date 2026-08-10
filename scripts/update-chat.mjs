/**
 * Actualiza sólo los campos del asistente de chat en "Ajustes generales".
 *
 * A diferencia de seed.mjs, esto NO pisa el resto del contenido: hace un
 * patch de los campos nuevos y borra los del botón antiguo, que ya no existen
 * en el schema. Pensado para ejecutarse una sola vez tras añadir el chat.
 */

import { createClient } from '@sanity/client'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

const envFile = join(ROOT, '.env.local')
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (!m) continue
    const v = m[2].trim().replace(/^["']|["']$/g, '')
    if (v && !process.env[m[1]]) process.env[m[1]] = v
  }
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-10-01',
  useCdn: false,
})

const result = await client
  .patch('siteSettings')
  .set({
    chatButtonEnabled: true,
    chatWebhookUrl: 'https://n8n-n8n.kwtwgj.easypanel.host/webhook/chat-soporte',
    chatTitle: 'Atención al Cliente',
    chatSubtitle: 'Normalmente respondemos al instante',
    chatWelcome:
      '¡Hola! Soy el asistente de La Gloria. ¿En qué puedo ayudarte? Puedo informarte sobre la carta, los horarios o tu reserva.',
    chatPlaceholder: 'Escribe tu mensaje…',
    chatNotifications: ['¿Deseas reservar? 🍽️', 'Contáctanos 💬'],
  })
  // Campos del botón antiguo, ya fuera del schema.
  .unset(['chatButtonLabel', 'chatButtonTooltip', 'chatButtonUrl'])
  .commit()

console.log('\n✓ Ajustes del chat actualizados')
console.log(`  endpoint: ${result.chatWebhookUrl}`)
console.log(`  avisos:   ${(result.chatNotifications || []).join('  ·  ')}\n`)
