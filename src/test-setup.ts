import { beforeAll, vi } from 'vitest'

beforeAll(() => {
  vi.stubEnv('VITE_POKEAPI_BASE_URL', 'https://pokeapi.co/api/v2')
})

vi.mock('*.css', () => ({}))
vi.mock('*.svg', () => ({ default: 'mock-svg' }))
