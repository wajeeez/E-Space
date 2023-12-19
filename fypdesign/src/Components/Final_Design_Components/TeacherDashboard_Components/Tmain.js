import React, { useState, useEffect } from 'react';
import AssignmentPage from '../../../Pages/Teacher/Assignment/Assignment';
import AssignmentList from '../../../Pages/Teacher/AssigmentList/AssignmentList';
import Class from '../../../Pages/Classes/Class/Class';
import Management from '../../../Pages/Classes/ClassManagemenet/Management';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap'; // Make sure to import Modal and Button from 'react-bootstrap'
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

import GroupAssignmentTeacher from '../../../Pages/Teacher/GroupAssignmentTeacher/GroupAssignmentTeacher';
import userIcon from '../../../Assets/images/user.png';
import logoImage from '../../../Assets/images/logo1.png';
import './Tmain.css';

import Lectures from '../../../Pages/Teacher/Lectures/Lectures';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Quiz from '../../../Pages/Teacher/Quiz/TQuiz';
import Qlist from '../../../Pages/Teacher/Quiz/Qlist.js';
import Analysis from '../../../Pages/Teacher/Analysis/Analysis';
import Analysis2 from '../../../Pages/Teacher/Analysis/Analysis2';

import Analysis3 from '../../../Pages/Teacher/Analysis/Analysis3';
import TUserSetting from './TUserSetting';
function Tmain() {
  const [currentPage, setCurrentPage] = useState(() => {
    // Use localStorage to get the last visited page or set a default value
    return localStorage.getItem('lastVisitedPage') || 'dashboard';
  });
  const baseURL = process.env.React_App_INTERNAL_API_PATH;
  const [name, setName] = useState(null);
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const { _id } = useParams();

  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);

    // Save the current page to localStorage
    localStorage.setItem('lastVisitedPage', pageName);
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

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1200);

  // Function to handle window resize
  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 1200);
  };
  const sidebarClass = isSmallScreen ? "sidebar" : "sidebar open";
  // Effect to add event listener for window resize
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array means this effect runs once after mounting


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
    localStorage.removeItem('lastVisitedPage');
    navigate('/', { replace: true });
  };

  const handleLeaveClass = async () => {
    navigate('/TDashboard');
    localStorage.removeItem('lastVisitedPage');
  };



  const [showDeleteModal, setShowDeleteModal] = useState(false);


  async function deleteClass(classId) {
    try {
      const response = await axios.post(baseURL+`/teacher/deleteClass/${classId}`);
    
     

      if (response.status === 200) {
        console.log(response.data);
        toast.success("Class Deleted Successfully", {
          autoClose: 1000,
          position: toast.POSITION.TOP_RIGHT,
        })
        
        
        setTimeout(() => {
          navigate("/TDashboard");
          localStorage.removeItem('lastVisitedPage');
        }, 1000);
       
      } else {
        console.error('Unexpected status code:', response.status);
        toast.error("Something went wrong", {
          autoClose: 1000,
          position: toast.POSITION.TOP_RIGHT,
        })
        // Handle unexpected status code, e.g., show an error message
      }
     
    } catch (error) {
      console.error(error.response.data);
      toast.error("Something went wrong", {
        autoClose: 1000,
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  const handleDeleteConfirmed = () => {
    
    deleteClass(_id);
    setShowDeleteModal(false);
  };

  const handleDeleteCancelled = () => {
    // Handle cancel action
    setShowDeleteModal(false);
  };

  const DeleteClassModal = ({ show, handleDeleteConfirmed, handleDeleteCancelled }) => {
    return (
      <Modal show={show} onHide={handleDeleteCancelled} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Are you sure you want to Permanently Delete this Class?</h5>
        </Modal.Body>
        <Modal.Footer className="justify-content-center align-items-center d-flex">
          <Button
            variant="danger"
            onClick={handleDeleteConfirmed}
            style={{ marginRight: '20px', width: '100px', maxWidth: '150px', fontSize: 'large' }}
          >
            Yes
          </Button>
          <Button
            variant="secondary"
            onClick={handleDeleteCancelled}
            style={{ marginLeft: '20px', width: '100px', maxWidth: '150px', fontSize: 'large' }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
        );
      };
    
    return (
      <div className="container-fluid tmain" style={{overflow:'auto',}}>
        
         <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
         <link href="https://kit.fontawesome.com/a19fe5b40c.js" crossorigin="anonymous"/>
    <div class={sidebarClass}>
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
        
          <p style={{cursor:'default',color:'white'}}>{name}</p>
        
      </lis> 

      <li>
        <Link onClick={() => { handlePageChange('dashboard');}}>
        {/* <img src={dashIcon} alt="Icon" className="button-icon" /> */}
        <i class='bx bx-home-alt-2'></i>
          <span class="link_name">Dashboard</span>
        </Link>
        <span class="tooltip">Dashboard</span>
      </li>
      <li>
        <Link onClick={() => handlePageChange('performance')}>
        {/* <img src={perfIcon} alt="Icon" className="button-icon" /> */}
        <i class='bx bx-bar-chart-alt-2'></i>
          <span class="link_name">Analysis</span>
        </Link>
        <span class="tooltip">Analysis</span>
      </li>
      <li>
      <Link onClick={() => handlePageChange('lectures')}>
        {/* <img src={lectIcon} alt="Icon" className="button-icon" /> */}
        <i class='bx bxs-slideshow'></i>
          <span class="link_name">Lectures</span>
        </Link>
        <span class="tooltip">Lectures</span>
      </li>
      <li>
      <Link onClick={() => handlePageChange('class')}>
        {/* <img src={dataIcon} alt="Icon" className="button-icon" /> */}
        {/* <FontAwesomeIcon icon="fa-thin fa-people-group" style={{color: "#000000",}} /> */}
        <i class='bx bxs-contact'></i>
          <span class="link_name">Management</span>
        </Link>
        <span class="tooltip">Class Management</span>
      </li>
      <li>
        <Link  onClick={() => handlePageChange('assignment')}>
        {/* <img src={assignIcon} alt="Icon" className="button-icon" /> */}
        <i class='bx bx-edit'></i>
          <span class="link_name">Assignment</span>
        </Link>
        <span class="tooltip">Assignment</span>
      </li>
      <li>
        <Link  onClick={() => handlePageChange('groupAssignment')}>
        
        <i class='bx bx-edit'></i>
          <span class="link_name">Group Assignment</span>
        </Link>
        <span class="tooltip">Group Assignment</span>
      </li>
      <li>
        <Link onClick={() => handlePageChange('assignmentList')}>
        {/* <img src={subIcon} alt="Icon" className="button-icon" /> */}
        <i class='bx bx-list-check' ></i>
          <span class="link_name">Assign Submissions</span>
        </Link>
        <span class="tooltip"> Assign Submissions</span>
      </li>
      <li>
      <Link onClick={() => handlePageChange('quiz')}>
        {/* <img src={quizIcon} alt="Icon" className="button-icon" /> */}
        <i class='bx bx-timer' ></i>
          <span class="link_name">Quiz</span>
        </Link>
        <span class="tooltip">Quiz</span>
      </li>
      <li>
      <Link onClick={() => handlePageChange('qlist')}>
        {/* <img src={quizIcon} alt="Icon" className="button-icon" /> */}
        <i class='bx bx-timer' ></i>
          <span class="link_name">Quiz Submissions</span>
        </Link>
        <span class="tooltip">Quiz Submissions</span>
      </li>
      <li>
      
      <a onClick={() => setShowDeleteModal(true)}>
      {/* <img src={delIcon} alt="Icon" className="button-icon" /> */}
      <i class='bx bx-x-circle'></i>
        <span class="link_name">Delete Class</span>
      </a>
      <span class="tooltip">Delete Class</span>

      <DeleteClassModal
        show={showDeleteModal}
        handleDeleteConfirmed={handleDeleteConfirmed}
        handleDeleteCancelled={handleDeleteCancelled}
      />
    </li>


      <p className='ps'>x</p>
      <li>
        
        <Link onClick={handleLeaveClass}>
        {/* <img src={retIcon} alt="Icon" className="button-icon" /> */}
        <i class='bx bxs-chevrons-left' ></i>
          <span class="link_name">Leave Class</span>
        </Link>
        
        <span class="tooltip">Leave Class</span>
      </li>
      {/* <p className='ps'>x</p> */}
      
      <li>
        <Link onClick={() => handlePageChange('account')}>
        {/* <img src={accsetIcon} alt="Icon" className="button-icon" /> */}
        <i class='bx bxs-user-detail' ></i>
          <span class="link_name">User Settings</span>
        </Link>
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
  <section class="container-fluid home-section">
    
    {/* <div className="tpage" > */}
          {currentPage === 'dashboard' && <Class />}
          {currentPage === 'lectures' && <Lectures/>}
          {currentPage === 'assignment' && <AssignmentPage />}
          {currentPage === 'assignmentList' && <AssignmentList />}
          {currentPage === 'groupAssignment' && <GroupAssignmentTeacher />}
          {currentPage === 'quiz' && <Quiz/>}
          {currentPage === 'qlist' && <Qlist/>}
          {currentPage === 'class' && <Management></Management>}
          {currentPage === 'performance' && <Analysis3></Analysis3>}
          {currentPage === 'return' && <div>home</div>}
          {currentPage === 'delete' && <div>delete</div>}
          
    {/* </div> */}
  </section>

  <ToastContainer/>
        
      </div>
    );
  }
  
  export default Tmain;
