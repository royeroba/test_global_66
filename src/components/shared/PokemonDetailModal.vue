<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import closeIcon from '@/assets/svg/icons/close-modal.svg'

const props = defineProps<{
  open: boolean
  maxWidth?: number
  heroHeight?: number
  backgroundSrc?: string
  pokemonImageSrc?: string | null
}>()

const emit = defineEmits<{ (e: 'close'): void }>()

const maxWidth = props.maxWidth ?? 570
const heroHeight = props.heroHeight ?? 220
</script>

<template>
  <TransitionRoot
    as="template"
    :show="open"
  >
    <Dialog
      as="div"
      class="relative z-50"
      @close="() => emit('close')"
    >
      <TransitionChild
        as="template"
        enter="ease-out duration-200"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-150"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/40" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            as="template"
            enter="ease-out duration-200"
            enter-from="opacity-0 translate-y-2"
            enter-to="opacity-100 translate-y-0"
            leave="ease-in duration-150"
            leave-from="opacity-100 translate-y-0"
            leave-to="opacity-0 translate-y-2"
          >
            <DialogPanel
              :class="`w-full overflow-hidden rounded-[12px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)]`"
              :style="{ maxWidth: maxWidth + 'px' }"
            >
              <div
                class="relative w-full"
                :style="{ height: heroHeight + 'px' }"
              >
                <template v-if="props.backgroundSrc">
                  <img
                    :src="props.backgroundSrc"
                    alt="background"
                    class="absolute inset-0 h-full w-full object-cover"
                  />
                </template>
                <template v-if="props.pokemonImageSrc">
                  <img
                    :src="props.pokemonImageSrc"
                    alt="pokemon"
                    class="absolute inset-0 m-auto h-auto max-h-[200px] w-auto"
                  />
                </template>
                <slot
                  v-else
                  name="header"
                />
                <button
                  class="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full cursor-pointer"
                  aria-label="Close"
                  @click="() => emit('close')"
                >
                  <img
                    :src="closeIcon"
                    alt="close"
                  />
                </button>
              </div>

              <div class="p-4">
                <div class="divide-y divide-[var(--gray-200)]">
                  <slot name="body">
                    <slot />
                  </slot>
                </div>
                <div class="mt-4">
                  <slot name="footer" />
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
