// import React from 'react';
// import './StudentMain.css';
// import './SHeroSection.css';
// import { Link } from 'react-router-dom';



// import styles from "../../Final_Design_Components/TeacherDashboard_Components/TDashboard.module.css";





// // import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import axios from "axios";

// import { useEffect, useState } from "react";
// import jwt_decode from "jwt-decode";
// function SHeroSection() {

//   const baseURL = process.env.React_App_INTERNAL_API_PATH;


//   // const dispatch = useDispatch();

//   // const isAuthenticated = useSelector((state) => state.user.auth);
//   const navigate = useNavigate();
//   const handleLogout = async () => {
//     localStorage.removeItem("authToken");
//     window.location.reload(false);
//   };

//   const [classes, setClasses] = useState([]);
//   const [name, setName] = useState(null);
//   const [id, setUserId] = useState(null);
//   const [email, setEmail] = useState(null);

//   useEffect(() => {
//     const authToken = localStorage.getItem("authToken");
//     if (authToken) {
//       const decodedToken = jwt_decode(authToken);
//       setUserId(decodedToken.id);
//       setEmail(decodedToken.email);
//       setName(decodedToken.name);

//       // Fetch classes for the logged-in user from the server
//       axios
//         .get(baseURL + `/teacher/classes/${decodedToken.id}`)
//         .then((response) => {
//           console.log(response.data.response);
//           setClasses(response.data.response);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   }, [id]);

//   return (

//     <div className='hero-container'>
//       <h1 className='hero-heading'>CLASSES</h1>


//       <center>
//           <div >
//             <p>
//               Teacher Name : {name} | Teacher Email : {email}{" "}
//             </p>
//           </div>
//           </center>

//         <div style={{display: 'inline-block'}}>
//         {classes.map((cls) => (

//             <button className={styles.classes} key={cls._id} onClick={() => {
//               navigate(`/teacher/class/${cls._id}`)
//             }}>
//               <h2 className='card-content'> {cls.subjectName} </h2>

//             </button>
        
//         ))}
      

     

//       <button
//         className={styles.logInButton}
//         onClick={() => {
//           navigate(`/teacher/createclass`);
//         }}
//       >
//         Create A Class
//       </button>

//       <button className={styles.logout} onClick={handleLogout}>
//         LOGOUT
//       </button>

//       </div>


//     </div>





//   );
// }

// export default SHeroSection;



import React from 'react';
import './StudentMain.css';
import './SHeroSection.css';
import { Link } from 'react-router-dom';

import styles from "../../Final_Design_Components/TeacherDashboard_Components/TDashboard.module.css";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

function SHeroSection() {
  const baseURL = process.env.React_App_INTERNAL_API_PATH;
  const [email, setEmail] = useState(null);
  const [classes, setClasses] = useState([]);
  const [StudentName,setStudentName]=useState([]);
  

  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.removeItem("StdToken");
    window.location.reload(false);
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


  useEffect(() => {
    const authToken = localStorage.getItem("StdToken");
    if (authToken) {
      const decodedToken = jwt_decode(authToken);
      setEmail(decodedToken.email);
  
      // Fetch classes for the logged-in user from the server
      axios
        .get(baseURL+`/student/classes/${decodedToken.email}`)
        .then((response) => {
          console.log(response.data.response);
          setClasses(response.data.response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <>

    <div className='thero-container'>
      <div className='shero-heading'>
        <th>CLASSES</th>
      </div>
      <center >
        <div>
          <p className='s-info-top'>
            Student Name : {StudentName}     |     Student Email : {email}{" "}
          </p>
        </div>
      </center>

      <div className='shero-cards'>
        {classes.map((cls) => (
          <Link to={`/student/class/${cls._id}`} className='shero-card' key={cls._id}>
            <div className='shero-card-content'>
              <tc>{cls.subjectName}</tc>
            </div>
          </Link>
        ))}
      </div>

      

        
        <Link onClick={handleLogout} className='shero-card2'>
          <div className='shero-card-content'>
            <h2>Logout</h2>
          </div>
        </Link>

        
      </div>
    
    </>
  );
}

export default SHeroSection;




