import { useState, useEffect } from 'react'
import { useRegisterUser } from '../hooks/useApi'
import { cookieUtils } from '../utils/cookieUtils'

const RegisterMemberModal = ({ onClose, initialMemberType }) => {
  const [memberData, setMemberData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phoneNumber: '',
    membershipStart: '',
    membershipEnd: '',
    membershipType: initialMemberType || 'BRONZE',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  
  const registerUserMutation = useRegisterUser()

  useEffect(() => {
    setIsAuthenticated(cookieUtils.isAuthenticated())
  }, [])

  const membershipTypeOptions = [
    'BRONZE',
    'SILVER',
    'GOLD',
    'PLATINUM',
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setMemberData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const payload = {
      firstName: memberData.firstName,
      lastName: memberData.lastName,
      address: memberData.address,
      email: memberData.email,
      phoneNumber: memberData.phoneNumber,
      membershipStart: memberData.membershipStart,
      membershipEnd: memberData.membershipEnd,
      membershipType: memberData.membershipType,
    }

    console.log('📤 Final payload being sent:', payload)

    try {
      await registerUserMutation.mutateAsync(payload)
      setSuccess('User registered successfully!')

      setMemberData({
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        phoneNumber: '',
        membershipStart: '',
        membershipEnd: '',
        membershipType: initialMemberType || 'BRONZE',
      })

      onClose()
    } catch (err) {
      console.error('❌ RegisterMemberModal Error:', err)
      setError(err.message || 'An error occurred while registering the user')
    }
  }

  return (
    <div className="rounded-2xl border border-gray-300 overflow-hidden">
      <div className="p-5 border-b border-gray-200 flex justify-between items-center">
        <div className="font-bold text-blue-500 text-center text-2xl">
          Register User
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 p-5">
        <div>
          {error && <div className="text-red-600 text-sm font-medium">{error}</div>}
          {success && <div className="text-green-600 text-sm font-medium">{success}</div>}
        </div>

        <div className="flex gap-3 w-full">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={memberData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              className="px-2 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={memberData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              className="px-2 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={memberData.address}
            onChange={handleChange}
            placeholder="Enter address"
            className="px-2 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={memberData.email}
            onChange={handleChange}
            placeholder="Enter e-mail"
            className="px-2 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={memberData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="px-2 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Membership Start Date</label>
          <input
            type="date"
            name="membershipStart"
            value={memberData.membershipStart}
            onChange={handleChange}
            className="px-2 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Membership End Date</label>
          <input
            type="date"
            name="membershipEnd"
            value={memberData.membershipEnd}
            onChange={handleChange}
            className="px-2 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Membership Type</label>
          <select
            name="membershipType"
            value={memberData.membershipType}
            onChange={handleChange}
            className="px-2 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            {membershipTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
<div>
  <label className="block text-sm font-medium text-gray-700">Payment Method</label>
  <select
    name="paymentMethod"
    value={memberData.paymentMethod}
    onChange={handleChange}
    className="px-2 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    required
  >
    <option value="">Select Payment Method</option>
    <option value="BANK_ACCOUNT">Bank Account</option>
    <option value="CREDIT_CARD">Credit Card</option>
    <option value="DEBIT_CARD">Debit Card</option>
  </select>
</div>
        <div className="pt-4 flex gap-3">
          <button
            type="submit"
            disabled={!isAuthenticated}
            className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed text-center"
          >
            Register User
          </button>
        </div>
      </form>
    </div>
  )
}

export default RegisterMemberModal