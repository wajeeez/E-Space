import React, { useState, useEffect } from 'react';
import AssignmentPage from '../../../Pages/Teacher/Assignment/Assignment';
import AssignmentList from '../../../Pages/Teacher/AssigmentList/AssignmentList';
import Class from '../../../Pages/Classes/Class/Class';

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
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import userIcon from '../../../Assets/images/user.png';
import logoImage from '../../../Assets/images/logo1.png';
import './Tmain.css';



function Tmain() {
  const [currentPage, setCurrentPage] = useState('dashboard'); // Initial page

  const baseURL = process.env.React_App_INTERNAL_API_PATH;
  const [name, setName] = useState(null);
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const { _id } = useParams();

  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
  };

  const menuBtnChange = () => {
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.querySelector("#btn");

    if (sidebar.classList.contains("open")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  };

  const handleSidebarToggle = () => {
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.querySelector("#btn");

    sidebar.classList.toggle("open");
    menuBtnChange();
  };

  useEffect(() => {
    axios
      .get(baseURL + `/teacher/class/${_id}`)
      .then((response) => {
        setName(response.data.response.teacherName);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
    navigate('/TDashboard');
  };

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 700);
    
    return (
      <div className="tmain">
        
         <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
         <link href="https://kit.fontawesome.com/a19fe5b40c.js" crossorigin="anonymous"/>
    <div class="sidebar open">
    <div class="logo_details">
      
      <img src={logoImage} alt="Logo" class="logo_image"/>
      <i class="bx bx-menu" id="btn"></i>
    </div>
    {/* <li class="profile">
        <div class="profile_details">
          <img src={userIcon} alt="profile image" class='user_image'/>
          <div class="profile_content">
            <div class="name">{name}</div>
            
          </div>
        
        </div>
        
      </li> */}
    <ul class="nav-list">
    <lis>
        <img src={userIcon} alt="profile image" class='user_image'/>
        
          <p class="name">{name}</p>
        
      </lis> 
      
      <p className='ps'>x</p>
      <li>
        <a onClick={() => { handlePageChange('dashboard');}}>
        {/* <img src={dashIcon} alt="Icon" className="button-icon" /> */}
        <i class='bx bx-home-alt-2'></i>
          <span class="link_name">Dashboard</span>
        </a>
        <span class="tooltip">Dashboard</span>
      </li>
      <li>
        <a onClick={() => handlePageChange('performance')}>
        {/* <img src={perfIcon} alt="Icon" className="button-icon" /> */}
        <i class='bx bx-bar-chart-alt-2'></i>
          <span class="link_name">Analysis</span>
        </a>
        <span class="tooltip">Analysis</span>
      </li>
      <li>
      <a onClick={() => handlePageChange('lectures')}>
        {/* <img src={lectIcon} alt="Icon" className="button-icon" /> */}
        <i class='bx bxs-slideshow'></i>
          <span class="link_name">Lectures</span>
        </a>
        <span class="tooltip">Lectures</span>
      </li>
      <li>
      <a onClick={() => handlePageChange('class')}>
        {/* <img src={dataIcon} alt="Icon" className="button-icon" /> */}
        {/* <FontAwesomeIcon icon="fa-thin fa-people-group" style={{color: "#000000",}} /> */}
        <i class='bx bxs-contact'></i>
          <span class="link_name">Management</span>
        </a>
        <span class="tooltip">Class Management</span>
      </li>
      <li>
        <a  onClick={() => handlePageChange('assignment')}>
        {/* <img src={assignIcon} alt="Icon" className="button-icon" /> */}
        <i class='bx bx-edit'></i>
          <span class="link_name">Assignment</span>
        </a>
        <span class="tooltip">Assignment</span>
      </li>
      <li>
        <a  onClick={() => handlePageChange('assignment')}>
        
        <i class='bx bx-edit'></i>
          <span class="link_name">Group Assignment</span>
        </a>
        <span class="tooltip">Group Assignment</span>
      </li>
      <li>
        <a onClick={() => handlePageChange('assignmentList')}>
        {/* <img src={subIcon} alt="Icon" className="button-icon" /> */}
        <i class='bx bx-list-check' ></i>
          <span class="link_name">Submissions</span>
        </a>
        <span class="tooltip">Submissions</span>
      </li>
      <li>
      <a onClick={() => handlePageChange('quiz')}>
        {/* <img src={quizIcon} alt="Icon" className="button-icon" /> */}
        <i class='bx bx-timer' ></i>
          <span class="link_name">Quiz</span>
        </a>
        <span class="tooltip">Quiz</span>
      </li>
      <li>
      
      <a onClick={() => handlePageChange('delete')}>
      {/* <img src={delIcon} alt="Icon" className="button-icon" /> */}
      <i class='bx bx-x-circle'></i>
        <span class="link_name">Delete Class</span>
      </a>
      <span class="tooltip">Delete Class</span>
    </li>


      <p className='ps'>x</p>
      <li>
        
        <a onClick={handleLeaveClass}>
        {/* <img src={retIcon} alt="Icon" className="button-icon" /> */}
        <i class='bx bxs-chevrons-left' ></i>
          <span class="link_name">Leave Class</span>
        </a>
        
        <span class="tooltip">Leave Class</span>
      </li>
      <p className='ps'>x</p>
      
      <li>
        <a onClick={() => handlePageChange('account')}>
        {/* <img src={accsetIcon} alt="Icon" className="button-icon" /> */}
        <i class='bx bxs-user-detail' ></i>
          <span class="link_name">User Settings</span>
        </a>
        <span class="tooltip">User Setting</span>
      </li>
      <li>
        <a onClick={handleLogout}>
        {/* <img src={logoutIcon} alt="Icon" className="button-icon" /> */}
        <i class='bx bx-arrow-to-left' ></i>
          <span class="link_name">Logout</span>
        </a>
        <span class="tooltip">Logout</span>
      </li>
      

      
    </ul>
  </div>
  <section class="home-section">
    
    <div className="tpage" >
          {currentPage === 'dashboard' && <Class />}
          {currentPage === 'lectures' && <div>lectures</div>}
          {currentPage === 'assignment' && <AssignmentPage />}
          {currentPage === 'assignmentList' && <AssignmentList />}
          {currentPage === 'quiz' && <div>quiz</div>}
          {currentPage === 'account' && <div>user</div>}
          {currentPage === 'class' && <div>class</div>}
          {currentPage === 'performance' && <div>performance</div>}
          {currentPage === 'return' && <div>home</div>}
          {currentPage === 'delete' && <div>delete</div>}
          
    </div>
  </section>
        
      </div>
    );
  }
  
  export default Tmain;
  