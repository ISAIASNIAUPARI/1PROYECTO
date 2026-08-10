import { defineArrayMember, defineField, defineType } from 'sanity'

export const specialsSection = defineType({
  name: 'specialsSection',
  title: 'Especiales de la carta',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Titular',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subtítulo',
      type: 'string',
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'Vídeo de fondo de la cabecera',
      description:
        'Opcional. Si lo dejas vacío se usa el vídeo que ya viene con la web. Sube un MP4 de menos de 10 MB para que cargue rápido.',
      type: 'file',
      options: { accept: 'video/mp4' },
    }),
    defineField({
      name: 'dishes',
      title: 'Platos destacados',
      description:
        'Se muestran en una cuadrícula de 3 columnas. Arrastra para reordenar.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Nombre del plato',
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
          ],
          preview: {
            select: { title: 'name', media: 'image' },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Especiales de la carta' }),
  },
})
