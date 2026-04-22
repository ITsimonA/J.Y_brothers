import { Router } from 'express'

import { authenticateUser, createUser } from '../repositories/userRepository.js'
import type { LoginInput, SignupInput } from '../repositories/userRepository.js'

const authRouter = Router()

function parseSignupInput(body: unknown): { error?: string; data?: SignupInput } {
  if (typeof body !== 'object' || body === null) {
    return { error: 'Request body must be a JSON object.' }
  }

  const payload = body as Record<string, unknown>

  if (typeof payload.fullName !== 'string' || payload.fullName.trim().length === 0) {
    return { error: 'Full name is required.' }
  }

  if (typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    return { error: 'Email is required.' }
  }

  if (typeof payload.password !== 'string' || payload.password.length < 6) {
    return { error: 'Password must be at least 6 characters long.' }
  }

  return {
    data: {
      fullName: payload.fullName.trim(),
      email: payload.email.trim(),
      password: payload.password,
    },
  }
}

function parseLoginInput(body: unknown): { error?: string; data?: LoginInput } {
  if (typeof body !== 'object' || body === null) {
    return { error: 'Request body must be a JSON object.' }
  }

  const payload = body as Record<string, unknown>

  if (typeof payload.identifier !== 'string' || payload.identifier.trim().length === 0) {
    return { error: 'Email or username is required.' }
  }

  if (typeof payload.password !== 'string' || payload.password.length === 0) {
    return { error: 'Password is required.' }
  }

  return {
    data: {
      identifier: payload.identifier.trim(),
      password: payload.password,
    },
  }
}

authRouter.post('/signup', async (req, res) => {
  const parsedInput = parseSignupInput(req.body)

  if (parsedInput.error || !parsedInput.data) {
    res.status(400).json({ message: parsedInput.error ?? 'Invalid signup payload.' })
    return
  }

  try {
    const user = await createUser(parsedInput.data)
    res.status(201).json({ message: 'Account created successfully.', user })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create account.'

    if (message === 'Email is already registered.') {
      res.status(409).json({ message })
      return
    }

    throw error
  }
})

authRouter.post('/login', async (req, res) => {
  const parsedInput = parseLoginInput(req.body)

  if (parsedInput.error || !parsedInput.data) {
    res.status(400).json({ message: parsedInput.error ?? 'Invalid login payload.' })
    return
  }

  const user = await authenticateUser(parsedInput.data)

  if (!user) {
    res.status(401).json({ message: 'Invalid credentials.' })
    return
  }

  res.json({ message: 'Login successful.', user })
})

export default authRouter
