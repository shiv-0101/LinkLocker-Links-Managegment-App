import { Link } from 'react-router-dom'
import BoardGrid from '../components/boards/BoardGrid'
import { useBoards } from '../hooks/useBoards'

const workflowSteps = [
  { title: 'Capture', detail: 'Paste any link from a DM, comment, or group chat.' },
  { title: 'Organize', detail: 'Save it to the right board in one click.' },
  { title: 'Rediscover', detail: 'Find useful links later without endless scrolling.' },
]

const topicTags = ['Internships', 'Courses', 'Top AI Tools', 'Design', 'Startups', 'Productivity']

const faqItems = [
  {
    question: 'Do I need to install anything?',
    answer: 'No. LinkLocker works directly in your browser.',
  },
  {
    question: 'Can I keep my boards private?',
    answer: 'Yes. You can set boards as private or public anytime.',
  },
  {
    question: 'Can I use it only for study links?',
    answer: 'Yes. Many users keep separate boards for study, jobs, and tools.',
  },
]

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

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-slate-900">How It Works</h2>
          <p className="text-sm text-slate-600">Three simple steps to never lose important links again.</p>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {workflowSteps.map((step, index) => (
            <article key={step.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">Step {index + 1}</p>
              <h3 className="mt-2 text-base font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{step.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-sm font-semibold text-slate-700">Popular topics:</span>
          {topicTags.map((tag) => (
            <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Quick Answers</h2>
          <div className="mt-4 space-y-3">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold text-slate-900">{item.question}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Start now</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Build your personal link library</h2>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            Create your first board in under a minute and keep all your best resources in one clean place.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              to="/dashboard"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Open Dashboard
            </Link>
            <Link
              to="/discover"
              className="rounded-lg border border-blue-300 bg-white px-4 py-2 text-sm font-semibold text-blue-800 transition hover:bg-blue-100"
            >
              Explore Public Boards
            </Link>
          </div>
        </article>
      </section>
    </div>
  )
}

export default LandingPage
