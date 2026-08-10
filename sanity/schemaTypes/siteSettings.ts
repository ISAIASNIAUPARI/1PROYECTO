import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Ajustes generales',
  type: 'document',
  groups: [
    { name: 'marca', title: 'Marca' },
    { name: 'menu', title: 'Menú de navegación' },
    { name: 'flotantes', title: 'Botones flotantes' },
  ],
  fields: [
    defineField({
      name: 'brandName',
      title: 'Nombre de la marca',
      description: 'Se muestra en la cabecera con la tipografía manuscrita.',
      type: 'string',
      group: 'marca',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'brandTagline',
      title: 'Lema bajo el nombre',
      description: 'Ejemplo: LIMA · QUITO · CARTAGENA',
      type: 'string',
      group: 'marca',
    }),
    defineField({
      name: 'siteTitle',
      title: 'Título del navegador',
      description: 'El texto que aparece en la pestaña del navegador y en Google.',
      type: 'string',
      group: 'marca',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Descripción para buscadores',
      description: 'Resumen de 1–2 frases. Google lo usa bajo el título.',
      type: 'text',
      rows: 2,
      group: 'marca',
    }),
    defineField({
      name: 'navItems',
      title: 'Enlaces del menú',
      description:
        'El orden de esta lista es el orden en pantalla. Arrastra para reordenar.',
      type: 'array',
      group: 'menu',
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
              description:
                'Para ir a una sección de esta misma página usa # y el nombre: #menu, #reservas, #sobre, #especiales, #footer. Para otra página usa la ruta: /bebidas',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'boxed',
              title: 'Mostrar dentro de un recuadro',
              description: 'Se usa para destacar el enlace de RESERVAS.',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        }),
      ],
    }),
    defineField({
      name: 'showLanguageSwitch',
      title: 'Mostrar selector de idioma',
      description: 'La banderita con "ES" en la esquina del menú.',
      type: 'boolean',
      group: 'menu',
      initialValue: true,
    }),

    defineField({
      name: 'drinksButtonEnabled',
      title: 'Mostrar botón de BEBIDAS',
      description: 'Botón dorado flotante en la esquina inferior derecha.',
      type: 'boolean',
      group: 'flotantes',
      initialValue: true,
    }),
    defineField({
      name: 'drinksButtonLabel',
      title: 'Texto del botón de bebidas',
      type: 'string',
      group: 'flotantes',
      hidden: ({ document }) => !document?.drinksButtonEnabled,
    }),
    defineField({
      name: 'chatButtonEnabled',
      title: 'Mostrar botón de Atención al Cliente',
      description: 'Botón flotante en la esquina inferior izquierda.',
      type: 'boolean',
      group: 'flotantes',
      initialValue: true,
    }),
    defineField({
      name: 'chatButtonLabel',
      title: 'Texto del botón de atención',
      type: 'string',
      group: 'flotantes',
      hidden: ({ document }) => !document?.chatButtonEnabled,
    }),
    defineField({
      name: 'chatButtonTooltip',
      title: 'Mensaje al pasar el ratón',
      type: 'string',
      group: 'flotantes',
      hidden: ({ document }) => !document?.chatButtonEnabled,
    }),
    defineField({
      name: 'chatButtonUrl',
      title: 'Enlace del chat',
      description:
        'Pega aquí la URL del chat (por ejemplo el enlace de n8n o de WhatsApp). Si lo dejas vacío, el botón no se muestra: es preferible a un botón que no lleva a ningún sitio.',
      type: 'url',
      group: 'flotantes',
      validation: (Rule) =>
        Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
      hidden: ({ document }) => !document?.chatButtonEnabled,
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Ajustes generales' }),
  },
})
