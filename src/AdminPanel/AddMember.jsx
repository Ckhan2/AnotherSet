import React from 'react'

const AddMember = () => {
  return (
    <div className = "max-w-3xl">
      <div className= "rounded 2xl bg-white border border-gray-300 overflow-hidden">
        <div className = "p-5 border-b border gray-200">
          <div className= "text-lg font bold text-gray-900">
            
          </div>
          <div className = "font-bold text-black-500">Add New Member</div>
        </div>
        <form className= "space-y-4 p-5">
          <div>
            <label className = "block text-sm font-medium text-gray-700">Name</label>
            <input type="text" placeholder="First name" className = "px-2 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>  
          </div>
        <div>
            
            <input type="text" placeholder="Last name" className = "px-2 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>  
          </div>
          <div>
            <label className = "block text-sm font-medium text-gray-700">Address</label>
            <input type="text" placeholder="Enter member address" className = "px-2 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>  
          </div>
        <div>
            <label className = "block text-sm font-medium text-gray-700">Phone Number</label>
            <input type="text" placeholder="Enter phone number" className = "px-2 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>  
          </div>
          <div className= "">
            <label className = "block text-sm font-medium text-gray-700">Class Type</label>
            <select className = "mt-1 h-10 w-full rounded-xl border-gray-200 px-3 text-sm">
              <option>Bronze</option>
              <option>Silver</option>
              <option>Premium</option>
            </select>
          </div>
        </form>
      </div>
      </div>
  )
}

export default AddMember
