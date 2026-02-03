/**
 * Pinia Store - Projects
 * Composition API style (más moderno y flexible que Options API)
 * 
 * Gestiona:
 * - Estado de proyectos (lista, loading, errores)
 * - Filtrado y búsqueda
 * - CRUD básico (simulado con mock data)
 * 
 * En producción, reemplazar las acciones con llamadas reales a API
 */

import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Project } from "../types";

// ============================================================
// MOCK DATA - Reemplazar con API calls en producción
// ============================================================

const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    title: "TaskFlow - Gestor de Tareas Colaborativo",
    slug: "taskflow",
    shortDescription:
      "App web colaborativa en tiempo real para gestión de tareas",
    fullDescription:
      "Una herramienta moderna para equipos pequeños que necesitan gestionar tareas sin la complejidad de Jira.",
    problem:
      "Los equipos pequeños necesitan una herramienta simple para gestionar tareas sin la complejidad de Jira o Asana.",
    solution:
      "App web colaborativa en tiempo real con Kanban board intuitivo, asignación de tareas, notificaciones real-time y dashboard de progreso.",
    techStack: {
      frontend: ["React", "TypeScript", "Tailwind CSS"],
      backend: ["Node.js", "Express", "Socket.io"],
      database: ["MongoDB"],
      devOps: ["Vercel", "Railway"],
      testing: ["Jest", "Cypress"],
    },
    images: {
      thumbnail:
        "https://images.unsplash.com/photo-1611606063065-cb86f3fb9bcf?w=400&h=300&fit=crop",
      hero: "https://images.unsplash.com/photo-1611606063065-cb86f3fb9bcf?w=1200&h=600&fit=crop",
      screenshots: [
        "https://images.unsplash.com/photo-1611606063065-cb86f3fb9bcf",
      ],
    },
    challenges: [
      {
        title: "Real-time sync",
        description: "Mantener todos los clientes sincronizados en tiempo real",
        solution: "Implementé Socket.io para updates instantáneos",
        impact: "Sincronización de 0ms entre usuarios",
      },
      {
        title: "Performance",
        description: "Demasiados re-renders ralentizaban la interfaz",
        solution: "Optimicé con React.memo y useCallback",
        impact: "40% mejora en performance",
      },
    ],
    keyFeatures: [
      "Kanban board intuitivo",
      "Asignación de tareas",
      "Notificaciones real-time",
      "Dashboard de progreso",
    ],
    metrics: [
      { label: "Lighthouse", value: "94/100" },
      { label: "API Response Time", value: "<150ms" },
    ],
    links: [
      {
        label: "Ver Demo",
        url: "https://taskflow.vercel.app",
        icon: "external-link",
      },
      {
        label: "Ver Código",
        url: "https://github.com/usuario/taskflow",
        icon: "github",
      },
    ],
    featured: true,
    startDate: "2024-01-15",
    endDate: "2024-03-30",
    tags: ["react", "realtime", "collaboration"],
    category: "fullstack",
  },
  {
    id: "2",
    title: "DataViz - Dashboard Analítico",
    slug: "dataviz",
    shortDescription: "Dashboard interactivo para visualización de datos",
    fullDescription:
      "Plataforma de análisis de datos con visualizaciones interactivas y reportes en tiempo real.",
    problem:
      "Las empresas tienen datos pero no pueden visualizarlos de forma clara y accionable.",
    solution:
      "Dashboard con gráficos interactivos, filtros avanzados y exportación de reportes.",
    techStack: {
      frontend: ["Vue 3", "TypeScript", "D3.js", "Chart.js"],
      backend: ["Python", "FastAPI"],
      database: ["PostgreSQL"],
      devOps: ["Docker", "AWS"],
    },
    images: {
      thumbnail:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      hero: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
      screenshots: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      ],
    },
    challenges: [
      {
        title: "Rendering de grandes datasets",
        description:
          "Visualizar millones de puntos de datos sin freezear la app",
        solution: "Virtualization y WebGL rendering",
        impact: "Soporta datasets de 10M+ registros",
      },
    ],
    keyFeatures: [
      "Gráficos interactivos",
      "Filtros en tiempo real",
      "Exportación de reportes",
      "Comparación histórica",
    ],
    metrics: [
      { label: "Query Time", value: "<500ms" },
      { label: "Usuarios Activos", value: "1000+" },
    ],
    links: [
      {
        label: "Ver Demo",
        url: "https://dataviz-app.com",
        icon: "external-link",
      },
      {
        label: "Ver Código",
        url: "https://github.com/usuario/dataviz",
        icon: "github",
      },
    ],
    featured: true,
    startDate: "2024-02-01",
    tags: ["vue", "data-visualization", "analytics"],
    category: "frontend",
  },
];

// ============================================================
// STATE - Definición del estado reactivo
// ============================================================

export const useProjectsStore = defineStore("projects", () => {
  // State
  const projects = ref<Project[]>(MOCK_PROJECTS);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // ============================================================
  // GETTERS - Selectores derivados del estado
  // ============================================================

  /**
   * Obtiene solo los proyectos destacados (featured: true)
   * Útil para mostrar en home o secciones especiales
   */
  const featuredProjects = computed(() => {
    return projects.value.filter((p) => p.featured);
  });

  /**
   * Obtiene proyectos por categoría
   * Útil para filtrados en la vista Projects
   */
  const projectsByCategory = computed(() => {
    return (category: string) => {
      return projects.value.filter((p) => p.category === category);
    };
  });

  /**
   * Obtiene un proyecto por su ID
   * Se usa para mostrar detalles de un proyecto
   */
  const projectById = computed(() => {
    return (id: string) => {
      return projects.value.find((p) => p.id === id);
    };
  });

  /**
   * Obtiene proyectos que usan una tecnología específica
   * Útil para filtrar por skills en la UI
   */
  const projectsByTech = computed(() => {
    return (tech: string) => {
      return projects.value.filter((project) => {
        const allTechs = [
          ...(project.techStack.frontend || []),
          ...(project.techStack.backend || []),
          ...(project.techStack.database || []),
          ...(project.techStack.devOps || []),
          ...(project.techStack.testing || []),
        ];
        return allTechs.some(
          (t) => t.toLowerCase() === tech.toLowerCase()
        );
      });
    };
  });

  /**
   * Obtiene el total de proyectos
   */
  const totalProjects = computed(() => projects.value.length);

  // ============================================================
  // ACTIONS - Mutadores de estado (lado del negocio)
  // ============================================================

  /**
   * Simula una llamada al servidor para obtener proyectos
   * En producción: llamar a API real
   * 
   * Maneja:
   * - Loading state
   * - Error handling
   * - Simulación de delay de red
   */
  const fetchProjects = async (): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      // Simular delay de red (reemplazar con fetch/axios en producción)
      await new Promise((resolve) => setTimeout(resolve, 800));

      // En producción:
      // const response = await fetch('/api/projects');
      // projects.value = await response.json();

      // Por ahora, projects ya está poblado con MOCK_DATA
      // pero esto demuestra el patrón correcto
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Error fetching projects";
      console.error("Error fetching projects:", err);
    } finally {
      loading.value = false;
    }
  };

  /**
   * Agrega un nuevo proyecto al store
   * En producción: POST a /api/projects
   */
  const addProject = (project: Project): void => {
    // Validación básica
    if (!project.id || !project.title) {
      error.value = "Project must have id and title";
      return;
    }

    // Verificar que no exista duplicado
    if (projects.value.some((p) => p.id === project.id)) {
      error.value = `Project with id ${project.id} already exists`;
      return;
    }

    projects.value.push(project);
    error.value = null;
  };

  /**
   * Actualiza un proyecto existente
   * En producción: PATCH a /api/projects/:id
   */
  const updateProject = (id: string, updates: Partial<Project>): void => {
    const index = projects.value.findIndex((p) => p.id === id);

    if (index === -1) {
      error.value = `Project with id ${id} not found`;
      return;
    }

    // Merge con valores existentes - castear a Project para satisfacer tipos
    projects.value[index] = {
      ...projects.value[index],
      ...updates,
      id, // Asegurar que id no cambie
    } as Project;

    error.value = null;
  };

  /**
   * Elimina un proyecto
   * En producción: DELETE a /api/projects/:id
   */
  const deleteProject = (id: string): void => {
    const index = projects.value.findIndex((p) => p.id === id);

    if (index === -1) {
      error.value = `Project with id ${id} not found`;
      return;
    }

    projects.value.splice(index, 1);
    error.value = null;
  };

  /**
   * Limpia errores
   * Útil para cerrar notificaciones de error en UI
   */
  const clearError = (): void => {
    error.value = null;
  };

  // ============================================================
  // EXPORT
  // ============================================================

  return {
    // State
    projects,
    loading,
    error,

    // Getters
    featuredProjects,
    projectsByCategory,
    projectById,
    projectsByTech,
    totalProjects,

    // Actions
    fetchProjects,
    addProject,
    updateProject,
    deleteProject,
    clearError,
  };
});
