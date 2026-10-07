const API_URL = "http://127.0.0.1:8000/api";

export async function getResources() {
  const response = await fetch(`${API_URL}/resources`);

  if (!response.ok) {
    throw new Error("Failed to fetch resources");
  }

  return await response.json();
}