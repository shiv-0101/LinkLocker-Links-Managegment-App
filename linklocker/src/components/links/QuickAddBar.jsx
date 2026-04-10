import { useEffect, useState } from 'react'

function QuickAddBar({ boards, onSave }) {
  const [form, setForm] = useState({
    title: '',
    url: '',
    sourceUrl: '',
    boardId: boards[0]?.id ?? '',
  })

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      boardId: prev.boardId || boards[0]?.id || '',
    }))
  }, [boards])

  function handleSubmit(event) {
    event.preventDefault()
    if (!form.url.trim()) {
      return
    }
    onSave(form)
    setForm((prev) => ({ ...prev, title: '', url: '', sourceUrl: '' }))
  }

  return (
    <form className="rounded-xl border border-slate-200 bg-white p-4" onSubmit={handleSubmit}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-base font-semibold text-slate-900">Quick Add</h2>
        <p className="text-xs text-slate-500">Paste and save in seconds</p>
      </div>

      <div className="mt-3 grid gap-2 lg:grid-cols-[1.2fr_1fr_1fr_0.9fr_auto]">
        <input
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          placeholder="Paste URL"
          value={form.url}
          onChange={(event) => setForm((prev) => ({ ...prev, url: event.target.value }))}
        />
        <input
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          placeholder="Title (optional)"
          value={form.title}
          onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
        />
        <input
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          placeholder="Source post link (optional)"
          value={form.sourceUrl}
          onChange={(event) => setForm((prev) => ({ ...prev, sourceUrl: event.target.value }))}
        />
        <select
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          value={form.boardId}
          onChange={(event) => setForm((prev) => ({ ...prev, boardId: event.target.value }))}
        >
          {boards.map((board) => (
            <option key={board.id} value={board.id}>
              {board.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Save Link
        </button>
      </div>
    </form>
  )
}

export default QuickAddBar
