import { Link } from "react-router-dom";

const ButtonTry = () => {
  return (
    <div>
        <Link
          to="/signup"
          className="bg-[var(--primary)] cursor-pointer mt-10 text-[var(--text)] w-50 h-12 rounded-lg font-sans font-bold inline-flex items-center justify-center">
          Sign up
        </Link>
    </div>
  )
}

export default ButtonTry