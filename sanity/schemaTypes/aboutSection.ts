import { defineField, defineType } from 'sanity'

export const aboutSection = defineType({
  name: 'aboutSection',
  title: 'Sobre La Gloria',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Titular',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Párrafo',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'imageLeft',
      title: 'Foto de la izquierda',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Texto alternativo', type: 'string' }),
      ],
    }),
    defineField({
      name: 'imageRight',
      title: 'Foto de la derecha',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Texto alternativo', type: 'string' }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Sobre La Gloria' }),
  },
})
