import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import boardsRouter from './routes/boards.js'
import linksRouter from './routes/links.js'
import metadataRouter from './routes/metadata.js'

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'linklocker-server' })
})

app.use('/api/boards', boardsRouter)
app.use('/api/links', linksRouter)
app.use('/api/metadata', metadataRouter)

app.listen(port, () => {
  console.log(`LinkLocker server running on http://localhost:${port}`)
})
