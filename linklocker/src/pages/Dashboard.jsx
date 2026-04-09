import BoardGrid from '../components/boards/BoardGrid'
import QuickAddBar from '../components/links/QuickAddBar'
import { useAuth } from '../hooks/useAuth'
import { useBoards } from '../hooks/useBoards'
import { useLinks } from '../hooks/useLinks'

function Dashboard() {
  const { user } = useAuth()
  const { boards } = useBoards()
  const { addLink } = useLinks()

  function handleQuickAdd({ title, url, boardId }) {
    addLink({
      title: title || url,
      url,
      boardId,
      userId: user.id,
    })
  }

  return (
    <div className="space-y-8">
      <QuickAddBar boards={boards} onSave={handleQuickAdd} />
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">My Boards</h2>
          <p className="mt-1 text-sm text-slate-600">Keep boards structured and easy to scan.</p>
        </div>
        <BoardGrid boards={boards} />
      </section>
    </div>
  )
}

export default Dashboard
