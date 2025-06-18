// MyBookingPage.jsx
// import React from 'react';
// import BookingList from '../components/BookingList'; 

const MyBookingPage = () => {
  const allBookings = [
    { id: 1, eventName: 'Conference 2024', eventDate: '2024-03-15' },
    { id: 2, eventName: 'Product Launch Party', eventDate: '2024-04-01' },
  ];

  return (
    <div>
      <h2 className="mt-4 mb-3">My Bookings</h2>
      <div className="row">
        {allBookings.map((booking) => (
          <div key={booking.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{booking.eventName}</h5>
                <p className="card-text">Date: {booking.eventDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookingPage;
