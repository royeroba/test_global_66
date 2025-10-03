<script setup lang="ts">
import loaderIcon from '@/assets/svg/loaders/Loader.svg'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    size?: number
    label?: string
    fullscreen?: boolean
  }>(),
  {
    size: 64,
    label: '',
    fullscreen: false,
  },
)

const boxStyle = computed(() => ({ width: `${props.size}px`, height: `${props.size}px` }))
</script>

<template>
  <div
    v-if="fullscreen"
    class="fixed inset-0 z-50 grid place-items-center bg-black/40 backdrop-blur-[4px]"
    role="status"
    aria-live="polite"
    aria-label="Loading"
  >
    <img
      :src="loaderIcon"
      :style="boxStyle"
      class="animate-spin select-none"
      alt="loading"
    />
  </div>

  <div
    v-else
    class="inline-flex items-center justify-center"
    role="status"
    aria-label="Loading"
  >
    <img
      :src="loaderIcon"
      :style="boxStyle"
      class="animate-spin select-none"
      alt="loading"
    />
  </div>
</template>
