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
    <div className="td-sdiebar">
      <div className="td-sdiebar-top">
        <div className="td-sdiebar-icon">
          <img src={userIcon} alt="Icon" className="td-sdiebar-icon" />
        </div>
        <div className="td-sdiebar-text">Wajahat</div>
      </div>
      <div className="td-sdiebar-middle">
        <button className="td-sdiebar-button" onClick={() => onPageChange('dashboard')}>
          <img src={dashIcon} alt="Icon" className="td-sdiebar-button-icon" />
          Dashboard
        </button>
        <button className="td-sdiebar-button" onClick={() => onPageChange('performance')}>
          <img src={perfIcon} alt="Icon" className="td-sdiebar-button-icon" />
          Performance
        </button>
        <button className="td-sdiebar-button" onClick={() => onPageChange('lectures')}>
          <img src={lectIcon} alt="Icon" className="td-sdiebar-button-icon" />
          Lectures
        </button>
        <button className="td-sdiebar-button" onClick={() => onPageChange('class')}>
          <img src={dataIcon} alt="Icon" className="td-sdiebar-button-icon" />
          Class Data
        </button>
        <button className="td-sdiebar-button" onClick={() => onPageChange('assignment')}>
          <img src={assignIcon} alt="Icon" className="td-sdiebar-button-icon" />
          Assignment
        </button>
        <button className="td-sdiebar-button" onClick={() => onPageChange('assignmentList')}>
          <img src={assignIcon} alt="Icon" className="td-sdiebar-button-icon" />
          AssignmentList
        </button>
        <button className="td-sdiebar-button" onClick={() => onPageChange('quiz')}>
          <img src={quizIcon} alt="Icon" className="td-sdiebar-button-icon" />
          Quiz
        </button>
      </div>

      <div className="td-sdiebar-bottom">
      <button className="td-sdiebar-button" onClick={() => onPageChange('return')}>
          <img src={retIcon} alt="Icon" className="td-sdiebar-button-icon" />
          Leave Class
        </button>
        <button className="td-sdiebar-button" onClick={() => onPageChange('account')}>
          <img src={accsetIcon} alt="Icon" className="td-sdiebar-button-icon" />
          User Settings
        </button>
        <button className="td-sdiebar-button" onClick={() => onPageChange('logout')}>
          <img src={logoutIcon} alt="Icon" className="td-sdiebar-button-icon" />
          Logout
        </button>

      </div>

      <div className="td-sdiebar-bottom-d">
        <button className="td-sdiebar-button" onClick={() => onPageChange('delete')}>
          <img src={delIcon} alt="Icon" className="td-sdiebar-button-icond" />
          Delete Class <br />Permanently
        </button>
      </div>

    </div>
  );
};

export default TSidebar;
