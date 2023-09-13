import React, { useState , useEffect } from 'react';
import dashIcon from '../../../Assets/images/dashboard.png';
import perfIcon from '../../../Assets/images/tre.png';
import assignIcon from '../../../Assets/images/assign.png';
import logoutIcon from '../../../Assets/images/logout.png';
import accsetIcon from '../../../Assets/images/user-gear.png';
import dataIcon from '../../../Assets/images/aud.png';
import userIcon from '../../../Assets/images/user2.png';
import quizIcon from '../../../Assets/images/quiz.png';
import lectIcon from '../../../Assets/images/le.png';
import retIcon from '../../../Assets/images/return1.png';
import delIcon from '../../../Assets/images/del.png';

import AssignmentPage from '../../../Pages/Teacher/Assignment/Assignment';
import AssignmentList from '../../../Pages/Teacher/AssigmentList/AssignmentList';
import Class from '../../../Pages/Classes/Class/Class';

import './Solution.css';
// import './TSidebar.css';
import './TContent.css';



import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Solution() {
  const [currentPage, setCurrentPage] = useState('dashboard'); // Initial page

  const baseURL = process.env.React_App_INTERNAL_API_PATH;
  const [name, setName] = useState(null);
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const { _id } = useParams();

  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
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

  const handleLogout = async () => {
    localStorage.removeItem("authToken");
    
    navigate('/');
  };
  const handleLeaveClass = async () => {
    navigate('/TDashboard');
  };


  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <div className="solution-container">
      <div className="td-sidebar">
        <div className='t-menu-icon' id="menuIcon" onClick={toggleMenu}>
          {isMenuOpen ? (
            <i className="fas fa-times" id="openIcon" />
          ) : (
            <i className="fas fa-bars" id="closeIcon" />
          )}
        </div>
        <div className="td-sidebar-top">
          <div className="td-sidebar-icon">
            <img src={userIcon} alt="Icon" className="td-sidebar-icon" />
          </div>
          <div className="td-sidebar-text">{name}</div>
        </div>
        <div className="td-sidebar-middle">
          <button className="td-sidebar-button" onClick={() => handlePageChange('dashboard')}>
            <img src={dashIcon} alt="Icon" className="td-sidebar-button-icon" />
            Dashboard
          </button>
          <button className="td-sidebar-button" onClick={() => handlePageChange('performance')}>
            <img src={perfIcon} alt="Icon" className="td-sidebar-button-icon" />
            Performance
          </button>
          <button className="td-sidebar-button" onClick={() => handlePageChange('lectures')}>
            <img src={lectIcon} alt="Icon" className="td-sidebar-button-icon" />
            Lectures
          </button>
          <button className="td-sidebar-button" onClick={() => handlePageChange('class')}>
            <img src={dataIcon} alt="Icon" className="td-sidebar-button-icon" />
            Class Data
          </button>
          <button className="td-sidebar-button" onClick={() => handlePageChange('assignment')}>
            <img src={assignIcon} alt="Icon" className="td-sidebar-button-icon" />
            Assignment
          </button>
          <button className="td-sidebar-button" onClick={() => handlePageChange('assignmentList')}>
            <img src={assignIcon} alt="Icon" className="td-sidebar-button-icon" />
            Assignment List
          </button>
          <button className="td-sidebar-button" onClick={() => handlePageChange('quiz')}>
            <img src={quizIcon} alt="Icon" className="td-sidebar-button-icon" />
            Quiz
          </button>
        </div>

        <div className="td-sidebar-bottom">
          <button className="td-sidebar-button" onClick={handleLeaveClass}>
            <img src={retIcon} alt="Icon" className="td-sidebar-button-icon" />
            Leave Class
          </button>
          <button className="td-sidebar-button" onClick={() => handlePageChange('account')}>
            <img src={accsetIcon} alt="Icon" className="td-sidebar-button-icon" />
            User Settings
          </button>
          <button className="td-sidebar-button" onClick={handleLogout}>
            <img src={logoutIcon} alt="Icon" className="td-sidebar-button-icon" />
            Logout
          </button>
        </div>

        <div className="td-sidebar-bottom-d">
          <button className="td-sidebar-button" onClick={() => handlePageChange('delete')}>
            <img src={delIcon} alt="Icon" className="td-sidebar-button-icond" />
            Delete Class <br />Permanently
          </button>
        </div>
      </div>

      <div className="td-content">
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
    </div>
  );
}

export default Solution;
