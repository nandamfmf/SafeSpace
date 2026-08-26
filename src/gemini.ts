import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function enviarMensagem(mensagem : string): Promise<string | undefined> {
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: mensagem,
  });

  return response.text;
}