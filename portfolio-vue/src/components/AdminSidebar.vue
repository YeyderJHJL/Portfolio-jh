<script setup lang="ts">
import DarkModeToggle from './DarkModeToggle.vue'

defineProps<{
  isSidebarOpen: boolean
}>()

const emit = defineEmits<{
  open: []
  close: []
}>()

const closeSidebar = () => emit('close')
const openSidebar = () => emit('open')
</script>

<template>
  <!-- Mobile topbar (vive aquí ahora) -->
  <header
    class="
      lg:hidden
      fixed top-0 left-0 right-0 z-40
      h-16
      flex items-center justify-between
      px-6
      bg-primary-950
      border-b border-primary-800/60
      text-text-dark-primary
    "
  >
    <button
      @click="openSidebar"
      class="p-2 rounded-lg hover:bg-primary-800 transition-colors"
      aria-label="Open sidebar"
    >
      <i class="pi pi-bars text-xl"></i>
    </button>

    <span
      class="
        text-sm font-semibold
        bg-linear-to-r from-accent-600 to-accent-400
        bg-clip-text text-transparent
      "
    >
      Admin Panel
    </span>

    <DarkModeToggle />
  </header>

  <!-- Sidebar -->
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-50 w-64',
      'transform transition-transform duration-300',
      'lg:static lg:translate-x-0',
      isSidebarOpen
        ? 'translate-x-'
        : '-translate-x-full'
    ]"
    class="
      bg-primary-950
      border-r border-primary-800/60
      text-text-dark-primary
      pt-16 lg:pt-0
    "
  >
    <!-- Sidebar header (desktop) -->
    <div class="hidden lg:flex items-center justify-between px-6 py-5 border-b border-primary-800/60">
      <h2
        class="
          text-lg font-bold tracking-tight
          bg-linear-to-r from-accent-600 to-accent-500
          bg-clip-text text-transparent
        "
      >
        Admin
      </h2>
    </div>

    <!-- Navigation -->
    <nav class="px-6 py-6">
      <ul class="space-y-2">

        <li>
          <router-link
            :to="{ name: 'admin-dashboard' }"
            @click="closeSidebar"
            class="
              block rounded-md px-3 py-2
              text-sm font-medium
              text-text-dark-secondary
              hover:text-accent-400
              hover:bg-primary-800
              transition-colors duration-200
            "
            active-class="
              text-accent-400
              bg-primary-800
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
              block rounded-md px-3 py-2
              text-sm font-medium
              text-text-dark-secondary
              hover:text-accent-400
              hover:bg-primary-800
              transition-colors duration-200
            "
            active-class="
              text-accent-400
              bg-primary-800
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
              block rounded-md px-3 py-2
              text-sm font-medium
              text-text-dark-secondary
              hover:text-accent-400
              hover:bg-primary-800
              transition-colors duration-200
            "
            active-class="
              text-accent-400
              bg-primary-800
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

  <!-- Overlay -->
  <div
    v-if="isSidebarOpen"
    @click="closeSidebar"
    class="fixed inset-0 z-40 bg-black/40 lg:hidden"
  />
</template>
