import React from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import CartIcon from '../CartIcon/CartIcon';

function ColorSchemesExample({ cartItems = [], isLogin, currentUser, handleLogout }) {
  return (
    <Navbar style={{ backgroundColor: '#f1f3f5', fontFamily: 'Vazir' }} data-bs-theme='light' className='mt-5 mb-5'>
      <Container className="d-flex justify-content-between align-items-center">
    {/* Nav Right */}
    <div className="d-flex align-items-center">
            <Navbar.Brand as={Link} to='/'>
              <img
                src={`${process.env.PUBLIC_URL}/images/logo/vina-logo.png`}
                alt='Logo'
                height='32px'
                className='d-inline-block align-top'
              />
            </Navbar.Brand>
            <Nav className='me-auto ms-5'>
              <Nav.Item className='nav-item-with-submenu'>
                <Nav.Link as={Link} to='/'>صفحه اصلی</Nav.Link>
              </Nav.Item>

              <Nav.Item className='nav-item-with-submenu ms-5'>
                <Nav.Link >دسته بندی بدلیجات</Nav.Link>
                <ul className='submenu'>
                  <li><Nav.Link as={Link} to='/watches'>ساعت‌ها</Nav.Link></li>
                  <li><Nav.Link as={Link} to='/rings'>انگشترها</Nav.Link></li>
                  <li><Nav.Link as={Link} to='/necklace'>گردنبندها</Nav.Link></li>
                  <li><Nav.Link as={Link} to='/bracelet'>دستبندها</Nav.Link></li>
                  <li><Nav.Link as={Link} to='/earring'>گوشواره ها</Nav.Link></li>
                  <li><Nav.Link as={Link} to='/piercing'>پیرسینگ ها</Nav.Link></li>
                </ul>
              </Nav.Item>

              <Nav.Item className='nav-item-with-submenu ms-5'>
                <Nav.Link >دسته بندی اکسسوری</Nav.Link>
                <ul className='submenu'>
                  <li><Nav.Link as={Link} to='/wallet'>کیف پول و جاکارتی</Nav.Link></li>
                  <li><Nav.Link as={Link} to='/box'>باکس و جعبه اکسسوری</Nav.Link></li>
                </ul>
              </Nav.Item>

              <Nav.Item className='nav-item-with-submenu ms-5'>
                <Nav.Link as={Link} to='/contact'> تماس با ما</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>


        {/* Nav Left */}
        <Nav className="ms-auto d-flex align-items-center">
          <Nav.Link className='me-4 ms-4 p-0' as={Link} to='/cart'>
            <Button variant="secondary" className="d-flex align-items-center">
              <CartIcon itemCount={cartItems.length} />
              <span className="ms-2">سبد خرید</span>
            </Button>
          </Nav.Link>

          {isLogin ? (
            <Nav.Item className='nav-item-with-submenu ms-5'>
              <Nav.Link as={Link} to='/profile'>حساب کاربری</Nav.Link>
              <ul className='submenu profile'>
                <li className="user-name">سلام، {currentUser.username}</li> {/* نمایش نام کاربر */}
                <li><Nav.Link as={Link} to='/profile'>مشاهده حساب کاربری</Nav.Link></li>
                
                <li><Nav.Link as={Link} to='/exit' onClick={handleLogout}>خروج</Nav.Link></li>
              </ul>
            </Nav.Item>
          ) : (
            <>
              <Nav.Link as={Link} to='/register'>عضویت</Nav.Link>
              <Nav.Link as={Link} to='/login'>ورود</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default ColorSchemesExample;
