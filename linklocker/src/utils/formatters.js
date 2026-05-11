export function formatDomain(url) {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return 'invalid-url'
  }
}

export function formatDate(value) {
  return new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function formatTime(value) {
  return new Date(value).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
