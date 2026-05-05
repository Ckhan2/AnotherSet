import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
// import { memberData, staffData } from '../ProjectData/MemberData'

const Trainer = () => {
  const [memberData,setMemberData]= useState([])
  const fetchData = () => {
    axios.get('http://localhost:8080/api/members')
      .then(response => {
        setMemberData(response.data)
        console.log(response.data)
      })
  }
useEffect(() => {
fetchData()
}, [])
const deleteMember = (memberId) => {
  axios.delete(`http://localhost:8080/api/members/${memberId}`)
    .then(response => { 
      fetchData(); // Refresh the member list after deletion
    })
}
  return (
    <div className="container mx-auto text-center py-6 px-4 rounded-xl bg-gray-100 shadow-sm">
          <h1 className="text-2xl font-bold mb-8">Staff Members</h1>
         <div className = "bg-gray-600 p-5 overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className= "bg-gray-200 text-left">
              <tr>
                <th className="py-2 px-4 text-left">Name</th>                       
                <th className="py-2 px-4 text-left">Contact</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Designation</th>
               
                
              </tr>
            </thead>
            <tbody className="bg-white">
              {memberData?.map((xyz) => (
                <tr key={xyz?.id}>
                  
                  <td className="py-2 px-4 border-b">{xyz?.fullName}</td>             
                  <td className="py-2 px-4 border-b">{xyz?.phoneNumber}</td>
                  <td className="py-2 px-4 border-b">{xyz?.email}</td>
                  <td className="py-2 px-4 border-b">{xyz?.jobTitle}</td>
                  <td className="py-2 px-4 border-b">
                    <button onClick={() => deleteMember(xyz?.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
    
            </tbody>
             </table>
         </div>
            
          
          
    
        </div>
  )
}

export default Trainer
