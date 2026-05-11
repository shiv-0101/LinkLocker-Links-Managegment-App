const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// handle api response errors uniformly
function handleApiError(status) {
  throw new Error(`Request failed with status ${status}`)
}

export async function apiGet(path) {
  const response = await fetch(`${baseUrl}${path}`)
  if (!response.ok) {
    handleApiError(response.status)
  }
  return response.json()
}

export async function apiPost(path, body) {
  const response = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    handleApiError(response.status)
  }

  return response.json()
}
