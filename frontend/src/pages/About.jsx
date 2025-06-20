import React from 'react';

const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Us</h1>
        <p>Your trusted partner for corporate event management</p>
      </div>
      
      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            At Corporate Events Management, our mission is to create exceptional corporate events that drive business results. 
            We believe in the power of well-organized events to foster connections, inspire innovation, and accelerate growth.
          </p>
        </section>
        
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2020, Corporate Events Management emerged from a vision to transform how businesses approach event planning and execution. 
            What began as a small team of passionate event enthusiasts has grown into a comprehensive platform serving thousands of corporate clients.
          </p>
          <p>
            Our journey has been defined by our commitment to excellence, attention to detail, and dedication to creating meaningful experiences 
            that align with our clients' business objectives.
          </p>
        </section>
        
        <section className="about-section">
          <h2>What We Offer</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>Event Discovery</h3>
              <p>Browse and find corporate events that align with your professional interests and business goals.</p>
            </div>
            <div className="service-card">
              <h3>Seamless Booking</h3>
              <p>Reserve your spot at events with our easy-to-use booking system and secure payment processing.</p>
            </div>
            <div className="service-card">
              <h3>Event Management</h3>
              <p>For event organizers, we provide comprehensive tools to create, promote, and manage successful corporate events.</p>
            </div>
            <div className="service-card">
              <h3>Networking Opportunities</h3>
              <p>Connect with industry professionals and expand your business network through our curated events.</p>
            </div>
          </div>
        </section>
        
        <section className="about-section">
          <h2>Our Team</h2>
          <p>
            Behind Corporate Events Management is a diverse team of event planning experts, technology specialists, and customer service professionals 
            dedicated to delivering exceptional experiences for our clients.
          </p>
          <div className="team-grid">
            <div className="team-member">
              <div className="team-member-avatar"></div>
              <h3>Sarah Johnson</h3>
              <p>Chief Executive Officer</p>
            </div>
            <div className="team-member">
              <div className="team-member-avatar"></div>
              <h3>Michael Chen</h3>
              <p>Chief Technology Officer</p>
            </div>
            <div className="team-member">
              <div className="team-member-avatar"></div>
              <h3>Priya Patel</h3>
              <p>Head of Event Operations</p>
            </div>
            <div className="team-member">
              <div className="team-member-avatar"></div>
              <h3>David Rodriguez</h3>
              <p>Customer Experience Director</p>
            </div>
          </div>
        </section>
        
        <section className="about-section">
          <h2>Our Values</h2>
          <div className="values-container">
            <div className="value-item">
              <h3>Excellence</h3>
              <p>We strive for excellence in every aspect of our service, from event curation to customer support.</p>
            </div>
            <div className="value-item">
              <h3>Innovation</h3>
              <p>We continuously innovate to provide cutting-edge solutions for modern corporate event needs.</p>
            </div>
            <div className="value-item">
              <h3>Integrity</h3>
              <p>We operate with transparency and honesty in all our business practices and relationships.</p>
            </div>
            <div className="value-item">
              <h3>Customer Focus</h3>
              <p>Our clients' success is our success. We're dedicated to exceeding expectations.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
