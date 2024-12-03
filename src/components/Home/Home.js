import React from 'react';

import Layout from '../Layout/Layout';
import Slider from '../Slider/Slider';
import TitleWithLines from '../TitleWithLines/TitleWithLines';
import ProductCard from '../ProductCard/ProductCard';
import Categories from '../Categories/Categories';
import Accordion from '../Accordions/Accordion ';
import { Container } from 'react-bootstrap';
import { offItems, newestProduct, rings } from '../Data/Data';

const Home = ({ addToCart }) => { 
  return (
    <Layout>
      <Slider />

      <TitleWithLines text='تخفیف فوق العاده' />
      <Container>
        <div className='d-flex flex-wrap justify-content-around'>
          {offItems.map(item => (
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

      <TitleWithLines text='دسته بندی های وینا' />
      <Categories />

      <TitleWithLines text='جدیدترین محصولات' />
      <Container>
        <div className='d-flex flex-wrap justify-content-around'>
          {newestProduct.map(item => (
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

      <TitleWithLines text='پک انگشتر وینا' />
      <Container>
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

      <TitleWithLines text='سوالات پرتکرار' />
      <Accordion />
    </Layout>
  );
};

export default Home;
