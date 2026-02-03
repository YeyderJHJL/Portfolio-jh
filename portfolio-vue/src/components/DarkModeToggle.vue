<script setup lang="ts">
import { useDarkMode } from '../composables/useDarkMode'

const { isDark, toggleDark } = useDarkMode()
</script>

<template>
  <button
    @click="toggleDark"
    class="
    p-2 rounded-lg transition-colors
    hover:bg-primary-300
    dark:hover:bg-primary-800
  "
  >
    <!-- Sol = modo claro -->
    <i
      v-if="isDark"
      class="pi pi-sun text-accent-400 text-xl"
    ></i>

    <!-- Luna = modo oscuro -->
    <i
      v-else
      class="pi pi-moon text-primary-500 dark:text-primary-700 text-xl"
    ></i>
  </button>
</template>
