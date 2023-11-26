import React from 'react';


const MiddleImage = () => {

    
        const containerStyle = {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'auto',
          marginTop:"50px" // Optional: Adjust the height based on your layout
        };
      
        const imageStyle = {
          maxWidth: '100%',
          maxHeight: '100%',
        };



  return (
    <div style={containerStyle}>
   
      {/* <img src='/images/ill5.jpg' alt="My Image Description" style={imageStyle}/> */}
    </div>
  );
};

export default MiddleImage;