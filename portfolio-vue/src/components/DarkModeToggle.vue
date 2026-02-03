<script setup lang="ts">
import { useDarkMode } from '../composables/useDarkMode'

const { isDark, toggleDark } = useDarkMode()
</script>

<template>
  <button 
    @click="toggleDark"
    class="p-2 rounded-lg bg-primary-500/20 dark:bg-primary-800/50 hover:bg-primary-500/40 dark:hover:bg-primary-700/70 transition-all duration-200 border border-primary-500/30 dark:border-primary-700/50"
    :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
    data-testid="dark-mode-toggle"
  >
    <!-- Sun icon (shown in DARK mode) -->
    <svg 
      v-if="isDark" 
      class="w-5 h-5 text-accent-300" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
      />
    </svg>
    
    <!-- Moon icon (shown in LIGHT mode) -->
    <svg 
      v-else 
      class="w-5 h-5 text-primary-700" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
      />
    </svg>
  </button>
</template>
