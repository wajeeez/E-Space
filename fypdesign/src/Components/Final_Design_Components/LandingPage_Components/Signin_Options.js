

// import tea from '../../../Assets/images/t1.png';
// import std from '../../../Assets/images/w1.png';
// import './Signin_Opt.css';
// import React from 'react';
// import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

// const titleStyle = {
//   fontSize: '30px',
//   fontWeight: 'bold',
//   fontFamily: 'Raleway',
//   marginTop: '20px',
//   letterSpacing: '1px',

// };

// const centerStyle = {
//   display: 'flex',
//   justifyContent: 'center',
  
// };

// const header = {
//   fontSize: '60px',
//   fontWeight: 'bold',
//   fontFamily: 'Raleway',
//   marginBottom: '-10px',
//   letterSpacing: '1px',
// };

// const containerStyle = {
//   height: '100vh',
//   maxHeight: '100vh',
 
// };

// const SigninOptions = () => {
//   return (
//     <div style={containerStyle}  className="container">
//       <h1 style={header} className="text-center mt-4">Sign In As</h1>
//       <div style={centerStyle} className="row mt-4">
//         <div className="col-md-5">
//           <Link to="/teacher/login" className="text-decoration-none">
//             <div
//               className="card custom-scard"
//               style={{ borderRadius: '30px', margin: '20px' }}
//             >
//               <img
//                 src={tea}
//                 className="card-img-top rounded-top"
//                 alt="Card Image"
//               />
//               <div className="card-body text-center">
//                 <h5 className="c-title" style={titleStyle}>
//                   Teacher
//                 </h5>
//               </div>
//             </div>
//           </Link>
//         </div>
//         <div className="col-md-5">
//           <Link to="/std/login" className="text-decoration-none">
//             <div
//               className="card custom-scard"
//               style={{ borderRadius: '30px', margin: '20px' }}
//             >
//               <img
//                 src={std}
//                 className="card-img-top rounded-top"
//                 alt="Card Image"
//               />
//               <div className="card-body text-center">
//                 <h5 className="c-title" style={titleStyle}>
//                   Student
//                 </h5>
//               </div>
//             </div>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SigninOptions;






import tea from '../../../Assets/images/t1.png';
import std from '../../../Assets/images/w1.png';
import './Signin_Opt.css';
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const titleStyle = {
  fontSize: '30px',
  fontWeight: 'bold',
  fontFamily: 'Raleway',
  
  letterSpacing: '1px',

};

const centerStyle = {
  display: 'flex',
  justifyContent: 'center',
  
};

const header = {
  fontSize: '60px',
  fontWeight: 'bold',
  fontFamily: 'Raleway',
  marginBottom: '-10px',
  letterSpacing: '1px',
  color : 'white',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 1)',
};

const containerStyle = {
  marginTop : '-30px',
  maxHeight: '100vh',
 
};

const SigninOptions = () => {
  return (
    <div style={containerStyle}  className="container">
      <h1 style={header} className="text-center mt-4">Sign In As</h1>
      <div style={centerStyle} className="row mt-4">
        <div className="col-md-5">
          <Link to="/teacher/login" className="text-decoration-none">
            <div
              className="card custom-scard"
              style={{ borderRadius: '30px', margin: '20px' }}
            >
              <img
                src={tea}
                className="card-img-top rounded-top"
                alt="Card Image"
              />
              <div className="card-body text-center">
                <h5 className="c-title" style={titleStyle}>
                  Teacher
                </h5>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-5">
          <Link to="/std/login" className="text-decoration-none">
            <div
              className="card custom-scard"
              style={{ borderRadius: '30px', margin: '20px' }}
            >
              <img
                src={std}
                className="card-img-top rounded-top"
                alt="Card Image"
                style={{  padding: '10px 10px 10px 10px' , height: '100%' , width : '100%'}}
              />
              <div className="card-body text-center">
                <h5 className="c-title" style={titleStyle}>
                  Student
                </h5>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SigninOptions;
