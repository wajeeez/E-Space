import React, { useEffect, useState } from "react";

import styles from "./Class.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';





function Class() {


  const navigate = useNavigate()
  const [name, setName] = useState(null);
  const [std, setStd] = useState([]);
  const [email, setEmail] = useState(null);
  const [classes, setClasses] = useState([]);
  const { _id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/teacher/class/${_id}`)
      .then((response) => {
        setStd(response.data.response.students);
        setName(response.data.response.teacherName);
        setClasses(response.data.response.subjectName);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  

  const handleStartMeeting = () => {
    const socket = io('http://localhost:5000'); // Replace with your Socket.IO server URL

    // Socket event listeners
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
      // You can emit the 'join' event here or perform other actions
      // based on your application's requirements.
      // Example:
      socket.emit('join', 'roomName'); // Replace 'roomName' with the actual room name
    });

    socket.on('userJoined', (userId) => {
      console.log('User joined:', userId);
      // Handle the user joined event
    });

    // Add more event listeners as needed

    // Clean up socket connection when component unmounts
    return () => {
      socket.disconnect();
    };
  };



  const handleRedirect = () => {
    // Redirect to the third-party URL
    window.location.href = `http://localhost:3030/${_id}`;
  };

  return (
    <div>
      <center>
        <p className={styles.Intro}>
          Teacher Name : {name} | Class: {classes}
        </p>
        <br/>
        <br/>
        <br/>
        <br/>
        <button className={styles.meet}
          onClick={handleRedirect
            // navigate(`/${classes}/meeting/${_id}`)
          }
        >Start Meeting 1</button>
        <button className={styles.meet}>Start Meeting 2</button>
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
