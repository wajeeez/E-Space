import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import styles from './stdAssignment.module.css'
import { StudentSubmissions } from '../../../api/internal'
import jwt_decode from "jwt-decode";
import FormattedDate from '../../../Components/DateFormate/DateFormater'
import { boolean } from 'yup';



const StdTable = () => {

  const baseURL = process.env.React_App_INTERNAL_API_PATH;

  const [getFileURL,setFileURL] = useState(null)
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

//getting submission files 
const [submissionMapping, setSubmissionMapping] = useState({});
const [marksMapping, setmarksMapping] = useState({});
const [remarksMapping, setremarksMapping] = useState({});
// Function to update the submission mapping



const updateSubmissionMapping = (assignmentFileURL, submissionFileURL) => {
  setSubmissionMapping((prevMapping) => ({
    ...prevMapping,
    [assignmentFileURL]: submissionFileURL,
  }));
};


const updateMarksMapping = (submissionFileURL, marks) => {
  setmarksMapping((prevMapping) => ({
    ...prevMapping,
    [submissionFileURL]: marks,
  }));
};

const updateReMarksMapping = (submissionFileURL, remarks) => {
  setremarksMapping((prevMapping) => ({
    ...prevMapping,
    [submissionFileURL]: remarks,
  }));
};
  
useEffect(() => {
  const authToken = localStorage.getItem("StdToken");
  if (authToken) {
    const decodedToken = jwt_decode(authToken);
    setEmail(decodedToken.email);
  

    // Fetch classes for the logged-in user from the server
    axios
      .get(baseURL+`/student/studentData/${decodedToken.email}`)
      .then((response) => {
        console.log(response.data.response);
        setStudentName(response.data.response.stdName);
      
      })
      .catch((error) => {
        console.log(error);
      });
  }
}, []);

 






  let fileURLs = {};
  axios
    .get(baseURL+`/teacher/assignments/list/${_id}`)
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




    //SUbmission

    const getSubmission=(fileURL)=>{
      
      const authToken = localStorage.getItem("StdToken");
        if (authToken) {
          const decodedToken = jwt_decode(authToken);
          setEmail(decodedToken.email);
  
        

         
          axios
            .get(baseURL+`/student/submitted`,{params:{
              fileURL: fileURL,
            }},{ responseType: 'blob' })
            .then((response) => {
              console.log(response);
              
             
           
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
      .get(baseURL+`/teacher/class/${_id}`)
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
      .get(baseURL+`/teacher/assignments/list/${_id}`)
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

  const submit_assignment = async () => {

    setDialogVisible(false)

    console.log(selectedFile)

    //Problem is this code is runing before file change and imedialty after file broweser opens
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('Email',stdEmail)
      formData.append('classId', _id);
      formData.append('assignmentFileURL', getFileURL)
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

        setTimeout(() => {
          window.location.reload(); // Reload the page after a delay (e.g., 2 seconds)
        }, 2000); // Adjust the delay (in milliseconds) as needed
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
 


  


  const openFileInBrowser = (fileURL) => {

    console.log(fileURL)

    axios
      .get(baseURL+`/files/${fileURL}`, { responseType: 'blob' })
      .then((response) => {
       
       
       
       
       // console.log(response.data.response.name)
        

        

        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const blobURL = URL.createObjectURL(blob);
        console.log(blobURL)
        console.log(response.name)
        
        window.open(blobURL, '_blank');
        URL.revokeObjectURL(blobURL);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const openFile = (fileURL) => {

    console.log(fileURL)

    axios
      .get(baseURL+`/submission/${fileURL}`, { responseType: 'blob' })
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


  


  //CHECKING IF ANY ASSIGNMENT WAS UPLOADED BY STUDENT
  useEffect(() => {
    const authToken = localStorage.getItem('StdToken');
    if (authToken) {
      const decodedToken = jwt_decode(authToken);
      const Email = decodedToken.email;
      const classId=_id;

      
      if (Email && classId) { // Check if both userEmail and _id are truthy
        const data = {
          classId,
          Email
        };
  
        axios
        .get(baseURL+'/student/getSubmitedFileURL', {
          params: {
            classId,
            Email,
          },
        })
          .then((response) => {
            if (response.data && response.data.response) {

              const responses = response.data.response; // Assuming response.data.response is an array

              responses.forEach((assignment) => {
                const assignmentFileURL = assignment.assignmentFileURL;
                const submissionFileURL = assignment.submissionFileURL;
                const marks = assignment.marks;
                const remarks = assignment.remarks;
                // Call updateSubmissionMapping for each assignment
                updateSubmissionMapping(assignmentFileURL, submissionFileURL);
                updateMarksMapping(submissionFileURL,marks)
                updateReMarksMapping(submissionFileURL,remarks)
              });

           
              // console.log(response.data.response.assignmentFileURL)
              // const submissionFileURL = response.data.response.submissionFileURL;
              // console.log(response.data)
              // updateSubmissionMapping(response.data.response.assignmentFileURL, submissionFileURL);
              console.log(submissionMapping);
          
  

  
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }else{
        console.log("EMAIL OR CLASSID is not AVAILABLE")
      }
    }
  



  }, []);


  const handleSubmissionClick = (assignmentFileURL) => {
    // Handle the submission for the specific assignment
    console.log(`Clicked on assignment: ${assignmentFileURL}`);
    setFileURL(assignmentFileURL)
    openDialog()

  };

  return (




    <div className="container" style={{  
    textAlign: 'center', padding:'2px'  }}>
      <div className="text-center mt-1">
        <h1 style={{background:'black' , padding:'5px' , color : 'white', borderRadius: '5px'}}>
            Assignments</h1>
        {/* <p>
          Student Name: {StudentName} | Email: {stdEmail}
        </p> */}
      </div>
      
      <table className="table " style={{border:'1px solid white'}}>
        <thead style={{border:'3px solid black' , padding: '15px'}} >
          <tr >
            <th style={{ width: '5%' , fontSize:'large' }}>Sr#</th>
            <th style={{ width: '10%', fontSize:'large'  }}>Title</th>
            <th style={{ width: '10%', fontSize:'large'  }}>Assignment/Solution</th>
            <th style={{ width: '10%', fontSize:'large'  }}>Remarks</th>
            <th style={{ width: '10%', fontSize:'large'  }}>Marks Obtained</th>
            <th style={{ width: '10%', fontSize:'large'  }}>Submission</th>
            <th style={{ width: '10%', fontSize:'large'  }}>Deadline</th>
            <th style={{ width: '10%', fontSize:'large' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment, index) => (
            <tr key={assignment.fileURL}>
              <td>{index + 1}</td>
              <td>
                {/* Content */}
              </td>
              <td>
                <button
                  className="btn btn-primary " style={{margin: '2px'}}
                  onClick={openFileInBrowser.bind(null, assignment.fileURL)}
                >
                  Assignment
                </button>
                <br /> {/* Add a line break to separate the buttons */}
                <button
                  className="btn btn-secondary" style={{margin: '2px'}}
                  onClick={openFileInBrowser.bind(null, assignment.fileURL)}
                >
                  Solution
                </button>
              </td>
              <td>
                {remarksMapping[submissionMapping[assignment.fileURL]]
                  ? remarksMapping[submissionMapping[assignment.fileURL]]
                  : ' --- '}
              </td>
              <td>
                {marksMapping[submissionMapping[assignment.fileURL]]
                  ? marksMapping[submissionMapping[assignment.fileURL]]
                  : 'Not marked yet'}
              </td>
              <td>
                {submissionMapping[assignment.fileURL] ? (
                  <button
                    className="btn btn-primary"
                    onClick={openFile.bind(null, assignment.submissionURL)}
                  >
                    Submission File
                  </button>
                ) : (
                  'No Submission'
                )}
              </td>
              <td>
                <FormattedDate rawDate={assignment.deadline} />
              </td>
              <td>
                {currentDate <= new Date(assignment.deadline) ? (
                  <button className="btn btn-success" onClick={() => handleSubmissionClick(assignment.fileURL)}>
                    SUBMIT
                  </button>
                ) : (
                  <button className="btn btn-danger" disabled>
                    Deadline Exceeded
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center">
        {message !== '' && <p className="text-danger">{message}</p>}
      </div>
    </div>
  );
  
  
  
  
};

export default StdTable;