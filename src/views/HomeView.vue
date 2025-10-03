<script setup lang="ts">
import { useRouter } from 'vue-router'
import PikachuHero from '@/components/shared/PikachuHero.vue'
import AppButton from '@/components/ui/AppButton.vue'

const router = useRouter()

function onGetStarted() {
  router.push({ name: 'pokemon-list' })
}
</script>

<template>
  <main class="mx-auto flex max-w-screen-md flex-col items-center px-4 py-8 text-center md:py-16">
    <PikachuHero />

    <h1 class="mt-6 text-2xl font-bold text-[var(--gray-900)] md:mt-8 md:text-3xl">
      {{ $t('welcome.title') }}
    </h1>

    <p class="mt-3 max-w-prose text-[var(--gray-700)] md:mt-4">
      {{ $t('welcome.description') }}
    </p>

    <div class="mt-6 md:mt-8">
      <AppButton
        :label="$t('welcome.getStarted')"
        variant="primary"
        @click="onGetStarted"
      />
    </div>
  </main>
</template>
