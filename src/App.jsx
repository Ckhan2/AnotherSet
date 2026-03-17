import { useState } from 'react'
import Header from './components/Header'
import Login from './components/Login'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Signup from './components/Signup'
import Home from './components/Home'
import About from './components/About'
import Memberships from './components/Memberships'
import Contact from './components/Contact'
import Carosel from './components/Carosel'
import Herosection from './components/Herosection'
import Footer from './components/Footer'

function App() {
  
const isAdminRoute = location.pathname.startsWith('/admin');
  return (
    <>
    
     {!isAdminRoute && <Header/>}
   <AppRoutes/>   
    </>
  )
}
import AppRoutes from './Routes/AppRoutes'

export default App
