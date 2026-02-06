<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectsStore } from '../../stores/projects'

const router = useRouter()
const goToProjects = () => router.push('/projects')

const projectsStore = useProjectsStore()
const featuredProjects = computed(() => projectsStore.featuredProjects)

onMounted(() => {
  projectsStore.fetchProjects()
})
</script>

<template>
  <section class="py-16 px-6 max-w-7xl mx-auto">
    <h2 class="text-3xl font-bold mb-8 text-text-light-primary dark:text-text-dark-primary">
      Featured Projects
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <template v-if="projectsStore.loading">
        <p>Loading projects...</p>
      </template>

      <template v-else>
        <div
          v-for="project in featuredProjects"
          :key="project.id"
          class="
            bg-primary-400 dark:bg-primary-800
            rounded-lg shadow-lg overflow-hidden
            transform hover:scale-105 hover:shadow-xl
            transition-all duration-300
          "
        >
          <img
            :src="project.images.thumbnail"
            :alt="project.title"
            class="w-full h-48 object-cover"
          />

          <div class="p-4">
            <h3 class="font-semibold text-xl mb-2 text-text-light-primary dark:text-text-dark-primary">
              {{ project.title }}
            </h3>

            <p class="text-text-light-secondary dark:text-text-dark-secondary mb-3">
              {{ project.shortDescription }}
            </p>

            <div class="flex flex-wrap gap-2 mb-3">
              <span
                v-for="tech in [
                  ...(project.techStack.frontend || []),
                  ...(project.techStack.backend || []),
                  ...(project.techStack.devOps || [])
                ]"
                :key="tech"
                class="px-2 py-1 rounded bg-accent-200 dark:bg-primary-700
                       text-text-light-primary dark:text-text-dark-primary
                       text-xs font-medium"
              >
                {{ tech }}
              </span>
            </div>

            <div class="flex gap-3">
              <a
                v-for="link in project.links"
                :key="link.url"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-accent-700 hover:text-accent-600 font-semibold text-sm"
              >
                {{ link.label }}
              </a>
            </div>
          </div>
        </div>
      </template>
    </div>

    <div class="mt-6 text-right">
      <button
        @click="goToProjects"
        class="px-6 py-3 text-text-light-secondary dark:text-text-dark-primary
               font-semibold hover:underline transition-colors duration-300"
      >
        View All Projects
      </button>
    </div>
  </section>
</template>
