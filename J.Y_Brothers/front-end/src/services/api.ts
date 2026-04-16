export type ApiHealth = {
  status: string
  uptime: number
  timestamp: string
}

export type ApiInfo = {
  name: string
  environment: string
  message: string
}

async function requestJson<T>(path: string): Promise<T> {
  const response = await fetch(`/api${path}`)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json() as Promise<T>
}

export function fetchHealth() {
  return requestJson<ApiHealth>('/health')
}

export function fetchInfo() {
  return requestJson<ApiInfo>('/info')
}
