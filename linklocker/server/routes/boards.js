import express from 'express'

const router = express.Router()

const boards = [
  { id: 'b1', name: 'UI Inspiration', description: 'Design and UX links', isPublic: true, linkCount: 18 },
  { id: 'b2', name: 'Learning', description: 'Courses and docs', isPublic: false, linkCount: 42 },
]

router.get('/', (_req, res) => {
  res.json(boards)
})

export default router
