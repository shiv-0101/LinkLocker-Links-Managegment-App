export async function fetchMetadata(url) {
  return {
    title: url,
    description: 'Server metadata fallback response',
    image: '',
    favicon: '',
  }
}
