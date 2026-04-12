<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  src?: string | null
  alt?: string
  icon?: string
  label?: string
  variant?: 'project' | 'blog' | 'avatar' | 'screenshot'
}

const props = withDefaults(defineProps<Props>(), {
  src: null,
  alt: '',
  icon: 'pi-image',
  label: '',
  variant: 'project',
})

const hasError = ref(false)
const isLoaded = ref(false)

const showFallback = computed(() => !props.src || hasError.value)

const onError = () => {
  hasError.value = true
}

const onLoad = () => {
  isLoaded.value = true
}

const fallbackIcon = computed(() => {
  if (props.icon !== 'pi-image') return props.icon
  switch (props.variant) {
    case 'project': return 'pi-code'
    case 'blog': return 'pi-pen-to-square'
    case 'avatar': return 'pi-user'
    case 'screenshot': return 'pi-desktop'
    default: return 'pi-image'
  }
})

const fallbackGradient = computed(() => {
  switch (props.variant) {
    case 'project':
      return 'bg-gradient-to-br from-accent-700/30 via-primary-700/50 to-primary-900/70'
    case 'blog':
      return 'bg-gradient-to-br from-blue-600/30 via-primary-700/50 to-primary-900/70'
    case 'avatar':
      return 'bg-gradient-to-br from-accent-600/40 via-accent-700/30 to-primary-800/60'
    case 'screenshot':
      return 'bg-gradient-to-br from-primary-600/40 via-primary-700/50 to-primary-900/60'
    default:
      return 'bg-gradient-to-br from-accent-700/30 via-primary-700/50 to-primary-900/70'
  }
})
</script>

<template>
  <div class="relative w-full h-full overflow-hidden">
    <!-- Real image -->
    <img
      v-if="!showFallback"
      :src="src!"
      :alt="alt"
      loading="lazy"
      :class="[
        'w-full h-full object-cover transition-all duration-500',
        isLoaded ? 'opacity-100' : 'opacity-0'
      ]"
      @error="onError"
      @load="onLoad"
    />

    <!-- Loading shimmer (while image loads) -->
    <div
      v-if="!showFallback && !isLoaded"
      class="absolute inset-0 bg-primary-300 dark:bg-primary-700 animate-pulse"
    />

    <!-- Fallback -->
    <div
      v-if="showFallback"
      :class="[
        'absolute inset-0 flex flex-col items-center justify-center gap-3',
        'bg-primary-300 dark:bg-primary-800',
        fallbackGradient,
      ]"
    >
      <!-- Decorative pattern -->
      <div class="absolute inset-0 opacity-[0.04]">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" stroke-width="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <!-- Icon -->
      <div class="relative w-16 h-16 rounded-2xl bg-primary-400/50 dark:bg-primary-700/50 backdrop-blur-sm flex items-center justify-center shadow-lg border border-primary-300/30 dark:border-primary-600/30">
        <i :class="['pi', fallbackIcon, 'text-2xl text-accent-600 dark:text-accent-500']"></i>
      </div>

      <!-- Label -->
      <span
        v-if="label || alt"
        class="relative text-xs font-medium text-text-light-muted dark:text-text-dark-muted text-center px-4 max-w-[80%] truncate"
      >
        {{ label || alt }}
      </span>
    </div>

    <!-- Slot for overlays (badges, gradients, etc) -->
    <slot />
  </div>
</template>
