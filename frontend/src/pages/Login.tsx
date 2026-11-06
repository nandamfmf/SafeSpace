import { useState, type FormEvent } from "react"

const Login = () => {

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
            return;
        }

        if (password !== confirm_password) {
            setError("Passwords do not match.");
            return;
        }

    try{
        const response = await fetch ("http://localhost:5000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.message || "An error occurred during login.");
        }

        if(response.ok){
            window.location.href = "/resultado";
        }
    }

    catch (error) {
        setError("An error occurred during login.");
    }

    finally {
        setIsLoading(false);
    }
  }

  return (
    <div>
        <form onSubmit={handleSubmit} className="flex flex-col min-h-screen align-center items-center justify-center gap-8">
            <h1 className="text-xl text-center font-bold mt-8">Sign Up</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {!error && <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="border shadow-sm placeholder:text-[var(--text)] border-gray-300 rounded-lg p-4 w-[380px] max-w-[calc(100vw-110px)]" />}
            {error && <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="border shadow-sm placeholder:text-[var(--text)] border-red-500 rounded-lg p-4 w-[380px] max-w-[calc(100vw-110px)]" />}
            {!error && <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border shadow-sm placeholder:text-[var(--text)] border-gray-300 rounded-lg p-4 w-[380px] max-w-[calc(100vw-110px)]" />}
            {error && <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border shadow-sm placeholder:text-[var(--text)] border-red-500 rounded-lg p-4 w-[380px] max-w-[calc(100vw-110px)]" />}
            {!error && <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" className="border shadow-sm placeholder:text-[var(--text)] border-gray-300 rounded-lg p-4 w-[380px] max-w-[calc(100vw-110px)]"/>}
            {error && <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" className="border shadow-sm placeholder:text-[var(--text)] border-red-500 rounded-lg p-4 w-[380px] max-w-[calc(100vw-110px)]"/>}
            {!error && <input type="text" value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" className="border shadow-sm placeholder:text-[var(--text)] border-gray-300 rounded-lg p-4 w-[380px] max-w-[calc(100vw-110px)]" />}
            {error && <input type="text" value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" className="border shadow-sm placeholder:text-[var(--text)] border-red-500 rounded-lg p-4 w-[380px] max-w-[calc(100vw-110px)]" />}      


            <button type="submit" className="border border-blue-300 rounded-lg w-[230px] p-4 cursor-pointer">Login</button>
            {isLoading && <button disabled type="submit" className="border border-blue-300 rounded-lg w-[230px] p-4">Loading...</button>}
        </form>
    </div>
  )
}

export default Login