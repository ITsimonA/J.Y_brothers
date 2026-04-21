import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { DatabaseSync } from 'node:sqlite'

const moduleDirectory = dirname(fileURLToPath(import.meta.url))
const dataDirectory = join(moduleDirectory, '../../data')
const databasePath = join(dataDirectory, 'j-y-brothers.sqlite')

mkdirSync(dataDirectory, { recursive: true })

const database = new DatabaseSync(databasePath)

let initialization = false

export async function initializeDatabase(): Promise<void> {
  if (initialization) {
    return
  }

  database.exec('PRAGMA foreign_keys = ON;')
  database.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `)

  initialization = true
}

export default database
