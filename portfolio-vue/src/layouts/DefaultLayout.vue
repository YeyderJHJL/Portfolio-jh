<script setup lang="ts">
import { useDarkMode } from '../composables/useDarkMode'

// solo se importa para inicializar el modo
useDarkMode()
</script>

<template>
  <div
    class="
      min-h-screen
      font-sans
      text-accent-900
      transition-colors duration-300

      bg-linear-to-br
      from-primary-300 via-primary-500 to-primary-700

      dark:text-accent-100
      dark:from-primary-950 dark:via-primary-900 dark:to-primary-800
    "
  >
    <slot />
  </div>
</template>
