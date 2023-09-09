import React from 'react';
import './Footer.css';


import Titems from './Titems';

function Signin_Options() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Sign In As ...
        </p>
        {/* <p className='footer-subscription-text'>
          "Unleash the Power of E-Space: Empowering First-Time Users with Exceptional Tutorials, Fostering Profound Understanding of Every Function. Discover the Full Potential of Our Software for an Inspirational Journey of Educational Excellence!"
        </p> */}
        
      </section>

      <section className='tcards'>
        <div className='t__container'>
          <div className='t__wrapper'>
            <ul className='t__items'>
            <Titems
              src='..\images\t.png'
              text='Teacher'
              
              path='/teacher/login'
            />
            <Titems
              src='..\images\s2.png'
              text='Student'
              
              path='/std/login'
            />
            </ul>
          </div>
        </div>
      </section>

      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
          
            <img src="../images/logo1.png" />
            <p class='website-rights'>E-SPACE © 2023</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Signin_Options;
