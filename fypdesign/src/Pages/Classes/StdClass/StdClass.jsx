import React, { useEffect, useState } from "react";

import styles from "./Class.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function StdClass() {

  const navigate  = useNavigate()

  const [name, setName] = useState(null);
  const [std, setStd] = useState([]);
  const [email, setEmail] = useState(null);
  const [classes, setClasses] = useState([]);
  const { _id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/student/class/${_id}`)
      .then((response) => {
        setStd(response.data.response.students);
        setName(response.data.response.teacherName);
        setClasses(response.data.response.subjectName);
        setEmail(response.data.response.teacherEmail)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);














  

  return (
    <div>
      <center>
        <p className={styles.Intro}>
          Teacher Name : {name} | Class: {classes} | Email :{email}
        </p>
        <br />
        <br />
        <br />
        <br />
        <button className={styles.meet} onClick={()=>{
           
           navigate(`/${classes}/meeting/${_id}`)

        }}>Join Meeting</button>

        <button className={styles.button} onClick={()=>{

              navigate(`/${classes}/assignment/${_id}`)
        }}>Assignments</button>       
        <button className={styles.button}>Quizess</button>
        
        {/* students list  */}
        
      </center>
    </div>
  );
}

export default StdClass;
