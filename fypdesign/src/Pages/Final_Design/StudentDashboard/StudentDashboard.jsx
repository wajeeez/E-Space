import React, { useState } from 'react';

import Navbar from '../../../Components/Final_Design_Components/StudentDashboard_Components/Navbar';
import Sidebar from '../../../Components/Final_Design_Components/StudentDashboard_Components/Sidebar';
import SContent from '../../../Components/Final_Design_Components/StudentDashboard_Components/Content';
import Footer from '../../../Components/Final_Design_Components/StudentDashboard_Components/Footer';

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
      <Navbar onNavbarButtonClick={handleNavbarButtonClick} />
      <div className="content-container">
        {sidebarVisible && <Sidebar onPageChange={handlePageChange} />}
        <SContent currentPage={currentPage} />
      </div>
      <Footer/>
    </div>
  );
}

export default StudentDashboard;