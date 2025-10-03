<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const props = defineProps<{
  label: string
  variant?: Variant
  size?: Size
  disabled?: boolean
  iconSrc?: string
}>()
const emit = defineEmits<{ (e: 'click', ev: MouseEvent): void }>()

const variant = computed<Variant>(() => props.variant ?? 'primary')
const size = computed<Size>(() => props.size ?? 'md')

function onClick(ev: MouseEvent) {
  if (props.disabled) return
  emit('click', ev)
}

const classes = computed(() => {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-bold cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
  const sizes: Record<Size, string> = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-6 text-[18px] leading-[1]',
    lg: 'h-12 px-7 text-lg',
  }
  const variants: Record<Variant, string> = {
    primary:
      'text-white shadow-md bg-[var(--color-primary)] hover:bg-[var(--color-primary-pressed)] disabled:opacity-50 disabled:cursor-not-allowed',
    secondary:
      'text-white bg-[var(--gray-200)] hover:bg-[var(--gray-400)] disabled:opacity-50 disabled:cursor-not-allowed',
    ghost:
      'text-[var(--gray-700)] bg-transparent hover:bg-[var(--gray-100)] disabled:opacity-50 disabled:cursor-not-allowed',
  }
  return [base, sizes[size.value], variants[variant.value]].join(' ')
})
</script>

<template>
  <button
    :class="classes"
    :disabled="disabled"
    @click="onClick"
  >
    <slot name="icon">
      <img
        v-if="iconSrc"
        :src="iconSrc"
        alt="icon"
        class="h-5 w-5"
      />
    </slot>
    <span>{{ label }}</span>
  </button>
</template>
