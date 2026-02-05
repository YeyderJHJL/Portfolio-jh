<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer
    class="
      border-t border-primary-800
      bg-linear-to-t
      from-primary-950 to-primary-900
      text-text-dark-secondary
    "
  >
    <div class="max-w-7xl mx-auto px-6 py-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">

        <!-- Brand -->
        <div>
          <h3
            class="
              text-lg font-bold mb-4
              bg-linear-to-r
              from-accent-600 to-accent-500
              bg-clip-text text-transparent
            "
          >
            Portfolio
          </h3>
          <p class="text-sm leading-relaxed text-text-dark-muted">
            Building amazing web experiences with Vue.js and modern technologies.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-sm font-semibold mb-4 text-text-dark-primary">
            Quick Links
          </h4>
          <ul class="space-y-2">
            <li>
              <router-link
                :to="{ name: 'home' }"
                class="
                  text-sm font-medium
                  text-text-dark-secondary
                  hover:text-accent-400
                  transition-colors
                "
              >
                Home
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'projects' }"
                class="
                  text-sm font-medium
                  text-text-dark-secondary
                  hover:text-accent-400
                  transition-colors
                "
              >
                Projects
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'blog' }"
                class="
                  text-sm font-medium
                  text-text-dark-secondary
                  hover:text-accent-400
                  transition-colors
                "
              >
                Blog
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'contact' }"
                class="
                  text-sm font-medium
                  text-text-dark-secondary
                  hover:text-accent-400
                  transition-colors
                "
              >
                Contact
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Social -->
        <div>
          <h4 class="text-sm font-semibold mb-4 text-text-dark-primary">
            Connect
          </h4>
          <div class="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              aria-label="GitHub"
              class="
                text-text-dark-muted
                hover:text-accent-400
                transition-colors
              "
            >
              <i class="pi pi-github text-xl"></i>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              aria-label="LinkedIn"
              class="
                text-text-dark-muted
                hover:text-accent-400
                transition-colors
              "
            >
              <i class="pi pi-linkedin text-xl"></i>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              aria-label="Instagram"
              class="
                text-text-dark-muted
                hover:text-accent-400
                transition-colors
              "
            >
              <i class="pi pi-instagram text-xl"></i>
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              aria-label="Twitter"
              class="
                text-text-dark-muted
                hover:text-accent-400
                transition-colors
              "
            >
              <i class="pi pi-twitter text-xl"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom -->
      <div class="border-t border-primary-800 mt-10 pt-6 text-center">
        <p class="text-sm text-text-dark-muted">
          © {{ year }} Portfolio. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
