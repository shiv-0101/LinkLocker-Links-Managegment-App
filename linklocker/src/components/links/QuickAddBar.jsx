import { useState } from 'react'

function QuickAddBar({ boards, onSave }) {
  const [form, setForm] = useState({
    title: '',
    url: '',
    boardId: boards[0]?.id ?? '',
  })

  function handleSubmit(event) {
    event.preventDefault()
    if (!form.url.trim()) {
      return
    }
    onSave(form)
    setForm((prev) => ({ ...prev, title: '', url: '' }))
  }

  return (
    <form className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-900">Quick Add</h2>
        <p className="text-sm text-slate-600">Paste a link, choose a board, and save it instantly.</p>
      </div>
      <div className="mt-6 grid gap-3 lg:grid-cols-[1.2fr_1fr_0.8fr]">
        <input
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          placeholder="Paste URL"
          value={form.url}
          onChange={(event) => setForm((prev) => ({ ...prev, url: event.target.value }))}
        />
        <input
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          placeholder="Title (optional)"
          value={form.title}
          onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
        />
        <select
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          value={form.boardId}
          onChange={(event) => setForm((prev) => ({ ...prev, boardId: event.target.value }))}
        >
          {boards.map((board) => (
            <option key={board.id} value={board.id}>
              {board.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          className="inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          Save Link
        </button>
      </div>
    </form>
  )
}

export default QuickAddBar
