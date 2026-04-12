import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { UserProfile, Skill, TimelineEvent } from "../types";
import { PROFILE_DATA } from "../data";

// ============================================================
// STORE
// ============================================================

export const useProfileStore = defineStore("profile", () => {
  // ============================================================
  // STATE
  // ============================================================

  const profile = ref<UserProfile>(PROFILE_DATA);
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