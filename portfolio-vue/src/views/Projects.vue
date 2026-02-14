<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectsStore, CATEGORY_LABELS } from '../stores/projects'
import Button from 'primevue/button'
import Select from 'primevue/select'
import TieredMenu from 'primevue/tieredmenu'
import InputText from 'primevue/inputtext'
import Checkbox from 'primevue/checkbox'
import Popover from 'primevue/popover'

// ---------------------------
// SETUP
// ---------------------------
const router = useRouter()
const projectsStore = useProjectsStore()

// ---------------------------
// LOCAL STATE (UI only)
// ---------------------------
const currentPage = ref(1)
const itemsPerPage = 9
const sortMenu = ref()
const stackMenu = ref()
const stackSearchQuery = ref('')
const expandedCategory = ref<string | null>(null)

// ---------------------------
// COMPUTED - UI PRESENTATION
// ---------------------------

/**
 * Stack options filtered by search query
 */
const stackOptions = computed(() => {
  if (!stackSearchQuery.value.trim()) {
    return projectsStore.stackOptionsGrouped
  }

  const query = stackSearchQuery.value.toLowerCase()
  
  return projectsStore.stackOptionsGrouped
    .map(group => ({
      ...group,
      items: group.items.filter(item => 
        item.toLowerCase().includes(query)
      )
    }))
    .filter(group => group.items.length > 0)
})

/**
 * Sort menu items structure
 */
const sortMenuItems = computed(() => {
  const yearItems = projectsStore.availableYears.map(year => ({
    label: String(year),
    command: () => {
      projectsStore.setSortBy(`year-${year}`)
    }
  }))

  console.log('Available Years:', projectsStore.availableYears) // Debug
  console.log('Year Items:', yearItems) // Debug

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
    { separator: true },
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
      { separator: true },
      {
        label: 'By Year',
        icon: 'pi pi-calendar',
        items: yearItems
      }
    ] : [])
  ]
})

/**
 * Current sort label for button display
 */
const currentSortLabel = computed(() => {
  if (projectsStore.sortBy.startsWith('year-')) {
    return projectsStore.sortBy.split('-')[1]
  }
  
  const labels: Record<string, string> = {
    'latest': 'Latest',
    'oldest': 'Oldest',
    'name-asc': 'A-Z',
    'name-desc': 'Z-A'
  }
  
  return labels[projectsStore.sortBy] || 'Sort'
})

/**
 * Paginated projects for current page
 */
const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return projectsStore.sortedProjects.slice(start, end)
})

/**
 * Total pages for pagination
 */
const totalPages = computed(() =>
  Math.ceil(projectsStore.sortedProjects.length / itemsPerPage)
)

/**
 * Check if any filters are active
 */
const hasActiveFilters = computed(() => 
  projectsStore.searchQuery !== '' || 
  projectsStore.selectedStacks.length > 0 ||
  projectsStore.selectedCategory !== null ||
  !projectsStore.sortBy.includes('latest')
)

// ---------------------------
// METHODS - Stack Filter
// ---------------------------

const toggleStackMenu = (event: Event) => {
  stackMenu.value.toggle(event)
}

const toggleCategory = (code: string) => {
  expandedCategory.value = expandedCategory.value === code ? null : code
}

const toggleStackItem = (item: string) => {
  const currentStacks = [...projectsStore.selectedStacks]
  const index = currentStacks.indexOf(item)
  
  if (index > -1) {
    currentStacks.splice(index, 1)
  } else {
    currentStacks.push(item)
  }
  
  projectsStore.setSelectedStacks(currentStacks)
}

const isStackItemSelected = (item: string) => {
  return projectsStore.selectedStacks.includes(item)
}

const toggleSelectAll = () => {
  if (projectsStore.selectedStacks.length === projectsStore.allStackItems.length) {
    projectsStore.setSelectedStacks([])
  } else {
    projectsStore.setSelectedStacks([...projectsStore.allStackItems])
  }
}

// ---------------------------
// METHODS - Navigation
// ---------------------------

const goToProject = (id: string) => {
  router.push(`/projects/${id}`)
}

const changePage = (page: number) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleClearFilters = () => {
  projectsStore.clearFilters()
  currentPage.value = 1
  stackSearchQuery.value = ''
  expandedCategory.value = null
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
      <h1 class="text-4xl md:text-5xl font-bold text-text-light-primary dark:text-text-dark-primary">
        My Projects
      </h1>
      <p class="text-lg md:text-xl text-text-light-secondary dark:text-text-dark-secondary max-w-2xl mx-auto">
        Software development, project management, and community building
      </p>
    </header>

    <!-- ==========================
        FILTERS SECTION
    =========================== -->
    <section class="space-y-2">
      
      <!-- Filter Container -->
      <div class="bg-primary-400 dark:bg-primary-800 p-1 shadow-lg">
        
        <!-- Filter Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
          
          <!-- 1. Search -->
          <div class="relative lg:col-span-7">
            <i class="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 
                    text-text-light-muted dark:text-text-dark-muted 
                    z-10 text-lg"></i>
            <div class="w-full h-12 pl-12 pr-4 rounded-xl 
                      bg-primary-500 dark:bg-primary-900 
                      border border-transparent 
                      focus-within:border-accent-700 dark:focus-within:border-accent-600 
                      transition-all duration-200 flex items-center">
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
            <Select
              v-model="projectsStore.selectedCategory"
              :options="projectsStore.categoryOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Type"
              class="w-full h-12"
              unstyled
              :pt="{
                root: { class: 'w-full h-12 px-4 rounded-xl bg-primary-500 dark:bg-primary-900 border border-transparent hover:border-accent-700 dark:hover:border-accent-600 transition-all duration-200 flex items-center cursor-pointer' },
                label: { class: 'flex-1 bg-transparent text-text-light-primary dark:text-text-dark-primary text-base truncate' },
                dropdownIcon: { class: 'pi pi-chevron-down text-text-light-muted dark:text-text-dark-muted text-sm ml-2' },
                overlay: { class: 'mt-2 bg-primary-400 dark:bg-primary-800 border-2 border-primary-300 dark:border-primary-700 shadow-xl' },
                list: { class: 'p-2 space-y-1' },
                option: { class: 'px-4 py-2.5 rounded-lg text-text-light-primary dark:text-text-dark-primary hover:bg-primary-300 dark:hover:bg-primary-700 cursor-pointer transition-all font-medium' }
              }"
            />
          </div>

          <!-- 3. Stack (Custom Nested Menu) -->
          <div class="lg:col-span-2 relative">
            <Button
              @click="toggleStackMenu"
              class="w-full h-12 px-4 rounded-xl 
                    bg-primary-500 dark:bg-primary-900 
                    border border-transparent hover:border-accent-700 dark:hover:border-accent-600 
                    transition-all duration-200 flex items-center justify-between gap-2 
                    text-text-light-primary dark:text-text-dark-primary"
              unstyled
            >
              <span class="text-base truncate">
                {{ projectsStore.selectedStacks.length > 0 ? `Stack (${projectsStore.selectedStacks.length})` : 'Stack' }}
              </span>
              <i class="pi pi-chevron-down 
                      text-text-light-muted dark:text-text-dark-muted 
                      text-sm"></i>
            </Button>

            <!-- Custom Stack Menu Overlay -->
            <Popover
              ref="stackMenu"
              :pt="{
                root: { class: 'min-w-56 rounded-xl bg-primary-400 dark:bg-primary-800 border-2 border-primary-300 dark:border-primary-700 shadow-xl overflow-hidden' },
                content: { class: 'p-0' }
              }"
            >
              <!-- Header: Select All + Search -->
              <div class="flex items-center gap-3 p-3 border-b-2 
                        border-primary-300 dark:border-primary-700 
                        bg-primary-400 dark:bg-primary-800">
                <div class="flex items-center gap-2 cursor-pointer" @click="toggleSelectAll">
                  <Checkbox
                    :modelValue="projectsStore.selectedStacks.length === projectsStore.allStackItems.length && projectsStore.allStackItems.length > 0"
                    :binary="true"
                    inputId="selectAll"
                    class="w-5 h-5"
                    unstyled
                    :pt="{
                      root: { class: 'w-5 h-5 rounded border-2 border-primary-300 dark:border-primary-700 flex items-center justify-center bg-primary-500 dark:bg-primary-900 cursor-pointer hover:border-accent-700 dark:hover:border-accent-600 transition-colors' },
                      input: { class: 'hidden' },
                      box: { class: 'w-5 h-5 rounded flex items-center justify-center' },
                      icon: { class: 'text-accent-700 dark:text-accent-600 text-sm' }
                    }"
                  />
                </div>
                
                <div class="relative flex-1">
                  <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 
                          text-text-light-muted dark:text-text-dark-muted 
                          text-sm"></i>
                  <InputText
                    v-model="stackSearchQuery"
                    placeholder="Search..."
                    class="w-full pl-10 pr-4 py-2 rounded-lg 
                          bg-primary-500 dark:bg-primary-900 
                          text-text-light-primary dark:text-text-dark-primary 
                          border border-transparent focus:border-accent-700 dark:focus:border-accent-600 
                          outline-none placeholder:text-text-light-muted dark:placeholder:text-text-dark-muted 
                          text-sm"
                    unstyled
                  />
                </div>
              </div>

              <!-- Categories and Items -->
              <div class="max-h-96 overflow-y-auto p-2 
                        bg-primary-400 dark:bg-primary-800">
                <div v-if="stackOptions.length === 0" class="px-4 py-8 text-center 
                                                            text-text-light-muted dark:text-text-dark-muted">
                  No results found
                </div>
                
                <div v-for="group in stackOptions" :key="group.code" class="mb-1">
                  <!-- Category Header (clickeable para expandir) -->
                  <div 
                    @click="toggleCategory(group.code)"
                    class="px-4 py-2.5 font-bold text-sm text-text-light-primary dark:text-text-dark-primary bg-primary-300 dark:bg-primary-900 rounded-lg cursor-pointer hover:bg-primary-200 dark:hover:bg-primary-800 transition-all flex items-center justify-between"
                  >
                    <span>{{ group.label }}</span>
                    <i :class="expandedCategory === group.code ? 'pi pi-chevron-down' : 'pi pi-chevron-right'" class="text-xs text-text-light-muted dark:text-text-dark-muted"></i>
                  </div>
                  
                  <!-- Items (solo se muestran si la categoría está expandida) -->
                  <div v-if="expandedCategory === group.code" class="mt-1 space-y-0.5">
                    <div
                      v-for="item in group.items"
                      :key="item"
                      @click="toggleStackItem(item)"
                      class="px-6 py-2.5 rounded-lg hover:bg-primary-300 dark:hover:bg-primary-700 cursor-pointer transition-all flex items-center gap-3"
                    >
                      <Checkbox
                        :modelValue="isStackItemSelected(item)"
                        :binary="true"
                        class="w-5 h-5"
                        unstyled
                        :pt="{
                          root: { class: 'w-5 h-5 rounded border-2 border-primary-300 dark:border-primary-700 flex items-center justify-center bg-primary-500 dark:bg-primary-900 cursor-pointer hover:border-accent-700 dark:hover:border-accent-600 transition-colors' },
                          input: { class: 'hidden' },
                          box: { class: 'w-5 h-5 rounded flex items-center justify-center' },
                          icon: { class: 'text-accent-700 dark:text-accent-600 text-sm' }
                        }"
                      />
                      <span class="text-sm text-text-light-primary dark:text-text-dark-primary">{{ item }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Popover>
          </div>

          <!-- 4. Sort -->
          <div class="lg:col-span-1">
  <Button
    @click="toggleSortMenu"
    class="w-full h-12 px-4 rounded-xl 
          bg-primary-500 dark:bg-primary-900 
          border border-transparent 
          hover:border-accent-700 dark:hover:border-accent-600 
          transition-all duration-200 
          flex items-center justify-between gap-2 
          text-text-light-primary dark:text-text-dark-primary"
    unstyled
  >
    <span class="text-base truncate">{{ currentSortLabel }}</span>
    <i class="pi pi-chevron-down text-text-light-muted dark:text-text-dark-muted text-sm"></i>
  </Button>

  <TieredMenu
  ref="sortMenu"
  :model="sortMenuItems"
  popup
  unstyled
  :pt="{
    root: { class: 'min-w-56 bg-primary-400 dark:bg-primary-800 border-2 border-primary-300 dark:border-primary-700 shadow-xl overflow-visible' },
    rootList: { class: 'p-2 flex-col' },
    item: { class: 'my-0.5 relative w-full' },
    itemContent: { class: 'px-4 py-2.5 rounded-lg text-text-light-primary dark:text-text-dark-primary hover:bg-primary-300 dark:hover:bg-primary-700 cursor-pointer transition-all flex items-center gap-3 text-sm font-medium w-full' },
    itemLink: { class: 'w-full flex items-center gap-3 no-underline' },
    itemIcon: { class: 'text-accent-700 dark:text-accent-600 w-4 h-4 flex-shrink-0' },
    itemLabel: { class: 'flex-1 text-text-light-primary dark:text-text-dark-primary' },
    separator: { class: 'my-2 border-t-2 border-primary-300 dark:border-primary-700' },
    submenu: { class: 'p-2 flex-col absolute left-full top-0  min-w-32 bg-primary-500 dark:bg-primary-900 border-2 border-primary-300 dark:border-primary-700 shadow-xl overflow-visible'},
  }"
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
          {{ CATEGORY_LABELS[projectsStore.selectedCategory] }}
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
    <div v-if="projectsStore.loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="n in 6"
        :key="n"
        class="bg-primary-400 dark:bg-primary-800 rounded-2xl overflow-hidden shadow-lg animate-pulse"
      >
        <div class="w-full h-56 bg-primary-300 dark:bg-primary-700"></div>
        <div class="p-6 space-y-4">
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
      class="flex flex-col items-center justify-center py-24 text-center"
    >
      <div class="w-32 h-32 rounded-full bg-primary-300 dark:bg-primary-700 flex items-center justify-center mb-8 shadow-lg">
        <i class="pi pi-inbox text-6xl text-text-light-muted dark:text-text-dark-muted"></i>
      </div>
      <h3 class="text-3xl font-bold mb-3 text-text-light-primary dark:text-text-dark-primary">
        No projects found
      </h3>
      <p class="text-lg text-text-light-secondary dark:text-text-dark-secondary mb-8 max-w-md leading-relaxed">
        Try adjusting your filters or search terms to discover more projects
      </p>
      <Button
        label="Clear All Filters"
        icon="pi pi-filter-slash"
        @click="handleClearFilters"
        class="px-8 py-4 bg-accent-700 hover:bg-accent-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all text-lg"
        unstyled
      />
    </div>

    <!-- ==========================
        PROJECTS GRID
    =========================== -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <article
        v-for="(project, index) in paginatedProjects"
        :key="project.id"
        @click="goToProject(project.id)"
        class="bg-primary-400 dark:bg-primary-800 rounded-2xl overflow-hidden shadow-lg
              hover:-translate-y-2 hover:shadow-2xl
              transition-all duration-300 cursor-pointer group"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <!-- Image -->
        <div class="relative w-full aspect-video overflow-hidden bg-primary-300 dark:bg-primary-700">
          <img
            :src="project.images.thumbnail"
            :alt="project.title"
            loading="lazy"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-linear-to-t from-primary-900/80 via-primary-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <!-- Category Badge -->
          <div class="absolute top-3 left-3">
            <span class="px-3 py-1.5 rounded-full bg-accent-700 text-white text-xs font-bold shadow-lg backdrop-blur-sm">
              {{ CATEGORY_LABELS[project.category?.category || 'other'] }}
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
        <div class="p-6 space-y-4">
          <h3 class="text-xl font-bold text-text-light-primary dark:text-text-dark-primary group-hover:text-accent-700 dark:group-hover:text-accent-600 transition-colors line-clamp-1">
            {{ project.title }}
          </h3>

          <p class="text-text-light-secondary dark:text-text-dark-secondary line-clamp-2 text-sm leading-relaxed">
            {{ project.shortDescription }}
          </p>

          <!-- Tech Badges -->
          <div class="flex flex-wrap gap-2">
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
          <div v-if="project.links && project.links.length > 0" class="flex gap-3 pt-2" @click.stop>
            <a 
              v-for="link in project.links.slice(0, 2)"
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
        class="w-12 h-12 rounded-full bg-primary-400 dark:bg-primary-800 hover:bg-primary-300 dark:hover:bg-primary-700 text-text-light-primary dark:text-text-dark-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-sm"
        unstyled
      />

      <Button
        v-for="page in totalPages"
        :key="page"
        :label="String(page)"
        @click="changePage(page)"
        :class="[
          'w-12 h-12 rounded-full font-semibold transition-all duration-200 flex items-center justify-center shadow-sm',
          page === currentPage 
            ? 'bg-accent-700 text-white scale-110 shadow-lg' 
            : 'bg-primary-400 dark:bg-primary-800 hover:bg-primary-300 dark:hover:bg-primary-700 text-text-light-primary dark:text-text-dark-primary'
        ]"
        unstyled
      />

      <Button
        icon="pi pi-chevron-right"
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
        class="w-12 h-12 rounded-full bg-primary-400 dark:bg-primary-800 hover:bg-primary-300 dark:hover:bg-primary-700 text-text-light-primary dark:text-text-dark-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-sm"
        unstyled
      />
    </div>

  </div>
</template>
