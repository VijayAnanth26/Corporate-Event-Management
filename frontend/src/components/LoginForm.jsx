import { useState, useEffect } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signIn } from '../services/Auth';
import '../assets/css/login.css';
import ErrorAlert from './ErrorAlert';
import LoadingSpinner from './LoadingSpinner';
import { useAuth } from '../hooks/useAuth';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading: authLoading, login } = useAuth();
  
  // Check if user is already logged in
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      navigate('/home');
    }
  }, [isAuthenticated, authLoading, navigate]);
  
  // Check for error message from redirect
  useEffect(() => {
    if (location.state && location.state.message) {
      setGeneralError(location.state.message);
    }
  }, [location]);

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleLogin = async () => {
    // Reset errors
    setEmailError('');
    setPasswordError('');
    setGeneralError('');
    
    // Validate email
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    
    // Validate password
    if (!password) {
      setPasswordError('Please enter your password.');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await signIn({ email, password });
      const token = response.data.token;
      const userData = response.data.userResponse;

      // Use the context login function
      login(userData, token);
      
      // Redirect to the page user was trying to access or home
      const redirectTo = location.state?.from?.pathname || '/home';
      navigate(redirectTo);
    } catch (error) {
      console.error("Login error:", error);
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
          setPasswordError("Invalid email or password. Please try again.");
        } else if (error.response.status === 403) {
          setGeneralError("Access denied. You don't have permission to log in.");
        } else {
          setGeneralError("Login failed. Please try again later.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        setGeneralError("No response from server. Please check your internet connection.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setGeneralError("Login failed. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return <LoadingSpinner />;
  }

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol col='4' md='6'>
          {generalError && (
            <ErrorAlert 
              message={generalError} 
              onDismiss={() => setGeneralError('')} 
            />
          )}
          
          <div className="d-flex flex-row align-items-center justify-content-center">
            <p className="lead fw-normal mb-0 me-3">Sign in with</p>
            <MDBBtn floating size='md' tag='a' className='me-2'>
              <MDBIcon fab icon='facebook-f' />
            </MDBBtn>
            <MDBBtn floating size='md' tag='a' className='me-2'>
              <MDBIcon fab icon='twitter' />
            </MDBBtn>
            <MDBBtn floating size='md' tag='a' className='me-2'>
              <MDBIcon fab icon='linkedin-in' />
            </MDBBtn>
          </div>

          <div className="divider d-flex align-items-center my-4">
          </div>

          <MDBInput 
            wrapperClass='mb-4' 
            label='Email address' 
            id='email' 
            type='email' 
            size="lg" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
          <div className="text-danger">{emailError}</div>

          <MDBInput 
            wrapperClass='mb-4' 
            label='Password' 
            id='password' 
            type='password' 
            size="lg" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />
          <div className="text-danger">{passwordError}</div>

          <div className="d-flex justify-content-between mb-4">
            <p/>
            <a href="/">Forgot password?</a>
          </div>

          <div className='text-center text-md-start mt-4 pt-2'>
            <MDBBtn 
              type='submit' 
              className="mb-0 px-5" 
              size='lg' 
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="d-flex align-items-center">
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Logging in...
                </span>
              ) : 'Login'}
            </MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <Link to='/register'>Register</Link></p>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default LoginForm;
