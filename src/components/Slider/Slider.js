import React from 'react';

import { Container } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
import { useNavigate } from 'react-router-dom'

function CarouselFadeExample () {
  const navigate = useNavigate()

  const goToPage = path => {
    navigate(path)
  }

  return (
    <Container>
      <Carousel fade>
        <Carousel.Item onClick={() => goToPage('/rings')}>
          <img
            className='d-block w-100'
            src='/images/slider/slider1.jpg'
            alt='First slide'
          />
          <Carousel.Caption>
            <h3>انگشتر</h3>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item onClick={() => goToPage('/watches')}>
          <img
            className='d-block w-100'
            src='/images/slider/slider2.jpg'
            alt='Second slide'
          />
          <Carousel.Caption>
            <h3>ساعت</h3>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item onClick={() => goToPage('/necklace')}>
          <img
            className='d-block w-100'
            src='/images/slider/slider3.jpg'
            alt='Third slide'
          />
          <Carousel.Caption>
            <h3>گردنبند</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  )
}

export default CarouselFadeExample
