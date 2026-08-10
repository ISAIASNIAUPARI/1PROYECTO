import { defineField, defineType } from 'sanity'

export const experienceSection = defineType({
  name: 'experienceSection',
  title: 'Un instante de La Gloria',
  description:
    'La animación que avanza según haces scroll. Los fotogramas son archivos del proyecto, no se editan desde aquí.',
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
      description: 'Se muestra en mayúsculas y con letra espaciada.',
      type: 'string',
    }),
    defineField({
      name: 'enabled',
      title: 'Mostrar esta sección',
      description:
        'Si la desactivas, la animación desaparece de la página. Útil si quieres aligerar la web en móvil.',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { subtitle: 'heading' },
    prepare: ({ subtitle }) => ({
      title: 'Un instante de La Gloria',
      subtitle,
    }),
  },
})
