import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { categories, smallCategories } from '../Data/Data';
import './Categories.css';

const Categories = () => {
  return (
    <Container className="mt-5">
      <Row>
        {categories.map((category, index) => (
          <Col key={index} xs={12} md={3} className="mb-4">
            <Link to={`/${category.type}`} className="category-link">
              <Card className="text-white category-card">
                <Card.Img src={category.img} alt={category.title} />
                <Card.ImgOverlay className="d-flex align-items-center justify-content-center">
                  <Card.Title className="overlay-title">{category.title}</Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      <Row className="justify-content-center">
        {smallCategories.map((category, index) => (
          <Col key={index} xs={12} sm={12} md={6} className="mb-4">
            <Link to={`/${category.type}`} className="category-link">
              <Card className="text-white category-card2">
                <Card.Img src={category.img} alt={category.title} />
                <Card.ImgOverlay className="d-flex align-items-center justify-content-center">
                  <Card.Title className="overlay-title">{category.title}</Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Categories;
