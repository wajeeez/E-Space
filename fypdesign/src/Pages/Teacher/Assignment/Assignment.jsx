import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { TeacherAssignmentUpload } from '../../../api/internal';
import { useParams } from "react-router-dom";
import styles from './Assignment.module.css'
import AssignmentList from '../AssigmentList/AssignmentList';


const AssignmentPage = () => {

  const baseURL = process.env.React_App_INTERNAL_API_PATH;

  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Add 1 because months are 0-based
    const day = String(now.getDate()).padStart(2, '0');

  }

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
  const [teacherID, setteacherID] = useState('')
  const [subjectName, setSubjectName] = useState('')
  const { _id } = useParams();

  useEffect(() => {

    axios
      .get(baseURL+`/teacher/class/${_id}`)
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
      .get(baseURL+`/teacher/class/${_id}`)
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



    if (!selectedFile || !teacherID || !subjectName || !deadline) {
      setMessage("Data Missing Please Select a File and Deadline")
    } else {
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



  }







  return (
    <div>
      <center>  <h1>Assignments</h1>


        {/* Upload Assignment */}
        <input type="file" onChange={handleFileChange} ref={fileInputRef} />
        <input className={styles.assignmentButton} type="date" onChange={handleDeadlineChange} ref={fileInputRef} min={getCurrentDate} />

        <button className={styles.assignmentButton} onClick={teacherAssignmentUpload}>Upload Assignment</button>
        <span>
          {message != "" ? <p className={styles.errorMessage}>{message}</p> : ""}
        </span>





      </center>
    </div>


    // <AssignmentList></AssignmentList>
  );
};

export default AssignmentPage;
