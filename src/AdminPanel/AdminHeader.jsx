import React from 'react'
import { Link } from 'react-router-dom'

const AdminHeader = () => {
  return (
    <header className = "bg-[#273444] text-white shadow-sm border-white/10 border" >
        <div className ="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className = "flex items-center gap-3">
                
                </div>
                <Link to='/' className="text-sm text-gray-300 hover:text-white">View Site</Link>
        </div>
      
    </header>
  )
}

export default AdminHeader
