<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import PokemonListItem from '@/components/shared/PokemonListItem.vue'
import AppButton from '@/components/ui/AppButton.vue'

const props = withDefaults(
  defineProps<{
    items: { name: string; favorite: boolean }[]
    chunk?: number
  }>(),
  { chunk: 10 },
)

const emit = defineEmits<{
  (e: 'open', name: string): void
  (e: 'toggleFavorite', name: string): void
  (e: 'empty-state-change', isEmpty: boolean): void
}>()

const router = useRouter()
const { t } = useI18n()

const visibleCount = ref(props.chunk)
const displayedItems = computed(() => props.items.slice(0, visibleCount.value))

function onOpen(name: string) {
  emit('open', name)
}

function onToggle(name: string) {
  emit('toggleFavorite', name)
}

function goHome() {
  router.push({ name: 'home' })
}

const sentinel = ref<HTMLDivElement | null>(null)
let observer: IntersectionObserver | null = null

watch(
  () => props.items.length,
  (newLength) => {
    emit('empty-state-change', newLength === 0)
  },
  { immediate: true },
)

onMounted(() => {
  nextTick(() => {
    setupObserver()
  })
})

async function setupObserver() {
  if (!sentinel.value) return

  if (observer) {
    observer.disconnect()
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && visibleCount.value < props.items.length) {
          visibleCount.value = Math.min(visibleCount.value + props.chunk, props.items.length)
        }
      }
    },
    {
      rootMargin: '50px',
      threshold: 0.1,
    },
  )
  observer.observe(sentinel.value)
}

watch(sentinel, (newSentinel) => {
  if (newSentinel && !observer) {
    setupObserver()
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <div
      v-if="props.items.length === 0"
      class="grid place-items-center py-16 text-center"
    >
      <div>
        <h2 class="text-2xl font-bold text-[var(--gray-900)]">{{ t('emptyState.title') }}</h2>
        <p class="mt-2 text-[var(--gray-700)]">{{ t('emptyState.description') }}</p>
        <div class="mt-6">
          <AppButton
            :label="t('common.goBackHome')"
            variant="primary"
            @click="goHome"
          />
        </div>
      </div>
    </div>

    <PokemonListItem
      v-for="it in displayedItems"
      :key="it.name"
      :name="it.name"
      :favorite="it.favorite"
      @open="onOpen"
      @toggle-favorite="onToggle"
    />

    <div
      v-if="visibleCount < props.items.length"
      ref="sentinel"
      class="h-1"
    ></div>
  </div>
</template>
