import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import styles from './stdAssignment.module.css'
import { StudentSubmissions } from '../../../api/internal'
import jwt_decode from "jwt-decode";
import FormattedDate from '../../../Components/DateFormate/DateFormater'
import { boolean } from 'yup';

const StdAssignment = () => {
  const currentDate = new Date(); // Get the current date
  const [selectedFile, setSelectedFile] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [teacherName, setTeacherName] = useState([]);
  const [subjectName, setsubjectName] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState(null);
  const { _id } = useParams();
  const [fileURLsByIndex, setFileURLsByIndex] = useState([]);
  const [stdEmail,setEmail]=useState()
  const [StudentName,setStudentName] = useState();
  const [Subbtn,setSubbtn] = useState(false);


   //SubmisionBTn 
   
 






  let fileURLs = {};
  axios
    .get(`http://localhost:5000/teacher/assignments/list/${_id}`)
    .then((response) => {
      if (response.data) {
        fileURLs = response.data.reduce((accumulator, item, index) => {
          accumulator[index] = item.fileURL;
          return accumulator;
        }, {});
        console.log(fileURLs); // Log the updated value of fileURLs
      }
    })
    .catch((error) => {
      console.log(error);
    });



    useEffect(() => {
      const authToken = localStorage.getItem("StdToken");
      if (authToken) {
        const decodedToken = jwt_decode(authToken);
        setEmail(decodedToken.email);
      
  
        // Fetch classes for the logged-in user from the server
        axios
          .get(`http://localhost:5000/student/studentData/${decodedToken.email}`)
          .then((response) => {
            console.log(response.data.response);
            setStudentName(response.data.response.stdName);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, []);
  

    //SUbmission

    const getSubmission=(fileURL)=>{
      
      const authToken = localStorage.getItem("StdToken");
        if (authToken) {
          const decodedToken = jwt_decode(authToken);
          setEmail(decodedToken.email);
  
          const data = {
            fileURL: fileURL,
            Email:decodedToken.email
          };
  
         
          axios
            .get(`http://localhost:5000/student/submitted`,data)
            .then((response) => {
              console.log(response);
              if(response!=null){
                setSubbtn(true);
             
              }
           
              const blob = new Blob([response.data], { type: response.headers['content-type'] });
              const blobURL = URL.createObjectURL(blob);
              window.open(blobURL, '_blank');
              URL.revokeObjectURL(blobURL);
              

            })
            .catch((error) => {
              console.log(error);
            });
        }
      
    
    }

    //Submission
    
    







  useEffect(() => {
    axios
      .get(`http://localhost:5000/teacher/class/${_id}`)
      .then((response) => {

        setTeacherName(response.data.response.teacherName);
        setsubjectName(response.data.response.subjectName);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  useEffect(() => {
    axios
      .get(`http://localhost:5000/teacher/assignments/list/${_id}`)
      .then((response) => {
        if (response.data) {
          //  fileURLs = response.data.reduce((accumulator, item, index) => {
          //   accumulator[index] = item.fileURL;
          //   return accumulator;
          // }, {});
          setAssignments(response.data);


        }
      })
      .catch((error) => {
        console.log(error);
      });


  }, [_id])
  console.log(fileURLs)

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  console.log(selectedFile)

  const submit_assignment = async (fileURL) => {

    setDialogVisible(false)

    console.log(selectedFile)

    //Problem is this code is runing before file change and imedialty after file broweser opens
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('Email',stdEmail)
      formData.append('classId', _id);
      formData.append('assignmentFileURL', fileURL)
      formData.append('deadline', currentDate); // Append the deadline value
      for (const entry of formData.entries()) {
        console.log(entry[0], entry[1]);
      }


      const response = await StudentSubmissions(formData);

      if (response.status === 201 || response.status === 200) {
        setMessage("Successfull")
        console.log("Successfull")
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Reset the input field
        }
      } else if (response.code === "ERR_BAD_REQUEST") {
        // setError(response.response.mes);
        console.log("BAD REQUES")
        if (response.response.status === 500) {
          console.log("500 BAD REQUEST ")
        }


        if (response.response.status === 401) {
          setMessage(response.response.data.message);
          console.log("401")

        }
      }






    } else {

      console.log(selectedFile + "ERROR")
    }








  }


  const openDialog = () => {
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

//Submisision Btn
  useEffect(() => {
    // const authToken = localStorage.getItem("StdToken");
   
    //   const decodedToken = jwt_decode(authToken);
    //   setEmail(decodedToken.email);
    
    const data={
      // Email:decodedToken.email,
      classId:_id,
      
    }
    console.log(data);

    axios
      .get(`http://localhost:5000/student/isSubmission`,data)
      .then((response) => {
          if(response){

            setSubbtn(true)
          }
       
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  


  const openFileInBrowser = (fileURL) => {

    console.log(fileURL)

    axios
      .get(`http://localhost:5000/files/${fileURL}`, { responseType: 'blob' })
      .then((response) => {

        
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const blobURL = URL.createObjectURL(blob);
        window.open(blobURL, '_blank');
        URL.revokeObjectURL(blobURL);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  const getSubmmitedAssignment= async (fileURL) =>{


  }



  return (
    <div style={{ backgroundColor: 'transparent' }}>
      <center>

        <h1>Student Assignments</h1>
        <p className={styles.Intro}>
          Student Name : {StudentName} | Email :{stdEmail}
        </p>
        <table>
          <thead>
            <tr>
              <th className={styles.th}>Assign. No.</th>
              <th className={styles.th}>Title</th>
              <th className={styles.th}>Added Submission</th>
              <th className={styles.th}>Action</th>
              <th className={styles.th}>Deadline</th>
            </tr>
          </thead>
          <tbody >
            {assignments.map((assignment, index) =>


            (<>
              <tr className={styles.tr} key={assignment.fileURL}>

                <td className={styles.td} >{index + 1}</td>

                <td className={styles.td}> 
                  <button   className={styles.assignmentButton}
                  onClick={openFileInBrowser.bind(null, assignment.fileURL)}>Assignment File</button>
                </td>
                <td className={styles.td}>
                  {Subbtn && (
                      
                  <button   className={styles.assignmentButton}
                  onClick={getSubmission.bind(null, assignment.fileURL)}>Submission File</button>

                  )}
               
                </td>

                <td className={styles.td}>



                  {currentDate <= new Date(assignment.deadline) ? (
                    <button  className={styles.submissionButton} onClick={openDialog}>Submit</button>
                  ) : (
                    <button className={styles.submissionButton}   style={{ backgroundColor: '#fc1100', color: '#000' }}>Deadline Exceeded</button>
                  )}

                </td>
                <td className={styles.td}>{<FormattedDate rawDate={assignment.deadline} />}</td>
              </tr>

              {dialogVisible && (
                <div className={styles.modaloverlay}>
                  <div className={styles.modal}>
                    <h2>Submit Assignment</h2>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                    <button onClick={submit_assignment.bind(null, assignment.fileURL)}>Submit</button>
                    <button onClick={closeDialog}>Cancel</button>
                  </div>
                </div>
              )}

            </>
            ))}
          </tbody>


        </table>

        <span>
          {message != "" ? <p className={styles.errorMessage}>{message}</p> : ""}
        </span>

      </center>
    </div>
  );
};

export default StdAssignment;
