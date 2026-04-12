<script setup lang="ts">
import { FOOTER_LINKS, SOCIAL_LINKS, BRAND } from '../data'

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
            {{ BRAND.name }}
          </h3>
          <p class="text-sm leading-relaxed text-text-dark-muted">
            {{ BRAND.tagline }}
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-sm font-semibold mb-4 text-text-dark-primary">
            Quick Links
          </h4>
          <ul class="space-y-2">
            <li v-for="link in FOOTER_LINKS" :key="link.routeName">
              <router-link
                :to="{ name: link.routeName }"
                class="
                  text-sm font-medium
                  text-text-dark-secondary
                  hover:text-accent-400
                  transition-colors
                "
              >
                {{ link.label }}
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
              v-for="social in SOCIAL_LINKS"
              :key="social.platform"
              :href="social.url"
              target="_blank"
              :aria-label="social.ariaLabel"
              class="
                text-text-dark-muted
                hover:text-accent-400
                transition-colors
              "
            >
              <i :class="[social.icon, 'text-xl']"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom -->
      <div class="border-t border-primary-800 mt-10 pt-6 text-center">
        <p class="text-sm text-text-dark-muted">
          &copy; {{ year }} {{ BRAND.name }}. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
