import React from 'react';
import Layout from '../Layout/Layout';
import { Container } from 'react-bootstrap';  
import { necklace } from '../Data/Data'
import TitleWithLines from '../TitleWithLines/TitleWithLines'
import ProductCard from '../ProductCard/ProductCard';



export default function Necklace({addToCart}) {
  return (
    <Layout>
    <TitleWithLines text=' صفحه گردنبندها ' />
     <Container  style={{ paddingBottom: '30px' }}>
       <div className="d-flex flex-wrap justify-content-around">
         {necklace.map(item => (
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
