<template>
  <div
    class="min-h-screen flex flex-col font-sans leading-relaxed
           bg-primary-300 text-primary-950
           dark:bg-primary-950 dark:text-primary-100"
  >
    <!-- Header / Navbar -->
    <header
      class="sticky top-0 z-50
             border-b border-primary-500/20
             bg-primary-300/80 backdrop-blur
             dark:bg-primary-950/80 dark:border-primary-800"
    >
      <nav class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <!-- Logo -->
        <router-link
          :to="{ name: 'home' }"
          class="text-xl font-bold tracking-tight
                 text-primary-900 dark:text-primary-300"
        >
          Portfolio
        </router-link>

        <!-- Nav links -->
        <ul class="flex items-center gap-6">
          <li v-for="item in navItems" :key="item.name">
            <router-link
              :to="{ name: item.name }"
              class="text-sm font-medium transition-colors
                     text-primary-800 hover:text-accent-600
                     dark:text-primary-300 dark:hover:text-accent-400"
              active-class="text-accent-700 dark:text-accent-400"
            >
              {{ item.label }}
            </router-link>
          </li>

          <li>
            <DarkModeToggle />
          </li>
        </ul>
      </nav>
    </header>

    <!-- Main content -->
    <main class="flex-1 w-full max-w-7xl mx-auto px-6 py-10">
      <router-view />
    </main>

    <!-- Footer -->
    <footer
      class="border-t border-primary-500/20
             bg-primary-300 dark:bg-primary-950"
    >
      <div class="max-w-7xl mx-auto px-6 py-6 text-center text-sm
                  text-primary-700 dark:text-primary-400">
        © 2024 Portfolio. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import DarkModeToggle from '../components/DarkModeToggle.vue'

const navItems = [
  { name: 'home', label: 'Home' },
  { name: 'about', label: 'About' },
  { name: 'projects', label: 'Projects' },
  { name: 'blog', label: 'Blog' },
  { name: 'contact', label: 'Contact' },
]
</script>