import React from 'react';
import './TeacherMain.css';
import './THeroSection.css';
import { Link } from 'react-router-dom';
import Loader from '../../Loader/Loader';

import styles from "../../Final_Design_Components/TeacherDashboard_Components/TDashboard.module.css";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

function THeroSection() {
  const baseURL = process.env.React_App_INTERNAL_API_PATH;
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("authToken");
    window.location.reload(false);
  };

  const [classes, setClasses] = useState([]);
  const [name, setName] = useState(null);
  const [id, setUserId] = useState(null);
  const [email, setEmail] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      const decodedToken = jwt_decode(authToken);
      setUserId(decodedToken.id);
      setEmail(decodedToken.email);
      setName(decodedToken.name);

      // Fetch classes for the logged-in user from the server
      axios
        .get(baseURL + `/teacher/classes/${decodedToken.id}`)
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
  }, [id]);

  return (
    <>

    <div className='thero-container'>
      <div className='thero-heading'>
        <th>CLASSES</th>
      </div>
      {loading ? (
        <Loader /> // Display the loader while loading
      ) : (

        <>
        
        <center>
        <div>
          <p className='t-info-top'>
            Teacher Name : {name}   |   Teacher Email : {email}{" "}
          </p>
        </div>
      </center>

      <div className='thero-cards'>
        {classes.map((cls) => (
          <Link to={`/teacher/class/${cls._id}`} className='thero-card' key={cls._id}>
            <div className='thero-card-content'>
              <tc>{cls.subjectName}</tc>
            </div>
          </Link>
        ))}
      </div>

      

        <Link to='/teacher/createclass' className='thero-card1'>
          <div className='thero-card-content'>
            <h2>Create Class</h2>
          </div>
        </Link>
        <Link onClick={handleLogout} className='thero-card2'>
          <div className='thero-card-content'>
            <h2>Logout</h2>
          </div>
        </Link>
</>

      )}
    
        
      </div>
    
    </>
  );
}

export default THeroSection;



