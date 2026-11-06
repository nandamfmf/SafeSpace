import { GoogleGenAI } from "@google/genai";

export async function enviarMensagem(mensagem : string): Promise<string | undefined> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('Configure VITE_GEMINI_API_KEY no arquivo .env.local.');
  }

  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: mensagem,
  });

  return response.text;
}