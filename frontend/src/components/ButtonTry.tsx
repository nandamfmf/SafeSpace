import { Link } from "react-router-dom";

const ButtonTry = () => {
  return (
    <div>
        <Link
          to="/signup"
          className="inline-flex h-12 w-44 cursor-pointer items-center justify-center rounded-full bg-[#6d5dfc] px-6 font-bold text-white shadow-[0_10px_30px_rgba(109,93,252,0.22)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#5d4de8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6d5dfc]">
          Sign up
        </Link>
    </div>
  )
}

export default ButtonTry