import React from "react";
import { Link } from "@mui/material";
import {Routes, Route, useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
  }
  from 'mdb-react-ui-kit';
  
let Login=()=>
{
    const navigate = useNavigate();
    const LoginButton = () => {
       navigate('/contacts/list');
    };

return(
    <MDBContainer fluid>
      <MDBRow>

        <MDBCol sm='6'>

          <div className='d-flex flex-row ps-5 pt-5'>
            <MDBIcon fas icon="user fa-2x me-3" style={{ color: '#709085' }}/>
            <span className="h2 fw-bold mb-1">Hello User!</span>
          </div>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

            <h3 className="fw-normal mb-1 ps-5 pb-3" style={{letterSpacing: '0.5px'}}>Log in to your account</h3>

            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Username' id='formControlLg' type='email' size="lg"/>
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='formControlLg' type='password' size="lg"/>

            <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg' onClick={LoginButton}>Login</MDBBtn>
            <p className='ms-5'>Don't have an account? <a href="signup" class="link-info">Sign Up</a></p>

          </div>

        </MDBCol>

        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img src="https://th.bing.com/th/id/R.c6e82da258dce5a30217033dbde63207?rik=dBk0x5%2b58Y76Lw&pid=ImgRaw&r=0"
            alt="Login image" className="w-75" style={{objectFit: 'cover', objectPosition: 'left'}} />
        </MDBCol>

      </MDBRow>

    </MDBContainer>
);
      

};

export default Login;
