
import EventSideNav from '../components/EventSideNav';
import AdminProfileComponent from './AdminProfile';
import ApexChart from '../components/Chart';
import '../assets/css/adminhome.css';

const AdminHome = () => {
  return (
    <div className="admin-home-container">
      <div className="event-side-nav">
        <EventSideNav />
      </div>
      <div className="admin-content">
        <div className="admin-profile">
          <AdminProfileComponent />
        </div>
        <div className="apex-chart">
          <ApexChart />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
