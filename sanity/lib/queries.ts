import { groq } from 'next-sanity'

/**
 * Todas las secciones son documentos únicos con un _id fijo,
 * así que se leen directamente por identificador.
 */

export const siteSettingsQuery = groq`*[_id == "siteSettings"][0]{
  brandName, brandTagline, siteTitle, siteDescription,
  navItems[]{ label, href, boxed },
  showLanguageSwitch,
  drinksButtonEnabled, drinksButtonLabel,
  chatButtonEnabled, chatWebhookUrl, chatTitle, chatSubtitle,
  chatWelcome, chatPlaceholder, chatNotifications
}`

export const heroQuery = groq`*[_id == "heroSection"][0]{
  title,
  slides[]{ ..., alt },
  ctas[]{ label, href }
}`

export const aboutQuery = groq`*[_id == "aboutSection"][0]{
  heading, body,
  imageLeft{ ..., alt },
  imageRight{ ..., alt }
}`

export const experienceQuery = groq`*[_id == "experienceSection"][0]{
  heading, subheading, enabled
}`

export const specialsQuery = groq`*[_id == "specialsSection"][0]{
  heading, subheading,
  "videoUrl": backgroundVideo.asset->url,
  dishes[]{ name, image }
}`

export const menuQuery = groq`*[_id == "menuSection"][0]{
  heading, subheading, watermark,
  "videoUrl": backgroundVideo.asset->url,
  categories[]{ title, items[]{ name, description, price } },
  buttonLabel, buttonHref
}`

export const reservationsQuery = groq`*[_id == "reservationsSection"][0]{
  heading, lead,
  backgroundImage{ ..., alt },
  partySizeOptions, submitLabel, reservationEmail,
  orText, phoneDisplay, phoneNumber,
  contactName, address, contactEmail
}`

export const footerQuery = groq`*[_id == "footerSection"][0]{
  scheduleTitle, schedule[]{ days, hours },
  reserveTitle, reserveLinkLabel, reserveLinkHref,
  socialTitle, socials[]{ network, url },
  copyright
}`

export const drinksPageQuery = groq`*[_id == "drinksPage"][0]{
  heroLabel, title, intro, backLabel, sectionTitle,
  drinks[]{ name, image, tag, description, price, sizes },
  footerText
}`
