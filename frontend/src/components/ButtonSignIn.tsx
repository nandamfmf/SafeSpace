import React from 'react'

function ButtonSignIn() {
  return (
    <div className="bg-[var(--primary)] absolute top-5 right-5 text-[var(--text)] flex items-center justify-center text-center align-middle w-38 h-12 rounded-lg font-sans font-bold sm:w-50 sm:h-12">
        <button type="button" className="cursor-pointer" onClick={() => window.location.href = '/SignIn'}>Sign In</button>
    </div>
  )
}

export default ButtonSignIn