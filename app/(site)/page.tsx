import { About } from '@/components/About'
import { FloatingButtons } from '@/components/FloatingButtons'
import { Footer } from '@/components/Footer'
import { FrameScroll } from '@/components/FrameScroll'
import { Hero } from '@/components/Hero'
import { MenuSection } from '@/components/MenuSection'
import { Nav } from '@/components/Nav'
import { Reservations } from '@/components/Reservations'
import { ScrollEffects } from '@/components/ScrollEffects'
import { Specials } from '@/components/Specials'
import { client } from '@/sanity/lib/client'
import { imageUrl } from '@/sanity/lib/image'
import {
  aboutQuery,
  experienceQuery,
  footerQuery,
  heroQuery,
  menuQuery,
  reservationsQuery,
  siteSettingsQuery,
  specialsQuery,
} from '@/sanity/lib/queries'

/** El contenido se revalida cada 60 s: los cambios en Sanity salen solos. */
export const revalidate = 60

/** Vídeos de reserva, por si aún no se ha subido ninguno desde Sanity. */
const FALLBACK_VIDEO_SPECIALS = '/videos/video-especiales.mp4'
const FALLBACK_VIDEO_MENU = '/videos/video-menu.mp4'

export default async function HomePage() {
  const [settings, hero, about, experience, specials, menu, reservations, footer] =
    await Promise.all([
      client.fetch(siteSettingsQuery),
      client.fetch(heroQuery),
      client.fetch(aboutQuery),
      client.fetch(experienceQuery),
      client.fetch(specialsQuery),
      client.fetch(menuQuery),
      client.fetch(reservationsQuery),
      client.fetch(footerQuery),
    ])

  const slides = (hero?.slides ?? [])
    .map((s: { alt?: string }) => ({
      url: imageUrl(s as never, 2000),
      alt: s?.alt,
    }))
    .filter((s: { url: string | null }): s is { url: string; alt?: string } =>
      Boolean(s.url)
    )

  const dishes = (specials?.dishes ?? [])
    .map((d: { name?: string; image?: unknown }) => ({
      name: d.name,
      url: imageUrl(d.image as never, 900),
    }))
    .filter((d: { url: string | null }): d is { name?: string; url: string } =>
      Boolean(d.url)
    )

  return (
    <>
      <ScrollEffects />

      <Nav
        brandName={settings?.brandName}
        brandTagline={settings?.brandTagline}
        items={settings?.navItems}
        showLanguageSwitch={settings?.showLanguageSwitch}
      />

      {hero && <Hero title={hero.title} slides={slides} ctas={hero.ctas} />}

      {about && (
        <About
          heading={about.heading}
          body={about.body}
          imageLeft={
            imageUrl(about.imageLeft, 700)
              ? { url: imageUrl(about.imageLeft, 700)!, alt: about.imageLeft?.alt }
              : null
          }
          imageRight={
            imageUrl(about.imageRight, 700)
              ? { url: imageUrl(about.imageRight, 700)!, alt: about.imageRight?.alt }
              : null
          }
        />
      )}

      {experience?.enabled !== false && experience && (
        <FrameScroll
          heading={experience.heading}
          subheading={experience.subheading}
        />
      )}

      {specials && (
        <Specials
          heading={specials.heading}
          subheading={specials.subheading}
          videoUrl={specials.videoUrl || FALLBACK_VIDEO_SPECIALS}
          dishes={dishes}
        />
      )}

      {menu && (
        <MenuSection
          heading={menu.heading}
          subheading={menu.subheading}
          watermark={menu.watermark}
          videoUrl={menu.videoUrl || FALLBACK_VIDEO_MENU}
          categories={menu.categories ?? []}
          buttonLabel={menu.buttonLabel}
          buttonHref={menu.buttonHref}
        />
      )}

      {reservations && (
        <Reservations
          heading={reservations.heading}
          lead={reservations.lead}
          backgroundUrl={imageUrl(reservations.backgroundImage, 2000)}
          backgroundAlt={reservations.backgroundImage?.alt}
          partySizeOptions={reservations.partySizeOptions ?? ['2 personas']}
          submitLabel={reservations.submitLabel || 'Encuentra una mesa'}
          reservationEmail={reservations.reservationEmail}
          orText={reservations.orText}
          phoneDisplay={reservations.phoneDisplay}
          phoneNumber={reservations.phoneNumber}
          contactName={reservations.contactName}
          address={reservations.address}
          contactEmail={reservations.contactEmail}
        />
      )}

      {footer && (
        <Footer
          brandName={settings?.brandName}
          brandTagline={settings?.brandTagline}
          scheduleTitle={footer.scheduleTitle}
          schedule={footer.schedule}
          reserveTitle={footer.reserveTitle}
          reserveLinkLabel={footer.reserveLinkLabel}
          reserveLinkHref={footer.reserveLinkHref}
          socialTitle={footer.socialTitle}
          socials={footer.socials}
          copyright={footer.copyright}
        />
      )}

      <FloatingButtons
        drinksEnabled={settings?.drinksButtonEnabled}
        drinksLabel={settings?.drinksButtonLabel}
        chatEnabled={settings?.chatButtonEnabled}
        chatLabel={settings?.chatButtonLabel}
        chatTooltip={settings?.chatButtonTooltip}
        chatUrl={settings?.chatButtonUrl}
      />
    </>
  )
}
