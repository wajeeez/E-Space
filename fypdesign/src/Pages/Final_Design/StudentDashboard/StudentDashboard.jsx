import React, { useState } from 'react';

// import Shome from '../../../Components/Final_Design_Components/StudentHome/Shome';
import Smain from '../../../Components/Final_Design_Components/StudentDashboard_Components/Smain';

const StudentDashboard = () => {
  const [currentPage, setCurrentPage] = useState('home');
  

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };



  return (
    
      
      <Smain/>
      
    
  );
}

export default StudentDashboard;