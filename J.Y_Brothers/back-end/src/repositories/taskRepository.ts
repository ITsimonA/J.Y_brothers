import { type ResultSetHeader, type RowDataPacket } from 'mysql2'

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
} & RowDataPacket

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

  const [rows] = await database.query<TaskRow[]>(`
    SELECT
      id,
      title,
      description,
      completed,
      created_at AS createdAt,
      updated_at AS updatedAt
    FROM tasks
    ORDER BY id DESC
  `)

  return rows.map(mapTask)
}

export async function getTaskById(id: number): Promise<TaskRecord | undefined> {
  await initializeDatabase()

  const [rows] = await database.query<TaskRow[]>(
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
    [id],
  )

  const [row] = rows

  return row ? mapTask(row) : undefined
}

export async function createTask(input: TaskInput): Promise<TaskRecord> {
  await initializeDatabase()

  const [result] = await database.execute<ResultSetHeader>(
    'INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)',
    [input.title, input.description, input.completed ? 1 : 0],
  )

  const taskId = result.insertId
  const task = await getTaskById(taskId)

  if (!task) {
    throw new Error('Failed to load created task.')
  }

  return task
}

export async function updateTask(id: number, input: TaskInput): Promise<TaskRecord | undefined> {
  await initializeDatabase()

  const [result] = await database.execute<ResultSetHeader>(
    `
      UPDATE tasks
      SET title = ?, description = ?, completed = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `,
    [input.title, input.description, input.completed ? 1 : 0, id],
  )

  if (result.affectedRows === 0) {
    return undefined
  }

  return getTaskById(id)
}

export async function deleteTask(id: number): Promise<boolean> {
  await initializeDatabase()

  const [result] = await database.execute<ResultSetHeader>('DELETE FROM tasks WHERE id = ?', [id])

  return result.affectedRows > 0
}
