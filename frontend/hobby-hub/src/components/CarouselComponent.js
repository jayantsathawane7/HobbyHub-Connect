
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import green from '../images/two.jpeg';
import three from '../images/three.jpeg';
import four from '../images/four.jpeg';
import five from '../images/five.jpeg';
import '../CSS/Carousel.css';

export default function CarouselComponent() {
  return (
    <div className="carousel-container">
      <Carousel controls={false} indicators={false} interval={2000} pause="hover">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={green}
            alt="Slide 1"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={three}
            alt="Slide 2"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={four}
            alt="Slide 3"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={five}
            alt="Slide 4"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
