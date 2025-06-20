import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import { getUserBookings } from '../services/User';

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const response = await getUserBookings(user.id);
        console.log("Bookings data:", response.data);
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to load your bookings. Please try again later.');
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Please log in to view your bookings.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="bg-white shadow overflow-hidden rounded-lg p-6 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No bookings found</h3>
          <p className="mt-1 text-gray-500">You haven't booked any events yet.</p>
          <div className="mt-6">
            <Link to="/findevents" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
              Browse Events
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {bookings.map((booking, index) => (
              <li key={booking.bookingId || `booking-${index}`}>
                <div className="px-4 py-5 sm:px-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{booking.description || 'Event Booking'}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.bookingStatus ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.bookingStatus ? 'CONFIRMED' : 'PENDING'}
                    </span>
                  </div>
                  
                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-gray-500">Booking Date</p>
                      <p className="text-sm font-medium text-gray-900">
                        {booking.submissionDate ? new Date(booking.submissionDate).toLocaleDateString() : 'Not available'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Event Date</p>
                      <p className="text-sm font-medium text-gray-900">
                        {booking.eventDate ? new Date(booking.eventDate).toLocaleDateString() : 'Not available'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Number of Attendees</p>
                      <p className="text-sm font-medium text-gray-900">{booking.headcount || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="text-sm font-medium text-gray-900">${booking.amount || 0}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-3">
                    <Link
                      to={`/payment/${booking.bookingId}`}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                      View Payment
                    </Link>
                    {!booking.bookingStatus && (
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
