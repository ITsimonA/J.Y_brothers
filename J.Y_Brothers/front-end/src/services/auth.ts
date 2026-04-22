export type AuthUser = {
  id: number
  fullName: string
  email: string
  createdAt: string
}

export type SignupInput = {
  fullName: string
  email: string
  password: string
}

export type LoginInput = {
  identifier: string
  password: string
}

type AuthResponse = {
  message: string
  user: AuthUser
}

const authStorageKey = 'j-y-brothers.auth.user'

async function requestJson<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`/api${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  })

  if (!response.ok) {
    const fallbackMessage = `Request failed with status ${response.status}`

    try {
      const errorBody = (await response.json()) as { message?: string }
      throw new Error(errorBody.message ?? fallbackMessage)
    } catch {
      throw new Error(fallbackMessage)
    }
  }

  return response.json() as Promise<T>
}

export function getCurrentUser(): AuthUser | null {
  const storedUser = localStorage.getItem(authStorageKey)

  if (!storedUser) {
    return null
  }

  try {
    return JSON.parse(storedUser) as AuthUser
  } catch {
    localStorage.removeItem(authStorageKey)
    return null
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

export function clearAuthSession(): void {
  localStorage.removeItem(authStorageKey)
}

function storeAuthUser(user: AuthUser): AuthUser {
  localStorage.setItem(authStorageKey, JSON.stringify(user))
  return user
}

export async function signup(input: SignupInput): Promise<AuthUser> {
  const response = await requestJson<AuthResponse>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(input),
  })

  return storeAuthUser(response.user)
}

export async function login(input: LoginInput): Promise<AuthUser> {
  const response = await requestJson<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(input),
  })

  return storeAuthUser(response.user)
}
