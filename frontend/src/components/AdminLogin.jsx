import { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: '' });
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (formData.email.trim() === '' || !formData.email.includes('@')) {
      newErrors.email = 'Valid email is required';
    }
    if (formData.password.trim() === '') {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('Login successful:', formData);

    navigate('/adminhome');
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
            <p className="text-center fw-bold mx-3 mb-0">Admin</p>
          </div>

          <MDBInput wrapperClass='mb-4' label='Email address' id='email' type='email' size="lg" onChange={handleInputChange} />
          <div className="text-danger">{errors.email}</div>

          <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' size="lg" onChange={handleInputChange} />
          <div className="text-danger">{errors.password}</div>

          <div className="d-flex justify-content-between mb-4">
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='Remember me' />
            <a href="/">Forgot password?</a>
          </div>

          <div className='text-center text-md-start mt-4 pt-2'>
            <MDBBtn className="mb-0 px-5" size='lg' onClick={handleSubmit}>
              Login
            </MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-2">Are You User? <Link to={'/'} >Login</Link></p>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default AdminLogin;
