import {useState, useEffect, type FormEvent} from 'react'

const API_URL = import.meta.env.VITE_API_URL;

type User = {
  id: number;
  name: string;
  email: string;
}

const Resultado = () => {

  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const trimmedMessage = message.trim();
    if (!trimmedMessage || isLoading) return;

    setIsLoading(true);
    setMessage("");

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 120000);

    try {
      const result = await fetch(`${API_URL}/api/gemini`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ message: trimmedMessage}),
        credentials: "include",
        signal: controller.signal,
      })

      clearTimeout(timeoutId);

      const contentType = result.headers.get("content-type") || "";
      const data = contentType.includes("application/json") ? await result.json() : null;

      if(!result.ok){
        throw new Error(data?.error || "Wasn't able to get a response from the AI.");
      }

      setMessages(prevMessages => [...prevMessages, trimmedMessage]);

      setResponses(prevResponses => [...prevResponses, data.response || "AI didn't return a response."]);

    } catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred.");
    } finally {
      window.clearTimeout(timeoutId);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function loadUser() {
      try{
        const user = await fetch(`${API_URL}/api/me`, {
        method: "GET",
        credentials: "include",
      });
    
      const result = await user.json();
      const data = result.user;
      setUser(data);

    }
    catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred.");
    }

    }
    
    loadUser();

    const startsNewSession = new URLSearchParams(window.location.search).get("new") === "1";
    fetch(
      `${API_URL}/api/sessions/${startsNewSession ? "new" : "current"}`,
      { method: "POST", credentials: "include" },
    ).catch(() => undefined);

    }, []);

  return (
    <main className="relative min-h-dvh w-full overflow-hidden bg-[var(--page-bg)] text-[var(--page-text)] transition-colors duration-300">
      <header className="fixed inset-x-0 top-0 z-30 backdrop-blur-xl">
        <div className="flex h-16 w-full max-w-[1440px] items-center justify-end ml-auto px-5 sm:h-20 sm:px-8 lg:px-14">
          <a
            href="/"
            className="hidden text-xl text-[black] font-black tracking-[-0.04em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6d5dfc]"
          >
            Safe<span className="text-[#6d5dfc]">Space.</span>
          </a>

          {user && (
            <div className="flex items-center gap-3">
              <a
                href="/historico"
                className="hidden text-black] rounded-full border border-[#171713]/15 px-4 py-2 text-sm bg-[var(--muted)] font-bold transition-colors duration-200 hover:border-[#6d5dfc] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6d5dfc] sm:inline-flex"
              >
                History
              </a>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--muted)]  text-sm font-bold uppercase text-[black]" aria-label={user.name}>
                {user.name.trim().charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="mx-auto flex min-h-dvh w-full max-w-[960px] flex-col px-4 pb-36 pt-24 sm:px-8 sm:pb-40 sm:pt-28 lg:px-14">
        <section className="mb-8 border-b border-[#171713]/10 pb-7">
          {user ? (
            <>
              <h1 className="mt-3 max-w-[720px] text-3xl font-black leading-[1.05] tracking-[-0.04em] sm:text-5xl">
                Hi, {user.name}. How are you feeling today?
              </h1>
            </>
          ) : (
            <div className="h-20 animate-pulse rounded-2xl bg-[#171713]/[0.06]" />
          )}
        </section>

        {error && (
          <p role="alert" className="mb-5 rounded-xl border border-[#b42318]/15 bg-[#fff1ee] px-4 py-3 text-sm font-semibold text-[#a33a2f]">
            {error}
          </p>
        )}

        {messages.length === 0 ? (
          <section className="flex flex-1 items-center justify-center py-12 text-center">
            <div className="max-w-md">
              <div className="mx-auto mb-6 h-16 w-16 rounded-full border-[14px] border-[#c9ff62] shadow-[0_18px_50px_rgba(201,255,98,0.35)]" aria-hidden="true" />
              <h2 className="text-2xl font-bold tracking-[-0.03em]">A safe place to start</h2>
              <p className="mt-3 leading-7 text-[#68685f]">
                Share what's on your mind. You don't need to find the perfect words.
              </p>
            </div>
          </section>
        ) : (
          <section className="flex flex-col gap-8 pb-6" aria-label="Conversation">
            {messages.map((item, index) => (
              <article key={index} className="grid gap-4">
                <div className="flex justify-end">
                  <div className="max-w-[82%] rounded-[1.25rem] rounded-br-md bg-[#171713] px-5 py-4 text-[#f4f0e8] shadow-[0_10px_30px_rgba(23,23,19,0.10)] sm:max-w-[70%]">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#c9ff62]">You</p>
                    <p className="mt-2 whitespace-pre-wrap leading-7">{item}</p>
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="max-w-[92%] rounded-[1.25rem] rounded-bl-md border border-[#171713]/10 bg-[#fffdf7] px-5 py-5 shadow-[0_10px_30px_rgba(23,23,19,0.07)] sm:max-w-[82%]">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6d5dfc]">SafeSpace</p>
                    <div className="response-panel mt-3 text-[15px] leading-7 text-[#4f4f46]">
                      {responses[index]}
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {isLoading && (
              <div className="flex justify-start" aria-label="SafeSpace is responding">
                <div className="flex items-center gap-2 rounded-full border border-[#171713]/10 bg-[#fffdf7] px-5 py-4">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#6d5dfc]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#6d5dfc] [animation-delay:120ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#6d5dfc] [animation-delay:240ms]" />
                </div>
              </div>
            )}
          </section>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[#171713]/10  px-4 py-4 backdrop-blur-xl sm:px-8 sm:py-5">
        <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-[960px] items-end gap-3">
          <label className="sr-only" htmlFor="chat-message">Your message</label>
          <textarea
            id="chat-message"
            rows={1}
            value={message}
            placeholder="Share what is on your mind..."
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault()
                if (message.trim() && !isLoading) {
                  e.currentTarget.form?.requestSubmit()
                }
              }
            }}
            className="min-h-14 max-h-32 flex-1 resize-none rounded-2xl border border-[#171713]/15 bg-[#fffdf7] px-5 py-4 text-base leading-6 text-[#171713] shadow-[0_10px_30px_rgba(23,23,19,0.06)] outline-none transition duration-200 placeholder:text-[#96958d] focus:border-[#6d5dfc] focus:ring-4 focus:ring-[#6d5dfc]/10"
          />
          <button
            type="submit"
            disabled={isLoading || !message.trim()}
            className="h-14 shrink-0 cursor-pointer rounded-2xl bg-[#171713] px-5 text-sm font-bold text-[#f4f0e8] transition duration-200 hover:-translate-y-0.5 hover:bg-[#6d5dfc] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6d5dfc] sm:px-7"
          >
            {isLoading ? "Sending" : "Send"}
          </button>
        </form>
      </div>
    </main>
  )
}

export default Resultado