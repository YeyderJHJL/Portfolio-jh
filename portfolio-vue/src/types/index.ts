/**
 * Tipos e interfaces principales para el Portfolio
 * Diseñados para soportar una estructura escalable y profesional
 */

/**
 * Stack técnico de un proyecto
 * Agrupa todas las tecnologías utilizadas por categoría
 */
export interface TechStack {
  frontend?: string[];
  backend?: string[];
  database?: string[];
  devOps?: string[];
  testing?: string[];
  other?: string[];
}

/**
 * Desafío técnico resuelto en un proyecto
 * Documenta el problema, solución y aprendizaje
 */
export interface Challenge {
  title: string;
  description: string;
  solution: string;
  impact?: string; // ej: "40% mejora en performance"
}

/**
 * Enlace a recurso externo (demo, repo, blog, etc)
 */
export interface ExternalLink {
  label: string;
  url: string;
  icon?: string; // ej: "github", "external-link", "play"
}

/**
 * Proyecto del portafolio
 * Implementa la estructura completa de "case study" profesional
 */
export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  
  // Problema y solución
  problem: string;
  solution: string;
  
  // Stack técnico
  techStack: TechStack;
  
  // Aspectos visuales
  images: {
    thumbnail: string;
    hero: string;
    screenshots: string[];
  };
  
  // Contenido técnico
  challenges: Challenge[];
  keyFeatures: string[];
  
  // Resultados/Métricas
  metrics?: {
    label: string;
    value: string;
  }[];
  
  // Enlaces externos
  links: ExternalLink[];
  
  // Metadatos
  featured: boolean;
  startDate: string; // ISO 8601
  endDate?: string; // ISO 8601
  tags: string[];
  category?: "frontend" | "fullstack" | "backend" | "mobile" | "other";
}

/**
 * Artículo del blog
 * Para documentar aprendizajes y tutoriales
 */
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string; // ISO 8601
  updatedAt?: string; // ISO 8601
  
  // Metadatos
  tags: string[];
  featured: boolean;
  readingTimeMinutes: number;
  
  // Visuales
  thumbnail?: string;
  
  // SEO
  seoDescription?: string;
}

/**
 * Habilidad técnica
 * Soporta niveles visuales para mostrar profundidad
 */
export interface Skill {
  name: string;
  proficiency: "beginner" | "intermediate" | "advanced" | "expert";
  yearsOfExperience?: number;
  endorsements?: number;
}

/**
 * Certificación profesional
 */
export interface Certification {
  title: string;
  issuer: string;
  issueDate: string; // ISO 8601
  expiryDate?: string; // ISO 8601
  credentialUrl?: string;
  credentialId?: string;
}

/**
 * Evento en el timeline de aprendizaje
 */
export interface TimelineEvent {
  id: string;
  date: string; // ISO 8601
  title: string;
  description: string;
  type: "education" | "achievement" | "project" | "certification";
  tags?: string[];
}

/**
 * Información del perfil/usuario
 * Para la sección About y datos generales del portafolio
 */
export interface UserProfile {
  id: string;
  name: string;
  title: string; // ej: "Full Stack Developer"
  bio: string;
  avatar?: string;
  
  // Redes profesionales
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email: string;
  };
  
  // About section
  story: string;
  skills: Skill[];
  certifications: Certification[];
  timeline: TimelineEvent[];
  
  // Preferencias
  theme?: "light" | "dark";
  language?: string;
}

/**
 * Mensaje de contacto enviado desde el formulario
 */
export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: string; // ISO 8601
  read?: boolean;
}

/**
 * Respuesta genérica del API
 * Útil para manejo consistente de errores
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  timestamp: string;
}

/**
 * Estado paginado para listados
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
