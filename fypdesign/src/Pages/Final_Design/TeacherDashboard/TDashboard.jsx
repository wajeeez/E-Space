import React, { useState } from 'react';
import './TDashboard.module.css';
import Navbar from '../../../Components/Final_Design_Components/TeacherDashboard_Components/TNavbar';
import Sidebar from '../../../Components/Final_Design_Components/TeacherDashboard_Components/TSidebar';
import Content from '../../../Components/Final_Design_Components/TeacherDashboard_Components/TContent';
import Footer from '../../../Components/Final_Design_Components/TeacherDashboard_Components/TFooter';

const TDashboard = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [sidebarVisible, setSidebarVisible] = useState(true); // New state for sidebar visibility

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNavbarButtonClick = () => {
    setSidebarVisible(!sidebarVisible); // Toggle sidebar visibility
  };

  return (
    <div className="tapp">
      <Navbar onNavbarButtonClick={handleNavbarButtonClick} />
      <div className="tcontent-container">
        {sidebarVisible && <Sidebar onPageChange={handlePageChange} />}
        <Content currentPage={currentPage} />
      </div>
      <Footer/>
    </div>
  );
}

export default TDashboard;