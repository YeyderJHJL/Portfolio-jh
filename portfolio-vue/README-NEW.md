# Portfolio Profesional - Vue 3 + TypeScript + Vite

Arquitectura profesional y escalable para un portafolio personal. Diseñada como base real de aprendizaje con Router, Pinia, TypeScript 100% y estructura preparada para crecer.

## 🏗️ Arquitectura Implementada

### Estructura de Carpetas
```
src/
├── router/index.ts          # Vue Router 4 con lazy loading
├── stores/projects.ts       # Pinia (Composition API)
├── types/index.ts          # Interfaces TypeScript
├── layouts/
│   ├── PublicLayout.vue     # Header + Navbar + Footer
│   └── AdminLayout.vue      # Sidebar admin
├── views/                   # Componentes de página
│   ├── Home.vue
│   ├── About.vue
│   ├── Projects.vue
│   ├── ProjectDetail.vue
│   ├── Blog.vue
│   ├── BlogPost.vue
│   ├── Contact.vue
│   ├── NotFound.vue
│   └── admin/               # Vistas administrativas
│       ├── Dashboard.vue
│       ├── Projects.vue
│       └── Blog.vue
├── components/              # Reutilizables (próximamente)
├── App.vue                  # Componente raíz
└── main.ts                  # Inicialización
```

## 🔀 Vue Router 4 - Rutas Configuradas

### Rutas Públicas (8)
| Ruta | Name | Componente |
|------|------|-----------|
| `/` | `home` | Home.vue |
| `/about` | `about` | About.vue |
| `/projects` | `projects` | Projects.vue |
| `/projects/:id` | `project-detail` | ProjectDetail.vue |
| `/blog` | `blog` | Blog.vue |
| `/blog/:slug` | `blog-post` | BlogPost.vue |
| `/contact` | `contact` | Contact.vue |
| `/*` | `not-found` | NotFound.vue |

### Rutas Protegidas (Admin)
```
/admin                      → Dashboard
/admin/projects             → Gestionar proyectos
/admin/blog                 → Gestionar blog
```

**Características:**
- ✅ Lazy loading (code splitting automático)
- ✅ Rutas nombradas (navegación type-safe)
- ✅ Meta fields (`requiresAuth`, `title`, `layout`)
- ✅ Guards globales (comentados, listos para usar)
- ✅ Scroll behavior automático

**Usar en templates:**
```vue
<!-- Type-safe navigation -->
<router-link :to="{ name: 'home' }">Home</router-link>
<router-link :to="{ name: 'project-detail', params: { id: '1' } }">
  Project
</router-link>
```

## 🏪 Pinia Store - Estado Centralizado

**Archivo:** `src/stores/projects.ts`

### State (Datos Reactivos)
```typescript
const projects = ref<Project[]>(MOCK_PROJECTS)
const loading = ref(false)
const error = ref<string | null>(null)
```

### Getters (Selectores Derivados)
```typescript
store.featuredProjects           // Proyectos con featured: true
store.projectById(id)            // Buscar por ID
store.projectsByTech(tech)       // Filtrar por tecnología
store.projectsByCategory(cat)    // Filtrar por categoría
store.totalProjects              // Total de proyectos
```

### Actions (Operaciones)
```typescript
await store.fetchProjects()           // Cargar proyectos (async)
store.addProject(project)             // Agregar
store.updateProject(id, updates)      // Actualizar
store.deleteProject(id)               // Eliminar
store.clearError()                    // Limpiar errores
```

**Uso en Componentes:**
```vue
<script setup lang="ts">
import { useProjectsStore } from '../stores/projects'

const store = useProjectsStore()

// Acceder a state
const allProjects = store.projects

// Usar getters
const featured = store.featuredProjects

// Disparar actions
const loadProjects = async () => {
  await store.fetchProjects()
}
</script>
```

## 📦 Types - Interfaces Completas

**Archivo:** `src/types/index.ts`

### Interface `Project` (Estructura de Case Study)
```typescript
interface Project {
  id: string
  title: string
  slug: string
  
  // Problema y solución
  problem: string
  solution: string
  
  // Stack técnico
  techStack: {
    frontend?: string[]
    backend?: string[]
    database?: string[]
    devOps?: string[]
    testing?: string[]
  }
  
  // Contenido
  challenges: Challenge[]           // Desafíos superados
  keyFeatures: string[]            // Características clave
  images: {                         // Visuales
    thumbnail: string
    hero: string
    screenshots: string[]
  }
  
  // Métricas y enlaces
  metrics?: { label: string; value: string }[]
  links: ExternalLink[]             // GitHub, demo, blog
  
  // Metadatos
  featured: boolean
  tags: string[]
  category: "frontend" | "fullstack" | "backend" | "mobile"
  startDate: string                 // ISO 8601
  endDate?: string
}
```

### Otras Interfaces
- **`BlogPost`** - Artículos técnicos con contenido
- **`UserProfile`** - Información completa del perfil
- **`Skill`** - Habilidades con niveles de profundidad
- **`Certification`** - Certificados profesionales
- **`TimelineEvent`** - Eventos en el timeline de aprendizaje
- **`Challenge`** - Desafío técnico con solución e impacto
- **`ContactMessage`** - Mensaje del formulario de contacto

**Todos 100% tipados en TypeScript.**

## 🎨 Layouts

### PublicLayout
- Navbar con links a rutas principales
- Área de contenido (inyectada por router-view)
- Footer

### AdminLayout
- Sidebar fijo con navegación admin
- Área de contenido principal
- Preparado para autenticación

## 🚀 Quick Start

### Instalar dependencias
```bash
npm install
```

### Modo desarrollo
```bash
npm run dev
# http://localhost:5173
```

### Build para producción
```bash
npm run build
```

### Probar rutas
```
http://localhost:5173/           # Home
http://localhost:5173/projects   # Projects
http://localhost:5173/projects/1 # Project Detail (mock)
http://localhost:5173/admin      # Admin Dashboard
http://localhost:5173/notfound   # 404
```

## 💡 Flujo de Funcionamiento

1. **Usuario accede a una ruta** → `/projects/1`
2. **Vue Router** intercepta y carga `ProjectDetail.vue`
3. **Componente** accede a `useProjectsStore()`
4. **Store Pinia** devuelve el proyecto via getter `projectById(id)`
5. **Componente** renderiza los datos
6. **Layout public** envuelve la vista (navbar + footer)

## 🔐 Guards de Autenticación (Ejemplo)

Descomentar en `src/router/index.ts` para implementar:

```typescript
router.beforeEach((to, from, next) => {
  // Verificar rutas protegidas
  const requiresAuth = to.matched.some(r => r.meta.requiresAuth)
  const isAuthenticated = !!localStorage.getItem('authToken')
  
  if (requiresAuth && !isAuthenticated) {
    next({ name: 'home' })  // Redirigir a home
  } else {
    next()
  }
})
```

## 📝 Mock Data - Proyectos de Ejemplo

En `src/stores/projects.ts` hay 2 proyectos de ejemplo:

### 1. TaskFlow - App colaborativa en tiempo real
- **Stack:** React + Node.js + MongoDB + Socket.io
- **Desafíos:** Real-time sync, Performance optimization
- **Métricas:** Lighthouse 94/100, API <150ms
- **Features:** Kanban, asignación de tareas, notificaciones

### 2. DataViz - Dashboard de análisis
- **Stack:** Vue 3 + FastAPI + PostgreSQL + D3.js
- **Desafíos:** Rendering de datasets grandes
- **Métricas:** Query time <500ms, 1000+ usuarios
- **Features:** Gráficos interactivos, filtros, reportes

**Para agregar tus proyectos:**

```typescript
store.addProject({
  id: '3',
  title: 'Mi Proyecto',
  slug: 'mi-proyecto',
  shortDescription: 'Breve descripción',
  fullDescription: 'Descripción completa',
  problem: 'Problema que resuelve',
  solution: 'Cómo lo resuelve',
  techStack: {
    frontend: ['Vue 3', 'TypeScript'],
    backend: ['Node.js'],
    // ...
  },
  challenges: [
    {
      title: 'Reto 1',
      description: 'Descripción del reto',
      solution: 'Cómo se solucionó',
      impact: 'Resultado o impacto'
    }
  ],
  keyFeatures: ['Feature 1', 'Feature 2'],
  metrics: [
    { label: 'Performance', value: '95/100' }
  ],
  links: [
    { label: 'Demo', url: 'https://...', icon: 'external-link' },
    { label: 'GitHub', url: 'https://...', icon: 'github' }
  ],
  images: {
    thumbnail: 'https://...',
    hero: 'https://...',
    screenshots: ['https://...']
  },
  featured: true,
  startDate: '2024-01-01',
  endDate: '2024-03-31',
  tags: ['vue', 'typescript'],
  category: 'fullstack'
})
```

## 🛠️ Stack & Dependencias

- **Vue 3.5** - Framework progresivo
- **TypeScript 5.9** - Lenguaje tipado
- **Vue Router 5** - Routing con lazy loading
- **Pinia 3** - Estado global (Composition API)
- **Vite 7** - Build tool ultra rápido

Todas las dependencias ya están en `package.json`.

## 📚 Patrones Implementados

✅ **Composition API** - No Options API (más moderno)
✅ **Lazy Loading** - Code splitting automático en cada ruta
✅ **Named Routes** - Navegación type-safe
✅ **Pinia Composition** - Store con ref/computed
✅ **100% TypeScript** - Sin `any`, seguridad máxima
✅ **Meta Fields** - Control flexible de rutas
✅ **Error Handling** - Manejo consistente de errores
✅ **Extensible** - Preparado para escalar a backend

## 🚦 Roadmap - Próximos Pasos

### Fase 1: Componentes Reutilizables
- [ ] `ProjectCard.vue` - Card individual de proyecto
- [ ] `ProjectGrid.vue` - Grid responsive
- [ ] `SkillBar.vue` - Visualizar nivel de habilidad
- [ ] `ContactForm.vue` - Formulario con validación
- [ ] `TimelineComponent.vue` - Timeline interactivo

### Fase 2: Vistas Completas
- [ ] **Home.vue** - Hero + featured projects + CTA
- [ ] **Projects.vue** - Grid con filtros por tech/category
- [ ] **ProjectDetail.vue** - Caso de estudio completo
- [ ] **About.vue** - Historia, skills, certifications, timeline
- [ ] **Blog.vue** - Listado con búsqueda

### Fase 3: Funcionalidades Avanzadas
- [ ] Store de Blog (`stores/blog.ts`)
- [ ] Store de User (`stores/user.ts`)
- [ ] Autenticación real con JWT
- [ ] Guards de acceso por rol

### Fase 4: Backend Integration
- [ ] Reemplazar `fetchProjects()` con API real
- [ ] Conectar a base de datos
- [ ] CRUD real en panel admin
- [ ] Deploy a producción

## 📂 Archivos Clave para Modificar

| Archivo | Cuándo modificar |
|---------|-----------------|
| `src/router/index.ts` | Agregar/modificar rutas |
| `src/stores/projects.ts` | Agregar stores (blog, user, etc) |
| `src/types/index.ts` | Extender interfaces para nuevas entidades |
| `src/views/*.vue` | Implementar lógica de páginas |
| `src/layouts/*.vue` | Cambiar estructura general |
| `src/components/` | Crear componentes reutilizables |

## 🧪 Inspeccionar Store en Consola

En DevTools del navegador:

```javascript
// Acceder al store
const { useProjectsStore } = window.__PINIA_DEVTOOLS__
const store = useProjectsStore()

// Ver todos los proyectos
console.log(store.projects)

// Ver solo destacados
console.log(store.featuredProjects)

// Buscar proyectos por tecnología
console.log(store.projectsByTech('React'))

// Agregar nuevo proyecto
store.addProject({ id: '3', title: 'Nuevo', ... })
```

## 🎓 Conceptos Clave

### Rutas Nombradas vs Hardcodeadas
```vue
<!-- ✅ CORRECTO - Type-safe, router sabe si existe -->
<router-link :to="{ name: 'projects' }">Projects</router-link>

<!-- ❌ EVITAR - String hardcodeado, sin validación -->
<router-link to="/projects">Projects</router-link>
```

### Lazy Loading en Router
```typescript
// ✅ CORRECTO - Se carga en chunk separado
const Home = () => import("../views/Home.vue")

// ❌ EVITAR - Se incluye en main.js (más lento)
import Home from "../views/Home.vue"
```

### Pinia vs Props
```vue
<!-- Para datos compartidos entre muchas vistas: usa Pinia ✅ -->
const store = useProjectsStore()
const projects = store.projects

<!-- Para datos padre → hijo: usa Props ✅ -->
<ProjectCard :project="project" />
<script setup lang="ts">
defineProps<{ project: Project }>()
</script>
```

## 🔗 Recursos Útiles

- [Vue 3 Docs](https://vuejs.org)
- [Vue Router 4](https://router.vuejs.org)
- [Pinia Official](https://pinia.vuejs.org)
- [TypeScript Handbook](https://www.typescriptlang.org)
- [Vite Guide](https://vitejs.dev)

---

**Status:** ✅ Base arquitectónica completa y lista. 

**Next:** Implementar componentes y vistas específicas con tus datos reales.
