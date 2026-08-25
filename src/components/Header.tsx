import ButtonTheme from './ButtonTheme'
import nome from '../assets/nome.png'

const Header = () => {
  return (
    <header>
      <div className="absolute cursor-pointer right-0 mr-8 top-0 mt-8 flex flex-col items-center justify-center gap-2 md:hidden">
        <span className="h-1 w-10 bg-[var(--text)] rounded-md"></span>
        <span className="h-1 w-10 bg-[var(--text)] rounded-md"></span>
        <span className="h-1 w-10 bg-[var(--text)] rounded-md"></span>
      </div>

      <img src={nome} alt="SafeSpace" className="absolute right-8 top-8 z-10 hidden h-auto w-40 md:block" />

      <ButtonTheme />
    </header>
  )
}

export default Header