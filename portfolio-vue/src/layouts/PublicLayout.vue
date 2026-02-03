<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import DarkModeToggle from '../components/DarkModeToggle.vue'

const route = useRoute()
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<template>
  <div class="flex flex-col min-h-screen bg-white dark:bg-primary-950 transition-colors duration-300">
    
    <!-- NAVBAR -->
    <header class="sticky top-0 z-50 bg-primary-300 dark:bg-primary-900 border-b border-primary-500/20 dark:border-primary-700/30 backdrop-blur-sm shadow-sm transition-colors duration-300">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          
          <!-- Logo -->
          <router-link 
            :to="{ name: 'home' }" 
            class="text-2xl font-bold text-primary-950 dark:text-white hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
            @click="closeMobileMenu"
          >
            Portfolio
          </router-link>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center gap-8">
            <router-link
              :to="{ name: 'home' }"
              class="text-primary-950 dark:text-primary-300 hover:text-primary-700 dark:hover:text-white font-medium transition-colors duration-200"
              :class="{ 'text-primary-700 dark:text-white font-semibold': route.name === 'home' }"
            >
              Home
            </router-link>
            <router-link
              :to="{ name: 'about' }"
              class="text-primary-950 dark:text-primary-300 hover:text-primary-700 dark:hover:text-white font-medium transition-colors duration-200"
              :class="{ 'text-primary-700 dark:text-white font-semibold': route.name === 'about' }"
            >
              About
            </router-link>
            <router-link
              :to="{ name: 'projects' }"
              class="text-primary-950 dark:text-primary-300 hover:text-primary-700 dark:hover:text-white font-medium transition-colors duration-200"
              :class="{ 'text-primary-700 dark:text-white font-semibold': route.name === 'projects' }"
            >
              Projects
            </router-link>
            <router-link
              :to="{ name: 'blog' }"
              class="text-primary-950 dark:text-primary-300 hover:text-primary-700 dark:hover:text-white font-medium transition-colors duration-200"
              :class="{ 'text-primary-700 dark:text-white font-semibold': route.name === 'blog' }"
            >
              Blog
            </router-link>
            <router-link
              :to="{ name: 'contact' }"
              class="text-primary-950 dark:text-primary-300 hover:text-primary-700 dark:hover:text-white font-medium transition-colors duration-200"
              :class="{ 'text-primary-700 dark:text-white font-semibold': route.name === 'contact' }"
            >
              Contact
            </router-link>
            
            <!-- Dark Mode Toggle -->
            <DarkModeToggle />
          </div>

          <!-- Mobile Menu Button -->
          <div class="flex md:hidden items-center gap-4">
            <DarkModeToggle />
            <button
              @click="toggleMobileMenu"
              class="p-2 rounded-lg text-primary-950 dark:text-white hover:bg-primary-500/20 dark:hover:bg-primary-800/50 transition-colors duration-200"
              :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
              data-testid="mobile-menu-toggle"
            >
              <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div
          v-show="mobileMenuOpen"
          class="md:hidden py-4 border-t border-primary-500/20 dark:border-primary-700/30 bg-primary-300/95 dark:bg-primary-900/95"
          data-testid="mobile-menu"
        >
          <div class="flex flex-col gap-2">
            <router-link
              :to="{ name: 'home' }"
              @click="closeMobileMenu"
              class="px-4 py-2 text-primary-950 dark:text-primary-300 hover:bg-primary-500/20 dark:hover:bg-primary-800/50 rounded-lg font-medium transition-colors duration-200"
              :class="{ 'bg-primary-500/30 dark:bg-primary-800/70 text-primary-700 dark:text-white font-semibold': route.name === 'home' }"
            >
              Home
            </router-link>
            <router-link
              :to="{ name: 'about' }"
              @click="closeMobileMenu"
              class="px-4 py-2 text-primary-950 dark:text-primary-300 hover:bg-primary-500/20 dark:hover:bg-primary-800/50 rounded-lg font-medium transition-colors duration-200"
              :class="{ 'bg-primary-500/30 dark:bg-primary-800/70 text-primary-700 dark:text-white font-semibold': route.name === 'about' }"
            >
              About
            </router-link>
            <router-link
              :to="{ name: 'projects' }"
              @click="closeMobileMenu"
              class="px-4 py-2 text-primary-950 dark:text-primary-300 hover:bg-primary-500/20 dark:hover:bg-primary-800/50 rounded-lg font-medium transition-colors duration-200"
              :class="{ 'bg-primary-500/30 dark:bg-primary-800/70 text-primary-700 dark:text-white font-semibold': route.name === 'projects' }"
            >
              Projects
            </router-link>
            <router-link
              :to="{ name: 'blog' }"
              @click="closeMobileMenu"
              class="px-4 py-2 text-primary-950 dark:text-primary-300 hover:bg-primary-500/20 dark:hover:bg-primary-800/50 rounded-lg font-medium transition-colors duration-200"
              :class="{ 'bg-primary-500/30 dark:bg-primary-800/70 text-primary-700 dark:text-white font-semibold': route.name === 'blog' }"
            >
              Blog
            </router-link>
            <router-link
              :to="{ name: 'contact' }"
              @click="closeMobileMenu"
              class="px-4 py-2 text-primary-950 dark:text-primary-300 hover:bg-primary-500/20 dark:hover:bg-primary-800/50 rounded-lg font-medium transition-colors duration-200"
              :class="{ 'bg-primary-500/30 dark:bg-primary-800/70 text-primary-700 dark:text-white font-semibold': route.name === 'contact' }"
            >
              Contact
            </router-link>
          </div>
        </div>
      </nav>
    </header>

    <!-- MAIN CONTENT -->
    <main class="flex-1 w-full bg-gradient-to-b from-white to-primary-300/10 dark:from-primary-950 dark:to-primary-900/30 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <router-view />
      </div>
    </main>

    <!-- FOOTER -->
    <footer class="bg-primary-900 dark:bg-primary-950 text-white border-t border-primary-700/30 dark:border-primary-800/50 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <!-- Column 1: About -->
          <div>
            <h3 class="text-lg font-semibold mb-3 text-accent-300">About</h3>
            <p class="text-primary-300 text-sm leading-relaxed">
              Portfolio profesional construido con Vue 3, TypeScript y Tailwind CSS.
            </p>
          </div>

          <!-- Column 2: Quick Links -->
          <div>
            <h3 class="text-lg font-semibold mb-3 text-accent-300">Quick Links</h3>
            <ul class="space-y-2">
              <li>
                <router-link
                  :to="{ name: 'home' }"
                  class="text-primary-300 hover:text-accent-300 text-sm transition-colors duration-200"
                >
                  Home
                </router-link>
              </li>
              <li>
                <router-link
                  :to="{ name: 'projects' }"
                  class="text-primary-300 hover:text-accent-300 text-sm transition-colors duration-200"
                >
                  Projects
                </router-link>
              </li>
              <li>
                <router-link
                  :to="{ name: 'blog' }"
                  class="text-primary-300 hover:text-accent-300 text-sm transition-colors duration-200"
                >
                  Blog
                </router-link>
              </li>
              <li>
                <router-link
                  :to="{ name: 'contact' }"
                  class="text-primary-300 hover:text-accent-300 text-sm transition-colors duration-200"
                >
                  Contact
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Column 3: Social -->
          <div>
            <h3 class="text-lg font-semibold mb-3 text-accent-300">Connect</h3>
            <div class="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary-300 hover:text-accent-300 transition-colors duration-200"
                aria-label="GitHub"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary-300 hover:text-accent-300 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary-300 hover:text-accent-300 transition-colors duration-200"
                aria-label="Twitter"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Copyright -->
        <div class="mt-8 pt-6 border-t border-primary-700/30 text-center">
          <p class="text-primary-300 text-sm">
            © {{ new Date().getFullYear() }} Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
