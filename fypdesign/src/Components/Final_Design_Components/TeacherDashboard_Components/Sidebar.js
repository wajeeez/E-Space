import React from 'react';
import './Sidebar.css';
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


const Sidebar = ({ onPageChange }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-icon">
          <img src={userIcon} alt="Icon" className="sidebar-icon" />
        </div>
        <div className="sidebar-text">Wajahat</div>
      </div>
      <div className="sidebar-middle">
        <button className="sidebar-button" onClick={() => onPageChange('dashboard')}>
          <img src={dashIcon} alt="Icon" className="sidebar-button-icon" />
          Dashboard
        </button>
        <button className="sidebar-button" onClick={() => onPageChange('performance')}>
          <img src={perfIcon} alt="Icon" className="sidebar-button-icon" />
          Performance
        </button>
        <button className="sidebar-button" onClick={() => onPageChange('lectures')}>
          <img src={lectIcon} alt="Icon" className="sidebar-button-icon" />
          Lectures
        </button>
        <button className="sidebar-button" onClick={() => onPageChange('class')}>
          <img src={dataIcon} alt="Icon" className="sidebar-button-icon" />
          Class Data
        </button>
        <button className="sidebar-button" onClick={() => onPageChange('assignment')}>
          <img src={assignIcon} alt="Icon" className="sidebar-button-icon" />
          Assignment
        </button>
        <button className="sidebar-button" onClick={() => onPageChange('assignmentList')}>
          <img src={assignIcon} alt="Icon" className="sidebar-button-icon" />
          AssignmentList
        </button>
        <button className="sidebar-button" onClick={() => onPageChange('quiz')}>
          <img src={quizIcon} alt="Icon" className="sidebar-button-icon" />
          Quiz
        </button>
      </div>

      <div className="sidebar-bottom">
      <button className="sidebar-button" onClick={() => onPageChange('return')}>
          <img src={retIcon} alt="Icon" className="sidebar-button-icon" />
          Leave Class
        </button>
        <button className="sidebar-button" onClick={() => onPageChange('account')}>
          <img src={accsetIcon} alt="Icon" className="sidebar-button-icon" />
          User Settings
        </button>
        <button className="sidebar-button" onClick={() => onPageChange('logout')}>
          <img src={logoutIcon} alt="Icon" className="sidebar-button-icon" />
          Logout
        </button>

      </div>

      <div className="sidebar-bottom-d">
        <button className="sidebar-button" onClick={() => onPageChange('delete')}>
          <img src={delIcon} alt="Icon" className="sidebar-button-icond" />
          Delete Class <br />Permanently
        </button>
      </div>

    </div>
  );
};

export default Sidebar;
