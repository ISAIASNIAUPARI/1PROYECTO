import type { StructureResolver } from 'sanity/structure'

/**
 * Todo el contenido de esta web son documentos únicos (singletons):
 * hay una sola portada, un solo menú, un solo pie de página.
 *
 * Esta estructura los presenta como una lista fija de secciones, en el
 * mismo orden en que aparecen en la web, y oculta el botón de "crear
 * nuevo" para que el cliente no pueda duplicar secciones sin querer.
 */

type Singleton = {
  id: string
  type: string
  title: string
  icon: string
}

export const singletons: Singleton[] = [
  { id: 'siteSettings', type: 'siteSettings', title: 'Ajustes generales', icon: '⚙️' },
  { id: 'heroSection', type: 'heroSection', title: '1 · Portada', icon: '🖼️' },
  { id: 'aboutSection', type: 'aboutSection', title: '2 · Sobre La Gloria', icon: '📖' },
  { id: 'experienceSection', type: 'experienceSection', title: '3 · Un instante', icon: '🎞️' },
  { id: 'specialsSection', type: 'specialsSection', title: '4 · Especiales', icon: '⭐' },
  { id: 'menuSection', type: 'menuSection', title: '5 · Nuestro Menú', icon: '🍽️' },
  { id: 'reservationsSection', type: 'reservationsSection', title: '6 · Reservas', icon: '📅' },
  { id: 'footerSection', type: 'footerSection', title: '7 · Pie de página', icon: '📍' },
  { id: 'drinksPage', type: 'drinksPage', title: 'Página de Bebidas', icon: '🥤' },
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('La Gloria Restaurante')
    .items(
      singletons.map((s) =>
        S.listItem()
          .title(`${s.icon}  ${s.title}`)
          .id(s.id)
          .child(
            S.document()
              .schemaType(s.type)
              .documentId(s.id)
              .title(s.title)
          )
      )
    )
