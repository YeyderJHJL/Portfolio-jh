<script setup lang="ts">
import { ref } from 'vue'
import DefaultLayout from './DefaultLayout.vue'
import AdminSidebar from '../components/AdminSidebar.vue'
import DarkModeToggle from '../components/DarkModeToggle.vue'

const sidebarOpen = ref(false)

const openSidebar = () => {
  sidebarOpen.value = true
}

const closeSidebar = () => {
  sidebarOpen.value = false
}
</script>

<template>
  <DefaultLayout>
    <div class="min-h-screen flex">

      <!-- Sidebar -->
      <AdminSidebar
        :isSidebarOpen="sidebarOpen"
        @close="closeSidebar"
      />

      <!-- Main content -->
      <div
        class="
          flex-1 flex flex-col
          lg:ml-64
        "
      >
        <!-- Topbar (mobile / tablet) -->
        <header
          class="
            sticky top-0 z-40
            flex items-center justify-between
            px-6 py-4
            border-b border-primary-500/20
            bg-primary-300/80 backdrop-blur
            dark:bg-primary-950/80 dark:border-primary-800
            lg:hidden
          "
        >
          <button
            @click="openSidebar"
            class="
              p-2 rounded-lg
              hover:bg-primary-400
              dark:hover:bg-primary-800
              transition-colors
            "
            aria-label="Open sidebar"
          >
            <i class="pi pi-bars text-xl text-primary-900 dark:text-primary-200"></i>
          </button>

          <span
            class="
              font-semibold text-sm
              bg-linear-to-r
              from-accent-700 to-accent-400
              dark:from-accent-300 dark:to-accent-100
              bg-clip-text text-transparent
            "
          >
            Admin Panel
          </span>

          <DarkModeToggle />
        </header>

        <!-- Page content -->
        <main
          class="
            flex-1
            px-6 py-6
            transition-colors
          "
        >
          <router-view />
        </main>
      </div>
    </div>
  </DefaultLayout>
</template>
