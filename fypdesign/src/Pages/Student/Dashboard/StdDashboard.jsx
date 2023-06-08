import React from 'react'
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import styles from './StdDashboard.module.css'
import { useEffect, useState } from "react";
function StdDashboard() {

  const [email, setEmail] = useState(null);
  const [classes, setClasses] = useState([]);
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
        .get(`http://localhost:5000/student/classes/${decodedToken.email}`)
        .then((response) => {
          console.log(response.data.response);
          setClasses(response.data.response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);









  return (
    <div>
       <center>
        <h1>Student Dashboard PAGE</h1>

        {classes.map((cls) => (
            <button className={styles.classes} key={cls._id} onClick={()=>{
              navigate(`/student/class/${cls._id}`)
            }}>
              {cls.subjectName}
            </button>
          ))}



         <button className={styles.logout} onClick={handleLogout}>
            LOGOUT
          </button>
        </center>


    </div>
  )
}

export default StdDashboard
