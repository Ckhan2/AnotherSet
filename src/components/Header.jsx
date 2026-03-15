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
      <Link to='/home' className="text-white text-xl mr-8 hover:text-gray-900">Home</Link>
      <Link to='/about' className="text-white text-xl  mr-8 hover:text-gray-900">About</Link>
      <Link to='/contact' className="text-white text-xl  mr-8 hover:text-gray-900">Contact</Link>
      <Link to='/memberships' className="text-white text-xl  mr-8 hover:text-gray-900">Memberships</Link>
      
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
