/**
 * Navigation & Social Links Data
 * Centraliza toda la info de navegación, redes sociales y branding
 */

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
// SOCIAL LINKS
// ============================================================

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/YeyderJHJL',
    icon: 'pi pi-github',
    ariaLabel: 'GitHub',
  },
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/jhamil-yeyder-turpo',
    icon: 'pi pi-linkedin',
    ariaLabel: 'LinkedIn',
  },
  {
    platform: 'Instagram',
    url: 'https://www.instagram.com/jh_jl_yeyder/',
    icon: 'pi pi-instagram',
    ariaLabel: 'Instagram',
  },
  {
    platform: 'Facebook',
    url: 'https://web.facebook.com/profile.php?id=100085333879369',
    icon: 'pi pi-facebook',
    ariaLabel: 'Facebook',
  },
]

// ============================================================
// BRANDING
// ============================================================

export const BRAND = {
  name: 'Portfolio',
  tagline: 'Building amazing web experiences with Vue.js and modern technologies.',
}
