const API_URL = "http://127.0.0.1:8000/api/cloud";

export async function getProviders() {
  const response = await fetch(`${API_URL}/providers`);

  if (!response.ok) {
    throw new Error("Failed to fetch cloud providers");
  }

  return await response.json();
}