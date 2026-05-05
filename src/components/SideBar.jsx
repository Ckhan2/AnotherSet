import React from 'react'
import { NavLink, useNavigate} from 'react-router-dom'
import { cookieUtils } from '../utils/cookieUtils'
const navItems = [
    { name: 'Dashboard', path: '/admin/Dashboard' },
    { name: 'Add Staff Member', path: '/admin/AddMember' },
    // { name: 'Payment Methods', path: '/admin/PaymentMethods' },
    { name: 'Gym Members', path: '/admin/StaffMembers' },
    { name: 'Staff Members', path: '/admin/trainers' }
]


const SideBar = () => {
  const navigate = useNavigate();
  const userRole = cookieUtils.getUserSession()?.role?.toUpperCase?.() || '';
  console.log('🔍 User role:', userRole);
  const filteredNavItems = userRole === 'ADMIN'
    ? navItems
    : navItems.filter((item) => item.path !== '/admin/AddMember');

  const handleLogout = () => {
    cookieUtils.removeAuthToken();
    cookieUtils.removeUserSession();
    navigate('/');
  }

  return (
    <aside className = "w-56 min-height-screen bg-[#273444] text-white flex flex-col">
      <div className = "p-4 border-b border-white/10">
        <h2 className = "text-2xl font-bold text-white">Admin Panel</h2>
      </div>
      <nav className = "flex-1 p-4 space-y-1">
        {filteredNavItems.map((closet) => (
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
