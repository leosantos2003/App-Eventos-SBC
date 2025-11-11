export async function executeRequest<T>(path: string, init?: RequestInit): Promise<T> {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    const res = await fetch(path, {
    // credentials: "include",
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
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
