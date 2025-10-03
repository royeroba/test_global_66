import { vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { usePokemonDetail } from '../usePokemonDetail'
import * as pokemonApi from '@/api/pokemon'

vi.mock('@/api/pokemon')
vi.mock('vue-i18n', () => ({
  useI18n: () => ({ t: (key: string) => key }),
}))

describe('usePokemonDetail', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()

    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(),
      },
    })
  })

  it('should have initial state', () => {
    const { showModal, isLoading, detail } = usePokemonDetail()

    expect(showModal.value).toBe(false)
    expect(isLoading.value).toBe(false)
    expect(detail.value).toBe(null)
  })

  it('should open pokemon detail successfully', async () => {
    const mockPokemon = {
      id: 25,
      name: 'pikachu',
      height: 40,
      weight: 60,
      types: ['electric'],
      image: 'test.png',
    }

    vi.mocked(pokemonApi.getPokemonByName).mockResolvedValue(mockPokemon)

    const { openDetail, showModal, detail, isLoading } = usePokemonDetail()

    await openDetail('pikachu')

    expect(isLoading.value).toBe(false)
    expect(showModal.value).toBe(true)
    expect(detail.value).toEqual(mockPokemon)
    expect(pokemonApi.getPokemonByName).toHaveBeenCalledWithExactlyOnceWith('pikachu')
  })

  it('should close detail correctly', () => {
    const { closeDetail, showModal, detail } = usePokemonDetail()

    closeDetail()

    expect(showModal.value).toBe(false)
    expect(detail.value).toBe(null)
  })

  it('should copy to clipboard and show success', async () => {
    const mockPokemon = {
      id: 25,
      name: 'pikachu',
      height: 40,
      weight: 60,
      types: ['electric'],
      image: 'test.png',
    }

    const mockClipboard = vi.mocked(navigator.clipboard.writeText)
    mockClipboard.mockResolvedValue()

    const { onShare, detail, showShareSuccess } = usePokemonDetail()
    detail.value = mockPokemon

    await onShare()

    expect(mockClipboard).toHaveBeenCalledWithExactlyOnceWith(
      'Name: pikachu, Weight: 60, Height: 40, Types: electric',
    )
    expect(showShareSuccess.value).toBe(true)
  })
})
