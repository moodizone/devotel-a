const BASE_URL = "https://assignment.devotel.io";

export async function appFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(BASE_URL + url, {
    ...options,
    headers: {
      mode: "no-cors",
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  const data = await response.json();
  return data;
}
