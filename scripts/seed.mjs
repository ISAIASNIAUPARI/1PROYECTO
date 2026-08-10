/**
 * Carga inicial de contenido en Sanity.
 *
 * Sube las imágenes de public/ y crea las secciones con exactamente los
 * mismos textos, platos y precios que tenía el HTML estático original.
 *
 * Es idempotente: usa `createOrReplace` con _id fijos, así que puedes
 * volver a ejecutarlo sin duplicar nada. Ojo: sobrescribe lo que el
 * cliente haya editado, así que no lo lances a la ligera en producción.
 *
 *   node scripts/seed.mjs            → sube imágenes y crea el contenido
 *   node scripts/seed.mjs --no-media → sólo textos, reutiliza imágenes ya subidas
 */

import { createClient } from '@sanity/client'
import { createReadStream, existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

/* ---------- variables de entorno ---------- */
loadEnvLocal()

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId) exit('Falta NEXT_PUBLIC_SANITY_PROJECT_ID en .env.local')
if (!token) exit('Falta SANITY_API_WRITE_TOKEN en .env.local (permiso Editor)')

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-10-01',
  useCdn: false,
})

const skipMedia = process.argv.includes('--no-media')

/* ---------- subida de imágenes ---------- */
const uploaded = new Map()

async function img(relPath, alt) {
  const abs = join(ROOT, 'public', relPath)
  if (!existsSync(abs)) exit(`No encuentro la imagen: ${abs}`)

  if (!uploaded.has(relPath)) {
    if (skipMedia) {
      // Reutiliza un asset ya subido con el mismo nombre de archivo.
      const filename = relPath.split('/').pop()
      const found = await client.fetch(
        `*[_type == "sanity.imageAsset" && originalFilename == $f][0]._id`,
        { f: filename }
      )
      if (!found) exit(`--no-media: no hay asset previo para ${filename}`)
      uploaded.set(relPath, found)
    } else {
      process.stdout.write(`  subiendo ${relPath} … `)
      const asset = await client.assets.upload('image', createReadStream(abs), {
        filename: relPath.split('/').pop(),
      })
      uploaded.set(relPath, asset._id)
      console.log('ok')
    }
  }

  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: uploaded.get(relPath) },
    ...(alt ? { alt } : {}),
  }
}

/* ---------- contenido ---------- */
async function build() {
  return [
    {
      _id: 'siteSettings',
      _type: 'siteSettings',
      brandName: 'la Gloria',
      brandTagline: 'LIMA · QUITO · CARTAGENA',
      siteTitle: 'La Gloria Restaurante',
      siteDescription:
        'Comida peruana y mediterránea con tintes ecuatorianos, en Quito. Reserva tu mesa en La Gloria Restaurante.',
      navItems: [
        { _key: 'n1', label: 'INICIO', href: '#inicio', boxed: false },
        { _key: 'n2', label: 'SOBRE LA GLORIA', href: '#sobre', boxed: false },
        { _key: 'n3', label: 'MENÚ', href: '#menu', boxed: false },
        { _key: 'n4', label: 'SERVICIOS', href: '#especiales', boxed: false },
        { _key: 'n5', label: 'RESERVAS', href: '#reservas', boxed: true },
        { _key: 'n6', label: 'TIENDA', href: '#footer', boxed: false },
        { _key: 'n7', label: 'CARRITO', href: '#footer', boxed: false },
      ],
      showLanguageSwitch: true,
      drinksButtonEnabled: true,
      drinksButtonLabel: 'BEBIDAS',
      chatButtonEnabled: true,
      chatWebhookUrl:
        'https://n8n-n8n.kwtwgj.easypanel.host/webhook/chat-soporte',
      chatTitle: 'Atención al Cliente',
      chatSubtitle: 'Normalmente respondemos al instante',
      chatWelcome:
        '¡Hola! Soy el asistente de La Gloria. ¿En qué puedo ayudarte? Puedo informarte sobre la carta, los horarios o tu reserva.',
      chatPlaceholder: 'Escribe tu mensaje…',
      chatNotifications: ['¿Deseas reservar? 🍽️', 'Contáctanos 💬'],
    },

    {
      _id: 'heroSection',
      _type: 'heroSection',
      title: 'Bienvenidos a la Gloria\nRestaurante',
      slides: [
        { ...(await img('images/hero-salon.jpg', 'Salón La Gloria')), _key: 's1' },
        { ...(await img('images/hero-clientes.jpg', 'Clientes disfrutando')), _key: 's2' },
        { ...(await img('images/hero-plato.jpg', 'Plato especial')), _key: 's3' },
      ],
      ctas: [
        { _key: 'c1', label: 'Reservaciones', href: '#reservas' },
        { _key: 'c2', label: 'Conoce nuestro menú', href: '#menu' },
      ],
    },

    {
      _id: 'aboutSection',
      _type: 'aboutSection',
      heading:
        'Nos especializamos en comida peruana y mediterránea con tintes ecuatorianos',
      body: 'Cada día preparamos cuidadosamente nuestro ritual para poner en escena un inmenso mundo lleno de olores, sabores y sensaciones, para festejar juntos la Fiesta de la Vida.',
      imageLeft: await img('images/about-hostess.jpg', 'Hostess La Gloria'),
      imageRight: await img('images/about-platos.jpg', 'Platos especiales La Gloria'),
    },

    {
      _id: 'experienceSection',
      _type: 'experienceSection',
      heading: 'Un instante de La Gloria',
      subheading: 'Desliza para vivir el momento',
      enabled: true,
    },

    {
      _id: 'specialsSection',
      _type: 'specialsSection',
      heading: 'Especiales de nuestra carta',
      subheading: 'Innovando siempre para deleitar tus sentidos',
      dishes: [
        { _key: 'd1', name: 'Ceviche mixto de mariscos', image: await img('dishes/dish1.jpg') },
        { _key: 'd2', name: 'Mixto frito con ceviche', image: await img('dishes/dish2.jpg') },
        { _key: 'd3', name: 'Seco de res con mote y patacón', image: await img('dishes/dish3.jpg') },
        { _key: 'd4', name: 'Pizza Margherita napolitana', image: await img('dishes/dish4.jpg') },
        { _key: 'd5', name: 'Cheesecake de lúcuma', image: await img('dishes/dish5.jpg') },
        { _key: 'd6', name: 'Entrada fría en copa de mariscos', image: await img('dishes/dish6.jpg') },
      ],
    },

    {
      _id: 'menuSection',
      _type: 'menuSection',
      heading: 'Nuestro Menú',
      subheading: 'Selección completa de todas nuestras delicias',
      watermark: 'Menú',
      buttonLabel: 'Ver menú completo',
      buttonHref: '#footer',
      categories: [
        {
          _key: 'cat1',
          _type: 'category',
          title: 'Entradas Frías',
          items: [
            { _key: 'i1', _type: 'dish', name: 'Tiradito de pesca blanca', description: 'alcaparras / aguacate / ají amarillo / leche de tigre', price: '$12' },
            { _key: 'i2', _type: 'dish', name: 'Tartar de atún rojo', description: 'cebollín / jengibre / soya / aguacate', price: '$13' },
            { _key: 'i3', _type: 'dish', name: 'Tataki de atún rojo', description: 'ajo blanco / ponzu / cebollino / aceitunas kalamata', price: '$12' },
            { _key: 'i4', _type: 'dish', name: 'Frescas láminas de atún', description: 'aguacate / rabanito / vinagreta blanca', price: '$12' },
          ],
        },
        {
          _key: 'cat2',
          _type: 'category',
          title: 'Pescados',
          items: [
            { _key: 'i5', _type: 'dish', name: 'Pesca del día "al mare"', description: 'Sauvignon Blanc / almejas / camarones al limón / aceite de oliva', price: '$26' },
            { _key: 'i6', _type: 'dish', name: 'Corvina al "tabaco de cocina"', description: 'costra de polvo de hongos / puré de espinaca', price: '$22' },
            { _key: 'i7', _type: 'dish', name: 'Mero al pil pil', description: 'ajo, perejil… choclo frito y mote / maduro asado', price: '$22' },
            { _key: 'i8', _type: 'dish', name: 'Salmón ahumado al momento', description: 'con su arroz salvaje / salsa de setas', price: '$22' },
            { _key: 'i9', _type: 'dish', name: 'Fresco atún rojo "pepper steak"', description: 'papitas al perejil / espárragos / bacon', price: '$22' },
          ],
        },
        {
          _key: 'cat3',
          _type: 'category',
          title: 'Reses, Aves, Corderos y Lechones',
          items: [
            { _key: 'i10', _type: 'dish', name: 'Rack de Costillitas de Cordero serrano', description: 'papitas panaderas / reducción de tinto joven', price: '$29' },
            { _key: 'i11', _type: 'dish', name: 'Lomo fino de res grillado', description: 'a las 4 pimientas o en salsa al vino tinto / láminas de papa gratinadas', price: '$20' },
            { _key: 'i12', _type: 'dish', name: 'Seco de chivo', description: 'delicado arroz / maduro frito / aguacate', price: '$15' },
            { _key: 'i13', _type: 'dish', name: 'Bife de chorizo uruguayo (300gr.)', description: 'con sus papas chauchas fritas y ensalada fresca', price: '$39' },
          ],
        },
      ],
    },

    {
      _id: 'reservationsSection',
      _type: 'reservationsSection',
      heading: 'Nos encantaría recibirte pronto',
      lead: 'Realiza tu reserva en el siguiente link',
      // En el HTML original este fondo era un hueco vacío del maquetador y
      // mostraba el texto "Foto: salón del restaurante" a los visitantes.
      backgroundImage: await img('images/hero-salon.jpg', 'Salón de La Gloria Restaurante'),
      partySizeOptions: [
        '2 personas', '1 persona', '3 personas', '4 personas',
        '5 personas', '6 personas', '7 personas', '8 personas',
      ],
      submitLabel: 'Encuentra una mesa',
      reservationEmail: 'niauparii@gmail.com',
      orText: 'o llámanos al',
      phoneDisplay: '+593 99 916 9570',
      phoneNumber: '+593999169570',
      contactName: 'La Gloria Restaurante',
      address: 'Valladolid N24-519 y Francisco Salazar',
      contactEmail: 'reservas@lagloria.com.ec',
    },

    {
      _id: 'footerSection',
      _type: 'footerSection',
      scheduleTitle: 'HORARIO',
      schedule: [
        { _key: 'h1', days: 'Lunes a viernes', hours: '12h30 a 23h00' },
        { _key: 'h2', days: 'Sábado', hours: '12h30 a 17h00 – 20h30 a 23h00' },
        { _key: 'h3', days: 'Domingo', hours: '12h30 a 16h30' },
      ],
      reserveTitle: 'RESERVAR CON:',
      reserveLinkLabel: 'Realiza tu reserva aquí',
      reserveLinkHref: '#reservas',
      socialTitle: 'RRSS',
      // Las redes quedan listas para rellenar: sin enlace no se pintan,
      // que es mejor que un icono que no lleva a ninguna parte.
      socials: [
        { _key: 'r1', network: 'facebook' },
        { _key: 'r2', network: 'instagram' },
        { _key: 'r3', network: 'google' },
        { _key: 'r4', network: 'tripadvisor' },
        { _key: 'r5', network: 'tiktok' },
      ],
      copyright: '© 2025 La Gloria Restaurant',
    },

    {
      _id: 'drinksPage',
      _type: 'drinksPage',
      heroLabel: 'Carta de',
      title: 'Bebidas',
      intro: 'Limonadas artesanales & combinaciones de temporada',
      backLabel: '← Inicio',
      sectionTitle: 'Limonadas Artesanales',
      footerText: 'LIMA · QUITO · CARTAGENA  |  LA GLORIA RESTAURANTE',
      drinks: [
        {
          _key: 'b1', name: 'Limonada de Arándano', tag: 'Blueberry', price: 'desde $8',
          description: 'Arándanos frescos, limón exprimido, hielo & menta. Refrescante y antioxidante.',
          sizes: ['Small', 'Large'],
          image: await img('images/bebida-blueberry.jpeg', 'Limonada de Arándano'),
        },
        {
          _key: 'b2', name: 'Limonada de Fresa', tag: 'Strawberry', price: 'desde $8',
          description: 'Fresas naturales, limón fresco, hielo & sirope artesanal.',
          sizes: ['Small', 'Large'],
          image: await img('images/bebida-strawberry.webp', 'Limonada de Fresa'),
        },
        {
          _key: 'b3', name: 'Mango Tropical', tag: 'Tropical', price: 'desde $9',
          description: 'Mango maduro, maracuyá, menta fresca & hielo granizado.',
          sizes: ['Small', 'Large'],
          image: await img('images/bebida-mango.webp', 'Mango Tropical'),
        },
        {
          _key: 'b4', name: 'Uva & Lichi', tag: 'Exotic', price: 'desde $9',
          description: 'Uvas moradas, lichi, limón & agua con gas. Elegante y refrescante.',
          sizes: ['Small', 'Large'],
          image: await img('images/bebida-lychee.webp', 'Uva y Lichi'),
        },
        {
          _key: 'b5', name: 'Frappuccino de Caramelo', tag: 'Signature', price: 'desde $10',
          description: 'Café helado, caramelo, crema batida & topping de sirope. Cremoso e irresistible.',
          sizes: ['Small', 'Large'],
          image: await img('images/bebida-frapp.jpeg', 'Frappuccino de Caramelo'),
        },
        {
          _key: 'b6', name: 'Macchiato de Caramelo', tag: 'Coffee', price: 'desde $9',
          description: 'Espresso sobre leche fría con caramelo, hielo & notas dulces. Intenso y refrescante.',
          sizes: ['Small', 'Large'],
          image: await img('images/bebida-macchiato.webp', 'Macchiato de Caramelo'),
        },
      ],
    },
  ]
}

/* ---------- ejecución ---------- */
console.log(`\nCargando contenido en Sanity (${projectId} / ${dataset})\n`)

const docs = await build()

const tx = docs.reduce((t, doc) => t.createOrReplace(doc), client.transaction())
await tx.commit()

console.log(`\n✓ ${docs.length} secciones creadas:`)
docs.forEach((d) => console.log(`    ${d._id}`))
console.log('\nAbre /studio para editarlas.\n')

/* ---------- utilidades ---------- */

function loadEnvLocal() {
  const file = join(ROOT, '.env.local')
  if (!existsSync(file)) return
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (!m) continue
    const value = m[2].trim().replace(/^["']|["']$/g, '')
    if (value && !process.env[m[1]]) process.env[m[1]] = value
  }
}

function exit(msg) {
  console.error(`\n✗ ${msg}\n`)
  process.exit(1)
}
