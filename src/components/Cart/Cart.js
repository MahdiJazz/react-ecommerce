import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup, Button, Card } from 'react-bootstrap';
import Layout from '../Layout/Layout';
import { FaTrash } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';

const Cart = ({ cartItems, setCartItems, isLogin }) => {
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("cartItems: ", cartItems);
  }, [cartItems]);

  const toPersianNumber = (number) => new Intl.NumberFormat('fa-IR').format(number);

  const increaseQuantity = (productId) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === productId && item.quantity < item.stock) {
        const newQuantity = item.quantity + 1;
        localStorage.setItem(`product_${productId}_quantity`, newQuantity); // ذخیره در localStorage
        return { ...item, quantity: newQuantity };
      } else if (item.id === productId) {
        alert(`موجودی انبار برای محصول "${item.title}" کافی نیست.`);
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === productId && item.quantity > 1) {
        const newQuantity = item.quantity - 1;
        localStorage.setItem(`product_${productId}_quantity`, newQuantity); // ذخیره در localStorage
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.removeItem(`product_${productId}_quantity`); // حذف از localStorage
  };

  const totalAmount = cartItems.reduce((currentTotal, currentItem) => {
    return currentTotal + currentItem.price * currentItem.quantity;
  }, 0);

  const handleOrderSubmit = () => {
    if (!isLogin) {
      alert('لطفاً ابتدا وارد سیستم شوید تا بتوانید سفارش خود را ثبت کنید.');
      navigate('/login');
    } else if (cartItems.length === 0) {
      alert('سبد خرید شما خالی است. لطفاً ابتدا محصولاتی را به سبد خرید اضافه کنید.');
    } else {
      alert('سفارش شما ثبت شد!');
      setCartItems([]);
      setOrderConfirmed(true); // نمایش پیام تایید سفارش
      // هدایت به صفحه اصلی بعد از تایید سفارش
      setTimeout(() => {
        navigate('/');
      }, 3000); // بعد از ۳ ثانیه
    }
  };

  return (
    <Layout>
      <Container className='mt-5'>
        <h2 className="mb-4">سبد خرید</h2>
        <Card className='p-4 shadow-sm rounded'>
          {orderConfirmed ? (
            <p className='text-center my-4'>سفارش شما با موفقیت ثبت شد! هدایت به صفحه اصلی...</p>
          ) : cartItems.length > 0 ? (
            <>
              <Row className='align-items-center fw-bold mb-3'>
                <Col md={4} className='text-center'>محصول</Col>
                <Col md={2} className='text-center'>قیمت</Col>
                <Col md={2} className='text-center'>تعداد</Col>
                <Col md={2} className='text-center'>جمع قیمت</Col>
                <Col md={2} className='text-center'>حذف</Col>
              </Row>
              <ListGroup variant='flush'>
                {cartItems.map((item, index) => (
                  <ListGroup.Item key={index} className="py-3">
                    <Row className='align-items-center'>
                      <Col md={4} className='d-flex align-items-center'>
                        <Link to={`/product/${item.type}/${item.id}`}>
                          <img
                            src={item.img}
                            alt={item.title}
                            style={{
                              width: '80px',
                              height: '80px',
                              borderRadius: '8px',
                              objectFit: 'cover'
                            }}
                          />
                        </Link>
                        <div className='ms-3'>
                          <Link to={`/product/${item.type}/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <h5 className='mb-1'>{item.title}</h5>
                          </Link>
                        </div>
                      </Col>
                      <Col md={2} className='text-center'>
                        <p className='mb-0'>{toPersianNumber(item.price)} تومان</p>
                      </Col>
                      <Col md={2} className='text-center'>
                        <div className="d-flex align-items-center justify-content-between" style={{
                          border: '1px solid #ddd', borderRadius: '8px', padding: '5px 10px',
                          width: '120px', margin: '0 auto'
                        }}>
                          <button onClick={() => decreaseQuantity(item.id)} style={{
                            border: 'none', background: 'transparent', fontSize: '1.2rem', cursor: 'pointer'
                          }}>-</button>
                          <span style={{ minWidth: '20px', textAlign: 'center' }}>
                            {toPersianNumber(item.quantity)}
                          </span>
                          <button onClick={() => increaseQuantity(item.id)} style={{
                            border: 'none', background: 'transparent', fontSize: '1.2rem', cursor: 'pointer'
                          }}>+</button>
                        </div>
                      </Col>
                      <Col md={2} className='text-center'>
                        <p className='mb-0'>{toPersianNumber(item.price * item.quantity)} تومان</p>
                      </Col>
                      <Col md={2} className='text-center'>
                        <Button variant="outline-danger" onClick={() => removeFromCart(item.id)} style={{
                          border: 'none', background: 'transparent', padding: '0', color: '#000',
                        }}>
                          <FaTrash style={{ fontSize: '1.5rem' }} />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Row className='mt-4'>
                <Col className='text-end fw-bold'>
                  مبلغ کل سبد خرید: {toPersianNumber(totalAmount)} تومان
                </Col>
              </Row>
              <Row className='mt-4'>
                <Col className='text-start'>
                  <Button variant="outline-secondary" onClick={() => navigate(-1)}>بازگشت</Button>
                </Col>
                <Col className='text-end'>
                  <Button variant="primary" onClick={handleOrderSubmit}>ثبت سفارش</Button>
                </Col>
              </Row>
            </>
          ) : (
            <p className='text-center my-4'>سبد خرید شما خالی است.</p>
          )}
        </Card>
      </Container>
    </Layout>
  );
};

export default Cart;
