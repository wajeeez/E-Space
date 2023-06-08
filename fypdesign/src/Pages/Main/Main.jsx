import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Main.module.css";
function Main() {

  const navigate = useNavigate("")

  return (
    <div>
      <div className={styles.main}>

        <h1>E-SPACE</h1>
        <p>An advanced online real time teaching platform </p>

      </div>

      <div className={styles.part}>

      
        <button
          className={styles.stdbutton}
          onClick={() => navigate("/std")}
        >
          Student
        </button>
         
       

        <button
          className={styles.teacherbtn}
          onClick={() => navigate("/teacher")}
        >
          Teacher
        </button>

      </div>
    </div>
  );
}

export default Main;
