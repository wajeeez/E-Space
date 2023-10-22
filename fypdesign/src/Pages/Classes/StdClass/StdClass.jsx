

import React, { useEffect, useState } from "react";
// import styles from "./Class.module.css";
import Shome from '../../../Components/Final_Design_Components/StudentHome/Shome';

const  StdClass = () => {


  return (
    <Shome/>
  );
}

export default StdClass;





// import React, { useEffect, useState } from "react";
// import jwt_decode from "jwt-decode";
// import styles from "./Class.module.css";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";




// function StdClass() {
//   const baseURL = process.env.React_App_INTERNAL_API_PATH;
//   const navigate = useNavigate()


//   const [name, setName] = useState(null);
//   const [std, setStd] = useState([]);
//   const [email, setEmail] = useState(null);
//   const [classes, setClasses] = useState([]);
//   const { _id } = useParams();
  // const [name, setName] = useState(null);
  // const [std, setStd] = useState([]);
  // const [email, setEmail] = useState(null);
  // const [classes, setClasses] = useState([]);
  // const { _id } = useParams();
  // const handleRedirect = () => {
  //   // Redirect to the third-party URL
  //   window.location.href = `http://localhost:3030/${_id}`;
  // };


//   //

//   const [stdEmail, setstdEmail] = useState(null);
//   // const [classes, setClasses] = useState([]);
//   const [StudentName, setStudentName] = useState([]);


//   // const handleNameChange = () => {
//   //   setName('New Title'); // Set the 'name' state to the new title
//   // };


//   useEffect(() => {
//     const authToken = localStorage.getItem("StdToken");
//     if (authToken) {
//       const decodedToken = jwt_decode(authToken);
//       setEmail(decodedToken.email);


//       // Fetch classes for the logged-in user from the server
//       axios
//         .get(baseURL + `/student/studentData/${decodedToken.email}`)
//         .then((response) => {
//           console.log(response.data.response);
//           setstdEmail(response.data.response.stdEmail)
//           setStudentName(response.data.response.stdName);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   }, []);






//   useEffect(() => {
//     axios
//       .get(baseURL + `/student/class/${_id}`)
//       .then((response) => {
//         setStd(response.data.response.students);
//         setName(response.data.response.teacherName);
//         setClasses(response.data.response.subjectName);
//         setEmail(response.data.response.teacherEmail)
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);


//   const handleRedirect = () => {
//     // Redirect to the third-party URL
//     window.location.href = `http://localhost:3030/${_id}`;
//   };



//   return (
//     <div>
//       <div className={styles.sclass}>
//       Class : {classes}  &nbsp;  Teacher : {name}
//       </div>
//       <center>

//         <p className={styles.Intro}>
//           Student Name : {StudentName} | Email : {stdEmail}
//         </p>
//         </center>



//         <div className={styles.scCardContainer}>
//         {sccards.map((card, index) => (
//           <a
//             key={index}
//             href={card.link}
//             className={styles.scCard} 
//             style={{ backgroundColor: card.bgColor , fontFamily: 'Roboto, sans-serif'}}
//           >
//           <div className={styles.scCardHeading}>
//            <div className={`icon ${card.icon}`} />
//            <hsc>{card.title}</hsc>
//           </div>
//           <psc className={styles.scCardDescription}>{card.description}</psc>
//           </a>
//         ))}
//          </div>

        



      
//     </div>
//   );
// }

// export default StdClass;





