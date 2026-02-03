<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <nav>
        <h2>Admin</h2>
        <ul>
          <li>
            <router-link :to="{ name: 'admin-dashboard' }">Dashboard</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'admin-projects' }">Projects</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'admin-blog' }">Blog</router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <main class="admin-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
// Layout admin - para rutas protegidas bajo /admin/*
// Aquí irían controles de autenticación y permisos
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.admin-sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 2rem;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
}

.admin-sidebar h2 {
  margin: 0 0 2rem 0;
}

.admin-sidebar ul {
  list-style: none;
  padding: 0;
}

.admin-sidebar li {
  margin-bottom: 1rem;
}

.admin-sidebar a {
  color: white;
  text-decoration: none;
  display: block;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.admin-sidebar a:hover,
.admin-sidebar a.router-link-active {
  background-color: #34495e;
}

.admin-content {
  margin-left: 250px;
  padding: 2rem;
  flex: 1;
}
</style>
