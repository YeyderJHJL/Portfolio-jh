<script setup lang="ts">
import { ref } from 'vue'
import DefaultLayout from './DefaultLayout.vue'
import AdminSidebar from '../components/AdminSidebar.vue'

const sidebarOpen = ref(false)

const openSidebar = () => {
  sidebarOpen.value = true
}

const closeSidebar = () => {
  sidebarOpen.value = false
}
</script>

<template>
  <DefaultLayout>
    <div class="min-h-screen flex">

      <!-- Sidebar -->
      <AdminSidebar
        :isSidebarOpen="sidebarOpen"
        @open="openSidebar"
        @close="closeSidebar"
      />

      <!-- Main content ONLY -->
      <main
        class="
          flex-1
          px-6 py-6
          pt-16 lg:pt-0
          transition-colors
        "
      >
        <router-view />
      </main>

    </div>
  </DefaultLayout>
</template>
