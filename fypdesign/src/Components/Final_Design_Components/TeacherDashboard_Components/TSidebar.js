import React from 'react';
import './TSidebar.css';
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


const TSidebar = ({ onPageChange }) => {
  return (
    <div className="tsidebar">
      <div className="tsidebar-top">
        <div className="tsidebar-icon">
          <img src={userIcon} alt="Icon" className="tsidebar-icon" />
        </div>
        <div className="tsidebar-text">Wajahat</div>
      </div>
      <div className="tsidebar-middle">
        <button className="tsidebar-button" onClick={() => onPageChange('dashboard')}>
          <img src={dashIcon} alt="Icon" className="tsidebar-button-icon" />
          Dashboard
        </button>
        <button className="tsidebar-button" onClick={() => onPageChange('performance')}>
          <img src={perfIcon} alt="Icon" className="tsidebar-button-icon" />
          Performance
        </button>
        <button className="tsidebar-button" onClick={() => onPageChange('lectures')}>
          <img src={lectIcon} alt="Icon" className="tsidebar-button-icon" />
          Lectures
        </button>
        <button className="tsidebar-button" onClick={() => onPageChange('class')}>
          <img src={dataIcon} alt="Icon" className="tsidebar-button-icon" />
          Class Data
        </button>
        <button className="tsidebar-button" onClick={() => onPageChange('assignment')}>
          <img src={assignIcon} alt="Icon" className="tsidebar-button-icon" />
          Assignment
        </button>
        <button className="tsidebar-button" onClick={() => onPageChange('assignmentList')}>
          <img src={assignIcon} alt="Icon" className="tsidebar-button-icon" />
          AssignmentList
        </button>
        <button className="tsidebar-button" onClick={() => onPageChange('quiz')}>
          <img src={quizIcon} alt="Icon" className="tsidebar-button-icon" />
          Quiz
        </button>
      </div>

      <div className="tsidebar-bottom">
      <button className="tsidebar-button" onClick={() => onPageChange('return')}>
          <img src={retIcon} alt="Icon" className="tsidebar-button-icon" />
          Leave Class
        </button>
        <button className="tsidebar-button" onClick={() => onPageChange('account')}>
          <img src={accsetIcon} alt="Icon" className="tsidebar-button-icon" />
          User Settings
        </button>
        <button className="tsidebar-button" onClick={() => onPageChange('logout')}>
          <img src={logoutIcon} alt="Icon" className="tsidebar-button-icon" />
          Logout
        </button>

      </div>

      <div className="tsidebar-bottom-d">
        <button className="tsidebar-button" onClick={() => onPageChange('delete')}>
          <img src={delIcon} alt="Icon" className="tsidebar-button-icond" />
          Delete Class <br />Permanently
        </button>
      </div>

    </div>
  );
};

export default TSidebar;
