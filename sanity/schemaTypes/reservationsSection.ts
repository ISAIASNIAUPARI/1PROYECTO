import { defineArrayMember, defineField, defineType } from 'sanity'

export const reservationsSection = defineType({
  name: 'reservationsSection',
  title: 'Reservas',
  type: 'document',
  groups: [
    { name: 'textos', title: 'Textos' },
    { name: 'formulario', title: 'Formulario' },
    { name: 'contacto', title: 'Contacto' },
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Titular',
      type: 'string',
      group: 'textos',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lead',
      title: 'Frase de apoyo',
      type: 'string',
      group: 'textos',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Foto de fondo',
      description:
        'La foto que se ve detrás del formulario, oscurecida. Si la dejas vacía, el fondo queda en marrón oscuro.',
      type: 'image',
      options: { hotspot: true },
      group: 'textos',
      fields: [
        defineField({ name: 'alt', title: 'Texto alternativo', type: 'string' }),
      ],
    }),

    defineField({
      name: 'partySizeOptions',
      title: 'Opciones de número de personas',
      description:
        'La primera de la lista es la que aparece seleccionada por defecto.',
      type: 'array',
      group: 'formulario',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'submitLabel',
      title: 'Texto del botón',
      type: 'string',
      group: 'formulario',
    }),
    defineField({
      name: 'reservationEmail',
      title: 'Correo que recibe las reservas',
      description:
        'Al pulsar el botón se abre el gestor de correo del visitante con un mensaje ya redactado a esta dirección.',
      type: 'string',
      group: 'formulario',
      validation: (Rule) =>
        Rule.required().email().error('Escribe un correo válido.'),
    }),

    defineField({
      name: 'orText',
      title: 'Texto sobre el teléfono',
      description: 'Por ejemplo: o llámanos al',
      type: 'string',
      group: 'contacto',
    }),
    defineField({
      name: 'phoneDisplay',
      title: 'Teléfono (como se ve)',
      type: 'string',
      group: 'contacto',
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Teléfono (para marcar)',
      description: 'Sin espacios y con prefijo internacional: +593999169570',
      type: 'string',
      group: 'contacto',
    }),
    defineField({
      name: 'contactName',
      title: 'Nombre del local',
      type: 'string',
      group: 'contacto',
    }),
    defineField({
      name: 'address',
      title: 'Dirección',
      type: 'string',
      group: 'contacto',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Correo de contacto',
      type: 'string',
      group: 'contacto',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Reservas' }),
  },
})
