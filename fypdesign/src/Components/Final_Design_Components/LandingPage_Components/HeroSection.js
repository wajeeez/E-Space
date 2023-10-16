

// import { useNavigate } from "react-router";
// const navigate = useNavigate()

// src/components/HeroSection.js

import React from 'react';
import './HeroSection.css';
import main from '../../../Assets/images/home.jpg';

function HeroSection() {
  return (
    <div className='hero-container'>
      <div className='hcontent'>
        <h1 className='htitle'>Welcome to E-Space</h1>
        <p className='hdescription'>Empowering Education, Empowering You: Choose E-Space</p>
        <button className='hjoin-button'>Join now</button>
      </div>
      {/* <div className='himage-container'>
        <img src={main} alt='E-Space' />
      </div> */}
    </div>
  );
}


export default HeroSection;








/*
<video src='/videos/video-2.mp4' autoPlay loop muted />
*/





