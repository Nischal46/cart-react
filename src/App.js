import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Route, Routes, Redirect } from 'react-router-dom'
import Navbar from './Components/Navbar';
import Cart from './Components/Cart';
import Home from './Components/Home';
import Error404 from './Components/Error404';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/cart' Component={Cart} />
          <Route path='*' Component={Error404} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
