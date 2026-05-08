import { Link } from 'react-router-dom'
import BoardGrid from '../components/boards/BoardGrid'
import { useBoards } from '../hooks/useBoards'

function LandingPage() {
  const { publicBoards } = useBoards()

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <span className="inline-flex w-fit rounded-full border border-slate-200 bg-white px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-500">
          LinkLocker
        </span>
        <div className="space-y-3">
          <h1 className="max-w-2xl text-4xl font-medium tracking-tight text-slate-900 sm:text-5xl">Never lose useful links again.</h1>
          <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            Save a link fast, keep boards simple, and rediscover what matters without clutter.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/dashboard"
            className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
          >
            Start Saving
          </Link>
          <Link
            to="/discover"
            className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Browse Discover
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-medium text-slate-900">Featured Public Boards</h2>
            <p className="mt-1 text-sm text-slate-600">A small set of public collections to explore.</p>
          </div>
          <span className="hidden text-sm text-slate-500 sm:block">Public collections</span>
        </div>
        <BoardGrid boards={publicBoards} />
      </section>
    </div>
  )
}

export default LandingPage
