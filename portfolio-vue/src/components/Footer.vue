<template>
  <footer
    class="
      border-t border-primary-500/20
      bg-linear-to-t
      from-primary-300 to-primary-500
      dark:from-primary-950 dark:to-primary-900
    "
  >
    <div class="max-w-7xl mx-auto px-6 py-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <!-- Logo / Brand -->
        <div>
          <h3 class="
                text-lg font-bold mb-4
                bg-linear-to-r
                from-accent-900 to-accent-600
                dark:from-accent-300 dark:to-accent-200
                bg-clip-text text-transparent
              ">
            Portfolio
          </h3>
          <p class="text-sm text-primary-700 dark:text-primary-400 leading-relaxed">
            Building amazing web experiences with Vue.js and modern technologies.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-sm font-semibold text-primary-900 dark:text-primary-300 mb-4">
            Quick Links
          </h4>
          <ul class="space-y-2">
            <li>
              <router-link
                :to="{ name: 'home' }"
                class="
                  text-sm font-medium
                  bg-linear-to-r
                  from-accent-700 to-accent-400
                  dark:from-accent-300 dark:to-accent-100
                  bg-clip-text text-transparent

                  hover:from-accent-600 hover:to-accent-300
                  dark:hover:from-accent-200 dark:hover:to-accent-50

                  transition-all duration-300
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
                  bg-linear-to-r
                  from-accent-700 to-accent-400
                  bg-clip-text text-transparent

                  dark:from-accent-300 dark:to-accent-100

                  hover:from-accent-600 hover:to-accent-300
                  dark:hover:from-accent-200 dark:hover:to-accent-50

                  transition-all duration-300
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
                  bg-linear-to-r
                  from-accent-700 to-accent-400
                  bg-clip-text text-transparent

                  dark:from-accent-300 dark:to-accent-100

                  hover:from-accent-600 hover:to-accent-300
                  dark:hover:from-accent-200 dark:hover:to-accent-50

                  transition-all duration-300
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
                  bg-linear-to-r
                  from-accent-700 to-accent-400
                  bg-clip-text text-transparent

                  dark:from-accent-300 dark:to-accent-100

                  hover:from-accent-600 hover:to-accent-300
                  dark:hover:from-accent-200 dark:hover:to-accent-50

                  transition-all duration-300
                "
              >
                Contact
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Social Media -->
        <div>
          <h4 class="text-sm font-semibold text-primary-900 dark:text-primary-300 mb-4">
            Connect
          </h4>
          <div class="flex items-center gap-4">
            <a
              v-for="social in socials"
              :key="social.icon"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.label"
              class="
                text-primary-700 dark:text-primary-400
                hover:text-accent-600 dark:hover:text-accent-400
                transition-colors
              "
            >
              <i :class="`pi ${social.icon} text-xl`"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-primary-500/20 mt-10 pt-6 text-center">
        <p class="text-sm text-primary-700 dark:text-primary-400">
          © {{ year }} Portfolio. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
const year = new Date().getFullYear()

const socials = [
  { icon: 'pi-github', href: 'https://github.com', label: 'GitHub' },
  { icon: 'pi-linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: 'pi-instagram', href: 'https://instagram.com', label: 'Instagram' },
  { icon: 'pi-twitter', href: 'https://twitter.com', label: 'Twitter' },
]
</script>