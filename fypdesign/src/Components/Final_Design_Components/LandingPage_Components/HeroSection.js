

// import { useNavigate } from "react-router";
// const navigate = useNavigate()

// src/components/HeroSection.js

import React from 'react';
import './HeroSection.css';
import main from '../../../Assets/images/home.jpg';

function HeroSection() {
  return (
    <div className='hero-container'>
      <div className='content'>
        <h1 className='title'>Welcome to E-Space</h1>
        <p className='description'>Empowering Education, Empowering You: Choose E-Space</p>
        <button className='join-button'>Join now</button>
      </div>
      <div className='image-container'>
        <img src={main} alt='E-Space' />
      </div>
    </div>
  );
}


export default HeroSection;








/*
<video src='/videos/video-2.mp4' autoPlay loop muted />
*/





