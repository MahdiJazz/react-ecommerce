import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import Layout from '../Layout/Layout';
import { Container } from 'react-bootstrap';  
import { watchItems } from '../Data/Data';
import TitleWithLines from '../TitleWithLines/TitleWithLines';

function Watches({ addToCart }) { 

  return (
    <Layout>
      <TitleWithLines text='صفحه ساعت‌ها' />
      <Container style={{ paddingBottom: '60px' }}>
        <div className="d-flex flex-wrap justify-content-around">
          {watchItems.map(item => (
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
  );
}

export default Watches;
