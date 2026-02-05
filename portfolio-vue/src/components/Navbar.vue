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
      backdrop-blur

      bg-linear-to-b
      from-primary-950 to-primary-900
      border-b border-primary-800/60

      text-text-dark-primary
    "
  >
    <nav class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

      <!-- Logo -->
      <router-link
        :to="{ name: 'home' }"
        class="
          text-xl font-bold tracking-tight
          bg-linear-to-r
          from-accent-600 to-accent-500
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
              text-text-dark-secondary
              hover:text-accent-400 hover:tracking-wide
              transition-all duration-200
            "
          >HOME</router-link>
        </li>

        <li>
          <router-link
            :to="{ name: 'projects' }"
            class="
              text-sm font-medium
              text-text-dark-secondary
              hover:text-accent-400 hover:tracking-wide
              transition-all duration-200
            "
          >PROJECTS</router-link>
        </li>

        <li>
          <router-link
            :to="{ name: 'blog' }"
            class="
              text-sm font-medium
              text-text-dark-secondary
              hover:text-accent-400 hover:tracking-wide
              transition-all duration-200
            "
          >BLOG</router-link>
        </li>

        <li>
          <router-link
            :to="{ name: 'about' }"
            class="
              text-sm font-medium
              text-text-dark-secondary
              hover:text-accent-400 hover:tracking-wide
              transition-all duration-200
            "
          >ABOUT</router-link>
        </li>

        <li>
          <router-link
            :to="{ name: 'contact' }"
            class="
              text-sm font-medium
              text-text-dark-secondary
              hover:text-accent-400 hover:tracking-wide
              transition-all duration-200
            "
          >CONTACT</router-link>
        </li>
      </ul>

      <!-- Actions -->
      <div class="flex items-center gap-4">
        <DarkModeToggle />

        <button
          class="
            md:hidden
            p-2 rounded-lg

            text-accent-400
            hover:bg-primary-800

            transition-colors duration-200
          "
          @click="toggleMobileMenu"
        >
          <i class="pi pi-bars text-xl"></i>
        </button>
      </div>
    </nav>

    <!-- Mobile menu -->
    <div
      v-if="isMobileMenuOpen"
      class="
        md:hidden
        absolute top-full left-0 w-full z-50

        bg-primary-900
        border-t border-primary-800

        transition-all
      "
    >
      <ul class="px-6 py-4 space-y-4">
        <li>
          <router-link
            @click="closeMobileMenu"
            :to="{ name: 'home' }"
            class="
              block
              text-sm font-medium
              text-text-dark-secondary
              hover:text-accent-400
              transition-colors duration-200
            "
          >Home</router-link>
        </li>

        <li>
          <router-link
            @click="closeMobileMenu"
            :to="{ name: 'projects' }"
            class="
              block
              text-sm font-medium
              text-text-dark-secondary
              hover:text-accent-400
              transition-colors duration-200
            "
          >Projects</router-link>
        </li>

        <li>
          <router-link
            @click="closeMobileMenu"
            :to="{ name: 'blog' }"
            class="
              block
              text-sm font-medium
              text-text-dark-secondary
              hover:text-accent-400
              transition-colors duration-200
            "
          >Blog</router-link>
        </li>

        <li>
          <router-link
            @click="closeMobileMenu"
            :to="{ name: 'about' }"
            class="
              block
              text-sm font-medium
              text-text-dark-secondary
              hover:text-accent-400
              transition-colors duration-200
            "
          >About</router-link>
        </li>

        <li>
          <router-link
            @click="closeMobileMenu"
            :to="{ name: 'contact' }"
            class="
              block
              text-sm font-medium
              text-text-dark-secondary
              hover:text-accent-400
              transition-colors duration-200
            "
          >Contact</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>
