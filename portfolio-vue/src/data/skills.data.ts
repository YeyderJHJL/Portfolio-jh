/**
 * ÚNICA FUENTE DE VERDAD para skills
 * Usado por: profile.ts y skills.ts stores
 * Al conectar backend, reemplazar con fetch desde API
 */
import type { Skill } from "../types";

export const SKILLS_DATA: Skill[] = [
  // ── Frontend ──
  { name: "React", proficiency: "intermediate", category: "frontend", icon: "react", color: "blue", yearsOfExperience: 2 },
  { name: "Next.js", proficiency: "intermediate", category: "frontend", icon: "nextjs", color: "black", yearsOfExperience: 1 },
  { name: "Vue 3", proficiency: "intermediate", category: "frontend", icon: "vue", color: "green", yearsOfExperience: 1 },
  { name: "Vite", proficiency: "intermediate", category: "frontend", icon: "vite", color: "purple", yearsOfExperience: 1 },
  { name: "TypeScript", proficiency: "intermediate", category: "frontend", icon: "ts", color: "blue", yearsOfExperience: 2 },
  { name: "JavaScript", proficiency: "advanced", category: "frontend", icon: "js", color: "yellow", yearsOfExperience: 3 },
  { name: "Tailwind CSS", proficiency: "intermediate", category: "frontend", icon: "tailwind", color: "cyan", yearsOfExperience: 1 },
  { name: "HTML/CSS", proficiency: "advanced", category: "frontend", icon: "html5", color: "orange", yearsOfExperience: 3 },

  // ── Backend ──
  { name: "Nest.js", proficiency: "intermediate", category: "backend", icon: "nestjs", color: "red", yearsOfExperience: 1 },
  { name: "Node.js", proficiency: "intermediate", category: "backend", icon: "node", color: "green", yearsOfExperience: 1 },
  { name: "Django", proficiency: "intermediate", category: "backend", icon: "django", color: "green", yearsOfExperience: 2 },
  { name: "Spring Boot", proficiency: "beginner", category: "backend", icon: "spring", color: "green", yearsOfExperience: 1 },
  { name: "Python", proficiency: "advanced", category: "backend", icon: "python", color: "yellow", yearsOfExperience: 3 },
  { name: "Java", proficiency: "intermediate", category: "backend", icon: "java", color: "red", yearsOfExperience: 2 },
  { name: "C/C++", proficiency: "intermediate", category: "backend", icon: "cpp", color: "blue", yearsOfExperience: 2 },

  // ── Data ──
  { name: "PostgreSQL", proficiency: "intermediate", category: "data", icon: "postgresql", color: "blue", yearsOfExperience: 1 },
  { name: "MySQL", proficiency: "intermediate", category: "data", icon: "mysql", color: "blue", yearsOfExperience: 1 },
  { name: "Firebase", proficiency: "intermediate", category: "data", icon: "firebase", color: "orange", yearsOfExperience: 1 },
  { name: "Supabase", proficiency: "intermediate", category: "data", icon: "supabase", color: "green", yearsOfExperience: 1 },
  { name: "Prisma", proficiency: "intermediate", category: "data", icon: "prisma", color: "blue", yearsOfExperience: 1 },

  // ── DevOps / Tools ──
  { name: "Git/GitHub", proficiency: "advanced", category: "devops", icon: "github", color: "black", yearsOfExperience: 3 },
  { name: "Postman", proficiency: "intermediate", category: "devops", icon: "postman", color: "orange", yearsOfExperience: 2 },
  { name: "Jira", proficiency: "intermediate", category: "devops", icon: "jira", color: "blue", yearsOfExperience: 1 },
  { name: "Vercel", proficiency: "intermediate", category: "devops", icon: "vercel", color: "black", yearsOfExperience: 1 },
  { name: "Google Cloud", proficiency: "beginner", category: "devops", icon: "cloud", color: "blue", yearsOfExperience: 1 },

  // ── QA ──
  { name: "Testing Manual", proficiency: "intermediate", category: "qa", icon: "test", color: "red", yearsOfExperience: 1 },
  { name: "Pruebas Funcionales", proficiency: "intermediate", category: "qa", icon: "test", color: "red", yearsOfExperience: 1 },

  // ── PM ──
  { name: "Scrum", proficiency: "advanced", category: "pm", icon: "scrum", color: "violet", yearsOfExperience: 2 },
  { name: "Kanban", proficiency: "intermediate", category: "pm", icon: "kanban", color: "violet", yearsOfExperience: 1 },

  // ── Soft Skills ──
  { name: "Liderazgo", proficiency: "advanced", category: "soft", icon: "leadership", color: "yellow", yearsOfExperience: 3 },
  { name: "Trabajo en Equipo", proficiency: "expert", category: "soft", icon: "team", color: "yellow", yearsOfExperience: 4 },
  { name: "Resolución de Problemas", proficiency: "advanced", category: "soft", icon: "problem", color: "yellow", yearsOfExperience: 3 },
  { name: "Comunicación", proficiency: "advanced", category: "soft", icon: "communication", color: "yellow", yearsOfExperience: 3 },
];
