import React from 'react'
import { NavLink, useNavigate} from 'react-router-dom'
const navItems = [
    { name: 'Dashboard', path: '/admin/Dashboard' },
    { name: 'Add Member', path: '/admin/AddMember' },
    { name: 'Payment Methods', path: '/admin/PaymentMethods' },
    { name: 'Staff Members', path: '/admin/StaffMembers' },
    { name: 'Trainer', path: '/admin/Trainer' }
]


const SideBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {navigate('/login');}

  return (
    <aside className = "w-56 min-height-screen bg-[#273444] text-white flex flex-col">
      <div className = "p-4 border-b border-white/10">
        <h2 className = "text-2xl font-bold text-white">Admin Panel</h2>
      </div>
      <nav className = "flex-1 p-4 space-y-1">
        {navItems.map((closet) => (
<NavLink
key={closet.name}
to={closet.path}

className={({ isActive }) =>
isActive ? "block px-4 py-2 rounded bg-gray-700 text-white" : "block px-4 py-2 rounded text-gray-300 hover:bg-gray-700 hover:text-white"
}
>
{closet.name}
</NavLink>)
        )}
      </nav>
      <button onClick={handleLogout} className="p-4 text-white bg-red-500 hover:bg-red-700 rounded">Logout</button>

        
        
      
    </aside>
  )
}

export default SideBar
