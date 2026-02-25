<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectsStore, CATEGORY_LABELS } from '../stores/projects'
import type { Project } from '../types'
import Button from 'primevue/button'

// ---------------------------
// SETUP
// ---------------------------
const route = useRoute()
const router = useRouter()
const projectsStore = useProjectsStore()

// ---------------------------
// COMPUTED - Project Data
// ---------------------------
const projectId = computed(() => route.params.id as string)
const project = computed<Project | undefined>(() => 
  projectsStore.projectById(projectId.value)
)

// ---------------------------
// COMPUTED - Navigation
// ---------------------------
const allProjects = computed(() => projectsStore.sortedProjects)
const currentIndex = computed(() => 
  allProjects.value.findIndex(p => p.id === projectId.value)
)
const prevProject = computed(() => 
  currentIndex.value > 0 ? allProjects.value[currentIndex.value - 1] : null
)
const nextProject = computed(() => 
  currentIndex.value < allProjects.value.length - 1 
    ? allProjects.value[currentIndex.value + 1] 
    : null
)

// ---------------------------
// COMPUTED - Formatted Data
// ---------------------------
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    month: 'short', 
    year: 'numeric' 
  })
}

const dateRange = computed(() => {
  if (!project.value) return ''
  return `${formatDate(project.value.startDate)} — ${formatDate(project.value.endDate)}`
})

const techStackGroups = computed(() => {
  if (!project.value?.stack) return []
  
  return [
    { label: 'Technologies', items: project.value.stack.technologies || [], icon: '💻' },
    { label: 'Tools', items: project.value.stack.tools || [], icon: '🛠️' },
    { label: 'Methodologies', items: project.value.stack.methodologies || [], icon: '📋' },
    { label: 'Platforms', items: project.value.stack.platforms || [], icon: '☁️' },
    { label: 'Domains', items: project.value.stack.domains || [], icon: '🎯' },
    { label: 'Skills', items: project.value.stack.skills || [], icon: '⚡' }
  ].filter(group => group.items.length > 0)
})

// ---------------------------
// METHODS
// ---------------------------
const goBack = () => router.push('/projects')
const goToProject = (id: string) => router.push(`/projects/${id}`)
</script>

<template>
  <!-- 404 Not Found -->
  <div v-if="!project" class="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-8">
    <div class="w-32 h-32 rounded-full bg-primary-300 dark:bg-primary-700 flex items-center justify-center shadow-lg">
      <i class="pi pi-exclamation-triangle text-6xl text-accent-700 dark:text-accent-600"></i>
    </div>
    <h1 class="text-4xl font-bold text-text-light-primary dark:text-text-dark-primary">
      Project Not Found
    </h1>
    <p class="text-lg text-text-light-secondary dark:text-text-dark-secondary max-w-md">
      The project you're looking for doesn't exist or has been removed.
    </p>
    <Button
      label="Back to Projects"
      icon="pi pi-arrow-left"
      @click="goBack"
      class="px-8 py-4 bg-accent-700 hover:bg-accent-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
      unstyled
    />
  </div>

  <!-- Project Detail -->
  <article v-else class="space-y-24">
    
    <!-- ==========================
        HERO SECTION
    =========================== -->
    <section class="relative -mx-4 md:-mx-8 lg:-mx-16">
      <div class="relative w-full h-[60vh] min-h-100 overflow-hidden rounded-b-3xl">
        <img
          :src="project.images.hero"
          :alt="project.title"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-primary-900/95 via-primary-900/60 to-transparent"></div>
        
        <!-- Title Overlay -->
        <div class="absolute inset-0 flex items-end">
          <div class="container mx-auto px-4 md:px-8 lg:px-16 pb-16 space-y-6">
            <!-- Metadata Tags -->
            <div class="flex flex-wrap items-center gap-3">
              <span class="px-4 py-2 rounded-full bg-accent-700 text-white text-sm font-bold shadow-lg">
                {{ CATEGORY_LABELS[project.category?.category || 'other'] }}
              </span>
              <span class="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold">
                {{ dateRange }}
              </span>
              <span v-if="project.status === 'in-progress'" class="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold flex items-center gap-2">
                <i class="pi pi-clock"></i>
                In Progress
              </span>
            </div>

            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl">
              {{ project.title }}
            </h1>
            
            <p class="text-xl md:text-2xl text-gray-200 max-w-3xl leading-relaxed">
              {{ project.shortDescription }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================
        CONTENT CONTAINER
    =========================== -->
    <div class="max-w-4xl mx-auto px-4 md:px-8 space-y-20">

      <!-- OVERVIEW -->
      <section class="prose prose-lg max-w-none">
        <p class="text-lg text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
          {{ project.fullDescription }}
        </p>
      </section>

      <!-- PROBLEM & SOLUTION -->
      <section class="grid md:grid-cols-2 gap-12">
        <div class="space-y-4">
          <h2 class="text-xs uppercase tracking-widest text-text-light-muted dark:text-text-dark-muted font-bold">
            The Problem
          </h2>
          <p class="text-base text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
            {{ project.problem }}
          </p>
        </div>
        <div class="space-y-4">
          <h2 class="text-xs uppercase tracking-widest text-accent-700 dark:text-accent-600 font-bold">
            The Solution
          </h2>
          <p class="text-base text-text-light-primary dark:text-text-dark-primary leading-relaxed font-medium">
            {{ project.solution }}
          </p>
        </div>
      </section>

      <!-- KEY FEATURES -->
      <section v-if="project.keyFeatures?.length" class="space-y-8">
        <h2 class="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">
          Key Features
        </h2>
        <ul class="grid md:grid-cols-2 gap-6">
          <li
            v-for="(feature, i) in project.keyFeatures"
            :key="i"
            class="flex items-start gap-4"
          >
            <span class="w-8 h-8 rounded-full bg-accent-700 dark:bg-accent-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
              {{ i + 1 }}
            </span>
            <span class="text-base text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
              {{ feature }}
            </span>
          </li>
        </ul>
      </section>

<!-- CHALLENGES -->
<section v-if="project.challenges?.length" class="space-y-8">
  <h2 class="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">
    Challenges & Solutions
  </h2>
  <div class="space-y-10">
    <div
      v-for="(challenge, i) in project.challenges"
      :key="i"
      class="border-l-4 border-accent-700 dark:border-accent-600 pl-8 space-y-4 max-w-3xl"
    >
      <h3 class="text-xl font-bold text-text-light-primary dark:text-text-dark-primary">
        {{ challenge.title }}
      </h3>
      <p class="text-sm text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
        <span class="font-semibold text-text-light-muted dark:text-text-dark-muted uppercase tracking-wider text-xs">Challenge:</span><br>
        {{ challenge.description }}
      </p>
      <p class="text-sm text-text-light-primary dark:text-text-dark-primary leading-relaxed font-medium">
        <span class="font-semibold text-text-light-muted dark:text-text-dark-muted uppercase tracking-wider text-xs">Solution:</span><br>
        {{ challenge.solution }}
      </p>
      <p v-if="challenge.impact" class="text-sm text-accent-700 dark:text-accent-600 font-semibold">
        <span class="font-semibold text-text-light-muted dark:text-text-dark-muted uppercase tracking-wider text-xs">Impact:</span><br>
        {{ challenge.impact }}
      </p>
      <p v-if="challenge.lessonsLearned" class="text-sm text-text-light-secondary dark:text-text-dark-secondary leading-relaxed italic">
        <span class="font-semibold text-text-light-muted dark:text-text-dark-muted uppercase tracking-wider text-xs not-italic">Lessons Learned:</span><br>
        {{ challenge.lessonsLearned }}
      </p>
    </div>
  </div>
</section>

<!-- METRICS -->
<section v-if="project.metrics?.length" class="space-y-8">
  <h2 class="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">
    Results & Impact
  </h2>
  <div 
    :class="[
      'grid gap-8 mx-auto',
      project.metrics.length === 1 ? 'grid-cols-1 max-w-xs' :
      project.metrics.length === 2 ? 'grid-cols-2 max-w-xl' :
      project.metrics.length === 3 ? 'grid-cols-3 max-w-2xl' :
      'grid-cols-2 md:grid-cols-4 max-w-4xl'
    ]"
  >
    <div
      v-for="(metric, i) in project.metrics"
      :key="i"
      class="text-center space-y-3"
    >
      <p class="text-4xl md:text-5xl font-bold text-accent-700 dark:text-accent-600 break-words">
        {{ metric.value }}
      </p>
      <p class="text-xs uppercase tracking-widest text-text-light-muted dark:text-text-dark-muted font-bold break-words">
        {{ metric.label }}
      </p>
    </div>
  </div>
</section>

<!-- TECH STACK -->
<section v-if="techStackGroups.length" class="space-y-8">
  <h2 class="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">
    Tech Stack
  </h2>
  <div class="space-y-6 max-w-3xl">
    <div v-for="group in techStackGroups" :key="group.label" class="space-y-3">
      <h3 class="text-xs uppercase tracking-widest text-text-light-muted dark:text-text-dark-muted font-bold">
        {{ group.icon }} {{ group.label }}
      </h3>
      <div class="flex flex-wrap gap-3">
        <span
          v-for="item in group.items"
          :key="item"
          class="px-4 py-2 rounded-xl bg-primary-300 dark:bg-primary-700 text-sm font-medium hover:bg-primary-200 dark:hover:bg-primary-600 transition-colors"
        >
          {{ item }}
        </span>
      </div>
    </div>
  </div>
</section>

<!-- SCREENSHOTS -->
<section v-if="project.images.screenshots?.length" class="space-y-8">
  <h2 class="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">
    Screenshots
  </h2>
  <div 
    :class="[
      'grid gap-6',
      project.images.screenshots.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' :
      project.images.screenshots.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
      'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    ]"
  >
    <img
      v-for="(screenshot, i) in project.images.screenshots"
      :key="i"
      :src="screenshot"
      :alt="`Screenshot ${i + 1}`"
      loading="lazy"
      class="rounded-2xl shadow-lg w-full hover:shadow-2xl transition-shadow"
    />
  </div>
</section>

      <!-- LINKS -->
      <section v-if="project.links?.length" class="flex flex-wrap justify-center gap-4 pt-8">
        
        <a v-for="link in project.links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="px-8 py-2 bg-accent-700 hover:bg-accent-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-3 text-base"
        >
          <i :class="link.icon === 'external-link' ? 'pi pi-external-link' : 'pi pi-github'"></i>
          {{ link.label }}
        </a>
      </section>

    </div>

    <!-- ==========================
        NAVIGATION
    =========================== -->
    <nav class="max-w-4xl mx-auto px-4 md:px-8 border-t-2 border-primary-300 dark:border-primary-700 pt-16 pb-8">
      <div class="flex items-center justify-between gap-8">
        
        <!-- Previous -->
        <Button
          v-if="prevProject"
          @click="goToProject(prevProject.id)"
          class="flex items-center gap-4 px-2 py-1 hover:bg-primary-300 dark:hover:bg-primary-700 rounded-xl transition-all group"
          unstyled
        >
          <i class="pi pi-arrow-left text-xl text-accent-700 dark:text-accent-600 group-hover:translate-x--1 transition-transform"></i>
          <div class="text-left">
            <p class="text-xs uppercase tracking-wider text-text-light-muted dark:text-text-dark-muted font-semibold mb-1">
              Previous
            </p>
            <p class="text-base font-bold text-text-light-primary dark:text-text-dark-primary line-clamp-1">
              {{ prevProject.title }}
            </p>
          </div>
        </Button>
        <div v-else class="w-1"></div>

        <!-- Back to All -->
        <Button
          @click="goBack"
          class="px-8 py-1 bg-primary-300 dark:bg-primary-700 hover:bg-primary-200 dark:hover:bg-primary-600 rounded-xl font-bold transition-all flex items-center gap-3 shadow-sm"
          unstyled
        >
          <i class="pi pi-th-large"></i>
          All Projects
        </Button>

        <!-- Next -->
        <Button
          v-if="nextProject"
          @click="goToProject(nextProject.id)"
          class="flex items-center gap-4 px-2 py-1 hover:bg-primary-300 dark:hover:bg-primary-700 rounded-xl transition-all group"
          unstyled
        >
          <div class="text-right">
            <p class="text-xs uppercase tracking-wider text-text-light-muted dark:text-text-dark-muted font-semibold mb-1">
              Next
            </p>
            <p class="text-base font-bold text-text-light-primary dark:text-text-dark-primary line-clamp-1">
              {{ nextProject.title }}
            </p>
          </div>
          <i class="pi pi-arrow-right text-xl text-accent-700 dark:text-accent-600 group-hover:translate-x-1 transition-transform"></i>
        </Button>
        <div v-else class="w-1"></div>
      </div>
    </nav>

  </article>
</template>