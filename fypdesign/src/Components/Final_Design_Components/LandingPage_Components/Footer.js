import React from 'react';
import logo from '../../../Assets/images/logo1.png';
import gplay from '../../../Assets/images/playstore2.png';
import aplay from '../../../Assets/images/appstore1.png';

function Footer() {
  

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
    fontFamily: 'Raleway, sans-serif', 
    fontSize: '20px',
  };

  return (
    <footer className="bg-black text-white">
      <div className="container p-4">
        <div className="row">
          <div className="col-md-3 d-flex flex-column align-items-center">
            <div>
              <img src={logo} alt="Logo" style={{ width: '200px', height: 'auto', marginBottom: '30px' }} className="logo-img" />
            </div>
            <div className="d-flex flex-column align-items-center">
              <img
                src={gplay}
                alt="store"
                style={{ width: '150px', height: '60px', marginBottom: '10px' }}
              />
              <img
                src={aplay}
                alt="store"
                style={{ width: '150px', height: '50px', marginBottom: '20px' }}
              />
            </div>
          </div>
          <div className="col-md-3 d-flex flex-column align-items-center">
            <h5 style={headingStyle}>Company</h5>
            <div style={textItemStyle}>About</div>
            <div style={textItemStyle}>Blogs</div>
          </div>
          <div className="col-md-3 d-flex flex-column align-items-center">
            <h5 style={headingStyle}>Contact us</h5>
            <div style={textItemStyle}>Career</div>
            <div style={textItemStyle}>About</div>
            <div style={textItemStyle}>How we Work</div>
            <div style={textItemStyle}>Career</div>
          </div>
          <div className="col-md-3 d-flex flex-column align-items-center">
            <h5 style={headingStyle}>Learn</h5>
            <div style={textItemStyle}>Privacy</div>
            <div style={textItemStyle}>Terms</div>
            <div style={textItemStyle}>FAQs</div>
          </div>
        </div>
        <div className="row" style={{ borderTop: '4px solid white', paddingTop: '1rem' }}>
          <div className="col-md-12 text-center">
            <p style={paragraphStyle}>Espace © 2023 All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
