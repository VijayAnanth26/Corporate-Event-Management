import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name || 'Admin'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Link to="/admin/events" className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md p-6 transition-colors">
            <div className="flex flex-col items-center">
              <i className="fas fa-calendar-alt text-4xl mb-2"></i>
              <h2 className="text-xl font-semibold">Manage Events</h2>
              <p className="text-center mt-2">Create, edit, and delete events</p>
            </div>
          </Link>
          
          <Link to="/admin/bookings" className="bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md p-6 transition-colors">
            <div className="flex flex-col items-center">
              <i className="fas fa-ticket-alt text-4xl mb-2"></i>
              <h2 className="text-xl font-semibold">View Bookings</h2>
              <p className="text-center mt-2">Manage all event bookings</p>
            </div>
          </Link>
          
          <Link to="/admin/users" className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg shadow-md p-6 transition-colors">
            <div className="flex flex-col items-center">
              <i className="fas fa-users text-4xl mb-2"></i>
              <h2 className="text-xl font-semibold">User Management</h2>
              <p className="text-center mt-2">View and manage user accounts</p>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/admin/events/create" className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <i className="fas fa-plus text-blue-500"></i>
              </div>
              <div>
                <h3 className="font-medium">Create New Event</h3>
                <p className="text-sm text-gray-600">Add a new event to the system</p>
              </div>
            </Link>
            
            <Link to="/admin/payments" className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <i className="fas fa-money-bill-wave text-green-500"></i>
              </div>
              <div>
                <h3 className="font-medium">Payment Reports</h3>
                <p className="text-sm text-gray-600">View all payment transactions</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 