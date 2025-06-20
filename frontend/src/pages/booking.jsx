import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import { getEventById, createBooking } from '../services/User';

const BookingPage = () => {
  const { id: eventId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    numberOfTickets: 1,
    totalAmount: 0,
    specialRequests: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId || eventId === 'undefined') {
        setError("Invalid event ID");
        setLoading(false);
        return;
      }

      try {
        const response = await getEventById(eventId);
        setEvent(response.data);
        setFormData(prev => ({
          ...prev,
          totalAmount: response.data.eventPrice || 0
        }));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event:', error);
        setError('Failed to load event details. Please try again later.');
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'numberOfTickets') {
      const tickets = parseInt(value) || 1;
      const maxTickets = event.participantsCount || 100;
      
      // Limit tickets to available capacity
      const validTickets = Math.min(Math.max(1, tickets), maxTickets);
      
      setFormData({
        ...formData,
        numberOfTickets: validTickets,
        totalAmount: validTickets * (event.eventPrice || 0)
      });
      
      // Clear error when user changes input
      if (formErrors.numberOfTickets) {
        setFormErrors({
          ...formErrors,
          numberOfTickets: ''
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.numberOfTickets || formData.numberOfTickets < 1) {
      errors.numberOfTickets = 'Please select at least 1 ticket';
    }
    
    if (formData.numberOfTickets > (event.participantsCount || 100)) {
      errors.numberOfTickets = `Maximum ${event.participantsCount || 100} tickets available`;
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError('You must be logged in to book an event');
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    
    try {
      const bookingData = {
        userId: user.id,
        eventId: event.eventId,
        numberOfTickets: formData.numberOfTickets,
        totalAmount: formData.totalAmount,
        bookingDate: new Date().toISOString().split('T')[0],
        description: formData.specialRequests || `Booking for ${event.eventName || 'event'}`,
        eventDate: event.eventDate,
        headcount: formData.numberOfTickets,
        amount: formData.totalAmount
      };
      
      const response = await createBooking(bookingData);
      
      if (response.data) {
        navigate(`/payment/${response.data.bookingId}`, { 
          state: { 
            bookingId: response.data.bookingId,
            eventName: event.eventName,
            amount: formData.totalAmount
          } 
        });
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      setError('Failed to create booking. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  if (!event) {
    return <ErrorAlert message="Event not found" />;
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/3">
            <img 
              className="h-48 w-full object-cover md:h-full" 
              src={event.eventImageUrl || "/src/assets/images/pexels-teddy-yang-2263436.jpg"}
              alt={event.eventName} 
            />
          </div>
          <div className="p-8 md:w-2/3">
            <div className="flex justify-between items-start">
              <div>
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  {formatDate(event.eventDate)}
                </div>
                <h2 className="mt-2 text-2xl font-bold text-gray-900">{event.eventName}</h2>
              </div>
              <div className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {event.eventType}
              </div>
            </div>
            
            <div className="mt-4 flex items-center text-gray-700">
              <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{event.eventVenue}</span>
            </div>
            
            <div className="mt-2 flex items-center text-gray-700">
              <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{event.eventTime}</span>
            </div>
            
            <div className="mt-4">
              <span className="text-gray-700">Price per ticket:</span>
              <span className="ml-2 text-xl font-bold text-gray-900">${event.eventPrice}</span>
            </div>
            
            <div className="mt-2">
              <span className="text-gray-700">Available seats:</span>
              <span className="ml-2 font-medium text-gray-900">{event.participantsCount}</span>
            </div>
          </div>
        </div>
        
        <div className="p-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Details</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="numberOfTickets" className="block text-gray-700 font-medium mb-2">
                Number of Tickets <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <button 
                  type="button"
                  onClick={() => handleInputChange({ target: { name: 'numberOfTickets', value: Math.max(1, formData.numberOfTickets - 1) } })}
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300 h-10 w-10 rounded-l-md flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
                <input
                  type="number"
                  id="numberOfTickets"
                  name="numberOfTickets"
                  min="1"
                  max={event.participantsCount || 100}
                  value={formData.numberOfTickets}
                  onChange={handleInputChange}
                  className={`w-20 px-4 py-2 border text-center ${formErrors.numberOfTickets ? 'border-red-500' : 'border-gray-300'} rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <button 
                  type="button"
                  onClick={() => handleInputChange({ target: { name: 'numberOfTickets', value: Math.min((event.participantsCount || 100), formData.numberOfTickets + 1) } })}
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300 h-10 w-10 rounded-r-md flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              {formErrors.numberOfTickets && (
                <p className="mt-1 text-sm text-red-500">{formErrors.numberOfTickets}</p>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="specialRequests" className="block text-gray-700 font-medium mb-2">
                Special Requests (Optional)
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                placeholder="Any special requirements or requests?"
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            
            <div className="mb-8">
              <h4 className="text-lg font-medium text-gray-900 mb-2">Order Summary</h4>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">
                    {formData.numberOfTickets} x Ticket{formData.numberOfTickets > 1 ? 's' : ''}
                  </span>
                  <span className="text-gray-900">${event.eventPrice * formData.numberOfTickets}</span>
                </div>
                <div className="border-t border-gray-200 my-2 pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${formData.totalAmount}</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="mr-4 px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
              >
                {submitting ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
