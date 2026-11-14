const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function enviarMensagem(mensagem: string): Promise<string> {
  const response = await fetch(`${API_URL}/api/gemini`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: mensagem }),
  });

  const data = await response.json() as { response?: string; error?: string };

  if (!response.ok) {
    throw new Error(data.error || "Não foi possível obter uma resposta da IA.");
  }

  if (!data.response) {
    throw new Error("A IA não retornou uma resposta.");
  }

  return data.response;
}