
import React from 'react';
import './Content.css';

import TDashboard from '../TeacherDashboard_Components/TDashboard.js';
import AssignmentPage from '../../../Pages/Teacher/Assignment/Assignment';
import AssignmentList from '../../../Pages/Teacher/AssigmentList/AssignmentList';
import Class from '../../../Pages/Classes/Class/Class';
import StdAssignment from '../../../Pages/Student/Assignment/stdAssignment';
import StdClass from '../../../Pages/Classes/StdClass/StdClass';
const SContent = ({ currentPage }) => {
  const pageComponents = {
    dashboard: <StdClass/>,
    lectures: <div>lectures</div>,
    assignment: <StdAssignment/>,
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

export default SContent;