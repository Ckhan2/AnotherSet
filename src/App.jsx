import { useState } from 'react'
import Header from './components/Header'
import AppRoutes from './Routes/AppRoutes'
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  return (
    <>
    
     {!isAdminRoute && <Header/>}
   <AppRoutes/>  <ToastContainer />  
    </>
  )
}


export default App
