<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you're looking for doesn't exist.</p>
    <router-link :to="{ name: 'home' }" class="btn">Go Home</router-link>
  </div>
</template>

<script setup lang="ts">
// NotFound view - 404 page for invalid routes
</script>

<style scoped>
.not-found {
  padding: 2rem;
  text-align: center;
}

.btn {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #0066cc;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #0052a3;
}
</style>
