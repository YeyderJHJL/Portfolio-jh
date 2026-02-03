/**
 * Vue Router 4 - Configuración principal
 * Características:
 * - Lazy loading de vistas (code splitting automático)
 * - Rutas nombradas para navigate type-safe
 * - Meta fields para control de rutas protegidas
 * - Guards globales comentados como ejemplo
 * - Preparado para layouts (público vs admin)
 */

import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

/**
 * TIPOS DE RUTAS
 * - Public: accesibles a todos
 * - Protected: requieren autenticación (admin)
 * - Catch-all: 404
 */

// ============================================================
// LAZY LOADING - Vistas públicas
// ============================================================
// Vue + Vite resuelven automáticamente el import dinámico
// resultando en un chunk separado por vista

const Home = () => import("../views/Home.vue");
const About = () => import("../views/About.vue");
const Projects = () => import("../views/Projects.vue");
const ProjectDetail = () => import("../views/ProjectDetail.vue");
const Blog = () => import("../views/Blog.vue");
const BlogPost = () => import("../views/BlogPost.vue");
const Contact = () => import("../views/Contact.vue");

// Test component (temporary)
const TestTailwind = () => import("../components/TestTailwind.vue");

// Admin (rutas protegidas)
const AdminDashboard = () => import("../views/admin/Dashboard.vue");
const AdminProjects = () => import("../views/admin/Projects.vue");
const AdminBlog = () => import("../views/admin/Blog.vue");

// Fallback para rutas no encontradas
const NotFound = () => import("../views/NotFound.vue");

// ============================================================
// DEFINICIÓN DE RUTAS
// ============================================================

const routes: RouteRecordRaw[] = [
  // ========== HOME ==========
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      layout: "public",
      title: "Home - Portfolio",
    },
  },

  // ========== ABOUT ==========
  {
    path: "/about",
    name: "about",
    component: About,
    meta: {
      layout: "public",
      title: "About - Portfolio",
    },
  },

  // ========== PROJECTS ==========
  {
    path: "/projects",
    name: "projects",
    component: Projects,
    meta: {
      layout: "public",
      title: "Projects - Portfolio",
    },
  },
  {
    path: "/projects/:id",
    name: "project-detail",
    component: ProjectDetail,
    meta: {
      layout: "public",
      title: "Project Detail - Portfolio",
    },
    props: true, // Pasar params como props al componente
  },

  // ========== BLOG ==========
  {
    path: "/blog",
    name: "blog",
    component: Blog,
    meta: {
      layout: "public",
      title: "Blog - Portfolio",
    },
  },
  {
    path: "/blog/:slug",
    name: "blog-post",
    component: BlogPost,
    meta: {
      layout: "public",
      title: "Blog Post - Portfolio",
    },
    props: true,
  },

  // ========== CONTACT ==========
  {
    path: "/contact",
    name: "contact",
    component: Contact,
    meta: {
      layout: "public",
      title: "Contact - Portfolio",
    },
  },

  // ========== ADMIN - Rutas protegidas ==========
  // Las rutas admin funcionan con un layout diferente
  // En un proyecto real, aquí iría protección con guards
  {
    path: '/admin/dashboard',
    name: 'admin-dashboard',
    component: AdminDashboard,
    meta: { 
      layout: "admin",
      requiresAuth: true,
      requiresAdmin: true,
      title: 'Dashboard',
    }
  },
  {
    path: '/admin/projects',
    name: 'admin-projects',
    component: AdminProjects,
    meta: { 
      layout: "admin",
      requiresAuth: true,
      requiresAdmin: true,
      title: 'Admin Projects',
    }
  },
  {
    path: '/admin/blog',
    name: 'admin-blog',
    component: AdminBlog,
    meta: { 
      layout: "admin",
      requiresAuth: true,
      requiresAdmin: true,
      title: 'Admin Blog',
    }
  },

  // ========== 404 - Catch-all route (DEBE SER ÚLTIMO) ==========
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFound,
    meta: {
      layout: "public",
      title: "404 - Not Found",
    },
  },
];

// ============================================================
// CREACIÓN DEL ROUTER
// ============================================================

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Smooth scroll al cambiar de ruta
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// ============================================================
// GUARDS GLOBALES - EJEMPLO
// ============================================================

/**
 * Guard global antes de cada navegación
 * COMENTADO: descomentar y adaptar según necesidades reales
 */
/*
router.beforeEach((to, from, next) => {
  // Ejemplo 1: Verificar autenticación para rutas protegidas
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = !!localStorage.getItem('authToken');

  if (requiresAuth && !isAuthenticated) {
    // Redirigir a login o página protegida
    next({ name: 'home' });
  } else {
    next();
  }

  // Ejemplo 2: Actualizar título dinámicamente
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
});
*/

/**
 * Guard global después de cada navegación
 * Útil para analytics, limpiar estado, etc
 */
/*
router.afterEach((to, from) => {
  // Aquí podrías:
  // - Trackear navegación en analytics
  // - Limpiar modales o notificaciones
  // - Actualizar state global
});
*/

export default router;
