import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PaymentPage = () => {
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  const handleConfirmBooking = () => {
    // Perform any necessary actions for confirming the booking
    // ...

    // Set the confirmation status to true
    setBookingConfirmed(true);

    // Simulate a successful payment after confirmation
    setPaymentSuccessful(true);
  };

  return (
    <div className="container mt-6 mb-7">
      <div className="row justify-content-center">
        <div className="col-lg-12 col-xl-7">
          <div className="card">
            <div className="card-body p-5">
              {bookingConfirmed ? (
                <div>
                  <h2>{paymentSuccessful ? 'Payment Successful!' : 'Payment Failed!'}</h2>
                  <p className="fs-sm">
                    {paymentSuccessful
                      ? 'Thank you for your payment. Your booking is confirmed.'
                      : 'Payment failed. Please try again.'}
                  </p>
                  <Link to="/" className="btn btn-dark btn-lg card-footer-btn justify-content-center text-uppercase-bold-sm hover-lift-light">
                    Go to Home
                  </Link>
                </div>
              ) : (
                <div>
                  <h2>Event Booking Details</h2>
                  <p className="fs-sm">
                    Thank you for booking your spot for the upcoming event. Here are your booking details:
                  </p>

                  <div className="border-top border-gray-200 pt-4 mt-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="text-muted mb-2">Booking ID</div>
                        <strong>#12345</strong>
                      </div>
                      <div className="col-md-6 text-md-end">
                        <div className="text-muted mb-2">Booking Date</div>
                        <strong>Feb/15/22</strong>
                      </div>
                    </div>
                  </div>

                  <div className="border-top border-gray-200 mt-4 py-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="text-muted mb-2">Event Name</div>
                        <strong>
                          Awesome Event 2022
                        </strong>
                        <p className="fs-sm">
                          Venue: Event Center, City
                          <br />
                          Date: March 10, 2022
                        </p>
                      </div>
                      <div className="col-md-6 text-md-end">
                        <div className="text-muted mb-2">Booking Details</div>
                        <strong>
                          VIP Pass
                        </strong>
                        <p className="fs-sm">
                          Quantity: 2
                        </p>
                      </div>
                    </div>
                  </div>

                  <table className="table border-bottom border-gray-200 mt-3">
                    <thead>
                      <tr>
                        <th scope="col" className="fs-sm text-dark text-uppercase-bold-sm px-0">Item</th>
                        <th scope="col" className="fs-sm text-dark text-uppercase-bold-sm text-end px-0">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-0">VIP Pass (x2)</td>
                        <td className="text-end px-0">$120.00</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="mt-5">
                    <div className="d-flex justify-content-end">
                      <p className="text-muted me-3">Total Amount:</p>
                      <span>$120.00</span>
                    </div>
                  </div>

                  <Link to="#" onClick={handleConfirmBooking} className="btn btn-dark btn-lg card-footer-btn justify-content-center text-uppercase-bold-sm hover-lift-light">
                    Confirm Booking
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;