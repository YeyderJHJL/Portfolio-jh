<script setup lang="ts">
import { useDarkMode } from '../composables/useDarkMode'

const { isDark, toggleDark } = useDarkMode()
</script>

<template>
  <button
    @click="toggleDark"
    aria-label="Toggle dark mode"
    class="
      p-2 rounded-lg
      hover:bg-primary-800
      transition-all duration-200
      active:scale-95
    "
  >
    <!-- Sol = modo claro -->
    <i
      v-if="isDark"
      class="pi pi-sun text-accent-400 text-xl"
    />

    <!-- Luna = modo oscuro -->
    <i
      v-else
      class="pi pi-moon text-text-dark-secondary text-xl"
    />
  </button>
</template>
