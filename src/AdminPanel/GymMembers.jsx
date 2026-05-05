import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StaffMembers = () => {
  const [memberData, setMemberData] = useState([]);

  const fetchData = () => {
    axios
      .get('http://localhost:8080/api/users')
      .then((response) => {
        setMemberData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching members:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteMember = (memberId) => {
    axios
      .delete(`http://localhost:8080/api/users/${memberId}`)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error('Error deleting member:', error);
      });
  };

  return (
    <div className="container mx-auto py-6 px-4 rounded-xl bg-gray-100 shadow-sm">
      <h1 className="text-2xl font-bold mb-8 text-center">Gym Members</h1>

      <div className="bg-gray-700 p-5 rounded-xl overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Full Name</th>
              <th className="py-3 px-4 text-left">Contact</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Address</th>
              <th className="py-3 px-4 text-left">Membership</th>
              <th className="py-3 px-4 text-left">Plan Duration</th>
              <th className="py-3 px-4 text-left">Payment ID</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {memberData.length > 0 ? (
              memberData.map((member) => (
                <tr
                  key={member.id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="py-3 px-4">{member.id}</td>

                  <td className="py-3 px-4 font-semibold text-gray-800">
                    {member.firstName} {member.lastName}
                  </td>

                  <td className="py-3 px-4">{member.phoneNumber}</td>

                  <td className="py-3 px-4">{member.email}</td>

                  <td className="py-3 px-4 max-w-xs">
                    {member.address.slice(0, 30)}...
                  </td>

                  <td className="py-3 px-4">
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-semibold">
                      {member.membershipType}
                    </span>
                  </td>

                  <td className="py-3 px-4 whitespace-nowrap">
                    {member.membershipStart}<center>to</center> 
                    {member.membershipEnd}
                  </td>

                  <td className="py-3 px-4 text-xs text-gray-600 max-w-xs break-all">
                    {member.paymentId ? member.paymentId.slice(0, 10) + '...' : 'No Payment ID'}
                  </td>

                  <td className="py-3 px-4">
                    <button
                      onClick={() => deleteMember(member.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="py-6 px-4 text-center text-gray-500"
                >
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffMembers;