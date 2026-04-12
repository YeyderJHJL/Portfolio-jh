/**
 * Navigation & Social Links Data
 * Centraliza toda la info de navegación, redes sociales y branding
 * Social links se derivan de PROFILE_DATA (single source of truth)
 */

import { PROFILE_DATA } from './profile.data'

export interface NavItem {
  label: string
  labelMobile?: string
  routeName: string
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
  ariaLabel: string
}

// ============================================================
// NAVIGATION ITEMS
// ============================================================

export const NAV_ITEMS: NavItem[] = [
  { label: 'HOME', labelMobile: 'Home', routeName: 'home' },
  { label: 'PROJECTS', labelMobile: 'Projects', routeName: 'projects' },
  { label: 'BLOG', labelMobile: 'Blog', routeName: 'blog' },
  { label: 'ABOUT', labelMobile: 'About', routeName: 'about' },
  { label: 'CONTACT', labelMobile: 'Contact', routeName: 'contact' },
]

// ============================================================
// FOOTER QUICK LINKS (subset of nav)
// ============================================================

export const FOOTER_LINKS: NavItem[] = [
  { label: 'Home', routeName: 'home' },
  { label: 'Projects', routeName: 'projects' },
  { label: 'Blog', routeName: 'blog' },
  { label: 'Contact', routeName: 'contact' },
]

// ============================================================
// SOCIAL LINKS - Derivados de PROFILE_DATA.social
// ============================================================

const socialConfig: { key: keyof typeof PROFILE_DATA.social; platform: string; icon: string }[] = [
  { key: 'github', platform: 'GitHub', icon: 'pi pi-github' },
  { key: 'linkedin', platform: 'LinkedIn', icon: 'pi pi-linkedin' },
  { key: 'instagram', platform: 'Instagram', icon: 'pi pi-instagram' },
  { key: 'facebook', platform: 'Facebook', icon: 'pi pi-facebook' },
]

export const SOCIAL_LINKS: SocialLink[] = socialConfig
  .filter(({ key }) => PROFILE_DATA.social[key])
  .map(({ key, platform, icon }) => ({
    platform,
    url: PROFILE_DATA.social[key]!,
    icon,
    ariaLabel: platform,
  }))

// ============================================================
// BRANDING
// ============================================================

export const BRAND = {
  name: 'Portfolio',
  tagline: 'Building amazing web experiences with Vue.js and modern technologies.',
}
