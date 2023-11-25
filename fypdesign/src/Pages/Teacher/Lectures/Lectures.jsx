import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { TeacherAssignmentUpload, TeacherLectureUpload } from '../../../api/internal';
import { useParams } from "react-router-dom";
import styles from '../Assignment/Assignment.module.css'
import AssignmentList from '../AssigmentList/AssignmentList';


const Lectures = () => {

  const baseURL = process.env.React_App_INTERNAL_API_PATH;

  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Add 1 because months are 0-based
    const day = String(now.getDate()).padStart(2, '0');

  }

 
  const [lectures, setLectures] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [lectureDesc, setlectureDesc] = useState('');
  const [lectureLink, setlectureLink] = useState('');
  const [lectureName, setlectureName] = useState('');
  const [remarks, setRemarks] = useState('');
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



 



//   const handleDeadlineChange = (event) => {
//     setDeadline(event.target.value);
//   };


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleDescChange = (value) => {
    setlectureDesc(value);
  };
  const handleNameChange = (value) => {
    setlectureName(value);
  };
  const handleLinkChange = (value) => {
        setlectureLink(value)
  };
  const handleRemarksChange = (value) => {
    setRemarks(value)
};



  const teacherLectureUpload = async () => {



    if (!selectedFile || !teacherID || !lectureName || !lectureLink || !lectureDesc) {
      setMessage("Data Missing Please Select a File and Deadline")
    } else {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('classId', _id);
      formData.append('lectureDesc', lectureDesc);
      formData.append('lectureLink', lectureLink);
      formData.append('teacherID', teacherID);
      formData.append('lectureName', lectureName);
       // Append the deadline value
      const response = await TeacherLectureUpload(formData);

      if (response.status === 201 || response.status === 200) {
        setMessage("Successfull")
        console.log("Successfull")
        if (fileInputRef.current) {
            resetFileInput() // Reset the input field
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

  function resetFileInput() {
    if (fileInputRef.current) {
      // Create a new file input element to replace the existing one
      const newFileInput = document.createElement('input');
      newFileInput.type = 'file';
  
      // Copy any attributes you want to retain from the old input to the new one
      newFileInput.id = fileInputRef.current.id;
      newFileInput.name = fileInputRef.current.name;
      
      // Replace the old input with the new one
      fileInputRef.current.parentNode.replaceChild(newFileInput, fileInputRef.current);
  
      // Now, fileInputRef is pointing to the new input element
    }
  }





  return (
    <div className='cen'>
      <center> 
        <br/>
        <br/> 
        <h1 className={styles.header} >Lecture</h1>
        <br/>
        <br/>
        <br/>


        {/* Upload Assignment */}
        <input type="file" onChange={handleFileChange} ref={fileInputRef} className={styles.file} />
        <br></br>
        <label  style={{color:"#000"}}>Lecture Name </label>
        <input type="text" onChange={(e) => handleNameChange(e.target.value)} />
        <br></br>
        <label  style={{color:"#000"}}>Lecture Description </label>
        <input t    ype="text" onChange={(e) => handleDescChange(e.target.value)} />
        <br></br>
        <label style={{color:"#000"}}>Lecture Link </label>
        <input type="text"onChange={(e) => handleLinkChange(e.target.value)} />
        <br></br>
        <label style={{color:"#000"}}>Lecture Remarks </label>
        <input type="text"onChange={(e) => handleRemarksChange(e.target.value)} />
        <br></br>
      
        <button className={styles.assignmentButton} onClick={teacherLectureUpload}>Upload Assignment</button>
        <span>
          {message != "" ? <p className={styles.errorMessage}>{message}</p> : ""}
        </span>





      </center>
    </div>


    // <AssignmentList></AssignmentList>
  );
};

export default Lectures;
