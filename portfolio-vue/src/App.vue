<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PublicLayout from './layouts/PublicLayout.vue'
import AdminLayout from './layouts/AdminLayout.vue'

const route = useRoute()

// Verifica si la ruta actual empieza con /admin
const isAdmin = computed(() => route.path.startsWith('/admin'))
</script>

<template>
  <div id="app">
    <!-- Las vistas se renderizan dentro de sus respectivos layouts -->
    <PublicLayout v-if="!isAdmin" />
    <AdminLayout v-else />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  color: #333;
}

#app {
  width: 100%;
  min-height: 100vh;
}
</style>
