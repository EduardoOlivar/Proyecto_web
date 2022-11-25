import './App.css';
import Pregunta from './componentes/Pregunta';
import {BrowserRouter, Routes , Route} from 'react-router-dom';
import Login from './componentes/Login';
import Menu from './componentes/Menu';
import Home from './componentes/Home';
import Register from './componentes/Register';
import Footer from './componentes/Footer';
import MenuAdmin from './componentes/MenuAdmin';

function App() {

  
  return (
    
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Register' element={<Register/>} />
        <Route path='/Menu' element={<Menu/>} />
        <Route path='/Menu/Pregunta' element={<Pregunta/>} />
        <Route path='/MenuAdmin' element={<MenuAdmin/>} />
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
