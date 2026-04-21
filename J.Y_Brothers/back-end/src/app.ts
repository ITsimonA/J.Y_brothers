import cors from 'cors'
import express from 'express'
import apiRouter from './routes/api.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', apiRouter)

app.use((error: unknown, _req, res, _next) => {
  const message = error instanceof Error ? error.message : 'Unexpected server error.'

  console.error(error)
  res.status(500).json({ message })
})

export default app
