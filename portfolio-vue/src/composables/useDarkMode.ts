import { useColorMode } from '@vueuse/core'
import { computed, onMounted } from 'vue'

export function useDarkMode() {
  const mode = useColorMode({
    selector: 'html',                 // 🔥 ESTO ES LA CLAVE
    attribute: 'class',               // Tailwind usa clases
    storageKey: 'theme',              // localStorage key explícita
    initialValue: 'light',            // valor por defecto seguro
    modes: {
      light: 'light',
      dark: 'dark',
    },
  })

  // Garantiza que el DOM esté listo
  onMounted(() => {
    if (mode.value !== 'light' && mode.value !== 'dark') {
      mode.value = 'light'
    }
  })

  const toggleDark = () => {
    mode.value = mode.value === 'dark' ? 'light' : 'dark'
  }

  const isDark = computed(() => mode.value === 'dark')

  return {
    mode,        // 'light' | 'dark'
    isDark,      // boolean
    toggleDark,  // función
  }
}
