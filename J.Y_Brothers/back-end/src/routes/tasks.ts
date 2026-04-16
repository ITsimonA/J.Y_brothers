import { Router } from 'express'
import {
  createTask,
  deleteTask,
  getTaskById,
  listTasks,
  updateTask,
} from '../repositories/taskRepository.js'
import type { TaskInput } from '../repositories/taskRepository.js'

const tasksRouter = Router()

function parseTaskId(value: string): number | null {
  const taskId = Number(value)

  if (!Number.isInteger(taskId) || taskId < 1) {
    return null
  }

  return taskId
}

function parseTaskInput(body: unknown): { error?: string; data?: TaskInput } {
  if (typeof body !== 'object' || body === null) {
    return { error: 'Request body must be a JSON object.' }
  }

  const payload = body as Record<string, unknown>

  if (typeof payload.title !== 'string' || payload.title.trim().length === 0) {
    return { error: 'Task title is required.' }
  }

  if (typeof payload.description !== 'string') {
    return { error: 'Task description must be a string.' }
  }

  if (typeof payload.completed !== 'boolean') {
    return { error: 'Task completed state must be a boolean.' }
  }

  return {
    data: {
      title: payload.title.trim(),
      description: payload.description.trim(),
      completed: payload.completed,
    },
  }
}

tasksRouter.get('/', async (_req, res) => {
  res.json(await listTasks())
})

tasksRouter.get('/:id', async (req, res) => {
  const taskId = parseTaskId(req.params.id)

  if (taskId === null) {
    res.status(400).json({ message: 'Task id must be a positive integer.' })
    return
  }

  const task = await getTaskById(taskId)

  if (!task) {
    res.status(404).json({ message: 'Task not found.' })
    return
  }

  res.json(task)
})

tasksRouter.post('/', async (req, res) => {
  const parsedInput = parseTaskInput(req.body)

  if (parsedInput.error || !parsedInput.data) {
    res.status(400).json({ message: parsedInput.error ?? 'Invalid task payload.' })
    return
  }

  const task = await createTask(parsedInput.data)
  res.status(201).json(task)
})

tasksRouter.put('/:id', async (req, res) => {
  const taskId = parseTaskId(req.params.id)

  if (taskId === null) {
    res.status(400).json({ message: 'Task id must be a positive integer.' })
    return
  }

  const parsedInput = parseTaskInput(req.body)

  if (parsedInput.error || !parsedInput.data) {
    res.status(400).json({ message: parsedInput.error ?? 'Invalid task payload.' })
    return
  }

  const task = await updateTask(taskId, parsedInput.data)

  if (!task) {
    res.status(404).json({ message: 'Task not found.' })
    return
  }

  res.json(task)
})

tasksRouter.delete('/:id', async (req, res) => {
  const taskId = parseTaskId(req.params.id)

  if (taskId === null) {
    res.status(400).json({ message: 'Task id must be a positive integer.' })
    return
  }

  const deleted = await deleteTask(taskId)

  if (!deleted) {
    res.status(404).json({ message: 'Task not found.' })
    return
  }

  res.json({ deleted: true })
})

export default tasksRouter
