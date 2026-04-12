// FILE: src/stores/blog.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { BlogPost } from "../types";
import { BLOG_POSTS_DATA } from "../data";

// ============================================================
// STORE
// ============================================================
export const useBlogStore = defineStore("blog", () => {
  // State
  const posts = ref<BlogPost[]>(BLOG_POSTS_DATA);
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
