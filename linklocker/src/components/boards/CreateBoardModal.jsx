import { useEffect, useState } from 'react'

function CreateBoardModal({ open, onClose, onCreate, isSaving }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    isPublic: false,
  })

  useEffect(() => {
    if (!open) {
      setForm({ name: '', description: '', isPublic: false })
    }
  }, [open])

  async function handleSubmit(event) {
    event.preventDefault()
    if (!form.name.trim()) {
      return
    }

    await onCreate({
      name: form.name.trim(),
      description: form.description.trim(),
      isPublic: form.isPublic,
    })
  }

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-slate-900/40 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <form className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl" onSubmit={handleSubmit}>
        <h3 className="text-xl font-semibold text-slate-900">Create Board</h3>
        <div className="mt-4 space-y-3">
          <input
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            placeholder="Board name"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          />
          <textarea
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            placeholder="Description"
            rows="3"
            value={form.description}
            onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
          />
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={form.isPublic}
            onChange={(event) => setForm((prev) => ({ ...prev, isPublic: event.target.checked }))}
          />
          Make public
        </label>
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50" onClick={onClose}>
            Close
          </button>
          <button type="submit" className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60" disabled={isSaving || !form.name.trim()}>
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateBoardModal
