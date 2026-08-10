import type { Metadata } from 'next'

import '../globals.css'

import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'

/** El título y la descripción para buscadores se editan desde Sanity. */
export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch(siteSettingsQuery)
  return {
    title: settings?.siteTitle || 'La Gloria Restaurante',
    description:
      settings?.siteDescription ||
      'Comida peruana y mediterránea con tintes ecuatorianos.',
  }
}

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
