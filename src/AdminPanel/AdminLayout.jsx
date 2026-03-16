import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className = 'space-y-20'>
        <div className = 'flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between'></div>'
      <p className='text-xl font-semibold uppercase text-black '>Welcome to Admin Panel</p>
      <Outlet/>
    </div>
  )
}

export default AdminLayout

