import { useState, useEffect } from 'react'
import { useAddMember } from '../hooks/useApi'
import { cookieUtils } from '../utils/cookieUtils'

const RegisterStaffModal = ({ isOpen, onClose }) => {
  const [staffData, setStaffData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    membershipStartDate: '',
    membershipEndDate: '',
    jobTitle: '',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const addMemberMutation = useAddMember()

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = cookieUtils.isAuthenticated()
      setIsAuthenticated(isAuth)

      if (!isAuth) {
        setError('❌ Not authenticated. Please login first before registering staff.')
        console.error('❌ RegisterStaffModal: User not authenticated')
      } else {
        const token = cookieUtils.getAuthToken()
        console.log('✅ RegisterStaffModal: User is authenticated', {
          tokenPreview: token?.substring(0, 30) + '...',
          tokenLength: token?.length,
        })
      }
    }

    checkAuth()
  }, [])

  const jobTitleOptions = [
    'ADMIN',
    'TRAINER',
    'STORE_MANAGER',
    'IT_DESK',
    'JANITOR',
    'STAFF',
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setStaffData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!cookieUtils.isAuthenticated()) {
      setError('❌ You are not authenticated. Please login first.')
      console.error('❌ Submit: Not authenticated')
      return
    }

    const token = cookieUtils.getAuthToken()
    console.log('🔐 Submit: Token check', {
      hasToken: !!token,
      tokenPreview: token?.substring(0, 30) + '...',
    })

    if (
      !staffData.fullName ||
      !staffData.email ||
      !staffData.phoneNumber ||
      !staffData.membershipStartDate ||
      !staffData.membershipEndDate ||
      !staffData.jobTitle
    ) {
      setError('All fields are required')
      return
    }

    const payload = {
      fullName: staffData.fullName,
      email: staffData.email,
      phoneNumber: staffData.phoneNumber,
      membershipStartDate: staffData.membershipStartDate,
      membershipEndDate: staffData.membershipEndDate,
      jobTitle: staffData.jobTitle,
    }

    console.log('📤 Final payload being sent:', payload)

    try {
      await addMemberMutation.mutateAsync(payload)
      setSuccess('Staff member registered successfully!')

      setStaffData({
        fullName: '',
        email: '',
        phoneNumber: '',
        membershipStartDate: '',
        membershipEndDate: '',
        jobTitle: '',
      })

      onClose() 
    } catch (err) {
      console.error('❌ RegisterStaffModal Error:', err)
      setError(err.message || 'An error occurred while registering the staff member')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add information</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-600 text-sm font-medium">{error}</div>}
          {success && <div className="text-green-600 text-sm font-medium">{success}</div>}

          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={staffData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={staffData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={staffData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              name="membershipStartDate"
              value={staffData.membershipStartDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              name="membershipEndDate"
              value={staffData.membershipEndDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Job Title</label>
            <select
              name="jobTitle"
              value={staffData.jobTitle}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2 h-10"
              required
            >
              <option value="">Select Job Title</option>
              {jobTitleOptions.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={!isAuthenticated}
              className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Add Information
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterStaffModal