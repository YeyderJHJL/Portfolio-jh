<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectsStore } from '../../stores/projects'

const router = useRouter()
const goToProjects = () => router.push('/projects')
const goToProject = (id: string) => router.push(`/projects/${id}`)

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

    <div v-if="projectsStore.loading" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div
        v-for="n in 3"
        :key="n"
        class="bg-primary-400 dark:bg-primary-800 rounded-lg overflow-hidden animate-pulse"
      >
        <div class="w-full h-48 bg-primary-300 dark:bg-primary-700"></div>
        <div class="p-6 space-y-3">
          <div class="h-6 bg-primary-300 dark:bg-primary-700 rounded w-3/4"></div>
          <div class="h-4 bg-primary-300 dark:bg-primary-700 rounded w-full"></div>
          <div class="h-4 bg-primary-300 dark:bg-primary-700 rounded w-5/6"></div>
          <div class="flex gap-2">
            <div class="h-6 bg-primary-300 dark:bg-primary-700 rounded w-16"></div>
            <div class="h-6 bg-primary-300 dark:bg-primary-700 rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else-if="featuredProjects.length === 0"
      class="flex flex-col items-center justify-center py-20 text-center"
    >
      <i class="pi pi-inbox text-6xl text-text-light-muted dark:text-text-dark-muted mb-4"></i>
      <h3 class="text-2xl font-semibold mb-2">
        No projects found
      </h3>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <article
        v-for="project in featuredProjects"
        :key="project.id"
        @click="goToProject(project.id)"
        class="bg-primary-400 dark:bg-primary-800 
                rounded-lg overflow-hidden shadow-lg
                transform hover:scale-105 hover:shadow-xl
                transition-all duration-300 cursor-pointer"
      >
        <!-- Image -->
        <div class="relative w-full aspect-video overflow-hidden bg-primary-300 dark:bg-primary-700">
          <img
            :src="project.images.thumbnail"
            :alt="project.title"
            class="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-primary-900/0 hover:bg-primary-900/20 dark:hover:bg-primary-950/40 transition-colors duration-300"></div>
        </div>

        <!-- Content -->
        <div class="p-6">
          <h3 class="text-xl font-semibold mb-2 hover:text-accent-700 dark:hover:text-accent-600 transition-colors">
            {{ project.title }}
          </h3>

          <p class="text-text-light-secondary dark:text-text-dark-secondary mb-4 line-clamp-2">
            {{ project.shortDescription }}
          </p>

          <!-- stack Badges -->
          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="stack in projectsStore.getStacksForProject(project).slice(0, 4)"
              :key="stack"
              class="px-2 py-1 rounded bg-accent-200 dark:bg-primary-700 text-xs font-medium"
            >
              {{ stack }}
            </span>
            <span
              v-if="projectsStore.getStacksForProject(project).length > 4"
              class="px-2 py-1 rounded bg-primary-300 dark:bg-primary-700 text-text-light-muted dark:text-text-dark-muted text-xs font-medium"
            >
              +{{ projectsStore.getStacksForProject(project).length - 4 }}
            </span>
          </div>

          <!-- Links -->
          <div class="flex gap-3">
            <a
              v-for="link in project.links"
              :key="link.url"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-accent-700 hover:text-accent-600 font-semibold text-sm"
            >
            <i :class="link.icon === 'external-link' ? 'pi pi-external-link' : 'pi pi-github'"></i>
              {{ link.label }}
            </a>
          </div>
        </div>
      </article>
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
