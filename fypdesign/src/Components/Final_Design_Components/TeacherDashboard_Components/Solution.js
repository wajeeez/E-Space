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
import delIcon from '../../../Assets/images/del.png';

import AssignmentPage from '../../../Pages/Teacher/Assignment/Assignment';
import AssignmentList from '../../../Pages/Teacher/AssigmentList/AssignmentList';
import Class from '../../../Pages/Classes/Class/Class';

import './Solution.css';
// import './TSidebar.css';
import './TContent.css';


function Solution() {
  const [currentPage, setCurrentPage] = useState('dashboard'); // Initial page

  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
  };

  return (
    <div className="solution-container">
      <div className="td-sidebar">
        <div className="td-sidebar-top">
          <div className="td-sidebar-icon">
            <img src={userIcon} alt="Icon" className="td-sidebar-icon" />
          </div>
          <div className="td-sidebar-text">Wajahat</div>
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
          <button className="td-sidebar-button" onClick={() => handlePageChange('return')}>
            <img src={retIcon} alt="Icon" className="td-sidebar-button-icon" />
            Leave Class
          </button>
          <button className="td-sidebar-button" onClick={() => handlePageChange('account')}>
            <img src={accsetIcon} alt="Icon" className="td-sidebar-button-icon" />
            User Settings
          </button>
          <button className="td-sidebar-button" onClick={() => handlePageChange('logout')}>
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
        {currentPage === 'logout' && <div>logout</div>}
      </div>
    </div>
  );
}

export default Solution;
