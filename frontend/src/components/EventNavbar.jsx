import { Nav, Navbar } from "rsuite";
import HomeIcon from '@rsuite/icons/legacy/Home';
import { NavLink } from "react-router-dom";

const EventNavbar = () => {
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
          <NavLink to="/mybooking" style={{ textDecoration: 'none' }} as="div">My Bookings</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/myPayment" style={{ textDecoration: 'none' }} as="div">My Payments</NavLink>
        </Nav.Item>
      </Nav>
      <Nav pullRight>
        <Nav.Item>
          <NavLink to="/userprofile" style={{ textDecoration: 'none' }} as="div">Profile</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/" style={{ textDecoration: 'none' }} as="div">Logout</NavLink>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default EventNavbar;
