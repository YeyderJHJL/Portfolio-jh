<template>
  <div class="project-detail">
    <h1>Project Detail</h1>
    <p v-if="project">
      Project: <strong>{{ project.title }}</strong>
    </p>
    <p v-else>Project not found</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useProjectsStore } from "../stores/projects";
import type { Project } from "../types";

interface Props {
  id: string;
}

const props = defineProps<Props>();
const projectsStore = useProjectsStore();

const project = computed<Project | undefined>(() => {
  return projectsStore.projectById(props.id);
});
</script>

<style scoped>
.project-detail {
  padding: 2rem;
}
</style>
