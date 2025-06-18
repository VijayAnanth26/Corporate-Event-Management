// Import necessary components and icons
import React from 'react';
import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import { Link } from 'react-router-dom';

const styles = {
  width: 240,
  display: 'inline-table',
  marginRight: 10,
};

const EventSideNav = ({ appearance, openKeys, onOpenChange, ...navProps }) => {

  const [expanded, setExpanded] = React.useState(true);

  return (
    <div style={styles}>
      <Sidenav
        appearance={appearance}
        expanded={expanded}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      >
        <Sidenav.Body>
          <Nav {...navProps}>
            <Nav.Item eventKey="1" active icon={<DashboardIcon />}>
              <Link to={'/adminhome'} style={{ textDecoration: 'none' }}>Dashboard</Link>
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<GroupIcon />}>
              <Link to={'/viewusergroup'} style={{ textDecoration: 'none' }}>User Group</Link>
            </Nav.Item>
            <Nav.Menu eventKey="3" title="Advanced" icon={<MagicIcon />}>
              <Nav.Item eventKey="3-1"><Link to={'/addevents'} style={{ textDecoration: 'none' }}>Add Events</Link></Nav.Item>
              <Nav.Item eventKey="3-3"><Link to={'/events'} style={{ textDecoration: 'none' }}>EventList</Link></Nav.Item>
              <Nav.Item eventKey="3-4"><Link to={'/viewbookings'} style={{ textDecoration: 'none' }}>View Bookings</Link></Nav.Item>
              <Nav.Item eventKey="3-4"><Link to={'/viewpayments'} style={{ textDecoration: 'none' }}>View Payments</Link></Nav.Item>
            </Nav.Menu>
            <Nav.Menu eventKey="4" title="Options" icon={<GearCircleIcon />}>
            {/* <Nav.Item eventKey="4-1">Settings</Nav.Item> */}
            <Nav.Item eventKey="4-2"><Link to={'/adminlogin'} style={{ textDecoration: 'none' }}>Logout</Link></Nav.Item>
            </Nav.Menu>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default EventSideNav;

              {/* <Nav.Item eventKey="4-1">Applications</Nav.Item>
              <Nav.Item eventKey="4-2">Channels</Nav.Item>
              <Nav.Item eventKey="4-3">Versions</Nav.Item>
              <Nav.Menu eventKey="4-5" title="Custom Action">
                <Nav.Item eventKey="4-5-1">Action Name</Nav.Item>
                <Nav.Item eventKey="4-5-2">Action Params</Nav.Item>
              </Nav.Menu> */}
//             </Nav.Menu>
//             </Nav>
//         </Sidenav.Body>
//       </Sidenav>
//     </div>
//   );
// };

// export default EventSideNav;