<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '../stores/blog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const router = useRouter()
const blogStore = useBlogStore()

// Methods
const goToPost = (slug: string) => {
  router.push(`/blog/${slug}`)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES', { 
    day: 'numeric',
    month: 'long', 
    year: 'numeric' 
  })
}

const handleClearFilters = () => {
  blogStore.clearFilters()
}

onMounted(() => {
  blogStore.fetchPosts()
})
</script>

<template>
  <div class="space-y-12">
    
    <!-- ==========================
        HEADER
    =========================== -->
    <header class="text-center space-y-4">
      <h1 class="text-4xl md:text-5xl font-bold text-text-light-primary dark:text-text-dark-primary">
        Blog
      </h1>
      <p class="text-lg md:text-xl text-text-light-secondary dark:text-text-dark-secondary max-w-2xl mx-auto leading-relaxed">
        Experiencias, aprendizajes y reflexiones sobre tecnología, desarrollo y gestión de proyectos
      </p>
    </header>

    <!-- ==========================
        LOADING SKELETON
    =========================== -->
    <div v-if="blogStore.loading" class="space-y-8 animate-pulse">
      <div class="h-12 bg-primary-300 dark:bg-primary-700 rounded-xl w-full"></div>
      <div class="h-64 bg-primary-300 dark:bg-primary-700 rounded-2xl w-full"></div>
      <div class="h-64 bg-primary-300 dark:bg-primary-700 rounded-2xl w-full"></div>
    </div>

    <!-- ==========================
        CONTENT
    =========================== -->
    <div v-else class="max-w-3xl mx-auto space-y-12">
      
      <!-- ==========================
          FEATURED POSTS
      =========================== -->
      <section v-if="blogStore.featuredPosts.length > 0" class="space-y-6">
        <div class="flex items-center gap-3">
          <i class="pi pi-star-fill text-accent-700 dark:text-accent-600 text-xl"></i>
          <h2 class="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">
            Destacados
          </h2>
        </div>

        <div class="space-y-6">
          <article
            v-for="post in blogStore.featuredPosts"
            :key="post.id"
            @click="goToPost(post.slug)"
            class="bg-primary-400 dark:bg-primary-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-1"
          >
            <div class="md:flex">
              <!-- Image -->
              <div v-if="post.thumbnail" class="md:w-2/5 relative overflow-hidden bg-primary-300 dark:bg-primary-700 aspect-video md:aspect-auto">
                <img
                  :src="post.thumbnail"
                  :alt="post.title"
                  loading="lazy"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div class="absolute inset-0 bg-linear-to-t from-primary-900/60 to-transparent"></div>
                <span class="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-accent-700 text-white text-xs font-bold shadow-lg">
                  Destacado
                </span>
              </div>

              <!-- Content -->
              <div class="md:w-3/5 p-8 space-y-4">
                <div class="space-y-2">
                  <h3 class="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary group-hover:text-accent-700 dark:group-hover:text-accent-600 transition-colors line-clamp-2">
                    {{ post.title }}
                  </h3>
                  <div class="flex items-center gap-4 text-sm text-text-light-muted dark:text-text-dark-muted">
                    <span class="flex items-center gap-1.5">
                      <i class="pi pi-calendar text-xs"></i>
                      {{ formatDate(post.publishedAt) }}
                    </span>
                    <span v-if="post.readingTimeMinutes" class="flex items-center gap-1.5">
                      <i class="pi pi-clock text-xs"></i>
                      {{ post.readingTimeMinutes }} min
                    </span>
                  </div>
                </div>

                <p class="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed line-clamp-3">
                  {{ post.excerpt }}
                </p>

                <!-- Tags -->
                <div v-if="post.tags?.length" class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in post.tags.slice(0, 4)"
                    :key="tag"
                    class="px-3 py-1 rounded-full bg-primary-300 dark:bg-primary-700 text-xs font-medium"
                  >
                    {{ tag }}
                  </span>
                </div>

                <!-- Read More -->
                <div class="pt-2">
                  <span class="text-accent-700 dark:text-accent-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Leer más
                    <i class="pi pi-arrow-right text-sm"></i>
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- ==========================
          FILTERS
      =========================== -->
      <section class="space-y-6">
        <h2 class="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">
          Todos los Artículos
        </h2>

        <!-- Search Bar -->
        <div class="relative">
          <i class="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-text-light-muted dark:text-text-dark-muted z-10 text-lg"></i>
          <InputText
            v-model="blogStore.searchQuery"
            placeholder="Buscar artículos..."
            class="w-full h-14 pl-12 pr-4 rounded-xl bg-primary-400 dark:bg-primary-800 border-2 border-transparent focus:border-accent-700 dark:focus:border-accent-600 text-text-light-primary dark:text-text-dark-primary placeholder:text-text-light-muted dark:placeholder:text-text-dark-muted outline-none transition-all duration-200 text-base"
            unstyled
          />
        </div>

        <!-- Tags Filter -->
        <div v-if="blogStore.allTags.length > 0" class="space-y-3">
          <p class="text-sm font-semibold text-text-light-muted dark:text-text-dark-muted uppercase tracking-wider">
            Filtrar por tema
          </p>
          <div class="flex flex-wrap gap-3">
            <button
              v-for="tag in blogStore.allTags"
              :key="tag"
              @click="blogStore.toggleTag(tag)"
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                blogStore.selectedTags.includes(tag)
                  ? 'bg-accent-700 text-white shadow-lg scale-105'
                  : 'bg-primary-300 dark:bg-primary-700 text-text-light-primary dark:text-text-dark-primary hover:bg-primary-200 dark:hover:bg-primary-600'
              ]"
            >
              {{ tag }}
            </button>
          </div>
        </div>

        <!-- Active Filters -->
        <div v-if="blogStore.searchQuery || blogStore.selectedTags.length > 0" class="flex items-center gap-3 flex-wrap pt-2">
          <span class="text-sm font-semibold text-text-light-muted dark:text-text-dark-muted flex items-center gap-2">
            <i class="pi pi-filter-fill"></i>
            Filtros activos:
          </span>
          
          <span v-if="blogStore.searchQuery" class="px-4 py-2 rounded-full bg-accent-700 text-white text-sm font-medium shadow-sm">
            "{{ blogStore.searchQuery }}"
          </span>

          <span
            v-for="tag in blogStore.selectedTags"
            :key="tag"
            class="px-4 py-2 rounded-full bg-accent-600 text-white text-sm font-medium shadow-sm"
          >
            {{ tag }}
          </span>

          <button
            @click="handleClearFilters"
            class="ml-auto px-4 py-2 rounded-full text-sm font-semibold text-accent-700 dark:text-accent-600 hover:bg-accent-200 dark:hover:bg-accent-900 transition-all flex items-center gap-2"
          >
            <i class="pi pi-times-circle"></i>
            Limpiar filtros
          </button>
        </div>

        <!-- Results Counter -->
        <div class="text-center pt-2">
          <span class="text-sm text-text-light-secondary dark:text-text-dark-secondary">
            Mostrando <span class="font-bold text-accent-700 dark:text-accent-600">{{ blogStore.filteredPosts.length }}</span> de {{ blogStore.totalPosts }} artículos
          </span>
        </div>
      </section>

      <!-- ==========================
          EMPTY STATE
      =========================== -->
      <div
        v-if="blogStore.filteredPosts.length === 0"
        class="flex flex-col items-center justify-center py-20 text-center"
      >
        <div class="w-32 h-32 rounded-full bg-primary-300 dark:bg-primary-700 flex items-center justify-center mb-8 shadow-lg">
          <i class="pi pi-inbox text-6xl text-text-light-muted dark:text-text-dark-muted"></i>
        </div>
        <h3 class="text-3xl font-bold mb-3 text-text-light-primary dark:text-text-dark-primary">
          No se encontraron artículos
        </h3>
        <p class="text-lg text-text-light-secondary dark:text-text-dark-secondary mb-8 max-w-md leading-relaxed">
          Intenta ajustar los filtros de búsqueda para descubrir más contenido
        </p>
        <Button
          label="Limpiar Filtros"
          icon="pi pi-filter-slash"
          @click="handleClearFilters"
          class="px-8 py-4 bg-accent-700 hover:bg-accent-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          unstyled
        />
      </div>

      <!-- ==========================
          POSTS LIST (ONE COLUMN)
      =========================== -->
      <section v-else class="space-y-6">
        <article
          v-for="post in blogStore.filteredPosts"
          :key="post.id"
          @click="goToPost(post.slug)"
          class="bg-primary-400 dark:bg-primary-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-1"
        >
          <div class="md:flex">
            <!-- Image -->
            <div v-if="post.thumbnail" class="md:w-2/5 relative overflow-hidden bg-primary-300 dark:bg-primary-700 aspect-video md:aspect-auto">
              <img
                :src="post.thumbnail"
                :alt="post.title"
                loading="lazy"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-linear-to-t from-primary-900/40 to-transparent"></div>
            </div>

            <!-- Content -->
            <div class="md:w-3/5 p-6 md:p-8 space-y-4">
              <div class="space-y-2">
                <h3 class="text-xl md:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary group-hover:text-accent-700 dark:group-hover:text-accent-600 transition-colors line-clamp-2">
                  {{ post.title }}
                </h3>
                <div class="flex items-center gap-4 text-sm text-text-light-muted dark:text-text-dark-muted">
                  <span class="flex items-center gap-1.5">
                    <i class="pi pi-user text-xs"></i>
                    {{ post.author }}
                  </span>
                  <span class="flex items-center gap-1.5">
                    <i class="pi pi-calendar text-xs"></i>
                    {{ formatDate(post.publishedAt) }}
                  </span>
                  <span v-if="post.readingTimeMinutes" class="flex items-center gap-1.5">
                    <i class="pi pi-clock text-xs"></i>
                    {{ post.readingTimeMinutes }} min
                  </span>
                </div>
              </div>

              <p class="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed line-clamp-2 md:line-clamp-3">
                {{ post.excerpt }}
              </p>

              <!-- Tags -->
              <div v-if="post.tags?.length" class="flex flex-wrap gap-2">
                <span
                  v-for="tag in post.tags.slice(0, 4)"
                  :key="tag"
                  class="px-3 py-1 rounded-full bg-primary-300 dark:bg-primary-700 text-xs font-medium"
                >
                  {{ tag }}
                </span>
              </div>

              <!-- Read More -->
              <div class="pt-2">
                <span class="text-accent-700 dark:text-accent-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Leer artículo completo
                  <i class="pi pi-arrow-right text-sm"></i>
                </span>
              </div>
            </div>
          </div>
        </article>
      </section>

    </div>
  </div>
</template>