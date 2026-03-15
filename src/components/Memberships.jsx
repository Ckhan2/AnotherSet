import React from 'react'

const Memberships = () => {
  return (
    <div className='container mx-auto text-center py-20'>
      <div className="grid md:grid-cols-3  gap-4">
        <div className="card bg-white p-4 shadow-md">
          <h2 className="text-xl font-bold">Gold Membership</h2>
          <ul className="list-disc pl-5">
            <li className="text-gray-700 list-none">Allowed to use all the machines</li>
            <li className="text-gray-700 list-none">Able to come in anytime the gym is open</li>
            <li className="text-gray-700 list-none">Access to lockers and showers</li>
          </ul>
        </div>
        <div className="card bg-white p-4 shadow-md">
          <h2 className="text-xl font-bold">Premium Membership</h2>
          <ul className="list-disc pl-5">
            <li className="text-gray-700 list-none">All Gold membership perks</li>
            <li className="text-gray-700 list-none">Assigned personal trainer</li>
            <li className="text-gray-700 list-none">Can bring one partner</li>
            <li className="text-gray-700 list-none">Priority parking</li>
            <li className="text-gray-700 list-none">50% off beverages offered at the gym</li>
            <li className="text-gray-700 list-none">Personal locker to store belongings</li>
          </ul>
        </div>
      </div>
      
    </div>
  )
}

export default Memberships
