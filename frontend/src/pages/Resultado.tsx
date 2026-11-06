import {useState, type FormEvent} from 'react'
import {enviarMensagem} from '../gemini'
import ReactMarkdown from 'react-markdown'

const Resultado = () => {

  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedMessage = message.trim();
    if (!trimmedMessage || isLoading) return;

    setIsLoading(true);
    setResponse("");

    try {
      const result = await enviarMensagem(trimmedMessage);
      setResponse(result || "A IA não retornou uma resposta.");
      setMessage("");
    } catch (error) {
      setResponse(error instanceof Error ? error.message : "Não foi possível obter uma resposta.");
    } finally {
      setIsLoading(false);
    }
  }


  return (

    <div className="min-h-screen flex flex-col justify-center items-center bg-[var(--background)] text-[var(--text)] px-4 py-24">
      <h1 className="absolute top-0 mt-10 text-2xl text-center font-bold mt-8">Hi! How are you feeling today?</h1>

      <form onSubmit={handleSubmit} className="absolute bottom-0 mb-10 flex gap-2">
        <input type="text" value={message} placeholder="Type your message here..." className="border border-gray-300 rounded-lg p-4 w-[380px] max-w-[calc(100vw-110px)]" onChange={(e) => setMessage(e.target.value)} />
        <button type="submit" disabled={isLoading || !message.trim()} className="cursor-pointer p-4 border border-gray-300 text-red-800 rounded-lg bg-white disabled:cursor-not-allowed disabled:opacity-50">
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>

      <article className="response-panel border border-gray-300 shadow-md rounded-lg p-6 text-[var(--text)] w-full max-w-3xl max-h-[calc(100vh-230px)] overflow-y-auto">
        { response ? (
          <ReactMarkdown>{response}</ReactMarkdown>
        ) : (
          <p className="text-gray-400">The AI's response will appear here.</p>
        )}
      </article>
    </div>
  )
}

export default Resultado