import { useState, useEffect } from 'react';
import axios from '../../services/Axios';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import { Link } from 'react-router-dom';

const EventTable = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/v1/event/all');
        // Make sure we have an array, even if the API returns something else
        const eventsData = Array.isArray(response.data) ? response.data : 
                          (response.data.content || response.data.data || []);
        setEvents(eventsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      try {
        await axios.delete(`/api/v1/event/${eventId}`);
        setEvents(events.filter(event => event.eventId !== eventId));
      } catch (err) {
        console.error('Error deleting event:', err);
        alert('Failed to delete event. Please try again later.');
      }
    }
  };

  const filteredEvents = events.filter(event => 
    event.eventName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Event Management</h1>
        <div className="flex gap-4">
          <Link to="/admin/events/create" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
            Create New Event
          </Link>
          <Link to="/admin/dashboard" className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded">
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search events by name, location, or description..."
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
                <th className="py-3 px-6 text-left">Event Name</th>
                <th className="py-3 px-6 text-left">Location</th>
                <th className="py-3 px-6 text-center">Date</th>
                <th className="py-3 px-6 text-center">Price</th>
                <th className="py-3 px-6 text-center">Available Seats</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <tr key={event.eventId} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {event.eventName}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {event.location}
                    </td>
                    <td className="py-3 px-6 text-center">
                      {event.date ? new Date(event.date).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-3 px-6 text-center">
                      {event.price !== undefined && event.price !== null ? 
                        `₹${Number(event.price).toFixed(2)}` : 'N/A'}
                    </td>
                    <td className="py-3 px-6 text-center">
                      {event.availableSeats ?? 'N/A'}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <Link
                          to={`/admin/events/view/${event.eventId}`}
                          className="transform hover:text-blue-500 hover:scale-110 mr-3"
                          title="View Details"
                        >
                          <i className="fas fa-eye"></i>
                        </Link>
                        <Link
                          to={`/admin/events/edit/${event.eventId}`}
                          className="transform hover:text-yellow-500 hover:scale-110 mr-3"
                          title="Edit Event"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                        <button
                          onClick={() => handleDeleteEvent(event.eventId)}
                          className="transform hover:text-red-500 hover:scale-110"
                          title="Delete Event"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 px-6 text-center">
                    No events found matching your search criteria.
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

export default EventTable; 