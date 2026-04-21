import database, { initializeDatabase } from '../lib/database.js'

export type TaskRecord = {
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

type TaskRow = {
  id: number
  title: string
  description: string
  completed: number
  createdAt: string
  updatedAt: string
}

function mapTask(row: TaskRow): TaskRecord {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    completed: row.completed === 1,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  }
}

export async function listTasks(): Promise<TaskRecord[]> {
  await initializeDatabase()

  const rows = database
    .prepare(
      `
      SELECT
        id,
        title,
        description,
        completed,
        created_at AS createdAt,
        updated_at AS updatedAt
      FROM tasks
      ORDER BY id DESC
    `,
    )
    .all() as TaskRow[]

  return rows.map(mapTask)
}

export async function getTaskById(id: number): Promise<TaskRecord | undefined> {
  await initializeDatabase()

  const row = database
    .prepare(
      `
        SELECT
          id,
          title,
          description,
          completed,
          created_at AS createdAt,
          updated_at AS updatedAt
        FROM tasks
        WHERE id = ?
      `,
    )
    .get(id) as TaskRow | undefined

  return row ? mapTask(row) : undefined
}

export async function createTask(input: TaskInput): Promise<TaskRecord> {
  await initializeDatabase()

  const result = database
    .prepare('INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)')
    .run(input.title, input.description, input.completed ? 1 : 0)

  const taskId = Number(result.lastInsertRowid)
  const task = await getTaskById(taskId)

  if (!task) {
    throw new Error('Failed to load created task.')
  }

  return task
}

export async function updateTask(id: number, input: TaskInput): Promise<TaskRecord | undefined> {
  await initializeDatabase()

  const result = database
    .prepare(
      `
        UPDATE tasks
        SET title = ?, description = ?, completed = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `,
    )
    .run(input.title, input.description, input.completed ? 1 : 0, id)

  if (Number(result.changes) === 0) {
    return undefined
  }

  return getTaskById(id)
}

export async function deleteTask(id: number): Promise<boolean> {
  await initializeDatabase()

  const result = database.prepare('DELETE FROM tasks WHERE id = ?').run(id)

  return Number(result.changes) > 0
}
