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
import {  useNavigate } from 'react-router-dom';
// import { useState } from 'react';
import { signUp } from '../services/Auth'; 
import '../assets/css/Login.css';
// import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password === confirmPassword) {
        const response = await signUp({ name, email, password });
        if (response.status === 202) {
          navigate('/');
        }
      } else {
        setConfirmPasswordError("Your confirm password does not match");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput label='Your Name' id='name' type='text' className='w-100' value={name} onChange={(e) => setName(e.target.value)} />
                <div className="text-danger">{confirmPasswordError.name}</div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg'/>
                <MDBInput label='Your Email' id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <div className="text-danger">{confirmPasswordError.email}</div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput label='Password' id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="text-danger">{confirmPasswordError.password}</div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size='lg'/>
                <MDBInput label='Repeat your password' id='repeatPassword' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <div className="text-danger">{confirmPasswordError.repeatPassword}</div>
              </div>

              {/* <div className='mb-4'>
                <MDBCheckbox name='termsAccepted' id='termsAccepted' label='Accept all the terms and conditions' onChange={(e) => setConfirmPassword(e.target.value)} />
                <div className="text-danger">{confirmPasswordError.termsAccepted}</div>
              </div> */}

              <MDBBtn className='mb-4' size='lg' onClick={handleSubmit}>
                Register
              </MDBBtn>
            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='' fluid/>
            </MDBCol>

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
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Register;
