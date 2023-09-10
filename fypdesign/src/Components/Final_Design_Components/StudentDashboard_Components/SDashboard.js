import React from 'react';
import "../../../Components/Final_Design_Components/TeacherDashboard_Components/TDashboard.css";




import styles from "./TDashboard.module.css";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
function TDashboard() {

  const cards = [
    { title: 'Start Meeting', link: '/page1',  },
    { title: 'Rejoin Meeting', link: '/page2',  },
    { title: '70 %', description: 'Average Attendance', link: '/page3',  },
    { title: '30 / 40', description: 'Last Meeting Attendance', link: '/page4',  },
    // Add more cards as needed
    // { title: 'Card 1', icon: 'icon1', description: 'Description for Card 1', link: '/page1', bgImage: 'url(path_to_image_1)' },
    // { title: 'Card 2', icon: 'icon2', description: 'Description for Card 2', link: '/page2', bgImage: 'url(path_to_image_2)' },
    // { title: 'Card 3', icon: 'icon3', description: 'Description for Card 3', link: '/page3', bgImage: 'url(path_to_image_3)' },
    // { title: 'Card 4', icon: 'icon4', description: 'Description for Card 4', link: '/page4', bgImage: 'url(path_to_image_4)' },
  ];

  const baseURL = process.env.React_App_INTERNAL_API_PATH;


  // const dispatch = useDispatch();

  // const isAuthenticated = useSelector((state) => state.user.auth);
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.removeItem("authToken");
    window.location.reload(false);
  };

  const [classes, setClasses] = useState([]);
  const [name, setName] = useState(null);
  const [id, setUserId] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      const decodedToken = jwt_decode(authToken);
      setUserId(decodedToken.id);
      setEmail(decodedToken.email);
      setName(decodedToken.name);

      // Fetch classes for the logged-in user from the server
      axios
        .get(baseURL+`/teacher/classes/${decodedToken.id}`)
        .then((response) => {
          console.log(response.data.response);
          setClasses(response.data.response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);


  return (
    <>
    <div className="card-container">
      {cards.map((card, index) => (
        <a key={index} href={card.link} className="card" style={{ backgroundColor: card.bgColor }}>
          <div className="card-heading">
            <div className={`icon ${card.icon}`} />
            <h3>{card.title}</h3>
          </div>
          <p className="card-description">{card.description}</p>
        </a>
        
      ))}
      
    </div>
    {/* New Section */}
    <div className="section">
        
    </div>


    <div>
      <center>
        <div className={styles.Intro}>
          <p>
            Teacher Name : {name} | Teacher Email : {email}{" "}
          </p>
        </div>

        <div>
          {classes.map((cls) => (
            <button className={styles.classes} key={cls._id} onClick={()=>{
              navigate(`/teacher/class/${cls._id}`)
            }}>
              {cls.subjectName}
            </button>
          ))}

          <button
            className={styles.logInButton}
            onClick={() => {
              navigate(`/teacher/createclass`);
            }}
          >
            Create A Class
          </button>

          <button className={styles.logout} onClick={handleLogout}>
            LOGOUT
          </button>
        </div>
      </center>
    </div>

    </>
  );
}

export default TDashboard;