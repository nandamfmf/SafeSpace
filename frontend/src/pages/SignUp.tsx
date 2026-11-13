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
    <div>
        <form onSubmit={handleSubmit} className="flex flex-col min-h-screen align-center items-center justify-center gap-8">
            <h1 className="text-xl text-center font-bold mt-8">Sign Up</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Full name" 
                    className={`border shadow-sm placeholder:text-[var(--text)] rounded-lg p-4 w-[380px] max-w-[calc(100vw-110px)] ${
                        error ? "border-red-500" : "border-gray-300"
                    }`} 
            />

            <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                    className={`border shadow-sm placeholder:text-[var(--text)] rounded-lg p-4 w-[380px] max-w-[calc(100vw-110px)] ${
                        error ? "border-red-500" : "border-gray-300"
                    }`} 
            />
    
            <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="New password" 
                    className={`border shadow-sm placeholder:text-[var(--text)] rounded-lg p-4 w-[380px] max-w-[calc(100vw-110px)] ${
                        error ? "border-red-500" : "border-gray-300"
                    }`} 
                />
    
            <input 
                    type="password" 
                    value={confirm_password} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    placeholder="Confirm password" 
                    className={`border shadow-sm placeholder:text-[var(--text)] rounded-lg p-4 w-[380px] max-w-[calc(100vw-110px)] ${
                        error ? "border-red-500" : "border-gray-300"
                    }`} 
            />

            <button disabled={isLoading} type="submit" className="border border-blue-300 rounded-lg w-[230px] p-4 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50">{isLoading ? "Loading..." : "Sign Up"}</button>
        </form>
    </div>
  )
}

export default SignUp