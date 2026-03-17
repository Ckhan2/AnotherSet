import React from 'react'
import Login from '../components/Login'
import Signup from '../components/Signup'
import Home from '../components/Home'
import About from '../components/About' 
import Memberships from '../components/Memberships'
import Contact from '../components/Contact'
import { Route } from 'react-router-dom'
import AdminLayout from '../AdminPanel/AdminLayout'
import { BrowserRouter, Routes } from 'react-router-dom'
import AddMember from '../AdminPanel/AddMember'
import Dashboard from '../AdminPanel/Dashboard'
import PaymentMethod from '../AdminPanel/PaymentMethod'
import StaffMembers from '../AdminPanel/StaffMembers'
import Trainer from '../AdminPanel/Trainer'
import WebLayout from '../AdminPanel/WebLayout'
import Header from '../components/Header'
const AppRoutes = () => {
  return (
    
      
        <div className="conatainer">
         
          
          
          
          
          <Routes>
           <Route path='/' element={<WebLayout/>}>
            
            <Route index element={<Home/>}/>
            <Route path='about' element={<About/>}/>
            <Route path='memberships' element={<Memberships/>}/>
            <Route path='contact' element={<Contact/>}/>
            </Route>
            
          
        <Route path='/login' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        

        {/* Admin routes will go here */}
        
       
    <Route path='/admin' element={<AdminLayout/>}>
     <Route path='AddMember' element={<AddMember/>}/>
        <Route path='Dashboard' element={<Dashboard/>}/>
        <Route path='PaymentMethods' element={<PaymentMethod/>}/>
        <Route path='StaffMembers' element={<StaffMembers/>}/>
        <Route path='Trainer' element={<Trainer/>}/>
        </Route>
    </Routes>
      
    </div>
  )
}

export default AppRoutes
