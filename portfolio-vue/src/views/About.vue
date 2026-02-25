<script setup lang="ts">
import { onMounted } from 'vue'
import { useProfileStore } from '../stores/profile'

const profileStore = useProfileStore()

// Computed para labels de categorías
const categoryLabels: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  data: 'Bases de Datos',
  devops: 'DevOps & Tools',
  qa: 'QA & Testing',
  pm: 'Project Management',
  soft: 'Soft Skills',
  other: 'Other'
}

// Computed para íconos de timeline por tipo
const getTimelineIcon = (type: string) => {
  const icons: Record<string, string> = {
    education: 'pi-graduation-cap',
    achievement: 'pi-trophy',
    project: 'pi-code',
    certification: 'pi-verified',
    experience: 'pi-briefcase'
  }
  return icons[type] || 'pi-circle'
}

// Computed para colores de proficiency badges
const getProficiencyColor = (proficiency: string) => {
  const colors: Record<string, string> = {
    expert: 'bg-accent-700 text-white',
    advanced: 'bg-accent-600 text-white',
    intermediate: 'bg-primary-300 dark:bg-primary-700 text-text-light-primary dark:text-text-dark-primary',
    beginner: 'bg-primary-200 dark:bg-primary-800 text-text-light-secondary dark:text-text-dark-secondary'
  }
  return colors[proficiency] || colors.beginner
}

// Formato de fecha para timeline
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES', { 
    month: 'short', 
    year: 'numeric' 
  })
}

onMounted(() => {
  profileStore.fetchProfile()
})
</script>

<template>
  <div class="space-y-20">
    
    <!-- ==========================
        LOADING SKELETON
    =========================== -->
    <div v-if="profileStore.loading" class="space-y-20 animate-pulse">
      <div class="text-center space-y-6">
        <div class="w-40 h-40 rounded-full bg-primary-300 dark:bg-primary-700 mx-auto"></div>
        <div class="h-8 bg-primary-300 dark:bg-primary-700 rounded w-64 mx-auto"></div>
        <div class="h-4 bg-primary-300 dark:bg-primary-700 rounded w-96 mx-auto"></div>
      </div>
    </div>

    <!-- ==========================
        CONTENT
    =========================== -->
    <div v-else class="max-w-4xl mx-auto space-y-20">
      
      <!-- ==========================
          HERO SECTION
      =========================== -->
      <section class="text-center space-y-8">
        <!-- Avatar -->
        <div class="relative w-55 h-55 mx-auto">
          <img
            :src="profileStore.profile.avatar"
            :alt="profileStore.profile.name"
            class="w-full h-full rounded-full object-cover shadow-2xl border-4 border-primary-300 dark:border-primary-700"
          />
        </div>

        <!-- Name & Title -->
        <div class="space-y-3">
          <h1 class="text-4xl md:text-5xl font-bold text-text-light-primary dark:text-text-dark-primary">
            {{ profileStore.profile.name }}
          </h1>
          <p class="text-xl md:text-2xl text-accent-700 dark:text-accent-600 font-semibold">
            {{ profileStore.profile.title }}
          </p>
          <p class="text-lg text-text-light-secondary dark:text-text-dark-secondary max-w-2xl mx-auto leading-relaxed">
            {{ profileStore.profile.bio }}
          </p>
        </div>

        <!-- Social Links -->
        <div class="flex items-center justify-center gap-4 pt-4">
          <a
            v-if="profileStore.profile.social.github"
            :href="profileStore.profile.social.github"
            target="_blank"
            rel="noopener noreferrer"
            class="w-14 h-14 rounded-full bg-primary-300 dark:bg-primary-700 hover:bg-accent-700 dark:hover:bg-accent-600 text-text-light-primary dark:text-text-dark-primary hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110"
            aria-label="GitHub"
          >
            <i class="pi pi-github text-2xl"></i>
          </a>

          <a
            v-if="profileStore.profile.social.linkedin"
            :href="profileStore.profile.social.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="w-14 h-14 rounded-full bg-primary-300 dark:bg-primary-700 hover:bg-accent-700 dark:hover:bg-accent-600 text-text-light-primary dark:text-text-dark-primary hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110"
            aria-label="LinkedIn"
          >
            <i class="pi pi-linkedin text-2xl"></i>
          </a>

          <a
            :href="`mailto:${profileStore.profile.social.email}`"
            class="w-14 h-14 rounded-full bg-primary-300 dark:bg-primary-700 hover:bg-accent-700 dark:hover:bg-accent-600 text-text-light-primary dark:text-text-dark-primary hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110"
            aria-label="Email"
          >
            <i class="pi pi-envelope text-2xl"></i>
          </a>

          <a
            v-if="profileStore.profile.social.website"
            :href="profileStore.profile.social.website"
            target="_blank"
            rel="noopener noreferrer"
            class="w-14 h-14 rounded-full bg-primary-300 dark:bg-primary-700 hover:bg-accent-700 dark:hover:bg-accent-600 text-text-light-primary dark:text-text-dark-primary hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110"
            aria-label="Website"
          >
            <i class="pi pi-globe text-2xl"></i>
          </a>
        </div>
      </section>

      <!-- ==========================
          STORY SECTION
      =========================== -->
      <section class="space-y-8">
        <h2 class="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary text-center">
          Mi Historia
        </h2>
        <div class="prose prose-lg max-w-none">
          <p
            v-for="(paragraph, i) in profileStore.profile.story.split('\n\n')"
            :key="i"
            class="text-base text-text-light-secondary dark:text-text-dark-secondary leading-relaxed mb-6"
          >
            {{ paragraph }}
          </p>
        </div>
      </section>

      <!-- ==========================
          SKILLS SECTION
      =========================== -->
      <section v-if="profileStore.profile.skills?.length" class="space-y-8">
        <h2 class="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary text-center">
          Habilidades
        </h2>
        <div class="space-y-8">
          <div
            v-for="(skills, category) in profileStore.skillsByCategory"
            :key="category"
            class="space-y-4"
          >
            <h3 class="text-xs uppercase tracking-widest text-text-light-muted dark:text-text-dark-muted font-bold">
              {{ categoryLabels[category] || category }}
            </h3>
            <div class="flex flex-wrap gap-3">
              <span
                v-for="skill in skills"
                :key="skill.name"
                :class="[
                  'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg',
                  getProficiencyColor(skill.proficiency)
                ]"
                :title="`${skill.name} - ${skill.proficiency}`"
              >
                {{ skill.name }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- ==========================
          CERTIFICATIONS SECTION
      =========================== -->
      <section v-if="profileStore.profile.certifications?.length" class="space-y-8">
        <h2 class="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary text-center">
          Certificaciones y Reconocimientos
        </h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div
            v-for="cert in profileStore.profile.certifications"
            :key="cert.title"
            class="bg-primary-400 dark:bg-primary-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 space-y-3"
          >
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full bg-accent-700 dark:bg-accent-600 text-white flex items-center justify-center shrink-0">
                <i class="pi pi-verified text-xl"></i>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-bold text-text-light-primary dark:text-text-dark-primary mb-2">
                  {{ cert.title }}
                </h3>
                <p class="text-sm text-text-light-secondary dark:text-text-dark-secondary mb-1">
                  {{ cert.issuer }}
                </p>
                <p class="text-xs text-text-light-muted dark:text-text-dark-muted">
                  {{ formatDate(cert.issueDate) }}
                  <span v-if="cert.expiryDate"> - {{ formatDate(cert.expiryDate) }}</span>
                </p>
                <a
                  v-if="cert.credentialUrl"
                  :href="cert.credentialUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-accent-700 dark:text-accent-600 hover:underline text-sm font-semibold inline-flex items-center gap-1 mt-2"
                >
                  Ver credencial <i class="pi pi-external-link text-xs"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ==========================
          TIMELINE SECTION
      =========================== -->
      <section v-if="profileStore.profile.timeline?.length" class="space-y-8">
        <h2 class="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary text-center">
          Trayectoria
        </h2>
        <div class="relative">
          <!-- Timeline Line -->
          <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-300 dark:bg-primary-700"></div>

          <!-- Timeline Events -->
          <div class="space-y-12">
            <div
              v-for="event in profileStore.sortedTimeline"
              :key="event.id"
              class="relative pl-20"
            >
              <!-- Icon -->
              <div class="absolute left-0 w-16 h-16 rounded-full bg-primary-400 dark:bg-primary-800 border-4 border-primary-300 dark:border-primary-700 flex items-center justify-center shadow-lg">
                <i :class="['text-accent-700 dark:text-accent-600 text-xl', 'pi', getTimelineIcon(event.type)]"></i>
              </div>

              <!-- Content -->
              <div class="bg-primary-400 dark:bg-primary-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 space-y-3">
                <div class="flex items-start justify-between gap-4 flex-wrap">
                  <div class="flex-1">
                    <h3 class="text-xl font-bold text-text-light-primary dark:text-text-dark-primary mb-2">
                      {{ event.title }}
                    </h3>
                    <p class="text-xs uppercase tracking-widest text-text-light-muted dark:text-text-dark-muted font-semibold mb-3">
                      {{ formatDate(event.date) }}
                    </p>
                  </div>
                  <span
                    :class="[
                      'px-3 py-1.5 rounded-full text-xs font-bold',
                      event.type === 'achievement' ? 'bg-accent-700 text-white' :
                      event.type === 'education' ? 'bg-blue-500 text-white' :
                      event.type === 'certification' ? 'bg-green-500 text-white' :
                      'bg-primary-300 dark:bg-primary-700 text-text-light-primary dark:text-text-dark-primary'
                    ]"
                  >
                    {{ event.type === 'achievement' ? 'Logro' :
                       event.type === 'education' ? 'Educación' :
                       event.type === 'certification' ? 'Certificación' :
                       event.type === 'project' ? 'Proyecto' :
                       'Experiencia' }}
                  </span>
                </div>

                <p class="text-base text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                  {{ event.description }}
                </p>

                <!-- Tags -->
                <div v-if="event.tags?.length" class="flex flex-wrap gap-2 pt-2">
                  <span
                    v-for="tag in event.tags"
                    :key="tag"
                    class="px-3 py-1 rounded-full bg-primary-300 dark:bg-primary-700 text-xs font-medium"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>