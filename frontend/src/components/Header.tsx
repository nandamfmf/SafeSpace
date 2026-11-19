import ButtonTheme from './ButtonTheme'
import ButtonSignIn from './ButtonSignIn'

const Header = () => {
  return (
    <header className="absolute inset-x-0 top-4 z-50 mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-14">
      <ButtonTheme />
      <ButtonSignIn />
    </header>
  )
}

export default Header