<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useProfileStore } from '../stores/profile'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Message from 'primevue/message'
import type { ContactMessage } from '../types'

const profileStore = useProfileStore()

// Form state
const formData = ref<ContactMessage>({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref<string | null>(null)

// Validation
const errors = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const validateEmail = (email: string) => {
  const regex = /^[^s@]+@[^s@]+.[^s@]+$/
  return regex.test(email)
}

const validateForm = (): boolean => {
  let isValid = true
  errors.value = { name: '', email: '', subject: '', message: '' }

  if (!formData.value.name.trim()) {
    errors.value.name = 'El nombre es requerido'
    isValid = false
  }

  if (!formData.value.email.trim()) {
    errors.value.email = 'El email es requerido'
    isValid = false
  } else if (!validateEmail(formData.value.email)) {
    errors.value.email = 'Email inválido'
    isValid = false
  }

  if (!formData.value.subject.trim()) {
    errors.value.subject = 'El asunto es requerido'
    isValid = false
  }

  if (!formData.value.message.trim()) {
    errors.value.message = 'El mensaje es requerido'
    isValid = false
  } else if (formData.value.message.trim().length < 10) {
    errors.value.message = 'El mensaje debe tener al menos 10 caracteres'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  submitSuccess.value = false
  submitError.value = null

  try {
    // Simular envío de formulario
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // En producción: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData.value) })
    console.log('Contact form submitted:', formData.value)

    submitSuccess.value = true
    
    // Limpiar formulario
    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }

    // Ocultar mensaje de éxito después de 5 segundos
    setTimeout(() => {
      submitSuccess.value = false
    }, 5000)

  } catch (err) {
    submitError.value = 'Hubo un error al enviar el mensaje. Por favor intenta nuevamente.'
    console.error('Error submitting form:', err)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  profileStore.fetchProfile()
})
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-12">
    
    <!-- ==========================
        HEADER
    =========================== -->
    <header class="text-center space-y-4">
      <h1 class="text-4xl md:text-5xl font-bold text-text-light-primary dark:text-text-dark-primary">
        Contáctame
      </h1>
      <p class="text-lg md:text-xl text-text-light-secondary dark:text-text-dark-secondary max-w-2xl mx-auto leading-relaxed">
        ¿Tienes un proyecto en mente o quieres colaborar? Envíame un mensaje y te responderé lo antes posible.
      </p>
    </header>

    <!-- ==========================
        SUCCESS MESSAGE
    =========================== -->
    <Message
      v-if="submitSuccess"
      severity="success"
      :closable="true"
      @close="submitSuccess = false"
      class="mb-6"
      :pt="{
        root: { class: 'bg-green-100 dark:bg-green-900 border-2 border-green-500 rounded-xl p-4' },
        wrapper: { class: 'flex items-center gap-3' },
        icon: { class: 'text-green-600 dark:text-green-400 text-xl' },
        text: { class: 'text-green-800 dark:text-green-200 font-semibold' }
      }"
    >
      ¡Mensaje enviado exitosamente! Te responderé pronto.
    </Message>

    <!-- ==========================
        ERROR MESSAGE
    =========================== -->
    <Message
      v-if="submitError"
      severity="error"
      :closable="true"
      @close="submitError = null"
      class="mb-6"
      :pt="{
        root: { class: 'bg-red-100 dark:bg-red-900 border-2 border-red-500 rounded-xl p-4' },
        wrapper: { class: 'flex items-center gap-3' },
        icon: { class: 'text-red-600 dark:text-red-400 text-xl' },
        text: { class: 'text-red-800 dark:text-red-200 font-semibold' }
      }"
    >
      {{ submitError }}
    </Message>

    <!-- ==========================
        CONTENT GRID
    =========================== -->
    <div class="grid md:grid-cols-2 gap-12">
      
      <!-- ==========================
          FORM COLUMN
      =========================== -->
      <div class="space-y-6">
        <h2 class="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary mb-6">
          Enviar Mensaje
        </h2>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Name -->
          <div class="space-y-2">
            <label for="name" class="block text-sm font-semibold text-text-light-primary dark:text-text-dark-primary">
              Nombre <span class="text-red-500">*</span>
            </label>
            <InputText
              id="name"
              v-model="formData.name"
              placeholder="Tu nombre completo"
              :class="[
                'w-full px-4 py-3 rounded-xl bg-primary-400 dark:bg-primary-800 border-2 transition-all duration-200',
                'text-text-light-primary dark:text-text-dark-primary placeholder:text-text-light-muted dark:placeholder:text-text-dark-muted',
                'focus:border-accent-700 dark:focus:border-accent-600 outline-none',
                errors.name ? 'border-red-500' : 'border-transparent'
              ]"
              unstyled
            />
            <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
          </div>

          <!-- Email -->
          <div class="space-y-2">
            <label for="email" class="block text-sm font-semibold text-text-light-primary dark:text-text-dark-primary">
              Email <span class="text-red-500">*</span>
            </label>
            <InputText
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="tu@email.com"
              :class="[
                'w-full px-4 py-3 rounded-xl bg-primary-400 dark:bg-primary-800 border-2 transition-all duration-200',
                'text-text-light-primary dark:text-text-dark-primary placeholder:text-text-light-muted dark:placeholder:text-text-dark-muted',
                'focus:border-accent-700 dark:focus:border-accent-600 outline-none',
                errors.email ? 'border-red-500' : 'border-transparent'
              ]"
              unstyled
            />
            <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
          </div>

          <!-- Subject -->
          <div class="space-y-2">
            <label for="subject" class="block text-sm font-semibold text-text-light-primary dark:text-text-dark-primary">
              Asunto <span class="text-red-500">*</span>
            </label>
            <InputText
              id="subject"
              v-model="formData.subject"
              placeholder="¿De qué quieres hablar?"
              :class="[
                'w-full px-4 py-3 rounded-xl bg-primary-400 dark:bg-primary-800 border-2 transition-all duration-200',
                'text-text-light-primary dark:text-text-dark-primary placeholder:text-text-light-muted dark:placeholder:text-text-dark-muted',
                'focus:border-accent-700 dark:focus:border-accent-600 outline-none',
                errors.subject ? 'border-red-500' : 'border-transparent'
              ]"
              unstyled
            />
            <p v-if="errors.subject" class="text-red-500 text-sm">{{ errors.subject }}</p>
          </div>

          <!-- Message -->
          <div class="space-y-2">
            <label for="message" class="block text-sm font-semibold text-text-light-primary dark:text-text-dark-primary">
              Mensaje <span class="text-red-500">*</span>
            </label>
            <Textarea
              id="message"
              v-model="formData.message"
              rows="6"
              placeholder="Escribe tu mensaje aquí..."
              :class="[
                'w-full px-4 py-3 rounded-xl bg-primary-400 dark:bg-primary-800 border-2 transition-all duration-200',
                'text-text-light-primary dark:text-text-dark-primary placeholder:text-text-light-muted dark:placeholder:text-text-dark-muted',
                'focus:border-accent-700 dark:focus:border-accent-600 outline-none resize-none',
                errors.message ? 'border-red-500' : 'border-transparent'
              ]"
              unstyled
            />
            <p v-if="errors.message" class="text-red-500 text-sm">{{ errors.message }}</p>
          </div>

          <!-- Submit Button -->
          <Button
            type="submit"
            :disabled="isSubmitting"
            :class="[
              'w-full px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300',
              'bg-accent-700 hover:bg-accent-600 text-white',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'hover:shadow-xl hover:scale-105'
            ]"
            unstyled
          >
            <span v-if="isSubmitting" class="flex items-center justify-center gap-3">
              <i class="pi pi-spin pi-spinner"></i>
              Enviando...
            </span>
            <span v-else class="flex items-center justify-center gap-3">
              <i class="pi pi-send"></i>
              Enviar Mensaje
            </span>
          </Button>
        </form>
      </div>

      <!-- ==========================
          LINKS COLUMN
      =========================== -->
      <div class="space-y-6">
        <h2 class="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary mb-6">
          Contacto Directo
        </h2>

        <!-- Email Card -->
        <a
          :href="`mailto:${profileStore.profile.social.email}`"
          class="block bg-primary-400 dark:bg-primary-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
        >
          <div class="flex items-start gap-4">
            <div class="w-14 h-14 rounded-full bg-accent-700 dark:bg-accent-600 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <i class="pi pi-envelope text-2xl"></i>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-text-light-primary dark:text-text-dark-primary mb-2">
                Email
              </h3>
              <p class="text-base text-accent-700 dark:text-accent-600 font-medium break-all">
                {{ profileStore.profile.social.email }}
              </p>
              <p class="text-sm text-text-light-muted dark:text-text-dark-muted mt-2">
                Envíame un correo directamente
              </p>
            </div>
          </div>
        </a>

        <!-- LinkedIn Card -->
        <a
          v-if="profileStore.profile.social.linkedin"
          :href="profileStore.profile.social.linkedin"
          target="_blank"
          rel="noopener noreferrer"
          class="block bg-primary-400 dark:bg-primary-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
        >
          <div class="flex items-start gap-4">
            <div class="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <i class="pi pi-linkedin text-2xl"></i>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-text-light-primary dark:text-text-dark-primary mb-2 flex items-center gap-2">
                LinkedIn
                <i class="pi pi-external-link text-sm text-text-light-muted dark:text-text-dark-muted"></i>
              </h3>
              <p class="text-base text-blue-600 dark:text-blue-400 font-medium">
                Conectemos en LinkedIn
              </p>
              <p class="text-sm text-text-light-muted dark:text-text-dark-muted mt-2">
                Networking profesional
              </p>
            </div>
          </div>
        </a>

        <!-- GitHub Card -->
        <a
          v-if="profileStore.profile.social.github"
          :href="profileStore.profile.social.github"
          target="_blank"
          rel="noopener noreferrer"
          class="block bg-primary-400 dark:bg-primary-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
        >
          <div class="flex items-start gap-4">
            <div class="w-14 h-14 rounded-full bg-gray-800 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <i class="pi pi-github text-2xl"></i>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-text-light-primary dark:text-text-dark-primary mb-2 flex items-center gap-2">
                GitHub
                <i class="pi pi-external-link text-sm text-text-light-muted dark:text-text-dark-muted"></i>
              </h3>
              <p class="text-base text-gray-800 dark:text-gray-300 font-medium">
                Revisa mis proyectos
              </p>
              <p class="text-sm text-text-light-muted dark:text-text-dark-muted mt-2">
                Código abierto y colaboración
              </p>
            </div>
          </div>
        </a>

        <!-- Info Note -->
        <div class="bg-accent-200 dark:bg-accent-900 rounded-2xl p-6 space-y-3">
          <div class="flex items-start gap-3">
            <i class="pi pi-info-circle text-accent-700 dark:text-accent-600 text-xl shrink-0 mt-0.5"></i>
            <div>
              <p class="text-sm text-text-light-primary dark:text-text-dark-primary leading-relaxed">
                <strong>Tiempo de respuesta:</strong> Generalmente respondo en 24-48 horas. Para consultas urgentes, escríbeme directamente por email.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>