import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
type Conversation = {
  id: number;
  message: string;
  response: string;
  created_at: string;
};

const Historico = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/conversations`, { credentials: "include" })
      .then(async (result) => {
        const data = await result.json();
        if (!result.ok) {
          throw new Error(data.error || "Could not load conversation history.");
        }
        setConversations(data.conversations);
      })
      .catch((requestError: unknown) => {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Could not load conversation history.",
        );
      });
  }, []);

  return (
    <main className="min-h-screen w-full bg-[var(--background)] px-4 py-10 text-[var(--text)]">
      <h1 className="mb-8 text-center text-2xl font-bold">Conversation history</h1>

      {error && <p className="text-center text-red-600">{error}</p>}

      {!error && conversations.length === 0 && (
        <p className="text-center text-gray-400">No successful conversations yet.</p>
      )}

      <section className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        {conversations.map((conversation) => (
          <article
            key={conversation.id}
            className="rounded-lg border border-gray-300 p-5 shadow-sm"
          >
            <time className="text-sm text-gray-500">
              {new Date(conversation.created_at).toLocaleString()}
            </time>
            <p className="mt-3 font-semibold">{conversation.message}</p>
            <p className="mt-2 whitespace-pre-wrap">{conversation.response}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Historico