import { Link } from 'react-router-dom'
import BoardGrid from '../components/boards/BoardGrid'
import { useBoards } from '../hooks/useBoards'

function LandingPage() {
  const { publicBoards } = useBoards()

  return (
    <div className="space-y-10">
      <section className="grid gap-8 border-b border-slate-200/70 pb-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
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
              className="rounded-lg border border-slate-900 bg-slate-900 px-5 py-2.5 text-sm font-medium text-white! transition-colors hover:bg-slate-800 hover:text-white!"
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
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Quick add</span>
            <span className="text-xs text-slate-500">1 step</span>
          </div>
          <div className="mt-4 space-y-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">Paste a URL...</div>
            <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">Internships</div>
            <div className="rounded-lg border border-slate-900 bg-slate-900 px-3 py-2 text-sm font-medium text-white">Save</div>
          </div>
          <div className="mt-5 border-t border-slate-200 pt-4">
            <p className="text-sm text-slate-600">Latest boards</p>
            <div className="mt-3 grid gap-2">
              {['Internships', 'Design Resources', 'Startup Research'].map((label) => (
                <div key={label} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
                  <span className="text-slate-800">{label}</span>
                  <span className="text-xs text-slate-500">10 links</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4 pt-2">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-medium text-slate-900">Featured Public Boards</h2>
            <p className="mt-1 text-sm text-slate-600">A small set of public collections to explore.</p>
          </div>
          <span className="hidden text-sm text-slate-500 sm:block">Public collections</span>
        </div>
        <BoardGrid boards={publicBoards} />
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-medium text-slate-900">Request a feature or report a bug</h2>
            <p className="mt-1 text-sm text-slate-600">Tell us what you need next or flag anything that feels off.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="mailto:shivendrathakur321@outlook.com?subject=Feature%20request"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
            >
              Request feature
            </Link>
            <Link
              to="mailto:shivendrathakur321@outlook.com?subject=Bug%20report"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Report bug
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
