import React from "react";
import { useNavigate } from "react-router";
import styles from "./Std.module.css";
import { Link } from "react-router-dom";
function Std() {

  const navigate= useNavigate('')
  return (
    <div>
      <center>
        <h1 className={styles.main}>STUDENT PAGE</h1>

        <button className={styles.std} onClick={() => navigate("/std/login")}>
          Student
        </button>
      </center>
    </div>
  );
}

export default Std;
