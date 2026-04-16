import type { Task, TaskInput } from '@/types/task'

async function requestJson<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`/api${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
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

export function fetchTasks() {
  return requestJson<Task[]>('/tasks')
}

export function createTask(input: TaskInput) {
  return requestJson<Task>('/tasks', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export function updateTask(id: number, input: TaskInput) {
  return requestJson<Task>(`/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(input),
  })
}

export function deleteTask(id: number) {
  return requestJson<{ deleted: true }>(`/tasks/${id}`, {
    method: 'DELETE',
  })
}
