import { defineArrayMember, defineField, defineType } from 'sanity'

export const drinksPage = defineType({
  name: 'drinksPage',
  title: 'Página de Bebidas',
  type: 'document',
  fields: [
    defineField({
      name: 'heroLabel',
      title: 'Antetítulo',
      description: 'La línea pequeña sobre el título. Por ejemplo: Carta de',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Frase de entrada',
      type: 'string',
    }),
    defineField({
      name: 'backLabel',
      title: 'Texto del botón de volver',
      type: 'string',
    }),
    defineField({
      name: 'sectionTitle',
      title: 'Título de la sección de bebidas',
      type: 'string',
    }),
    defineField({
      name: 'drinks',
      title: 'Bebidas',
      description: 'Arrastra para reordenar las tarjetas.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Nombre',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Foto',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'tag',
              title: 'Etiqueta sobre la foto',
              description: 'Por ejemplo: Blueberry, Tropical, Signature…',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Descripción',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'price',
              title: 'Precio',
              description: 'Escríbelo tal cual: desde $8',
              type: 'string',
            }),
            defineField({
              name: 'sizes',
              title: 'Tamaños',
              description: 'Las etiquetas redondeadas: Small, Large…',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'price', media: 'image' },
          },
        }),
      ],
    }),
    defineField({
      name: 'footerText',
      title: 'Texto del pie',
      type: 'string',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Página de Bebidas' }),
  },
})
