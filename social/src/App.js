
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './Pages/Auth/Auth';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Authentication from './Pages/Authentication/Authentication';
function App() {
  // createToaste('This is a test', 'warn')
  return (
   <>
    <ToastContainer 
     style={{zIndex : 999999}}
    position='top-center'
    autoClose={3000}
    hideProgressBar={true}
    closeOnClick
    newestOnTop={true}
    />
    <Routes>
      <Route path='/' element={ <Home /> }/>
      <Route path='/login' element={ <Auth /> }/>
      <Route path='/profile' element={ <Profile /> }/>
      <Route path='/authentic' element={ <Authentication /> }/>

    </Routes>
   </>
  );
}

export default App;
