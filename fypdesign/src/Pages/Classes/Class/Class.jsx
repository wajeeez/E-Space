// import React, { useEffect, useState } from "react";

// import styles from "./Class.module.css";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// function Class() {
  
//   const baseURL = process.env.React_App_INTERNAL_API_PATH;

//   const navigate = useNavigate()
//   const [name, setName] = useState(null);
//   const [std, setStd] = useState([]);
//   const [email, setEmail] = useState(null);
//   const [classes, setClasses] = useState([]);
//   const { _id } = useParams();
//   const handleRedirect = () => {
//     // Redirect to the third-party URL
//     window.location.href = `http://localhost:3030/${_id}`;


//     const tccards = [
//       { title: 'Start Meeting 1', link: '/page1',  },
//       { title: 'Start Meeting 2', link: '/page1',  },
//       { title: '70 %', description: 'Average Attendance', link: '/page3',  },
//       { title: '30 / 40', description: 'Last Meeting Attendance', link: '/page4',  },
//       // Add more cards as needed
//       // { title: 'Card 1', icon: 'icon1', description: 'Description for Card 1', link: '/page1', bgImage: 'url(path_to_image_1)' },
//       // { title: 'Card 2', icon: 'icon2', description: 'Description for Card 2', link: '/page2', bgImage: 'url(path_to_image_2)' },
//       // { title: 'Card 3', icon: 'icon3', description: 'Description for Card 3', link: '/page3', bgImage: 'url(path_to_image_3)' },
//       // { title: 'Card 4', icon: 'icon4', description: 'Description for Card 4', link: '/page4', bgImage: 'url(path_to_image_4)' },
//     ];

//   };

//   useEffect(() => {
//     axios
//       .get(baseURL+`/teacher/class/${_id}`)
//       .then((response) => {
//         setStd(response.data.response.students);
//         setName(response.data.response.teacherName);
//         setClasses(response.data.response.subjectName);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   return (
//     <div>
//       <center>
//         <p className={styles.Intro}>
//           Teacher Name : {name} | Class: {classes}
//         </p>
      
//         <div className="tc-card-container">
//            {tccards.map((card, index) => (
//             <a key={index} href={card.link} className="tc-card" style={{ backgroundColor: card.bgColor }}>
//               <div className="tc-card-heading">
//                 <div className={`icon ${card.icon}`} />
//                   <h3>{card.title}</h3>
//                 </div>
//                 <p className="tc-card-description">{card.description}</p>
//             </a>
        
//              ))}
      
//         </div>
//         {/* New Section */}
//         <div className="tcm-section">
        
//         </div>

//         {/* Start Meeting Using API Runing  */}
//         <button className={styles.meet}
//           onClick={()=>{
//             navigate(`/${classes}/meeting/${_id}`)
//           }}
//         >Start Meeting 1</button>

//         {/* Start Meeting using Custom Code Socket.io */}
//         <button className={styles.meet} 
//         onClick={handleRedirect}
//         // onClick={()=>{
//         // //  navigate(`/custom/${classes}/meeting/${_id}`)
        
//         // }}
//         >Start Meeting 2 </button>
//         <button className={styles.button}
//         onClick={()=>{
//           navigate(`/teacher/class/Assignments/${_id}`)
//         }}
//         >Assignments</button>       
//         <button className={styles.button}>Quizess</button>
       
        
        
//       </center>
//     </div>
//   );
// }

// export default Class;


import React, { useEffect, useState } from "react";
import styles from "./Class.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Class() {
  const baseURL = process.env.React_App_INTERNAL_API_PATH;

  const navigate = useNavigate();
  const [name, setName] = useState(null);
  const [std, setStd] = useState([]);
  const [email, setEmail] = useState(null);
  const [classes, setClasses] = useState([]);
  const { _id } = useParams();

  const tccards = [
    { title: 'Start Meeting 1', onClick: () => navigate(`/${classes}/meeting/${_id}`)  },
    { title: 'Start Meeting 2', },
    { title: '70 %', description: 'Average Attendance',  },
    { title: '30 / 40', description: 'Last Meeting Attendance',  },
    // Add more cards as needed
    // { title: 'Card 1', icon: 'icon1', description: 'Description for Card 1', link: '/page1', bgImage: 'url(path_to_image_1)' },
    // { title: 'Card 2', icon: 'icon2', description: 'Description for Card 2', link: '/page2', bgImage: 'url(path_to_image_2)' },
    // { title: 'Card 3', icon: 'icon3', description: 'Description for Card 3', link: '/page3', bgImage: 'url(path_to_image_3)' },
    // { title: 'Card 4', icon: 'icon4', description: 'Description for Card 4', link: '/page4', bgImage: 'url(path_to_image_4)' },
  ];

  useEffect(() => {
    axios
      .get(baseURL + `/teacher/class/${_id}`)
      .then((response) => {
        setStd(response.data.response.students);
        setName(response.data.response.teacherName);
        setClasses(response.data.response.subjectName);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className={styles.tclass}>
      Class : {classes}
      </div>
      
      <div className={styles.tcCardContainer}>
        {tccards.map((card, index) => (
          <a
            key={index}
            href={card.link}
            className={styles.tcCard} 
            style={{ backgroundColor: card.bgColor , fontFamily: 'Roboto, sans-serif'}}
          >
          <div className={styles.tcCardHeading}>
           <div className={`icon ${card.icon}`} />
           <htc>{card.title}</htc>
          </div>
          <ptc className={styles.tcCardDescription}>{card.description}</ptc>
          </a>
        ))}
      </div>
        
        {/* Rest of your code */}
      
    </>
  );
}

export default Class;
