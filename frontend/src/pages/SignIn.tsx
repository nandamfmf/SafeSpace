import { useState, type FormEvent } from "react"

const SignIn = () => {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e : FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!email || !password){
            setError("Please fill correctly all fields.");
            setIsLoading(false);
            return;
        }

    try{
        const response = await fetch ("http://localhost:5000/api/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.error || data.message || "Could not log in the account.");
        }

        if(response.ok){
            window.location.href = "/resultado";
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
    <div>
        <form onSubmit={handleSubmit} className="flex flex-col min-h-screen align-center items-center justify-center gap-8">
            <h1 className="text-xl text-center font-bold mt-8">Sign In</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {!error && <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border shadow-sm placeholder:text-[var(--text)] border-gray-300 rounded-lg p-4 w-[380px] max-w-[calc(100vw-110px)]" />}
            {error && <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border shadow-sm placeholder:text-[var(--text)] border-red-500 rounded-lg p-4 w-[380px] max-w-[calc(100vw-110px)]" />}
            {!error && <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" className="border shadow-sm placeholder:text-[var(--text)] border-gray-300 rounded-lg p-4 w-[380px] max-w-[calc(100vw-110px)]"/>}
            {error && <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" className="border shadow-sm placeholder:text-[var(--text)] border-red-500 rounded-lg p-4 w-[380px] max-w-[calc(100vw-110px)]"/>}


            <button disabled={isLoading} type="submit" className="border border-blue-300 rounded-lg w-[230px] p-4 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50">{isLoading ? "Loading..." : "Sign In"}</button>
        </form>
    </div>
  )
}

export default SignIn