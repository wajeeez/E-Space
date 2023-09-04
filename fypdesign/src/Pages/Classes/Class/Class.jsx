import React, { useEffect, useState } from "react";

import styles from "./Class.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Class() {
  
  const baseURL = process.env.React_App_INTERNAL_API_PATH;

  const navigate = useNavigate()
  const [name, setName] = useState(null);
  const [std, setStd] = useState([]);
  const [email, setEmail] = useState(null);
  const [classes, setClasses] = useState([]);
  const { _id } = useParams();
  const handleRedirect = () => {
    // Redirect to the third-party URL
    window.location.href = `http://localhost:3030/${_id}`;
  };

  useEffect(() => {
    axios
      .get(baseURL+`/teacher/class/${_id}`)
      .then((response) => {
        setStd(response.data.response.students);
        setName(response.data.response.teacherName);
        setClasses(response.data.response.subjectName);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <center>
        <p className={styles.Intro}>
          Teacher Name : {name} | Class: {classes}
        </p>
        <br />
        <br />
        <br />
        <br />
        {/* Start Meeting Using API Runing  */}
        <button className={styles.meet}
          onClick={()=>{
            navigate(`/${classes}/meeting/${_id}`)
          }}
        >Start Meeting 1</button>

        {/* Start Meeting using Custom Code Socket.io */}
        <button className={styles.meet} 
        onClick={handleRedirect}
        // onClick={()=>{
        // //  navigate(`/custom/${classes}/meeting/${_id}`)
        
        // }}
        >Start Meeting 2 </button>
        <button className={styles.button}
        onClick={()=>{
          navigate(`/teacher/class/Assignments/${_id}`)
        }}
        >Assignments</button>       
        <button className={styles.button}>Quizess</button>
       
        {/* students list  */}
        
      </center>
    </div>
  );
}

export default Class;
