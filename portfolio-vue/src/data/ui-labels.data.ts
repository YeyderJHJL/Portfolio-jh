/**
 * UI Labels & Constants
 * Centraliza todos los labels, categorías, traducciones y textos de UI
 * Preparado para i18n cuando se necesite
 * Datos personales se derivan de PROFILE_DATA (single source of truth)
 */

import { PROFILE_DATA } from './profile.data'

// ============================================================
// HERO SECTION - Derivado de PROFILE_DATA
// ============================================================

export const HERO_DATA = {
  fullName: PROFILE_DATA.name,
  role: PROFILE_DATA.title,
  buttons: {
    projects: 'View Projects',
    contact: 'Contact Me',
  },
}

// ============================================================
// SKILL CATEGORY LABELS
// ============================================================

export const SKILL_CATEGORY_LABELS: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  data: 'Bases de Datos',
  devops: 'DevOps & Tools',
  qa: 'QA & Testing',
  pm: 'Project Management',
  soft: 'Soft Skills',
  other: 'Other',
}

// ============================================================
// PROJECT CATEGORY LABELS
// ============================================================

export const PROJECT_CATEGORY_LABELS: Record<string, string> = {
  software: 'Software',
  product: 'Product',
  'project-management': 'Project Management',
  event: 'Events',
  research: 'Research',
  community: 'Community',
  'social-impact': 'Social Impact',
  education: 'Education',
  other: 'Other',
}

// ============================================================
// PROFICIENCY COLORS (Tailwind classes)
// ============================================================

export const PROFICIENCY_COLORS: Record<string, string> = {
  expert: 'bg-accent-700 text-white',
  advanced: 'bg-accent-600 text-white',
  intermediate: 'bg-primary-300 dark:bg-primary-700 text-text-light-primary dark:text-text-dark-primary',
  beginner: 'bg-primary-200 dark:bg-primary-800 text-text-light-secondary dark:text-text-dark-secondary',
}

// ============================================================
// TIMELINE
// ============================================================

export const TIMELINE_ICONS: Record<string, string> = {
  education: 'pi-graduation-cap',
  achievement: 'pi-trophy',
  project: 'pi-code',
  certification: 'pi-verified',
  experience: 'pi-briefcase',
}

export const TIMELINE_TYPE_LABELS: Record<string, string> = {
  achievement: 'Logro',
  education: 'Educación',
  certification: 'Certificación',
  project: 'Proyecto',
  experience: 'Experiencia',
}

// ============================================================
// TECH STACK GROUPS (ProjectDetail)
// ============================================================

export interface TechStackGroupConfig {
  key: keyof typeof TECH_STACK_LABELS
  label: string
  icon: string
}

export const TECH_STACK_LABELS: Record<string, { label: string; icon: string }> = {
  technologies: { label: 'Technologies', icon: '💻' },
  tools: { label: 'Tools', icon: '🛠️' },
  methodologies: { label: 'Methodologies', icon: '📋' },
  platforms: { label: 'Platforms', icon: '☁️' },
  domains: { label: 'Domains', icon: '🎯' },
  skills: { label: 'Skills', icon: '⚡' },
}

// ============================================================
// SORT OPTIONS (Projects)
// ============================================================

export const SORT_LABELS: Record<string, string> = {
  latest: 'Latest',
  oldest: 'Oldest',
  'name-asc': 'A-Z',
  'name-desc': 'Z-A',
}

// ============================================================
// ABOUT PAGE
// ============================================================

export const ABOUT_SECTIONS = {
  story: 'Mi Historia',
  skills: 'Habilidades',
  certifications: 'Certificaciones y Reconocimientos',
  timeline: 'Trayectoria',
}

// ============================================================
// PROJECTS PAGE
// ============================================================

export const PROJECTS_PAGE = {
  title: 'My Projects',
  subtitle: 'Software development, project management, and community building',
  searchPlaceholder: 'Search projects, tags...',
  emptyState: {
    title: 'No projects found',
    subtitle: 'Try adjusting your filters or search terms to discover more projects',
    clearButton: 'Clear All Filters',
  },
  filters: {
    typeLabel: 'Type',
    stackLabel: 'Stack',
    activeLabel: 'Filters:',
    clearAll: 'Clear all',
    noResults: 'No results found',
    searchStack: 'Search...',
  },
  status: {
    inProgress: 'In Progress',
  },
}

// ============================================================
// PROJECT DETAIL PAGE
// ============================================================

export const PROJECT_DETAIL = {
  notFound: {
    title: 'Project Not Found',
    subtitle: "The project you're looking for doesn't exist or has been removed.",
    backButton: 'Back to Projects',
  },
  sections: {
    problem: 'The Problem',
    solution: 'The Solution',
    keyFeatures: 'Key Features',
    challenges: 'Challenges & Solutions',
    metrics: 'Results & Impact',
    techStack: 'Tech Stack',
    screenshots: 'Screenshots',
  },
  navigation: {
    previous: 'Previous',
    next: 'Next',
    allProjects: 'All Projects',
  },
  challengeLabels: {
    challenge: 'Challenge:',
    solution: 'Solution:',
    impact: 'Impact:',
    lessonsLearned: 'Lessons Learned:',
  },
}

// ============================================================
// BLOG PAGE
// ============================================================

export const BLOG_PAGE = {
  title: 'Blog',
  subtitle: 'Experiencias, aprendizajes y reflexiones sobre tecnología, desarrollo y gestión de proyectos',
  featured: 'Destacados',
  featuredBadge: 'Destacado',
  allArticles: 'Todos los Artículos',
  searchPlaceholder: 'Buscar artículos...',
  filterByTopic: 'Filtrar por tema',
  activeFilters: 'Filtros activos:',
  clearFilters: 'Limpiar filtros',
  readMore: 'Leer más',
  readFull: 'Leer artículo completo',
  emptyState: {
    title: 'No se encontraron artículos',
    subtitle: 'Intenta ajustar los filtros de búsqueda para descubrir más contenido',
    clearButton: 'Limpiar Filtros',
  },
}
