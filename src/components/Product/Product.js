import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import { useParams } from 'react-router-dom';
import { allProducts } from '../Data/Data';
import './Product.css';
import { Container, Row, Col, Image, Alert, Button } from 'react-bootstrap';

const Product = ({ addToCart, cartItems = [], setCartItems }) => {
  const { category, id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedProductQuantity, setSelectedProductQuantity] = useState(1);

  // پیدا کردن محصول براساس تایپ و آیدی و تنظیم مقدار تعداد از localStorage
  useEffect(() => {
    if (category && id) {
      const foundProduct = allProducts.find(
        item =>
          item.type &&
          item.type.toLowerCase() === category.toLowerCase() &&
          item.id === Number(id)
      );
      setProduct(foundProduct);

      if (foundProduct) {
        // گرفتن تعداد محصول از localStorage
        const savedQuantity = localStorage.getItem(`product_${id}_quantity`);
        if (savedQuantity) {
          setSelectedProductQuantity(Number(savedQuantity));
        }
      }
    }
  }, [category, id]);

  // ذخیره مقدار quantity در localStorage
  useEffect(() => {
    if (product) {
      localStorage.setItem(`product_${id}_quantity`, selectedProductQuantity);
    }
  }, [selectedProductQuantity, id, product]);

  // تبدیل عدد به فرمت فارسی
  const toPersianNumber = number =>
    new Intl.NumberFormat('fa-IR').format(number);

  // افزایش تعداد
  const handleIncreaseQuantity = () => {
    if (product && selectedProductQuantity < product.stock) {
      setSelectedProductQuantity(prevQuantity => prevQuantity + 1);
    }
  };

  // کاهش تعداد
  const handleDecreaseQuantity = () => {
    if (selectedProductQuantity > 1) {
      setSelectedProductQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  // اضافه کردن محصول به سبد خرید
  const handleAddToCart = () => {
    if (product) {
      const existingCartItemIndex = cartItems.findIndex(
        item => item.id === product.id
      );
      if (existingCartItemIndex !== -1) {
        // آپدیت محصولاتی که از قبل در سبد خرید هستند
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingCartItemIndex].quantity = selectedProductQuantity;
        setCartItems(updatedCartItems);
      } else {
        // اگر محصول در سبد خرید وجود نداشته باشد
        addToCart({ ...product, quantity: selectedProductQuantity });
      }
    }
  };

  return (
    <Layout>
      <Container className='mt-5'>
        {product ? (
          <Row>
            <Col md={6} className='product-page-image'>
              <Image src={product.img} alt={product.title} fluid rounded />
            </Col>
            <Col md={6}>
              <h1>{product.title}</h1>
              <p className='lead'>
                قیمت: {toPersianNumber(product.price)} تومان
              </p>
              <p>دسته‌بندی: {product.type}</p>

              {/* بخش کنترل تعداد محصول */}
              <div className='quantity-control mb-3'>
                <Button
                  onClick={handleDecreaseQuantity}
                  disabled={selectedProductQuantity <= 1}
                >
                  -
                </Button>
                <input
                  type='number'
                  value={selectedProductQuantity}
                  onChange={e => {
                    const value = Number(e.target.value);
                    if (value >= 1 && value <= product.stock) {
                      setSelectedProductQuantity(value);
                    }
                  }}
                  min='1'
                  max={product.stock}
                  style={{
                    width: '50px',
                    textAlign: 'center',
                    margin: '0 10px'
                  }}
                />
                <Button
                  onClick={handleIncreaseQuantity}
                  disabled={selectedProductQuantity >= product.stock}
                >
                  +
                </Button>
              </div>

              {/* قیمت کل برای تعداد انتخاب‌شده */}
              <p className='lead'>
                مجموع:{' '}
                {product?.price
                  ? toPersianNumber(product.price * selectedProductQuantity)
                  : '۰'}{' '}
                تومان
              </p>

              <Button onClick={handleAddToCart} variant='primary'>
                افزودن به سبد خرید
              </Button>
            </Col>
          </Row>
        ) : (
          <Alert variant='danger' className='text-center'>
            محصول یافت نشد!
          </Alert>
        )}
      </Container>
    </Layout>
  );
};

export default Product;
