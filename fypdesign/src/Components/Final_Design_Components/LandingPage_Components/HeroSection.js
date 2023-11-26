import React, { useState, useEffect, useRef } from 'react';

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






  return (



    <>
      <div className="my-container">
        <div className="text-div">

         



          <h2>Welcome To E-SPACE</h2>
          <Typewriter
            options={{
              strings: ['Empowering Education, Empowering You: Choose E-Space'],
              
              autoStart: true,
              loop: true,
              delay: 100,
              wrapperClassName: 'typewriter-wrapper', // Add a class to the wrapper element
            }}
          />
          {/* <p>Empowering Education, Empowering You: Choose E-Space</p> */}
          <button className="hjoin-button" onClick={handleJoinNow} style={{ border: '2px solid black' }}>
            Join now
          </button>
          <button className="hsign-button" onClick={handleSignIn} style={{ border: '2px solid black' }}>
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
      </div>



      <div className="hero-container">
        {/* <div className="hero">
      <div className="hcontent">
          <h1> Welcome To E-SPACE</h1>
          <p className="hdescription">Empowering Education, Empowering You: Choose E-Space</p>
         

          {/* <Typewriter  className="hdescription" text="Empowering Education, Empowering You: Choose E-Space" speed={100}/> */}
        {/* <button className="hjoin-button" onClick={handleJoinNow} style={{border: '2px solid black'}}>
              Join now
          </button>
          <button className="hsign-button" onClick={handleSignIn} style={{border: '2px solid black'}}>
              Sign In
          </button> */}

        {/* </div>
      <div className='heroimg'>
      <img  src='/images/ill5.jpg' alt="My Image Description" />
      </div>
      </div> */}
        {showSigninOptions && (
          <div className="signin-options" onClick={toggleSigninOptions}>
            <Signin />
          </div>
        )}

        {showRegistrationCard && !registrationComplete && (
          <div className="registration-card" >

            <div className="container mt-5 custom-container">
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="custom-popup" style={{ borderRadius: '20px', border: '3px solid black', padding: '10px', backgroundColor: '' }}>
                    <div className="card-body">
                      <i className="fa fa-times " onClick={toggleRegistrationCard} />
                      {/* <img className="custom-close-icon" onClick={toggleRegistrationCard} src={close}/> */}
                      <h2 className="custom-title text-center">Register as Teacher</h2>
                      <div className="form-group custom-form-group">
                        <input
                          type="text"
                          value={values.tname}
                          name="tname"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Teacher Name"
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
                        />
                      </div>

                      <div className="form-group custom-form-group">
                        <input
                          type="password"
                          name="password"
                          value={values.password}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Password"
                        />
                      </div>

                      <button className="custom-button"
                        onClick={handleReg}
                        style={{ borderRadius: '20px', fontSize: 'large', backgroundColor: '' }}
                      >
                        Sign Up
                      </button>

                      {error !== '' ? (
                        <div className="alert alert-danger mt-3">{error}</div>
                      ) : null}

                      <p className="text-center mt-3">Already have an account?</p>
                      <Link to="/teacher/login">Login here</Link>
                    </div>
                  </div>
                </div>
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
