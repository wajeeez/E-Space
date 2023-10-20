import React, { useState } from 'react';
import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';
import analysis from '../../../Assets/images/analysis.png';
import feat from '../../../Assets/images/home.jpg'
import './Carousel.css';

const cardData = [
  {
    imgSrc: analysis,
    title: 'Card 1',
    description: 'Description for Card 1',
    link: '/card1',
  },
  {
    imgSrc: feat,
    title: 'Card 2',
    description: 'In the updated code, I modified the transition property to apply the transition to all properties, including background-color. This change ensures a smoother transition for the background color change on hover.',
    link: '/card2',
  },
  {
    imgSrc: feat,
    title: 'Card 3',
    description: 'Description for Card 3',
    link: '/card3',
  },
  {
    imgSrc: feat,
    title: 'Card 4',
    description: 'Description for Card 4',
    link: '/card4',
  },
  {
    imgSrc: feat,
    title: 'Card 5',
    description: 'Description for Card 5',
    link: '/card5',
  },
  {
    imgSrc: feat,
    title: 'Card 6',
    description: 'Description for Card 6',
    link: '/card6',
  },
  {
    imgSrc: feat,
    title: 'Card 7',
    description: 'Description for Card 7',
    link: '/card7',
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
        onClick={() => (card.link)}
        style={{ borderRadius: '20px' , border: '2px solid black',  
        backgroundColor: '' }}
        >
          {/* <img src={card.imgSrc} alt={card.title} /> */}
          <div className="card-body ">
            <img className="rounded-circle  custom-icon" src={card.imgSrc} style={{alignSelf: 'left'}} />
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
              disabled={activeRow === 2}
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
