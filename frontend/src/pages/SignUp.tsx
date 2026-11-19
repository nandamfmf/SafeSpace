import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e : FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!name || !email || !password || !confirm_password){
            setError("Please fill correctly all fields.");
            setIsLoading(false);
            return;
        }

        if (password !== confirm_password) {
            setError("Passwords do not match.");
            setIsLoading(false);
            return;
        }

    try{
        const response = await fetch ("http://localhost:5000/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.error || data.message || "Could not create the account.");
        }

        if(response.ok){    
            navigate("/signin");
        }
    }

    catch (error) {
        setError(error instanceof Error ? error.message : "An unexpected error occurred.");
    }

    finally {
        setIsLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[var(--page-bg)] px-5 py-8 text-[var(--page-text)] transition-colors duration-300 sm:px-8 sm:py-12">
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full border-[48px] border-[#171713]/[0.04]" aria-hidden="true" />
      <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-[#c9ff62]/40 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center sm:min-h-[calc(100vh-6rem)]">
        <section className="grid w-full overflow-hidden rounded-[2rem] border bg-[#fffdf7]">

          <div className="flex min-h-[680px] flex-col justify-center px-6 py-10 sm:px-12 lg:px-16">
            <a href="/" className="mb-8 text-[black] text-xl tracking-[-0.04em] text-center font-black mt-4">
              Safe<span className="text-[#6d5dfc]">Space.</span>
            </a>

            <div className="mx-auto w-full max-w-[430px]">
              <div>
                <h1 className="text-4xl text-center font-tanker font-bold leading-tight tracking-[-0.04em] text-[black] sm:text-5xl">Create your account for free</h1>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
                {error && (
                  <p role="alert" className="rounded-xl border border-[#b42318]/15 bg-[#fff1ee] px-4 py-3 text-sm font-semibold text-[#a33a2f]">
                    {error}
                  </p>
                )}

                <label className="flex flex-col gap-2 text-sm font-bold text-[black]">
                  Full name
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    className={`h-14 w-full rounded-xl border bg-white px-4 text-base font-normal outline-none transition duration-200 placeholder:text-[#96958d] focus:border-[#6d5dfc] focus:ring-4 focus:ring-[#6d5dfc]/10 ${error ? "border-[#b42318]/50" : "border-[#171713]/15"}`}
                  />
                </label>

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

                <div className="grid gap-4 sm:grid-cols-2 text-[black]">
                  <label className="flex min-w-0 flex-col gap-2 text-sm font-bold">
                    Password
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="New password"
                      autoComplete="new-password"
                      className={`h-14 w-full rounded-xl border bg-white px-4 text-base font-normal outline-none transition duration-200 placeholder:text-[#96958d] focus:border-[#6d5dfc] focus:ring-4 focus:ring-[#6d5dfc]/10 ${error ? "border-[#b42318]/50" : "border-[#171713]/15"}`}
                    />
                  </label>

                  <label className="flex min-w-0 flex-col gap-2 text-sm font-bold text-[black]">
                    Confirm
                    <input
                      type="password"
                      value={confirm_password}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      className={`h-14 w-full rounded-xl border bg-white px-4 text-base font-normal outline-none transition duration-200 placeholder:text-[#96958d] focus:border-[#6d5dfc] focus:ring-4 focus:ring-[#6d5dfc]/10 ${error ? "border-[#b42318]/50" : "border-[#171713]/15"}`}
                    />
                  </label>
                </div>

                <button
                  disabled={isLoading}
                  type="submit"
                  className="mt-2 h-14 w-full cursor-pointer rounded-full bg-[#171713] px-6 text-base font-bold text-[#f4f0e8] transition duration-200 hover:-translate-y-0.5 hover:bg-[#6d5dfc] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6d5dfc]"
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </button>

                <p className="text-center text-sm text-[#68685f]">
                  Already have an account?{" "}
                  <a href="/signin" className="font-bold text-[#171713] underline decoration-[#6d5dfc] decoration-2 underline-offset-4 transition-colors hover:text-[#6d5dfc]">
                    Sign in
                  </a>
                </p>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default SignUp