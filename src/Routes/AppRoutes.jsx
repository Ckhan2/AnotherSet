import React from 'react'
import Login from '../components/Login'
import Signup from '../components/Signup'
import Home from '../components/Home'
import About from '../components/About' 
import Memberships from '../components/Memberships'
import Contact from '../components/Contact'
import { Route } from 'react-router-dom'
import AdminPanel from '../AdminPanel/AdminPanel'
const AppRoutes = () => {
  return (
    <div>
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

        {/* Admin routes will go here */}
        {/*and here we are  */}
        <Route path = '/AddMember' element={<AddMember/>}/>
        <Route path = '/Dashboard' element={<Dashboard/>}/>
        <Route path = '/PaymentMethods' element={<PaymentMethods/>}/>
        <Route path = '/StaffMembers' element={<StaffMembers/>}/>
        <Route path = '/Trainer' element={<Trainer/>}/>
    <Route path='/admin' element={<AdminPanel/>}/>
      </BrowserRouter>
    </div>
  )
}

export default AppRoutes
