import React from 'react';
import './LandingPage.css';

import Navbar from '../../../Components/Final_Design_Components/LandingPage_Components/Navbar';
import Cards from '../../../Components/Final_Design_Components/LandingPage_Components/Cards';
import HeroSection from '../../../Components/Final_Design_Components/LandingPage_Components/HeroSection';
import Footer from '../../../Components/Final_Design_Components/LandingPage_Components/Footer';
import Carousel from '../../../Components/Final_Design_Components/LandingPage_Components/Carousel';


function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Carousel/>
      <Cards />
      <Footer />  
      
      
    </>
  );
}

export default LandingPage;