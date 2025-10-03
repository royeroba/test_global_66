import axios, { type AxiosError, type AxiosInstance } from 'axios'

type ApiError = {
  status: number
  message: string
  code?: string
}

const BASE_URL = import.meta.env.VITE_POKEAPI_BASE_URL

export const http: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError): Promise<never> => {
    const status = error.response?.status ?? 0
    const message =
      (error.response?.data as { message?: string } | undefined)?.message ?? error.message
    const normalized: ApiError = { status, message, code: error.code }
    return Promise.reject(normalized)
  },
)

export function withAbort(signal?: AbortSignal) {
  return signal ? { signal } : {}
}
