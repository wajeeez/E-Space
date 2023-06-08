import React from "react";

import styles from "./Teacher.module.css";
import { useNavigate } from "react-router";
function Teacher() {

  const navigate= useNavigate('')
  return (
    <div>
    <div className={styles.main}>

      <h1>Teacher Page </h1>
      <p>Welcome to the advanced online real time teaching platform </p>

    </div>

    <div className={styles.part}>

    
      <button
        className={styles.login}
        onClick={() => navigate("/teacher/login")}
      >
        Login
      </button>
       
     

      <button
        className={styles.reg}
        onClick={() => navigate("/teacher/register")}
      >
        Register
      </button>

    </div>
  </div>
  );
}

export default Teacher;
