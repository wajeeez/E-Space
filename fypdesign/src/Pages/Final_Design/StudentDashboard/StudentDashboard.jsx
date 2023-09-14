import React, { useState } from 'react';
import './StudentDashboard.css'
import SNavbar from '../../../Components/Final_Design_Components/StudentDashboard_Components/SNavbar';
// import Sidebar from '../../../Components/Final_Design_Components/StudentDashboard_Components/Sidebar';
// import SContent from '../../../Components/Final_Design_Components/StudentDashboard_Components/Content';
import SFooter from '../../../Components/Final_Design_Components/StudentDashboard_Components/SFooter';
import SSolution from '../../../Components/Final_Design_Components/StudentDashboard_Components/SSolution';

const StudentDashboard = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [sidebarVisible, setSidebarVisible] = useState(true); // New state for sidebar visibility

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNavbarButtonClick = () => {
    setSidebarVisible(!sidebarVisible); // Toggle sidebar visibility
  };

  return (
    <div className="app">
      <SNavbar onNavbarButtonClick={handleNavbarButtonClick} />
      {/* <div className="content-container">
        {sidebarVisible && <Sidebar onPageChange={handlePageChange} />}
        <SContent currentPage={currentPage} />
      </div> */}
      <SSolution/>
      <SFooter/>
    </div>
  );
}

export default StudentDashboard;