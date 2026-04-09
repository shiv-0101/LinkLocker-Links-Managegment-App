import { useState } from 'react'
import CopyLinkModal from '../components/discover/CopyLinkModal'
import DiscoverBoardCard from '../components/discover/DiscoverBoardCard'
import { useBoards } from '../hooks/useBoards'

function Discover() {
  const { publicBoards } = useBoards()
  const [selectedBoard, setSelectedBoard] = useState(null)

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

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {publicBoards.map((board) => (
          <DiscoverBoardCard key={board.id} board={board} onCopy={setSelectedBoard} />
        ))}
      </section>

      <CopyLinkModal
        open={Boolean(selectedBoard)}
        board={selectedBoard}
        onClose={() => setSelectedBoard(null)}
      />
    </div>
  )
}

export default Discover
