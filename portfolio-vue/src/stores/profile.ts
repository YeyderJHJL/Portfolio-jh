import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { UserProfile, Skill, Certification, TimelineEvent } from "../types";

// ============================================================
// MOCK DATA - Perfil de Jhamil Yeyder Turpo Añasco
// ============================================================

const MOCK_SKILLS: Skill[] = [
  // Frontend
  { name: "React", proficiency: "intermediate", category: "frontend", yearsOfExperience: 2 },
  { name: "Vue 3", proficiency: "intermediate", category: "frontend", yearsOfExperience: 1 },
  { name: "TypeScript", proficiency: "intermediate", category: "frontend", yearsOfExperience: 2 },
  { name: "HTML/CSS", proficiency: "advanced", category: "frontend", yearsOfExperience: 3 },
  { name: "JavaScript", proficiency: "advanced", category: "frontend", yearsOfExperience: 3 },
  { name: "Vite", proficiency: "intermediate", category: "frontend", yearsOfExperience: 1 },

  // Backend
  { name: "Node.js", proficiency: "beginner", category: "backend", yearsOfExperience: 1 },
  { name: "Django", proficiency: "intermediate", category: "backend", yearsOfExperience: 2 },
  { name: "Spring Boot", proficiency: "beginner", category: "backend", yearsOfExperience: 1 },
  { name: "Python", proficiency: "advanced", category: "backend", yearsOfExperience: 3 },
  { name: "Java", proficiency: "intermediate", category: "backend", yearsOfExperience: 2 },
  { name: "C", proficiency: "intermediate", category: "backend", yearsOfExperience: 2 },
  { name: "C++", proficiency: "intermediate", category: "backend", yearsOfExperience: 2 },

  // Data
  { name: "PostgreSQL", proficiency: "beginner", category: "data", yearsOfExperience: 1 },
  { name: "MySQL", proficiency: "beginner", category: "data", yearsOfExperience: 1 },

  // DevOps
  { name: "Git", proficiency: "intermediate", category: "devops", yearsOfExperience: 2 },
  { name: "GitHub", proficiency: "intermediate", category: "devops", yearsOfExperience: 2 },
  { name: "Google Cloud", proficiency: "beginner", category: "devops", yearsOfExperience: 1 },
  { name: "Postman", proficiency: "intermediate", category: "devops", yearsOfExperience: 2 },
  { name: "Jira", proficiency: "intermediate", category: "devops", yearsOfExperience: 1 },

  // QA
  { name: "Testing Manual", proficiency: "intermediate", category: "qa", yearsOfExperience: 1 },
  { name: "Pruebas Funcionales", proficiency: "intermediate", category: "qa", yearsOfExperience: 1 },
  { name: "QA Básico", proficiency: "intermediate", category: "qa", yearsOfExperience: 1 },

  // PM
  { name: "Scrum", proficiency: "advanced", category: "pm", yearsOfExperience: 2 },
  { name: "Kanban", proficiency: "intermediate", category: "pm", yearsOfExperience: 1 },

  // Soft Skills
  { name: "Liderazgo", proficiency: "advanced", category: "soft", yearsOfExperience: 3 },
  { name: "Trabajo en Equipo", proficiency: "expert", category: "soft", yearsOfExperience: 4 },
  { name: "Resolución de Problemas", proficiency: "advanced", category: "soft", yearsOfExperience: 3 },
  { name: "Comunicación", proficiency: "advanced", category: "soft", yearsOfExperience: 3 },
  { name: "Adaptabilidad", proficiency: "expert", category: "soft", yearsOfExperience: 4 },
];

const MOCK_CERTIFICATIONS: Certification[] = [
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
];

const MOCK_TIMELINE: TimelineEvent[] = [
  {
    id: "timeline-1",
    date: "2025-11-01",
    title: "TICAL 2025 - Costa Rica",
    description: "Ganador del financiamiento PIPE de la UNSA en Innovación y Ecosistemas Tecnológicos. Exposición a nuevas tendencias TIC, transformación digital y networking internacional.",
    type: "achievement",
    tags: ["Innovation", "TIC", "International"],
  },
  {
    id: "timeline-2",
    date: "2025-10-15",
    title: "NASA Space Apps Challenge - Finalista Internacional",
    description: "Finalista Internacional y Nominado Global con el equipo BioForecast. Desarrollo de plataforma web para análisis de datos satelitales y aptitud de suelo.",
    type: "achievement",
    tags: ["NASA", "Hackathon", "Web Development"],
  },
  {
    id: "timeline-3",
    date: "2025-10-10",
    title: "III Hackatón Innovasur - Líder de Equipo",
    description: "Liderazgo técnico y organizacional de equipo multidisciplinario. Proyecto FlowTechAI reconocido competente en el mercado.",
    type: "achievement",
    tags: ["Leadership", "Hackathon", "Team Management"],
  },
  {
    id: "timeline-4",
    date: "2025-07-01",
    title: "5ta Cumbre Nacional de Dirección de Proyectos",
    description: "Organizador del evento nacional Perú Proyectando 2025 con PMI Sur Perú.",
    type: "experience",
    tags: ["Project Management", "Organization"],
  },
  {
    id: "timeline-5",
    date: "2025-05-01",
    title: "Primer Taller Presencial PIBPGPM - PMI",
    description: "Organizador del primer taller presencial de buenas prácticas de gestión de proyectos.",
    type: "experience",
    tags: ["PMI", "Workshop", "Organization"],
  },
  {
    id: "timeline-6",
    date: "2025-01-01",
    title: "Scrum Master - Plataforma de Cursos AWS",
    description: "Facilitación de ceremonias Scrum, coordinación con desarrolladores y gestión del backlog técnico en proyecto IEEE.",
    type: "experience",
    tags: ["Scrum", "AWS", "Leadership"],
  },
  {
    id: "timeline-7",
    date: "2024-07-01",
    title: "Congreso Internacional PMI Sur",
    description: "Voluntario en el Congreso Internacional PMI Sur Perú, apoyo logístico y coordinación.",
    type: "experience",
    tags: ["PMI", "Volunteer", "Event"],
  },
  {
    id: "timeline-8",
    date: "2024-04-01",
    title: "Director de Proyecto AsociaT - Ingenia",
    description: "Planificación, coordinación de equipos, liderazgo y ejecución de proyecto social AsociaT.",
    type: "project",
    tags: ["Leadership", "Social Impact", "Project Management"],
  },
  {
    id: "timeline-9",
    date: "2022-03-01",
    title: "Inicio de Carrera Universitaria",
    description: "Ingreso a la Universidad Nacional de San Agustín. Doble carrera: Ingeniería de Sistemas y Administración. Becario PRONABEC.",
    type: "education",
    tags: ["University", "UNSA", "PRONABEC"],
  },
];

const MOCK_PROFILE: UserProfile = {
  id: "jhamil-turpo",
  name: "Jhamil Yeyder Turpo Añasco",
  title: "Estudiante de Ingeniería de Sistemas & Administración",
  bio: "Estudiante de Ingeniería de Sistemas con formación complementaria en Administración. Becario PRONABEC con sólida experiencia en liderazgo de proyectos tecnológicos, desarrollo web y metodologías ágiles.",
  avatar: "images/profile/perfil_portfolio.png",
  social: {
    github: "https://github.com/jhamil-turpo",
    linkedin: "https://www.linkedin.com/in/jhamil-yeyder-turpo-añasco",
    email: "jturpoan@unsa.edu.pe",
  },
  story: `Soy estudiante de 8vo ciclo de Ingeniería de Sistemas y 4to ciclo de Administración en la Universidad Nacional de San Agustín, becario PRONABEC desde 2022. Mi trayectoria se caracteriza por combinar habilidades técnicas en desarrollo de software con capacidades de liderazgo y gestión de proyectos.

He participado en múltiples hackatones internacionales, destacando como Finalista Internacional en el NASA Space Apps Challenge 2025 con el proyecto BioForecast, una plataforma web de análisis de datos satelitales para agricultura sostenible. Esta experiencia me permitió trabajar con desarrolladores avanzados, integrar APIs complejas y desplegar soluciones en producción.

Como líder técnico en la III Hackatón Innovasur 2025, coordiné un equipo multidisciplinario (TI, ingeniería, ciencias, economía, administración) desarrollando FlowTechAI, un prototipo de software reconocido como competente en el mercado. Esta experiencia reforzó mis habilidades en coordinación, definición de arquitectura técnica y presentación de propuestas.

Mi experiencia en gestión ágil incluye el rol de Scrum Master en el proyecto de Plataforma de Cursos AWS para IEEE, donde facilité ceremonias Scrum, coordiné con desarrolladores y gestioné el backlog técnico. He complementado esta formación con roles de liderazgo en organizaciones como PMI Sur Perú e Ingenia, donde he dirigido proyectos sociales y eventos de gran escala.

Busco integrarme al área de TI en roles de desarrollo web, backend, automatización o gestión técnica de proyectos, donde pueda aportar mi capacidad analítica, rápida adaptación y enfoque en resolución de problemas. Mi objetivo es seguir creciendo profesionalmente mientras contribuyo al desarrollo de soluciones tecnológicas de impacto.`,
  skills: MOCK_SKILLS,
  certifications: MOCK_CERTIFICATIONS,
  timeline: MOCK_TIMELINE,
};

// ============================================================
// STORE
// ============================================================

export const useProfileStore = defineStore("profile", () => {
  // ============================================================
  // STATE
  // ============================================================

  const profile = ref<UserProfile>(MOCK_PROFILE);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // ============================================================
  // COMPUTED
  // ============================================================

  /**
   * Skills agrupadas por categoría
   */
  const skillsByCategory = computed(() => {
    if (!profile.value.skills) return {};

    const grouped: Record<string, Skill[]> = {};

    profile.value.skills.forEach((skill) => {
      const category = skill.category || "other";
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(skill);
    });

    // Ordenar skills dentro de cada categoría por proficiency
    Object.keys(grouped).forEach((category) => {
      grouped[category]?.sort((a, b) => {
        const proficiencyOrder = { expert: 4, advanced: 3, intermediate: 2, beginner: 1 };
        return (
          (proficiencyOrder[b.proficiency] || 0) - (proficiencyOrder[a.proficiency] || 0)
        );
      });
    });

    return grouped;
  });

  /**
   * Timeline ordenado cronológicamente (más reciente primero)
   */
  const sortedTimeline = computed(() => {
    if (!profile.value.timeline) return [];

    return [...profile.value.timeline].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  });

  /**
   * Timeline agrupado por año
   */
  const timelineByYear = computed(() => {
    const grouped: Record<string, TimelineEvent[]> = {};

    sortedTimeline.value.forEach((event) => {
      const year = new Date(event.date).getFullYear().toString();
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push(event);
    });

    return grouped;
  });

  // ============================================================
  // ACTIONS
  // ============================================================

  const fetchProfile = async (): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      // Simular fetch de API
      await new Promise((resolve) => setTimeout(resolve, 800));
      // En producción: profile.value = await fetch('/api/profile').then(res => res.json())
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Error fetching profile";
      console.error("Error fetching profile:", err);
    } finally {
      loading.value = false;
    }
  };

  const clearError = (): void => {
    error.value = null;
  };

  // ============================================================
  // EXPORT
  // ============================================================

  return {
    // State
    profile,
    loading,
    error,

    // Computed
    skillsByCategory,
    sortedTimeline,
    timelineByYear,

    // Actions
    fetchProfile,
    clearError,
  };
});