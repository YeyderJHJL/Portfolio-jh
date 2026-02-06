<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useSkillsStore } from '../../stores/skills'

const skillsStore = useSkillsStore()

const frontendSkills = computed(() =>
  skillsStore.skills.filter(s => s.category === 'frontend')
)
const backendSkills = computed(() =>
  skillsStore.skills.filter(s => s.category === 'backend')
)
const devopsSkills = computed(() =>
  skillsStore.skills.filter(s => s.category === 'devops')
)

onMounted(() => {
  skillsStore.clearError()
})
</script>

<template>
  <section class="py-16 px-6 max-w-7xl mx-auto">
    <h2 class="text-3xl font-bold mb-8 text-text-light-primary dark:text-text-dark-primary">
      Tech Stack
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div v-for="(group, idx) in [frontendSkills, backendSkills, devopsSkills]" :key="idx" class="space-y-4">
        <div
          v-for="skill in group"
          :key="skill.name"
          class="flex items-center gap-3"
        >
          <div class="w-18 h-18 flex items-center justify-center rounded
                      bg-primary-500 dark:bg-primary-700
                      text-primary-900 dark:text-accent-200">
            <span class="text-lg font-bold">{{ skill.icon }}</span>
          </div>

          <div class="flex-1">
            <div class="flex justify-between mb-1">
              <span class="font-medium text-text-light-primary dark:text-text-dark-primary">
                {{ skill.name }}
              </span>
              <span class="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                {{ skill.proficiency }}
              </span>
            </div>

            <div class="h-2 w-full bg-primary-300 dark:bg-primary-600 rounded">
              <div
                class="h-2 rounded transition-all duration-500"
                :class="{
                  'bg-accent-700': ['expert', 'advanced'].includes(skill.proficiency),
                  'bg-accent-600': skill.proficiency === 'intermediate',
                  'bg-accent-500': skill.proficiency === 'beginner'
                }"
                :style="{
                  width:
                    skill.proficiency === 'expert' ? '100%' :
                    skill.proficiency === 'advanced' ? '80%' :
                    skill.proficiency === 'intermediate' ? '60%' : '40%'
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
