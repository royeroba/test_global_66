<script setup lang="ts">
import FavoriteButton from '@/components/shared/FavoriteButton.vue'

const props = defineProps<{
  name: string
  favorite: boolean
}>()

const emit = defineEmits<{
  (e: 'open', name: string): void
  (e: 'toggleFavorite', name: string): void
}>()

function onOpen() {
  emit('open', props.name)
}

function onToggle() {
  emit('toggleFavorite', props.name)
}
</script>

<template>
  <div
    class="flex w-full items-center justify-between rounded-[8px] bg-white px-4 py-2 shadow-[0_2px_10px_rgba(0,0,0,0.04)] min-h-[60px]"
  >
    <button
      type="button"
      class="text-[22px] font-bold text-[var(--gray-900)] focus:outline-none"
      @click="onOpen"
    >
      {{ name }}
    </button>
    <div @click.stop>
      <FavoriteButton
        :active="favorite"
        aria-label="favorite"
        @toggle="onToggle"
      />
    </div>
  </div>
</template>
