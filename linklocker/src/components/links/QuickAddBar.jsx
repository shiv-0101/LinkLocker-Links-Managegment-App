import { useState } from 'react'

const CREATE_BOARD_VALUE = '__create_board__'

function QuickAddBar({ boards, onSave, onCreateBoard }) {
  const [form, setForm] = useState({
    title: '',
    url: '',
    sourceUrl: '',
    boardId: boards[0]?.id ?? '',
  })

  function handleSubmit(event) {
    event.preventDefault()
    if (!form.url.trim()) {
      return
    }
    onSave({ ...form, boardId: form.boardId || boards[0]?.id || '' })
    setForm((prev) => ({ ...prev, title: '', url: '', sourceUrl: '' }))
  }

  const selectedBoardId = form.boardId || boards[0]?.id || ''

  return (
    <form id="quick-add" className="rounded-xl border border-slate-200 bg-white p-4" onSubmit={handleSubmit}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-lg font-medium text-slate-900">Quick Add</h2>
          <p className="text-sm text-slate-500">Paste a URL, choose a board, save it.</p>
        </div>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Fast capture</p>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr_0.95fr_auto]">
        <input
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-slate-400"
          placeholder="Paste URL"
          value={form.url}
          onChange={(event) => setForm((prev) => ({ ...prev, url: event.target.value }))}
        />
        <input
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-slate-400"
          placeholder="Title (optional)"
          value={form.title}
          onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
        />
        <input
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-slate-400"
          placeholder="Source post link (optional)"
          value={form.sourceUrl}
          onChange={(event) => setForm((prev) => ({ ...prev, sourceUrl: event.target.value }))}
        />
        <select
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          value={selectedBoardId}
          onChange={(event) => {
            const value = event.target.value

            if (value === CREATE_BOARD_VALUE) {
              onCreateBoard?.()
              return
            }

            setForm((prev) => ({ ...prev, boardId: value }))
          }}
        >
          {boards.map((board) => (
            <option key={board.id} value={board.id}>
              {board.name}
            </option>
          ))}
          {onCreateBoard ? <option value={CREATE_BOARD_VALUE}>+ Create new board</option> : null}
        </select>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default QuickAddBar
