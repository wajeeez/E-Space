

import React from 'react';
import './StudentMain.css';
import './SHeroSection.css';
import { Link } from 'react-router-dom';
import Loader from '../../Loader/Loader';

import styles from "../../Final_Design_Components/TeacherDashboard_Components/TDashboard.module.css";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

function SHeroSection() {
  const baseURL = process.env.React_App_INTERNAL_API_PATH;
  const [email, setEmail] = useState(null);
  const [classes, setClasses] = useState([]);
  const [StudentName,setStudentName]=useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.removeItem("StdToken");
    window.location.reload(false);
  };

  useEffect(() => {
    const authToken = localStorage.getItem("StdToken");
    if (authToken) {
      const decodedToken = jwt_decode(authToken);
      setEmail(decodedToken.email);
    

      // Fetch classes for the logged-in user from the server
      axios
        .get(baseURL+`/student/studentData/${decodedToken.email}`)
        .then((response) => {
          console.log(response.data.response);
          setStudentName(response.data.response.stdName);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false)
        });
    }
  }, []);


  useEffect(() => {
    const authToken = localStorage.getItem("StdToken");
    if (authToken) {
      const decodedToken = jwt_decode(authToken);
      setEmail(decodedToken.email);
  
      // Fetch classes for the logged-in user from the server
      axios
        .get(baseURL+`/student/classes/${decodedToken.email}`)
        .then((response) => {
          console.log(response.data.response);
          setClasses(response.data.response);
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
          setLoading(false)
        });
    }
  }, []);

  return (
    <>


{loading ? (
        <Loader /> // Display the loader while loading
      ) : (



        <>
        
        <div className='thero-container'>
      <div className='shero-heading'>
        <th>CLASSES</th>
      </div>
      <center >
        <div>
          <p className='s-info-top'>
            Student Name : {StudentName}     |     Student Email : {email}{" "}
          </p>
        </div>
      </center>

      <div className='shero-cards'>
        {classes.map((cls) => (
          <Link to={`/student/class/${cls._id}`} className='shero-card' key={cls._id}>
            <div className='shero-card-content'>
              <tc>{cls.subjectName}</tc>
            </div>
          </Link>
        ))}
      </div>

      

        
        <Link onClick={handleLogout} className='shero-card2'>
          <div className='shero-card-content'>
            <h2>Logout</h2>
          </div>
        </Link>

        
      </div>
    
        
        
        </>
        
      )}

   
    </>
  );
}

export default SHeroSection;




