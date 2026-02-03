<template>
  <div class="projects">
    <h1>Projects</h1>
    <p>Project list with filters and search will go here</p>
    <p>Featured projects: {{ featuredCount }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useProjectsStore } from "../stores/projects";

const projectsStore = useProjectsStore();

const featuredCount = computed(() => {
  return projectsStore.featuredProjects.length;
});
</script>

<style scoped>
.projects {
  padding: 2rem;
}
</style>
