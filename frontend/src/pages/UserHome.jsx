import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FeaturedEvents from "../components/FeaturedEvents";
import { getAllEvents } from "../services/User";

// Import images
import eventImage from "../assets/images/pexels-teddy-yang-2263436.jpg";
import corporateImage from "../assets/images/pexels-matheus-bertelli-3321793.jpg";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents();
        // Since there's no featured endpoint, we'll just take the first few events
        // or you could filter by some criteria if the events have a "featured" field
        const featuredEvents = response.data.slice(0, 6);
        setEvents(featuredEvents);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${eventImage})`,
            opacity: "0.3",
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              Corporate Events Management
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Discover and join our upcoming events to stay connected with the latest in corporate happenings.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/findevents"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300"
              >
                Explore Events
              </Link>
              <Link
                to="/contact"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white font-semibold py-3 px-6 rounded-md transition duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <FeaturedEvents events={events} loading={loading} />
          
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Our Platform</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our corporate events platform connects professionals with high-quality networking opportunities, 
                industry conferences, and skill-building workshops. We curate events that help you grow your 
                career and expand your professional network.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Easy event discovery and registration</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Secure payment processing</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Personalized event recommendations</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link
                  to="/about"
                  className="text-blue-600 font-semibold hover:text-blue-800 flex items-center"
                >
                  Learn more about us
                  <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={corporateImage}
                  alt="Corporate event"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from professionals who have attended our events.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-800 font-bold">JD</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">John Doe</h4>
                  <p className="text-sm text-gray-600">Marketing Director</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The networking opportunities at these events have been invaluable for my career growth. I've made connections that turned into business partnerships."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-800 font-bold">JS</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Jane Smith</h4>
                  <p className="text-sm text-gray-600">Tech Entrepreneur</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The quality of speakers and content at these corporate events is consistently excellent. I always leave with new insights and ideas for my business."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-800 font-bold">RJ</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Robert Johnson</h4>
                  <p className="text-sm text-gray-600">Finance Analyst</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The platform makes it incredibly easy to discover relevant events in my industry. The booking process is seamless and user-friendly."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
