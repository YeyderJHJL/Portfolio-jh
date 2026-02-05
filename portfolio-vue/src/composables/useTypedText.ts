// src/composables/useTypedText.ts
import { ref, onMounted } from 'vue'

export function useTypedText(text: string, speed = 100) {
  const typed = ref('')
  let index = 0

  const type = () => {
    if (index < text.length) {
      typed.value += text[index]
      index++
      setTimeout(type, speed)
    }
  }

  onMounted(() => type())

  return typed
}
