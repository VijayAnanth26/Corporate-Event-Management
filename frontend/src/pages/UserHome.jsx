// import React from 'react';
import { Button } from 'rsuite';
import CustomCarousel from '../components/Carousel';
import '../assets/css/UserHome.css';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import EventNavbar from '../components/EventNavbar';
import '../assets/css/Footer.css';

const HomePage = () => {
  return (
    <div>
      <div>
        <EventNavbar />
      </div>
      <p />
      <div className="home-container">
        <header>
          <h1>Welcome to Corporate Events Management</h1>
          <p>Your One-Stop Solution for Seamless Event Planning</p>
        </header>
        <div className='carousel'>
          <div className='carousel-content'>
            <CustomCarousel />
          </div>
        </div>
        <p />
        <div className='features' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <div className='feature' style={{ display: 'inline-block', width: 300, marginTop: '30px', marginLeft: '30px' }}>
            <h2>Find Event Services</h2>
            <p>Browse a wide range of event services tailored to your needs.</p>
            <Button className='btn'>
              <Link to={'/findevents'} style={{ textDecoration: 'none' }}>
                Find Events
              </Link>
            </Button>
          </div>

          <div className='feature' style={{ display: 'inline-block', width: 300, marginTop: '30px', marginLeft: '30px' }}>
            <h2>Connect with Planners</h2>
            <p>Efficiently communicate with experienced event planners.</p>
            <Button className='btn'>
              <Link to={'/contact'} style={{ textDecoration: 'none' }}>
                Connect
              </Link>
            </Button>
          </div>
        </div>
        <br/>
        <section className="cta">
          <h2>Ready to Elevate Your Events?</h2>
          <p>Join us now and experience the next level of event management.</p>
          {/* <Button className="btn"></Button> */}
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
