import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import { cookieUtils } from '../utils/cookieUtils';

const getMonthKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

const getFixedYearRange = () => {
  const months = [];
  const start = new Date(2026, 3, 1);

  for (let i = 0; i < 12; i++) {
    const d = new Date(start.getFullYear(), start.getMonth() + i, 1);
    months.push(d);
  }

  return months;
};

const getMemberDate = (user) => {
  const rawDate = user.membershipStart || user.createdAt || user.updatedAt;

  if (!rawDate) return null;

  const parsed = new Date(rawDate);

  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const Dashboard = () => {
  const [gymMembers, setGymMembers] = useState([]);
  const [staffMembers, setStaffMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setErrorMessage('');

      try {
        const token = cookieUtils.getAuthToken();
        const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

        const [usersResponse, staffResponse] = await Promise.all([
          axios.get('http://localhost:8080/api/users', {
            headers: authHeaders,
          }),
          axios.get('http://localhost:8080/api/members', {
            headers: authHeaders,
          }),
        ]);

        setGymMembers(Array.isArray(usersResponse.data) ? usersResponse.data : []);
        setStaffMembers(Array.isArray(staffResponse.data) ? staffResponse.data : []);
      } catch (error) {
        console.error('Dashboard data fetch error:', error);
        setErrorMessage('Unable to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const paymentInsights = useMemo(() => {
    const totalPaidMembers = gymMembers.filter((member) =>
      Boolean(member.paymentId)
    ).length;

    const pendingPaymentMembers = gymMembers.length - totalPaidMembers;

    return {
      totalPaidMembers,
      pendingPaymentMembers,
    };
  }, [gymMembers]);

  const monthlyChartData = useMemo(() => {
    const monthDates = getFixedYearRange();

    const monthBuckets = monthDates.reduce((acc, date) => {
      const key = getMonthKey(date);

      acc[key] = {
        month: date.toLocaleString('en-US', {
          month: 'short',
          year: '2-digit',
        }),
        users: 0,
        payments: 0,
      };

      return acc;
    }, {});

    gymMembers.forEach((user) => {
      const memberDate = getMemberDate(user);

      if (!memberDate) return;

      const monthKey = getMonthKey(
        new Date(memberDate.getFullYear(), memberDate.getMonth(), 1)
      );

      if (!monthBuckets[monthKey]) return;

      monthBuckets[monthKey].users += 1;

      if (user.paymentId) {
        monthBuckets[monthKey].payments += 1;
      }
    });

    return monthDates.map((date) => monthBuckets[getMonthKey(date)]);
  }, [gymMembers]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 p-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
          <p className="text-slate-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 p-6 text-white shadow-lg">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          
        </div>

        {errorMessage && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Users</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {gymMembers.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total Staff Members
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {staffMembers.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Paid Members</p>
            <p className="mt-2 text-3xl font-bold text-emerald-600">
              {paymentInsights.totalPaidMembers}
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Pending Payment</p>
            <p className="mt-2 text-3xl font-bold text-amber-600">
              {paymentInsights.pendingPaymentMembers}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-900">
              Monthly Users vs Payments
            </h2>
            <p className="text-sm text-slate-500">
              April 2026 to March 2027
            </p>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fill: '#334155' }} />
                <YAxis allowDecimals={false} tick={{ fill: '#334155' }} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="users"
                  fill="#3b82f6"
                  radius={[6, 6, 0, 0]}
                  name="Users"
                />
                <Bar
                  dataKey="payments"
                  fill="#10b981"
                  radius={[6, 6, 0, 0]}
                  name="Payments"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;