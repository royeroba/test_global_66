<script setup lang="ts">
import { computed } from 'vue'
import searchIcon from '@/assets/svg/icons/search-input.svg'

const props = defineProps<{
  modelValue: string
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
}>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

const inputClasses = computed(() => {
  const base =
    'w-full h-[50px] rounded-[8px] bg-white pl-12 pr-4 font-montserrat text-[16px] leading-[1.4] text-[var(--gray-900)] placeholder-[var(--gray-400)] outline-none shadow-[0_2px_10px_rgba(0,0,0,0.04)] ring-1 ring-[var(--gray-200)] focus:ring-2 focus:ring-[var(--gray-200)]'
  const disabled = props.disabled ? 'opacity-60 cursor-not-allowed' : ''
  return [base, disabled].join(' ')
})
</script>

<template>
  <div class="relative w-full">
    <img
      :src="searchIcon"
      alt="search"
      class="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2"
    />
    <input
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="inputClasses"
      type="text"
      @input="onInput"
    />
  </div>
</template>
