const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export async function apiGet(path) {
  const response = await fetch(`${baseUrl}${path}`)
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
  return response.json()
}
