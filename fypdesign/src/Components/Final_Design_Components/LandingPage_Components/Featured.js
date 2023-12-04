import React from 'react';
import tea from '../../../Assets/images/t6.png';
import std from '../../../Assets/images/s8.png';
import './Featured.css'; // Import the CSS file

function Featured() {
    const imgStyle = {
      display: 'block',
      margin: '0 auto', // Center the image horizontally
      border: 'none', // Set border to none
    };
  
    return (
      <div className="container" style={{ background: '' }}>
        <div className="row">
          <div className="col-md-4 p-4 d-flex align-items-center">
            <img src={tea} className="img-rectangular" alt="Image 1" style={imgStyle} />
          </div>
          <div className="col-md-8 p-5 d-flex align-items-center">
            <div>
              <h5 className="ftitle">For Teachers:</h5>
              <p className="fdescription">
                <strong>Our software offers a plethora of 
                  exceptional features that cultivate a vibrant and 
                  conducive learning environment, empowering educators to 
                  inspire and engage their students effectively.</strong>
              </p>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-8 p-5 d-flex align-items-center">
            <div>
              <h5 className="ftitle">For Students:</h5>
              <p className="fdescription">
                <strong>Our software boasts an array of enriching 
                  features that foster a nurturing and dynamic learning ecosystem, 
                  facilitating a seamless and engaging educational experience.</strong>
              </p>
            </div>
          </div>
          <div className="col-md-4 p-4 d-flex align-items-center">
            <img src={std} className="img-rectangular" alt="Image 2" style={imgStyle} />
          </div>
        </div>
      </div>
    );
  }
  
export default Featured;
