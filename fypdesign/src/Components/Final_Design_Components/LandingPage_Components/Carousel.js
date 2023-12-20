import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';
import analysis from '../../../Assets/images/analysis.png';

import feat from '../../../Assets/images/home.jpg'
import './Carousel.css';

const cardData = [
  {
    iconClass: 'fa-solid fa-chalkboard-user fa-bounce',
    // title: 'Intereactive White Board',
    title: 'Interactive Whiteboard',
    description: 'Our interactive whiteboard makes collaboration visually inspiring, efficient and easy to share.',
    link: '/card1',
    backgroundColor: '#b23ac7',
  },
  {
    iconClass: 'fas fa-clock fa-spin',
    imgSrc: analysis,
    // title: 'No Time Limit in Meetings ',
    title: 'No Limits : Timeless Meetings ',
    description: 'We offer unlimited time for conducting meeting and classes and online lectures without any charges ',
    link: '/card2',
    backgroundColor: '#f6cf46',
  },
  {
    iconClass: 'fas fa-cogs fa-spin',
    imgSrc: analysis,
    title: 'Content Management System',
    description: 'Unlike other platform we offer built in content management system to enhance productivity',
    link: '/card3',
    backgroundColor: '#4aa5fd',
  },
  {
    iconClass: 'fa-solid fa-user-secret fa-beat-fade ',
    imgSrc: analysis,
    title: 'Safety & Security in Meetings',
    // description: 'Teacher can explore many safety security features such as locking meeting lobby etc to stay save from online harassment',
    description: 'Enhance teacher security with safety tools, such as meeting lobby lock, against online harassment',
    link: '/card4',
    backgroundColor: '#1b1a56',
  },
  {
    iconClass: 'fas fa-bell fa-shake',
        imgSrc: analysis,
    title: 'Never Miss A Deadline',
    // description: 'Real-time notifications ensure you never miss a submission, providing timely reminders to enhance punctuality.',
    description: 'Real-time notifications ensure students never miss a submission, providing timely reminders.',
    link: '/card5',
    backgroundColor: ' #e5abc6',
  },
  {
    iconClass: 'fas fa-users fa-flip',
    imgSrc: analysis,
    title: 'Group Assignments',
    // description: 'Streamline student submissions, provide teacher-friendly assessments for better teamwork and evaluation.',
    description: 'Simplify student submissions, offer teacher-friendly assessments, promoting ease in evaluation.',
    link: '/card6',
    backgroundColor: '#ae236d',
  },
 
];

const CardsCarousel = () => {
  const [activeRowMobile, setActiveRowMobile] = useState(0);
  const [activeRow, setActiveRow] = useState(0);

  const handleRowChangeMobile = (newRow) => {
    setActiveRowMobile(newRow);
  };

  const handleRowChange = (newRow) => {
    setActiveRow(newRow);
  };

  const renderCards = (start, end) => {
    const cards = cardData.slice(start, end);
    return cards.map((card, index) => (
      <Col key={index} md={4} >

        <div className="card custom-catousel-card" 
        
        style={{ height:'500px',borderRadius: '10px' , border: '1px solid black',  
        backgroundColor: '' }}
        >
          {/* <img src={card.imgSrc} alt={card.title} /> */}
         <div style={{backgroundColor:card.backgroundColor }} className='iconclass'>
         <i className={`${card.iconClass}`}></i>
         </div>
          <div className="container-fluid  car-body">
           
            <h5 className="card-title car-title">{card.title}</h5>
            <p className="card-text car-text">{card.description}</p>
          </div>
        </div>
      </Col>
    ));
  };

  
   
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const updateWindowSize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWindowSize);
    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, []);


  const renderCardsMobile = (start, end) => {
    const cards = cardData.slice(start, end);
    return cards.map((card, index) => (

      <Col key={index} xs={6} >
  
        <div className="card custom-catousel-card" 
          style={{
            height: '400px',
            borderRadius: '10px',
            border: '1px solid black',
            backgroundColor: '',
          }}
        >
          <div style={{ backgroundColor: card.backgroundColor }} className='iconclass'>
            <i className={`${card.iconClass}`}></i>
          </div>
          <div className="container-fluid car-body">
            <h5 className="card-title car-title">{card.title}</h5>
            <p className="card-text car-text">{card.description}</p>
          </div>
        </div>
      </Col>

    ));
  };
  

  return (
    <>
    {isMobile ? (
      // Mobile Layout
    <div className='container-fluid'>
      <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />

      <div className='container-fluid'>
          <Carousel activeIndex={activeRowMobile} indicators={false} controls={false} >
            <Carousel.Item>
              <Row>{renderCardsMobile(0, 2)}</Row>
            </Carousel.Item>
            <Carousel.Item>
              <Row>{renderCardsMobile(2, 4)}</Row>
            </Carousel.Item>
            <Carousel.Item>
              <Row>{renderCardsMobile(4, 6)}</Row>
            </Carousel.Item>
          </Carousel>
      </div>
      <Row className="mt-3">
        <Col className="d-flex justify-content-center">
          <div className="custom-buttons">
            <Button
              onClick={() => handleRowChangeMobile(activeRowMobile - 1)}
              disabled={activeRowMobile === 0}
              className="btn-transition"
              style={{background:"white" ,border: 'none' }}
            >
            <i class='bx bxs-chevrons-left' style={{color: "#b23ac7", fontSize:'50px'}}></i>
            </Button>
            <Button
              onClick={() => handleRowChangeMobile(activeRowMobile + 1)}
              disabled={activeRowMobile === 2}
              className="btn-transition"
              style={{background:"white", border: 'none' }}
            >
            <i class='bx bxs-chevrons-right' style={{color: "#b23ac7", fontSize:'50px'}}></i>
            </Button>
          </div>
        </Col>
      </Row>
    </div>

    ) : (
         // Desktop Layout

    <Container className='conatiner-fluid'>
      <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
      <div className="container-fluid">
          <Carousel activeIndex={activeRow} indicators={false} controls={false}>
            <Carousel.Item>
              <Row>{renderCards(0, 3)}</Row>
            </Carousel.Item>
            <Carousel.Item>
              <Row>{renderCards(3, 6)}</Row>
            </Carousel.Item>
          </Carousel>
      </div>
      <Row className="mt-3">
        <Col className="d-flex justify-content-center">
          <div className="custom-buttons">
            <Button
              onClick={() => handleRowChange(activeRow - 1)}
              disabled={activeRow === 0}
              className="btn-transition"
              style={{background:"white" ,border: 'none' }}
            >
            <i class='bx bxs-chevrons-left' style={{color: "#b23ac7", fontSize:'50px'}}></i>
            </Button>
            <Button
              onClick={() => handleRowChange(activeRow + 1)}
              disabled={activeRow === 1}
              className="btn-transition"
              style={{background:"white", border: 'none' }}
            >
            <i class='bx bxs-chevrons-right' style={{color: "#b23ac7", fontSize:'50px'}}></i>
            </Button>
          </div>
        </Col>
      </Row>
    </Container>

    )}
    </>
  );
};

export default CardsCarousel;
