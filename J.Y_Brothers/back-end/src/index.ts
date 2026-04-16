import 'dotenv/config'

import app from './app.js'
import { initializeDatabase } from './lib/database.js'

const port = Number(process.env.PORT ?? 3000)

await initializeDatabase()

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`)
})
