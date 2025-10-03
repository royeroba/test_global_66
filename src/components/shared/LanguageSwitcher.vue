<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

function toggleLanguage() {
  locale.value = locale.value === 'en' ? 'es' : 'en'
  localStorage.setItem('lang', locale.value)
}

const buttonText = computed(() => (locale.value === 'en' ? 'ES' : 'EN'))
</script>

<template>
  <div class="fixed top-4 right-4 z-40">
    <button
      class="inline-flex h-10 w-16 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-[var(--gray-200)] font-bold text-[var(--gray-900)] hover:bg-[var(--gray-100)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] transition-colors"
      :aria-label="`Switch to ${locale === 'en' ? 'Spanish' : 'English'}`"
      @click="toggleLanguage"
    >
      {{ buttonText }}
    </button>
  </div>
</template>
