export type Task = {
  id: number
  title: string
  description: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

export type TaskInput = {
  title: string
  description: string
  completed: boolean
}
