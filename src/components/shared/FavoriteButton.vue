<script setup lang="ts">
import { computed } from 'vue'
import starActive from '@/assets/svg/icons/star-favorite-active.svg'
import starInactive from '@/assets/svg/icons/star-favorite-inactive.svg'

type Size = 'sm' | 'md'

const props = defineProps<{
  active: boolean
  size?: Size
  disabled?: boolean
  ariaLabel?: string
}>()

const emit = defineEmits<{ (e: 'toggle'): void }>()

const sizePx = computed(() => (props.size === 'sm' ? 36 : 44))

function onClick() {
  if (props.disabled) return
  emit('toggle')
}

const srcIcon = computed(() => (props.active ? starActive : starInactive))
</script>

<template>
  <button
    :aria-pressed="active"
    :aria-label="ariaLabel || (active ? 'Remove from favorites' : 'Add to favorites')"
    :disabled="disabled"
    class="cursor-pointer inline-flex items-center justify-center rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] ring-1 ring-[var(--gray-200)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] disabled:opacity-60 disabled:cursor-not-allowed"
    :style="{ width: sizePx + 'px', height: sizePx + 'px' }"
    @click="onClick"
  >
    <img
      :src="srcIcon"
      alt="favorite"
    />
  </button>
</template>
