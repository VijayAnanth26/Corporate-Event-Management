
import EventSideNav from "../components/EventSideNav";
import Pagination from "../components/Pagination";


const BookingTable = () => {
  const bookings = [
    { id: 1, eventName: 'Conference 2024', date: '2024-03-15', quantity: 5 },
    { id: 2, eventName: 'Product Launch Party', date: '2024-04-10', quantity: 10 },
    { id: 3, eventName: 'Seminars Showcase', date: '2024-05-20', quantity: 8 },
    { id: 4, eventName: 'Team-Building Extravaganza', date: '2024-06-05', quantity: 15 },
    { id: 5, eventName: 'Corporate Training Workshops', date: '2024-07-15', quantity: 12 },
    { id: 6, eventName: 'Networking Mixer', date: '2024-08-20', quantity: 20 },

  ];

  return (
        <div style={{ display : 'flex' }} >
    <div>
<EventSideNav/>
        </div>
        <div style={{ width: '100%' }}>
      <h2>Event Bookings</h2>
      <table id="bookingTable" >
        <thead>
          <tr>
            <th>ID</th>
            <th>Event Name</th>
            <th>Date</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.eventName}</td>
              <td>{booking.date}</td>
              <td>{booking.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination/>
    </div>
    </div>
  );
};

export default BookingTable;

