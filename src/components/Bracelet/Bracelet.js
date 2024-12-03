import React from 'react'
import Layout from '../Layout/Layout'
import { Container } from 'react-bootstrap'
import { bracelet } from '../Data/Data'
import TitleWithLines from '../TitleWithLines/TitleWithLines'
import ProductCard from '../ProductCard/ProductCard'

export default function Bracelet({addToCart}) {
  return (
    <Layout>
      <TitleWithLines text=' صفحه دستبندها ' />
      <Container style={{ paddingBottom: '30px' }}>
        <div className='d-flex flex-wrap justify-content-around'>
          {bracelet.map(item => (
            <ProductCard
              key={item.id}
              id={item.id}
              type={item.type}
              title={item.title}
              price={item.price}
              image={item.img}
              addToCart={addToCart}
            />
          ))}
        </div>
      </Container>
    </Layout>
    
  )
}
