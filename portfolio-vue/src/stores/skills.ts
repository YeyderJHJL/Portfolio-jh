import { defineStore } from "pinia";
import { ref } from "vue";
import type { Skill } from "../types";
import { SKILLS_DATA } from "../data";

export const useSkillsStore = defineStore("skills", () => {
  const skills = ref<Skill[]>(SKILLS_DATA);
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
