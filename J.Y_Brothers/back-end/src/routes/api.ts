import { Router } from 'express'
import authRouter from './auth.js'
import tasksRouter from './tasks.js'

const apiRouter = Router()

apiRouter.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    uptime: Number(process.uptime().toFixed(2)),
    timestamp: new Date().toISOString(),
  })
})

apiRouter.get('/info', (_req, res) => {
  res.json({
    name: 'J.Y Brothers',
    environment: process.env.NODE_ENV ?? 'development',
    message: 'Front end is connected to the Node.js backend.',
  })
})

apiRouter.get('/message', (_req, res) => {
  res.json({
    message: 'Hello from the backend API.',
  })
})

apiRouter.use('/auth', authRouter)
apiRouter.use('/tasks', tasksRouter)

export default apiRouter
