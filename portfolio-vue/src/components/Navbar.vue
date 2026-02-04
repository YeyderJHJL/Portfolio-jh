<script setup lang="ts">
import { ref } from 'vue'
import DarkModeToggle from './DarkModeToggle.vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header
    class="
      sticky top-0 z-50
      border-b border-primary-500/20
      bg-linear-to-b
      from-primary-300 to-primary-500
      dark:from-primary-950 dark:to-primary-900
      backdrop-blur
    "
  >
    <nav class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

      <!-- Logo -->
      <router-link
        :to="{ name: 'home' }"
        class="
          text-xl font-bold tracking-tight
          bg-linear-to-r
          from-accent-700 to-accent-600
          dark:from-accent-400 dark:to-accent-200
          bg-clip-text text-transparent
          transition-all
        "
      >
        Portfolio
      </router-link>

      <!-- Desktop links -->
      <ul class="hidden md:flex items-center gap-8">
        <li>
          <router-link
            :to="{ name: 'home' }"
            class="
              text-sm font-medium
              bg-linear-to-r
              from-accent-700 to-accent-400
              dark:from-accent-300 dark:to-accent-100
              bg-clip-text text-transparent
              hover:from-accent-600 hover:to-accent-300
              dark:hover:from-accent-200 dark:hover:to-accent-50
              transition-all duration-300
            "
          >Home</router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'projects' }"
            class="
              text-sm font-medium
              bg-linear-to-r
              from-accent-700 to-accent-400
              dark:from-accent-300 dark:to-accent-100
              bg-clip-text text-transparent
              hover:from-accent-600 hover:to-accent-300
              dark:hover:from-accent-200 dark:hover:to-accent-50
              transition-all duration-300
            "
          >Projects</router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'blog' }"
            class="
              text-sm font-medium
              bg-linear-to-r
              from-accent-700 to-accent-400
              dark:from-accent-300 dark:to-accent-100
              bg-clip-text text-transparent
              hover:from-accent-600 hover:to-accent-300
              dark:hover:from-accent-200 dark:hover:to-accent-50
              transition-all duration-300
            "
          >Blog</router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'about' }"
            class="
              text-sm font-medium
              bg-linear-to-r
              from-accent-700 to-accent-400
              dark:from-accent-300 dark:to-accent-100
              bg-clip-text text-transparent
              hover:from-accent-600 hover:to-accent-300
              dark:hover:from-accent-200 dark:hover:to-accent-50
              transition-all duration-300
            "
          >About</router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'contact' }"
            class="
              text-sm font-medium
              bg-linear-to-r
              from-accent-700 to-accent-400
              dark:from-accent-300 dark:to-accent-100
              bg-clip-text text-transparent
              hover:from-accent-600 hover:to-accent-300
              dark:hover:from-accent-200 dark:hover:to-accent-50
              transition-all duration-300
            "
          >Contact</router-link>
        </li>
      </ul>

      <!-- Actions -->
      <div class="flex items-center gap-4">
        <DarkModeToggle />

        <button
          class="
            md:hidden p-2 rounded-lg
            hover:bg-primary-400 dark:hover:bg-primary-800
            transition-colors
          "
          @click="toggleMobileMenu"
        >
          <i class="pi pi-bars text-xl text-primary-800 dark:text-primary-300"></i>
        </button>
      </div>
    </nav>

    <!-- Mobile menu -->
    <div
      v-if="isMobileMenuOpen"
      class="
        md:hidden
        border-t border-primary-500/20
        bg-linear-to-b
        from-primary-300 to-primary-500
        dark:from-primary-950 dark:to-primary-900
      "
    >
      <ul class="px-6 py-4 space-y-4">
        <li><router-link @click="closeMobileMenu" class="
                                                  text-sm font-medium
                                                  bg-linear-to-r
                                                  from-accent-700 to-accent-400
                                                  dark:from-accent-300 dark:to-accent-100
                                                  bg-clip-text text-transparent
                                                  hover:from-accent-600 hover:to-accent-300
                                                  dark:hover:from-accent-200 dark:hover:to-accent-50
                                                  transition-all duration-300
          " :to="{ name: 'home' }">Home</router-link></li>
        <li><router-link @click="closeMobileMenu" class="
                                                  text-sm font-medium
                                                  bg-linear-to-r
                                                  from-accent-700 to-accent-400
                                                  dark:from-accent-300 dark:to-accent-100
                                                  bg-clip-text text-transparent
                                                  hover:from-accent-600 hover:to-accent-300
                                                  dark:hover:from-accent-200 dark:hover:to-accent-50
                                                  transition-all duration-300
          " :to="{ name: 'projects' }">Projects</router-link></li>
        <li><router-link @click="closeMobileMenu" class="
                                                  text-sm font-medium
                                                  bg-linear-to-r
                                                  from-accent-700 to-accent-400
                                                  dark:from-accent-300 dark:to-accent-100
                                                  bg-clip-text text-transparent
                                                  hover:from-accent-600 hover:to-accent-300
                                                  dark:hover:from-accent-200 dark:hover:to-accent-50
                                                  transition-all duration-300
          " :to="{ name: 'blog' }">Blog</router-link></li>
        <li><router-link @click="closeMobileMenu" class="
                                                  text-sm font-medium
                                                  bg-linear-to-r
                                                  from-accent-700 to-accent-400
                                                  dark:from-accent-300 dark:to-accent-100
                                                  bg-clip-text text-transparent
                                                  hover:from-accent-600 hover:to-accent-300
                                                  dark:hover:from-accent-200 dark:hover:to-accent-50
                                                  transition-all duration-300
          " :to="{ name: 'about' }">About</router-link></li>
        <li><router-link @click="closeMobileMenu" class="
                                                  text-sm font-medium
                                                  bg-linear-to-r
                                                  from-accent-700 to-accent-400
                                                  dark:from-accent-300 dark:to-accent-100
                                                  bg-clip-text text-transparent
                                                  hover:from-accent-600 hover:to-accent-300
                                                  dark:hover:from-accent-200 dark:hover:to-accent-50
                                                  transition-all duration-300
          " :to="{ name: 'contact' }">Contact</router-link></li>
      </ul>
    </div>
  </header>
</template>
