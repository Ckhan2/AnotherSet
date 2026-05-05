import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import React, { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

const StripePayment = ({ plan, onClose }) => {
  const stripe = useStripe();
  const element = useElements();

  const [memberData, setMemberData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phoneNumber: '',
    membershipStart: '',
    membershipEnd: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const monthlyPrice = useMemo(() => Number(plan?.monthlyPrice ?? 0), [plan]);

  const calculateMonths = () => {
    if (!memberData.membershipStart || !memberData.membershipEnd) {
      return 1;
    }

    const startDate = new Date(memberData.membershipStart);
    const endDate = new Date(memberData.membershipEnd);

    if (endDate <= startDate) {
      return 0;
    }

    let months =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());

    if (endDate.getDate() > startDate.getDate()) {
      months += 1;
    }

    return months;
  };

  const selectedMonths = useMemo(
    () => calculateMonths(),
    [memberData.membershipStart, memberData.membershipEnd]
  );

  const totalPrice = useMemo(
    () => monthlyPrice * selectedMonths,
    [monthlyPrice, selectedMonths]
  );

  const totalPriceInCents = useMemo(
    () => Math.round(totalPrice * 100),
    [totalPrice]
  );

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#1f2937',
        '::placeholder': {
          color: '#9ca3af',
        },
      },
      invalid: {
        color: '#dc2626',
      },
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMemberData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
      setError('Stripe publishable key is not set.');
      return;
    }

    if (!stripe || !element) return;

    if (selectedMonths < 1) {
      setError('Membership end date must be after the start date.');
      return;
    }

    if (!Number.isInteger(selectedMonths)) {
      setError('Membership must be selected on a monthly basis.');
      return;
    }

    const cardElement = element.getElement(CardElement);

    if (!cardElement) {
      setError('Card element not found.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8080/api/users/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: memberData.firstName.trim(),
          lastName: memberData.lastName.trim(),
          address: memberData.address.trim(),
          email: memberData.email.trim(),
          phoneNumber: memberData.phoneNumber.trim(),
          membershipStart: memberData.membershipStart,
          membershipEnd: memberData.membershipEnd,
          membershipType: plan?.name?.toUpperCase() || 'BRONZE',
          amount: totalPriceInCents,
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed.');
      }

      const data = await response.json();

      const clientSecret =
        data.paymentClientSecret ||
        data.clientSecret ||
        data.paymentIntentClientSecret;

      if (!clientSecret) {
        throw new Error('Backend did not return paymentClientSecret.');
      }

      const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${memberData.firstName} ${memberData.lastName}`,
              email: memberData.email,
              phone: memberData.phoneNumber,
              address: {
                line1: memberData.address,
              },
            },
          },
        }
      );

      if (paymentError) {
        setError(paymentError.message);
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        onClose?.();
        toast.success('Payment successful! Membership activated.');
      } else {
        setError('Payment was not completed.');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="bg-gray-900 text-white px-6 py-5">
        <h2 className="text-2xl font-bold">Payment Information</h2>
        <p className="text-sm text-gray-300 mt-1">
          {plan?.name ? `${plan.name} Membership` : 'Selected Membership'} • $
          {monthlyPrice.toFixed(2)} / month
        </p>
        <p className="text-sm text-gray-300 mt-1">
          Duration: {selectedMonths || 0} month(s) • Total: ${totalPrice.toFixed(2)}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Member Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              value={memberData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <input
              type="text"
              name="lastName"
              value={memberData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <input
              type="email"
              name="email"
              value={memberData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <input
              type="tel"
              name="phoneNumber"
              value={memberData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <input
              type="date"
              name="membershipStart"
              value={memberData.membershipStart}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <input
              type="date"
              name="membershipEnd"
              value={memberData.membershipEnd}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <textarea
            name="address"
            value={memberData.address}
            onChange={handleChange}
            placeholder="Full Address"
            className="w-full mt-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            rows={3}
            required
          />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800 font-semibold">
            Monthly Plan Calculation
          </p>
          <p className="text-sm text-blue-700 mt-1">
            ${monthlyPrice.toFixed(2)} × {selectedMonths || 0} month(s) = ${totalPrice.toFixed(2)}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Card Payment</h3>

          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
            <CardElement options={cardElementOptions} />
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Payment will be securely confirmed using Stripe.
          </p>
        </div>

        <button
          type="submit"
          disabled={!stripe || isSubmitting || selectedMonths < 1}
          className={`w-full py-3 px-4 rounded-lg text-white font-bold transition ${
            isSubmitting || selectedMonths < 1
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Processing Payment...' : `Pay $${totalPrice.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
};

export default StripePayment;