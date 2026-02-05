<script setup lang="ts">
import DefaultLayout from './DefaultLayout.vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

</script>

<template>
  <DefaultLayout>
    <div class="flex min-h-screen flex-col">

      <!-- Navbar -->
      <Navbar />

      <!-- Main content -->
      <main
        class="
          flex-1
          w-full
          max-w-7xl
          mx-auto
          px-6 py-10
          transition-colors
        "
      >
        <router-view />
      </main>

      <!-- Footer -->
      <Footer />
    </div>
  </DefaultLayout>
</template>
