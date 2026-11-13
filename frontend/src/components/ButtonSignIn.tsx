import { Link } from "react-router-dom";

function ButtonSignIn() {
  return (
    <div className="bg-[var(--primary)] absolute top-5 right-5 text-[var(--text)] flex items-center justify-center text-center align-middle w-38 h-12 rounded-lg font-sans font-bold sm:w-50 sm:h-12">
        <Link to="/signin" className="cursor-pointer">Sign In</Link>
    </div>
  )
}

export default ButtonSignIn