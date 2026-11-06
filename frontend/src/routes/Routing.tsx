import { BrowserRouter, Routes, Route } from "react-router-dom";
import Resultado from '../pages/Resultado';
import Historico from '../pages/Historico';
import Home from '../pages/Home';
import Login from "../pages/Login";
 

const Routing = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resultado" element={<Resultado />} />
          <Route path="/historico" element={<Historico />} />
        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default Routing