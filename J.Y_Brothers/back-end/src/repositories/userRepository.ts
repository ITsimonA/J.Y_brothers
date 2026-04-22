import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

import database, { initializeDatabase } from '../lib/database.js'

export type UserRecord = {
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

type UserRow = {
  id: number
  fullName: string
  email: string
  passwordHash: string
  createdAt: string
}

function mapUser(row: UserRow): UserRecord {
  return {
    id: row.id,
    fullName: row.fullName,
    email: row.email,
    createdAt: row.createdAt,
  }
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex')
  const derivedKey = scryptSync(password, salt, 64) as Buffer

  return `${salt}:${derivedKey.toString('hex')}`
}

function verifyPassword(password: string, passwordHash: string): boolean {
  const [salt, expectedHash] = passwordHash.split(':')

  if (!salt || !expectedHash) {
    return false
  }

  const actualHash = scryptSync(password, salt, 64) as Buffer
  const expectedBuffer = Buffer.from(expectedHash, 'hex')

  if (expectedBuffer.length !== actualHash.length) {
    return false
  }

  return timingSafeEqual(expectedBuffer, actualHash)
}

async function getUserRowByEmail(email: string): Promise<UserRow | undefined> {
  await initializeDatabase()

  return database
    .prepare(
      `
        SELECT
          id,
          full_name AS fullName,
          email,
          password_hash AS passwordHash,
          created_at AS createdAt
        FROM users
        WHERE LOWER(email) = LOWER(?)
      `,
    )
    .get(normalizeEmail(email)) as UserRow | undefined
}

async function getUserRowByIdentifier(identifier: string): Promise<UserRow | undefined> {
  await initializeDatabase()

  return database
    .prepare(
      `
        SELECT
          id,
          full_name AS fullName,
          email,
          password_hash AS passwordHash,
          created_at AS createdAt
        FROM users
        WHERE LOWER(email) = LOWER(?) OR LOWER(full_name) = LOWER(?)
        LIMIT 1
      `,
    )
    .get(identifier.trim(), identifier.trim()) as UserRow | undefined
}

export async function createUser(input: SignupInput): Promise<UserRecord> {
  await initializeDatabase()

  const existingUser = await getUserRowByEmail(input.email)

  if (existingUser) {
    throw new Error('Email is already registered.')
  }

  const result = database
    .prepare('INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)')
    .run(input.fullName.trim(), normalizeEmail(input.email), hashPassword(input.password))

  const userId = Number(result.lastInsertRowid)
  const user = database
    .prepare(
      `
        SELECT
          id,
          full_name AS fullName,
          email,
          created_at AS createdAt
        FROM users
        WHERE id = ?
      `,
    )
    .get(userId) as UserRecord | undefined

  if (!user) {
    throw new Error('Failed to load created user.')
  }

  return user
}

export async function authenticateUser(input: LoginInput): Promise<UserRecord | undefined> {
  await initializeDatabase()

  const userRow = await getUserRowByIdentifier(input.identifier)

  if (!userRow || !verifyPassword(input.password, userRow.passwordHash)) {
    return undefined
  }

  return mapUser(userRow)
}
