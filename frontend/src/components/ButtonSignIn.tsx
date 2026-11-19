import { Link } from "react-router-dom";

function ButtonSignIn() {
  return (
    <div className="flex h-12 w-36 items-center justify-center rounded-full bg-[#171713] text-[#f4f0e8] absolute right-2 md:right-0 md:top-4 transition-transform duration-200 hover:-translate-y-0.5 sm:w-44">
      <Link
        to="/signin"
        className="flex h-full w-full items-center justify-center rounded-full font-bold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6d5dfc]"
      >
        Sign In
      </Link>
    </div>
  )
}

export default ButtonSignIn