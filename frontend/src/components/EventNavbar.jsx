import { Nav, Navbar } from "rsuite";
import HomeIcon from '@rsuite/icons/legacy/Home';
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const EventNavbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    sessionStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Navbar>
      <Nav>
        {/* <Nav.Item>
          <NavLink to="/userprofile" style={{ textDecoration: 'none' }} as="div">Profile</NavLink>
        </Nav.Item> */}
        <Nav.Item>CORPORATEEVENTS</Nav.Item>
        {/* <Nav.Item>
          <NavLink to="/" style={{ textDecoration: 'none' }} as="div">Logout</NavLink>
        </Nav.Item> */}
      </Nav>
      <Nav>
        <Nav.Item icon={<HomeIcon />}>
          <NavLink to="/home" style={{ textDecoration: 'none' }} as="div">Home</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/events" style={{ textDecoration: 'none' }} as="div">Events</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/mybooking" style={{ textDecoration: 'none' }} as="div">My Bookings</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/myPayment" style={{ textDecoration: 'none' }} as="div">My Payments</NavLink>
        </Nav.Item>
      </Nav>
      <Nav pullRight>
        {username && (
          <Nav.Item>Welcome, {username}</Nav.Item>
        )}
        <Nav.Item>
          <NavLink to="/userprofile" style={{ textDecoration: 'none' }} as="div">Profile</NavLink>
        </Nav.Item>
        <Nav.Item onClick={handleLogout}>
          Logout
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default EventNavbar;
