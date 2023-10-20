import React from 'react';
import main from '../../../Assets/images/bg.jpg';

function Pic() {

  const containerStyle = {
    display: 'flex',
    width: '100%',
    borderRadius: '30px',
    marginTop: '0px',
    height: 'auto',
    padding: '50px',
    
    
  };

  const imgStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '30px',
  };

  return (
    <div style={containerStyle} className="himage-container">
      <img src={main} alt="Image description" style={imgStyle}  />
    </div>
  );
}

export default Pic;
