import React, { useState, useEffect } from 'react';
import StdAssignment from '../../../Pages/Student/Assignment/stdAssignment';
import StdClass from '../../../Pages/Classes/StdClass/StdClass';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// import dashIcon from '../../../Assets/images/dashboard.png';
// import perfIcon from '../../../Assets/images/tre.png';
// import subIcon from '../../../Assets/images/checklist.png';
// import logoutIcon from '../../../Assets/images/logout.png';
// import accsetIcon from '../../../Assets/images/user-gear.png';
// import dataIcon from '../../../Assets/images/aud.png';
// import delIcon from '../../../Assets/images/del.png';
// import quizIcon from '../../../Assets/images/quiz.png';
// import lectIcon from '../../../Assets/images/le.png';
// import retIcon from '../../../Assets/images/return1.png';
// import assignIcon from '../../../Assets/images/assign.png';
// import '@fortawesome/fontawesome-free/css/all.min.css';

import userIcon from '../../../Assets/images/user.png';
import logoImage from '../../../Assets/images/logo1.png';
import './Smain.css';
import StdLectures from '../../../Pages/Student/Lectures/StdLectures';


function Smain() {
    const [currentPage, setCurrentPage] = useState('dashboard'); // Initial page

    const baseURL = process.env.React_App_INTERNAL_API_PATH;
    const navigate = useNavigate()
    const [std, setStd] = useState([]);
    const [email, setEmail] = useState(null);
    const [classes, setClasses] = useState([]);
    const { _id } = useParams()
  
    const handlePageChange = (pageName) => {
      setCurrentPage(pageName);
    };

    useEffect(() => {
        const authToken = localStorage.getItem("StdToken");
        if (authToken) {
          const decodedToken = jwt_decode(authToken);
          setEmail(decodedToken.email);
    
          // Fetch classes for the logged-in user from the server
          axios
            .get(baseURL + `/student/studentData/${decodedToken.email}`)
            .then((response) => {
              console.log(response.data.response);
              setStd(response.data.response.stdName);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }, []);

  const menuBtnChange = () => {
    const ssidebar = document.querySelector(".ssidebar");
    const closeBtn = document.querySelector("#btn");

    if (ssidebar.classList.contains("open")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  };

  const handleSidebarToggle = () => {
    const ssidebar = document.querySelector(".ssidebar");
    const closeBtn = document.querySelector("#btn");

    ssidebar.classList.toggle("open");
    menuBtnChange();
  };



  // Call the setup function after the DOM is ready
  useEffect(() => {
    const closeBtn = document.querySelector("#btn");
    closeBtn.addEventListener("click", handleSidebarToggle);

    // Cleanup the event listener when the component unmounts
    return () => {
      closeBtn.removeEventListener("click", handleSidebarToggle);
    };
  }, []); // Empty dependency array means this effect runs once after mounting

  const handleLogout = async () => {
    localStorage.removeItem("authToken");
    navigate('/');
  };

  const handleLeaveClass = async () => {
    navigate('/std/dashboard');
  };

    
    return (
      <div className="container-fluid smain">
         <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
        
        <div class="ssidebar open">
    <div class="logo_details">
      
      <img src={logoImage} alt="Logo" class="logo_image"/>
      <i class="bx bx-menu" id="btn"></i>
    </div>
    {/* <li class="profile">
        <div class="profile_details">
          <img src={userIcon} alt="profile image" class='user_image'/>
          <div class="profile_content">
            <div class="name">{std}</div>
            
          </div>
        
        </div>
        
      </li> */}
    <ul class="snav-list">
    <lis>
        <img src={userIcon} alt="profile image" class='user_image'/>
        
          <p class="name">{std}</p>
        
      </lis>

      <p className='pss'>x</p>
      <li>
        <Link onClick={() => { handlePageChange('dashboard');}}>
        <i class='bx bx-home-alt-2'></i>
          <span class="link_name">Dashboard</span>
        </Link>
        <span class="tooltip">Dashboard</span>
      </li>
      <li>
        <Link onClick={() => handlePageChange('performance')}>
        <i class='bx bx-bar-chart-alt-2'></i>
          <span class="link_name">Analysis</span>
        </Link>
        <span class="tooltip">Analysis</span>
      </li>
      <li>
        <Link onClick={() => handlePageChange('lectures')}>
        <i class='bx bxs-slideshow'></i>
          <span class="link_name">Lectures</span>
        </Link>
        <span class="tooltip">Lectures</span>
      </li>
      
      <li>
        <Link  onClick={() => handlePageChange('assignment')}>
        <i class='bx bx-edit'></i>
          <span class="link_name">Assignment</span>
        </Link>
        <span class="tooltip">Assignment</span>
      </li>
      <li>
        <Link  onClick={() => handlePageChange('assignment')}>
        <i class='bx bxs-group'></i>
          <span class="link_name">Group Assignment</span>
        </Link>
        <span class="tooltip">Group Assignment</span>
      </li>
      
      <li>
        <Link href="#">
        <i class='bx bx-timer' ></i>
          <span class="link_name">Quiz</span>
        </Link>
        <span class="tooltip">Quiz</span>
      </li>
      <p className='pss'>x</p>
      <li>
        <Link onClick={handleLeaveClass}>
        <i class='bx bxs-chevrons-left' ></i>
          <span class="link_name">Leave Class</span>
        </Link>
        <span class="tooltip">Leave Class</span>
      </li>
      <p className='pss'>x</p>
      <li>
        <Link onClick={() => handlePageChange('account')}>
        <i class='bx bxs-user-detail' ></i>
          <span class="link_name">User Settings</span>
        </Link>
        <span class="tooltip">User Setting</span>
      </li>
      <li>
        <a onClick={handleLogout}>
        <i class='bx bx-arrow-to-left' ></i>
          <span class="link_name">Logout</span>
        </a>
        <span class="tooltip">Logout</span>
      </li>
      
      
    </ul>
  </div>
  <div class="container-fluid shome-section">
    
    {/* <div className="spage" > */}
        {currentPage === 'dashboard' && <StdClass />}
        {currentPage === 'lectures' && <StdLectures/>}
        {currentPage === 'assignment' && <StdAssignment />}
        {/* {currentPage === 'assignmentList' && <AssignmentList />} */}
        {currentPage === 'quiz' && <div>quiz</div>}
        {currentPage === 'account' && <div>user</div>}
        {currentPage === 'class' && <div>class</div>}
        {currentPage === 'performance' && <div>performance</div>}
        {currentPage === 'return' && <div>home</div>}
        
          
    {/* </div> */}
  </div>
        
      </div>
    );
  }
  
  export default Smain;
  