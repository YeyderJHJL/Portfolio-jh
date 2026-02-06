<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '../../stores/blog'

const router = useRouter()
const goToBlogs = () => router.push('/blog')

const blogStore = useBlogStore()
const latestPosts = computed(() => blogStore.latestPosts.slice(0, 3))

onMounted(() => {
  blogStore.fetchPosts()
})
</script>

<template>
  <section class="py-16 px-6 max-w-7xl mx-auto">
    <h2 class="text-3xl font-bold mb-8 text-text-light-primary dark:text-text-dark-primary">
      Latest Posts
    </h2>

    <div class="relative overflow-hidden">
      <div
        class="
          flex gap-6 w-max
          animate-blog-scroll md:animate-blog-scroll-desktop
          cursor-grab active:cursor-grabbing
        "
      >
        <div
          v-for="post in [...latestPosts, ...latestPosts]"
          :key="post.id + '-dup'"
          class="
            flex-none w-72 md:w-96
            bg-primary-400 dark:bg-primary-800
            rounded-xl shadow-lg overflow-hidden
            transform hover:scale-105 hover:shadow-xl
            transition-all duration-300
          "
        >
          <img :src="post.thumbnail" :alt="post.title" class="w-full h-40 md:h-52 object-cover" />

          <div class="p-4">
            <h3 class="font-semibold text-lg mb-1 text-text-light-primary dark:text-text-dark-primary">
              {{ post.title }}
            </h3>
            <p class="text-xs text-text-light-secondary dark:text-text-dark-secondary mb-2">
              {{ post.publishedAt }}
            </p>
            <p class="text-text-light-secondary dark:text-text-dark-secondary text-sm">
              {{ post.excerpt }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 text-right">
      <button
        @click="goToBlogs"
        class="px-6 py-3 text-text-light-secondary dark:text-text-dark-primary
               font-semibold hover:underline transition-colors duration-300"
      >
        View All Posts
      </button>
    </div>
  </section>
</template>
<style scoped>
@keyframes blog-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Mobile: más rápido */
.animate-blog-scroll {
  animation: blog-scroll 22s linear infinite;
}

/* Desktop: más lento y elegante */
.animate-blog-scroll-desktop {
  animation: blog-scroll 35s linear infinite;
}

/* Pausa al interactuar */
.animate-blog-scroll:hover,
.animate-blog-scroll-desktop:hover {
  animation-play-state: paused;
}
</style>

