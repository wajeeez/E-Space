import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import main from '../../../Assets/images/home.jpg';

function CustomCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const cards = [
    { title: 'Card Title 1', description: 'This is the description for card 1' },
    { title: 'Card Title 2', description: 'This is the description for card 2' },
    { title: 'Card Title 3', description: 'This is the description for card 3' },
    { title: 'Card Title 4', description: 'This is the description for card 4' },
    { title: 'Card Title 5', description: 'This is the description for card 5' },
    { title: 'Card Title 6', description: 'This is the description for card 6' },
  ];

  const itemsPerPage = 3;

  const handleSelect = (selectedIndex, e) => {
    setActiveIndex(selectedIndex);
  };

  const renderCards = () => {
    const startIndex = activeIndex * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleCards = cards.slice(startIndex, endIndex);

    return visibleCards.map((card, index) => (
      <div className="col-md-4" key={index}>
        <div className="card">
          <img src={main} className="card-img-top" alt="Card Image" />
          <div className="card-body">
            <h5 className="card-title">{card.title}</h5>
            <p className="card-text">{card.description}</p>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <Carousel activeIndex={activeIndex} onSelect={handleSelect} interval={null} indicators={false}>
      <Carousel.Item>
        <div className="container">
          <div className="row">
            {renderCards()}
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default CustomCarousel;
