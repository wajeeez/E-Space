import React, { useState } from 'react';
import './TDashboard.module.css'

// import Solution from '../../../Components/Final_Design_Components/TeacherDashboard_Components/Solution'
import Tmain from '../../../Components/Final_Design_Components/TeacherDashboard_Components/Tmain'
const TDashboard = () => {
  const [currentPage, setCurrentPage] = useState('home');
 

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  return (
    // <div className="td-app">
    //   <TNavbar onNavbarButtonClick={handleNavbarButtonClick} />
    //   {/* <div className="td-content-container">
    //     {sidebarVisible && <TSidebar onPageChange={handlePageChange} />}
    //     <TContent currentPage={currentPage} />
    //   </div> */}
      // <Solution/>
      <Tmain/>

      
    //   <TFooter />
    // </div>

    
  );
}

export default TDashboard;
