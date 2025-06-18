
import '../assets/css/About.css'; 
import EventNavbar from '../components/EventNavbar';

const AboutPage = () => {
  return (
    <div>
        <div><EventNavbar/></div>
        <div className="about-page">
      <section className="section-header">
        <h2>About Corporate Events Management</h2>
        <p>Your Trusted Partner for Seamless Event Experiences</p>
      </section>

      <section className="section-introduction">
        <h3>Who We Are</h3>
        <p>
          Corporate Events Management is a leading platform that connects event planners and organizers with a diverse range of services. We strive to make event planning and execution a breeze, providing a one-stop solution for all your corporate event needs.
        </p>
      </section>

      <section className="section-services">
        <h3>Our Services</h3>
        <p>
          From conferences and seminars to product launches and team-building events, we offer a comprehensive suite of services to cater to your unique requirements. Our platform brings together event planners and service providers, ensuring a smooth and efficient collaboration.
        </p>
      </section>

      <section className="section-features">
        <h3>Key Features</h3>
        <ul>
          <li>Service Listings for Event Planners</li>
          <li>User Authentication for Data Security</li>
          <li>Efficient Event Search for Corporate Clients</li>
          <li>Seamless Event Booking and Confirmation</li>
          <li>Intuitive Event Planner Dashboard</li>
          {/* Add more features as needed */}
        </ul>
      </section>

      <section className="section-contact">
        <h3>Contact Us</h3>
        <p>
          Have questions or need assistance? Reach out to our support team at support@corporateevents.com.
        </p>
      </section>
    </div>
    </div>
  );
};

export default AboutPage;
