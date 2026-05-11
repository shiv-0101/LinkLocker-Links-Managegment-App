function isValidUrl(url) {
  try {
    return Boolean(new URL(url))
  } catch {
    return false
  }
}

export async function metadataFetcher(url) {
  return {
    title: url,
    description: 'Metadata fallback. Wire this with server/metadata route.',
    image: '',
    favicon: '',
  }
}
