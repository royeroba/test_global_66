export type PokemonListItem = {
  name: string
  url: string
}

export type PokemonItem = {
  name: string
  favorite: boolean
}

export type PokemonListResponse = {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItem[]
}

export type PokemonTypeName = string

export type RawPokemonDetail = {
  id: number
  name: string
  height: number
  weight: number
  types: { type: { name: string } }[]
  sprites: {
    front_default: string | null
    other?: {
      ['official-artwork']?: {
        front_default: string | null
      }
    }
  }
}

export type PokemonDetail = {
  id: number
  name: string
  height: number
  weight: number
  types: PokemonTypeName[]
  image: string | null
}

export function mapRawDetailToDomain(raw: RawPokemonDetail): PokemonDetail {
  const image =
    raw.sprites.other?.['official-artwork']?.front_default ?? raw.sprites.front_default ?? null

  return {
    id: raw.id,
    name: raw.name,
    height: raw.height,
    weight: raw.weight,
    types: raw.types.map((t) => t.type.name as PokemonTypeName),
    image,
  }
}
