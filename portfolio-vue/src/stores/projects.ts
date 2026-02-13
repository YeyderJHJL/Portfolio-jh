import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Project } from "../types";

// ============================================================
// MOCK DATA
// Reemplazar con llamadas API en producción
// ============================================================

const MOCK_PROJECTS: Project[] = [
  {
    id: "bioforecast",
    title: "BioForecast - NASA Space Apps Challenge",
    slug: "bioforecast",
    shortDescription: "Finalista Internacional y Nominado Global - Plataforma de análisis satelital para agricultura sostenible.",
    fullDescription: "Desarrollo de plataforma web para análisis de datos satelitales y aptitud de suelo para agricultura sostenible. Integración de APIs, análisis de datos y despliegue en Vercel. Trabajo en equipo con desarrolladores avanzados y mentores técnicos.",
    problem: "Necesidad de analizar datos satelitales para determinar aptitud de suelo en agricultura sostenible.",
    solution: "Plataforma web con integración de APIs de datos satelitales, procesamiento de información y visualización de aptitud de suelo.",
    stack: {
      technologies: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL"],
      tools: ["Tailwind CSS", "Jest"],
      methodologies: ["Agile"],
      platforms: ["Vercel", "Docker"],
      domains: ["AI", "Education", "Social Impact"],
      skills: ["Coordination", "Mentoring"],
    },
    images: {
      thumbnail: "https://via.placeholder.com/400x300?text=BioForecast",
      hero: "https://via.placeholder.com/1200x600?text=BioForecast",
      screenshots: ["https://via.placeholder.com/800x400?text=Screenshot+1"],
    },
    challenges: [
      {
        title: "Integración de APIs satelitales",
        description: "Conectar múltiples fuentes de datos satelitales y procesarlos en tiempo real.",
        solution: "Implementación de pipeline de datos con Node.js y estandarización de formatos.",
        impact: "Procesamiento eficiente de datos y visualización clara para agricultores.",
        lessonsLearned: "Importancia de la estandarización de datos en proyectos de integración.",
      },
    ],
    keyFeatures: [
      "Análisis de datos satelitales en tiempo real",
      "Visualización de aptitud de suelo",
      "Integración de múltiples APIs",
      "Dashboard interactivo",
      "Despliegue en cloud"
    ],
    metrics: [
      { label: "Reconocimiento", value: "Finalista Internacional" },
      { label: "Alcance", value: "Nominación Global" }
    ],
    links: [
      { label: "Ver Demo", url: "https://bioforecast.vercel.app", icon: "external-link", type: "demo" }
    ],
    featured: true,
    startDate: "2025-10-01",
    endDate: "2025-10-31",
    tags: ["react", "nodejs", "satellite-data", "nasa", "hackathon"],
    category: { category: "software" },
    status: "completed",
  },
  {
    id: "flowtechai",
    title: "FlowTechAI - Hackatón Innovasur",
    slug: "flowtechai",
    shortDescription: "Líder de Equipo - Prototipo AI reconocido competente en el mercado.",
    fullDescription: "Liderazgo técnico y organizacional de equipo multidisciplinario (TI, ingeniería, ciencias, economía, administración). Coordinación del flujo de trabajo, definición técnica y pitch final. Desarrollo de prototipo funcional con diseño de arquitectura y validación técnica.",
    problem: "Necesidad de crear un prototipo AI funcional en tiempo limitado con equipo diverso.",
    solution: "Coordinación de flujo de trabajo ágil, definición de arquitectura técnica y desarrollo de prototipo validado.",
    stack: {
      technologies: ["React", "Node.js", "MongoDB"],
      tools: ["Figma"],
      methodologies: ["Agile", "Design Thinking"],
      platforms: ["Vercel"],
      domains: ["AI", "Startups"],
      skills: ["Leadership", "Coordination", "Mentoring"],
    },
    images: {
      thumbnail: "https://via.placeholder.com/400x300?text=FlowTechAI",
      hero: "https://via.placeholder.com/1200x600?text=FlowTechAI",
      screenshots: ["https://via.placeholder.com/800x400?text=Screenshot+1"],
    },
    challenges: [
      {
        title: "Coordinación de equipo multidisciplinario",
        description: "Integrar roles de TI, ingeniería, ciencias y administración en 48 horas.",
        solution: "Asignación clara de responsabilidades y metodología ágil adaptada.",
        impact: "Prototipo funcional reconocido como competente en el mercado.",
        lessonsLearned: "La diversidad de equipo acelera la innovación si se gestiona bien.",
      },
    ],
    keyFeatures: [
      "Prototipo funcional AI",
      "Diseño de arquitectura escalable",
      "Validación técnica del concepto",
      "Pitch competitivo presentado"
    ],
    metrics: [
      { label: "Reconocimiento", value: "Competente en mercado" },
      { label: "Equipo", value: "5 disciplinas" }
    ],
    links: [
      { label: "Ver Prototipo", url: "https://rigor-even-07466876.figma.site", icon: "external-link", type: "demo" }
    ],
    featured: true,
    startDate: "2025-10-15",
    endDate: "2025-10-17",
    tags: ["ai", "hackathon", "figma", "team-lead"],
    category: { category: "software" },
    status: "completed",
  },
  {
    id: "aws-courses-platform",
    title: "Plataforma de Cursos AWS - IEEE",
    slug: "aws-courses-platform",
    shortDescription: "Scrum Master - Plataforma educativa con cursos de AWS.",
    fullDescription: "Facilitación de ceremonias Scrum y coordinación con desarrolladores. Gestión del avance técnico, comunicación y eliminación de bloqueos. Seguimiento del backlog técnico de la plataforma. Apoyo con la arquitectura del backend.",
    problem: "Necesidad de una plataforma educativa para cursos AWS con gestión ágil del proyecto.",
    solution: "Implementación de Scrum, coordinación de equipo de desarrollo y arquitectura backend escalable.",
    stack: {
      technologies: ["React", "Vite", "Node.js", "Express", "PostgreSQL"],
      tools: ["Jest"],
      methodologies: ["Scrum"],
      platforms: ["AWS", "Docker"],
      domains: ["Education"],
      skills: ["Leadership", "QA", "Coordination"],
    },
    images: {
      thumbnail: "https://via.placeholder.com/400x300?text=AWS+Platform",
      hero: "https://via.placeholder.com/1200x600?text=AWS+Platform",
      screenshots: ["https://via.placeholder.com/800x400?text=Screenshot+1"],
    },
    challenges: [
      {
        title: "Gestión ágil con equipo técnico",
        description: "Facilitar Scrum en equipo de desarrolladores con diferentes niveles de experiencia.",
        solution: "Ceremonias adaptadas, seguimiento constante y comunicación efectiva.",
        impact: "Entrega exitosa de sprints y plataforma funcional.",
        lessonsLearned: "El rol de Scrum Master es clave para mantener el ritmo en equipos juniors.",
      },
    ],
    keyFeatures: [
      "Sistema de gestión de cursos",
      "Integración con AWS services",
      "Panel de administración",
      "Sistema de certificados"
    ],
    metrics: [
      { label: "Duración", value: "4 meses" },
      { label: "Rol", value: "Scrum Master" }
    ],
    links: [],
    featured: true,
    startDate: "2025-01-01",
    endDate: "2025-04-30",
    tags: ["scrum", "aws", "react", "nodejs", "agile"],
    category: { category: "software" },
    status: "completed",
  },
  {
    id: "isc-website",
    title: "Impact Startup Competition - Plataforma Web",
    slug: "isc-website",
    shortDescription: "Coordinador TI - Mantenimiento y testing de plataforma WordPress.",
    fullDescription: "Actualización y mantenimiento del sitio web (WordPress). Testing funcional, QA y soporte a la plataforma digital de ISC. Soporte técnico a participantes finalistas. Coordinación de equipos tecnológicos.",
    problem: "Necesidad de mantener y mejorar plataforma digital para competencia de startups.",
    solution: "Implementación de testing QA, actualizaciones de WordPress y soporte técnico continuo.",
    stack: {
      technologies: ["WordPress", "PHP", "MySQL", "HTML", "CSS", "JavaScript"],
      tools: [],
      methodologies: [],
      platforms: ["WordPress"],
      domains: ["Startups", "Social Impact"],
      skills: ["QA", "Coordination", "Mentoring"],
    },
    images: {
      thumbnail: "https://via.placeholder.com/400x300?text=ISC+Platform",
      hero: "https://via.placeholder.com/1200x600?text=ISC+Platform",
      screenshots: ["https://via.placeholder.com/800x400?text=Screenshot+1"],
    },
    challenges: [
      {
        title: "Testing y QA en producción",
        description: "Garantizar funcionamiento óptimo durante competencia activa.",
        solution: "Implementación de testing manual sistemático y fixes rápidos.",
        impact: "Plataforma estable durante toda la competencia.",
        lessonsLearned: "El testing continuo es esencial en plataformas de eventos.",
      },
    ],
    keyFeatures: [
      "Gestión de contenido WordPress",
      "Testing funcional completo",
      "Soporte técnico a usuarios",
      "Actualizaciones en tiempo real"
    ],
    metrics: [
      { label: "Uptime", value: "99.9%" },
      { label: "Usuarios", value: "100+ participantes" }
    ],
    links: [],
    featured: false,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    tags: ["wordpress", "qa", "testing", "support"],
    category: { category: "software" },
    status: "in-progress",
  },
  {
    id: "hack4edu",
    title: "Hack4Edu - Coordinación Local UNSA",
    slug: "hack4edu",
    shortDescription: "Director de Proyecto - Organización de hackatón internacional.",
    fullDescription: "Planificación y ejecución de la hackatón en coordinación con organización internacional. Gestión de participantes, definición de lineamientos técnicos, soporte a equipos. Implementación y aseguramiento de calidad de los requisitos tecnológicos del evento.",
    problem: "Necesidad de coordinar hackatón internacional con estándares de calidad elevados.",
    solution: "Implementación de plan operativo, gestión de stakeholders y aseguramiento de calidad técnica.",
    stack: {
      technologies: [],
      tools: [],
      methodologies: ["Agile"],
      platforms: ["Vercel"],
      domains: ["Education", "Social Impact"],
      skills: ["Leadership", "Coordination", "Mentoring"],
    },
    images: {
      thumbnail: "https://via.placeholder.com/400x300?text=Hack4Edu",
      hero: "https://via.placeholder.com/1200x600?text=Hack4Edu",
      screenshots: ["https://via.placeholder.com/800x400?text=Screenshot+1"],
    },
    challenges: [
      {
        title: "Coordinación internacional",
        description: "Gestionar evento con organización internacional y cumplir estándares.",
        solution: "Comunicación constante, planificación detallada y seguimiento riguroso.",
        impact: "Evento exitoso reconocido internacionalmente.",
        lessonsLearned: "La coordinación internacional requiere flexibilidad cultural.",
      },
    ],
    keyFeatures: [
      "Planificación de evento internacional",
      "Gestión de 50+ participantes",
      "Lineamientos técnicos",
      "Soporte a equipos multidisciplinarios"
    ],
    metrics: [
      { label: "Participantes", value: "50+" },
      { label: "Duración", value: "3 semanas" },
      { label: "Equipos", value: "15+" }
    ],
    links: [],
    featured: true,
    startDate: "2025-10-01",
    endDate: "2025-10-21",
    tags: ["pm", "coordination", "event", "international"],
    category: { category: "event" },
    status: "completed",
  },
  {
    id: "hackumbre",
    title: "Hackumbre - Innovación y Startups",
    slug: "hackumbre",
    shortDescription: "Organizador - Coordinación operativa y soporte tecnológico.",
    fullDescription: "Coordinación operativa, soporte tecnológico y acompañamiento a equipos de desarrollo. Diseño de soluciones digitales e incubación de startups. Enfoque en innovación y emprendimiento tecnológico.",
    problem: "Necesidad de organizar programa de innovación y startups con componente técnico fuerte.",
    solution: "Coordinación de logística, soporte técnico a equipos y diseño de soluciones digitales.",
    stack: {
      technologies: [],
      tools: [],
      methodologies: ["Agile"],
      platforms: [],
      domains: ["Startups", "Social Impact"],
      skills: ["Coordination", "Mentoring"],
    },
    images: {
      thumbnail: "https://via.placeholder.com/400x300?text=Hackumbre",
      hero: "https://via.placeholder.com/1200x600?text=Hackumbre",
      screenshots: ["https://via.placeholder.com/800x400?text=Screenshot+1"],
    },
    challenges: [
      {
        title: "Soporte técnico a múltiples equipos",
        description: "Acompañar técnicamente a equipos con diferentes niveles de madurez.",
        solution: "Mentoría adaptada, recursos técnicos y seguimiento personalizado.",
        impact: "Equipos con prototipos funcionales y validados.",
        lessonsLearned: "La mentoría escalable es clave en programas de incubación.",
      },
    ],
    keyFeatures: [
      "Coordinación operativa",
      "Soporte técnico a startups",
      "Diseño de soluciones digitales",
      "Incubación de proyectos"
    ],
    metrics: [
      { label: "Startups", value: "20+" },
      { label: "Prototipos", value: "15+" }
    ],
    links: [],
    featured: false,
    startDate: "2025-12-01",
    endDate: "2025-12-15",
    tags: ["pm", "startups", "innovation", "mentoring"],
    category: { category: "event" },
    status: "completed",
  },
  {
    id: "desogep-acm",
    title: "DESOGEP ACM UNSA - Proyectos Colaborativos",
    slug: "desogep-acm",
    shortDescription: "Coordinador de Programa - Seguimiento a equipos de desarrollo.",
    fullDescription: "Seguimiento a equipos, ideación, prototipado y validación de soluciones tecnológicas. Coordinación de proyectos colaborativos entre estudiantes. Gestión de recursos y facilitación de trabajo en equipo.",
    problem: "Necesidad de coordinar múltiples proyectos colaborativos entre estudiantes.",
    solution: "Implementación de metodología de seguimiento, facilitación y validación de prototipos.",
    stack: {
      technologies: [],
      tools: [],
      methodologies: ["Agile"],
      platforms: [],
      domains: ["Education"],
      skills: ["Leadership", "Coordination", "Mentoring"],
    },
    images: {
      thumbnail: "https://via.placeholder.com/400x300?text=DESOGEP",
      hero: "https://via.placeholder.com/1200x600?text=DESOGEP",
      screenshots: ["https://via.placeholder.com/800x400?text=Screenshot+1"],
    },
    challenges: [
      {
        title: "Gestión de múltiples proyectos simultáneos",
        description: "Coordinar y dar seguimiento a varios equipos en paralelo.",
        solution: "Sistema de seguimiento estructurado y reuniones periódicas.",
        impact: "10+ proyectos completados exitosamente.",
        lessonsLearned: "La facilitación proactiva acelera el progreso de equipos.",
      },
    ],
    keyFeatures: [
      "Coordinación de equipos",
      "Ideación de proyectos",
      "Prototipado",
      "Validación técnica"
    ],
    metrics: [
      { label: "Proyectos", value: "10+" },
      { label: "Duración", value: "6 meses" }
    ],
    links: [],
    featured: false,
    startDate: "2025-07-01",
    endDate: "2025-12-31",
    tags: ["pm", "coordination", "student-projects"],
    category: { category: "project-management" },
    status: "completed",
  },
  {
    id: "conema-gp",
    title: "CONEMA GP - Gestión de Contenido",
    slug: "conema-gp",
    shortDescription: "Subcoordinador - Gestión de ponentes y contenido técnico.",
    fullDescription: "Gestión de información técnica, coordinación logística y flujo comunicacional con speakers. Contacto directo con ponentes nacionales e internacionales. Organización de agenda y contenidos del evento.",
    problem: "Necesidad de coordinar ponentes y contenido técnico para evento académico.",
    solution: "Sistema de gestión de contactos, coordinación logística y flujo de comunicación efectivo.",
    stack: {
      technologies: [],
      tools: [],
      methodologies: [],
      platforms: [],
      domains: ["Education"],
      skills: ["Coordination", "Leadership"],
    },
    images: {
      thumbnail: "https://via.placeholder.com/400x300?text=CONEMA",
      hero: "https://via.placeholder.com/1200x600?text=CONEMA",
      screenshots: ["https://via.placeholder.com/800x400?text=Screenshot+1"],
    },
    challenges: [
      {
        title: "Coordinación con ponentes internacionales",
        description: "Gestionar comunicación y logística con speakers de diferentes países.",
        solution: "Comunicación estructurada, seguimiento riguroso y backup plans.",
        impact: "Evento exitoso con 20+ ponentes confirmados.",
        lessonsLearned: "La planificación de contingencias es vital en eventos internacionales.",
      },
    ],
    keyFeatures: [
      "Gestión de speakers",
      "Coordinación logística",
      "Flujo comunicacional",
      "Organización de agenda"
    ],
    metrics: [
      { label: "Ponentes", value: "20+" },
      { label: "Asistentes", value: "500+" }
    ],
    links: [],
    featured: false,
    startDate: "2025-12-01",
    endDate: "2025-12-15",
    tags: ["pm", "coordination", "event-management"],
    category: { category: "event" },
    status: "completed",
  },
  {
    id: "ingenia-asociat",
    title: "AsociaT - Ingenia",
    slug: "ingenia-asociat",
    shortDescription: "Director de Proyecto - Planificación y ejecución de proyecto social.",
    fullDescription: "Planificación, coordinación de equipos, liderazgo y ejecución de actividades. Diseño de estrategias y comunicación. Proyecto enfocado en asociatividad y trabajo colaborativo.",
    problem: "Necesidad de crear proyecto de impacto social con componente organizacional fuerte.",
    solution: "Implementación de metodología de gestión de proyectos, liderazgo de equipos y estrategias de comunicación.",
    stack: {
      technologies: [],
      tools: [],
      methodologies: ["Agile"],
      platforms: [],
      domains: ["Social Impact"],
      skills: ["Leadership", "Coordination", "Mentoring"],
    },
    images: {
      thumbnail: "https://via.placeholder.com/400x300?text=AsociaT",
      hero: "https://via.placeholder.com/1200x600?text=AsociaT",
      screenshots: ["https://via.placeholder.com/800x400?text=Screenshot+1"],
    },
    challenges: [
      {
        title: "Liderazgo de proyecto social",
        description: "Dirigir proyecto con impacto social medible y equipos multidisciplinarios.",
        solution: "Metodología de gestión adaptada, comunicación efectiva y seguimiento de KPIs.",
        impact: "Proyecto completado con impacto en 100+ personas.",
        lessonsLearned: "El liderazgo inclusivo maximiza el impacto social.",
      },
    ],
    keyFeatures: [
      "Planificación estratégica",
      "Liderazgo de equipos",
      "Gestión de stakeholders",
      "Medición de impacto"
    ],
    metrics: [
      { label: "Impacto", value: "100+ personas" },
      { label: "Equipo", value: "15 voluntarios" }
    ],
    links: [],
    featured: false,
    startDate: "2024-04-01",
    endDate: "2024-12-31",
    tags: ["pm", "social-impact", "leadership"],
    category: { category: "project-management" },
    status: "completed",
  },
  {
    id: "ingenia-camping",
    title: "Ingenia Camping",
    slug: "ingenia-camping",
    shortDescription: "Director de Proyecto - Organización de evento formativo.",
    fullDescription: "Planificación, coordinación de equipos, liderazgo y ejecución de actividades. Diseño de estrategias y comunicación para evento formativo tipo camping.",
    problem: "Necesidad de organizar evento formativo tipo camping con logística compleja.",
    solution: "Plan operativo detallado, gestión de equipos y coordinación logística multi-área.",
    stack: {
      technologies: [],
      tools: [],
      methodologies: ["Agile"],
      platforms: [],
      domains: ["Education"],
      skills: ["Leadership", "Coordination"],
    },
    images: {
      thumbnail: "https://via.placeholder.com/400x300?text=Camping",
      hero: "https://via.placeholder.com/1200x600?text=Camping",
      screenshots: ["https://via.placeholder.com/800x400?text=Screenshot+1"],
    },
    challenges: [
      {
        title: "Logística compleja multi-área",
        description: "Coordinar alojamiento, alimentación, actividades y seguridad simultáneamente.",
        solution: "División por áreas, responsables específicos y plan de contingencia.",
        impact: "Evento exitoso con 80+ participantes.",
        lessonsLearned: "La división de responsabilidades reduce riesgos en logística.",
      },
    ],
    keyFeatures: [
      "Planificación logística",
      "Coordinación de equipos",
      "Gestión de recursos",
      "Actividades formativas"
    ],
    metrics: [
      { label: "Participantes", value: "80+" },
      { label: "Duración", value: "3 días" }
    ],
    links: [],
    featured: false,
    startDate: "2025-06-01",
    endDate: "2025-06-15",
    tags: ["pm", "event-management", "logistics"],
    category: { category: "event" },
    status: "completed",
  },
  {
    id: "pmi-congreso",
    title: "PMI Sur Perú - Congreso Internacional",
    slug: "pmi-congreso",
    shortDescription: "Voluntario - Apoyo en organización de congreso internacional.",
    fullDescription: "Voluntario en el Congreso Internacional PMI Sur. Apoyo logístico, coordinación de actividades y soporte a asistentes. Networking con profesionales de gestión de proyectos.",
    problem: "Necesidad de soporte operativo para congreso internacional de gran escala.",
    solution: "Voluntariado organizado con roles definidos y protocolos de atención.",
    stack: {
      technologies: [],
      tools: [],
      methodologies: [],
      platforms: [],
      domains: ["Education"],
      skills: ["Coordination"],
    },
    images: {
      thumbnail: "https://via.placeholder.com/400x300?text=PMI",
      hero: "https://via.placeholder.com/1200x600?text=PMI",
      screenshots: ["https://via.placeholder.com/800x400?text=Screenshot+1"],
    },
    challenges: [
      {
        title: "Atención a asistentes internacionales",
        description: "Brindar soporte de calidad a participantes de diferentes países.",
        solution: "Protocolo de atención, coordinación en equipo y respuesta rápida.",
        impact: "Evento calificado con 4.8/5 en satisfacción.",
        lessonsLearned: "El servicio al cliente es clave en eventos profesionales.",
      },
    ],
    keyFeatures: [
      "Soporte logístico",
      "Coordinación de actividades",
      "Atención a asistentes",
      "Networking profesional"
    ],
    metrics: [
      { label: "Asistentes", value: "300+" },
      { label: "Satisfacción", value: "4.8/5" }
    ],
    links: [],
    featured: false,
    startDate: "2024-07-01",
    endDate: "2024-07-03",
    tags: ["pm", "event", "volunteer"],
    category: { category: "event" },
    status: "completed",
  },
  {
    id: "pmi-taller",
    title: "PMI - Primer Taller Presencial PIBPGPM",
    slug: "pmi-taller",
    shortDescription: "Organizador - Taller presencial de gestión de proyectos.",
    fullDescription: "Organización del Primer Taller Presencial PIBPGPM. Coordinación logística, gestión de participantes y facilitación del evento. Enfoque en buenas prácticas de gestión de proyectos.",
    problem: "Necesidad de organizar primer taller presencial de gestión de proyectos en la región.",
    solution: "Planificación detallada, coordinación con facilitadores y logística eficiente.",
    stack: {
      technologies: [],
      tools: [],
      methodologies: ["Agile"],
      platforms: [],
      domains: ["Education"],
      skills: ["Leadership", "Coordination"],
    },
    images: {
      thumbnail: "https://via.placeholder.com/400x300?text=PMI+Taller",
      hero: "https://via.placeholder.com/1200x600?text=PMI+Taller",
      screenshots: ["https://via.placeholder.com/800x400?text=Screenshot+1"],
    },
    challenges: [
      {
        title: "Primer evento presencial post-pandemia",
        description: "Organizar evento presencial con nuevos protocolos y expectativas altas.",
        solution: "Planificación híbrida, medidas de seguridad y contenido de calidad.",
        impact: "Evento exitoso replicado en otras ciudades.",
        lessonsLearned: "La adaptación a cambios externos acelera la innovación en eventos.",
      },
    ],
    keyFeatures: [
      "Organización de taller",
      "Coordinación logística",
      "Gestión de participantes",
      "Facilitación de contenido"
    ],
    metrics: [
      { label: "Participantes", value: "50+" },
      { label: "Satisfacción", value: "4.7/5" }
    ],
    links: [],
    featured: false,
    startDate: "2025-05-01",
    endDate: "2025-05-15",
    tags: ["pm", "workshop", "training"],
    category: { category: "event" },
    status: "completed",
  },
  {
    id: "pmi-cumbre",
    title: "5ta Cumbre Nacional de Dirección de Proyectos",
    slug: "pmi-cumbre",
    shortDescription: "Organizador - Cumbre nacional Perú Proyectando 2025.",
    fullDescription: "Organización de la 5ta Cumbre Nacional de Dirección de Proyectos - Perú Proyectando 2025. Coordinación de logística, ponentes nacionales e internacionales, y gestión de participantes.",
    problem: "Necesidad de organizar cumbre nacional de alto nivel con múltiples stakeholders.",
    solution: "Equipo de trabajo estructurado, comunicación efectiva y coordinación multi-ciudad.",
    stack: {
      technologies: [],
      tools: [],
      methodologies: ["Agile"],
      platforms: [],
      domains: ["Education"],
      skills: ["Leadership", "Coordination"],
    },
    images: {
      thumbnail: "https://via.placeholder.com/400x300?text=Cumbre",
      hero: "https://via.placeholder.com/1200x600?text=Cumbre",
      screenshots: ["https://via.placeholder.com/800x400?text=Screenshot+1"],
    },
    challenges: [
      {
        title: "Coordinación multi-ciudad",
        description: "Organizar evento nacional con sedes en diferentes ciudades simultáneamente.",
        solution: "Coordinadores por ciudad, comunicación centralizada y tecnología de streaming.",
        impact: "Evento nacional exitoso con 500+ participantes.",
        lessonsLearned: "La tecnología de streaming facilita la escalabilidad de eventos.",
      },
    ],
    keyFeatures: [
      "Organización nacional",
      "Coordinación multi-ciudad",
      "Gestión de ponentes",
      "Streaming simultáneo"
    ],
    metrics: [
      { label: "Participantes", value: "500+" },
      { label: "Ciudades", value: "5" }
    ],
    links: [],
    featured: false,
    startDate: "2025-07-01",
    endDate: "2025-07-15",
    tags: ["pm", "event", "national", "multi-city"],
    category: { category: "event" },
    status: "completed",
  },
];

// ============================================================
// TYPES
// ============================================================

export type SortOption =
  | 'latest'
  | 'oldest'
  | 'name-asc'
  | 'name-desc'
  | `year-${number}`;

// ============================================================
// STORE
// ============================================================

export const useProjectsStore = defineStore('projects', () => {
  // STATE (source of truth)
  const projects = ref<Project[]>(MOCK_PROJECTS)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Filters state
  const searchQuery = ref('')
  const selectedStacks = ref<string[]>([])
  const selectedCategory = ref<string | null>(null)
  const sortBy = ref<SortOption>('latest')

  // ============================================================
  // HELPERS (pure functions, no reactive logic)
  // ============================================================

  /**
   * Returns a flat, unique and sorted stack list for a project
   */
  const getStacksForProject = (project: Project): string[] => {
    if (!project.stack) return []

    return Array.from(
      new Set(
        Object.values(project.stack)
          .flat()
          .filter(Boolean)
      )
    ).sort()
  }

  const availableYears = computed<number[]>(() => {
    const years = new Set<number>();

    projects.value.forEach(project => {
      if (project.endDate) {
        years.add(new Date(project.endDate).getFullYear());
      }
    });

    return Array.from(years).sort((a, b) => b - a); // más reciente primero
  });

  // ============================================================
  // COMPUTED — DOMAIN / BUSINESS
  // ============================================================

  /**
   * Featured projects (used in Home)
   */
  const featuredProjects = computed(() =>
    projects.value
      .filter(p => p.featured)
      .sort(
        (a, b) =>
          new Date(b.endDate).getTime() -
          new Date(a.endDate).getTime()
      )
      .slice(0, 3)
  )

  /**
   * All unique stack options across projects (for filters)
   */
  const allStackOptions = computed(() => {
    const stackSet = new Set<string>()

    projects.value.forEach(project => {
      getStacksForProject(project).forEach(stack =>
        stackSet.add(stack)
      )
    })

    return Array.from(stackSet).sort()
  })

  /**
   * Projects grouped by category
   */
  const projectsByCategory = computed(() => {
    const map: Record<string, Project[]> = {}

    projects.value.forEach(project => {
      const key = project.category?.category ?? 'other'
      if (!map[key]) map[key] = []
      map[key].push(project)
    })

    return map
  })

  /**
   * Get project by id
   */
  const projectById = computed(() => {
    return (id: string) =>
      projects.value.find(p => p.id === id)
  })

  const totalProjects = computed(() => projects.value.length)

  // ============================================================
  // COMPUTED — FILTERING & SORTING
  // ============================================================

  /**
   * Projects after applying search, stack & category filters
   */
  const filteredProjects = computed(() => {
    let results = [...projects.value]

    // --- Search (title, descriptions, tags)
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase()

      results = results.filter(project =>
        project.title.toLowerCase().includes(query) ||
        project.shortDescription.toLowerCase().includes(query) ||
        project.fullDescription.toLowerCase().includes(query) ||
        project.tags?.some(tag =>
          tag.toLowerCase().includes(query)
        )
      )
    }

    // --- Stack filter
    if (selectedStacks.value.length > 0) {
      results = results.filter(project => {
        const projectStacks = getStacksForProject(project).map(s =>
          s.toLowerCase()
        )

        return selectedStacks.value.every(selected =>
          projectStacks.includes(selected.toLowerCase())
        )
      })
    }

    // --- Category filter
    if (selectedCategory.value) {
      results = results.filter(
        project =>
          project.category?.category ===
          selectedCategory.value
      )
    }

    return results
  })

  /**
   * Final sorted result (used directly by UI)
   */
  const sortedProjects = computed(() => {
    const results = [...filteredProjects.value]

    if (sortBy.value.startsWith('year-')) {
      const year = Number(sortBy.value.split('-')[1]);

      return results
        .filter(p => new Date(p.endDate).getFullYear() === year)
        .sort(
          (a, b) =>
            new Date(b.endDate).getTime() -
            new Date(a.endDate).getTime()
        );
    }

    switch (sortBy.value) {
      case 'latest':
        return results.sort(
          (a, b) =>
            new Date(b.endDate).getTime() -
            new Date(a.endDate).getTime()
        )

      case 'oldest':
        return results.sort(
          (a, b) =>
            new Date(a.endDate).getTime() -
            new Date(b.endDate).getTime()
        )

      case 'name-asc':
        return results.sort((a, b) =>
          a.title.localeCompare(b.title)
        )

      case 'name-desc':
        return results.sort((a, b) =>
          b.title.localeCompare(a.title)
        )

      default:
        return results
    }
  })

  // ============================================================
  // ACTIONS — ASYNC / MUTATIONS
  // ============================================================

  const fetchProjects = async (): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      // Simulated API call
      await new Promise(resolve =>
        setTimeout(resolve, 800)
      )
    } catch (err) {
      error.value =
        err instanceof Error
          ? err.message
          : 'Error fetching projects'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // ============================================================
  // ACTIONS — FILTER SETTERS
  // ============================================================

  const setSearchQuery = (query?: string): void => {
    searchQuery.value = query || ''
  }

  const setSelectedStacks = (stacks?: string[]): void => {
    selectedStacks.value = stacks || []
  }

  const setSelectedCategory = (
    category?: string | null
  ): void => {
    selectedCategory.value = category || null
  }

  const setSortBy = (sort?: SortOption): void => {
    sortBy.value = sort || 'latest'
  }

  const clearFilters = (): void => {
    searchQuery.value = ''
    selectedStacks.value = []
    selectedCategory.value = null
    sortBy.value = 'latest'
  }

  // ============================================================
  // ACTIONS — ERROR
  // ============================================================

  const clearError = (): void => {
    error.value = null
  }

  // ============================================================
  // PUBLIC API
  // ============================================================

  return {
    // State
    projects,
    loading,
    error,
    searchQuery,
    selectedStacks,
    selectedCategory,
    sortBy,

    // Domain
    featuredProjects,
    projectsByCategory,
    projectById,
    totalProjects,
    availableYears,

    // Filters
    allStackOptions,
    filteredProjects,
    sortedProjects,

    // Actions
    fetchProjects,
    setSearchQuery,
    setSelectedStacks,
    setSelectedCategory,
    setSortBy,
    clearFilters,
    getStacksForProject,
    clearError,
  }
})

