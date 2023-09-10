
import React from 'react';
import './TContent.css';

import TDashboard from './TDashboard.js';
import AssignmentPage from '../../../Pages/Teacher/Assignment/Assignment';
import AssignmentList from '../../../Pages/Teacher/AssigmentList/AssignmentList';
import Class from '../../../Pages/Classes/Class/Class';
const TContent = ({ currentPage }) => {
  const pageComponents = {
    dashboard: <Class/>,
    lectures: <div>lectures</div>,
    assignment: <AssignmentPage/>,
    assignmentList: <AssignmentList/>,
    quiz: <div>quiz</div>,
    account: <div>user</div>,
    class: <div>class</div>,
    performance: <div>performance</div>,
    return: <div>home</div>,
    delete: <div>delete</div>,
    logout: <div>logout</div>,
  };

  return (
    <div className="content">
      {pageComponents[currentPage]}
    </div>
  );
}

export default TContent;