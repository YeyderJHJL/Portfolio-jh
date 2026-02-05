import { defineStore } from "pinia";
import { ref } from "vue";
import type { Skill } from "../types";

export const SKILLS: Skill[] = [
  // Frontend
  { name: "Vue 3", proficiency: "advanced", category: "frontend", icon: "vue", color: "green" },
  { name: "React", proficiency: "intermediate", category: "frontend", icon: "react", color: "blue" },
  { name: "TypeScript", proficiency: "advanced", category: "frontend", icon: "ts", color: "blue" },
  { name: "HTML/CSS", proficiency: "expert", category: "frontend", icon: "html5", color: "orange" },

  // Backend
  { name: "Node.js", proficiency: "intermediate", category: "backend", icon: "node", color: "green" },
  { name: "Django", proficiency: "intermediate", category: "backend", icon: "django", color: "green" },
  { name: "Spring Boot", proficiency: "beginner", category: "backend", icon: "spring", color: "green" },
  { name: "Python", proficiency: "advanced", category: "backend", icon: "python", color: "yellow" },

  // DevOps / Tools
  { name: "Docker", proficiency: "intermediate", category: "devops", icon: "docker", color: "blue" },
  { name: "Git/GitHub", proficiency: "advanced", category: "devops", icon: "github", color: "black" },
  { name: "CI/CD", proficiency: "intermediate", category: "devops", icon: "ci", color: "purple" },
  { name: "AWS / GCP", proficiency: "beginner", category: "devops", icon: "cloud", color: "blue" },

  // Data
  { name: "PostgreSQL", proficiency: "beginner", category: "data", icon: "database", color: "blue" },
  { name: "MySQL", proficiency: "beginner", category: "data", icon: "database", color: "blue" },

  // QA
  { name: "Testing manual", proficiency: "intermediate", category: "qa", icon: "test", color: "red" },
  { name: "Functional tests", proficiency: "intermediate", category: "qa", icon: "test", color: "red" },

  // PM / Soft
  { name: "Scrum", proficiency: "advanced", category: "pm", icon: "scrum", color: "violet" },
  { name: "Kanban", proficiency: "advanced", category: "pm", icon: "kanban", color: "violet" },
  { name: "Leadership", proficiency: "expert", category: "soft", icon: "leadership", color: "yellow" },
  { name: "Communication", proficiency: "expert", category: "soft", icon: "communication", color: "yellow" },
];

export const useSkillsStore = defineStore("skills", () => {
  const skills = ref<Skill[]>(SKILLS);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // ========================
  // GETTERS
  // ========================

  // ========================
  // ACTIONS
  // ========================


  const clearError = (): void => { error.value = null; };

  return {
    skills,
    loading,
    error,
    clearError,
  };
});
