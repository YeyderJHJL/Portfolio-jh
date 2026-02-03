<template>
  <div class="public-layout">
    <!-- Header/Navbar -->
    <header class="navbar dark:bg-gray-900 dark:border-gray-700">
      <nav>
        <router-link :to="{ name: 'home' }" class="logo dark:text-white">Portfolio</router-link>
        <div class="flex items-center gap-4">
          <ul class="nav-links dark:text-white">
            <li><router-link :to="{ name: 'home' }">Home</router-link></li>
            <li><router-link :to="{ name: 'about' }">About</router-link></li>
            <li><router-link :to="{ name: 'projects' }">Projects</router-link></li>
            <li><router-link :to="{ name: 'blog' }">Blog</router-link></li>
            <li><router-link :to="{ name: 'contact' }">Contact</router-link></li>
            <li><DarkModeToggle /></li>
          </ul>
        </div>
      </nav>
    </header>

    <!-- Contenido de la página (inyectado por router-view) -->
    <main class="content">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>&copy; 2024 Portfolio. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Layout público - usado por todas las rutas excepto admin
import DarkModeToggle from '../components/DarkModeToggle.vue'
</script>

<style scoped>
.public-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar {
  background-color: #f5f5f5;
  padding: 1rem 2rem;
  border-bottom: 1px solid #ddd;
}

.navbar nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  font-weight: bold;
  font-size: 1.5rem;
  text-decoration: none;
  color: #333;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  transition: color 0.2s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #0066cc;
}

.content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 2rem;
}

.footer {
  background-color: #f5f5f5;
  padding: 2rem;
  text-align: center;
  border-top: 1px solid #ddd;
  margin-top: auto;
}
</style>
