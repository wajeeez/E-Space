import React, { useState } from 'react';
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



// import AssignmentList from '../../../Pages/Teacher/AssigmentList/AssignmentList';
import StdAssignment from '../../../Pages/Student/Assignment/stdAssignment';
import StdClass from '../../../Pages/Classes/StdClass/StdClass';

import './SSolution.css';
// import './SSidebar.css';
import './SContent.css';


function SSolution() {
  const [currentPage, setCurrentPage] = useState('dashboard'); // Initial page

  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
  };

  return (
    <div className="Ssolution-container">
      <div className="sd-sidebar">
        <div className="sd-sidebar-top">
          <div className="sd-sidebar-icon">
            <img src={userIcon} alt="Icon" className="sd-sidebar-icon" />
          </div>
          <div className="sd-sidebar-text">Wajahat</div>
        </div>
        <div className="sd-sidebar-middle">
          <button className="sd-sidebar-button" onClick={() => handlePageChange('dashboard')}>
            <img src={dashIcon} alt="Icon" className="sd-sidebar-button-icon" />
            Dashboard
          </button>
          <button className="sd-sidebar-button" onClick={() => handlePageChange('performance')}>
            <img src={perfIcon} alt="Icon" className="sd-sidebar-button-icon" />
            Performance
          </button>
          <button className="sd-sidebar-button" onClick={() => handlePageChange('lectures')}>
            <img src={lectIcon} alt="Icon" className="sd-sidebar-button-icon" />
            Lectures
          </button>
          <button className="sd-sidebar-button" onClick={() => handlePageChange('class')}>
            <img src={dataIcon} alt="Icon" className="sd-sidebar-button-icon" />
            Class Data
          </button>
          <button className="sd-sidebar-button" onClick={() => handlePageChange('assignment')}>
            <img src={assignIcon} alt="Icon" className="sd-sidebar-button-icon" />
            Assignment
          </button>
          {/* <button className="sd-sidebar-button" onClick={() => handlePageChange('assignmentList')}>
            <img src={assignIcon} alt="Icon" className="sd-sidebar-button-icon" />
            Assignment List
          </button> */}
          <button className="sd-sidebar-button" onClick={() => handlePageChange('quiz')}>
            <img src={quizIcon} alt="Icon" className="sd-sidebar-button-icon" />
            Quiz
          </button>
        </div>

        <div className="sd-sidebar-bottom">
          <button className="sd-sidebar-button" onClick={() => handlePageChange('return')}>
            <img src={retIcon} alt="Icon" className="sd-sidebar-button-icon" />
            Leave Class
          </button>
          <button className="sd-sidebar-button" onClick={() => handlePageChange('account')}>
            <img src={accsetIcon} alt="Icon" className="sd-sidebar-button-icon" />
            User Settings
          </button>
          
        </div>

        <div className="sd-sidebar-bottom-d">
          <button className="sd-sidebar-button" onClick={() => handlePageChange('logout')}>
            <img src={logoutIcon} alt="Icon" className="sd-sidebar-button-icon" />
            Logout
          </button>
        </div>
      </div>

      <div className="sd-content">
        {currentPage === 'dashboard' && <StdClass />}
        {currentPage === 'lectures' && <div>lectures</div>}
        {currentPage === 'assignment' && <StdAssignment/>}
        {/* {currentPage === 'assignmentList' && <AssignmentList />} */}
        {currentPage === 'quiz' && <div>quiz</div>}
        {currentPage === 'account' && <div>user</div>}
        {currentPage === 'class' && <div>class</div>}
        {currentPage === 'performance' && <div>performance</div>}
        {currentPage === 'return' && <div>home</div>}
        {currentPage === 'delete' && <div>delete</div>}
        {currentPage === 'logout' && <div>logout</div>}
      </div>
    </div>
  );
}

export default SSolution;
