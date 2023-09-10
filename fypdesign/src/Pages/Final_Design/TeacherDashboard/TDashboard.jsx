import React, { useState } from 'react';
import './TDashboard.module.css';
import TNavbar from '../../../Components/Final_Design_Components/TeacherDashboard_Components/TNavbar';
// import TSidebar from '../../../Components/Final_Design_Components/TeacherDashboard_Components/TSidebar';
// import TContent from '../../../Components/Final_Design_Components/TeacherDashboard_Components/TContent';
import TFooter from '../../../Components/Final_Design_Components/TeacherDashboard_Components/TFooter';
import Solution from '../../../Components/Final_Design_Components/TeacherDashboard_Components/Solution'

const TDashboard = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNavbarButtonClick = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="td-app">
      <TNavbar onNavbarButtonClick={handleNavbarButtonClick} />
      {/* <div className="td-content-container">
        {sidebarVisible && <TSidebar onPageChange={handlePageChange} />}
        <TContent currentPage={currentPage} />
      </div> */}
      <Solution/>

      
      <TFooter />
    </div>
  );
}

export default TDashboard;
