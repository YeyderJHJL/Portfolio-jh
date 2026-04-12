/**
 * Contact Page Data
 * Labels, mensajes de validación, placeholders y textos del formulario
 */

// ============================================================
// PAGE HEADER
// ============================================================

export const CONTACT_HEADER = {
  title: 'Contáctame',
  subtitle: '¿Tienes un proyecto en mente o quieres colaborar? Envíame un mensaje y te responderé lo antes posible.',
}

// ============================================================
// FORM LABELS & PLACEHOLDERS
// ============================================================

export const CONTACT_FORM = {
  title: 'Enviar Mensaje',
  fields: {
    name: {
      label: 'Nombre',
      placeholder: 'Tu nombre completo',
    },
    email: {
      label: 'Email',
      placeholder: 'tu@email.com',
    },
    subject: {
      label: 'Asunto',
      placeholder: '¿De qué quieres hablar?',
    },
    message: {
      label: 'Mensaje',
      placeholder: 'Escribe tu mensaje aquí...',
    },
  },
  submitButton: 'Enviar Mensaje',
  submittingButton: 'Enviando...',
}

// ============================================================
// VALIDATION MESSAGES
// ============================================================

export const CONTACT_VALIDATION = {
  name: {
    required: 'El nombre es requerido',
  },
  email: {
    required: 'El email es requerido',
    invalid: 'Email inválido',
  },
  subject: {
    required: 'El asunto es requerido',
  },
  message: {
    required: 'El mensaje es requerido',
    minLength: 'El mensaje debe tener al menos 10 caracteres',
  },
}

// ============================================================
// FEEDBACK MESSAGES
// ============================================================

export const CONTACT_MESSAGES = {
  success: '¡Mensaje enviado exitosamente! Te responderé pronto.',
  error: 'Hubo un error al enviar el mensaje. Por favor intenta nuevamente.',
}

// ============================================================
// CONTACT CARDS
// ============================================================

export const CONTACT_CARDS = {
  directTitle: 'Contacto Directo',
  email: {
    title: 'Email',
    subtitle: 'Envíame un correo directamente',
  },
  linkedin: {
    title: 'LinkedIn',
    subtitle: 'Networking profesional',
    cta: 'Conectemos en LinkedIn',
  },
  github: {
    title: 'GitHub',
    subtitle: 'Código abierto y colaboración',
    cta: 'Revisa mis proyectos',
  },
  responseNote: 'Generalmente respondo en 24-48 horas. Para consultas urgentes, escríbeme directamente por email.',
}
