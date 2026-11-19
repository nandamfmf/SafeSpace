import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const SignIn = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!email || !password) {
            setError("Please fill correctly all fields.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/signin`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (!response.ok) {
                setError(data.error || data.message || "Could not log in the account.");
                return;
            }

            navigate("/resultado");
        } catch (error) {
            setError(error instanceof Error ? error.message : "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-[var(--page-bg)] px-5 py-8 text-[var(--page-text)] transition-colors duration-300 sm:px-8 sm:py-12">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full border-[48px] border-[#171713]/[0.04]" aria-hidden="true" />
            <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-[#c9ff62]/40 blur-3xl" aria-hidden="true" />

            <div className="relative mx-auto flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center max-w-6xl sm:min-h-[calc(100vh-6rem)]">
                <section className="flex flex-col justify-center gridoverflow-hidden rounded-[2rem] border border-[#171713]/10 bg-[#fffdf7] shadow-[0_24px_80px_rgba(23,23,19,0.10)] ">

                    <div className="flex min-h-[620px] flex-col justify-center px-6 py-10 sm:px-12 lg:px-16">
                        <a href="/" className="mb-10 text-center text-[black] text-xl font-black tracking-[-0.04em]">
                            Safe<span className="text-[#6d5dfc]">Space.</span>
                        </a>

                        <div className="mx-auto w-full max-w-[430px]">
                            <div>
                                <h1 className="text-4xl font-black leading-tight tracking-[-0.04em] text-bold text-[black] text-center mb-4 sm:text-5xl">Sign in</h1>
                            </div>

                            <form onSubmit={handleSubmit} className="mt-9 flex flex-col gap-5">
                                {error && (
                                    <p role="alert" className="rounded-xl border border-[#b42318]/15 bg-[#fff1ee] px-4 py-3 text-sm font-semibold text-[#a33a2f]">
                                        {error}
                                    </p>
                                )}

                                <label className="flex flex-col gap-2 text-sm font-bold text-[black]">
                                    Email
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="user@example.com"
                                        autoComplete="email"
                                        className={`h-14 w-full rounded-xl border bg-white px-4 text-base font-normal outline-none transition duration-200 placeholder:text-[#96958d] focus:border-[#6d5dfc] focus:ring-4 focus:ring-[#6d5dfc]/10 ${error ? "border-[#b42318]/50" : "border-[#171713]/15"}`}
                                    />
                                </label>

                                <label className="flex flex-col gap-2 text-sm font-bold text-[black]">
                                    Password
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Your password"
                                        autoComplete="current-password"
                                        className={`h-14 w-full rounded-xl border bg-white px-4 text-base font-normal outline-none transition duration-200 placeholder:text-[#96958d] focus:border-[#6d5dfc] focus:ring-4 focus:ring-[#6d5dfc]/10 ${error ? "border-[#b42318]/50" : "border-[#171713]/15"}`}
                                    />
                                </label>

                                <button
                                    disabled={isLoading}
                                    type="submit"
                                    className="mt-2 h-14 w-full cursor-pointer rounded-full bg-[#171713] px-6 text-base font-bold text-[#f4f0e8] transition duration-200 hover:-translate-y-0.5 hover:bg-[#6d5dfc] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6d5dfc]"
                                >
                                    {isLoading ? "Signing in..." : "Sign in"}
                                </button>

                                <p className="text-center text-sm text-[#68685f]">
                                    Don't have an account?{" "}
                                    <a href="/signup" className="font-bold text-[#171713] underline decoration-[#6d5dfc] decoration-2 underline-offset-4 transition-colors hover:text-[#6d5dfc]">
                                        Create one
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default SignIn;
