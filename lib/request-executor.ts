export async function executeRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const token = localStorage.getItem("access");
  const res = await fetch(path, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...init,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.headers.get("content-type")?.includes("application/json")
    ? (await res.json())
    : ((await res.text()) as unknown as T);
}
