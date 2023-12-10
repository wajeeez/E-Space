import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import styles from '../Assignment/stdAssignment.module.css'
import { StudentSubmissions } from '../../../api/internal'
import jwt_decode from "jwt-decode";
import FormattedDate from '../../../Components/DateFormate/DateFormater'
import { boolean } from 'yup';
import { Link } from 'react-router-dom';


const StdLectures = () => {

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

  const [lectures, setlectures] = useState([]);
  const [desc, setdesc] = useState();
  const [link, setlink] = useState();
  const [remark, setremark] = useState();

  
//SubmisionBTn 

//getting submission files 

// Function to update the submission mapping

// const updateSubmissionMapping = (assignmentFileURL, submissionFileURL) => {
//   setSubmissionMapping((prevMapping) => ({
//     ...prevMapping,
//     [assignmentFileURL]: submissionFileURL,
//   }));
// };


// const updateMarksMapping = (submissionFileURL, marks) => {
//   setmarksMapping((prevMapping) => ({
//     ...prevMapping,
//     [submissionFileURL]: marks,
//   }));
// };

// const updateReMarksMapping = (submissionFileURL, remarks) => {
//   setremarksMapping((prevMapping) => ({
//     ...prevMapping,
//     [submissionFileURL]: remarks,
//   }));
// };
  
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
    .get(baseURL+`/students/getLecture/${_id}`)
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

    // const getSubmission=(fileURL)=>{
      
    //   const authToken = localStorage.getItem("StdToken");
    //     if (authToken) {
    //       const decodedToken = jwt_decode(authToken);
    //       setEmail(decodedToken.email);
  
        

         
    //       axios
    //         .get(baseURL+`/student/submitted`,{params:{
    //           fileURL: fileURL,
    //         }},{ responseType: 'blob' })
    //         .then((response) => {
    //           console.log(response);
              
             
           
    //           const blob = new Blob([response.data], { type: response.headers['content-type'] });
    //           const blobURL = URL.createObjectURL(blob);
    //           window.open(blobURL, '_blank');
    //           URL.revokeObjectURL(blobURL);
              

    //         })
    //         .catch((error) => {
    //           console.log(error);
    //         });
    //     }
      
    
    // }

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
      .get(baseURL+`/students/getLecture/${_id}`)
      .then((response) => {
        if (response.data) {
          //  fileURLs = response.data.reduce((accumulator, item, index) => {
          //   accumulator[index] = item.fileURL;
          //   return accumulator;
          // }, {});
          setlectures(response.data)
        //   setAssignments(response.data);
         

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

//   const submit_assignment = async () => {

//     setDialogVisible(false)

//     console.log(selectedFile)

//     //Problem is this code is runing before file change and imedialty after file broweser opens
//     if (selectedFile) {
//       const formData = new FormData();
//       formData.append('file', selectedFile);
//       formData.append('Email',stdEmail)
//       formData.append('classId', _id);
//       formData.append('assignmentFileURL', getFileURL)
//       formData.append('deadline', currentDate); // Append the deadline value
//       for (const entry of formData.entries()) {
//         console.log(entry[0], entry[1]);
//       }


//       const response = await StudentSubmissions(formData);

//       if (response.status === 201 || response.status === 200) {
//         setMessage("Successfull")
//         console.log("Successfull")
//         if (fileInputRef.current) {
//           fileInputRef.current.value = ''; // Reset the input field
//         }

//         setTimeout(() => {
//           window.location.reload(); // Reload the page after a delay (e.g., 2 seconds)
//         }, 2000); // Adjust the delay (in milliseconds) as needed
//       } else if (response.code === "ERR_BAD_REQUEST") {
//         // setError(response.response.mes);
//         console.log("BAD REQUES")
//         if (response.response.status === 500) {
//           console.log("500 BAD REQUEST ")
//         }


//         if (response.response.status === 401) {
//           setMessage(response.response.data.message);
//           console.log("401")

//         }
//       }






//     } else {

//       console.log(selectedFile + "ERROR")
//     }








//   }


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
                // updateSubmissionMapping(assignmentFileURL, submissionFileURL);
                // updateMarksMapping(submissionFileURL,marks)
                // updateReMarksMapping(submissionFileURL,remarks)
              });

           
              // console.log(response.data.response.assignmentFileURL)
              // const submissionFileURL = response.data.response.submissionFileURL;
              // console.log(response.data)
              // updateSubmissionMapping(response.data.response.assignmentFileURL, submissionFileURL);
            //   console.log(submissionMapping);
          
  

  
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


//   const handleSubmissionClick = (assignmentFileURL) => {
//     // Handle the submission for the specific assignment
//     console.log(`Clicked on assignment: ${assignmentFileURL}`);
//     setFileURL(assignmentFileURL)
//     openDialog()

//   };

const row_color = {
  backgroundColor: 'transparent',
  color: 'black',

}
const head_color ={
  backgroundColor: 'transparent',
  color: 'black',
  fontWeight: '600',
  fontFamily:'Poppins',
  fontSize:'medium' ,
}

  return (
    <div className="container-fluid" style={{  
      textAlign: 'center', marginTop: '0px', }}>
      <center>

      <h1 style={{fontFamily:'Poppins',background:'' , padding:'5px' , color : 'black', borderRadius: '20px', marginBottom: '10px', fontWeight:'100', letterSpacing:'2px'}}>
           LECTURES</h1>

        {/* <p style={{margin:'20px'}} className={styles.intro}>
          Student Name : {StudentName} | Email :{stdEmail}
        </p> */}

    <table className="table custom-std-table" style={{border:'0px solid silver', verticalAlign: 'middle' , 
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',borderRadius:'5px'}}>
        <thead style={{border:'0px solid silver' , padding: '15px', verticalAlign: 'middle', textAlign:'center', 
        background:'' }} >
          <tr >
            <th style={{ ...head_color,width: '2%'}}>Sr No.</th>
            <th style={{ ...head_color,width: '10%'  }}>Title</th>
            {/* <th style={{ ...head_color,width: '10%', fontSize:'large'  }}>Description</th> */}
            <th style={{ ...head_color,width: '5%' }}>Lecture File</th>
            <th style={{ ...head_color,width: '5%' }}>Video Link</th>
            <th style={{ ...head_color,width: '10%' }}>Remarks</th>
          </tr>
        </thead>
        {lectures.map((lecture, index) =>

           
( 
        <tbody style={{textAlign:'center', verticalAlign: 'middle', padding: '15px'}}>
        <tr key={lecture.fileURL} style={{ color: 'black', textAlign: 'center' }}>

        <td style={{...row_color , marginTop:'5px'}}>
        <p style={{fontSize:'large', fontWeight:''}}>
        {index + 1}
          </p>
        </td>

        <td style={{...row_color }}>
        <p style={{fontSize:'large', fontWeight:''}}>
          {lecture.lectureName}
          </p>
        </td>



        {/* <td style={{...row_color }}>
        <p style={{fontSize:'large', fontWeight:'bold'}}>
          description
          </p>

        </td> */}

        
        <td style={{ ...row_color }}>
  
            <button
              className="btn btn-primary"
              style={{ marginTop: '-10px', fontSize: 'medium' ,backgroundColor: 'rgba(0, 0, 255, 0.6)'}}
              onClick={openFileInBrowser.bind(null, lecture.fileURL)}
            >
              View Lecture
            </button>

        </td>

        <td style={{...row_color }}>
      <p style={{fontSize:'large', fontWeight:''}}>
      <Link to ={lecture.lectureLink} >{lecture.lectureLink}</Link>
      </p>
        </td>

        <td style={{...row_color }}>
      <p style={{fontSize:'large', fontWeight:''}}>
      {lecture.remarks}
      </p>
        </td>
        

        
        </tr>
        </tbody>
        ))}
        </table>


        {/* <table className={styles.tbody}>
          <thead>
            <tr>
              <th className={styles.th}>Lecture No.</th>
              <th className={styles.th}>Lecture Name</th>
              <th className={styles.th}>File</th>
              <th className={styles.th}>Link</th>
              <th className={styles.th}>Remarks</th>
         
            </tr>
          </thead>
          <tbody >
            {lectures.map((lecture, index) =>

           
            ( 
            <>
            
              <tr className={styles.tr} key={lecture.fileURL}>

                <td className={styles.td} >{index + 1}</td>
                <td className={styles.td} >{lecture.lectureName}</td>

                <td className={styles.td}> 
                  <button   className={styles.assignmentButton}
                  onClick={openFileInBrowser.bind(null, lecture.fileURL)}>Lecture</button>
                </td>

                <td className={styles.td}> {lecture.lectureLink}</td>
                <td className={styles.td}>  {lecture.remarks}  </td>

               
              </tr>

            </>
            ))}
          </tbody>


        </table> */}

        <span>
          {message != "" ? <p className={styles.errorMessage}>{message}</p> : ""}
        </span>

      </center>
    </div>
  );
};

export default StdLectures;
