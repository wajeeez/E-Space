import React, { useState } from 'react';


import Smain from '../../../Components/Final_Design_Components/StudentDashboard_Components/Smain';

const StudentDashboard = () => {
  const [currentPage, setCurrentPage] = useState('home');
  

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };



  return (
    <div className="app">
      
      <Smain/>
      
    </div>
  );
}

export default StudentDashboard;