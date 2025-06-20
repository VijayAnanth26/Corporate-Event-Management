import { useState, useEffect } from 'react';
import axios from '../../services/Axios';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import { Link } from 'react-router-dom';

const PaymentTable = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/v1/payment/all');
        setPayments(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching payments:', err);
        setError('Failed to load payments. Please try again later.');
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const filteredPayments = payments.filter(payment => 
    payment.bookingId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.paymentId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Payment Management</h1>
        <Link to="/admin/dashboard" className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded">
          Back to Dashboard
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search payments by booking ID, user name, or payment ID..."
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
                <th className="py-3 px-6 text-left">Payment ID</th>
                <th className="py-3 px-6 text-left">Booking ID</th>
                <th className="py-3 px-6 text-left">User</th>
                <th className="py-3 px-6 text-center">Date</th>
                <th className="py-3 px-6 text-center">Amount</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <tr key={payment.paymentId} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {payment.paymentId}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {payment.bookingId}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {payment.userName}
                    </td>
                    <td className="py-3 px-6 text-center">
                      {new Date(payment.paymentDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6 text-center">
                      ₹{payment.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <span className={`py-1 px-3 rounded-full text-xs ${
                        payment.status === 'COMPLETED' 
                          ? 'bg-green-200 text-green-800' 
                          : payment.status === 'PENDING'
                            ? 'bg-yellow-200 text-yellow-800'
                            : 'bg-red-200 text-red-800'
                      }`}>
                        {payment.status}
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
                    No payments found matching your search criteria.
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

export default PaymentTable; 