<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const sidebarOpen = ref(true)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

<template>
  <div class="flex min-h-screen bg-white dark:bg-primary-950 transition-colors duration-300">
    
    <!-- SIDEBAR -->
    <aside 
      :class="[
        'fixed lg:sticky top-0 left-0 h-screen bg-primary-900 dark:bg-primary-950 border-r border-primary-700/30 dark:border-primary-800/50 transition-all duration-300 z-40',
        sidebarOpen ? 'w-64' : 'w-0 lg:w-20'
      ]"
    >
      <div class="flex flex-col h-full">
        
        <!-- Header -->
        <div class="p-6 border-b border-primary-700/30 dark:border-primary-800/50">
          <h2 
            v-if="sidebarOpen"
            class="text-2xl font-bold text-white"
          >
            Admin
          </h2>
          <button
            @click="toggleSidebar"
            class="lg:hidden absolute top-6 right-4 p-2 text-primary-300 hover:text-white transition-colors"
            aria-label="Close sidebar"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 p-4 space-y-2">
          <router-link
            :to="{ name: 'admin-dashboard' }"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-300 hover:bg-primary-800/50 hover:text-white transition-all duration-200"
            :class="{ 'bg-primary-800 text-white font-semibold': route.name === 'admin-dashboard' }"
          >
            <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span v-if="sidebarOpen">Dashboard</span>
          </router-link>

          <router-link
            :to="{ name: 'admin-projects' }"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-300 hover:bg-primary-800/50 hover:text-white transition-all duration-200"
            :class="{ 'bg-primary-800 text-white font-semibold': route.name === 'admin-projects' }"
          >
            <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <span v-if="sidebarOpen">Projects</span>
          </router-link>

          <router-link
            :to="{ name: 'admin-blog' }"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-300 hover:bg-primary-800/50 hover:text-white transition-all duration-200"
            :class="{ 'bg-primary-800 text-white font-semibold': route.name === 'admin-blog' }"
          >
            <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
            </svg>
            <span v-if="sidebarOpen">Blog</span>
          </router-link>
        </nav>

        <!-- Footer -->
        <div class="p-4 border-t border-primary-700/30 dark:border-primary-800/50">
          <router-link
            :to="{ name: 'home' }"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-300 hover:bg-primary-800/50 hover:text-accent-300 transition-all duration-200"
          >
            <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span v-if="sidebarOpen">Back to Site</span>
          </router-link>
        </div>
      </div>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="flex-1 overflow-auto">
      <!-- Top Bar (mobile) -->
      <div class="lg:hidden sticky top-0 z-30 bg-primary-300 dark:bg-primary-900 border-b border-primary-500/20 dark:border-primary-700/30 px-4 py-3">
        <button
          v-if="!sidebarOpen"
          @click="toggleSidebar"
          class="p-2 text-primary-950 dark:text-white hover:bg-primary-500/20 dark:hover:bg-primary-800/50 rounded-lg transition-colors"
          aria-label="Open sidebar"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Content Area -->
      <div class="p-6 lg:p-8">
        <router-view />
      </div>
    </main>

    <!-- Overlay (mobile) -->
    <div
      v-if="sidebarOpen"
      @click="toggleSidebar"
      class="lg:hidden fixed inset-0 bg-primary-950/50 backdrop-blur-sm z-30"
    ></div>
  </div>
</template>
