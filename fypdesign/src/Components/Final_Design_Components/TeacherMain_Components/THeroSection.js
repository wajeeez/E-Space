import React from 'react';
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

function THeroSection() {
  const baseURL = process.env.React_App_INTERNAL_API_PATH;
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("authToken");
    window.location.reload(false);
  };

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
  const cardsPerRow = 11; // Number of cards to display in each row

  const totalRows = Math.ceil(classes.length / 11);

  const handleRowChange = (newRow) => {
    setActiveRow(newRow);
  };

  const renderCards = (start, end) => {
    const cards = classes.slice(start, end);
  
    // Add the "Create Class" card as the first card in each row
    const cardsWithCreateClass = [{ specialCard: true }, ...cards];
  
    return (
      
      <Col md={12}>
        <Row>
          {cardsWithCreateClass.map((card, index) => (
            <Col key={index} md={3} className="p-3">
              {card.specialCard ? (
                <div className="card h-100 text-white" style={{ background: 'lightgreen', borderRadius: '20px', boxShadow: '7px 7px 5px rgba(0, 0, 0, 0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                  <Link to="/teacher/createclass" style={{ textDecoration: 'none' }}>
                    <div className="card-body" style={{ textAlign: 'center', padding: '10px', marginTop: '5px', position: 'relative', zIndex: '1' }}>
                      <h4 className="card-title1" style={{ fontSize: '', fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', color: 'black' }}>+ Create </h4>
                      <h4 className="card-title1" style={{ fontSize: '', fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', color: 'black' }}> New Class</h4>
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="card " style={{ background: '', borderRadius: '20px', border: '3px solid #8539d1', boxShadow: '7px 7px 5px rgba(0, 0, 0, 0.2)', height:'140px' }}>
                  <Link to="/teacher/class/${card._id}" style={{ textDecoration: 'none' }}>
                    <div className="card-body" style={{ textAlign: 'center', padding: '5px', margin: '5px' }}>
                      <h4 className="card-title1" style={{ fontSize: 'large', fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', marginTop: '10px', color: 'black',whiteSpace:'', maxWidth:'200px' }}>{card.subjectName}</h4>
                      <img src={iclass} alt="Class Image" className="img-fluid" style={{ marginTop: '5px', marginBottom: '10px' }} />
                    </div>
                  </Link>
                </div>
              )}
            </Col>
          ))}
        </Row>
      </Col>
    );
  };
  



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
                style={{ verticalAlign: 'middle',height:'204px', maxwidth:'250px' }}
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



<Container className='custom-carousel' style={{ marginTop: '-5px' }}>
  <Row className="mt-3">
    <Col>
      <Carousel activeIndex={activeRow} indicators={false} controls={false}>
        {Array.from({ length: totalRows }).map((_, index) => (
          <Carousel.Item key={index} style={{ height: '350px' }}>
            <Row>{renderCards(index * cardsPerRow, (((index + 2) * cardsPerRow) - 1))}</Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Col>
  </Row>
  <Row style={{ marginTop: '-10px' }}>
    <Col className="d-flex justify-content-center">
      <div className="custom-buttons-tc p-2" >
        <Button
          onClick={() => handleRowChange(activeRow - 1)}
          disabled={activeRow === 0}
          className="btn-transition"
          style={{ backgroundColor: "#8539d1", border: 'none', padding: '10px', margin: '10px', width: '150px', borderRadius: '30px', fontSize: 'large', fontWeight: 'bold' }}
        >
          Previous
        </Button>
        <Button
          onClick={() => handleRowChange(activeRow + 1)}
          disabled={activeRow === totalRows - 1}
          className="btn-transition"
          style={{ backgroundColor: "#8539d1", border: 'none', padding: '10px', margin: '10px', width: '150px', borderRadius: '30px', fontSize: 'large', fontWeight: 'bold' }}
        >
          Next
        </Button>
      </div>
    </Col>
  </Row>
</Container>






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




</div>


    </>
  );
}

export default THeroSection;



