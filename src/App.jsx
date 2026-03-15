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
  

  return (
    <>
      <BrowserRouter>
        <div className="conatainer">
          <Header/>
          
          
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/Signup' element={<Signup/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/memberships' element={<Memberships/>}/>
            <Route path='/contact' element={<Contact/>}/>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
