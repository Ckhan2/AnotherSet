import React from 'react'
import { memberData } from '../ProjectData/MemberData'

const StaffMembers = () => {
  return (
    <div className="container mx-auto text-center py-6 px-4 rounded-xl bg-gray-100 shadow-sm">
      <h1 className="text-2xl font-bold mb-8">Staff Members</h1>
     <div className = "bg-gray-600 p-5 overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead className= "bg-gray-200 text-left">
          <tr>
            <th className="py-2 px-4 text-left">First Name</th>
            <th className="py-2 px-4 text-left">Last Name</th>                        
            <th className="py-2 px-4 text-left">Contact</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Designation</th>
           
            
          </tr>
        </thead>
        <tbody className="bg-white">
          {memberData.map((xyz) => (
            <tr key={xyz.memberId}>
              <td className="py-2 px-4 border-b">{xyz.firstName}</td>
              <td className="py-2 px-4 border-b">{xyz.lastName}</td>              
              <td className="py-2 px-4 border-b">{xyz.contact}</td>
              <td className="py-2 px-4 border-b">{xyz.email}</td>
              <td className="py-2 px-4 border-b">{xyz.designation}</td>

            </tr>
          ))}

        </tbody>
         </table>
     </div>
        
      
      

    </div>
  )
}

export default StaffMembers
