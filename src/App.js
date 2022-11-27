import './App.css';
import Pregunta from './componentes/Pregunta';
import {BrowserRouter, Routes , Route} from 'react-router-dom';
import Login from './componentes/Login';
import Menu from './componentes/Menu';
import Home from './componentes/Home';
import Register from './componentes/Register';
import Footer from './componentes/Footer';
import MenuAdmin from './componentes/MenuAdmin';
import LoginPro from './componentes/LoginPro';
import EnsayoNumeros from './componentes/EnsayoNumeros';

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
        <Route path='/Menu/EnsayoNumeros' element={<EnsayoNumeros/>} />
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
