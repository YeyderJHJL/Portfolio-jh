import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Project } from "../types";
import { PROJECTS_DATA } from "../data";

// ============================================================
// TYPES
// ============================================================

export type SortOption =
  | 'latest'
  | 'oldest'
  | 'name-asc'
  | 'name-desc'
  | `year-${number}`

// ============================================================
// CONSTANTS
// ============================================================

export const CATEGORY_LABELS: Record<string, string> = {
  'software': 'Software',
  'product': 'Product',
  'project-management': 'Project Management',
  'event': 'Events',
  'research': 'Research',
  'community': 'Community',
  'social-impact': 'Social Impact',
  'education': 'Education',
  'other': 'Other'
}

// ============================================================
// STORE
// ============================================================

export const useProjectsStore = defineStore('projects', () => {
  // ============================================================
  // STATE
  // ============================================================

  const projects = ref<Project[]>(PROJECTS_DATA)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Filters state
  const searchQuery = ref('')
  const selectedStacks = ref<string[]>([])
  const selectedCategory = ref<string | null>(null)
  const sortBy = ref<SortOption>('latest')

  // ============================================================
  // HELPERS
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

  // ============================================================
  // COMPUTED — BASIC DATA
  // ============================================================

  const totalProjects = computed(() => projects.value.length)

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
   * Get project by id
   */
  const projectById = computed(() => {
    return (id: string) =>
      projects.value.find(p => p.id === id)
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

  // ============================================================
  // COMPUTED — FILTER OPTIONS
  // ============================================================

  /**
   * Available years from projects (for Year filter)
   */
  const availableYears = computed<number[]>(() => {
    const years = new Set<number>()

    projects.value.forEach(project => {
      if (project.endDate) {
        years.add(new Date(project.endDate).getFullYear())
      }
    })

    return Array.from(years).sort((a, b) => b - a)
  })

  /**
   * Available categories with labels (for Category filter)
   */
  const categoryOptions = computed(() => {
    const categories = new Set<string>()

    projects.value.forEach(p => {
      if (p.category?.category) categories.add(p.category.category)
    })

    return [
      { label: 'All Types', value: null },
      ...Array.from(categories).sort().map(cat => ({
        label: CATEGORY_LABELS[cat] || cat,
        value: cat
      }))
    ]
  })

  /**
   * Stack options grouped by type (for Stack filter)
   */
  const stackOptionsGrouped = computed(() => {
    const stackMap = {
      technologies: new Set<string>(),
      tools: new Set<string>(),
      methodologies: new Set<string>(),
      platforms: new Set<string>(),
      domains: new Set<string>(),
      skills: new Set<string>()
    }

    projects.value.forEach(p => {
      p.stack.technologies?.forEach(t => stackMap.technologies.add(t))
      p.stack.tools?.forEach(t => stackMap.tools.add(t))
      p.stack.methodologies?.forEach(m => stackMap.methodologies.add(m))
      p.stack.platforms?.forEach(pl => stackMap.platforms.add(pl))
      p.stack.domains?.forEach(d => stackMap.domains.add(d))
      p.stack.skills?.forEach(s => stackMap.skills.add(s))
    })

    return [
      {
        label: 'Technologies',
        code: 'tech',
        items: Array.from(stackMap.technologies).sort()
      },
      {
        label: 'Tools',
        code: 'tools',
        items: Array.from(stackMap.tools).sort()
      },
      {
        label: 'Methodologies',
        code: 'method',
        items: Array.from(stackMap.methodologies).sort()
      },
      {
        label: 'Platforms',
        code: 'platform',
        items: Array.from(stackMap.platforms).sort()
      },
      {
        label: 'Domains',
        code: 'domain',
        items: Array.from(stackMap.domains).sort()
      },
      {
        label: 'Skills',
        code: 'skill',
        items: Array.from(stackMap.skills).sort()
      }
    ].filter(group => group.items.length > 0)
  })

  /**
   * All stack items flattened (for Select All functionality)
   */
  const allStackItems = computed(() => {
    return stackOptionsGrouped.value.flatMap(group => group.items)
  })

  /**
   * All unique stack options across projects (legacy, for compatibility)
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

  // ============================================================
  // COMPUTED — FILTERING & SORTING
  // ============================================================

  /**
   * Projects after applying search, stack & category filters
   */
  const filteredProjects = computed(() => {
    let results = [...projects.value]

    // Search filter
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

    // Stack filter
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

    // Category filter
    if (selectedCategory.value) {
      results = results.filter(
        project =>
          project.category?.category === selectedCategory.value
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
      const year = Number(sortBy.value.split('-')[1])

      return results
        .filter(p => new Date(p.endDate).getFullYear() === year)
        .sort(
          (a, b) =>
            new Date(b.endDate).getTime() -
            new Date(a.endDate).getTime()
        )
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
  // ACTIONS
  // ============================================================

  const fetchProjects = async (): Promise<void> => {
    loading.value = true
    error.value = null

    try {
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

  const setSearchQuery = (query?: string): void => {
    searchQuery.value = query || ''
  }

  const setSelectedStacks = (stacks?: string[]): void => {
    selectedStacks.value = stacks || []
  }

  const setSelectedCategory = (category?: string | null): void => {
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

    // Basic data
    totalProjects,
    featuredProjects,
    projectById,
    projectsByCategory,

    // Filter options
    availableYears,
    categoryOptions,
    stackOptionsGrouped,
    allStackItems,
    allStackOptions, // legacy

    // Filtered data
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
