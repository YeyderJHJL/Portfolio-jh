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
      transition-colors duration-300

      text-text-light-primary
      bg-linear-to-br
      from-primary-500 to-primary-300

      dark:text-text-dark-primary
      dark:from-primary-950 dark:to-primary-800
    "
  >
    <slot />
  </div>
</template>
