import { useMemo, useState } from 'react'
import CopyLinkModal from '../components/discover/CopyLinkModal'
import DiscoverBoardCard from '../components/discover/DiscoverBoardCard'
import { useAuth } from '../hooks/useAuth'
import { useBoards } from '../hooks/useBoards'
import { useLinks } from '../hooks/useLinks'

function Discover() {
  const { user, isAuthenticated } = useAuth()
  const { publicBoards, ownedBoards, refresh: refreshBoards } = useBoards(user?.id)
  const [selectedBoard, setSelectedBoard] = useState(null)
  const { links: selectedBoardLinks, isLoading: sourceLinksLoading } = useLinks(selectedBoard?.id)
  const { addLink } = useLinks()
  const [isSaving, setIsSaving] = useState(false)
  const [copyMessage, setCopyMessage] = useState('')
  const [boardSearch, setBoardSearch] = useState('')

  const filteredBoards = useMemo(() => {
    const search = boardSearch.trim().toLowerCase()

    if (!search) {
      return publicBoards
    }

    return publicBoards.filter((board) => {
      const name = board.name?.toLowerCase() || ''
      const description = board.description?.toLowerCase() || ''
      return name.includes(search) || description.includes(search)
    })
  }, [boardSearch, publicBoards])

  async function handleCopyLink({ sourceLink, targetBoardId }) {
    if (!user?.id || !sourceLink || !targetBoardId) {
      return
    }

    setIsSaving(true)
    setCopyMessage('')

    try {
      await addLink({
        boardId: targetBoardId,
        userId: user.id,
        title: sourceLink.title,
        url: sourceLink.url,
        metadata: sourceLink.metadata || null,
        sourceType: 'discover-copy',
      })
      await refreshBoards()
      setCopyMessage('Link copied to your board.')
      setSelectedBoard(null)
    } catch (error) {
      setCopyMessage(error.message || 'Could not copy this link right now.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-5">
      <section className="space-y-2">
        <h1 className="text-2xl font-medium text-slate-900">Discover</h1>
        <p className="max-w-2xl text-sm leading-6 text-slate-600">
          Browse public boards and copy useful links into your own boards.
        </p>
        <input
          className="mt-3 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-slate-400"
          placeholder="Search public boards"
          value={boardSearch}
          onChange={(event) => setBoardSearch(event.target.value)}
        />
      </section>

      {copyMessage ? (
        <section className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
          {copyMessage}
        </section>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredBoards.map((board) => (
          <DiscoverBoardCard key={board.id} board={board} onCopy={setSelectedBoard} />
        ))}
      </section>

      <CopyLinkModal
        open={Boolean(selectedBoard)}
        board={selectedBoard}
        sourceLinks={selectedBoardLinks}
        sourceLinksLoading={sourceLinksLoading}
        targetBoards={ownedBoards}
        isAuthenticated={isAuthenticated}
        isSaving={isSaving}
        onSave={handleCopyLink}
        onClose={() => setSelectedBoard(null)}
      />
    </div>
  )
}

export default Discover
