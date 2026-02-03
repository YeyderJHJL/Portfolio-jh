import { useColorMode } from '@vueuse/core'
import { computed } from 'vue'

export function useDarkMode() {
    const mode = useColorMode({
        attribute: 'class',
        modes: {
        light: 'light',
        dark: 'dark',
        }
    })

    const toggleDark = () => {
        mode.value = mode.value === 'dark' ? 'light' : 'dark'
    }

    const isDark = computed(() => mode.value === 'dark')

    return {
        mode,
        isDark,
        toggleDark
    }
}