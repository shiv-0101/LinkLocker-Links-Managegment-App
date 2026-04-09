import { useState } from 'react'
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
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Discover Public Boards</h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-600">
            Explore what others are saving, then copy useful links into your own boards.
          </p>
        </div>
      </section>

      {copyMessage ? (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 text-sm text-slate-700 shadow-sm">
          {copyMessage}
        </section>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {publicBoards.map((board) => (
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
