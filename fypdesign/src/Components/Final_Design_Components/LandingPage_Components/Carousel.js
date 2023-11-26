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
    backgroundColor: '#f12711',
  },
  {
    iconClass: 'fas fa-clock fa-fade',
    imgSrc: analysis,
    title: 'No Time Limit Meetings ',
    description: 'We offer unlimited time for conducting meeting and classes and online lectures without any charges ',
    link: '/card2',
    backgroundColor: '#7F00FF',
  },
  {
    iconClass: 'fas fa-cogs fa-bounce',
    imgSrc: analysis,
    title: 'Content Management System',
    description: 'Unlike other platform we offer built in content management system to enhance productivity',
    link: '/card3',
    backgroundColor: '#38ef7d',
  },
  {
    iconClass: 'fa-solid fa-user-secret fa-bounce',
    imgSrc: analysis,
    title: 'Safety & Security in Meetings',
    description: 'Teacher can explore many safety security features such as locking meeting lobby etc to stay save from online harsment',
    link: '/card4',
    backgroundColor: '#11998e',
  },
  {
    iconClass: 'fas fa-chalkboard',
    imgSrc: analysis,
    title: 'Never Miss Update',
    description: 'Real time Notification enabale you to access everything everywhere you go',
    link: '/card5',
    backgroundColor: '#7F00FF',
  },
  {
    iconClass: 'fas fa-chalkboard',
    imgSrc: analysis,
    title: 'Card 6',
    description: 'Description for Card 6',
    link: '/card6',
    backgroundColor: '#f12711',
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
          <div className="card-body ">
           
            <h5 className="card-title">{card.title}</h5>
            <p className="card-text">{card.description}</p>
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
