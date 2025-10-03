import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'favorites:v1'

export const useFavoritesStore = defineStore('favorites', () => {
  const favoriteNames = ref<Set<string>>(new Set())

  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as string[]
      favoriteNames.value = new Set(parsed)
    } catch {
      favoriteNames.value = new Set()
    }
  }

  watch(
    favoriteNames,
    (set) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)))
    },
    { deep: true },
  )

  const count = computed(() => favoriteNames.value.size)

  function isFavorite(name: string): boolean {
    return favoriteNames.value.has(name)
  }

  function toggleFavorite(name: string) {
    if (favoriteNames.value.has(name)) {
      favoriteNames.value.delete(name)
    } else {
      favoriteNames.value.add(name)
    }
  }

  function clear() {
    favoriteNames.value = new Set()
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    favoriteNames,
    count,
    isFavorite,
    toggleFavorite,
    clear,
  }
})
