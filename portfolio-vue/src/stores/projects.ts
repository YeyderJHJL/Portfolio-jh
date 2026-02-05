import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Project } from "../types";

// ============================================================
// MOCK DATA
// Reemplazar con llamadas API en producción
// ============================================================

const MOCK_PROJECTS: Project[] = [
  // ========================
  // PROYECTOS TI
  // ========================
  {
    id: "bioforecast",
    title: "BioForecast - Plataforma de análisis satelital",
    slug: "bioforecast",
    shortDescription: "Web para análisis de datos satelitales y aptitud de suelo.",
    fullDescription: "Plataforma web para análisis de datos satelitales aplicada a agricultura sostenible, con integración de APIs y despliegue en Vercel.",
    problem: "Necesidad de análisis rápido y confiable de datos satelitales para cultivos sostenibles.",
    solution: "Implementación de plataforma web con integración de APIs, análisis de datos en tiempo real y despliegue cloud.",
    techStack: {
      frontend: ["React", "TypeScript", "Tailwind CSS"],
      backend: ["Node.js", "Express"],
      database: ["PostgreSQL"],
      devOps: ["Vercel", "Docker"],
      testing: ["Jest"],
    },
    images: {
      thumbnail: "https://via.placeholder.com/400x300?text=BioForecast",
      hero: "https://via.placeholder.com/1200x600?text=BioForecast",
      screenshots: ["https://via.placeholder.com/800x400?text=Screenshot+1"],
    },
    challenges: [
      {
        title: "Integración de APIs",
        description: "Conectar múltiples fuentes de datos satelitales y agrícolas.",
        solution: "Uso de fetch/axios y estandarización de datos.",
        impact: "Procesamiento de datos más rápido y confiable.",
      },
    ],
    keyFeatures: [
      "Dashboard de análisis satelital",
      "Visualización de aptitud de suelo",
      "Integración de múltiples APIs",
      "Despliegue en cloud"
    ],
    metrics: [
      { label: "Usuarios beta", value: "50+" },
      { label: "Tiempo de carga promedio", value: "<1s" }
    ],
    links: [
      { label: "Ver Demo", url: "https://bioforecast.vercel.app", icon: "external-link" }
    ],
    featured: true,
    startDate: "2025-10-01",
    endDate: "2025-10-31",
    tags: ["react", "nodejs", "satellite-data", "analytics"],
    category: "fullstack",
  },
  {
    id: "flowtechai",
    title: "FlowTechAI - Hackatón Innovasur",
    slug: "flowtechai",
    shortDescription: "Prototipo AI desarrollado en hackatón, reconocido en mercado.",
    fullDescription: "Desarrollo de prototipo funcional con coordinación de equipo multidisciplinario, diseño de arquitectura y validación técnica.",
    problem: "Necesidad de crear prototipos rápidos y funcionales en hackatón con un equipo diverso.",
    solution: "Definición de flujo de trabajo, coordinación técnica y diseño de arquitectura para validar el prototipo.",
    techStack: {
      frontend: ["Figma", "React"],
      backend: ["Node.js"],
      database: ["MongoDB"],
      devOps: ["Vercel"],
      testing: [],
    },
    images: {
      thumbnail: "https://via.placeholder.com/400x300?text=FlowTechAI",
      hero: "https://via.placeholder.com/1200x600?text=FlowTechAI",
      screenshots: ["https://via.placeholder.com/800x400?text=Screenshot+1"],
    },
    challenges: [
      {
        title: "Coordinación de equipo multidisciplinario",
        description: "Integrar roles de TI, ingeniería, ciencias y administración.",
        solution: "Asignación de responsabilidades claras y seguimiento ágil.",
        impact: "Prototipo funcional y reconocido en hackatón.",
      },
    ],
    keyFeatures: [
      "Prototipo funcional AI",
      "Diseño de arquitectura",
      "Validación técnica",
      "Presentación de pitch final"
    ],
    metrics: [
      { label: "Reconocimiento en hackatón", value: "Competente en mercado" }
    ],
    links: [
      { label: "Figma Prototype", url: "https://rigor-even-07466876.figma.site", icon: "external-link" }
    ],
    featured: true,
    startDate: "2025-10-01",
    endDate: "2025-10-31",
    tags: ["ai", "hackathon", "team-lead"],
    category: "fullstack",
  },
  // ========================
  // PROYECTOS PM / Gestión
  // ========================
  {
    id: "hack4edu",
    title: "Hack4Edu - Coordinación Local",
    slug: "hack4edu",
    shortDescription: "Organización y gestión del Hack4Edu 2025 (UNSA).",
    fullDescription: "Gestión completa del evento: logística, comunicación, equipos y cumplimiento de objetivos. Consolidación de programa formativo tecnológico.",
    problem: "Necesidad de coordinar un hackatón internacional en tiempo limitado.",
    solution: "Implementación de cronogramas, comunicación efectiva y seguimiento de equipos.",
    techStack: {
      frontend: [],
      backend: [],
      database: [],
      devOps: [],
      testing: [],
    },
    images: {
      thumbnail: "https://via.placeholder.com/400x300?text=Hack4Edu",
      hero: "https://via.placeholder.com/1200x600?text=Hack4Edu",
      screenshots: ["https://via.placeholder.com/800x400?text=Screenshot+1"],
    },
    challenges: [
      {
        title: "Coordinación de evento internacional",
        description: "Planificación, gestión de participantes y cumplimiento de objetivos.",
        solution: "Diseño de plan operativo y seguimiento constante.",
        impact: "Evento exitoso y de alto impacto educativo.",
      },
    ],
    keyFeatures: [
      "Planificación de hackatón",
      "Gestión de equipos",
      "Logística y comunicación",
      "Cumplimiento de objetivos"
    ],
    metrics: [
      { label: "Participantes", value: "50+" },
      { label: "Duración del evento", value: "3 semanas" }
    ],
    links: [],
    featured: true,
    startDate: "2025-10-01",
    endDate: "2025-10-21",
    tags: ["pm", "coordination", "event"],
    category: "other",
  }
];

// ============================================================
// STORE - Pinia
// ============================================================

export const useProjectsStore = defineStore("projects", () => {
  const projects = ref<Project[]>(MOCK_PROJECTS);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // ========================
  // GETTERS
  // ========================

  const featuredProjects = computed(() => projects.value.filter(p => p.featured));

  const projectsByCategory = computed(() => {
    return (category: string) => projects.value.filter(p => p.category === category);
  });

  const projectById = computed(() => {
    return (id: string) => projects.value.find(p => p.id === id);
  });

  const projectsByTech = computed(() => {
    return (tech: string) => projects.value.filter(project => {
      const allTechs = [
        ...(project.techStack.frontend || []),
        ...(project.techStack.backend || []),
        ...(project.techStack.database || []),
        ...(project.techStack.devOps || []),
        ...(project.techStack.testing || []),
        ...(project.techStack.other || []),
      ];
      return allTechs.some(t => t.toLowerCase() === tech.toLowerCase());
    });
  });

  const totalProjects = computed(() => projects.value.length);

  // ========================
  // ACTIONS
  // ========================

  const fetchProjects = async (): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Error fetching projects";
      console.error("Error fetching projects:", err);
    } finally {
      loading.value = false;
    }
  };

  const addProject = (project: Project): void => {
    if (!project.id || !project.title) {
      error.value = "Project must have id and title";
      return;
    }
    if (projects.value.some(p => p.id === project.id)) {
      error.value = `Project with id ${project.id} already exists`;
      return;
    }
    projects.value.push(project);
    error.value = null;
  };

  const updateProject = (id: string, updates: Partial<Project>): void => {
    const index = projects.value.findIndex(p => p.id === id);
    if (index === -1) {
      error.value = `Project with id ${id} not found`;
      return;
    }
    projects.value[index] = { ...projects.value[index], ...updates, id } as Project;
    error.value = null;
  };

  const deleteProject = (id: string): void => {
    const index = projects.value.findIndex(p => p.id === id);
    if (index === -1) {
      error.value = `Project with id ${id} not found`;
      return;
    }
    projects.value.splice(index, 1);
    error.value = null;
  };

  const clearError = (): void => { error.value = null; };

  return {
    projects,
    loading,
    error,
    featuredProjects,
    projectsByCategory,
    projectById,
    projectsByTech,
    totalProjects,
    fetchProjects,
    addProject,
    updateProject,
    deleteProject,
    clearError,
  };
});
