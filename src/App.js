import "./App.css";
import Pregunta from "./componentes/Pregunta";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./componentes/menus/Menu";
import Home from "./componentes/menus/Home";
import Register from "./componentes/menus/Register";
import Footer from "./componentes/footer/Footer";
import MenuAdmin from "./componentes/menus/MenuAdmin";
import LoginPro from "./componentes/menus/LoginPro";
import CrearEnsayo from "./componentes/CrearEnsayo";
import PruebaNumeros from "./componentes/pruebas/PruebaNumeros";
import PruebaProbabilidades from "./componentes/pruebas/PruebaProbabilidades";
import PruebaAlgebra from "./componentes/pruebas/PruebaAlgebra";
import PruebaGeometria from "./componentes/pruebas/PruebaGeometria";
import ModificarNumeros from "./componentes/modificar/ModificarNumeros";
import ModificarProbabilidades from "./componentes/modificar/ModificarProbabilidades";
import ModificarGeometria from "./componentes/modificar/ModificarGeometria";
import ModificarAlgebra from "./componentes/modificar/ModificarAlgebra";
import EliminarAlgebra from "./componentes/eliminar/EliminarAlgebra";
import EliminarGeometria from "./componentes/eliminar/EliminarGeometria";
import EliminarProbabilidades from "./componentes/eliminar/EliminarProbabilidades";
import EliminarNumeros from "./componentes/eliminar/EliminarNumeros";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Login" element={<LoginPro />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/Menu/Pregunta" element={<Pregunta />} />
          <Route path="/MenuAdmin" element={<MenuAdmin />} />
          <Route path="/Menu/PruebaNumeros" element={<PruebaNumeros />} />
          <Route
            path="/Menu/PruebaProbabilidades"
            element={<PruebaProbabilidades />}
          />
          <Route path="/Menu/PruebaAlgebra" element={<PruebaAlgebra />} />
          <Route path="/Menu/PruebaGeometria" element={<PruebaGeometria />} />
          <Route path="/Menu/crearEnsayo" element={<CrearEnsayo />} />
          <Route
            path="/Admin/ModificarNumeros"
            element={<ModificarNumeros />}
          />
          <Route
            path="/Admin/ModificarProbabilidades"
            element={<ModificarProbabilidades />}
          />
          <Route
            path="/Admin/ModificarAlgebra"
            element={<ModificarAlgebra />}
          />
          <Route
            path="/Admin/ModificarGeometria"
            element={<ModificarGeometria />}
          />
          <Route path="/Admin/EliminarAlgebra" element={<EliminarAlgebra />} />
          <Route
            path="/Admin/EliminarGeometria"
            element={<EliminarGeometria />}
          />
          <Route
            path="/Admin/EliminarProbabilidades"
            element={<EliminarProbabilidades />}
          />
          <Route path="/Admin/EliminarNumeros" element={<EliminarNumeros />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
