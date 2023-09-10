import React from 'react';
import './TeacherMain.css';
import './THeroSection.css';
import { Link } from 'react-router-dom';



import styles from "../../Final_Design_Components/TeacherDashboard_Components/TDashboard.module.css";





// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
function THeroSection() {

  const baseURL = process.env.React_App_INTERNAL_API_PATH;


  // const dispatch = useDispatch();

  // const isAuthenticated = useSelector((state) => state.user.auth);
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.removeItem("authToken");
    window.location.reload(false);
  };

  const [classes, setClasses] = useState([]);
  const [name, setName] = useState(null);
  const [id, setUserId] = useState(null);
  const [email, setEmail] = useState(null);

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
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  return (

    <div className='hero-container'>
      <h1 className='hero-heading'>CLASSES</h1>


      <center>
          <div >
            <p>
              Teacher Name : {name} | Teacher Email : {email}{" "}
            </p>
          </div>
          </center>

        <div style={{display: 'inline-block'}}>
        {classes.map((cls) => (

            <button className={styles.classes} key={cls._id} onClick={() => {
              navigate(`/teacher/class/${cls._id}`)
            }}>
              <h2 className='card-content'> {cls.subjectName} </h2>

            </button>
        
        ))}
      

     

      <button
        className={styles.logInButton}
        onClick={() => {
          navigate(`/teacher/createclass`);
        }}
      >
        Create A Class
      </button>

      <button className={styles.logout} onClick={handleLogout}>
        LOGOUT
      </button>

      </div>


    </div>





  );
}

export default THeroSection;

