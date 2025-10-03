<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

type Variant = 'success' | 'error' | 'info'

const props = withDefaults(
  defineProps<{
    show: boolean
    variant?: Variant
    messageKey?: string
    messageText?: string
  }>(),
  {
    variant: 'success',
    messageKey: 'common.copiedToClipboard',
    messageText: '',
  },
)

const { t } = useI18n()

const computedMessage = computed(() => {
  if (props.messageText) return props.messageText
  return t(props.messageKey!)
})

const colors = {
  success: 'bg-green-100 text-green-800 border-green-200',
  error: 'bg-red-100 text-red-800 border-red-200',
  info: 'bg-blue-100 text-blue-800 border-blue-200',
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div
        v-if="show"
        :class="`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg border ${colors[variant]}`"
      >
        <div class="flex items-center gap-2">
          <svg
            v-if="variant === 'success'"
            class="w-4 h-4 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>

          <svg
            v-else-if="variant === 'error'"
            class="w-4 h-4 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0>/pathL10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>

          <svg
            v-else-if="variant === 'info'"
            class="w-4 h-4 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            />
          </svg>

          <span class="text-sm font-medium">{{ computedMessage }}</span>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
