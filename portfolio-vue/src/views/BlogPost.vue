<template>
  <div class="blog-post">
    <h1>Blog Post</h1>
    <p>Blog post detail will go here</p>
    <p v-if="slug">Slug: {{ slug }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  slug: string;
}

const props = defineProps<Props>();
</script>

<style scoped>
.blog-post {
  padding: 2rem;
}
</style>
