import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Ajustes generales',
  type: 'document',
  groups: [
    { name: 'marca', title: 'Marca' },
    { name: 'menu', title: 'Menú de navegación' },
    { name: 'flotantes', title: 'Botones flotantes' },
    { name: 'chat', title: 'Asistente de chat' },
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
      title: 'Mostrar el asistente de chat',
      description:
        'El botón redondo dorado de la esquina inferior izquierda. Al pulsarlo se abre el chat con el agente de IA.',
      type: 'boolean',
      group: 'chat',
      initialValue: true,
    }),
    defineField({
      name: 'chatWebhookUrl',
      title: 'Endpoint del agente (n8n)',
      description:
        'La URL a la que el chat envía cada mensaje. Debe aceptar POST con {sessionId, message} y responder {reply}. Si la dejas vacía, el chat no se muestra.',
      type: 'url',
      group: 'chat',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
      hidden: ({ document }) => !document?.chatButtonEnabled,
    }),
    defineField({
      name: 'chatTitle',
      title: 'Título de la ventana de chat',
      type: 'string',
      group: 'chat',
      hidden: ({ document }) => !document?.chatButtonEnabled,
    }),
    defineField({
      name: 'chatSubtitle',
      title: 'Subtítulo de la ventana',
      description: 'La línea pequeña bajo el título. Por ejemplo: Normalmente respondemos al instante',
      type: 'string',
      group: 'chat',
      hidden: ({ document }) => !document?.chatButtonEnabled,
    }),
    defineField({
      name: 'chatWelcome',
      title: 'Mensaje de bienvenida',
      description: 'Lo primero que ve el visitante al abrir el chat.',
      type: 'text',
      rows: 2,
      group: 'chat',
      hidden: ({ document }) => !document?.chatButtonEnabled,
    }),
    defineField({
      name: 'chatPlaceholder',
      title: 'Texto guía del campo de escritura',
      type: 'string',
      group: 'chat',
      hidden: ({ document }) => !document?.chatButtonEnabled,
    }),
    defineField({
      name: 'chatNotifications',
      title: 'Avisos que salen del botón',
      description:
        'Burbujas que aparecen solas junto al botón para llamar la atención, una cada 6 segundos y en bucle. Dejan de salir en cuanto el visitante abre el chat. Vacía la lista para desactivarlas.',
      type: 'array',
      group: 'chat',
      of: [defineArrayMember({ type: 'string' })],
      hidden: ({ document }) => !document?.chatButtonEnabled,
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Ajustes generales' }),
  },
})
