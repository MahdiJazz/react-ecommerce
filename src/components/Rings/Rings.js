import React from 'react'
import Layout from '../Layout/Layout'
import { Container } from 'react-bootstrap'
import { rings } from '../Data/Data'
import TitleWithLines from '../TitleWithLines/TitleWithLines'
import ProductCard from '../ProductCard/ProductCard'


function Rings ({addToCart}) {
  return (
    
    <Layout>
      <TitleWithLines text=' صفحه انگشترها ' />
      <Container style={{ paddingBottom: '30px' }}>
        <div className='d-flex flex-wrap justify-content-around'>
          {rings.map(item => (
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

export default Rings
