import type { Metadata } from 'next'
import Link from 'next/link'

import { client } from '@/sanity/lib/client'
import { imageUrl } from '@/sanity/lib/image'
import { drinksPageQuery, siteSettingsQuery } from '@/sanity/lib/queries'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch(drinksPageQuery)
  return {
    title: `${page?.title || 'Bebidas'} – La Gloria Restaurante`,
    description: page?.intro,
  }
}

type Drink = {
  name?: string
  image?: unknown
  tag?: string
  description?: string
  price?: string
  sizes?: string[]
}

export default async function BebidasPage() {
  const [page, settings] = await Promise.all([
    client.fetch(drinksPageQuery),
    client.fetch(siteSettingsQuery),
  ])

  const drinks: Drink[] = page?.drinks ?? []

  return (
    <div className="bebidas-page">
      <nav>
        <Link href="/" className="logo">
          {settings?.brandName || 'la Gloria'}
          <span>RESTAURANTE</span>
        </Link>
        <Link href="/" className="back">
          {page?.backLabel || '← Inicio'}
        </Link>
      </nav>

      <section className="hero">
        {page?.heroLabel && <p className="hero-label">{page.heroLabel}</p>}
        <h1>{page?.title}</h1>
        <div className="divider" />
        {page?.intro && <p>{page.intro}</p>}
      </section>

      <main className="menu-section">
        {page?.sectionTitle && (
          <p className="section-title">{page.sectionTitle}</p>
        )}
        <div className="drinks-grid">
          {drinks.map((d, i) => {
            const url = imageUrl(d.image as never, 800)
            return (
              <div className="card" key={i}>
                <div className="card-visual">
                  {url && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={url} alt={d.name || ''} loading="lazy" decoding="async" />
                  )}
                  {d.tag && (
                    <div className="overlay">
                      <span className="flavor-tag">{d.tag}</span>
                    </div>
                  )}
                </div>
                <div className="card-body">
                  <div className="card-name">{d.name}</div>
                  <div className="card-desc">{d.description}</div>
                  <div className="card-footer">
                    <span className="price">{d.price}</span>
                    <div className="size-tags">
                      {(d.sizes ?? []).map((s) => (
                        <span className="size-tag" key={s}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      <footer>{page?.footerText}</footer>
    </div>
  )
}
