import React, { useState } from 'react'
import Modal from './Modal'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import StripePayment from './StripePayment'

const stripePromise = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  : null

const MEMBERSHIP_PLANS = {
  BRONZE: { name: 'Bronze', monthlyPrice: 14.99 },
  SILVER: { name: 'Silver', monthlyPrice: 19.99 },
  PLATINUM: { name: 'Platinum', monthlyPrice: 29.99 },
}

const Memberships = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMembership, setSelectedMembership] = useState('')

  const openModal = (membershipType) => {
    setSelectedMembership(membershipType)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedMembership('')
  }

  return (
    <div className='container rounded-lg bg-gray-700 mx-auto text-center py-20'>
      <div className="grid md:grid-cols-3  gap-4">
        <div className="card bg-white p-4 shadow-md">
          <img src ="BronzeBanner.jpg" alt="BronzeBanner" className='w-20 h-20 mx-auto mb-4'/>
          <h2 className="text-2xl font-bold text-gray-700">Bronze Membership</h2>
          <ul className="list-disc pl-5">
            <li className="font-bold list-none">Allowed to use all the workout equipment</li>
            <li className="font-bold list-none">Able to come in anytime the gym is open</li>
            <li className="font-bold list-none">Access to lockers and showers</li>
            <li className ="font-bold list-none">Monthly cost: $14.99 plus tax</li>
            <li className ="font-bold list-none">Annual cost: $149.99 plus tax</li>
            <li className="font-bold list-none">We offer additional 5% discount for referrals</li>
          </ul>
          <button
            onClick={() => openModal('BRONZE')}
            className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
          >
            Join Bronze
          </button>
        </div>
        <div className="card bg-white p-4 shadow-md">
          <img src ="SilverBanner.jpg" alt="SilverBanner" className='w-20 h-20 mx-auto mb-4'/>
          <h2 className="text-2xl font-bold text-gray-700">Silver Membership</h2>
          <ul className="list-disc pl-5">
            <li className="font-bold list-none">All Bronze membership perks</li>
            <li className="font-bold list-none">Assigned personal trainer</li>
            <li className="font-bold list-none">Can bring an additional guest</li>
            <li className="font-bold list-none">Priority parking</li>
            <li className="font-bold list-none">50% off beverages offered at the gym</li>
            <li className="font-bold list-none">Personal locker to store belongings</li>
            <li className="font-bold list-none">Monthly cost: $19.99 plus tax</li>
            <li className ="font-bold list-none"> Annual cost: $199.99 plus tax</li>
            <li className ="font-bold list-none">We offer additional 5% discount for referrals</li>
          </ul>
          <button
            onClick={() => openModal('SILVER')}
            className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
          >
            Join Silver
          </button>
        </div>
        <div className="card bg-white p-4 shadow-md">
          <img src ="PlatinumBanner.jpg" alt="PlatinumBanner" className='w-20 h-20 mx-auto mb-4'/>
          <h2 className="text-2xl font-bold text-gray-700">Platinum Membership</h2>
          <ul className="list-disc pl-5">
            <li className="font-bold list-none">All Premium membership perks</li>
            <li className="font-bold list-none">Turf training</li>
            <li className="font-bold list-none">Group classes</li>
            <li className="font-bold list-none">Yoga classes</li>
            <li className="font-bold list-none">Boxing training</li>
            <li className="font-bold list-none">Customized workouts</li>
            <li className="font-bold list-none">Access to sauna and steam room</li>
            <li className="font-bold list-none">Monthly cost: $29.99 plus tax</li>
            <li className="font-bold list-none">Annual cost: $299.99 plus tax</li>
            <li className="font-bold list-none">We offer additional 5% discount for referrals</li>
          </ul>
          <button
            onClick={() => openModal('PLATINUM')}
            className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
          >
            Join Platinum
          </button>
        </div>
      </div>
      
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {stripePromise ? (
          <Elements stripe={stripePromise}>
            <StripePayment onClose={closeModal} plan={MEMBERSHIP_PLANS[selectedMembership]} />
          </Elements>
        ) : (
          <p className="text-red-300">
            Stripe is not configured. Set `VITE_STRIPE_PUBLISHABLE_KEY` to enable payments.
          </p>
        )}
      </Modal>
    </div>
    
  )
}

export default Memberships
