<script setup lang="ts">
import { useDarkMode } from '../composables/useDarkMode'

const { isDark, toggleDark } = useDarkMode()
</script>

<template>
  <div class="p-8 space-y-6">
    <h1 class="text-3xl font-bold mb-4">🧪 Test Tailwind Custom Colors + Dark Mode</h1>
    
    <!-- Dark Mode Toggle -->
    <button 
      @click="toggleDark"
      class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-700 transition-colors"
    >
      {{ isDark ? '☀️ Switch to Light' : '🌙 Switch to Dark' }}
    </button>

    <div class="text-sm">
      Current mode: <strong>{{ isDark ? 'DARK' : 'LIGHT' }}</strong>
    </div>

    <!-- Test Primary Colors -->
    <div>
      <h2 class="text-xl font-semibold mb-2">Primary Colors:</h2>
      <div class="flex flex-wrap gap-4">
        <div class="w-24 h-24 bg-primary-950 rounded flex items-center justify-center text-white text-xs">950</div>
        <div class="w-24 h-24 bg-primary-900 rounded flex items-center justify-center text-white text-xs">900</div>
        <div class="w-24 h-24 bg-primary-800 rounded flex items-center justify-center text-white text-xs">800</div>
        <div class="w-24 h-24 bg-primary-700 rounded flex items-center justify-center text-white text-xs">700</div>
        <div class="w-24 h-24 bg-primary-600 rounded flex items-center justify-center text-white text-xs">600</div>
        <div class="w-24 h-24 bg-primary-500 rounded flex items-center justify-center text-white text-xs">500</div>
        <div class="w-24 h-24 bg-primary-300 rounded flex items-center justify-center text-primary-950 text-xs">300</div>
      </div>
    </div>

    <!-- Test Accent Colors -->
    <div>
      <h2 class="text-xl font-semibold mb-2">Accent Colors:</h2>
      <div class="flex flex-wrap gap-4">
        <div class="w-24 h-24 bg-accent-700 rounded flex items-center justify-center text-white text-xs">700</div>
        <div class="w-24 h-24 bg-accent-500 rounded flex items-center justify-center text-white text-xs">500</div>
        <div class="w-24 h-24 bg-accent-300 rounded flex items-center justify-center text-primary-950 text-xs">300</div>
      </div>
    </div>

    <!-- Test Dark Mode Classes -->
    <div>
      <h2 class="text-xl font-semibold mb-2">Dark Mode Test:</h2>
      <div class="p-4 bg-primary-300 dark:bg-primary-900 text-primary-950 dark:text-white rounded-lg transition-colors">
        Este texto debe cambiar cuando toggleas dark mode.
        <br>
        Light: fondo primary-300, texto primary-950
        <br>
        Dark: fondo primary-900, texto white
      </div>
    </div>

    <!-- Test Gradients -->
    <div>
      <h2 class="text-xl font-semibold mb-2">Gradient Test:</h2>
      <div class="h-24 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center text-white font-semibold">
        Primary → Accent Gradient
      </div>
    </div>
  </div>
</template>
