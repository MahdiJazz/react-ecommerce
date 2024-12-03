import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './ProductCard.css'

const ProductCard = ({ id, type, title, price, image, addToCart }) => {

  const toPersianNumber = (number) => 
    new Intl.NumberFormat('fa-IR').format(number);

  return (
    <Link to={`/product/${type}/${id}`} style={{ textDecoration: 'none' }}>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant='top' src={image} alt={title} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>قیمت: {toPersianNumber(price)} تومان</Card.Text>

          <Button
            onClick={e => {
              e.preventDefault() 
              addToCart({ id, type, title, price, image })
            }}
          >
            خرید
          </Button>
        </Card.Body>
      </Card>
    </Link>
  )
}

export default ProductCard
