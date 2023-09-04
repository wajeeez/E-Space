import React from "react";
import { Link } from "react-router-dom";
import styles from "./TDashboard.module.css";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
function TDashboard() {

  
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
        .get(`http://localhost:5000/teacher/classes/${decodedToken.id}`)
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
    <div>
      <center>
        <div className={styles.Intro}>
          <p>
            Teacher Name : {name} | Teacher Email : {email}{" "}
          </p>
        </div>

        <div>
          {classes.map((cls) => (
            <button className={styles.classes} key={cls._id} onClick={()=>{
              navigate(`/teacher/class/${cls._id}`)
            }}>
              {cls.subjectName}
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
      </center>
    </div>
  );
}

export default TDashboard;
