export async function downloadEventReport(url: string): Promise<Blob> {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("access")}`,
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao baixar relatório");
  }
  
  return await res.blob();
}