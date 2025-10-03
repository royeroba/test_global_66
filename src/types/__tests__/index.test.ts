import { describe, it, expect } from 'vitest'
import type { RawPokemonDetail } from '../index'
import { mapRawDetailToDomain } from '../index'

describe('Pokemon Types', () => {
  it('should map raw pokemon data correctly', () => {
    const rawData: RawPokemonDetail = {
      id: 25,
      name: 'pikachu',
      height: 40,
      weight: 60,
      types: [{ type: { name: 'electric' } }],
      sprites: {
        front_default: 'default-image.png',
        other: {
          'official-artwork': {
            front_default: 'official-image.png',
          },
        },
      },
    }

    const result = mapRawDetailToDomain(rawData)

    expect(result).toEqual({
      id: 25,
      name: 'pikachu',
      height: 40,
      weight: 60,
      types: ['electric'],
      image: 'official-image.png',
    })
  })

  it('should handle missing artwork gracefully', () => {
    const rawData: RawPokemonDetail = {
      id: 25,
      name: 'pikachu',
      height: 40,
      weight: 60,
      types: [],
      sprites: {
        front_default: 'default-image.png',
      },
    }

    const result = mapRawDetailToDomain(rawData)

    expect(result.image).toBe('default-image.png')
  })
})
