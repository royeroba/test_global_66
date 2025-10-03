import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFavoritesStore } from '../favorites'

describe('useFavoritesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.removeItem('favorites:v1')
  })

  it('should start with empty favorites', () => {
    const store = useFavoritesStore()
    expect(store.count).toBe(0)
    expect(store.favoriteNames.size).toBe(0)
  })

  it('should add pokemon to favorites', () => {
    const store = useFavoritesStore()
    store.toggleFavorite('pikachu')

    expect(store.isFavorite('pikachu')).toBe(true)
    expect(store.count).toBe(1)
  })

  it('should remove pokemon from favorites', () => {
    const store = useFavoritesStore()
    store.toggleFavorite('pikachu')
    store.toggleFavorite('pikachu')

    expect(store.isFavorite('pikachu')).toBe(false)
    expect(store.count).toBe(0)
  })

  it('should clear all favorites', () => {
    const store = useFavoritesStore()
    store.toggleFavorite('pikachu')
    store.toggleFavorite('charizard')
    store.clear()

    expect(store.count).toBe(0)
    expect(store.isFavorite('pikachu')).toBe(false)
  })
})
