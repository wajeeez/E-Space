import React, { useState } from 'react';
import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';
import analysis from '../../../Assets/images/analysis.png';

import feat from '../../../Assets/images/home.jpg'
import './Carousel.css';

const cardData = [
  {
    iconClass: 'fa-solid fa-chalkboard-user fa-bounce',
    title: 'Intereactive White Board',
    description: 'Our interactive whiteboard makes collaboration visually inspiring and efficient',
    link: '/card1',
    backgroundColor: '#b23ac7',
  },
  {
    iconClass: 'fas fa-clock fa-spin',
    imgSrc: analysis,
    title: 'No Time Limit Meetings ',
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
    description: 'Teacher can explore many safety security features such as locking meeting lobby etc to stay save from online harsment',
    link: '/card4',
    backgroundColor: '#1b1a56',
  },
  {
    iconClass: 'fas fa-chalkboard fa-shake',
    imgSrc: analysis,
    title: 'Never Miss A Deadline',
    description: 'Real time Notification enabale you to always submit assignments on time',
    link: '/card5',
    backgroundColor: ' #e5abc6',
  },
  {
    iconClass: 'fas fa-users fa-flip',
    imgSrc: analysis,
    title: 'Group Assignment',
    description: '',
    link: '/card6',
    backgroundColor: '#ae236d',
  },
 
];

const CardsCarousel = () => {
  const [activeRow, setActiveRow] = useState(0);
 

  const handleRowChange = (newRow) => {
    setActiveRow(newRow);
  };

  const renderCards = (start, end) => {
    const cards = cardData.slice(start, end);
    return cards.map((card, index) => (
      <Col key={index} md={4} >

        <div className="card custom-catousel-card" 
        
        style={{ height:'450px',borderRadius: '10px' , border: '1px solid black',  
        backgroundColor: '' }}
        >
          {/* <img src={card.imgSrc} alt={card.title} /> */}
         <div style={{backgroundColor:card.backgroundColor }} className='iconclass'>
         <i className={`${card.iconClass}`}></i>
         </div>
          <div className="card-body  car-body">
           
            <h5 className="card-title car-title">{card.title}</h5>
            <p className="card-text car-text">{card.description}</p>
          </div>
        </div>
      </Col>
    ));
  };

 

  return (
    <Container className='custom-carousel'>
      <Row className="mt-3">
        <Col>
          <Carousel activeIndex={activeRow} indicators={false} controls={false}>
            <Carousel.Item>
              <Row>{renderCards(0, 3)}</Row>
            </Carousel.Item>
            <Carousel.Item>
              <Row>{renderCards(3, 6)}</Row>
            </Carousel.Item>
            <Carousel.Item>
              <Row>{renderCards(6, 7)}</Row>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="d-flex justify-content-center">
          <div className="custom-buttons">
            <Button
              onClick={() => handleRowChange(activeRow - 1)}
              disabled={activeRow === 0}
              className="btn-transition"
              style={{backgroundColor:"black" ,border: 'none' }}
            >
              Prev
            </Button>
            <Button
              onClick={() => handleRowChange(activeRow + 1)}
              disabled={activeRow === 1}
              className="btn-transition"
              style={{backgroundColor:"black", border: 'none' }}
            >
             Next
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CardsCarousel;
