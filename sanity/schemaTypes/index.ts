import type { SchemaTypeDefinition } from 'sanity'

import { aboutSection } from './aboutSection'
import { drinksPage } from './drinksPage'
import { experienceSection } from './experienceSection'
import { footerSection } from './footerSection'
import { heroSection } from './heroSection'
import { menuSection } from './menuSection'
import { reservationsSection } from './reservationsSection'
import { siteSettings } from './siteSettings'
import { specialsSection } from './specialsSection'

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  heroSection,
  aboutSection,
  experienceSection,
  specialsSection,
  menuSection,
  reservationsSection,
  footerSection,
  drinksPage,
]
