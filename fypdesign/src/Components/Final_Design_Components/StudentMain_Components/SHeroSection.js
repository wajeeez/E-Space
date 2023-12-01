

import React from 'react';
import './StudentMain.css';
import './SHeroSection.css';
import { Link } from 'react-router-dom';
import Loader from '../../Loader/Loader';

import styles from "../../Final_Design_Components/TeacherDashboard_Components/TDashboard.module.css";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import headerimg from '../../../Assets/images/Business.png';
import iclass from '../../../Assets/images/audience1.png';
import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';


import { Modal } from 'react-bootstrap';
import userIcon from '../../../Assets/images/user.png';
import logoImage from '../../../Assets/images/logo1.png';


import { useFormik } from "formik";
import Papa from "papaparse";
import { createclass } from "../../../api/internal";
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useParams } from 'react-router-dom';


function SHeroSection() {
  const baseURL = process.env.React_App_INTERNAL_API_PATH;
  const [email, setEmail] = useState(null);
  const [classes, setClasses] = useState([]);
  const [StudentName,setStudentName]=useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("StdToken");
    if (authToken) {
      const decodedToken = jwt_decode(authToken);
      setEmail(decodedToken.email);
    

      // Fetch classes for the logged-in user from the server
      axios
        .get(baseURL+`/student/studentData/${decodedToken.email}`)
        .then((response) => {
          console.log(response.data.response);
          setStudentName(response.data.response.stdName);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false)
        });
    }
  }, []);


  useEffect(() => {
    const authToken = localStorage.getItem("StdToken");
    if (authToken) {
      const decodedToken = jwt_decode(authToken);
      setEmail(decodedToken.email);
  
      // Fetch classes for the logged-in user from the server
      axios
        .get(baseURL+`/student/classes/${decodedToken.email}`)
        .then((response) => {
          console.log(response.data.response);
          setClasses(response.data.response);
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
          setLoading(false)
        });
    }
  }, []);



  const [currentPage, setCurrentPage] = useState('home'); // Initial page


    const [std, setStd] = useState([]);
    const { _id } = useParams()
  
    const handlePageChange = (pageName) => {
      setCurrentPage(pageName);
    };

    useEffect(() => {
        const authToken = localStorage.getItem("StdToken");
        if (authToken) {
          const decodedToken = jwt_decode(authToken);
          setEmail(decodedToken.email);
    
          // Fetch classes for the logged-in user from the server
          axios
            .get(baseURL + `/student/studentData/${decodedToken.email}`)
            .then((response) => {
              console.log(response.data.response);
              setStd(response.data.response.stdName);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }, []);

  const menuBtnChange = () => {
    const ssidebar = document.querySelector(".ssidebar");
    const closeBtn = document.querySelector("#btn");

    if (ssidebar.classList.contains("open")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  };

  const handleSidebarToggle = () => {
    const ssidebar = document.querySelector(".ssidebar");
    const closeBtn = document.querySelector("#btn");

    ssidebar.classList.toggle("open");
    menuBtnChange();
  };
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1200);

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 1200);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const sidebarClass = isSmallScreen ? "ssidebar " : "ssidebar open";


  // useEffect(() => {
  //   const closeBtn = document.querySelector("#btn");
  //   closeBtn.addEventListener("click", handleSidebarToggle);

  //   return () => {
  //     closeBtn.removeEventListener("click", handleSidebarToggle);
  //   };
  // }, []); 

  const handleLogout = async () => {
    localStorage.removeItem("StdToken");
    navigate('/', { replace: true }); // Use the replace option to replace the current entry in the history stack
  };

  const handleLeaveClass = async () => {
    navigate('/std/dashboard');
  };


  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getCurrentMonthYear = () => {
    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    return `${month} ${year}`;
  };
  const getDaysInMonth = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const lastDay = new Date(year, month + 1, 0).getDate();
    return lastDay;
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth();
    const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();
    const currentDay = new Date().getDate();
    // Create an array to represent the calendar rows and columns
    let calendar = [];
    let dayCounter = 1;
    const highlightColor = '#8539d1';
    for (let i = 0; i < 6; i++) {
      let row = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          // Empty cells before the first day of the month
          row.push(<td key={j}></td>);
        } else if (dayCounter <= daysInMonth) {
          // Cells with dates
          const isCurrentDay = dayCounter === currentDay;
          const cellStyle = {
            backgroundColor: isCurrentDay ? highlightColor : '',
            color: isCurrentDay ? 'white' : 'black',
            fontSize: isCurrentDay ? '0.9rem' : '',
          };
          row.push(
            <td key={j} style={cellStyle}>
              {dayCounter}
            </td>
          );
          dayCounter++;
        }
      }
      calendar.push(<tr key={i}>{row}</tr>);
    }
  
    return calendar;
  };


  const [activeRow, setActiveRow] = useState(0);
  const cardsPerRow = 8; // Number of cards to display in each row

  const totalRows = Math.ceil(classes.length / 8);

  const handleRowChange = (newRow) => {
    setActiveRow(newRow);
  };

  const renderCards = (start, end) => {
    const cards = classes.slice(start, end);
  
    return (
      <Col md={12}>
        <Row>
          {cards.map((card, index) => (
            <Col key={index} md={3} className="p-3">
              <div className="card" style={{ background: '', borderRadius: '20px', border: '3px solid #8539d1', boxShadow: '7px 7px 5px rgba(0, 0, 0, 0.2)', height: '140px' }}>
                <Link to={`/student/class/${card._id}`} style={{ textDecoration: 'none' }}>
                  <div className="card-body" style={{ textAlign: 'center', padding: '5px', margin: '5px' }}>
                    <h4 className="card-title1" style={{ fontSize: 'large', fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', marginTop: '10px', color: 'black', whiteSpace: '', maxWidth: '200px' }}>{card.subjectName}</h4>
                    <img src={iclass} alt="Class Image" className="img-fluid" style={{ marginTop: '5px', marginBottom: '10px' }} />
                  </div>
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      </Col>
    );
  };

  return (
    <>


{loading ? (
        <Loader /> // Display the loader while loading
      ) : (
        <>

<div className="container-fluid smain">
         <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
        
        <div class={sidebarClass}>
    <div class="logo_details">
      
      <img src={logoImage} alt="Logo" class="logo_image"/>
      <i class="bx bx-menu" id="btn"></i>
    </div>
    {/* <li class="profile">
        <div class="profile_details">
          <img src={userIcon} alt="profile image" class='user_image'/>
          <div class="profile_content">
            <div class="name">{std}</div>
            
          </div>
        
        </div>
        
      </li> */}
    <ul class="snav-list">
    <lis>
        <img src={userIcon} alt="profile image" class='user_image'/>
        
          <p class="name">{std}</p>
        
      </lis>

      <p className='pss'>x</p>
      <li>
        <Link onClick={() => { handlePageChange('home');}}>
        <i class='bx bx-home-alt-2'></i>
          <span class="link_name">Classes</span>
        </Link>
        <span class="tooltip">Classes</span>
      </li>

      <p className='pss'>x</p>
      <li>
        <Link onClick={() => handlePageChange('user')}>
        <i class='bx bxs-user-detail' ></i>
          <span class="link_name">User Settings</span>
        </Link>
        <span class="tooltip">User Setting</span>
      </li>
      <li>
        <a onClick={handleLogout}>
        <i class='bx bx-arrow-to-left' ></i>
          <span class="link_name">Logout</span>
        </a>
        <span class="tooltip">Logout</span>
      </li>
      
      
    </ul>
  </div>
  <div class="container-fluid shome-section">

        {currentPage === 'home' && 
                 <div className="container-fluid" style={{ marginTop: '10px', overflow:'hidden'}}>
                 {/* First row covering full width */}
                 <div className="row">
                 
                   <div className="col-md-9">
                     <div
                       style={{
                         background: 'linear-gradient(to right, #8539d1 40%, #fc10f2 100%)',
                         borderRadius: '20px',
                         border: '1px solid #8539d1',
                         boxShadow: '10px 10px 5px  rgba(0, 0, 0, 0.2)',
                         display: 'flex',
                         alignItems: 'center',
                         padding: '0px 20px 0px',
                         zIndex: '1',
                       }}
                     >
                       <div style={{ flex: '1' }}>
                         <h2 style={{ fontFamily:'Poppins',color: '#fff', marginBottom: '15px' }}>Hi, {std}</h2>
                         <h5 style={{fontFamily:'Poppins', color: '#fff', margin: '0 0 0' }}>Welcome Back!</h5>
                       </div>
                       <div style={{ flex: '1', textAlign: 'right' }}>
                         <img
                           src={headerimg} 
                           alt="Right Image"
                           style={{ verticalAlign: 'middle',height:'230px', maxwidth:'250px' }}
                         />
                       </div>
                     </div>
                   </div>
           
             
           
           {/* Right side (Calendar) */}
           <div className="col-md-3" style={{}}>
           
             {/* Calendar content goes here */}
             {/* You can add a calendar component or any other content you want in this column */}
           
             <div className="card" style={{ borderRadius: '12px', border:'1px solid #8539d1', boxShadow: '10px 10px 5px rgba(0, 0, 0, 0.2)' }}>
               <div className="card-header" style={{fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontSize: '1rem', fontWeight: 'bold' }}>
                 {getCurrentMonthYear()}
               </div>
               <div className="card-body p-1" style={{ maxHeight: '220px' }}>
                 <table className="table table-sm" style={{ fontSize: '0.8rem', margin: '0' }}>
                   <thead>
                     <tr>
                       {daysOfWeek.map((day, index) => (
                         <th key={index} style={{fontFamily: 'Poppins, sans-serif', textAlign: 'center', fontSize: '0.8rem', padding: '0.1rem' }}>{day}</th>
                       ))}
                     </tr>
                   </thead>
                   <tbody style={{ textAlign: 'center', fontSize: '0.7rem', padding: '0.1rem' }}>
                     {renderCalendar()}
                   </tbody>
                 </table>
               </div>
             </div>
           </div>
           
           </div>
           
           
           
           {classes.length > 0 ? (
             <Container className='custom-carousel' style={{ marginTop: '5px'}}>
               <Row className="mt-3">
                 <Col>
                   <Carousel activeIndex={activeRow} indicators={false} controls={false}>
                     {Array.from({ length: totalRows }).map((_, index) => (
                       <Carousel.Item key={index} style={{ height: '380px' }}>
                         <Row>{renderCards(index * cardsPerRow, ((index + 1) * cardsPerRow))}</Row>
                       </Carousel.Item>
                     ))}
                   </Carousel>
                 </Col>
               </Row>
               <Row style={{ marginTop: '-30px' }}>
                 <Col className="d-flex justify-content-center">
                   <div className="custom-buttons-tc p-2">
                     <Button
                       onClick={() => handleRowChange(activeRow - 1)}
                       disabled={activeRow === 0}
                       className="btn-transition"
                       style={{background:'transparent' , border: 'none', padding: '10px', 
                       margin: '10px', 
                       fontWeight: 'bold' }}
            
                     >
                       <i class='bx bxs-chevrons-left' style={{color: "#8539d1", fontSize:'50px'}}></i>
                     </Button>
                     <Button
                       onClick={() => handleRowChange(activeRow + 1)}
                       disabled={activeRow === totalRows - 1}
                       className="btn-transition"
                       style={{background:'transparent' , border: 'none', padding: '10px', 
                       margin: '10px', 
                       fontWeight: 'bold' }}
                     >
                       <i class='bx bxs-chevrons-right' style={{color: "#8539d1", fontSize:'50px'}}></i>
                     </Button>
                   </div>
                 </Col>
               </Row>
             </Container>
           
             ) : (
           
           <div className="container-fluid" style={{ marginTop: '50px', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
           
           <h1 style={{
             fontFamily: 'Poppins', fontWeight: 'bold', textAlign: 'center',
           }}>
             Create Your First Class
           </h1>
           
           <div className="row" style={{marginTop:'30px'}}>
           
               <div className="card h-100 text-white" style={{ background: 'lightgreen', borderRadius: '20px', boxShadow: '7px 7px 5px rgba(0, 0, 0, 0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                 <Link to="/teacher/createclass" style={{ textDecoration: 'none' }}>
                   <div className="card-body" style={{ textAlign: 'center', padding: '10px', marginTop: '5px', position: 'relative', zIndex: '1' }}>
                     {/* <h4 className="card-title1" style={{ fontSize: '', fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', color: 'black' }}>+ Create </h4> */}
                     <h3 className="card-title1" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', color: 'black' }}> New Class</h3>
                   </div>
                 </Link>
               </div>
           
           </div>
           <h1 style={{
             fontFamily: 'Poppins', fontWeight: 'bold', textAlign: 'center', margintop:'20px'
             ,color:'white'
           }}>
             Create Your First Class
           </h1>
           
           </div>
           
           
           )}
           
           
           {/* <div className="card h-100 text-white" style={{ background: 'lightgreen', borderRadius: '20px', boxShadow: '7px 7px 5px rgba(0, 0, 0, 0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                             <Link to="/teacher/createclass" style={{ textDecoration: 'none' }}>
                               <div className="card-body" style={{ textAlign: 'center', padding: '10px', marginTop: '5px', position: 'relative', zIndex: '1' }}>
                                 <h4 className="card-title1" style={{ fontSize: '', fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', color: 'black' }}>+ Create </h4>
                                 <h4 className="card-title1" style={{ fontSize: '', fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', color: 'black' }}> New Class</h4>
                               </div>
                             </Link>
                           </div> */}
           
           
           
           
           {/* <div className="row justify-content-center align-items-center p-0" style={{ marginTop: '15px' }}>
             
             <div className="col-md-3">
               <div className="card text-white" style={{ background: '#f25757', borderRadius: '20px', border: '1px solid #8539d1', boxShadow: '7px 7px 5px rgba(0, 0, 0, 0.2)',  }}>
                 <Link to="#" onClick={handleLogout} style={{ textDecoration: 'none' }}>
                   <div className="card-body" style={{ textAlign: 'center', padding: '0px', margin: '5px'}}>
                     <h4 className="card-title1" style={{ letterSpacing:'2px', fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', marginTop: '10px', color: 'white' }}>Logout</h4>
                   </div>
                 </Link>
               </div>
             </div>
           </div> */}



        {currentPage === 'settings' && <div>user</div> }   
           
           </div>

        }

  </div>
        
      </div>

        
        {/* <div className='thero-container'>
      <div className='shero-heading'>
        <th>CLASSES</th>
      </div>
      <center >
        <div>
          <p className='s-info-top'>
            Student Name : {StudentName}     |     Student Email : {email}{" "}
          </p>
        </div>
      </center>

      <div className='shero-cards'>
        {classes.map((cls) => (
          <Link to={`/student/class/${cls._id}`} className='shero-card' key={cls._id}>
            <div className='shero-card-content'>
              <tc>{cls.subjectName}</tc>
            </div>
          </Link>
        ))}
      </div>

      

        
        <Link onClick={handleLogout} className='shero-card2'>
          <div className='shero-card-content'>
            <h2>Logout</h2>
          </div>
        </Link>

        
      </div> */}
    
        
        
        </>
        
      )}

   
    </>
  );
}

export default SHeroSection;




