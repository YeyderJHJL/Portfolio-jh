<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectsStore } from '../stores/projects'
import Button from 'primevue/button'
import Select from 'primevue/select'
import MultiSelect from 'primevue/multiselect'
import TieredMenu from 'primevue/tieredmenu'
import InputText from 'primevue/inputtext'

// ---------------------------
// ROUTER
// ---------------------------
const router = useRouter()

// ---------------------------
// STORE
// ---------------------------
const projectsStore = useProjectsStore()

// ---------------------------
// LOCAL STATE (solo UI)
// ---------------------------
const currentPage = ref(1)
const itemsPerPage = 12
const sortMenu = ref()

// ---------------------------
// COMPUTED - OPTIONS
// ---------------------------

// Labels legibles para categorías
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

// Categorías únicas del store
const categoryOptions = computed(() => {
  const categories = new Set<string>()
  projectsStore.projects.forEach(p => {
    if (p.category?.category) categories.add(p.category.category)
  })
  return [
    { label: 'All Types', value: null },
    ...Array.from(categories).sort().map(cat => ({
      label: categoryLabels[cat] || cat,
      value: cat
    }))
  ]
})

// Stack agrupado por tipo
const stackOptions = computed(() => {
  const stackMap = {
    technologies: new Set<string>(),
    tools: new Set<string>(),
    methodologies: new Set<string>(),
    platforms: new Set<string>(),
    domains: new Set<string>(),
    skills: new Set<string>()
  }

  projectsStore.projects.forEach(p => {
    p.stack.technologies?.forEach(t => stackMap.technologies.add(t))
    p.stack.tools?.forEach(t => stackMap.tools.add(t))
    p.stack.methodologies?.forEach(m => stackMap.methodologies.add(m))
    p.stack.platforms?.forEach(pl => stackMap.platforms.add(pl))
    p.stack.domains?.forEach(d => stackMap.domains.add(d))
    p.stack.skills?.forEach(s => stackMap.skills.add(s))
  })

  return [
    { 
      label: '💻 Technologies', 
      code: 'tech',
      items: Array.from(stackMap.technologies).sort().map(t => ({ label: t, value: t })) 
    },
    { 
      label: '🛠️ Tools', 
      code: 'tools',
      items: Array.from(stackMap.tools).sort().map(t => ({ label: t, value: t })) 
    },
    { 
      label: '📋 Methodologies', 
      code: 'method',
      items: Array.from(stackMap.methodologies).sort().map(m => ({ label: m, value: m })) 
    },
    { 
      label: '☁️ Platforms', 
      code: 'platform',
      items: Array.from(stackMap.platforms).sort().map(p => ({ label: p, value: p })) 
    },
    { 
      label: '🎯 Domains', 
      code: 'domain',
      items: Array.from(stackMap.domains).sort().map(d => ({ label: d, value: d })) 
    },
    { 
      label: '⚡ Skills', 
      code: 'skill',
      items: Array.from(stackMap.skills).sort().map(s => ({ label: s, value: s })) 
    }
  ].filter(group => group.items.length > 0)
})

// Menú de ordenamiento
const sortMenuItems = computed(() => {
  const yearItems = projectsStore.availableYears.map(year => ({
    label: String(year),
    icon: 'pi pi-calendar',
    command: () => {
      projectsStore.setSortBy(`year-${year}`)
    }
  }))

  return [
    {
      label: 'Latest First',
      icon: 'pi pi-arrow-down',
      command: () => projectsStore.setSortBy('latest')
    },
    {
      label: 'Oldest First',
      icon: 'pi pi-arrow-up',
      command: () => projectsStore.setSortBy('oldest')
    },
    {
      separator: true
    },
    {
      label: 'Name A-Z',
      icon: 'pi pi-sort-alpha-down',
      command: () => projectsStore.setSortBy('name-asc')
    },
    {
      label: 'Name Z-A',
      icon: 'pi pi-sort-alpha-up',
      command: () => projectsStore.setSortBy('name-desc')
    },
    ...(yearItems.length > 0 ? [
      {
        separator: true
      },
      {
        label: 'By Year',
        icon: 'pi pi-calendar',
        items: yearItems
      }
    ] : [])
  ]
})

// Label actual del sort
const currentSortLabel = computed(() => {
  if (projectsStore.sortBy.startsWith('year-')) {
    const year = projectsStore.sortBy.split('-')[1]
    return year
  }
  
  const labels: Record<string, string> = {
    'latest': 'Latest',
    'oldest': 'Oldest',
    'name-asc': 'A-Z',
    'name-desc': 'Z-A'
  }
  
  return labels[projectsStore.sortBy] || 'Sort'
})

// ---------------------------
// COMPUTED - PAGINACIÓN
// ---------------------------
const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return projectsStore.sortedProjects.slice(start, end)
})

const totalPages = computed(() =>
  Math.ceil(projectsStore.sortedProjects.length / itemsPerPage)
)

const hasActiveFilters = computed(() => 
  projectsStore.searchQuery !== '' || 
  projectsStore.selectedStacks.length > 0 ||
  projectsStore.selectedCategory !== null ||
  !projectsStore.sortBy.includes('latest')
)

// ---------------------------
// METHODS
// ---------------------------
const goToProject = (id: string) => router.push(`/projects/${id}`)

const changePage = (page: number) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleClearFilters = () => {
  projectsStore.clearFilters()
  currentPage.value = 1
}

const toggleSortMenu = (event: Event) => {
  sortMenu.value.toggle(event)
}

// ---------------------------
// LIFECYCLE
// ---------------------------
onMounted(() => {
  projectsStore.fetchProjects()
})
</script>

<template>
  <div class="space-y-12">
    
    <!-- ==========================
        HEADER
    =========================== -->
    <header class="text-center space-y-3">
      <h1 class="text-4xl md:text-5xl font-bold">
        My Projects
      </h1>
      <p class="text-lg md:text-xl text-text-light-secondary dark:text-text-dark-secondary max-w-2xl mx-auto">
        Software development, project management, and community building
      </p>
    </header>

    <!-- ==========================
        FILTERS SECTION
    =========================== -->
    <section class="space-y-6">
      
      <!-- Filter Container -->
      <div class="bg-primary-400 dark:bg-primary-800 p-1 shadow-lg">
        
        <!-- Filter Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
          
          <!-- 1. Search -->
          <div class="relative lg:col-span-7">
            <i class="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-text-light-muted dark:text-text-dark-muted z-10 text-lg"></i>
            <div class="w-full h-12 pl-12 pr-4 rounded-xl bg-primary-500 dark:bg-primary-900 border-2 border-transparent hover:border-accent-700 dark:hover:border-accent-600 focus-within:border-accent-700 dark:focus-within:border-accent-600 focus-within:ring-4 focus-within:ring-accent-700/10 dark:focus-within:ring-accent-600/10 transition-all duration-200 flex items-center">
              <InputText
                v-model="projectsStore.searchQuery"
                placeholder="Search projects, tags..."
                class="w-full h-full bg-transparent text-text-light-primary dark:text-text-dark-primary placeholder:text-text-light-muted dark:placeholder:text-text-dark-muted outline-none border-none text-base"
                unstyled
              />
            </div>
          </div>

          <!-- 2. Category -->
          <div class="lg:col-span-2">
            <div class="relative w-full h-12 px-4 rounded-xl bg-primary-500 dark:bg-primary-900 border-2 border-transparent hover:border-accent-700 dark:hover:border-accent-600 transition-all duration-200 flex items-center cursor-pointer">
              <Select
                v-model="projectsStore.selectedCategory"
                :options="categoryOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Type"
                class="w-full"
                unstyled
                :pt="{
                  root: { class: 'w-full flex items-center gap-2' },
                  label: { class: 'flex-1 bg-transparent text-text-light-primary dark:text-text-dark-primary placeholder:text-text-light-muted dark:placeholder:text-text-dark-muted cursor-pointer outline-none border-none text-base truncate' },
                  dropdownIcon: { class: 'pi pi-chevron-down text-text-light-muted dark:text-text-dark-muted text-sm' },
                  panel: { class: 'mt-2 rounded-xl bg-primary-400 dark:bg-primary-800 border-2 border-primary-300 dark:border-primary-700 shadow-xl p-2 min-w-full' },
                  list: { class: 'space-y-1 bg-primary-400 dark:bg-primary-800 p-1' },
                  option: { class: 'px-4 py-1 rounded-lg text-text-light-primary dark:text-text-dark-primary hover:bg-primary-300 dark:hover:bg-primary-700 cursor-pointer transition-all font-medium' }
                }"
              />
            </div>
          </div>

          <!-- 3. Stack -->
<!-- 3. Stack -->
<div class="lg:col-span-2">
  <div class="relative w-full h-12 px-4 rounded-xl bg-primary-500 dark:bg-primary-900 border-2 border-transparent hover:border-accent-700 dark:hover:border-accent-600 transition-all duration-200 flex items-center cursor-pointer">
    <MultiSelect
      v-model="projectsStore.selectedStacks"
      :options="stackOptions"
      optionLabel="label"
      optionValue="value"
      optionGroupLabel="label"
      :optionGroupChildren="'items'"
      placeholder="Stack"
      :filter="true"
      display="chip"
      :maxSelectedLabels="1"
      class="w-full"
      unstyled
      :pt="{
        root: { class: 'w-full flex items-center gap-2' },
        labelContainer: { class: 'flex-1 flex items-center gap-2 overflow-hidden' },
        label: { class: 'bg-transparent text-text-light-primary dark:text-text-dark-primary placeholder:text-text-light-muted dark:placeholder:text-text-dark-muted cursor-pointer outline-none border-none text-base truncate' },
        pcChip: { class: 'px-2 py-1 rounded-lg bg-accent-700 text-white text-xs font-medium' },
        dropdownIcon: { class: 'pi pi-chevron-down text-text-light-muted dark:text-text-dark-muted text-sm flex-shrink-0' },
        overlay: { class: 'mt-2 rounded-xl bg-primary-400 dark:bg-primary-800 border-2 border-primary-300 dark:border-primary-700 shadow-xl overflow-hidden' },
        header: { class: 'flex items-center gap-3 p-3 bg-primary-400 dark:bg-primary-800 border-b-2 border-primary-300 dark:border-primary-700' },
        pcHeaderCheckbox: { class: 'w-5 h-5 rounded border-2 border-primary-300 dark:border-primary-700 flex items-center justify-center flex-shrink-0 cursor-pointer hover:border-accent-700 dark:hover:border-accent-600 transition-colors' },
        pcFilterContainer: { class: 'relative flex-1' },
        filterIcon: { class: 'pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-text-light-muted dark:text-text-dark-muted text-sm' },
        pcFilter: { class: 'w-full pl-10 pr-4 py-2 rounded-lg bg-primary-500 dark:bg-primary-900 text-text-light-primary dark:text-text-dark-primary border-2 border-transparent focus:border-accent-700 dark:focus:border-accent-600 outline-none placeholder:text-text-light-muted dark:placeholder:text-text-dark-muted text-sm transition-all' },
        listContainer: { class: 'overflow-y-auto max-h-72' },
        list: { class: 'p-2 space-y-1 bg-primary-400 dark:bg-primary-800' },
        optionGroup: { class: 'px-4 py-2.5 font-bold text-sm text-text-light-primary dark:text-text-dark-primary bg-primary-300 dark:bg-primary-900 rounded-lg my-1 sticky top-0 z-10' },
        option: { class: 'px-6 py-2.5 rounded-lg text-text-light-primary dark:text-text-dark-primary hover:bg-primary-300 dark:hover:bg-primary-700 cursor-pointer transition-all text-sm flex items-center gap-3' },
        pcOptionCheckbox: { class: 'w-5 h-5 rounded border-2 border-primary-300 dark:border-primary-700 flex items-center justify-center flex-shrink-0' }
      }"
    />
  </div>
</div>

          <!-- 4. Sort (xl:col-span-1) -->
          <div class="xl:col-span-1
                      w-full h-12 rounded-xl
                      bg-primary-500 dark:bg-primary-900
                      text-text-light-primary dark:text-text-dark-primary
                      transition-all duration-200
                      justify-center gap-2
                      text-base
                      shadow-none
                      flex items-center
                    ">
            <Button
              :label="currentSortLabel"
              @click="toggleSortMenu"
              text
            />
            <TieredMenu
              ref="sortMenu"
              :model="sortMenuItems"
              popup
            />
          </div>
        </div>
      </div>

      <!-- Active Filters -->
      <div 
        v-if="hasActiveFilters" 
        class="flex items-center gap-3 flex-wrap"
      >
        <span class="text-sm font-semibold text-text-light-muted dark:text-text-dark-muted flex items-center gap-2">
          <i class="pi pi-filter-fill"></i>
          Filters:
        </span>
        
        <span 
          v-if="projectsStore.searchQuery" 
          class="px-4 py-2 rounded-full bg-accent-700 text-white text-sm font-medium shadow-sm"
        >
          "{{ projectsStore.searchQuery }}"
        </span>

        <span 
          v-if="projectsStore.selectedCategory" 
          class="px-4 py-2 rounded-full bg-accent-200 dark:bg-accent-900 text-text-light-primary dark:text-text-dark-primary text-sm font-medium shadow-sm"
        >
          {{ categoryLabels[projectsStore.selectedCategory] }}
        </span>

        <span 
          v-for="stack in projectsStore.selectedStacks.slice(0, 3)" 
          :key="stack" 
          class="px-4 py-2 rounded-full bg-primary-300 dark:bg-primary-700 text-text-light-primary dark:text-text-dark-primary text-sm font-medium shadow-sm"
        >
          {{ stack }}
        </span>

        <span 
          v-if="projectsStore.selectedStacks.length > 3"
          class="px-4 py-2 rounded-full bg-primary-300 dark:bg-primary-700 text-text-light-muted dark:text-text-dark-muted text-sm font-medium shadow-sm"
        >
          +{{ projectsStore.selectedStacks.length - 3 }} more
        </span>

        <button
          @click="handleClearFilters"
          class="ml-auto px-4 py-2 rounded-full text-sm font-semibold 
                 text-accent-700 dark:text-accent-600 
                 hover:bg-accent-200 dark:hover:bg-accent-900
                 transition-all flex items-center gap-2"
        >
          <i class="pi pi-times-circle"></i>
          Clear all
        </button>
      </div>

      <!-- Results Counter -->
      <div class="text-center">
        <span class="text-sm text-text-light-secondary dark:text-text-dark-secondary">
          Showing <span class="font-bold text-accent-700 dark:text-accent-600">{{ projectsStore.sortedProjects.length }}</span> of {{ projectsStore.totalProjects }} projects
        </span>
      </div>
    </section>

    <!-- ==========================
        LOADING SKELETON
    =========================== -->
    <div v-if="projectsStore.loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="n in 6"
        :key="n"
        class="bg-primary-400 dark:bg-primary-800 rounded-2xl overflow-hidden shadow-lg animate-pulse"
      >
        <div class="w-full h-48 bg-primary-300 dark:bg-primary-700"></div>
        <div class="p-6 space-y-3">
          <div class="h-6 bg-primary-300 dark:bg-primary-700 rounded w-3/4"></div>
          <div class="h-4 bg-primary-300 dark:bg-primary-700 rounded w-full"></div>
          <div class="h-4 bg-primary-300 dark:bg-primary-700 rounded w-5/6"></div>
        </div>
      </div>
    </div>

    <!-- ==========================
        EMPTY STATE
    =========================== -->
    <div
      v-else-if="projectsStore.sortedProjects.length === 0"
      class="flex flex-col items-center justify-center py-20 text-center"
    >
      <div class="w-24 h-24 rounded-full bg-primary-300 dark:bg-primary-700 flex items-center justify-center mb-6">
        <i class="pi pi-inbox text-5xl text-text-light-muted dark:text-text-dark-muted"></i>
      </div>
      <h3 class="text-2xl font-semibold mb-2">
        No projects found
      </h3>
      <p class="text-text-light-secondary dark:text-text-dark-secondary mb-6 max-w-md">
        Try adjusting your filters or search terms
      </p>
      <Button
        label="Clear Filters"
        icon="pi pi-filter-slash"
        @click="handleClearFilters"
        class="px-6 py-3 bg-accent-700 hover:bg-accent-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
      />
    </div>

    <!-- ==========================
        PROJECTS GRID
    =========================== -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <article
        v-for="project in paginatedProjects"
        :key="project.id"
        @click="goToProject(project.id)"
        class="bg-primary-400 dark:bg-primary-800 rounded-2xl overflow-hidden shadow-lg
              transform hover:scale-[1.02] hover:shadow-2xl
              transition-all duration-300 cursor-pointer group"
      >
        <!-- Image -->
        <div class="relative w-full aspect-video overflow-hidden bg-primary-300 dark:bg-primary-700">
          <img
            :src="project.images.thumbnail"
            :alt="project.title"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-linear-to-t from-primary-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <!-- Category Badge -->
          <div class="absolute top-3 left-3">
            <span class="px-3 py-1.5 rounded-full bg-accent-700 text-white text-xs font-bold shadow-lg backdrop-blur-sm">
              {{ categoryLabels[project.category?.category || 'other'] }}
            </span>
          </div>

          <!-- Status Badge -->
          <div v-if="project.status === 'in-progress'" class="absolute top-3 right-3">
            <span class="px-3 py-1.5 rounded-full bg-primary-900/90 text-white text-xs font-bold shadow-lg backdrop-blur-sm flex items-center gap-1.5">
              <i class="pi pi-clock"></i>
              In Progress
            </span>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6">
          <h3 class="text-xl font-bold mb-2 group-hover:text-accent-700 dark:group-hover:text-accent-600 transition-colors line-clamp-1">
            {{ project.title }}
          </h3>

          <p class="text-text-light-secondary dark:text-text-dark-secondary mb-4 line-clamp-2 text-sm">
            {{ project.shortDescription }}
          </p>

          <!-- Badges -->
          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="item in [...(project.stack.domains || []), ...(project.stack.skills || [])].slice(0, 3)"
              :key="item"
              class="px-2.5 py-1 rounded-lg bg-accent-200 dark:bg-accent-900 text-xs font-semibold"
            >
              {{ item }}
            </span>
            <span
              v-if="[...(project.stack.domains || []), ...(project.stack.skills || [])].length > 3"
              class="px-2.5 py-1 rounded-lg bg-primary-300 dark:bg-primary-700 text-text-light-muted dark:text-text-dark-muted text-xs font-semibold"
            >
              +{{ [...(project.stack.domains || []), ...(project.stack.skills || [])].length - 3 }}
            </span>
          </div>

          <!-- Links -->
          <div class="flex gap-3" @click.stop>
            
            <a v-for="link in project.links"
              :key="link.url"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-accent-700 hover:text-accent-600 dark:hover:text-accent-500 font-semibold text-sm flex items-center gap-1.5 transition-colors"
            >
              <i :class="link.icon === 'external-link' ? 'pi pi-external-link' : 'pi pi-github'"></i>
              {{ link.label }}
            </a>
          </div>
        </div>
      </article>
    </div>

    <!-- ==========================
        PAGINATION
    =========================== -->
    <div
      v-if="!projectsStore.loading && projectsStore.sortedProjects.length > 0 && totalPages > 1"
      class="flex justify-center items-center gap-2 flex-wrap"
    >
      <Button
        icon="pi pi-chevron-left"
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
        rounded
        text
        class="w-10 h-10 disabled:opacity-30"
      />

      <Button
        v-for="page in totalPages"
        :key="page"
        :label="String(page)"
        @click="changePage(page)"
        rounded
        :text="page !== currentPage"
        :class="page === currentPage 
          ? 'bg-accent-700 text-white w-10 h-10' 
          : 'w-10 h-10'"
      />

      <Button
        icon="pi pi-chevron-right"
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
        rounded
        text
        class="w-10 h-10 disabled:opacity-30"
      />
    </div>

  </div>
</template>