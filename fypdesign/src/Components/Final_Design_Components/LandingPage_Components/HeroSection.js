import React, { useState, useEffect, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

import { Reg } from '../../../api/internal';

import { setUser } from '../../../store/userSlice';

import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import Signin from './Signin_Options';
import Register from './Register';
import './HeroSection.css';
import close from '../../../Assets/images/cross.png';
import Typewriter from "typewriter-effect";
import { FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';


function HeroSection() {
  const [error, setError] = useState('');

  const [showRegistrationCard, setShowRegistrationCard] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [showSigninOptions, setShowSigninOptions] = useState(false);

  const toggleRegistrationCard = () => {
    setShowRegistrationCard(!showRegistrationCard);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleReg = async () => {
    const data = {
      tname: values.tname,
      institute: values.institute,
      phone: values.phone,
      email: values.email,
      password: values.password,
    };

    try {
      const response = await Reg(data);

      if (response.status === 409) {
        setError(response.response.data.message);
        setRegistrationComplete(false);
      } else if (response.status === 201) {
        const teacher = {
          _id: response.data.teacher._id,
          email: response.data.teacher.email,
          auth: response.data.teacher.auth,
        };

        dispatch(setUser(teacher));
        setRegistrationComplete(true);
        // navigate('/teacher/login');
      } else if (response.code === 'ERR_BAD_REQUEST') {
        setError(response.response.data.message);
        setRegistrationComplete(false);
      }
    } catch (error) {
      console.error(error);
      setRegistrationComplete(false);
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      tname: '',
      institute: '',
      phone: '',
      email: '',
      password: '',
    },
    // validationSchema: regSchema, // You can add your validation schema here
  });

  const handleJoinNow = () => {
    setShowSigninOptions(false); // Set Sign In to false
    toggleRegistrationCard(); // Toggle Join Now card
  };

  const handleSignIn = () => {
    setShowRegistrationCard(false); // Set Join Now to false
    setShowSigninOptions(!showSigninOptions); // Toggle Sign In card
  };

  const toggleSigninOptions = () => {
    setShowSigninOptions(!showSigninOptions);
  };


  const [type, setType] = useState('password');

  // validated states
  const [lowerValidated, setLowerValidated]=useState(false);
  const [upperValidated, setUpperValidated]=useState(false);
  const [numberValidated, setNumberValidated]=useState(false);
  const [specialValidated, setSpecialValidated]=useState(false);
  const [lengthValidated, setLengthValidated]=useState(false);

  const handleChangeP=(value)=>{
    const lower = new RegExp('(?=.*[a-z])');
    const upper = new RegExp('(?=.*[A-Z])');
    const number = new RegExp('(?=.*[0-9])');
    const special = new RegExp('(?=.*[!@#\$%\^&\*])');
    const length = new RegExp('(?=.{8,})')
    if(lower.test(value)){
      setLowerValidated(true);
    }
    else{
      setLowerValidated(false);
    }
    if(upper.test(value)){
      setUpperValidated(true);
    }
    else{
      setUpperValidated(false);
    }
    if(number.test(value)){
      setNumberValidated(true);
    }
    else{
      setNumberValidated(false);
    }
    if(special.test(value)){
      setSpecialValidated(true);
    }
    else{
      setSpecialValidated(false);
    }
    if(length.test(value)){
      setLengthValidated(true);
    }
    else{
      setLengthValidated(false);
    }
  }

  
  const [newPasswordFocus, setNewPasswordFocus] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);



  return (



    <>
      {/* <div className="my-container">
        <div className="hcontent">

         



          <h1 className='htitle'> Welcome To E&zwj;-&zwj;SPACE </h1>

          <Typewriter
          className='hdescription'
            options={{
              strings: ['Empowering Education, Empowering You: Choose E-Space'],
              
              autoStart: true,
              loop: true,
              delay: 100,
              wrapperClassName: 'typewriter-wrapper', // Add a class to the wrapper element
            }}
          />
          
          <button className="ljoin-button" onClick={handleJoinNow} >
            Join now
          </button>
          <button className="lsign-button" onClick={handleSignIn} >
            Sign In
          </button>
        </div>
        <div className="image-div">
          <img
            src="/images/ill5.jpg"
            alt="Your Image Alt Text"
            className="my-image"
          />
        </div>
      </div> */}


<div className="my-container">
  <Row>
    <Col md={6} className="d-flex align-items-center justify-content-center" >
      <div className="hcontent">
        <h1 className='htitle'> Welcome To E&zwj;-&zwj;SPACE </h1>
        <Typewriter
          
          options={{
            strings: ['Empowering Education, Empowering You : Choose E-Space'],
            autoStart: true,
            loop: true,
            delay: 100,
            wrapperClassName: 'typewriter-wrapper', // Add a class to the wrapper element
          }}
        />
        <button className="ljoin-button" onClick={handleJoinNow}>
          Join now
        </button>
        <button className="lsign-button" onClick={handleSignIn}>
          Sign In
        </button>
      </div>
    </Col>
    <Col md={6}>
      <div className="image-div">
        <img
          src="/images/ill5.jpg"
          alt="Your Image Alt Text"
          className="my-image"
        />
      </div>
    </Col>
  </Row>
</div>




      <div className="hero-container">
        {showSigninOptions && (
          <div className="signin-options" onClick={toggleSigninOptions} style={{overflow:'auto'}}>
            <Signin />
          </div>
        )}

      <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
{showRegistrationCard && !registrationComplete && (
          <div className="registration-card" >
            

            <div className="container-fluid custom-container" style={{minWidth:'300px',maxWidth:'600px',}}>

                  <div className="custom-popup" style={{ borderRadius: '20px', border: '3px solid silver', padding: '20px', backgroundColor: '' 
                      }}>

                    <center>
                      <i className="fa fa-times " onClick={toggleRegistrationCard} />
                      {/* <img className="custom-close-icon" onClick={toggleRegistrationCard} src={close}/> */}
                      <h1 style={{ fontFamily:'Poppins',padding:'5px' , color : 'black', borderRadius: '20px', 
                        marginBottom:'20px', fontWeight:'400',}}>
                          Register as Teacher</h1>
                      <div className="form-group custom-form-group">
                        <input
                          type="text"
                          value={values.tname}
                          name="tname"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Teacher Name"
                          style={{maxWidth:'320px', minWidth:'220px'  ,
                          fontSize:'16px', height:'50px' , borderRadius:'16px', marginBottom:'5px'
                         ,boxShadow: '0px 5px 10px  rgba(0, 0, 0, 0.4)' }}
                        />
                      </div>


                      <div className="form-group custom-form-group">
                        <input
                          type="text"
                          value={values.email}
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Email"
                          style={{maxWidth:'320px', minWidth:'220px'  ,
                          fontSize:'16px', height:'50px' , borderRadius:'16px', marginBottom:'5px'
                         ,boxShadow: '0px 5px 10px  rgba(0, 0, 0, 0.4)'}}
                        />
                      </div>

                      {/* <div className="form-group custom-form-group">
                        <input
                          type="password"
                          name="password"
                          value={values.password}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Password"
                          style={{maxWidth:'320px', minWidth:'220px'  ,
                          fontSize:'16px', height:'50px' , borderRadius:'16px', marginBottom:'5px'
                         ,boxShadow: '0px 5px 10px  rgba(0, 0, 0, 0.4)'}}
                        />
                      </div> */}

{newPasswordFocus && (
    <div style={{marginTop:'-10rem', position:'sticky'}} >
      <main className='tracker-box' style={{maxWidth: '320px',minWidth: '220px',fontSize:'0.9rem'}}>

        <div className={`validation-item ${lowerValidated ? 'validated' : 'not-validated'}`}>
          <span className={`list-icon ${lowerValidated ? 'green' : ''}`}>
          {lowerValidated ? <i className='bx bx-check-circle'></i> : <i class='bx bx-x-circle' ></i>}          </span>
          At least one lowercase letter
        </div>

        <div className={`validation-item ${upperValidated ? 'validated' : 'not-validated'}`}>
          <span className={`list-icon ${upperValidated ? 'green' : ''}`}>
          {upperValidated ? <i className='bx bx-check-circle'></i> : <i class='bx bx-x-circle' ></i>}          </span>
          At least one uppercase letter
        </div>
        <div className={`validation-item ${numberValidated ? 'validated' : 'not-validated'}`}>
          <span className={`list-icon ${numberValidated ? 'green' : ''}`}>
          {numberValidated ? <i className='bx bx-check-circle'></i> : <i class='bx bx-x-circle' ></i>}          </span>
          At least one number
        </div>
        <div className={`validation-item ${specialValidated ? 'validated' : 'not-validated'}`}>
          <span className={`list-icon ${specialValidated ? 'green' : ''}`}>
          {specialValidated ? <i className='bx bx-check-circle'></i> : <i class='bx bx-x-circle' ></i>}          </span>
          At least one special character
        </div>
        <div className={`validation-item ${lengthValidated ? 'validated' : 'not-validated'}`}>
          <span className={`list-icon ${lengthValidated ? 'green' : 'red'}`}>
          {lengthValidated ? <i className='bx bx-check-circle'></i> : <i class='bx bx-x-circle' ></i>}          </span>
          At least 8 characters
        </div>

      </main>
    </div>

)}

                      <div className="form-group custom-form-group">
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          value={values.password}
                          onBlur={(e) => {
                            handleBlur(e);
                            setNewPasswordFocus(false);
                          }}
                          onChange={(e) => {
                            handleChange(e);
                            handleChangeP(e.target.value);
                          }}
                          onFocus={() => setNewPasswordFocus(true)}
                          placeholder="Enter your password"
                          errormessage={errors.password}
                          style={{maxWidth:'320px', minWidth:'220px', 
                          fontSize:'16px', height:'50px' , borderRadius:'16px', marginBottom:'5px'
                         ,boxShadow: '0px 5px 10px  rgba(0, 0, 0, 0.4)'}}
                        />
                      </div>


                      <div className="form-group custom-form-group">
                        <input
                          type="text"
                          value={values.phone}
                          name="phone"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Phone"
                          style={{maxWidth:'320px', minWidth:'220px'  ,
                          fontSize:'16px', height:'50px' , borderRadius:'16px', marginBottom:'5px'
                         ,boxShadow: '0px 5px 10px  rgba(0, 0, 0, 0.4)'}}
                        />
                      </div>

                      <div className="form-group custom-form-group">
                        <input
                          type="text"
                          value={values.institute}
                          name="institute"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Institute"
                          style={{maxWidth:'320px', minWidth:'220px'  ,
                          fontSize:'16px', height:'50px' , borderRadius:'16px', marginBottom:'5px'
                         ,boxShadow: '0px 5px 10px  rgba(0, 0, 0, 0.4)'}}
                        />
                      </div>



                      <button className="custom-button"
                        onClick={handleReg}
                        style={{ fontFamily:'poppins',
                        borderRadius: '20px', fontSize: '20px', 
                        backgroundColor: '',letterSpacing:'2px',
                        fontWeight:'bold', marginBottom:'10px' }}
                      >
                        Sign Up
                      </button>

                      {error !== '' ? (
                        <div className="alert alert-danger mt-3">{error}</div>
                      ) : null}

                      <p className="text-center mt-3" style={{fontSize:'18px'}}>Already have an account?</p>
                      <Link to="/teacher/login" style={{fontSize:'18px'}}>Login here</Link>
                    
                      </center>

                    
                  </div>

            </div>


          </div>

        )}


        {registrationComplete && (
          <div className="registration-complete" style={{ textAlign: 'center' }}>
            <i className="fa fa-check-circle" style={{ color: 'green', fontSize: '50px' }}></i>

            <p style={{ color: 'green', fontSize: '50px', fontFamily: 'Raleway', }}>Registration Complete</p>
          </div>
        )}
      </div></>
  );
}

export default HeroSection;
