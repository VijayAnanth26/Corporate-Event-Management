import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import '../assets/css/paymentpage.css';

const PaymentPage = () => {
  const { id: bookingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Get booking details from location state using useMemo to avoid dependency issues
  const bookingDetails = useMemo(() => location.state || {}, [location.state]);
  
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
    paymentMethod: 'CREDIT_CARD'
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Check if we have a valid booking ID
    if (!bookingId || bookingId === 'undefined') {
      setError('Invalid booking information');
    }
    
    // Check if we have the required booking details
    if (!bookingDetails || !bookingDetails.amount) {
      setError('Missing booking details');
    }
  }, [bookingId, bookingDetails]);

  const formatCardNumber = (value) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Add space after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19);
  };
  
  const formatExpiryDate = (value) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format as MM/YY
    if (digits.length > 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    return digits;
  };
  
  const validateForm = () => {
    const errors = {};
    
    // Validate card number (should be 16 digits)
    const cardDigits = formData.cardNumber.replace(/\s/g, '');
    if (!cardDigits) {
      errors.cardNumber = 'Card number is required';
    } else if (cardDigits.length !== 16 || !/^\d+$/.test(cardDigits)) {
      errors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    
    // Validate cardholder name
    if (!formData.cardholderName.trim()) {
      errors.cardholderName = 'Cardholder name is required';
    }
    
    // Validate expiry date (should be in MM/YY format)
    if (!formData.expiryDate) {
      errors.expiryDate = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      errors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    } else {
      // Check if the card is not expired
      const [month, year] = formData.expiryDate.split('/');
      const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
      const currentDate = new Date();
      
      if (expiryDate < currentDate) {
        errors.expiryDate = 'Card has expired';
      }
    }
    
    // Validate CVV (should be 3 or 4 digits)
    if (!formData.cvv) {
      errors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      errors.cvv = 'Please enter a valid CVV (3-4 digits)';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    }
    
    // Format expiry date as MM/YY
    if (name === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    }
    
    // Limit CVV to 4 digits
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }
    
    setFormData({
      ...formData,
      [name]: formattedValue
    });
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError('You must be logged in to make a payment');
      return;
    }
    
    if (!bookingId || bookingId === 'undefined') {
      setError('No booking information found');
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call for demo purposes
      // In a real app, you would use the actual API call with the payment details:
      // const paymentDetails = {
      //   bookingId: bookingId,
      //   userId: user.id,
      //   amount: bookingDetails.amount,
      //   paymentDate: new Date().toISOString().split('T')[0],
      //   paymentMethod: formData.paymentMethod,
      //   cardNumber: formData.cardNumber.replace(/\s/g, '').slice(-4), // Store only last 4 digits
      //   cardholderName: formData.cardholderName,
      //   status: 'COMPLETED'
      // };
      // await createPayment(paymentDetails);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
      setLoading(false);
      
      // Redirect to success page after a short delay
      setTimeout(() => {
        navigate('/mybooking');
      }, 2000);
      
    } catch (error) {
      console.error('Error processing payment:', error);
      setError('Payment processing failed. Please try again.');
      setLoading(false);
    }
  };

  if (loading && !success) {
    return (
      <div className="payment-container">
        <div className="payment-card">
          <div className="payment-processing">
            <LoadingSpinner />
            <h3>Processing Payment</h3>
            <p>Please do not close this page...</p>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="payment-container">
        <div className="payment-card">
          <div className="payment-success">
            <div className="success-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Payment Successful!</h3>
            <p>Your booking has been confirmed.</p>
            <p>Redirecting to your bookings...</p>
          </div>
        </div>
      </div>
    );
  }

  // Get card type based on first digits
  const getCardType = () => {
    const cardNumber = formData.cardNumber.replace(/\s/g, '');
    
    if (/^4/.test(cardNumber)) return 'visa';
    if (/^5[1-5]/.test(cardNumber)) return 'mastercard';
    if (/^3[47]/.test(cardNumber)) return 'amex';
    if (/^6(?:011|5)/.test(cardNumber)) return 'discover';
    
    return '';
  };

  const cardType = getCardType();

  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="payment-header">
          <h2>Payment Details</h2>
          <div className="payment-amount">
            <span>Total Amount:</span>
            <span className="amount">₹{bookingDetails.amount || '0.00'}</span>
          </div>
        </div>
        
        {error && <ErrorAlert message={error} onDismiss={() => setError(null)} />}
        
        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <div className={`card-input-wrapper ${cardType}`}>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                className={formErrors.cardNumber ? 'error' : ''}
              />
              {cardType && (
                <div className="card-type-icon">
                  <span className={`card-type ${cardType}`}>{cardType}</span>
                </div>
              )}
            </div>
            {formErrors.cardNumber && <div className="error-text">{formErrors.cardNumber}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="cardholderName">Cardholder Name</label>
            <input
              type="text"
              id="cardholderName"
              name="cardholderName"
              value={formData.cardholderName}
              onChange={handleChange}
              placeholder="John Doe"
              className={formErrors.cardholderName ? 'error' : ''}
            />
            {formErrors.cardholderName && <div className="error-text">{formErrors.cardholderName}</div>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                className={formErrors.expiryDate ? 'error' : ''}
              />
              {formErrors.expiryDate && <div className="error-text">{formErrors.expiryDate}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="password"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="123"
                className={formErrors.cvv ? 'error' : ''}
              />
              {formErrors.cvv && <div className="error-text">{formErrors.cvv}</div>}
            </div>
          </div>
          
          <div className="form-group payment-method">
            <label>Payment Method</label>
            <div className="payment-options">
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="CREDIT_CARD"
                  checked={formData.paymentMethod === 'CREDIT_CARD'}
                  onChange={handleChange}
                />
                <span>Credit Card</span>
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="DEBIT_CARD"
                  checked={formData.paymentMethod === 'DEBIT_CARD'}
                  onChange={handleChange}
                />
                <span>Debit Card</span>
              </label>
            </div>
          </div>
          
          <div className="payment-security">
            <div className="security-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="security-text">
              <p>Your payment information is secure</p>
              <span>All transactions are encrypted and secure</span>
            </div>
          </div>
          
          <button type="submit" className="pay-button">
            Pay Now
          </button>
          
          <div className="payment-footer">
            <p>By clicking "Pay Now", you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;