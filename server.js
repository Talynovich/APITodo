import express from 'express'

import { connectDB } from './db.js'
import tasksRouter from './routes/tasks.route.js'

await connectDB()

const app = express()
const port = 3000

app.use(express.json())

app.use('/tasks', tasksRouter)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
