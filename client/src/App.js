import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';
import Notes from './pages/Notes';
import { useAuth } from './contexts/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateNote from './pages/CreateNote';
import UpdateNote from './pages/UpdateNote';


function App() {

  const { user } = useAuth();

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route element={<PrivateRoutes />}>
         <Route path='/notes' element={<Notes />} />
         <Route path='/notes/create' element={<CreateNote />} />
         <Route path='/notes/update/:id' element={<UpdateNote />} />
        </Route>

        <Route path='/' element={<Home />} />
        <Route path='/register' element={
          user? <Navigate to='/' /> : <Register />
        } />
        <Route path='/login' element={
          user? <Navigate to='/' /> : <Login />
        } />
        
      </Routes>
    </>
  );
}

export default App;
