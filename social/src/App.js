
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './Pages/Auth/Auth';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import createToaste from './Pages/utility/toastMessage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  // createToaste('This is a test', 'warn')
  return (
   <>
    <ToastContainer 
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

    </Routes>
   </>
  );
}

export default App;
