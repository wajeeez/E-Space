import React from 'react';
import './TeacherMain.css';

import THeroSection from '../../../Components/Final_Design_Components/TeacherMain_Components/THeroSection';

function TeacherMain() {
  return (
    <>
     
      <THeroSection/>
      
    </>
  );
}

export default TeacherMain;



// import React from 'react'
// import { useNavigate } from "react-router-dom";
// import jwt_decode from "jwt-decode";
// import axios from "axios";
// import './StdMainPage.css'
// import { useEffect, useState } from "react";

// import styles from "../../../Components/Final_Design_Components/TeacherDashboard_Components/TDashboard.module.css";



// function StdMainPage() {

//     const baseURL = process.env.React_App_INTERNAL_API_PATH;
//     const [email, setEmail] = useState(null);
//     const [classes, setClasses] = useState([]);
//     const [StudentName,setStudentName]=useState([]);
    
  
//     const navigate = useNavigate();
//     const handleLogout = async () => {
//       localStorage.removeItem("StdToken");
//       window.location.reload(false);
//     };
  
//     useEffect(() => {
//       const authToken = localStorage.getItem("StdToken");
//       if (authToken) {
//         const decodedToken = jwt_decode(authToken);
//         setEmail(decodedToken.email);
      
  
//         // Fetch classes for the logged-in user from the server
//         axios
//           .get(baseURL+`/student/studentData/${decodedToken.email}`)
//           .then((response) => {
//             console.log(response.data.response);
//             setStudentName(response.data.response.stdName);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       }
//     }, []);
  
  
//     useEffect(() => {
//       const authToken = localStorage.getItem("StdToken");
//       if (authToken) {
//         const decodedToken = jwt_decode(authToken);
//         setEmail(decodedToken.email);
    
//         // Fetch classes for the logged-in user from the server
//         axios
//           .get(baseURL+`/student/classes/${decodedToken.email}`)
//           .then((response) => {
//             console.log(response.data.response);
//             setClasses(response.data.response);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       }
//     }, []);
  
//     return (

//         <div className='hero-container'>
//             <h3 className='heading'>Dashboard</h3>


//             <center style={{marginTop:'120px'}}>
//                 {/* <h1>Student Dashboard Page</h1> */}
//                 <p className={styles.Intro}>
//                     Student Name : {StudentName} | Email :{email}
//                 </p>
//                 <br/>
//             </center>

//             <div style={{ display: 'inline-block' }}>
//                 {classes.map((cls) => (

//                     <button className={styles.classes} key={cls._id} onClick={() => {
//                         navigate(`/student/class/${cls._id}`)
//                     }}>
//                         <h2 className='card-content'>  {cls.subjectName} </h2>

//                     </button>

//                 ))}




//                 <button className={styles.logout} onClick={handleLogout}>
//                     LOGOUT
//                 </button>

//             </div>


//         </div>





//     );
// }

// export default StdMainP