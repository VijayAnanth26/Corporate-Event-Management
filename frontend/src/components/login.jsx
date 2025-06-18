import { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/Login.css';

function Login() {
  const [accessToken, setAccessToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post("http://localhost:8181/api/v1/auth/login", { email, password });
      const token = response.data.token;
      const user = response.data.userResponse;

      setAccessToken(token);
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('username', email);  ``
      navigate('/home');
      console.log(token);
    } catch (error) {
      console.error("Error: ", error);
      alert("Password is Incorrect");
    }

    setEmailError('');
    
  };

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol col='4' md='6'>
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
            {/* <p className="text-center fw-bold mx-3 mb-0">User</p> */}
          </div>

          <MDBInput wrapperClass='mb-4' label='Email address' id='email' type='email' size="lg" onChange={(e) => setEmail(e.target.value)} />
          <div className="text-danger">{emailError}</div>

          <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' size="lg" onChange={(e) => setPassword(e.target.value)} />
          <div className="text-danger">{emailError}</div>

          <div className="d-flex justify-content-between mb-4">
            <p/>
            <a href="/">Forgot password?</a>
          </div>

          <div className='text-center text-md-start mt-4 pt-2'>
            <MDBBtn type='submit' className="mb-0 px-5" size='lg' onClick={handleLogin}>
              Login
            </MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <Link to='/register'>Register</Link></p>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
