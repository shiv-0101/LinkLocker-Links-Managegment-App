import { Link } from 'react-router-dom'
import BoardGrid from '../components/boards/BoardGrid'
import { useBoards } from '../hooks/useBoards'

function LandingPage() {
  const { publicBoards } = useBoards()

  return (
    <div className="space-y-8">
      <section className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
        <div className="space-y-6">
          <span className="inline-flex w-fit rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
            Cross-platform Link Saver
          </span>
          <div className="space-y-4">
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Never lose a useful link from DMs again.
            </h1>
            <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Save links in seconds, organize them into boards, and discover curated public collections with a simple, professional interface.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/dashboard"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Start Saving
            </Link>
            <Link
              to="/discover"
              className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Browse Discover
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:self-center">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Save time</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">2 sec</p>
            <p className="mt-2 text-sm text-slate-600">Quickly capture a link before it gets buried.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Organize better</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Boards</p>
            <p className="mt-2 text-sm text-slate-600">Keep work, learning, and inspiration separate.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Featured Public Boards</h2>
            <p className="mt-1 text-sm text-slate-600">Curated boards that show the social discovery side of LinkLocker.</p>
          </div>
          <span className="hidden text-sm text-slate-500 sm:block">Public collections</span>
        </div>
        <BoardGrid boards={publicBoards} />
      </section>
    </div>
  )
}

export default LandingPage
