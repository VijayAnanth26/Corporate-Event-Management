import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../services/Axios';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import { useAuth } from '../../hooks/useAuth';

const EventForm = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { isAdmin, user } = useAuth();
  const isEditMode = !!eventId;
  
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    location: '',
    date: '',
    price: '',
    availableSeats: '',
    imageUrl: '',
    eventType: '',
    duration: '',
  });
  
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  // Check if user is admin before loading the form
  useEffect(() => {
    if (!isAdmin) {
      setError("You don't have permission to create or edit events. Only admins can perform this action.");
    } else {
      console.log("Admin user confirmed:", user);
    }
  }, [isAdmin, user]);
  
  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!isEditMode) return;
      
      try {
        const response = await axios.get(`/api/v1/event/${eventId}`);
        const eventData = response.data;
        
        // Format date for input field (YYYY-MM-DD)
        const formattedDate = eventData.date 
          ? new Date(eventData.date).toISOString().split('T')[0]
          : '';
          
        setFormData({
          eventName: eventData.eventName || '',
          description: eventData.description || '',
          location: eventData.location || '',
          date: formattedDate,
          price: eventData.price || '',
          availableSeats: eventData.availableSeats || '',
          imageUrl: eventData.imageUrl || '',
          eventType: eventData.eventType || '',
          duration: eventData.duration || '',
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching event details:', err);
        setError('Failed to load event details. Please try again later.');
        setLoading(false);
      }
    };
    
    if (isAdmin) {
      fetchEventDetails();
    }
  }, [eventId, isEditMode, isAdmin]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Double-check admin status before submitting
    if (!isAdmin) {
      setError("You don't have permission to create or edit events. Only admins can perform this action.");
      return;
    }
    
    setSubmitting(true);
    setError(null);
    
    try {
      // Convert form data to match API expectations
      const eventPayload = {
        ...formData,
        price: parseFloat(formData.price),
        availableSeats: parseInt(formData.availableSeats, 10),
      };
      
      if (isEditMode) {
        await axios.put(`/api/v1/event/${eventId}`, eventPayload);
      } else {
        await axios.post('/api/v1/event/add', eventPayload);
      }
      
      // Redirect back to events list
      navigate('/admin/events');
    } catch (err) {
      console.error('Error saving event:', err);
      
      // Handle different error types
      if (err.response) {
        if (err.response.status === 403) {
          setError("Permission denied. You don't have admin privileges to perform this action.");
        } else {
          setError(`Failed to ${isEditMode ? 'update' : 'create'} event: ${err.response.data?.message || 'Server error'}`);
        }
      } else {
        setError(`Failed to ${isEditMode ? 'update' : 'create'} event. Please check your inputs and try again.`);
      }
      
      setSubmitting(false);
    }
  };
  
  if (loading) return <LoadingSpinner />;
  
  // If not admin, show error message
  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <ErrorAlert message="You don't have permission to access this page. Only admins can create or edit events." />
          <div className="mt-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {isEditMode ? 'Edit Event' : 'Create New Event'}
        </h1>
        
        {error && <ErrorAlert message={error} className="mb-6" />}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="eventName" className="block text-sm font-medium text-gray-700 mb-1">
                Event Name *
              </label>
              <input
                type="text"
                id="eventName"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter event name"
              />
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter event location"
              />
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price (₹) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter price"
              />
            </div>
            
            <div>
              <label htmlFor="availableSeats" className="block text-sm font-medium text-gray-700 mb-1">
                Available Seats *
              </label>
              <input
                type="number"
                id="availableSeats"
                name="availableSeats"
                value={formData.availableSeats}
                onChange={handleChange}
                required
                min="1"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter available seats"
              />
            </div>
            
            <div>
              <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">
                Event Type
              </label>
              <input
                type="text"
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter event type"
              />
            </div>
            
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                Duration (hours)
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter duration (e.g., 2 hours)"
              />
            </div>
            
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter image URL"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter event description"
            ></textarea>
          </div>
          
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate('/admin/events')}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ${
                submitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {submitting ? 'Saving...' : isEditMode ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm; 