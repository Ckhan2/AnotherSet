import React from 'react'
import AdminPage from './AdminPage'
const Dashboard = () => {
  return (
    <AdminPage 
    
    Title = "Dashboard"
    Subtitle = "Members overview"
    Action ={
      <div className = "flex gap-2">
        <button className="btn btn-primary">Add Member</button>
        <button className="btn btn-secondary">View Members</button>
      </div>

    } />
  )
}

export default Dashboard
