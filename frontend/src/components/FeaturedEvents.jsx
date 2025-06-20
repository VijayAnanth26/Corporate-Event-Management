import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllEvents } from '../services/User';
import ErrorAlert from './ErrorAlert';
import LoadingSpinner from './LoadingSpinner';

const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log('Fetching events for FeaturedEvents component...');
        const response = await getAllEvents();
        console.log('Events fetched successfully:', response.data);
        // Get only the first 3 events for the cards
        setEvents(response.data.slice(0, 3));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
        setLoading(false);
        
        // Add fallback data for development/testing
        setEvents([
          {
            eventId: 1,
            eventName: "Sample Conference",
            eventDescription: "This is a sample event for testing",
            eventDate: "2023-12-25",
            eventTime: "10:00 AM",
            eventVenue: "Sample Venue",
            eventPrice: 1000,
            eventImageUrl: null
          },
          {
            eventId: 2,
            eventName: "Sample Workshop",
            eventDescription: "This is another sample event for testing",
            eventDate: "2023-12-26",
            eventTime: "2:00 PM",
            eventVenue: "Sample Venue 2",
            eventPrice: 500,
            eventImageUrl: null
          },
          {
            eventId: 3,
            eventName: "Sample Meetup",
            eventDescription: "This is a third sample event for testing",
            eventDate: "2023-12-27",
            eventTime: "4:00 PM",
            eventVenue: "Sample Venue 3",
            eventPrice: 200,
            eventImageUrl: null
          }
        ]);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  // If error but we want to show a placeholder instead of error message
  const showPlaceholderContent = error && (!events || events.length === 0);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Featured Events</h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Discover our most popular corporate events and secure your spot today
          </p>
        </div>

        {error && <ErrorAlert message={error} onDismiss={() => setError(null)} />}

        {showPlaceholderContent ? (
          // Placeholder content when there's an error or no events
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((placeholder) => (
              <div 
                key={placeholder}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-16 bg-gray-200 rounded mb-4"></div>
                  <div className="flex items-center justify-between">
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Actual event cards
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => (
              <div 
                key={event.eventId || index} 
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  {/* Use a placeholder image if eventImageUrl is not available */}
                  <img
                    src={event.eventImageUrl || 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
                    alt={event.eventName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-2 rounded-full text-sm font-medium">
                    {new Date(event.eventDate).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="p-6">
                  <Link to={`/event/${event.eventId}`} className="hover:text-blue-600 transition-colors">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.eventName}</h3>
                  </Link>
                  
                  <div className="flex items-center text-gray-600 mb-2">
                    <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{event.eventVenue}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{event.eventTime}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.eventDescription}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-bold">₹{event.eventPrice}</span>
                    <div className="flex space-x-2">
                      <Link 
                        to={`/event/${event.eventId}`}
                        className="inline-flex items-center px-3 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Details
                      </Link>
                      <Link 
                        to={`/booking/${event.eventId}`}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-10 text-center">
          <Link 
            to="/findevents"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View All Events
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedEvents;
