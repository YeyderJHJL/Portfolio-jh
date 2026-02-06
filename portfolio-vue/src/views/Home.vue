<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectsStore } from '../stores/projects'
import { useSkillsStore } from '../stores/skills'
import { useBlogStore } from '../stores/blog'
import { useTypedText } from '../composables/useTypedText'

// ---------------------------
// ROUTER
// ---------------------------
const router = useRouter()
const goToProjects = () => router.push('/projects')
const goToContact = () => router.push('/contact')
const goToBlogs = () => router.push('/blog')

// ---------------------------
// HERO SECTION - Typed Name
// ---------------------------
const fullName = 'Jhamil Yeyder Turpo Añasco'
const typedName = useTypedText(fullName, 120)

// ---------------------------
// POST SECTION
// ---------------------------
const isDragging = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)
const trackRef = ref<HTMLDivElement | null>(null)

const onMouseDown = (e: MouseEvent) => {
  if (!trackRef.value) return
  isDragging.value = true
  startX.value = e.pageX
  scrollLeft.value = trackRef.value.scrollLeft
}

const onMouseLeave = () => {
  isDragging.value = false
}

const onMouseUp = () => {
  isDragging.value = false
}

const onMouseMove = (e: MouseEvent) => {
  if (!isDragging.value || !trackRef.value) return
  e.preventDefault()
  const x = e.pageX
  const walk = (x - startX.value) * 1.5
  trackRef.value.scrollLeft = scrollLeft.value - walk
}

// ---------------------------
// STORES
// ---------------------------
const projectsStore = useProjectsStore()
const skillsStore = useSkillsStore()
const blogStore = useBlogStore()

// ---------------------------
// COMPUTED DATA
// ---------------------------
const featuredProjects = computed(() => projectsStore.featuredProjects)
const frontendSkills = computed(() =>
  skillsStore.skills.filter(s => s.category === 'frontend')
)
const backendSkills = computed(() =>
  skillsStore.skills.filter(s => s.category === 'backend')
)
const devopsSkills = computed(() =>
  skillsStore.skills.filter(s => s.category === 'devops')
)
const latestPosts = computed(() => blogStore.latestPosts.slice(0, 3))

// ---------------------------
// LIFECYCLE - FETCH DATA
// ---------------------------
onMounted(() => {
  projectsStore.fetchProjects()
  skillsStore.clearError() // mock
  blogStore.fetchPosts()
})
</script>

<template>
  <main class="font-sans">

    <!-- ==========================
        HERO SECTION
    =========================== -->
    <section
      class="
        relative flex flex-col justify-center items-center h-screen text-center
        overflow-hidden
        bg-linear-to-r
        from-accent-500 via-accent-700 to-accent-500
        dark:from-primary-700 dark:via-primary-900 dark:to-primary-700
        animate-gradient-x
      "
    >
      <!-- Typed Name -->
      <h1
        class="text-4xl md:text-6xl font-bold mb-4 tracking-tight
              text-text-light-primary dark:text-text-dark-primary z-10"
      >
        {{ typedName }}
      </h1>

      <!-- Subtitle -->
      <p
        class="text-lg md:text-2xl mb-8
               text-text-light-secondary dark:text-text-dark-secondary z-10"
      >
        Fullstack Developer & Project Manager
      </p>

      <!-- CTA Buttons -->
      <div class="flex gap-4 z-10">
        <button
          @click="goToProjects"
          class="px-6 py-3 rounded-lg font-semibold
                 bg-accent-700 text-text-light-primary
                 hover:bg-accent-600
                 dark:hover:bg-accent-400
                 transition-colors duration-300"
        >
          View Projects
        </button>

        <button
          @click="goToContact"
          class="px-6 py-3 rounded-lg font-semibold
                 bg-accent-200 text-text-light-primary
                 hover:bg-accent-300
                 dark:bg-primary-700 dark:text-text-dark-primary
                 dark:hover:bg-primary-600
                 transition-colors duration-300"
        >
          Contact Me
        </button>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-10 z-10 flex flex-col items-center animate-bounce">
        <span class="block w-3 h-3 rounded-full bg-accent-900 dark:bg-accent-200 mb-2"></span>
        <span class="block w-3 h-3 rounded-full bg-accent-900 dark:bg-accent-200"></span>
      </div>
    </section>

    <!-- ==========================
        FEATURED PROJECTS
    =========================== -->
    <section class="py-16 px-6 max-w-7xl mx-auto justify-center items-center">
      <h2 class="text-3xl font-bold mb-8 justify-center items-center text-text-light-primary dark:text-text-dark-primary">
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
            class="bg-primary-400 dark:bg-primary-800 rounded-lg shadow-lg overflow-hidden transform
                  hover:scale-105 hover:shadow-xl transition-all duration-300"
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
                  v-for="tech in [...(project.techStack.frontend || []), ...(project.techStack.backend || []), ...(project.techStack.devOps || [])]"
                  :key="tech"
                  class="px-2 py-1 rounded bg-accent-200 text-text-light-primary dark:text-text-dark-primary text-xs font-medium"
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
      <div class="mt-4 text-right">
        <button
          @click="goToProjects"
          class="px-6 py-3 
                text-text-light-secondary font-semibold
                dark:text-text-dark-primary
                transition-colors duration-300
                hover:underline"
        >
          View All Projects
        </button>
      </div>
    </section>

    <!-- ==========================
         SKILLS SECTION
    =========================== -->
    <section class="py-16 px-6 max-w-7xl mx-auto">
      <h2 class="text-3xl font-bold mb-8 text-text-light-primary dark:text-text-dark-primary">
        Tech Stack
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <template v-for="(skillsGroup, index) in [frontendSkills, backendSkills, devopsSkills]" :key="index">
          <div class="space-y-4">
            <div
              v-for="skill in skillsGroup"
              :key="skill.name"
              class="flex items-center gap-3"
            >
              <!-- Icon -->
              <div class="w-18 h-18 flex items-center justify-center rounded bg-primary-500 dark:bg-primary-700 text-primary-900 dark:text-accent-200">
                <span class="text-lg font-bold">{{ skill.icon }}</span>
              </div>
              <!-- Skill Info -->
              <div class="flex-1">
                <div class="flex justify-between mb-1">
                  <span class="text-text-light-primary dark:text-text-dark-primary font-medium">{{ skill.name }}</span>
                  <span class="text-xs text-text-light-secondary dark:text-text-dark-secondary">{{ skill.proficiency }}</span>
                </div>
                <div class="h-2 w-full bg-primary-300 dark:bg-primary-600 rounded">
                  <div
                    :class="{
                      'bg-accent-700': skill.proficiency==='expert' || skill.proficiency==='advanced',
                      'bg-accent-600': skill.proficiency==='intermediate',
                      'bg-accent-500': skill.proficiency==='beginner',
                    }"
                    :style="{ width: skill.proficiency==='expert'?'100%': skill.proficiency==='advanced'?'80%': skill.proficiency==='intermediate'?'60%':'40%' }"
                    class="h-2 rounded transition-all duration-500"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>

    <!-- ==========================
         LATEST BLOG POSTS
    =========================== -->
<section class="py-16 px-6 max-w-7xl mx-auto">
  <h2 class="text-3xl font-bold mb-8 text-text-light-primary dark:text-text-dark-primary">
    Latest Posts
  </h2>

  <!-- Container -->
  <div class="relative overflow-hidden">
    <div
      ref="trackRef"
      class="
        flex gap-6 w-max
        overflow-x-scroll md:overflow-hidden
        animate-blog-scroll md:animate-blog-scroll-desktop
        cursor-grab active:cursor-grabbing
      "
      @mousedown="onMouseDown"
      @mouseleave="onMouseLeave"
      @mouseup="onMouseUp"
      @mousemove="onMouseMove"
    >
      <div
        v-for="post in [...latestPosts, ...latestPosts]"
        :key="post.id + Math.random()"
        class="
          flex-none
          w-72 md:w-96
          bg-primary-400 dark:bg-primary-800
          rounded-xl shadow-lg
          overflow-hidden
          transform hover:scale-105 hover:shadow-xl
          transition-all duration-300
        "
      >
        <img
          :src="post.thumbnail"
          :alt="post.title"
          class="w-full h-40 md:h-52 object-cover"
        />
        <div class="p-4">
          <h3 class="font-semibold text-lg mb-1 text-text-light-primary dark:text-text-dark-primary">
            {{ post.title }}
          </h3>
          <p class="text-xs text-text-light-secondary dark:text-text-dark-secondary mb-2">
            {{ post.publishedAt }}
          </p>
          <p class="text-text-light-secondary dark:text-text-dark-secondary text-sm">
            {{ post.excerpt }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- CTA -->
  <div class="mt-6 text-right">
    <button
      @click="goToBlogs"
      class="
        px-6 py-3
        text-text-light-secondary
        dark:text-text-dark-primary
        font-semibold
        hover:underline
        transition-colors duration-300
      "
    >
      View All Posts
    </button>
  </div>
</section>
  </main>
</template>

<style scoped>
/* Animación gradiente hero */
@keyframes gradient-x {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 10s ease infinite;
}

@keyframes blog-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Mobile: más rápido */
.animate-blog-scroll {
  animation: blog-scroll 22s linear infinite;
}

/* Desktop: más lento y elegante */
.animate-blog-scroll-desktop {
  animation: blog-scroll 35s linear infinite;
}

/* Pausa al interactuar */
.animate-blog-scroll:hover,
.animate-blog-scroll-desktop:hover {
  animation-play-state: paused;
}
</style>
