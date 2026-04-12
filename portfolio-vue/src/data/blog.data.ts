/**
 * Datos del blog
 * Al conectar backend, reemplazar con fetch desde API
 * Author se deriva de PROFILE_DATA (single source of truth)
 */
import type { BlogPost } from "../types";
import { PROFILE_DATA } from "./profile.data";

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: "1",
    slug: "nasa-space-apps-2025",
    title: "Finalista Global en NASA Space Apps Challenge 2025",
    excerpt: "Experiencia internacional desarrollando plataforma web de análisis de datos satelitales.",
    content: "Durante el NASA Space Apps Challenge 2025, nuestro equipo desarrolló BioForecast, una plataforma para análisis de aptitud de suelos y datos satelitales. Integración de APIs, despliegue en Vercel y trabajo en equipo con mentores técnicos.",
    author: PROFILE_DATA.name,
    publishedAt: "2025-10-15",
    updatedAt: "2025-10-20",
    tags: ["NASA", "Space Apps", "Web Development", "Data Analysis"],
    featured: true,
    readingTimeMinutes: 5,
    thumbnail: "https://images.unsplash.com/photo-1611606063065-cb86f3fb9bcf?w=400&h=300&fit=crop",
    seoDescription: "BioForecast - Plataforma web de análisis de datos satelitales y aptitud de suelos desarrollada en NASA Space Apps Challenge 2025",
  },
  {
    id: "2",
    slug: "flowtechai-hackaton-innovasur",
    title: "FlowTechAI - Hackatón Innovasur 2025",
    excerpt: "Lideré un equipo multidisciplinario para desarrollar un prototipo funcional de software.",
    content: "En la III Hackatón Innovasur 2025 coordiné el flujo de trabajo, definí la arquitectura técnica y lideré la presentación final del proyecto FlowTechAI. Implementamos un prototipo funcional usando Figma, validación técnica y pruebas iniciales.",
    author: PROFILE_DATA.name,
    publishedAt: "2025-10-10",
    tags: ["Hackathon", "Team Leadership", "Prototyping", "Innovation"],
    featured: true,
    readingTimeMinutes: 4,
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    seoDescription: "FlowTechAI - Prototipo desarrollado en Hackatón Innovasur 2025 con liderazgo técnico",
  },
  {
    id: "3",
    slug: "tical-2025-costarica",
    title: "TICAL 2025 - Innovación y Ecosistemas Tecnológicos",
    excerpt: "Representé a la UNSA en Costa Rica en el financiamiento PIPE y networking TIC.",
    content: "Durante TICAL 2025 fui ganador de financiamiento PIPE de la UNSA, participando en eventos internacionales de TIC, transformación digital y ecosistemas de innovación, representando a la universidad en un entorno de alto nivel tecnológico.",
    author: PROFILE_DATA.name,
    publishedAt: "2025-11-05",
    tags: ["Innovation", "TIC", "Networking", "PIPE"],
    featured: false,
    readingTimeMinutes: 3,
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    seoDescription: "TICAL 2025 - Participación y financiamiento PIPE para proyectos TIC",
  },
];
