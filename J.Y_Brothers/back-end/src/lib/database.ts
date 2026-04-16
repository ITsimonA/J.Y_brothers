import mysql from 'mysql2/promise'

const databaseName = process.env.DB_NAME ?? 'j_y_brothers'
const connectionOptions = {
  host: process.env.DB_HOST ?? '127.0.0.1',
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? '',
}

const bootstrapDatabase = mysql.createPool({
  ...connectionOptions,
  waitForConnections: true,
  connectionLimit: 1,
})

const database = mysql.createPool({
  ...connectionOptions,
  database: databaseName,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT ?? 10),
})

let initialization: Promise<void> | null = null

export async function initializeDatabase(): Promise<void> {
  if (!initialization) {
    initialization = (async () => {
      const bootstrapConnection = await bootstrapDatabase.getConnection()

      try {
        await bootstrapConnection.query('CREATE DATABASE IF NOT EXISTS ??', [databaseName])
      } finally {
        bootstrapConnection.release()
      }

      const connection = await database.getConnection()

      try {
        await connection.query(`
          CREATE TABLE IF NOT EXISTS tasks (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            completed TINYINT(1) NOT NULL DEFAULT 0,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          )
        `)
      } finally {
        connection.release()
      }
    })().catch((error) => {
      initialization = null
      throw error
    })
  }

  return initialization
}

export default database
