<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectsStore } from '../stores/projects'
import type { Project } from '../types'
import Button from 'primevue/button'
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'

// ---------------------------
// PROPS
// ---------------------------
interface Props {
  id: string
}

const props = defineProps<Props>()

// ---------------------------
// ROUTER & STORE
// ---------------------------
const router = useRouter()
const projectsStore = useProjectsStore()

// ---------------------------
// COMPUTED - Project Data
// ---------------------------
const project = computed<Project | undefined>(() => {
  return projectsStore.projectById(props.id)
})

const projectNotFound = computed(() => !project.value)

// ---------------------------
// COMPUTED - Navigation
// ---------------------------
const allProjects = computed(() => projectsStore.sortedProjects)

const currentIndex = computed(() => 
  allProjects.value.findIndex(p => p.id === props.id)
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
// COMPUTED - Helpers
// ---------------------------
const categoryLabels: Record<string, string> = {
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

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

const dateRange = computed(() => {
  if (!project.value) return ''
  return `${formatDate(project.value.startDate)} - ${formatDate(project.value.endDate)}`
})

// Tech stack con items
const techStackGroups = computed(() => {
  if (!project.value?.stack) return []
  
  const groups = [
    { label: '💻 Technologies', items: project.value.stack.technologies || [] },
    { label: '🛠️ Tools', items: project.value.stack.tools || [] },
    { label: '📋 Methodologies', items: project.value.stack.methodologies || [] },
    { label: '☁️ Platforms', items: project.value.stack.platforms || [] },
    { label: '🎯 Domains', items: project.value.stack.domains || [] },
    { label: '⚡ Skills', items: project.value.stack.skills || [] }
  ]
  
  return groups.filter(group => group.items.length > 0)
})

// ---------------------------
// METHODS
// ---------------------------
const goBack = () => router.push('/projects')

const goToProject = (id: string) => {
  router.push(`/projects/${id}`)
}
</script>

<template>
  <!-- 404 Not Found -->
  <div v-if="projectNotFound" class="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
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
  <div v-else-if="project" class="space-y-16">
    
    <!-- ==========================
        1. HERO SECTION
    =========================== -->
    <section class="relative -mx-4 md:-mx-8 lg:-mx-16">
      <div class="relative w-full h-[60vh] min-h-100 overflow-hidden">
        <img
          :src="project.images.hero"
          :alt="project.title"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-linear-to-t from-primary-900/95 via-primary-900/60 to-transparent"></div>
        
        <!-- Title Overlay -->
        <div class="absolute inset-0 flex items-end">
          <div class="container mx-auto px-4 md:px-8 lg:px-16 pb-12">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
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
        2. METADATA
    =========================== -->
    <section class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      <!-- Category -->
      <div class="bg-primary-400 dark:bg-primary-800 rounded-2xl p-6 shadow-lg text-center space-y-3">
        <i class="pi pi-folder text-3xl text-accent-700 dark:text-accent-600"></i>
        <div>
          <p class="text-xs uppercase tracking-wider text-text-light-muted dark:text-text-dark-muted font-semibold mb-1">Category</p>
          <p class="text-base font-bold text-text-light-primary dark:text-text-dark-primary">
            {{ categoryLabels[project.category?.category || 'other'] }}
          </p>
        </div>
      </div>

      <!-- Date Range -->
      <div class="bg-primary-400 dark:bg-primary-800 rounded-2xl p-6 shadow-lg text-center space-y-3">
        <i class="pi pi-calendar text-3xl text-accent-700 dark:text-accent-600"></i>
        <div>
          <p class="text-xs uppercase tracking-wider text-text-light-muted dark:text-text-dark-muted font-semibold mb-1">Timeline</p>
          <p class="text-base font-bold text-text-light-primary dark:text-text-dark-primary">
            {{ dateRange }}
          </p>
        </div>
      </div>

      <!-- Status -->
      <div class="bg-primary-400 dark:bg-primary-800 rounded-2xl p-6 shadow-lg text-center space-y-3">
        <i :class="project.status === 'completed' ? 'pi pi-check-circle' : 'pi pi-clock'" class="text-3xl text-accent-700 dark:text-accent-600"></i>
        <div>
          <p class="text-xs uppercase tracking-wider text-text-light-muted dark:text-text-dark-muted font-semibold mb-1">Status</p>
          <p class="text-base font-bold text-text-light-primary dark:text-text-dark-primary capitalize">
            {{ project.status?.replace('-', ' ') || 'Completed' }}
          </p>
        </div>
      </div>

      <!-- Featured Badge -->
      <div class="bg-primary-400 dark:bg-primary-800 rounded-2xl p-6 shadow-lg text-center space-y-3">
        <i :class="project.featured ? 'pi pi-star-fill' : 'pi pi-star'" class="text-3xl text-accent-700 dark:text-accent-600"></i>
        <div>
          <p class="text-xs uppercase tracking-wider text-text-light-muted dark:text-text-dark-muted font-semibold mb-1">Featured</p>
          <p class="text-base font-bold text-text-light-primary dark:text-text-dark-primary">
            {{ project.featured ? 'Yes' : 'No' }}
          </p>
        </div>
      </div>
    </section>

    <!-- ==========================
        3. PROBLEM & SOLUTION
    =========================== -->
    <section class="grid md:grid-cols-2 gap-8">
      <!-- Problem -->
      <div class="bg-primary-400 dark:bg-primary-800 rounded-2xl p-8 shadow-lg space-y-4 border-l-4 border-primary-300 dark:border-primary-600">
        <div class="flex items-center gap-3">
          <i class="pi pi-exclamation-circle text-3xl text-text-light-muted dark:text-text-dark-muted"></i>
          <h2 class="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">The Problem</h2>
        </div>
        <p class="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
          {{ project.problem }}
        </p>
      </div>

      <!-- Solution -->
      <div class="bg-accent-200 dark:bg-accent-900 rounded-2xl p-8 shadow-lg space-y-4 border-l-4 border-accent-700 dark:border-accent-600">
        <div class="flex items-center gap-3">
          <i class="pi pi-lightbulb text-3xl text-accent-700 dark:text-accent-600"></i>
          <h2 class="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">The Solution</h2>
        </div>
        <p class="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
          {{ project.solution }}
        </p>
      </div>
    </section>

    <!-- ==========================
        4. KEY FEATURES
    =========================== -->
    <section v-if="project.keyFeatures && project.keyFeatures.length > 0" class="space-y-8">
      <h2 class="text-3xl md:text-4xl font-bold text-text-light-primary dark:text-text-dark-primary text-center">
        Key Features
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(feature, index) in project.keyFeatures"
          :key="index"
          class="bg-primary-400 dark:bg-primary-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 space-y-3"
        >
          <div class="w-12 h-12 rounded-xl bg-accent-700 dark:bg-accent-600 flex items-center justify-center">
            <span class="text-white font-bold text-lg">{{ index + 1 }}</span>
          </div>
          <p class="text-text-light-primary dark:text-text-dark-primary font-medium leading-relaxed">
            {{ feature }}
          </p>
        </div>
      </div>
    </section>

    <!-- ==========================
        5. CHALLENGES
    =========================== -->
    <section v-if="project.challenges && project.challenges.length > 0" class="space-y-8">
      <h2 class="text-3xl md:text-4xl font-bold text-text-light-primary dark:text-text-dark-primary text-center">
        Technical Challenges
      </h2>
      <Accordion
        :value="[]"
        multiple
        class="space-y-4"
        :pt="{
          accordionPanel: { class: 'bg-primary-400 dark:bg-primary-800 rounded-2xl shadow-lg overflow-hidden' }
        }"
      >
        <AccordionPanel
          v-for="(challenge, index) in project.challenges"
          :key="index"
          :value="String(index)"
        >
          <AccordionHeader
            :pt="{
              root: { class: 'p-6 hover:bg-primary-300 dark:hover:bg-primary-700 transition-all cursor-pointer' },
              toggleIcon: { class: 'text-accent-700 dark:text-accent-600' }
            }"
          >
            <div class="flex items-center gap-4 w-full">
              <div class="w-10 h-10 rounded-lg bg-accent-700 dark:bg-accent-600 flex items-center justify-center shrink-0">
                <i class="pi pi-bolt text-white text-lg"></i>
              </div>
              <h3 class="text-xl font-bold text-text-light-primary dark:text-text-dark-primary">
                {{ challenge.title }}
              </h3>
            </div>
          </AccordionHeader>
          <AccordionContent
            :pt="{
              content: { class: 'px-6 pb-6 space-y-4' }
            }"
          >
            <div class="space-y-4">
              <div>
                <p class="text-sm font-semibold text-text-light-muted dark:text-text-dark-muted uppercase tracking-wider mb-2">Description</p>
                <p class="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                  {{ challenge.description }}
                </p>
              </div>

              <div>
                <p class="text-sm font-semibold text-text-light-muted dark:text-text-dark-muted uppercase tracking-wider mb-2">Solution</p>
                <p class="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                  {{ challenge.solution }}
                </p>
              </div>

              <div v-if="challenge.impact">
                <p class="text-sm font-semibold text-accent-700 dark:text-accent-600 uppercase tracking-wider mb-2">Impact</p>
                <p class="text-text-light-primary dark:text-text-dark-primary font-medium">
                  {{ challenge.impact }}
                </p>
              </div>

              <div v-if="challenge.lessonsLearned">
                <p class="text-sm font-semibold text-text-light-muted dark:text-text-dark-muted uppercase tracking-wider mb-2">Lessons Learned</p>
                <p class="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed italic">
                  {{ challenge.lessonsLearned }}
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </section>

    <!-- ==========================
        6. METRICS
    =========================== -->
    <section v-if="project.metrics && project.metrics.length > 0" class="space-y-8">
      <h2 class="text-3xl md:text-4xl font-bold text-text-light-primary dark:text-text-dark-primary text-center">
        Results & Metrics
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="(metric, index) in project.metrics"
          :key="index"
          class="bg-primary-400 dark:bg-primary-800 rounded-2xl p-6 shadow-lg text-center space-y-3"
        >
          <p class="text-4xl md:text-5xl font-bold text-accent-700 dark:text-accent-600">
            {{ metric.value }}
          </p>
          <p class="text-sm text-text-light-muted dark:text-text-dark-muted uppercase tracking-wider font-semibold">
            {{ metric.label }}
          </p>
        </div>
      </div>
    </section>

    <!-- ==========================
        7. TECH STACK
    =========================== -->
    <section v-if="techStackGroups.length > 0" class="space-y-8">
      <h2 class="text-3xl md:text-4xl font-bold text-text-light-primary dark:text-text-dark-primary text-center">
        Tech Stack
      </h2>
      <div class="space-y-6">
        <div
          v-for="group in techStackGroups"
          :key="group.label"
          class="space-y-3"
        >
          <h3 class="text-lg font-bold text-text-light-primary dark:text-text-dark-primary flex items-center gap-2">
            {{ group.label }}
          </h3>
          <div class="flex flex-wrap gap-3">
            <span
              v-for="item in group.items"
              :key="item"
              class="px-4 py-2.5 rounded-xl bg-primary-400 dark:bg-primary-800 text-text-light-primary dark:text-text-dark-primary font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================
        8. SCREENSHOTS GALLERY
    =========================== -->
    <section v-if="project.images.screenshots && project.images.screenshots.length > 0" class="space-y-8">
      <h2 class="text-3xl md:text-4xl font-bold text-text-light-primary dark:text-text-dark-primary text-center">
        Screenshots
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="(screenshot, index) in project.images.screenshots"
          :key="index"
          class="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <img
            :src="screenshot"
            :alt="`Screenshot ${index + 1}`"
            loading="lazy"
            class="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>

    <!-- ==========================
        9. EXTERNAL LINKS
    =========================== -->
    <section v-if="project.links && project.links.length > 0" class="space-y-8">
      <h2 class="text-3xl md:text-4xl font-bold text-text-light-primary dark:text-text-dark-primary text-center">
        Project Links
      </h2>
      <div class="flex flex-wrap justify-center gap-4">
        <a
          v-for="link in project.links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="px-8 py-4 bg-accent-700 hover:bg-accent-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-3 text-lg"
        >
          <i :class="link.icon === 'external-link' ? 'pi pi-external-link' : link.icon === 'github' ? 'pi pi-github' : 'pi pi-link'"></i>
          {{ link.label }}
        </a>
      </div>
    </section>

    <!-- ==========================
        10. NAVIGATION (PREV/NEXT)
    =========================== -->
    <section class="border-t-2 border-primary-300 dark:border-primary-700 pt-12">
      <div class="flex items-center justify-between gap-8 flex-wrap">
        <!-- Previous Project -->
        <Button
          v-if="prevProject"
          @click="goToProject(prevProject.id)"
          class="flex-1 min-w-50 px-6 py-4 bg-primary-400 dark:bg-primary-800 hover:bg-primary-300 dark:hover:bg-primary-700 rounded-xl shadow-lg hover:shadow-xl transition-all text-left"
          unstyled
        >
          <div class="flex items-center gap-4">
            <i class="pi pi-arrow-left text-2xl text-accent-700 dark:text-accent-600"></i>
            <div>
              <p class="text-xs uppercase tracking-wider text-text-light-muted dark:text-text-dark-muted font-semibold mb-1">Previous</p>
              <p class="text-base font-bold text-text-light-primary dark:text-text-dark-primary line-clamp-1">
                {{ prevProject.title }}
              </p>
            </div>
          </div>
        </Button>
        <div v-else class="flex-1 min-w-50"></div>

        <!-- Back to Projects -->
        <Button
          @click="goBack"
          class="px-8 py-4 bg-accent-700 hover:bg-accent-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-3"
          unstyled
        >
          <i class="pi pi-th-large"></i>
          All Projects
        </Button>

        <!-- Next Project -->
        <Button
          v-if="nextProject"
          @click="goToProject(nextProject.id)"
          class="flex-1 min-w-50 px-6 py-4 bg-primary-400 dark:bg-primary-800 hover:bg-primary-300 dark:hover:bg-primary-700 rounded-xl shadow-lg hover:shadow-xl transition-all text-right"
          unstyled
        >
          <div class="flex items-center justify-end gap-4">
            <div>
              <p class="text-xs uppercase tracking-wider text-text-light-muted dark:text-text-dark-muted font-semibold mb-1">Next</p>
              <p class="text-base font-bold text-text-light-primary dark:text-text-dark-primary line-clamp-1">
                {{ nextProject.title }}
              </p>
            </div>
            <i class="pi pi-arrow-right text-2xl text-accent-700 dark:text-accent-600"></i>
          </div>
        </Button>
        <div v-else class="flex-1 min-w-50"></div>
      </div>
    </section>

  </div>
</template>