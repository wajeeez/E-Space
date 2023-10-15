import React, { useEffect, useState } from "react";
import "./Shome.css";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import headerimg from '../../../Assets/images/img.png';
import ijoin from '../../../Assets/images/startmeet1.png';
import iclass from '../../../Assets/images/audience1.png';

function Shome() {
    const baseURL = process.env.React_App_INTERNAL_API_PATH;
    const navigate = useNavigate()
    const [std, setStd] = useState([]);
    const [email, setEmail] = useState(null);
    const [classes, setClasses] = useState([]);
    const { _id } = useParams()
  
   

    useEffect(() => {
        const authToken = localStorage.getItem("StdToken");
        if (authToken) {
          const decodedToken = jwt_decode(authToken);
          setEmail(decodedToken.email);
    
          // Fetch classes for the logged-in user from the server
          axios
            .get(baseURL + `/student/studentData/${decodedToken.email}`)
            .then((response) => {
              console.log(response.data.response);
              setStd(response.data.response.stdName);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }, []);

  const handleRedirect = () => {
    // Redirect to the third-party URL
    window.location.href = `http://localhost:3030/${_id}`;
  };

  return (
    <div className="container-fluid" style={{ marginLeft: '0px' , maxWidth : '97%'}}>
      {/* First row covering full width */}
      <div className="row">
        
          <div className="p-3">
            {/* Bootstrap Card */}
            <div className="card text-white " style={{ backgroundColor: '#1c6ad8', borderRadius: '20px' }}>
              {/* Card Body */}
              <div className="card-body">
                {/* Left Side (Heading and Description) */}
                <div className="d-flex justify-content-between align-items-center">
                  <div style={{ marginLeft: '20px' }}>
                    <h2 className="card-title" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Hi, {std}</h2>
                    <p className="card-text" style={{ fontFamily: 'Helvetica, sans-serif', fontSize: '18px', fontWeight: 'normal' }}>Welcome Back</p>
                  </div>
                  {/* Right Side (Image) */}
                  <div>
                    <img
                      src={headerimg} // Replace with your image source
                      alt="Card Image"
                      className="img-fluid"
                      style={{ width: '150px', height: '150px', marginRight: '30px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* End of Bootstrap Card */}
          </div>
        
      </div>

      {/* Second row */}
      <div className="row">
        <div className="col-8">
          
            <div className="row">
              <div className="col-md-3">
                <div className="card h-100 text-white" style={{ backgroundColor: '#1c6ad8', borderRadius: '20px' }}>
                <div className="card-body" style={{ textAlign: 'center' }}>
                    <h5 className="card-title" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Meeting</h5>
                    <img src={ijoin} alt="Meeting Image" className="img-fluid" style={{ marginTop: '3px' , marginBottom: '3px' }} />
                    <p className="card-text"style={{ fontFamily: 'Helvetica, sans-serif' }}>Start</p>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card h-100 text-white" style={{ backgroundColor: '#1c6ad8', borderRadius: '20px' }}>
                <div className="card-body" style={{ textAlign: 'center' }}>
                    <h5 className="card-title" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Class</h5>
                    <img src={iclass} alt="Class Image" className="img-fluid" style={{ marginTop: '3px' , marginBottom: '3px' }}/>
                    <p className="card-text" style={{ fontFamily: 'Helvetica, sans-serif' }}>Class Name</p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card h-100 text-white" style={{ backgroundColor: '#1c6ad8', borderRadius: '20px' }}>
                <div className="card-body" style={{ textAlign: 'center' }}>
                    <h5 className="card-title" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Class Attendance</h5>
                    <h2 className="card-title" style={{ fontFamily: 'Arial, sans-serif', color: 'white', fontWeight: 'bold' , marginTop: '10px' , marginBottom: '10px'}}>70%</h2>
                    <p className="card-text" style={{ fontFamily: 'Helvetica, sans-serif' }}>Total Attendance</p>
                  </div>
                </div>
              </div>

              
                <div className="col-md-12"  style={{ marginTop: '30px' , maxHeight: '200px'}}>
                  <div className="card h-300 text-white" style={{ backgroundColor: '#1c6ad8', borderRadius: '20px' }}>
                    <div className="card-body" style={{ textAlign: 'center' }}>
                    <h5 className="card-title" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>demo</h5>
                    
                  
                </div>
              </div>
              </div>
            </div>
          
        </div>

        {/* Single column running alongside the 2nd row on the right */}
        <div className="col-4" style={{ maxHeight: '400px'}}>
          <div className="p-3 text-white " style={{ backgroundColor: '#1c6ad8' , borderRadius: '20px'}}>
          
            <div className="card-header sticky-top " style={{ fontSize: '30px' , fontFamily: 'Arial, sans-serif', fontWeight: 'bold', textAlign: 'center' , marginBottom:'5px'}}>
              Notifications
            </div>
            <div className="card-body text-white" style={{ maxHeight: '400px' ,overflowY: 'auto', fontFamily: 'Helvetica, sans-serif' }}>
              {/* Notification Rows */}
              <div className="alert alert-primary mb-1">
                Notification 1
              </div>
              <div className="alert alert-primary mb-1">
                Notification 2
              </div>
              <div className="alert alert-primary mb-1">
                Notification 3
              </div>
              <div className="alert alert-primary mb-1">
                Notification 4
              </div>
              <div className="alert alert-primary mb-1">
                Notification 5
              </div>
              <div className="alert alert-primary mb-1">
                Notification 6
              </div>
              <div className="alert alert-primary mb-1">
                Notification 7
              </div>
              
              {/* Add more notifications as needed */}
            
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shome;
