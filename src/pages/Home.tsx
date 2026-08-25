import Header from '../components/Header'
import ButtonTry from '../components/ButtonTry'
import robo from '../assets/robo.png'
import name from '../assets/nome.png'

const Home = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>

        <Header />

        <div className="flex justify-center items-center">
          <img src={robo} alt="" />
        </div>

        <div>
          <h1 className="text-center mt-[-70px] font-sans text-4xl font-bold">
              SafeSpace
          </h1>
        </div>

        <div>
          <h2 className="text-center font-sans text-lg font-normal mb-12 max-w-[460px]">
            Your space to express your feelings and emotions freely, without judgment or fear of being misunderstood.
          </h2>
        </div>

        <ButtonTry />

    </div>
  )
}

export default Home