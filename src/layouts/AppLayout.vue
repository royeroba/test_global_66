<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed, watch } from 'vue'
import LanguageSwitcher from '@/components/shared/LanguageSwitcher.vue'
import AppFooter from '@/components/shared/AppFooter.vue'
import { useAppState } from '@/composables/useAppState'

const route = useRoute()
const { showFooter } = useAppState()

const shouldShowFooter = computed(() => {
  const metaHideFooter = route.meta && (route.meta as { hideFooter?: boolean }).hideFooter
  return !metaHideFooter && showFooter.value
})

watch(route, () => {
  showFooter.value = true
})
</script>

<template>
  <div class="min-h-screen bg-neutral-50 text-neutral-900 pb-[88px] md:pb-12">
    <LanguageSwitcher />
    <div class="mx-auto w-full max-w-screen-md px-4 pt-4">
      <RouterView />
    </div>
    <AppFooter v-if="shouldShowFooter" />
  </div>
</template>
