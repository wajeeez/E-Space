import React from 'react';
// import './../../../Pages/Final_Design/Landing_Page/LandingPage.css';
import { Button } from './Button';
import './HeroSection.css';

import { useNavigate } from "react-router";


function HeroSection() {

  const navigate = useNavigate()
  return (
    <div className='hero-container'>
      

      <h1>WELCOME TO E-SPACE</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <div   onClick={  () =>{
        navigate("/teacher/register")
      }}>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          // path="/teacher/register"
        >
          Join Now
        </Button>
        </div>
      </div>
    </div>
  );
}




export default HeroSection;


/*
<video src='/videos/video-2.mp4' autoPlay loop muted />
*/





