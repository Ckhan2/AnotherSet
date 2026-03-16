import { Link, Navigate, NavLink } from "react-router-dom"


function Header() {
  

  return (
    <>
      
      <header className="text-gray-600 body-font bg-[#273444]">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      
      <img src="logo.png" alt=""className="h-15 w-15" />
      <span className="ml-3 text-xl text-white">AnotherSet</span>
    </a>
    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
      <NavLink to='/' className= {({isActive}) => isActive ? "text-white border-b-2 border-yellow-400 mr-8 text-xl mr-8 ": "text-white text-xl mr-8"}>Home</NavLink>
      <NavLink to='/about' className={({isActive}) => isActive ? "text-white border-b-2 border-yellow-400 mr-8 text-xl mr-8 ": "text-white text-xl  mr-8 hover:text-gray-900"}>About</NavLink>
      <NavLink to='/contact' className={({isActive}) => isActive ? "text-white border-b-2 border-yellow-400 mr-8 text-xl mr-8 ": "text-white text-xl  mr-8 hover:text-gray-900"}>Contact</NavLink>
      <NavLink to='/memberships' className={({isActive}) => isActive ? "text-white border-b-2 border-yellow-400 mr-8 text-xl mr-8 ": "text-white text-xl  mr-8 hover:text-gray-900"}>Memberships</NavLink>
      
    </nav>
    <Link to='/login' className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
      Log In
    </Link> 
  </div>
</header>
    </>
  )
}

export default Header
