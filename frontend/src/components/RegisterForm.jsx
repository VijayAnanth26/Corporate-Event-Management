import { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../services/Auth'; 
import '../assets/css/signup.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset messages
    setGeneralError('');
    setSuccessMessage('');
    
    if (validateForm()) {
      setIsLoading(true);
      
      try {
        await signUp({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        
        setSuccessMessage('Registration successful! Redirecting to login...');
        
        // Redirect to login after a short delay
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (error) {
        console.error("Error: ", error);
        
        if (error.response && error.response.data) {
          setGeneralError(error.response.data.message || 'Registration failed. Please try again.');
        } else {
          setGeneralError('Registration failed. Please try again later.');
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol col='10' md='6'>
          <form onSubmit={handleSubmit}>
            {generalError && (
              <div className="alert alert-danger" role="alert">
                {generalError}
              </div>
            )}
            
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}
            
            <MDBInput
              wrapperClass='mb-4'
              label='Full Name'
              id='name'
              type='text'
              size="lg"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <div className="text-danger mb-3">{errors.name}</div>}
            
            <MDBInput
              wrapperClass='mb-4'
              label='Email address'
              id='email'
              type='email'
              size="lg"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="text-danger mb-3">{errors.email}</div>}
            
            <MDBInput
              wrapperClass='mb-4'
              label='Password'
              id='password'
              type='password'
              size="lg"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="text-danger mb-3">{errors.password}</div>}
            
            <MDBInput
              wrapperClass='mb-4'
              label='Confirm Password'
              id='confirmPassword'
              type='password'
              size="lg"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <div className="text-danger mb-3">{errors.confirmPassword}</div>}
            
            <div className='text-center text-md-start mt-4 pt-2'>
              <MDBBtn
                type='submit'
                className="mb-0 px-5"
                size='lg'
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="d-flex align-items-center">
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Registering...
                  </span>
                ) : 'Register'}
              </MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">Already have an account? <Link to='/'>Login</Link></p>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default RegisterForm;
