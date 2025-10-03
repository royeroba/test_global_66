import { http, withAbort } from './index'
import type { PokemonListResponse, PokemonDetail, RawPokemonDetail } from '@/types'
import { mapRawDetailToDomain } from '@/types'

export async function getPokemonList(
  params: { limit: number; offset: number },
  signal?: AbortSignal,
): Promise<PokemonListResponse> {
  const res = await http.get<PokemonListResponse>('pokemon', { params, ...withAbort(signal) })
  return res.data
}

export async function getPokemonByName(name: string, signal?: AbortSignal): Promise<PokemonDetail> {
  const res = await http.get<RawPokemonDetail>(`pokemon/${name}`, { ...withAbort(signal) })
  return mapRawDetailToDomain(res.data)
}
