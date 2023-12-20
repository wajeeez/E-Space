import React, { useState, useEffect } from 'react';
import logo from '../../../Assets/images/logo1.png';
import gplay from '../../../Assets/images/playstore2.png';
import aplay from '../../../Assets/images/appstore1.png';
import { Link } from 'react-router-dom';


function Footer() {
  
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const updateWindowSize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWindowSize);
    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, []);

  const textItemStyle = {
    margin: '5px 0',
    color: 'white', 
  };

  const headingStyle = {
    fontWeight: 'bold',
    fontFamily: 'Raleway, sans-serif', 
  };

  const paragraphStyle = {
    fontWeight: 400, 
    fontFamily: 'Poppons, sans-serif', 
    fontSize: '20px',
  };

  return (
    <footer className="container-fluid bg-black text-white p-3" >
      
        {isMobile ? (
        // Mobile Layout
        <>
        <div className="row">
          <div className="col flex-column text-center mb-3" style={{width:'100px'}}>
            <h5 style={headingStyle}>Company</h5>
            <div style={textItemStyle}>About Us</div>
          </div>
          <div className="col flex-column text-center mb-3" style={{width:'100px'}}>
            <h5 style={headingStyle}>Contact us</h5>
            <div style={textItemStyle}>Email Us</div>
            <div style={textItemStyle}>Feedback</div>
          </div>
        </div>
        <div className="row">
          <div className="col flex-column text-center mb-2" style={{width:'100px'}}>
            <h5 style={headingStyle}>Learn</h5>
            <div style={textItemStyle}>Privacy</div>
            <div style={textItemStyle}>Terms</div>
            <div style={textItemStyle}>FAQs</div>
          </div>

          <div className="col " style={{width:'100px'}}>
            <div className="d-flex flex-column align-items-center">
              <img src={logo} alt="Logo" style={{ width: '150px', height: 'auto', marginBottom: '10px' }} className="logo-img" />
            </div>
            <div className="d-flex flex-column align-items-center">
            <Link to="/">
              <img
                src={gplay}
                alt="store"
                style={{ width: '120px', height: '40px', marginBottom: '10px' }}
              />
              </Link>
              <Link to="/">
              <img
                src={aplay}
                alt="store"
                style={{ width: '100px', height: '30px', marginBottom: '20px' }}
              />
              </Link>
            </div>
          </div>

        </div>
          </>
      ) : (
        // Desktop Layout
        <div className="row">

          <div className="col-md-3 ">
            <div className="d-flex flex-column align-items-center">
              <img src={logo} alt="Logo" style={{ width: '200px', height: 'auto', marginBottom: '10px' }} className="logo-img" />
            </div>
            <div className="d-flex flex-column align-items-center">
            <Link to="/">
              <img
                src={gplay}
                alt="store"
                style={{ width: '140px', height: '50px', marginBottom: '10px' }}
              />
              </Link>
              <Link to="/">
              <img
                src={aplay}
                alt="store"
                style={{ width: '120px', height: '40px', marginBottom: '20px' }}
              />
              </Link>
            </div>

          </div>

          <div className="col-md-3 d-flex flex-column align-items-center">
            <h5 style={headingStyle}>Company</h5>
            <div style={textItemStyle}>About Us</div>
          </div>
          <div className="col-md-3 d-flex flex-column align-items-center">
            <h5 style={headingStyle}>Contact Us</h5>
            <div style={textItemStyle}>Email Us</div>
            <div style={textItemStyle}>Feedback</div>
          </div>
          <div className="col-md-3 d-flex flex-column align-items-center">
            <h5 style={headingStyle}>Learn</h5>
            <div style={textItemStyle}>Privacy</div>
            <div style={textItemStyle}>Terms</div>
            <div style={textItemStyle}>FAQs</div>
          </div>

        </div>
      )}

        <div className="row" style={{ borderTop: '4px solid white', paddingTop: '1rem' }}>
          <div className="col-md-12 text-center">
            <p style={paragraphStyle}>E-SPACE © 2023 All Rights Reserved.</p>
          </div>
        </div>

    </footer>
  );
}

export default Footer;
