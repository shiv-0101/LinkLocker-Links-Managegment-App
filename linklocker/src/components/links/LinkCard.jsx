import { formatDate, formatDomain } from '../../utils/formatters'

function LinkCard({ link }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="aspect-[16/9] rounded-xl border border-slate-200 bg-slate-100" />
      <div className="mt-4 space-y-3">
        <h3 className="text-lg font-semibold leading-7 text-slate-900">{link.title}</h3>
        <div className="space-y-1 text-sm text-slate-500">
          <p>{formatDomain(link.url)}</p>
          <p>Saved on {formatDate(link.createdAt)}</p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <a
          className="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          href={link.url}
          target="_blank"
          rel="noreferrer"
        >
          Open
        </a>
        <button
          type="button"
          className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Edit
        </button>
      </div>
    </article>
  )
}

export default LinkCard
