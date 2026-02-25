<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogStore } from '../stores/blog'
import Button from 'primevue/button'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()

// Get post by slug from route params
const slug = computed(() => route.params.slug as string)
const post = computed(() => blogStore.postBySlug(slug.value))

// Format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES', { 
    day: 'numeric',
    month: 'long', 
    year: 'numeric' 
  })
}

// Navigation
const goBack = () => router.push('/blog')

onMounted(() => {
  blogStore.fetchPosts()
})
</script>

<template>
  <!-- ==========================
      404 NOT FOUND
  =========================== -->
  <div v-if="!post" class="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-8">
    <div class="w-32 h-32 rounded-full bg-primary-300 dark:bg-primary-700 flex items-center justify-center shadow-lg">
      <i class="pi pi-exclamation-triangle text-6xl text-accent-700 dark:text-accent-600"></i>
    </div>
    <h1 class="text-4xl font-bold text-text-light-primary dark:text-text-dark-primary">
      Artículo No Encontrado
    </h1>
    <p class="text-lg text-text-light-secondary dark:text-text-dark-secondary max-w-md">
      El artículo que buscas no existe o ha sido eliminado.
    </p>
    <Button
      label="Volver al Blog"
      icon="pi pi-arrow-left"
      @click="goBack"
      class="px-8 py-4 bg-accent-700 hover:bg-accent-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
      unstyled
    />
  </div>

  <!-- ==========================
      POST CONTENT
  =========================== -->
  <article v-else class="space-y-12">
    
    <!-- ==========================
        BACK BUTTON
    =========================== -->
    <div class="max-w-3xl mx-auto">
      <Button
        @click="goBack"
        class="px-6 py-3 bg-primary-300 dark:bg-primary-700 hover:bg-primary-200 dark:hover:bg-primary-600 rounded-xl font-semibold transition-all flex items-center gap-3 shadow-sm"
        unstyled
      >
        <i class="pi pi-arrow-left"></i>
        Volver al Blog
      </Button>
    </div>

    <!-- ==========================
        HEADER
    =========================== -->
    <header class="max-w-3xl mx-auto space-y-6">
      <!-- Title -->
      <h1 class="text-4xl md:text-5xl font-bold text-text-light-primary dark:text-text-dark-primary leading-tight">
        {{ post.title }}
      </h1>

      <!-- Meta Info -->
      <div class="flex flex-wrap items-center gap-4 text-text-light-muted dark:text-text-dark-muted">
        <div class="flex items-center gap-2">
          <i class="pi pi-user text-sm"></i>
          <span class="font-medium">{{ post.author }}</span>
        </div>
        <div class="w-1 h-1 rounded-full bg-text-light-muted dark:bg-text-dark-muted"></div>
        <div class="flex items-center gap-2">
          <i class="pi pi-calendar text-sm"></i>
          <span>{{ formatDate(post.publishedAt) }}</span>
        </div>
        <div v-if="post.readingTimeMinutes" class="w-1 h-1 rounded-full bg-text-light-muted dark:bg-text-dark-muted"></div>
        <div v-if="post.readingTimeMinutes" class="flex items-center gap-2">
          <i class="pi pi-clock text-sm"></i>
          <span>{{ post.readingTimeMinutes }} min de lectura</span>
        </div>
        <div v-if="post.updatedAt" class="w-1 h-1 rounded-full bg-text-light-muted dark:bg-text-dark-muted"></div>
        <div v-if="post.updatedAt" class="flex items-center gap-2">
          <i class="pi pi-refresh text-sm"></i>
          <span>Actualizado {{ formatDate(post.updatedAt) }}</span>
        </div>
      </div>

      <!-- Tags -->
      <div v-if="post.tags?.length" class="flex flex-wrap gap-3">
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="px-4 py-2 rounded-full bg-accent-700 text-white text-sm font-semibold shadow-sm"
        >
          {{ tag }}
        </span>
      </div>
    </header>

    <!-- ==========================
        THUMBNAIL IMAGE
    =========================== -->
    <div v-if="post.thumbnail" class="max-w-4xl mx-auto">
      <img
        :src="post.thumbnail"
        :alt="post.title"
        class="w-full rounded-2xl shadow-2xl"
      />
    </div>

    <!-- ==========================
        EXCERPT
    =========================== -->
    <div class="max-w-3xl mx-auto">
      <div class="bg-accent-200 dark:bg-accent-900 rounded-2xl p-8 border-l-4 border-accent-700">
        <p class="text-lg text-text-light-primary dark:text-text-dark-primary leading-relaxed font-medium italic">
          {{ post.excerpt }}
        </p>
      </div>
    </div>

    <!-- ==========================
        CONTENT
    =========================== -->
    <div class="mx-auto prose prose-lg max-w-none">
      <div
        v-for="(paragraph, i) in post.content.split('\n\n')"
        :key="i"
        class="mb-6"
      >
        <p class="text-base text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
          {{ paragraph }}
        </p>
      </div>
    </div>

    <!-- ==========================
        FOOTER
    =========================== -->
    <footer class="max-w-3xl mx-auto pt-12 border-t-2 border-primary-300 dark:border-primary-700 space-y-8">
      <!-- Author Info -->
      <div class="bg-primary-400 dark:bg-primary-800 rounded-2xl p-8 shadow-lg space-y-4">
        <div class="flex items-center gap-3">
          <div class="w-16 h-16 rounded-full bg-accent-700 text-white flex items-center justify-center text-2xl font-bold">
            {{ post.author.charAt(0) }}
          </div>
          <div>
            <p class="text-sm text-text-light-muted dark:text-text-dark-muted uppercase tracking-wider font-semibold">
              Escrito por
            </p>
            <p class="text-xl font-bold text-text-light-primary dark:text-text-dark-primary">
              {{ post.author }}
            </p>
          </div>
        </div>
      </div>

      <!-- Back to Blog Button -->
      <div class="flex justify-center pt-4">
        <Button
          @click="goBack"
          class="px-8 py-4 bg-accent-700 hover:bg-accent-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-3"
          unstyled
        >
          <i class="pi pi-arrow-left"></i>
          Volver al Blog
        </Button>
      </div>
    </footer>

  </article>
</template>