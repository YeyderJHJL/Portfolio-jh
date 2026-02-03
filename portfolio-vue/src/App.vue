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
  <div id="app" class="min-h-screen">
    <!-- Las vistas se renderizan dentro de sus respectivos layouts -->
    <PublicLayout v-if="!isAdmin" />
    <AdminLayout v-else />
  </div>
</template>
