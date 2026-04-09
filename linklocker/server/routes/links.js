import express from 'express'

const router = express.Router()

const links = [
  {
    id: 'l1',
    boardId: 'b1',
    title: 'Calm Product UI Patterns',
    url: 'https://example.com/calm-ui',
    createdAt: '2026-04-01',
  },
]

router.get('/', (_req, res) => {
  res.json(links)
})

export default router
