import LinkCard from './LinkCard'

function LinkGrid({ links, currentUserId }) {
  if (!links.length) {
    return <p className="text-sm text-slate-500">No links in this board yet.</p>
  }

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} canEdit={link.userId === currentUserId} />
      ))}
    </section>
  )
}

export default LinkGrid
