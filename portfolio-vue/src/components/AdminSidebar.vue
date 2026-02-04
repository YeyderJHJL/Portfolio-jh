<script setup lang="ts">
import DarkModeToggle from './DarkModeToggle.vue'

defineProps<{
  isSidebarOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const closeSidebar = () => emit('close')
</script>

<template>
  <!-- Sidebar -->
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300',
      'lg:static lg:translate-x-0',
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
    class="
      bg-primary-200/90 backdrop-blur
      dark:bg-primary-950/90
      border-r border-primary-500/20
    "
  >
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-5 border-b border-primary-500/20">
      <h2
        class="
          text-lg font-bold
          bg-linear-to-r from-accent-700 to-accent-400
          bg-clip-text text-transparent
          dark:from-accent-300 dark:to-accent-100
        "
      >
        Admin
      </h2>

      <button
        class="lg:hidden p-2 rounded-lg hover:bg-primary-300 dark:hover:bg-primary-800"
        @click="closeSidebar"
      >
        <i class="pi pi-times text-primary-800 dark:text-primary-200"></i>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="px-6 py-6">
      <ul class="space-y-3">
        <li>
          <router-link
            :to="{ name: 'admin-dashboard' }"
            @click="closeSidebar"
            class="
              block text-sm font-medium
              transition-all duration-300

              text-primary-800 dark:text-primary-300

              hover:bg-linear-to-r
              hover:from-accent-700 hover:to-accent-400
              dark:hover:from-accent-300 dark:hover:to-accent-100
              hover:bg-clip-text hover:text-transparent
            "
            active-class="
              bg-linear-to-r from-accent-700 to-accent-400
              dark:from-accent-300 dark:to-accent-100
              bg-clip-text text-transparent
            "
          >
            Dashboard
          </router-link>
        </li>

        <li>
          <router-link
            :to="{ name: 'admin-projects' }"
            @click="closeSidebar"
            class="
              block text-sm font-medium
              transition-all duration-300

              text-primary-800 dark:text-primary-300

              bg-linear-to-r
              hover:from-accent-700 hover:to-accent-400
              dark:hover:from-accent-300 dark:hover:to-accent-100
              hover:bg-clip-text hover:text-transparent
            "
            active-class="
              bg-linear-to-r from-accent-700 to-accent-400
              dark:from-accent-300 dark:to-accent-100
              bg-clip-text text-transparent
            "
          >
            Projects
          </router-link>
        </li>

        <li>
          <router-link
            :to="{ name: 'admin-blog' }"
            @click="closeSidebar"
            class="
              block text-sm font-medium
              transition-all duration-300

              text-primary-800 dark:text-primary-300

              bg-linear-to-r
              hover:from-accent-700 hover:to-accent-400
              dark:hover:from-accent-300 dark:hover:to-accent-100
              hover:bg-clip-text hover:text-transparent
            "
            active-class="
              bg-linear-to-r from-accent-700 to-accent-400
              dark:from-accent-300 dark:to-accent-100
              bg-clip-text text-transparent
            "
          >
            Blog
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Bottom -->
    <div class="absolute bottom-6 left-6">
      <DarkModeToggle />
    </div>
  </aside>

  <!-- Mobile overlay -->
  <div
    v-if="isSidebarOpen"
    @click="closeSidebar"
    class="fixed inset-0 z-40 bg-black/40 lg:hidden"
  />
</template>

