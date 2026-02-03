<script setup lang="ts">
import { useDarkMode } from '../composables/useDarkMode'

const { isDark, toggleDark } = useDarkMode()
</script>

<template>
    <button 
        @click="toggleDark"
        class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
    >
        <i v-if="isDark" class="pi pi-sun text-yellow-400 text-xl"></i>
        <i v-else class="pi pi-moon text-blue-500 text-xl"></i>
    </button>
</template>