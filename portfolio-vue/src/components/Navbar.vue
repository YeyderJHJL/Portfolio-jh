<script setup lang="ts">
import { ref } from 'vue'
import DarkModeToggle from './DarkModeToggle.vue'
import { NAV_ITEMS, BRAND } from '../data'

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
        {{ BRAND.name }}
      </router-link>

      <!-- Desktop links -->
      <ul class="hidden md:flex items-center gap-8">
        <li v-for="item in NAV_ITEMS" :key="item.routeName">
          <router-link
            :to="{ name: item.routeName }"
            class="
              text-sm font-medium
              text-text-dark-secondary
              hover:text-accent-400 hover:tracking-wide
              transition-all duration-200
            "
          >{{ item.label }}</router-link>
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
        <li v-for="item in NAV_ITEMS" :key="item.routeName">
          <router-link
            @click="closeMobileMenu"
            :to="{ name: item.routeName }"
            class="
              block
              text-sm font-medium
              text-text-dark-secondary
              hover:text-accent-400
              transition-colors duration-200
            "
          >{{ item.labelMobile || item.label }}</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>
