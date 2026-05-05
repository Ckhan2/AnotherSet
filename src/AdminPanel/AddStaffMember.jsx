import { useState, useEffect } from 'react'
import { useAddMember } from '../hooks/useApi'
import { cookieUtils } from '../utils/cookieUtils'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const AddStaffMember = ({ isOpen, onClose, initialMemberType }) => {
  const [memberData, setMemberData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    jobTitle: '',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showStaffDropdown, setShowStaffDropdown] = useState(true)
const navigation = useNavigate()
  const addMemberMutation = useAddMember()

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = cookieUtils.isAuthenticated()
      setIsAuthenticated(isAuth)

      if (!isAuth) {
        setError('❌ Not authenticated. Please login first before adding members.')
        console.error('❌ AddMember: User not authenticated')
      } else {
        const token = cookieUtils.getAuthToken()
        console.log('✅ AddMember: User is authenticated', {
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
    setMemberData((prev) => ({
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
      !memberData.fullName ||
      !memberData.email ||
      !memberData.phoneNumber ||
      !memberData.jobTitle ||
      !jobTitleOptions.includes(memberData.jobTitle)
    ) {
      setError('All fields are required')
      return
    }

    const payload = {
      fullName: memberData.fullName,
      email: memberData.email,
      phoneNumber: memberData.phoneNumber,
      jobTitle: memberData.jobTitle,
    }

    console.log('📤 Final payload being sent:', payload)

    try {
      await addMemberMutation.mutateAsync(payload)
      toast.success('Member added successfully!')
      navigation('/admin/trainers')

      setMemberData({
        fullName: '',
        email: '',
        phoneNumber: '',
        jobTitle: '',
      })

      onClose && onClose()
    } catch (err) {
      console.error('❌ AddMember Error:', err)
      setError(err.message || 'An error occurred while adding the member')
    }
  }

  return (
    <div className="rounded-2xl border border-gray-300 overflow-hidden">
      <div className="p-5 border-b border-gray-200 flex justify-between items-center">
        <div className="font-bold text-black">Add Staff Member</div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 p-5">
        <div>
          <div>
            {error && <div className="text-red-600 text-sm font-medium">{error}</div>}
            {success && <div className="text-green-600 text-sm font-medium">{success}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={memberData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              className="px-2 py-2 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              placeholder="Enter e-mail address"
              className="px-2 py-2 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              className="px-2 py-2 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {showStaffDropdown && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Staff Job Title</label>
              <select
                name="jobTitle"
                value={memberData.jobTitle}
                onChange={handleChange}
                className="mt-1 h-10 w-full rounded-xl border border-gray-300 shadow-sm px-3 text-sm focus:ring-indigo-500 focus:border-indigo-500"
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
          )}

          <div className="pt-4 flex gap-3">
            <button
              type="submit"
              disabled={!isAuthenticated}
              className="w-1/2 bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Add Member
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddStaffMember