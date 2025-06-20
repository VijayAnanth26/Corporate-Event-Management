import { useState, useEffect } from 'react';
import axios from '../../services/Axios';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import { Link } from 'react-router-dom';

const BookingTable = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/v1/booking/all');
        // Make sure we have an array, even if the API returns something else
        const bookingsData = Array.isArray(response.data) ? response.data : 
                          (response.data.content || response.data.data || []);
        setBookings(bookingsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load bookings. Please try again later.');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter(booking => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (booking.eventName && booking.eventName.toLowerCase().includes(searchTermLower)) ||
      (booking.userName && booking.userName.toLowerCase().includes(searchTermLower)) ||
      (booking.bookingId && String(booking.bookingId).toLowerCase().includes(searchTermLower))
    );
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Booking Management</h1>
        <Link to="/admin/dashboard" className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded">
          Back to Dashboard
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search bookings by event name, user name, or booking ID..."
          className="w-full p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Booking ID</th>
                <th className="py-3 px-6 text-left">Event</th>
                <th className="py-3 px-6 text-left">User</th>
                <th className="py-3 px-6 text-center">Date</th>
                <th className="py-3 px-6 text-center">Tickets</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking.bookingId} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {booking.bookingId}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {booking.eventName || 'N/A'}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {booking.userName || 'N/A'}
                    </td>
                    <td className="py-3 px-6 text-center">
                      {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-3 px-6 text-center">
                      {booking.numberOfTickets || 'N/A'}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <span className={`py-1 px-3 rounded-full text-xs ${
                        booking.status === 'CONFIRMED' 
                          ? 'bg-green-200 text-green-800' 
                          : booking.status === 'PENDING'
                            ? 'bg-yellow-200 text-yellow-800'
                            : 'bg-red-200 text-red-800'
                      }`}>
                        {booking.status || 'N/A'}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <button
                          className="transform hover:text-purple-500 hover:scale-110 mr-3"
                          title="View Details"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 px-6 text-center">
                    No bookings found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingTable; 