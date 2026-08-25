import React from 'react'

const ButtonTry = () => {
  return (
    <div>
        <button className="bg-[var(--primary)] cursor-pointer text-[var(--text)] w-50 h-12 rounded-lg font-sans font-bold" onClick={() => window.location.href = '/resultado'}>
            Try Now
        </button>
    </div>
  )
}

export default ButtonTry