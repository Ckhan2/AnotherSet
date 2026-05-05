import React from 'react'
import Login from '../components/Login'
import Signup from '../components/Signup'
import Home from '../components/Home'
import About from '../components/About' 
import Memberships from '../components/Memberships'
import Contact from '../components/Contact'
import { Navigate, Route } from 'react-router-dom'
import AdminLayout from '../AdminPanel/AdminLayout'
import { Routes } from 'react-router-dom'
import AddStaffMember from '../AdminPanel/AddStaffMember'
import Dashboard from '../AdminPanel/Dashboard'
import PaymentMethod from '../AdminPanel/PaymentMethod'
import StaffMembers from '../AdminPanel/GymMembers'
import Trainer from '../AdminPanel/StaffMembers'
import WebLayout from '../AdminPanel/WebLayout'
import { cookieUtils } from '../utils/cookieUtils'

const getCurrentUserRole = () => {
  const session = cookieUtils.getUserSession();
  return session?.role?.toUpperCase?.() || session?.jobTitle?.toUpperCase?.() || '';
}

const AdminIndexRedirect = () => {
  const role = getCurrentUserRole();
  const redirectPath = role === 'STORE_MANAGER' ? '/admin/Dashboard' : '/admin/AddMember';
  return <Navigate to={redirectPath} replace />;
}

const AddMemberRouteGuard = () => {
  const role = getCurrentUserRole();
  if (role === 'STORE_MANAGER') {
    return <Navigate to="/admin/Dashboard" replace />;
  }

  return <AddStaffMember />;
}

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
        

        
        
       
    <Route path='/admin/*' element={<AdminLayout/>}>
        <Route index element={<AdminIndexRedirect/>}/>
     <Route path='AddMember' element={<AddMemberRouteGuard/>}/>
        <Route path='Dashboard' element={<Dashboard/>}/>
        <Route path='PaymentMethods' element={<PaymentMethod/>}/>
        <Route path='StaffMembers' element={<StaffMembers/>}/>
        <Route path='trainers' element={<Trainer/>}/>
        </Route>
    </Routes>
      
    </div>
  )
}

export default AppRoutes
