import React, { useState } from 'react';
import './TDashboard.module.css';
import Navbar from '../../../Components/Final_Design_Components/TeacherDashboard_Components/Navbar';
import Sidebar from '../../../Components/Final_Design_Components/TeacherDashboard_Components/Sidebar';
import Content from '../../../Components/Final_Design_Components/TeacherDashboard_Components/Content';
import Footer from '../../../Components/Final_Design_Components/TeacherDashboard_Components/Footer';

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
    <div className="app">
      <Navbar onNavbarButtonClick={handleNavbarButtonClick} />
      <div className="content-container">
        {sidebarVisible && <Sidebar onPageChange={handlePageChange} />}
        <Content currentPage={currentPage} />
      </div>
      <Footer/>
    </div>
  );
}

export default TDashboard;