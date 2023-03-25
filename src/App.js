import './App.css';
import Pregunta from './componentes/Pregunta';
import {BrowserRouter, Routes , Route} from 'react-router-dom';
import Menu from './componentes/Menu';
import Home from './componentes/Home';
import Register from './componentes/Register';
import Footer from './componentes/Footer';
import MenuAdmin from './componentes/MenuAdmin';
import LoginPro from './componentes/LoginPro';
import CrearEnsayo from './componentes/CrearEnsayo';
import PruebaNumeros from './componentes/PruebaNumeros';
import PruebaProbabilidades from './componentes/PruebaProbabilidades';
import PruebaAlgebra from './componentes/PruebaAlgebra';
import PruebaGeometria from './componentes/PruebaGeometria';
import ModificarNumeros from './componentes/ModificarNumeros';
import ModificarProbabilidades from './componentes/ModificarProbabilidades';
import ModificarGeometria from './componentes/ModificarGeometria';
import ModificarAlgebra from './componentes/ModificarAlgebra';
import EliminarAlgebra from './componentes/EliminarAlgebra';
import EliminarGeometria from './componentes/EliminarGeometria';
import EliminarProbabilidades from './componentes/EliminarProbabilidades';
import EliminarNumeros from './componentes/EliminarNumeros';


function App() {

  
  return (
    
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='Login' element={<LoginPro/>} />
        <Route path='/Register' element={<Register/>} />
        <Route path='/Menu' element={<Menu/>} />

        <Route path='/Menu/Pregunta' element={<Pregunta/>} />
        <Route path='/MenuAdmin' element={<MenuAdmin/>} />
        <Route path='/Menu/PruebaNumeros' element={<PruebaNumeros/>} />
        <Route path='/Menu/PruebaProbabilidades' element={<PruebaProbabilidades/>} />
        <Route path='/Menu/PruebaAlgebra' element={<PruebaAlgebra/>} />
        <Route path='/Menu/PruebaGeometria' element={<PruebaGeometria/>} />
        <Route path='/Menu/crearEnsayo' element={<CrearEnsayo/>} />
        <Route path='/Admin/ModificarNumeros' element={<ModificarNumeros/>} />
        <Route path='/Admin/ModificarProbabilidades' element={<ModificarProbabilidades/>} />
        <Route path='/Admin/ModificarAlgebra' element={<ModificarAlgebra/>} />
        <Route path='/Admin/ModificarGeometria' element={<ModificarGeometria/>} />
        <Route path='/Admin/EliminarAlgebra' element={<EliminarAlgebra/>} />
        <Route path='/Admin/EliminarGeometria' element={<EliminarGeometria/>} />
        <Route path='/Admin/EliminarProbabilidades' element={<EliminarProbabilidades/>} />
        <Route path='/Admin/EliminarNumeros' element={<EliminarNumeros/>} />
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
