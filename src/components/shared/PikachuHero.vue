<script setup lang="ts">
import pikachu from '@/assets/svg/illustrations/Pikachu.svg'
import bg from '@/assets/svg/backgrounds/pikachu-background.svg'

withDefaults(
  defineProps<{
    maxWidth?: number
  }>(),
  {
    maxWidth: 420,
  },
)
</script>

<template>
  <div class="w-full flex justify-center">
    <div
      class="relative w-full max-w-[325px] sm:max-w-[420px] aspect-[325/288] select-none"
      :style="{ maxWidth: maxWidth + 'px' }"
    >
      <img
        :src="bg"
        alt="background"
        class="absolute inset-0 m-auto h-auto w-[78%] sm:w-[75%]"
        draggable="false"
      />
      <img
        :src="pikachu"
        alt="Pikachu"
        class="absolute inset-0 m-auto h-auto w-full drop-shadow"
        draggable="false"
      />
    </div>
  </div>
</template>
