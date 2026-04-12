/**
 * Barrel export para datos y configuración
 * Punto único de importación para toda la data layer
 */

// Content data (mock data para stores)
export { SKILLS_DATA } from "./skills.data";
export { PROFILE_DATA, CERTIFICATIONS_DATA, TIMELINE_DATA } from "./profile.data";
export { PROJECTS_DATA } from "./projects.data";
export { BLOG_POSTS_DATA } from "./blog.data";

// Navigation & branding
export { NAV_ITEMS, FOOTER_LINKS, SOCIAL_LINKS, BRAND } from "./navigation.data";
export type { NavItem, SocialLink } from "./navigation.data";

// Contact page
export {
  CONTACT_HEADER,
  CONTACT_FORM,
  CONTACT_VALIDATION,
  CONTACT_MESSAGES,
  CONTACT_CARDS,
} from "./contact.data";

// UI labels & constants
export {
  HERO_DATA,
  SKILL_CATEGORY_LABELS,
  PROJECT_CATEGORY_LABELS,
  PROFICIENCY_COLORS,
  TIMELINE_ICONS,
  TIMELINE_TYPE_LABELS,
  TECH_STACK_LABELS,
  SORT_LABELS,
  ABOUT_SECTIONS,
  PROJECTS_PAGE,
  PROJECT_DETAIL,
  BLOG_PAGE,
} from "./ui-labels.data";
