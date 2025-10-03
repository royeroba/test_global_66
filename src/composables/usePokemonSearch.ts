import { ref, computed } from 'vue'
import type { PokemonItem } from '@/types'

export function usePokemonSearch(initialItems: PokemonItem[]) {
  const search = ref('')

  const filteredItems = computed(() => {
    const q = search.value.trim().toLowerCase()
    if (!q) return initialItems
    return initialItems.filter((item) => item.name.toLowerCase().includes(q))
  })

  return {
    search,
    filteredItems,
  }
}
