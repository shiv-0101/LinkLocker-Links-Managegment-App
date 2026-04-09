import { useMemo, useState } from 'react'

const seedBoards = [
  { id: 'b1', name: 'UI Inspiration', description: 'Design and UX links', isPublic: true, linkCount: 18 },
  { id: 'b2', name: 'Learning', description: 'Courses and docs', isPublic: false, linkCount: 42 },
  { id: 'b3', name: 'Startup Research', description: 'Market and GTM references', isPublic: false, linkCount: 9 },
]

export function useBoards() {
  const [boards, setBoards] = useState(seedBoards)

  const publicBoards = useMemo(() => boards.filter((board) => board.isPublic), [boards])

  function createBoard(payload) {
    const nextBoard = {
      id: `b${Date.now()}`,
      linkCount: 0,
      ...payload,
    }
    setBoards((prev) => [nextBoard, ...prev])
  }

  return {
    boards,
    publicBoards,
    createBoard,
  }
}
