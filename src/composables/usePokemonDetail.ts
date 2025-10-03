import { ref } from 'vue'
import { getPokemonByName } from '@/api/pokemon'
import type { PokemonDetail } from '@/types'

export function usePokemonDetail() {
  const showModal = ref(false)
  const isLoading = ref(false)
  const detail = ref<PokemonDetail | null>(null)
  const showShareSuccess = ref(false)

  async function openDetail(name: string) {
    isLoading.value = true
    try {
      detail.value = await getPokemonByName(name)
      showModal.value = true
    } finally {
      isLoading.value = false
    }
  }

  function getDetailImage(pokemon: PokemonDetail | null): string | undefined {
    if (!pokemon) return undefined
    return pokemon.image ?? undefined
  }

  async function onShare() {
    if (!detail.value) return
    const shareText = `Name: ${detail.value.name}, Weight: ${detail.value.weight}, Height: ${detail.value.height}, Types: ${detail.value.types.join(', ')}`
    try {
      await navigator.clipboard.writeText(shareText)
      showShareSuccess.value = true
      setTimeout(() => {
        showShareSuccess.value = false
      }, 2000)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  function closeDetail() {
    showModal.value = false
    detail.value = null
  }

  return {
    showModal,
    isLoading,
    detail,
    showShareSuccess,
    openDetail,
    getDetailImage,
    onShare,
    closeDetail,
  }
}
