import { useMemo, useState } from 'react'

const seedLinks = [
  {
    id: 'l1',
    boardId: 'b1',
    userId: 'demo-user-1',
    title: 'Calm Product UI Patterns',
    url: 'https://example.com/calm-ui',
    createdAt: '2026-04-01',
  },
  {
    id: 'l2',
    boardId: 'b1',
    userId: 'demo-user-2',
    title: 'Responsive Grid Guide',
    url: 'https://example.com/responsive-grid',
    createdAt: '2026-04-03',
  },
  {
    id: 'l3',
    boardId: 'b2',
    userId: 'demo-user-1',
    title: 'React Router Fundamentals',
    url: 'https://example.com/router',
    createdAt: '2026-04-05',
  },
]

export function useLinks(boardId) {
  const [links, setLinks] = useState(seedLinks)

  const boardLinks = useMemo(() => {
    if (!boardId) {
      return links
    }
    return links.filter((link) => link.boardId === boardId)
  }, [boardId, links])

  function addLink(payload) {
    const nextLink = {
      id: `l${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...payload,
    }
    setLinks((prev) => [nextLink, ...prev])
  }

  return {
    links: boardLinks,
    addLink,
  }
}
