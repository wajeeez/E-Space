
import './THeroSection.css';
import { Link } from 'react-router-dom';
import Loader from '../../Loader/Loader';


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

function THeroSection() {
  const baseURL = process.env.React_App_INTERNAL_API_PATH;
  const navigate = useNavigate();



  const [classes, setClasses] = useState([]);
  const [name, setName] = useState(null);
  const [id, setUserId] = useState(null);
  const [email, setEmail] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      const decodedToken = jwt_decode(authToken);
      setUserId(decodedToken.id);
      setEmail(decodedToken.email);
      setName(decodedToken.name);

      // Fetch classes for the logged-in user from the server
      axios
        .get(baseURL + `/teacher/classes/${decodedToken.id}`)
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
  }, [id]);


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
                <Link to={`/teacher/class/${card._id}`} style={{ textDecoration: 'none' }}>
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
  
  



  const [currentPage, setCurrentPage] = useState('home'); // Initial page

  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
  };



  
  const menuBtnChange = () => {
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.querySelector("#btn");

    if (sidebar.classList.contains("open")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  };

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1200);

  // Function to handle window resize
  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 1200);
  };
  const sidebarClass = isSmallScreen ? "sidebar" : "sidebar open";
  // Effect to add event listener for window resize
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array means this effect runs once after mounting


    const handleSidebarToggle = () => {
      const sidebar = document.querySelector(".sidebar");
      const closeBtn = document.querySelector("#btn");
  

      sidebar.classList.toggle("open");
      menuBtnChange();

    };

    
  // Call the setup function after the DOM is ready
  useEffect(() => {
    const closeBtn = document.querySelector("#btn");
    closeBtn.addEventListener("click", handleSidebarToggle);

    // Cleanup the event listener when the component unmounts
    return () => {
      closeBtn.removeEventListener("click", handleSidebarToggle);
    };
  }, []); // Empty dependency array means this effect runs once after mounting

  const handleLogout = async () => {
    localStorage.removeItem("authToken");
    navigate('/', { replace: true });
  };

  const handleLeaveClass = async () => {
    navigate('/TDashboard');
  };




  //State to store the values
  const [emails, setEmails] = useState([]);


  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const valuesArray = results.data.map((d) =>
          Object.values(d).toString()
        );

        // Update the state with the string array
        setEmails(valuesArray);
      },
    });
  };


  console.log("EMAILS => " + emails);

  //TEACHER ID AND NAME FROM AUTHTOKEN

  const [tid, setTid] = useState(null);


  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      const decodedToken = jwt_decode(authToken);
      setTid(decodedToken.id);
      setEmail(decodedToken.email);
      setName(decodedToken.name);
    }

  }, [tid]);

  const handleReg = async () => {
    setLoading(true)


    if (values.students == null || values.subjectName == null) {

      setError("Please Provide Details")
    } else {
      const data = {
        teacherName: name,
        teacherID: tid,
        teacherEmail: email,
        subjectName: values.subjectName,
        students: values.students,
      };
      const response = await createclass(data);


      if (response.status === 409) {
        setError(response.response.data.message);
        setLoading(false)
      }
      if (response.status === 201) {
        const teacher = {
          _id: response.data.createclassDto._id,
          email: response.data.createclassDto.teacherEmail,
          auth: response.data.createclassDto.auth,
        };

        // dispatch(setUser(teacher));
        navigate("/TDashboard");
        setLoading(false)
      } else if (response.code === "ERR_BAD_REQUEST") {
        setError(response.response.data.message);
        setLoading(false)
        if (response.status === 409) {
          setError(response.response.data.message);
        }
      }
    }






  };

  const [error, setError] = useState("");

  const { values, handleChange, errors } = useFormik({
    initialValues: {
      subjectName: "",
      students: [],
    },
  });

  values.students = [...emails];

  console.log(values.students);


  return (
    <>

    {/* <div className='thero-container'>
      <div className='thero-heading'>
        <th>CLASSES</th>
      </div>
      {loading ? (
        <Loader /> // Display the loader while loading
      ) : (

        <>
        
        <center>
        <div>
          <p className='t-info-top'>
            Teacher Name : {name}   |   Teacher Email : {email}{" "}
          </p>
        </div>
      </center>

      <div className='thero-cards'>
        {classes.map((cls) => (
          <Link to={`/teacher/class/${cls._id}`} className='thero-card' key={cls._id}>
            <div className='thero-card-content'>
              <tc>{cls.subjectName}</tc>
            </div>
          </Link>
        ))}
      </div>

      

      <Link to='/teacher/createclass'>
  <Button className='btn btn-primary' style={{padding:'10px',margin:'10px'}}>
    <h2>Create Class</h2>
  </Button>
</Link>

<Button className='btn btn-danger' onClick={handleLogout}>
  
    <h2>Logout</h2>
  
</Button>

</>

      )}
    
        
      </div> */}
            <div className="container-fluid tcmain" >
        
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
        <link href="https://kit.fontawesome.com/a19fe5b40c.js" crossorigin="anonymous"/>
   <div class={sidebarClass}>
   <div class="logo_details">
     
     <img src={logoImage} alt="Logo" class="logo_image"/>
     <i class="bx bx-menu" id="btn"></i>
   </div>
   {/* <li class="profile">
       <div class="profile_details">
         <img src={userIcon} alt="profile image" class='user_image'/>
         <div class="profile_content">
           <div class="name">{name}</div>
           
         </div>
       
       </div>
       
     </li> */}
   <ul class="nav-list">
   <lis>
       <img src={userIcon} alt="profile image" class='user_image'/>
       
         <p class="name">{name}</p>
       
     </lis> 
     
     <p className='ps'>x</p>
     <li>
       <Link onClick={() => handlePageChange('home')}>
       {/* <img src={dashIcon} alt="Icon" className="button-icon" /> */}
       <i class='bx bx-home-alt-2'></i>
         <span class="link_name">Classes</span>
       </Link>
       <span class="tooltip">Classes</span>
     </li>
     <li>
       <Link onClick={() => handlePageChange('create')}>
       {/* <img src={perfIcon} alt="Icon" className="button-icon" /> */}
       <i class='bx bx-add-to-queue'></i>
         <span class="link_name">New Class p</span>
       </Link>
       <span class="tooltip">New CLass p</span>
     </li>

     <p className='ps'>x</p>

     <li>
     <Link onClick={() => handlePageChange('delete')} >
     {/* <img src={delIcon} alt="Icon" className="button-icon" /> */}
     <i class='bx bx-x-circle'></i>
       <span class="link_name">Delete Class</span>
     </Link>
     <span class="tooltip">Delete Class</span>
   </li>

   <li>
       <Link to="/teacher/createclass" style={{ textDecoration: 'none' }}>
       {/* <img src={perfIcon} alt="Icon" className="button-icon" /> */}
       <i class='bx bx-add-to-queue'></i>
         <span class="link_name">New Class</span>
       </Link>
       <span class="tooltip">New CLass</span>
     </li>


   <p className='ps'>x</p>

     <p className='ps'>x</p>
     
     <li>
       <Link >
       {/* <img src={accsetIcon} alt="Icon" className="button-icon" /> */}
       <i class='bx bxs-user-detail' ></i>
         <span class="link_name">User Settings</span>
       </Link>
       <span class="tooltip">User Setting</span>
     </li>
     <li>
       <Link onClick={handleLogout}>
       {/* <img src={logoutIcon} alt="Icon" className="button-icon" /> */}
       <i class='bx bx-arrow-to-left' ></i>
         <span class="link_name">Logout</span>
       </Link>
       <span class="tooltip">Logout</span>
     </li>
     

     
   </ul>
 </div>
 <section class="container-fluid tchome-section">
   

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
              <h2 style={{ fontFamily:'Poppins',color: '#fff', marginBottom: '15px' }}>Hi, {name}</h2>
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


</div>}


{currentPage === 'create' &&     <>

{   loading ? (
        <Loader /> // Display the loader while loading
      ) : (

        <div className="container-fluid" style={{background:'white' , marginTop: '10px', 
        overflow:'hidden', padding:'20px' , display: 'flex', justifyContent: 'center'
        , alignItems: 'center', minHeight: '100vh',marginTop:'0px' }}>
         <center>

         <div className="container-fluid class" style={{background:'linear-gradient(to right, #8539d1 40%, #fc10f2 100%)', 
         padding: '50px',margin:'10px' , minWidth:'350px',maxWidth:'600px', border:'', 
         borderRadius:'30px', boxShadow: '20px 20px 5px  rgba(0, 0, 0, 0.4)'}}>

         <h1 style={{ fontFamily:'Poppins',padding:'5px' , color : 'white', borderRadius: '20px', marginBottom:'40px', fontWeight:'bold'}}>
            Create A New Class</h1>
                <Form.Group controlId="subjectName" >
                  
                  <Form.Control
                    type="text"
                    value={values.subjectName}
                    name="subjectName"
                    onChange={handleChange}
                    placeholder="Class Name"
                    style={{maxWidth:'400px', textAlign:'center',
                     fontSize:'22px', height:'50px' , borderRadius:'16px', marginBottom:'30px'}}
                  />
                  
                  <Form.Text className="text-danger">{errors.subjectName}</Form.Text>
                </Form.Group>
 
                <Form.Group>
                  <Form.Control
                    type="file"
                    name="file"
                    onChange={changeHandler}
                    accept=".csv"
                    label="Choose CSV file"
                    style={{maxWidth:'400px', textAlign:'center',
                     fontSize:'16px',padding:'10px' , borderRadius:'16px'}}
                  />
                </Form.Group>

                <h5 style={{marginTop:'30px',color:'ivory'}}>
                  "Only CSV File is accepted!!!
                 <br/> First column contains only Student Emails
                </h5>

                <Form.Group>
                  {error !== "" && <p >{error}</p>}
                </Form.Group>

                <Button variant="success" onClick={handleReg}
                style={{marginTop:'20px',marginBottom:'20px', fontSize:'24px' , borderRadius:'16px'}}>
                  Create Class
                </Button>
                <br/>
                <Button variant="danger" onClick={() => navigate('/TDashboard')}
                 style={{ fontSize:'18px', borderRadius:'16px'}}>
                Cancel
                </Button>
              


            </div>



         </center>



        </div>
      )}
    </>}



{currentPage === 'delete' && <div>delete</div>}



 </section>
       
     </div>
    



    </>
  );
}

export default THeroSection;
