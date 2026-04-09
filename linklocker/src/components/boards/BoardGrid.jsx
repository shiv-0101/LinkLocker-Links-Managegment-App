import BoardCard from './BoardCard'

function BoardGrid({ boards }) {
  if (!boards.length) {
    return <p className="text-sm text-slate-500">No boards found.</p>
  }

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {boards.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </section>
  )
}

export default BoardGrid
