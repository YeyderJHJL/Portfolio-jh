/**
 * ÚNICA FUENTE DE VERDAD para skills
 * Usado por: profile.ts y skills.ts stores
 * Al conectar backend, reemplazar con fetch desde API
 * Icons usan Devicon (https://devicon.dev)
 */
import type { Skill } from "../types";

export const SKILLS_DATA: Skill[] = [
  // ── Frontend ──
  { name: "React", proficiency: "intermediate", category: "frontend", icon: "devicon-react-original colored", color: "blue", yearsOfExperience: 2 },
  { name: "Next.js", proficiency: "intermediate", category: "frontend", icon: "devicon-nextjs-plain colored", color: "black", yearsOfExperience: 1 },
  { name: "Vue 3", proficiency: "intermediate", category: "frontend", icon: "devicon-vuejs-plain colored", color: "green", yearsOfExperience: 1 },
  { name: "Vite", proficiency: "intermediate", category: "frontend", icon: "devicon-vitejs-plain colored", color: "purple", yearsOfExperience: 1 },
  { name: "TypeScript", proficiency: "intermediate", category: "frontend", icon: "devicon-typescript-plain colored", color: "blue", yearsOfExperience: 2 },
  { name: "JavaScript", proficiency: "advanced", category: "frontend", icon: "devicon-javascript-plain colored", color: "yellow", yearsOfExperience: 3 },
  { name: "Tailwind CSS", proficiency: "intermediate", category: "frontend", icon: "devicon-tailwindcss-original colored", color: "cyan", yearsOfExperience: 1 },
  { name: "HTML/CSS", proficiency: "advanced", category: "frontend", icon: "devicon-html5-plain colored", color: "orange", yearsOfExperience: 3 },

  // ── Backend ──
  { name: "Nest.js", proficiency: "intermediate", category: "backend", icon: "devicon-nestjs-original colored", color: "red", yearsOfExperience: 1 },
  { name: "Node.js", proficiency: "intermediate", category: "backend", icon: "devicon-nodejs-plain colored", color: "green", yearsOfExperience: 1 },
  { name: "Django", proficiency: "intermediate", category: "backend", icon: "devicon-django-plain colored", color: "green", yearsOfExperience: 2 },
  { name: "Spring Boot", proficiency: "beginner", category: "backend", icon: "devicon-spring-original colored", color: "green", yearsOfExperience: 1 },
  { name: "Python", proficiency: "advanced", category: "backend", icon: "devicon-python-plain colored", color: "yellow", yearsOfExperience: 3 },
  { name: "Java", proficiency: "intermediate", category: "backend", icon: "devicon-java-plain colored", color: "red", yearsOfExperience: 2 },
  { name: "C/C++", proficiency: "intermediate", category: "backend", icon: "devicon-cplusplus-plain colored", color: "blue", yearsOfExperience: 2 },

  // ── Data ──
  { name: "PostgreSQL", proficiency: "intermediate", category: "data", icon: "devicon-postgresql-plain colored", color: "blue", yearsOfExperience: 1 },
  { name: "MySQL", proficiency: "intermediate", category: "data", icon: "devicon-mysql-plain colored", color: "blue", yearsOfExperience: 1 },
  { name: "Firebase", proficiency: "intermediate", category: "data", icon: "devicon-firebase-plain colored", color: "orange", yearsOfExperience: 1 },
  { name: "Supabase", proficiency: "intermediate", category: "data", icon: "devicon-supabase-plain colored", color: "green", yearsOfExperience: 1 },
  { name: "Prisma", proficiency: "intermediate", category: "data", icon: "devicon-prisma-original colored", color: "blue", yearsOfExperience: 1 },

  // ── DevOps / Tools ──
  { name: "Git/GitHub", proficiency: "advanced", category: "devops", icon: "devicon-github-original colored", color: "black", yearsOfExperience: 3 },
  { name: "Postman", proficiency: "intermediate", category: "devops", icon: "devicon-postman-plain colored", color: "orange", yearsOfExperience: 2 },
  { name: "Jira", proficiency: "intermediate", category: "devops", icon: "devicon-jira-plain colored", color: "blue", yearsOfExperience: 1 },
  { name: "Vercel", proficiency: "intermediate", category: "devops", icon: "devicon-vercel-original colored", color: "black", yearsOfExperience: 1 },
  { name: "Google Cloud", proficiency: "beginner", category: "devops", icon: "devicon-googlecloud-plain colored", color: "blue", yearsOfExperience: 1 },

  // ── QA ──
  { name: "Testing Manual", proficiency: "intermediate", category: "qa", icon: "pi pi-check-circle", color: "red", yearsOfExperience: 1 },
  { name: "Pruebas Funcionales", proficiency: "intermediate", category: "qa", icon: "pi pi-verified", color: "red", yearsOfExperience: 1 },

  // ── PM ──
  { name: "Scrum", proficiency: "advanced", category: "pm", icon: "pi pi-sync", color: "violet", yearsOfExperience: 2 },
  { name: "Kanban", proficiency: "intermediate", category: "pm", icon: "pi pi-th-large", color: "violet", yearsOfExperience: 1 },

  // ── Soft Skills ──
  { name: "Liderazgo", proficiency: "advanced", category: "soft", icon: "pi pi-star", color: "yellow", yearsOfExperience: 3 },
  { name: "Trabajo en Equipo", proficiency: "expert", category: "soft", icon: "pi pi-users", color: "yellow", yearsOfExperience: 4 },
  { name: "Resolución de Problemas", proficiency: "advanced", category: "soft", icon: "pi pi-bolt", color: "yellow", yearsOfExperience: 3 },
  { name: "Comunicación", proficiency: "advanced", category: "soft", icon: "pi pi-comments", color: "yellow", yearsOfExperience: 3 },
];
