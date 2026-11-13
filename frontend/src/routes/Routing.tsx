import { BrowserRouter, Routes, Route } from "react-router-dom";
import Resultado from '../pages/Resultado';
import Historico from '../pages/Historico';
import Home from '../pages/Home';
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import ProtectedRoute from "./ProtectedRoute";
 

const Routing = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/resultado" element={<Resultado />} />
            <Route path="/historico" element={<Historico />} />
          </Route>
        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default Routing