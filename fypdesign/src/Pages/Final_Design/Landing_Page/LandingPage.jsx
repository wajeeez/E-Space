import React from 'react';
import './LandingPage.css';

import Navbar from '../../../Components/Final_Design_Components/LandingPage_Components/Navbar';
import Cards from '../../../Components/Final_Design_Components/LandingPage_Components/Cards';
import HeroSection from '../../../Components/Final_Design_Components/LandingPage_Components/HeroSection';
import oldFooter from '../../../Components/Final_Design_Components/LandingPage_Components/oldFooter';
import Carousel from '../../../Components/Final_Design_Components/LandingPage_Components/Carousel';
import Featured from '../../../Components/Final_Design_Components/LandingPage_Components/Featured';
import Footer from '../../../Components/Final_Design_Components/LandingPage_Components/Footer';
import Pic from '../../../Components/Final_Design_Components/LandingPage_Components/pic';

function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      
      <Carousel/>
      <Featured/>
      <Footer/>
      
      
    </>
  );
}

export default LandingPage;