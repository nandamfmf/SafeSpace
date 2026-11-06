import Header from '../components/Header'
import ButtonTry from '../components/ButtonTry'
import astronaut from '../assets/astronaut.png'

const Home = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>

        <Header />

        <div className="flex justify-center items-center mt-[-90px]">
          <img className="object-cover h-70 w-65" src={astronaut} alt="" />
        </div>

        <div>
          <h1 className="text-center mt-8 font-sans text-4xl font-bold">
              SafeSpace
          </h1>
        </div>

        <div>
          <h2 className="text-center font-sans text-lg font-normal mt-4 max-w-[460px]">
            Your space to express your feelings and emotions freely, without judgment or fear of being misunderstood.
          </h2>
        </div>

        <ButtonTry />

    </div>
  )
}

export default Home