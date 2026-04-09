import express from 'express'
import { fetchMetadata } from '../utils/fetchMetadata.js'

const router = express.Router()

router.post('/', async (req, res) => {
  const { url } = req.body
  if (!url) {
    return res.status(400).json({ message: 'url is required' })
  }

  const metadata = await fetchMetadata(url)
  return res.json(metadata)
})

export default router
