import { defineArrayMember, defineField, defineType } from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Portada (Hero)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titular',
      description:
        'Pulsa Enter para partir el titular en dos líneas, igual que en el diseño original.',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slides',
      title: 'Fotos de fondo',
      description:
        'Se muestran en bucle, cambiando cada 5 segundos con un fundido. Con una sola foto, la portada queda fija.',
      type: 'array',
      validation: (Rule) => Rule.min(1).error('Hace falta al menos una foto.'),
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Texto alternativo',
              description:
                'Describe la foto para lectores de pantalla y buscadores.',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'ctas',
      title: 'Botones',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Texto',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Destino',
              description: 'Por ejemplo #reservas o #menu',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => ({
      title: 'Portada (Hero)',
      subtitle: (title || '').replace(/\n/g, ' '),
    }),
  },
})
