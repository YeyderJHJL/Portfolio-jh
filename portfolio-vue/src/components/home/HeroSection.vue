<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useTypedText } from '../../composables/useTypedText'

const router = useRouter()

const goToProjects = () => router.push('/projects')
const goToContact = () => router.push('/contact')

const fullName = 'Jhamil Yeyder Turpo Añasco'
const typedName = useTypedText(fullName, 120)
</script>

<template>
  <section
    class="
      relative flex flex-col justify-center items-center h-screen text-center
      overflow-hidden
      bg-linear-to-r
      from-accent-500 via-accent-700 to-accent-500
      dark:from-primary-700 dark:via-primary-900 dark:to-primary-700
      animate-gradient-x
    "
  >
    <h1
      class="text-4xl md:text-6xl font-bold mb-4 tracking-tight
             text-text-light-primary dark:text-text-dark-primary z-10"
    >
      {{ typedName }}
    </h1>

    <p
      class="text-lg md:text-2xl mb-8
             text-text-light-secondary dark:text-text-dark-secondary z-10"
    >
      Fullstack Developer & Project Manager
    </p>

    <div class="flex gap-4 z-10">
      <button
        @click="goToProjects"
        class="px-6 py-3 rounded-lg font-semibold
               bg-accent-700 text-text-light-primary
               hover:bg-accent-600
               dark:hover:bg-accent-400
               transition-colors duration-300"
      >
        View Projects
      </button>

      <button
        @click="goToContact"
        class="px-6 py-3 rounded-lg font-semibold
               bg-accent-200 text-text-light-primary
               hover:bg-accent-300
               dark:bg-primary-700 dark:text-text-dark-primary
               dark:hover:bg-primary-600
               transition-colors duration-300"
      >
        Contact Me
      </button>
    </div>

    <div class="absolute bottom-10 z-10 flex flex-col items-center animate-bounce">
      <span class="block w-3 h-3 rounded-full bg-accent-900 dark:bg-accent-200 mb-2"></span>
      <span class="block w-3 h-3 rounded-full bg-accent-900 dark:bg-accent-200"></span>
    </div>
  </section>
</template>
<style scoped>
@keyframes gradient-x {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 10s ease infinite;
}
</style>