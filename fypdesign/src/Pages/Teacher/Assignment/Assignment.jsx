import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { TeacherAssignmentUpload } from '../../../api/internal';
import { useParams } from "react-router-dom";
import styles from '../Login/TSigin.module.css'
import AssignmentList from '../AssigmentList/AssignmentList';



const AssignmentPage = () => {

  const assigList = [
    {
      id: 1,
      name: 'Assignment 1',
      deadline: '2023-08-31',
      submissions: 10,
    },
    {
      id: 2,
      name: 'Assignment 2',
      deadline: '2023-09-15',
      submissions: 15,
    },
    // ... other assignments
  ];
  
  const [assignments, setAssignments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState(null);
  const [deadline, setDeadline] = useState('');
  const [teacherID,setteacherID] = useState('')
  const [subjectName,setSubjectName] = useState('')
  const { _id } = useParams();

  useEffect(()=>{

    axios
    .get(`http://localhost:5000/teacher/class/${_id}`)
    .then((response) => {
      console.log(_id)
      console.log(response.data.response.teacherID)
      console.log(response.data.response.subjectName)

      setteacherID(response.data.response.teacherID)
      setSubjectName(response.data.response.subjectName)
    })
    .catch((error) => {
      console.log(error);
    });
  })

  
  
  useEffect(() => {
    axios
      .get(`http://localhost:5000/teacher/class/${_id}`)
      .then((response) => {
        console.log(_id)
        console.log(response.data.response.teacherID)
        console.log(response.data.response.subjectName)

        setteacherID(response.data.response.teacherID)
        setSubjectName(response.data.response.subjectName)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);





  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value);
  };
  

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

 


  const teacherAssignmentUpload = async () => {

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('classId', _id);
    formData.append('teacherID', teacherID);
    formData.append('subjectName', subjectName);
    formData.append('deadline', deadline); // Append the deadline value



    const response = await TeacherAssignmentUpload(formData);

    if (response.status === 201 || response.status === 200) {
      setMessage("Successfull")
      console.log("Successfull")
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Reset the input field
      }
    } else if (response.code === "ERR_BAD_REQUEST") {
      // setError(response.response.mes);
      console.log("BAD REQUES")

      if (response.response.status === 401) {
        setMessage(response.response.data.message);
        console.log("401")

      }
    }

    
  }







  return (
    <div>
      <center>  <h1>Assignments</h1>


        {/* Upload Assignment */}
        <input type="file" onChange={handleFileChange} ref={fileInputRef} />
        <input type="date" onChange={handleDeadlineChange} ref={fileInputRef} />
        
        <button onClick={teacherAssignmentUpload}>Upload Assignment</button>

        <div>
      <h1>Assignment List</h1>
      <AssignmentList assignments={assigList} />
    </div>
        <span>
          {message != "" ? <p className={styles.errorMessage}>{message}</p> : ""}
        </span>


      </center>
    </div>
  );
};

export default AssignmentPage;
