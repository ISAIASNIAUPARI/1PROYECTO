import { defineArrayMember, defineField, defineType } from 'sanity'

export const menuSection = defineType({
  name: 'menuSection',
  title: 'Nuestro Menú',
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
      name: 'watermark',
      title: 'Palabra de fondo',
      description:
        'La palabra gigante y semitransparente que se ve detrás del menú.',
      type: 'string',
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'Vídeo de fondo',
      description:
        'Opcional. Si lo dejas vacío se usa el vídeo que ya viene con la web.',
      type: 'file',
      options: { accept: 'video/mp4' },
    }),
    defineField({
      name: 'categories',
      title: 'Categorías del menú',
      description:
        'Cada categoría es una columna. Arrastra para reordenar categorías y platos.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'category',
          fields: [
            defineField({
              name: 'title',
              title: 'Nombre de la categoría',
              description: 'Por ejemplo: Entradas Frías, Pescados…',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'items',
              title: 'Platos',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'dish',
                  fields: [
                    defineField({
                      name: 'name',
                      title: 'Nombre',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'description',
                      title: 'Ingredientes',
                      description:
                        'La línea pequeña bajo el nombre. Separa los ingredientes con /',
                      type: 'string',
                    }),
                    defineField({
                      name: 'price',
                      title: 'Precio',
                      description: 'Escríbelo tal cual quieres verlo: $12',
                      type: 'string',
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'name',
                      subtitle: 'price',
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: { title: 'title', items: 'items' },
            prepare: ({ title, items }) => ({
              title,
              subtitle: `${items?.length ?? 0} platos`,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Texto del botón inferior',
      type: 'string',
    }),
    defineField({
      name: 'buttonHref',
      title: 'Destino del botón inferior',
      description: 'Por ejemplo /bebidas o #reservas',
      type: 'string',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Nuestro Menú' }),
  },
})
