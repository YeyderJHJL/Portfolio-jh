// FILE: src/stores/blog.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { BlogPost } from "../types";

// ============================================================
// MOCK DATA - Blog posts de ejemplo
// ============================================================
const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "nasa-space-apps-2025",
    title: "Finalista Global en NASA Space Apps Challenge 2025",
    excerpt:
      "Experiencia internacional desarrollando plataforma web de análisis de datos satelitales.",
    content:
      "Durante el NASA Space Apps Challenge 2025, nuestro equipo desarrolló BioForecast, una plataforma para análisis de aptitud de suelos y datos satelitales. Integración de APIs, despliegue en Vercel y trabajo en equipo con mentores técnicos.",
    author: "Jhamil Yeyder Turpo Añasco",
    publishedAt: "2025-10-15",
    updatedAt: "2025-10-20",
    tags: ["NASA", "Space Apps", "Web Development", "Data Analysis"],
    featured: true,
    readingTimeMinutes: 5,
    thumbnail:
      "https://images.unsplash.com/photo-1611606063065-cb86f3fb9bcf?w=400&h=300&fit=crop",
    seoDescription:
      "BioForecast - Plataforma web de análisis de datos satelitales y aptitud de suelos desarrollada en NASA Space Apps Challenge 2025",
  },
  {
    id: "2",
    slug: "flowtechai-hackaton-innovasur",
    title: "FlowTechAI - Hackatón Innovasur 2025",
    excerpt:
      "Lideré un equipo multidisciplinario para desarrollar un prototipo funcional de software.",
    content:
      "En la III Hackatón Innovasur 2025 coordiné el flujo de trabajo, definí la arquitectura técnica y lideré la presentación final del proyecto FlowTechAI. Implementamos un prototipo funcional usando Figma, validación técnica y pruebas iniciales.",
    author: "Jhamil Yeyder Turpo Añasco",
    publishedAt: "2025-10-10",
    tags: ["Hackathon", "Team Leadership", "Prototyping", "Innovation"],
    featured: true,
    readingTimeMinutes: 4,
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    seoDescription:
      "FlowTechAI - Prototipo desarrollado en Hackatón Innovasur 2025 con liderazgo técnico",
  },
  {
    id: "3",
    slug: "tical-2025-costarica",
    title: "TICAL 2025 - Innovación y Ecosistemas Tecnológicos",
    excerpt:
      "Representé a la UNSA en Costa Rica en el financiamiento PIPE y networking TIC.",
    content:
      "Durante TICAL 2025 fui ganador de financiamiento PIPE de la UNSA, participando en eventos internacionales de TIC, transformación digital y ecosistemas de innovación, representando a la universidad en un entorno de alto nivel tecnológico.",
    author: "Jhamil Yeyder Turpo Añasco",
    publishedAt: "2025-11-05",
    tags: ["Innovation", "TIC", "Networking", "PIPE"],
    featured: false,
    readingTimeMinutes: 3,
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    seoDescription:
      "TICAL 2025 - Participación y financiamiento PIPE para proyectos TIC",
  },
];

// ============================================================
// STORE
// ============================================================
export const useBlogStore = defineStore("blog", () => {
  // State
  const posts = ref<BlogPost[]>(MOCK_BLOG_POSTS);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Filter state
  const searchQuery = ref("");
  const selectedTags = ref<string[]>([]);

  // ============================================================
  // GETTERS
  // ============================================================
  const featuredPosts = computed(() => posts.value.filter((p) => p.featured));

  const latestPosts = computed(() =>
    [...posts.value].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
  );

  const postById = computed(() => (id: string) =>
    posts.value.find((p) => p.id === id)
  );
  /**
   * Get post by slug
   */
  const postBySlug = computed(() => (slug: string) =>
    posts.value.find((p) => p.slug === slug)
  );

  const postsByTag = computed(() => (tag: string) =>
    posts.value.filter((p) => p.tags?.includes(tag))
  );

  /**
   * All unique tags from all posts
   */
  const allTags = computed(() => {
    const tagsSet = new Set<string>();
    posts.value.forEach((post) => {
      post.tags?.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  });

  const totalPosts = computed(() => posts.value.length);

  /**
   * Filtered and sorted posts based on search and tags
   */
  const filteredPosts = computed(() => {
    let results = [...posts.value];

    // Search filter
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase();
      results = results.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Tags filter
    if (selectedTags.value.length > 0) {
      results = results.filter((post) =>
        selectedTags.value.every((tag) => post.tags?.includes(tag))
      );
    }

    // Sort by date (most recent first)
    results.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return results;
  });

  // ============================================================
  // ACTIONS
  // ============================================================
  const fetchPosts = async (): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      // En producción: fetch de API real
      // posts.value = await fetch('/api/blog').then(res => res.json());
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Error fetching posts";
      console.error("Error fetching posts:", err);
    } finally {
      loading.value = false;
    }
  };

  const addPost = (post: BlogPost): void => {
    if (!post.id || !post.title) {
      error.value = "Post must have id and title";
      return;
    }

    if (posts.value.some((p) => p.id === post.id)) {
      error.value = `Post with id ${post.id} already exists`;
      return;
    }

    posts.value.push(post);
    error.value = null;
  };

  const updatePost = (id: string, updates: Partial<BlogPost>): void => {
    const index = posts.value.findIndex((p) => p.id === id);
    if (index === -1) {
      error.value = `Post with id ${id} not found`;
      return;
    }

    posts.value[index] = { ...posts.value[index], ...updates, id } as BlogPost;
    error.value = null;
  };

  const deletePost = (id: string): void => {
    const index = posts.value.findIndex((p) => p.id === id);
    if (index === -1) {
      error.value = `Post with id ${id} not found`;
      return;
    }

    posts.value.splice(index, 1);
    error.value = null;
  };

  const clearError = (): void => {
    error.value = null;
  };

  const toggleTag = (tag: string): void => {
    const i = selectedTags.value.indexOf(tag);
    if (i >= 0) selectedTags.value.splice(i, 1);
    else selectedTags.value.push(tag);
  };

  const clearFilters = (): void => {
    searchQuery.value = "";
    selectedTags.value = [];
  };

  // ============================================================
  // EXPORT
  // ============================================================
  return {
    posts,
    loading,
    error,
    searchQuery,
    selectedTags,

    featuredPosts,
    latestPosts,
    postById,
    postBySlug,
    postsByTag,
    allTags,
    totalPosts,

    filteredPosts,

    fetchPosts,
    addPost,
    updatePost,
    deletePost,
    clearError,
    toggleTag,
    clearFilters,
  };
});
