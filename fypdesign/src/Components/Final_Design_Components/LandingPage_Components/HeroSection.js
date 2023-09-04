import React from 'react';
// import './../../../Pages/Final_Design/Landing_Page/LandingPage.css';
import { Button } from './Button';
import './HeroSection.css';



function HeroSection() {
  return (
    <div className='hero-container'>
      

      <h1>WELCOME TO E-SPACE</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          Join Now
        </Button>
        
      </div>
    </div>
  );
}




export default HeroSection;


/*
<video src='/videos/video-2.mp4' autoPlay loop muted />
*/





