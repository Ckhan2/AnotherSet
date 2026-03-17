import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'
import AdminHeader from './AdminHeader'
const AdminLayout = () => {
  return (
    <div className = 'flex min-h-screen bg-gray-50'>
        <SideBar/>
        <div className = 'flex-1 flex-col min-w-0'>
          <AdminHeader/>
          <main className = "flex-1 overflow-auto" >
            <div className = "w-full max-w-6xl mx-auto px-4 sm:px-6 lg: px-8 py-6"><Outlet/></div>
            
          </main>
        </div>
      
    </div>
  )
}

export default AdminLayout

