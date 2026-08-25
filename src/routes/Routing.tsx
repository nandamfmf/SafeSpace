import { BrowserRouter, Routes, Route } from "react-router-dom";
import Resultado from '../pages/Resultado';
import Historico from '../pages/Historico';
import Home from '../pages/Home';
 

const Routing = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resultado" element={<Resultado />} />
          <Route path="/historico" element={<Historico />} />
        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default Routing