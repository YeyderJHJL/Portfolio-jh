/**
 * Datos del perfil de usuario
 * Al conectar backend, reemplazar con fetch desde API
 */
import type { UserProfile, Certification, TimelineEvent } from "../types";
import { SKILLS_DATA } from "./skills.data";

// ── Certificaciones ──
export const CERTIFICATIONS_DATA: Certification[] = [
  {
    title: "Beca de Permanencia PRONABEC",
    issuer: "PRONABEC - Perú",
    issueDate: "2022-03-01",
  },
  {
    title: "Google Cloud Skill Badge",
    issuer: "Google Cloud",
    issueDate: "2024-06-01",
  },
  {
    title: "Finalista Internacional NASA Space Apps Challenge",
    issuer: "NASA",
    issueDate: "2025-10-15",
  },
  {
    title: "Congreso Internacional PMI Sur",
    issuer: "PMI - Capítulo Sur Perú",
    issueDate: "2024-07-01",
  },
  {
    title: "Primer Taller Presencial PIBPGPM",
    issuer: "PMI - Capítulo Sur Perú",
    issueDate: "2025-05-01",
  },
  {
    title: "5ta Cumbre Nacional Perú Proyectando 2025",
    issuer: "PMI - Capítulo Sur Perú",
    issueDate: "2025-07-01",
  },
  {
    title: "Congreso Internacional de Dirección de Proyectos Cusco 2026",
    issuer: "PMI - Capítulo Sur Perú",
    issueDate: "2026-01-01",
  },
  {
    title: "Congreso SuperPMs México 2026",
    issuer: "SuperPMs México",
    issueDate: "2026-01-01",
  },
];

// ── Timeline ──
export const TIMELINE_DATA: TimelineEvent[] = [
  // 2026
  {
    id: "timeline-idema",
    date: "2026-02-01",
    title: "Desarrollador Full Stack - IDEMA",
    description: "Ingreso a IDEMA como Desarrollador Full Stack & Data Science. Migración de portal corporativo a React, desarrollo de servicios B2B y arquitecturas escalables con Next.js, Nest.js, PostgreSQL y Prisma.",
    type: "experience",
    tags: ["Full Stack", "React", "Nest.js", "PostgreSQL"],
  },
  {
    id: "timeline-lead-unsa",
    date: "2026-02-01",
    title: "Fundador & Presidente - LEAD UNSA",
    description: "Fundación y formalización de organización estudiantil de liderazgo. Reconocimiento oficial LEAD Mindset desde el primer proyecto.",
    type: "experience",
    tags: ["Leadership", "Organization", "Founder"],
  },
  {
    id: "timeline-valixai",
    date: "2026-01-15",
    title: "Hackatón Plateada - ValixAI",
    description: "Desarrollo del MVP con Next.js y Supabase conectando emprendimientos de adultos mayores con incubadoras de innovación. Coordinación técnica y despliegue en Vercel.",
    type: "project",
    tags: ["Next.js", "Supabase", "Hackathon", "MVP"],
  },
  // 2025
  {
    id: "timeline-enwuan",
    date: "2025-12-15",
    title: "Startup Perú 13G - EnWuan (MVP Validado)",
    description: "Liderazgo técnico y desarrollo del MVP con React, Vite, Tailwind y Nest.js. Integración de Google Gemini AI y autenticación con Firebase Auth.",
    type: "project",
    tags: ["React", "Nest.js", "AI", "Firebase"],
  },
  {
    id: "timeline-desogep",
    date: "2025-12-01",
    title: "Presidente - DESOGEP ACM UNSA",
    description: "Dirigió operaciones organizacionales: Bienvenida Cachimbo, Proyectos Colaborativos y Hack4Edu (reconocimiento internacional).",
    type: "experience",
    tags: ["Leadership", "Organization", "President"],
  },
  {
    id: "timeline-tical",
    date: "2025-11-01",
    title: "TICAL 2025 - Costa Rica",
    description: "Ganador del financiamiento PIPE de la UNSA en Innovación y Ecosistemas Tecnológicos. Networking internacional y transformación digital.",
    type: "achievement",
    tags: ["Innovation", "TIC", "International"],
  },
  {
    id: "timeline-nasa",
    date: "2025-10-15",
    title: "NASA Space Apps Challenge - Finalista Internacional",
    description: "Finalista Internacional y Nominado Global con el equipo BioForecast. Plataforma web para análisis de datos satelitales y aptitud de suelo.",
    type: "achievement",
    tags: ["NASA", "Hackathon", "Web Development"],
  },
  {
    id: "timeline-innovasur",
    date: "2025-10-10",
    title: "III Hackatón Innovasur - Líder de Equipo",
    description: "Liderazgo técnico y organizacional de equipo multidisciplinario. Proyecto FlowTechAI reconocido competente en el mercado.",
    type: "achievement",
    tags: ["Leadership", "Hackathon", "Team Management"],
  },
  {
    id: "timeline-cumbre",
    date: "2025-07-01",
    title: "5ta Cumbre Nacional de Dirección de Proyectos",
    description: "Organizador del evento nacional Perú Proyectando 2025 con PMI Sur Perú.",
    type: "experience",
    tags: ["Project Management", "Organization"],
  },
  {
    id: "timeline-pibpgpm",
    date: "2025-05-01",
    title: "Primer Taller Presencial PIBPGPM - PMI",
    description: "Organizador del primer taller presencial de buenas prácticas de gestión de proyectos.",
    type: "experience",
    tags: ["PMI", "Workshop", "Organization"],
  },
  {
    id: "timeline-mac",
    date: "2025-04-01",
    title: "Proyecto MAC Service Manager - Líder de Proyecto",
    description: "Máximo reconocimiento en Ingeniería de Requerimientos y Arquitectura de Software. Levantamiento completo de requerimientos y diseño de arquitectura con cliente real.",
    type: "achievement",
    tags: ["Requirements", "Architecture", "Leadership"],
  },
  {
    id: "timeline-scrum",
    date: "2025-01-01",
    title: "Scrum Master - Plataforma de Cursos AWS",
    description: "Facilitación de ceremonias Scrum, coordinación con desarrolladores y gestión del backlog técnico en proyecto IEEE.",
    type: "experience",
    tags: ["Scrum", "AWS", "Leadership"],
  },
  // 2024
  {
    id: "timeline-pmi",
    date: "2024-07-01",
    title: "Congreso Internacional PMI Sur",
    description: "Voluntario en el Congreso Internacional PMI Sur Perú, apoyo logístico y coordinación.",
    type: "experience",
    tags: ["PMI", "Volunteer", "Event"],
  },
  {
    id: "timeline-ingenia",
    date: "2024-04-01",
    title: "Director de Proyecto AsociaT - Ingenia",
    description: "Planificación, coordinación de equipos, liderazgo y ejecución de proyecto social AsociaT.",
    type: "project",
    tags: ["Leadership", "Social Impact", "Project Management"],
  },
  {
    id: "timeline-university",
    date: "2022-03-01",
    title: "Inicio de Carrera Universitaria",
    description: "Ingreso a la Universidad Nacional de San Agustín. Doble carrera: Ingeniería de Sistemas y Administración. Becario PRONABEC.",
    type: "education",
    tags: ["University", "UNSA", "PRONABEC"],
  },
];

// ── Perfil completo ──
export const PROFILE_DATA: UserProfile = {
  id: "jhamil-turpo",
  name: "Jhamil Yeyder Turpo Añasco",
  title: "Fullstack Developer & Project Manager",
  bio: "Estudiante de Ingeniería de Sistemas con formación complementaria en Administración en la UNSA, cursando el 9.° ciclo, perteneciente al tercio superior, becario PRONABEC. Experiencia en desarrollo Full Stack, arquitectura de software y liderazgo de proyectos tecnológicos.",
  avatar: "images/profile/perfil_portfolio.png",
  social: {
    github: "https://github.com/YeyderJHJL",
    linkedin: "https://www.linkedin.com/in/jhamil-yeyder-turpo",
    instagram: "https://www.instagram.com/jh_jl_yeyder/",
    facebook: "https://web.facebook.com/profile.php?id=100085333879369",
    email: "jturpoan@unsa.edu.pe",
    website: "https://portfolio-jh-pi.vercel.app/",
  },
  story: `Soy estudiante de 9.° ciclo de Ingeniería de Sistemas y 5.° ciclo de Administración en la Universidad Nacional de San Agustín, becario PRONABEC desde 2022 y perteneciente al tercio superior. Mi trayectoria combina desarrollo de software con liderazgo y gestión de proyectos.

Actualmente trabajo como Desarrollador Full Stack en IDEMA – Ingeniería y Datos, donde lidero la migración del portal corporativo a React, diseño arquitecturas escalables con Next.js, Nest.js, PostgreSQL y Prisma, y ejecuto proyectos bajo Scrum.

Fui Finalista Internacional en el NASA Space Apps Challenge 2025 con el proyecto BioForecast, una plataforma de análisis de datos satelitales para agricultura sostenible. También lideré técnicamente el MVP de EnWuan (Startup Perú 13G) con integración de Google Gemini AI, y desarrollé ValixAI en la Hackatón Plateada.

En liderazgo organizacional, soy Fundador y Presidente de LEAD UNSA, fui Presidente de DESOGEP ACM UNSA (2025), y mantengo roles activos en PMI Sur Perú como Director de Patrocinios y TI, e Ingenia como Director de Proyectos.

Mi interés está enfocado en desarrollo de software y transformación digital, donde pueda aportar mis capacidades técnicas, analíticas y de liderazgo en entornos de innovación.`,
  skills: SKILLS_DATA,
  certifications: CERTIFICATIONS_DATA,
  timeline: TIMELINE_DATA,
};
