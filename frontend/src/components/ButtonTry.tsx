const ButtonTry = () => {
  return (
    <div>
        <button className="bg-[var(--primary)] cursor-pointer mt-10 text-[var(--text)] w-50 h-12 rounded-lg font-sans font-bold" onClick={() => window.location.href = '/signup'}>
            Sign up
        </button>
    </div>
  )
}

export default ButtonTry