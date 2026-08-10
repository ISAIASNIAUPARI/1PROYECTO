import { defineArrayMember, defineField, defineType } from 'sanity'

export const footerSection = defineType({
  name: 'footerSection',
  title: 'Pie de página',
  type: 'document',
  fields: [
    defineField({
      name: 'scheduleTitle',
      title: 'Título de la columna de horario',
      type: 'string',
    }),
    defineField({
      name: 'schedule',
      title: 'Horario',
      description: 'Una línea por franja. El día se muestra en negrita.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'days',
              title: 'Días',
              description: 'Por ejemplo: Lunes a viernes',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'hours',
              title: 'Horas',
              description: 'Por ejemplo: 12h30 a 23h00',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'days', subtitle: 'hours' },
          },
        }),
      ],
    }),
    defineField({
      name: 'reserveTitle',
      title: 'Título de la columna de reservas',
      type: 'string',
    }),
    defineField({
      name: 'reserveLinkLabel',
      title: 'Texto del enlace de reservas',
      type: 'string',
    }),
    defineField({
      name: 'reserveLinkHref',
      title: 'Destino del enlace de reservas',
      type: 'string',
    }),
    defineField({
      name: 'socialTitle',
      title: 'Título de la columna de redes',
      type: 'string',
    }),
    defineField({
      name: 'socials',
      title: 'Redes sociales',
      description:
        'Sólo se muestran las redes que tengan enlace. Si dejas una vacía, su icono desaparece.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'network',
              title: 'Red',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Google', value: 'google' },
                  { title: 'Tripadvisor', value: 'tripadvisor' },
                  { title: 'TikTok', value: 'tiktok' },
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Enlace',
              type: 'url',
              validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
            }),
          ],
          preview: {
            select: { title: 'network', subtitle: 'url' },
          },
        }),
      ],
    }),
    defineField({
      name: 'copyright',
      title: 'Línea de copyright',
      type: 'string',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Pie de página' }),
  },
})
